from celery import Celery

from app.core.config import settings

celery_app = Celery(
    "gamofoodflow_workers",
    broker=settings.resolved_celery_broker_url,
    backend=settings.resolved_celery_result_backend,
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
)


@celery_app.task(name="ping")
def ping_task() -> str:
    """Simple ping task to verify worker responsiveness."""
    return "pong"
