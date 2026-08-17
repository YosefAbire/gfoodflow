.PHONY: help install dev test lint format migrate docker-up docker-down

help:
	@echo "GamoFoodFlow Backend Commands:"
	@echo "  install      Install python dependencies"
	@echo "  dev          Run local development server"
	@echo "  test         Run unit and integration tests"
	@echo "  lint         Run Ruff and MyPy checks"
	@echo "  format       Format code with Ruff and Black"
	@echo "  migrate      Run database migrations"
	@echo "  docker-up    Start all Docker services"
	@echo "  docker-down  Stop Docker services"

install:
	pip install -e ".[dev]"

dev:
	uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

test:
	pytest tests/ -v --cov=app

lint:
	ruff check app tests
	mypy app

format:
	black app tests
	ruff check --fix app tests

migrate:
	alembic upgrade head

docker-up:
	docker compose up -d

docker-down:
	docker compose down
