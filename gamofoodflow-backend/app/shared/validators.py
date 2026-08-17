

def validate_lat_lon(latitude: float, longitude: float) -> tuple[float, float]:
    """Validate latitude (-90 to 90) and longitude (-180 to 180)."""
    if not (-90.0 <= latitude <= 90.0):
        raise ValueError(f"Latitude {latitude} is out of valid range [-90, 90].")
    if not (-180.0 <= longitude <= 180.0):
        raise ValueError(f"Longitude {longitude} is out of valid range [-180, 180].")
    return latitude, longitude


def validate_ethiopia_bounds(latitude: float, longitude: float) -> bool:
    """Check if coordinates fall roughly within Ethiopia bounding box [3N, 33E, 15N, 48E]."""
    return 3.0 <= latitude <= 15.0 and 33.0 <= longitude <= 48.0
