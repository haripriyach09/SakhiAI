from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database.database import Base


class CommunityPost(Base):
    __tablename__ = "community_posts"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    content = Column(Text, nullable=False)

    category = Column(
        String(50),
        nullable=False,
        default="General Support"
    )

    is_anonymous = Column(
        Integer,
        nullable=False,
        default=1
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


class CommunityReport(Base):
    __tablename__ = "community_reports"

    id = Column(Integer, primary_key=True, index=True)

    post_id = Column(
        Integer,
        ForeignKey("community_posts.id"),
        nullable=False,
        index=True
    )

    reporter_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    reason = Column(
        String(100),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )