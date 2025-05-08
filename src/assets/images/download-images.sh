#!/bin/bash

# Create a directory for temporary downloads
mkdir -p temp_downloads

# Download images for fitness equipment
curl -o temp_downloads/chest-press.png "https://raw.githubusercontent.com/fitness-tracker-images/equipment/main/chest-press.png"
curl -o temp_downloads/seated-dip.png "https://raw.githubusercontent.com/fitness-tracker-images/equipment/main/seated-dip.png"
curl -o temp_downloads/bench-press.png "https://raw.githubusercontent.com/fitness-tracker-images/equipment/main/bench-press.png"
curl -o temp_downloads/bicep-curl.png "https://raw.githubusercontent.com/fitness-tracker-images/equipment/main/bicep-curl.png"
curl -o temp_downloads/arm-curl.png "https://raw.githubusercontent.com/fitness-tracker-images/equipment/main/arm-curl.png"
curl -o temp_downloads/arm-extension.png "https://raw.githubusercontent.com/fitness-tracker-images/equipment/main/arm-extension.png"
curl -o temp_downloads/triceps-press.png "https://raw.githubusercontent.com/fitness-tracker-images/equipment/main/triceps-press.png"
curl -o temp_downloads/shoulder-press.png "https://raw.githubusercontent.com/fitness-tracker-images/equipment/main/shoulder-press.png"
curl -o temp_downloads/lateral-raises.png "https://raw.githubusercontent.com/fitness-tracker-images/equipment/main/lateral-raises.png"
curl -o temp_downloads/cable-row.png "https://raw.githubusercontent.com/fitness-tracker-images/equipment/main/cable-row.png"
curl -o temp_downloads/lat-pulldown.png "https://raw.githubusercontent.com/fitness-tracker-images/equipment/main/lat-pulldown.png"
curl -o temp_downloads/abdominal-bench.png "https://raw.githubusercontent.com/fitness-tracker-images/equipment/main/abdominal-bench.png"
curl -o temp_downloads/barbell.png "https://raw.githubusercontent.com/fitness-tracker-images/equipment/main/barbell.png"
curl -o temp_downloads/weight-plates.png "https://raw.githubusercontent.com/fitness-tracker-images/equipment/main/weight-plates.png"
curl -o temp_downloads/kettlebells.png "https://raw.githubusercontent.com/fitness-tracker-images/equipment/main/kettlebells.png"
curl -o temp_downloads/resistance-bands.png "https://raw.githubusercontent.com/fitness-tracker-images/equipment/main/resistance-bands.png"
curl -o temp_downloads/workout-mirror.png "https://raw.githubusercontent.com/fitness-tracker-images/equipment/main/workout-mirror.png"
curl -o temp_downloads/landmine.png "https://raw.githubusercontent.com/fitness-tracker-images/equipment/main/landmine.png"
curl -o temp_downloads/trap-bar.png "https://raw.githubusercontent.com/fitness-tracker-images/equipment/main/trap-bar.png"
curl -o temp_downloads/dumbbell-set.png "https://raw.githubusercontent.com/fitness-tracker-images/equipment/main/dumbbell-set.png"

# Move downloaded images to the assets/images directory
mv temp_downloads/*.png .

# Remove temporary directory
rm -rf temp_downloads

echo "All images downloaded successfully!"
