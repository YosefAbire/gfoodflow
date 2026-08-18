import pytest

from app.core.jobs import (
    compute_daily_ndvi_anomalies_job,
    evaluate_alert_thresholds_job,
    sync_weather_telemetry_job,
)


@pytest.mark.asyncio
async def test_background_jobs_execution():
    await sync_weather_telemetry_job()
    await evaluate_alert_thresholds_job()
    await compute_daily_ndvi_anomalies_job()
