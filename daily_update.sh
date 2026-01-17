#!/bin/bash
# Wine Guide Daily Update Script
# This script updates wine prices and data daily

cd /Users/wscholl/wine-guide

# Activate virtual environment if using one
# source venv/bin/activate

# Run the update script
python3 update_wine_data.py >> update_log.txt 2>&1

# Check if update was successful
if [ $? -eq 0 ]; then
    echo "$(date): Wine data update completed successfully" >> update_log.txt
else
    echo "$(date): Wine data update failed" >> update_log.txt
fi

# Optional: Commit changes to git if running in a repo
# git add wine_prices.json
# git commit -m "Daily wine price update $(date +%Y-%m-%d)"
# git push origin main</content>
<parameter name="filePath">/Users/wscholl/wine-guide/daily_update.sh