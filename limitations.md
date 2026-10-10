# Limitations

## Data Scope and Vintage

The dataset reflects a single season (2021) and an eight-week window within it. This is the only publicly available player-tracking dataset scoped to offensive and defensive line pass-block matchups as of this writing. No newer season has been released with comparable charting. Every result in this document should be read as describing that specific window, not a full season or a multi-season pattern.

## Ingestion

Approximately 0.3% of otherwise-valid plays in a spot-checked week lacked a tagged snap event and were dropped for lack of a valid frame window. The snap-to-outcome window ends at the first of several tagged events. Tracking anomalies around these event tags were not separately audited and could introduce minor imprecision in a small number of plays.

## Block-Type and Matchup Scoring

Blocking assignments tagged SW (switch), PT (post), BH (backfield help), CH (chip) represent shared or handed-off responsibility rather than a clean one-on-one rep. These were flagged as assisted blocks rather than excluded, meaning the win/loss outcome for these rows may not belong entirely to the tagged blocker. Scrambles were excluded from the play population entirely, on the reasoning that a broken pocket is not a fair test of a blocking rep; this narrows the studied population to clean dropback plays only.

## Feature Scoping

Thin categories in offensive formation and defensive coverage were collapsed using a manually chosen frequency threshold rather than a statistically derived one. Coverage-scheme variables were excluded from modeling on the reasoning that they are mechanically unrelated to an individual blocking matchup. This is a deliberate scoping choice, not a data limitation, but one that trades a potentially relevant signal for interpretability. The blitz-flag threshold is a conventional but not universally standardized definition (5+ rushers).

The dx and dy input features (raw x- and y-axis separation between blocker and rusher) were computed in unadjusted field coordinates and were never normalized for play direction in either model's feature set. Because a play can run toward either end of the field, dx in particular does not consistently represent the same spatial relationship across different plays. This normalization was later built for the play animator's visual display, but was never applied to the modeling features themselves. Permutation importance shows both features carry negligible weight in the lSTM's predictions, which is consistent with the model having learned not to rely on this inconsistent signal, but it remains a real gap in the engineered feature set rather than a corrected one.

## XGBoost

The snapshot approach's three sampled points can coincide for very short blocking reps, collapsing the "one second in" and "final frame" snapshots into very similar frames. The model's most important features describe the end state of a rep rather than its opening moments, meaning it performs more retrospective grading of how a block resolved than genuine early-rep prediction. The class-weighting value of 6.5 was a deliberate choice trading precision for recall, not a value that optimizes a single best metric, and hyperparameter tuning was a modest three-fold grid search rather than an exhaustive one.

## LSTM

Sequences were padded or truncated to the 95th-percentile observed length; the longest approximately 5% of the blocking reps lose their tail frames. Model weights were not seeded, so results vary modestly between otherwise-identical training runs. Unlike XGBoost, the LSTM has no exact per-prediction attribution method; permutation importance estimates aggregate feature importance but does not explain any single prediction the way SHAP does, a real interpretability tradeoff in exchange for the model's stronger predictive performance.

## From Model to Product

The 80-snap qualification threshold was set at an empirically observed valley in the snap-count distribution rather than derived from a formal statistical test, and it excludes any blocker below that count even if their limited sample happens to reflect real performance. Player headshots are matched to the dashboard's blocker list by name against a separate public dataset, since the two sources used incompatible player ID systems; nine of 188 blockers required a manual name-format correction, and a small number of players have no headshot on file in the source data at all.

## Play Animator

The animator covers a curated 50 of the season's 42,080 matchups, not full-season coverage, due to the computational cost of true incremental inference at scale. The "movement swing" and "probability swing" categories are related but distinct selection methods, and are not interchangeable despite both being informally described as showing a "dramatic" play. Each play's displayed line of scrimmage is approximated from the center's tracked position at the first real frame rather than an authoritative field maker, since no such marker exists in the source data at this granularity.
