# models/

| File | Contents |
|---|---|
| `xgboost_snapshot.json` | Trained XGBoost model (`03_xgboost.ipynb`) |
| `lstm_sequence.pt` | Trained LSTM weights, saved as a PyTorch `state_dict` (`04_lstm.ipynb`) |

To load the LSTM, you need the `BlockOutcomeLSTM` class definition from `04_lstm.ipynb`, because only the weights are saved, not the architecture.

The Platt-scaling calibrator is not saved. Notebooks 06 and 07 refit it from the LSTM's test-set predictions.

LSTM weights were not seeded, so retraining gives slightly different results (AUC ranged from 0.806 to 0.821 across runs).
