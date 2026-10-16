from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
import os
from pathlib import Path
from dotenv import load_dotenv


load_dotenv(
    Path(__file__).resolve().parents[2] / ".env",
    override=False,
)


ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def _get_secret_key() -> str:
    secret_key = os.getenv("JWT_SECRET_KEY")

    if not secret_key or not secret_key.strip():
        raise RuntimeError(
            "JWT_SECRET_KEY must be set in the runtime environment "
            "or backend/.env"
        )

    return secret_key


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({
        "exp": expire
    })

    token = jwt.encode(
        to_encode,
        _get_secret_key(),
        algorithm=ALGORITHM
    )

    return token


def verify_access_token(token: str):
    try:
        payload = jwt.decode(
            token,
            _get_secret_key(),
            algorithms=[ALGORITHM]
        )

        return payload

    except JWTError:
        return None
