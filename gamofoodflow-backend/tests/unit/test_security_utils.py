from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)


def test_password_hashing():
    raw = "SecurePassword123!"
    hashed = hash_password(raw)
    assert hashed != raw
    assert verify_password(raw, hashed) is True
    assert verify_password("WrongPassword", hashed) is False


def test_jwt_access_and_refresh_tokens():
    user_id = "123e4567-e89b-12d3-a456-426614174000"
    access_token = create_access_token(subject=user_id, extra_claims={"role": "ADMIN"})
    refresh_token = create_refresh_token(subject=user_id)

    access_payload = decode_token(access_token)
    assert access_payload["sub"] == user_id
    assert access_payload["type"] == "access"
    assert access_payload["role"] == "ADMIN"

    refresh_payload = decode_token(refresh_token)
    assert refresh_payload["sub"] == user_id
    assert refresh_payload["type"] == "refresh"
