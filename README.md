# GamoFoodFlow (gfoodflow) 🌾📊🚚

**GamoFoodFlow** is a production-grade **Agricultural and Food-Security Intelligence Platform** designed for Gamo Zone & Southern Ethiopia, and scalable to national Ethiopian agricultural contexts.

The platform provides real-time visibility and predictive analytics across crop supply chains, commodity market prices, transport logistics bottlenecks, climate risk, and regional food security.

---

## 🌟 Key Features & Modules

### 🌾 1. Agricultural Supply Intelligence
- **Crop Production & Supply Summaries**: Track production volumes and harvest forecasts for key regional crops (Teff, Maize, Wheat, Barley, Coffee, Sorghum, Banana).
- **Collection Center Monitoring**: Real-time capacity utilization, current storage tonnage, and operational status of regional agricultural hubs (e.g. Arba Minch, Mirab Abaya, Chencha, Bonke, Derashe).

### 📈 2. Commodity Market & Price Intelligence
- **Regional Market Trade Nodes**: Price tracking across central and local markets (e.g. Arba Minch Market, Addis Ababa Central Market, Hawassa, Wolaita Sodo).
- **Price Spread & Forecasts**: Comparative price spread analysis (ETB/kg vs USD/ton) and predictive trend forecasts.
- **Demand Growth Explorer**: Identify supply gaps, regional demand growth, and arbitrage opportunities.

### 🚚 3. Logistics & Supply Chain
- **Shipment Tracking**: Real-time shipment status, tracking codes, cargo perishability risk, and carrier routing.
- **Corridor Bottlenecks**: Detect and monitor transport corridor delays, road conditions, and capacity constraints.
- **Route Matrix & Optimization**: Transport demand vs capacity analytics and alternative route suggestions.

### 🤖 4. AI & RAG Intelligence Gateway
- **FoodFlow AI Analyst**: Interactive AI assistant for real-time natural language query resolution on food security data.
- **Scenario Simulator**: Interactively simulate shock scenarios (e.g. drought severity, fuel price increases, road blockages) to project price impacts and supply disruptions.
- **Knowledge RAG Engine**: Vector-embedded document knowledge base for contextual policy and agricultural reports.

### 🗺️ 5. Geospatial & Remote Sensing Engine
- **Administrative Boundaries**: Native PostGIS integration for Region, Zone, Woreda, and Kebele spatial layers.
- **Satellite Remote Sensing**: NDVI vegetation index tracking, zonal statistics calculation, and soil health monitoring.
- **Weather & Drought Risk**: Weather station observations and SPI-based drought risk assessments.

---

## 🏗️ Architecture & Tech Stack

```
                                  ┌───────────────────────────┐
                                  │   Next.js 14 Frontend     │
                                  │  (React 18 / Tailwind /   │
                                  │   Leaflet / Recharts)     │
                                  └─────────────┬─────────────┘
                                                │ REST API / JSON
                                                ▼
                                  ┌───────────────────────────┐
                                  │    FastAPI Backend        │
                                  │   (Python 3.12 / Async)   │
                                  └──────┬─────────────┬──────┘
                                         │             │
                    ┌────────────────────┴┐           ┌┴────────────────────┐
                    │ PostgreSQL 16 +     │           │  Redis 7 + Celery   │
                    │ PostGIS 3.4 Spatial │           │  Async Workers &    │
                    │ Database Engine     │           │  RAG Cache          │
                    └─────────────────────┘           └─────────────────────┘
```

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons, Leaflet / React-Leaflet, Recharts.
- **Backend Engine**: FastAPI, SQLAlchemy 2.0 Async ORM, Alembic Migrations, Pydantic v2.
- **Spatial Engine**: PostgreSQL 16 + PostGIS 3.4 (GeoAlchemy2, Shapely, PyProj).
- **Caching & Async Tasks**: Redis 7, Celery 5.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ & `npm`
- Python 3.12+ & `pip` / `venv`
- Docker & Docker Compose

### 1. Database & Infrastructure Setup
Start the PostgreSQL/PostGIS database and Redis containers:

```bash
cd gamofoodflow-backend
docker compose up -d postgres redis
```

### 2. Backend Setup & Migrations
Initialize the Python virtual environment, install dependencies, and run database migrations:

```bash
cd gamofoodflow-backend
source .venv/bin/activate
pip install -e ".[dev]"
alembic upgrade head
```

Start the FastAPI backend server:

```bash
uvicorn app.main:app --reload --port 8000
```
> OpenAPI documentation will be available at **`http://localhost:8000/api/v1/docs`**.

### 3. Frontend Setup
In a new terminal window from the root project directory:

```bash
# Install dependencies (if not already installed)
npm install

# Start Next.js development server
npm run dev
```

Open **`http://localhost:3000`** in your browser to launch the GamoFoodFlow platform.

---

## 📂 Project Structure

```
gfoodflow/
├── src/                          # Next.js Frontend Application
│   ├── app/                      # App router pages (overview, supply, markets, logistics, intelligence)
│   ├── components/               # UI components, Leaflet maps, Recharts graphs, and modals
│   ├── services/                 # API service layer with backend integration & demo fallback
│   ├── lib/                      # API client wrapper (fetchWithFallback)
│   ├── data/                     # Local fallback & simulation demo datasets
│   └── types/                    # TypeScript domain type definitions
│
├── gamofoodflow-backend/         # FastAPI Backend Engine
│   ├── app/                      # Main application logic
│   │   ├── api/                  # API routers & endpoint definitions
│   │   ├── core/                 # Core configs, DB connection, Redis, logging
│   │   └── modules/              # Domain modules (agriculture, markets, logistics, intelligence, etc.)
│   ├── alembic/                  # Alembic database migration scripts
│   ├── docker-compose.yml        # Docker service setup for Postgres/PostGIS & Redis
│   └── pyproject.toml            # Backend dependencies & metadata
│
├── .env.local                    # Frontend environment configuration
└── README.md                     # Project documentation
```

---

## 🧪 Testing & Linting

- **Frontend Type Check**: `npx tsc --noEmit`
- **Frontend Linting**: `npm run lint`
- **Backend Tests**: `cd gamofoodflow-backend && pytest`
- **Backend Linting**: `cd gamofoodflow-backend && ruff check app tests`

---

## 📄 License

This project is built for agricultural intelligence, food security research, and logistical optimization in Southern Ethiopia.
