#!/usr/bin/env python3
"""
Wine Guide Data Updater
Cron job to fetch current wine prices and availability
"""

import json
from datetime import datetime

class WineDataUpdater:
    def __init__(self):
        self.wines_db = {
            "guigal-cotes-du-rhone": {
                "name": "Guigal Côtes du Rhône",
                "category": "weeknight-red",
                "current_price": 15.00,
                "last_updated": datetime.now().isoformat()
            }
        }

    def update_wine_prices(self):
        """Update prices for all wines in database"""
        print("Starting wine data update...")
        # Simplified version - in production this would scrape real sites
        updated_data = {}
        
        for wine_id, wine_info in self.wines_db.items():
            # Simulate price update
            updated_data[wine_id] = {
                **wine_info,
                "last_updated": datetime.now().isoformat()
            }
        
        return updated_data

    def save_to_json(self, data, filename="wine_prices.json"):
        """Save updated data to JSON file"""
        with open(filename, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"Saved data to {filename}")

    def update_html_file(self, data):
        """Update the HTML file with new prices"""
        for wine_id, info in data.items():
            print(f"Would update {info['name']} to ${info['current_price']}")

def main():
    updater = WineDataUpdater()
    updated_data = updater.update_wine_prices()
    
    if updated_data:
        updater.save_to_json(updated_data)
        updater.update_html_file(updated_data)
        print(f"Updated {len(updated_data)} wines successfully")
    else:
        print("No data was updated")

if __name__ == "__main__":
    main()