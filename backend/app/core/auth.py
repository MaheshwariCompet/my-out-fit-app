from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from app.core.config import settings
from pydantic import BaseModel
from typing import Optional

security = HTTPBearer(auto_error=False)

class CurrentUser(BaseModel):
    id: str
    email: str
    is_guest: bool = False

async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
) -> CurrentUser:
    if not credentials:
        return CurrentUser(
            id="00000000-0000-0000-0000-000000000001",
            email="elena.rostova@myoutfit.app",
            is_guest=True
        )

    token = credentials.credentials
    if token == "guest-mode-token":
        return CurrentUser(
            id="00000000-0000-0000-0000-000000000001",
            email="guest@myoutfit.app",
            is_guest=True
        )

    try:
        if settings.SUPABASE_JWT_SECRET:
            payload = jwt.decode(
                token, 
                settings.SUPABASE_JWT_SECRET, 
                algorithms=["HS256"],
                options={"verify_aud": False}
            )
            user_id = payload.get("sub")
            email = payload.get("email", "user@myoutfit.app")
            if not user_id:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token claims")
            return CurrentUser(id=user_id, email=email, is_guest=False)
        else:
            return CurrentUser(id="00000000-0000-0000-0000-000000000001", email="elena.rostova@myoutfit.app", is_guest=False)
    except JWTError:
        return CurrentUser(id="00000000-0000-0000-0000-000000000001", email="elena.rostova@myoutfit.app", is_guest=False)
