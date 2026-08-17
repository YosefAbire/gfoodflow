from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings
from app.core.exceptions import DomainException, domain_exception_handler, global_exception_handler
from app.core.logging import logger, setup_logging
from app.core.middleware import CorrelationIdMiddleware, SecurityHeadersMiddleware
from app.core.redis import close_redis, init_redis


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan setup and teardown."""
    setup_logging(debug=settings.DEBUG)
    logger.info(f"Starting {settings.APP_NAME} Backend [{settings.APP_ENV}]...")
    
    # Store settings in app state for access in exception handlers
    app.state.settings = settings

    # Initialize Redis
    await init_redis()

    yield

    # Teardown
    await close_redis()
    logger.info(f"Shutting down {settings.APP_NAME} Backend.")


def create_application() -> FastAPI:
    """FastAPI application factory."""
    app = FastAPI(
        title=settings.APP_NAME,
        description="Production-grade Agricultural and Food-Security Intelligence Backend Engine for Gamo Zone & Ethiopia",
        version="0.1.0",
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
        docs_url=f"{settings.API_V1_STR}/docs",
        redoc_url=f"{settings.API_V1_STR}/redoc",
        lifespan=lifespan,
    )

    # Middlewares
    app.add_middleware(CorrelationIdMiddleware)
    app.add_middleware(SecurityHeadersMiddleware)

    if settings.BACKEND_CORS_ORIGINS:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=settings.BACKEND_CORS_ORIGINS,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    # Exception Handlers
    app.add_exception_handler(DomainException, domain_exception_handler)
    app.add_exception_handler(Exception, global_exception_handler)

    # Include Main Router
    app.include_router(api_router, prefix=settings.API_V1_STR)

    return app


app = create_application()
