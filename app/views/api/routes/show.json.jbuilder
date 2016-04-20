# not currently in use

json.athlete_id @route["athlete"]["id"]
json.extract! @route, description, :distance, :elevation_gain, :id, :name, :timestamp
json.extract! @route.map, :id, :summary_polyline, :polyline
