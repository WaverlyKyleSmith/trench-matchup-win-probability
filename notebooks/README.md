# notebooks/

The full analysis pipeline, in run order. Each notebook is one stage described in the writeup.

| Notebook | What it does |
|---|---|
| `01_ingest.ipynb` | Loads the raw tracking and scouting data, filters to pass-block plays, trims each play to the snap-to-outcome window |
| `02_snapshot-features.ipynb` | Pairs each blocker with their rusher and builds the snapshot feature table |
| `03_xgboost.ipynb` | Trains and tunes the XGBoost model; SHAP interpretation |
| `04_lstm.ipynb` | Trains the LSTM on full frame-by-frame sequences; permutation importance |
| `05_model-comparison.ipynb` | Compares both models on a shared, identifier-matched test set |
| `06_dashboard-export.ipynb` | Calibrates probabilities, runs full-season inference, writes the dashboard JSON files |
| `07_play-animator.ipynb` | Selects 50 plays, runs frame-by-frame inference, writes the Play Viewer data |

## Before you run anything

1. Download the NFL Big Data Bowl 2023 data from Kaggle (see the root README) and place it in a folder `nfl-big-data-bowl-2023/` at the repo root.
2. Python 3.12 with: pandas, numpy, pyarrow, scikit-learn, xgboost, shap, matplotlib, and PyTorch.
3. Run the notebooks in order, from this folder. Paths are relative (`../processed/`, `../models/`, and so on).

Notebooks 02, 04, 06, and 07 re-run `01_ingest.ipynb` rather than reading a saved copy, so they are slow. Notebooks 06 and 07 run model inference over many sequences and take the longest.

Cell outputs have been cleared before publishing, because printed tables would contain competition data.
