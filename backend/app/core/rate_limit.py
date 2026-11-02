from fastapi import Request, HTTPException, status
import time
from collections import defaultdict
from app.core.config import settings

class InMemoryRateLimiter:
    def __init__(self, requests_per_minute: int = 120):
        self.rate = requests_per_minute
        self.requests = defaultdict(list)

    async def check(self, request: Request):
        client_ip = request.client.host if request.client else "127.0.0.1"
        now = time.time()
        self.requests[client_ip] = [t for t in self.requests[client_ip] if now - t < 60]
        if len(self.requests[client_ip]) >= self.rate:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Rate limit exceeded. Please wait a moment."
            )
        self.requests[client_ip].append(now)

rate_limiter = InMemoryRateLimiter(settings.RATE_LIMIT_PER_MINUTE)
