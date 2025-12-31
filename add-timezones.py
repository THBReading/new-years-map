import json
from timezonefinder import TimezoneFinder

tf = TimezoneFinder()

# Load GeoJSON
with open("capitals.geojson", "r", encoding="utf-8") as f:
    geojson = json.load(f)

# Add timezone to each feature
for feature in geojson["features"]:
    lon, lat = feature["geometry"]["coordinates"]
    timezone = tf.timezone_at(lng=lon, lat=lat)

    feature["properties"]["timezone"] = timezone

# Save new GeoJSON
with open("capitals_with_timezone.geojson", "w", encoding="utf-8") as f:
    json.dump(geojson, f, ensure_ascii=False, indent=2)

print("Done! Saved capitals_with_timezone.geojson")
