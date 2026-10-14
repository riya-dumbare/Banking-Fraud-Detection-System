import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.ensemble import IsolationForest


class AnomalyScore(BaseEstimator, TransformerMixin):
    """Appends an Isolation Forest anomaly score as an extra feature column."""

    def __init__(self, n_estimators=200, random_state=42):
        self.n_estimators = n_estimators
        self.random_state = random_state

    def fit(self, X, y=None):
        self.iso_ = IsolationForest(
            n_estimators=self.n_estimators, random_state=self.random_state
        ).fit(np.asarray(X))
        return self

    def transform(self, X):
        X = np.asarray(X)
        return np.column_stack([X, -self.iso_.score_samples(X)])