# dashboard/

The interactive dashboard: plain HTML, CSS, and JavaScript, with no build step.

| Page | Contents |
|---|---|
| `index.html` | Blocker table, filterable and sortable, with win rate, expected win rate, and WROE |
| `team.html` | Team rankings, by division or league-wide |
| `matchup.html` | One blocker's season, grouped by opponent and week |
| `play-animator.html` | Frame-by-frame replays with a live win-probability curve |

## Running it locally

The pages load JSON with `fetch`, which browsers block when you open a file directly. Serve the folder instead:

```
cd dashboard
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html`.

## Data

`data/` holds three aggregated files: blocker-level, team-level, and matchup-level win rates and snap counts. They are summary statistics produced by `06_dashboard-export.ipynb`.

## Play Viewer data is not included

`play-animator.html` needs `data/play_animator_data.json`, which contains frame-level player positions from the competition tracking data and cannot be redistributed. To use the page, obtain the data, run the notebooks, and `07_play-animator.ipynb` will create the file.

## Third-party images

Team logos load from ESPN's image CDN, and player headshots load from URLs in the nflverse players dataset. Neither is stored in this repository.
