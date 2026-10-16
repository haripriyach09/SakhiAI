from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.community import (
    CommunityPost,
    CommunityReport
)
from app.schemas.community_schema import (
    CommunityPostCreate,
    CommunityReportCreate
)
from app.utils.auth_dependency import get_current_patient


router = APIRouter(
    prefix="/community",
    tags=["Community Support"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# ==========================================================
# GET COMMUNITY POSTS
# ==========================================================

@router.get("/posts")
def get_community_posts(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_patient)
):
    posts = (
        db.query(CommunityPost)
        .order_by(CommunityPost.created_at.desc())
        .all()
    )

    return [
        {
            "id": post.id,
            "content": post.content,
            "category": post.category,

            # Never expose the user's identity.
            "is_anonymous": True,

            "created_at": post.created_at
        }
        for post in posts
    ]


# ==========================================================
# CREATE COMMUNITY POST
# ==========================================================

@router.post("/posts")
def create_community_post(
    data: CommunityPostCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_patient)
):
    content = data.content.strip()

    if not content:
        raise HTTPException(
            status_code=400,
            detail="Post content cannot be empty."
        )

    post = CommunityPost(
        user_id=current_user.id,
        content=content,
        category=data.category,
        is_anonymous=1
    )

    db.add(post)
    db.commit()
    db.refresh(post)

    return {
        "message": "Community post created successfully.",
        "post": {
            "id": post.id,
            "content": post.content,
            "category": post.category,
            "is_anonymous": True,
            "created_at": post.created_at
        }
    }


# ==========================================================
# REPORT COMMUNITY POST
# ==========================================================

@router.post("/posts/{post_id}/report")
def report_community_post(
    post_id: int,
    data: CommunityReportCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_patient)
):
    post = (
        db.query(CommunityPost)
        .filter(
            CommunityPost.id == post_id
        )
        .first()
    )

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Community post not found."
        )

    existing_report = (
        db.query(CommunityReport)
        .filter(
            CommunityReport.post_id == post_id,
            CommunityReport.reporter_id == current_user.id
        )
        .first()
    )

    if existing_report:
        raise HTTPException(
            status_code=400,
            detail="You have already reported this post."
        )

    report = CommunityReport(
        post_id=post_id,
        reporter_id=current_user.id,
        reason=data.reason.strip()
    )

    db.add(report)
    db.commit()

    return {
        "message": "Post reported successfully."
    }