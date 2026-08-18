from enum import StrEnum


class UserRole(StrEnum):
    SUPER_ADMIN = "SUPER_ADMIN"
    ADMIN = "ADMIN"
    DATA_MANAGER = "DATA_MANAGER"
    RESEARCHER = "RESEARCHER"
    ANALYST = "ANALYST"
    AGRICULTURAL_OFFICER = "AGRICULTURAL_OFFICER"
    FIELD_AGENT = "FIELD_AGENT"
    VIEWER = "VIEWER"


class AdminLevel(StrEnum):
    COUNTRY = "COUNTRY"
    REGION = "REGION"
    ZONE = "ZONE"
    WOREDA = "WOREDA"
    KEBELE = "KEBELE"


class CropType(StrEnum):
    MAIZE = "Maize"
    BANANA = "Banana"
    MANGO = "Mango"
    ENSET = "Enset"
    TEFF = "Teff"
    WHEAT = "Wheat"
    BARLEY = "Barley"
    SORGHUM = "Sorghum"
    PULSES = "Pulses"
    COFFEE = "Coffee"
    VEGETABLES = "Vegetables"


class FoodSecurityLevel(StrEnum):
    MINIMAL_IPC_1 = "MINIMAL_IPC_1"
    STRESSED_IPC_2 = "STRESSED_IPC_2"
    CRISIS_IPC_3 = "CRISIS_IPC_3"
    EMERGENCY_IPC_4 = "EMERGENCY_IPC_4"
    CATASTROPHE_IPC_5 = "CATASTROPHE_IPC_5"


class WeatherStationStatus(StrEnum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    MAINTENANCE = "MAINTENANCE"


class DroughtSeverity(StrEnum):
    NORMAL = "NORMAL"
    WATCH = "WATCH"
    MODERATE = "MODERATE"
    SEVERE = "SEVERE"
    EXTREME = "EXTREME"

