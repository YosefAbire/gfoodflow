import uuid
from datetime import UTC, datetime


def utc_now() -> datetime:
    """Return current UTC timestamp with timezone."""
    return datetime.now(UTC)


def generate_uuid() -> uuid.UUID:
    """Generate a random UUID v4."""
    return uuid.uuid4()
