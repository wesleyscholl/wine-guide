# Quality Wine Guide - Under $40

A comprehensive, user-friendly wine guide featuring carefully selected wines under $40, with daily updates for current prices and availability.

## Features

- 🎯 **8 Wine Categories**: From beginner-friendly to dinner party specials
- 🔍 **Search & Filter**: Find wines by type, price, or keywords
- 📱 **Mobile Responsive**: Works perfectly on all devices
- ✨ **Smooth Animations**: Subtle, elegant interactions
- 📊 **Individual Wine Pages**: Detailed information for each wine
- 🔄 **Daily Updates**: Automated price and availability checking
- 👥 **Related Wines**: Discover similar bottles you might enjoy

## Categories

1. **Weeknight Red** - Easy reds for everyday meals ($15-22)
2. **Crisp White** - Light whites for salads and porch sipping ($12-18)
3. **Sparkling** - Bubbles for celebrations ($12-30)
4. **Dinner Party** - Impressive bottles without breaking the bank ($25-40)
5. **Seafood White** - Perfect pairings for fish and shellfish ($18-30)
6. **Winter Warmth** - Bold reds for cozy nights ($20-35)
7. **Date Night** - Special occasion wines ($25-40)
8. **Beginner Friendly** - Easy-drinking starters ($10-18)

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Set Up Daily Updates (Cron Job)

#### On macOS/Linux:

```bash
# Edit crontab
crontab -e

# Add this line to run daily at 2 AM:
0 2 * * * /Users/wscholl/wine-guide/daily_update.sh
```

#### On Windows (Task Scheduler):

1. Open Task Scheduler
2. Create new task
3. Set trigger to daily at 2:00 AM
4. Set action to run: `C:\path\to\python.exe C:\path\to\wine-guide\update_wine_data.py`

### 3. Initial Data Update

```bash
python3 update_wine_data.py
```

## File Structure

```
wine-guide/
├── index.html              # Main guide page
├── wines/                  # Individual wine pages
│   └── guigal-cotes-du-rhone.html
├── update_wine_data.py     # Data scraping script
├── daily_update.sh         # Cron job script
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

## Adding New Wines

### 1. Create Wine Detail Page

Create `wines/wine-name.html` with the wine's detailed information.

### 2. Update Database

Add to `update_wine_data.py`:

```python
"wine-slug": {
    "name": "Full Wine Name",
    "category": "category-name",
    "search_terms": ["term1", "term2"],
    "sources": ["totalwine", "winecom"]
}
```

### 3. Add to Main Page

Update the picks section in `index.html` with the new wine.

## API Integration Ideas

For more advanced updates, consider:

- **Vivino API**: Wine ratings and reviews
- **Wine.com API**: Official price and inventory data
- **Wine Spectator API**: Professional reviews
- **Google Shopping API**: Price comparison across retailers

## Contributing

1. Fork the repository
2. Add new wines or improve existing content
3. Test the search and filter functionality
4. Submit a pull request

## License

This wine guide is for educational purposes. Wine recommendations are subjective and prices may vary by location and retailer.</content>
<parameter name="filePath">/Users/wscholl/wine-guide/README.md