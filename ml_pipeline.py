import os
import json
import joblib
import pandas as pd
import numpy as np
import datetime
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64

class IrisMLPipeline:
    def __init__(self, n_neighbors=5):
        self.n_neighbors = n_neighbors
        self.model = None
        self.scaler = StandardScaler()
        self.feature_names = ['Sepal Length', 'Sepal Width', 'Petal Length', 'Petal Width']
        self.class_names = ['Setosa', 'Versicolor', 'Virginica']
        self.is_trained = False
        self.history_file = 'exports/training_history.json'
        self.local_data_path = 'data/iris.csv'
        os.makedirs('data', exist_ok=True)
        os.makedirs('exports', exist_ok=True)
        
        # Load data upon initialization locally
        self.predictions_count = 0
        if os.path.exists(self.local_data_path):
            self.df = pd.read_csv(self.local_data_path)
        else:
            self.iris = load_iris()
            self.df = pd.DataFrame(self.iris.data, columns=self.feature_names)
            self.df['Target'] = self.iris.target
            self.df['Species'] = self.df['Target'].map(dict(enumerate(self.class_names)))
            self.df.to_csv(self.local_data_path, index=False)
            
        self.metrics = {}
        self.history = self.get_training_history()

    def get_dataset_info(self):
        try:
            class_dist_plot = self.generate_class_distribution_plot()
        except:
            class_dist_plot = None
            
        return {
            "samples": len(self.df),
            "classes": len(self.class_names),
            "features": len(self.feature_names),
            "class_names": self.class_names,
            "feature_names": self.feature_names,
            "class_distribution_plot": class_dist_plot,
            "is_trained": self.is_trained
        }
        
    def get_dataset_explorer_data(self):
        try:
            desc = self.df.describe().T.reset_index().round(2)
            desc.rename(columns={'index': 'Feature'}, inplace=True)
            stats = desc.replace({np.nan: None}).to_dict('records')
            
            # Map columns cleanly for First 10 / Last 10
            df_display = self.df.copy()
            df_display.rename(columns={'Target': 'Flower ID', 'Species': 'Flower Name'}, inplace=True)
            
            return {
                "shape": f"{self.df.shape[0]} rows × {self.df.shape[1]} columns",
                "stats": stats,
                "head": df_display.head(10).replace({np.nan: None}).to_dict('records'),
                "tail": df_display.tail(10).replace({np.nan: None}).to_dict('records')
            }
        except Exception as e:
            return {"error": str(e)}
            
    def reset_state(self):
        # Reset memory state
        self.is_trained = False
        self.metrics = {}
        self.history = []
        self.predictions_count = 0
        if os.path.exists(self.history_file):
            try:
                os.remove(self.history_file)
            except:
                pass
        return {"status": "reset"}

    def train_model(self):
        import time
        start_time = time.time()
        
        # 1. Feature Scaling using StandardScaler
        X = self.df[self.feature_names].values
        y = self.df['Target'].values
        
        # 2. Train-Test Split (80% / 20%)
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
        
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # 3. Train Classification Model (KNN)
        self.model = KNeighborsClassifier(n_neighbors=self.n_neighbors)
        self.model.fit(X_train_scaled, y_train)
        
        # Test the model
        y_pred = self.model.predict(X_test_scaled)
        
        # Calculate dominant predicted species
        unique, counts = np.unique(y_pred, return_counts=True)
        dominant_idx = unique[np.argmax(counts)]
        dominant_species = self.class_names[dominant_idx]
        
        self.metrics = {
            'accuracy': float(accuracy_score(y_test, y_pred)),
            'precision': float(precision_score(y_test, y_pred, average='weighted', zero_division=0)),
            'recall': float(recall_score(y_test, y_pred, average='weighted', zero_division=0)),
            'f1_score': float(f1_score(y_test, y_pred, average='weighted', zero_division=0)),
            'confusion_matrix': confusion_matrix(y_test, y_pred).tolist()
        }
        
        self.is_trained = True
        self.predictions_count = 0
        
        end_time = time.time()
        training_duration_ms = int((end_time - start_time) * 1000)
        
        grade = "Excellent" if self.metrics['accuracy'] >= 0.95 else "Good" if self.metrics['accuracy'] >= 0.85 else "Fair"
        
        # Save to history
        history_entry = {
            'timestamp': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            'k_value': self.n_neighbors,
            'model_type': 'KNN',
            'dominant_predicted': dominant_species,
            'training_status': 'Success',
            'grade': grade,
            'metrics': self.metrics,
            'total_predictions': 0,
            'training_duration': f"{training_duration_ms} ms",
            'model_status': 'Active',
            'notes': 'Standard KNN Sequence'
        }
        history_entry['session'] = len(self.history) + 1
        self.history.insert(0, history_entry)
        
        # Save model and log history
        self.save_model()
        self.generate_report()
        self.log_training_history()
        
        return self.metrics

    def compare_models(self):
        # Train and compare KNN, Decision Tree, Random Forest
        X = self.df[self.feature_names].values
        y = self.df['Target'].values
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
        
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        models = {
            "KNN (K=5)": KNeighborsClassifier(n_neighbors=5),
            "Decision Tree": DecisionTreeClassifier(random_state=42),
            "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42)
        }
        
        results = []
        for name, m in models.items():
            m.fit(X_train_scaled, y_train)
            y_pred = m.predict(X_test_scaled)
            results.append({
                "algorithm": name,
                "accuracy": float(accuracy_score(y_test, y_pred)),
                "precision": float(precision_score(y_test, y_pred, average='weighted', zero_division=0)),
                "recall": float(recall_score(y_test, y_pred, average='weighted', zero_division=0)),
                "f1_score": float(f1_score(y_test, y_pred, average='weighted', zero_division=0))
            })
            
        # Sort by accuracy descending for leaderboard
        results = sorted(results, key=lambda x: x['accuracy'], reverse=True)
        return results

    def predict_species(self, sepal_length, sepal_width, petal_length, petal_width):
        if not self.is_trained:
            self.load_model()
            
        if not self.is_trained:
            self.train_model()
            
        features = np.array([[sepal_length, sepal_width, petal_length, petal_width]])
        scaled_features = self.scaler.transform(features)
        
        prediction = self.model.predict(scaled_features)[0]
        probabilities = self.model.predict_proba(scaled_features)[0]
        confidence = float(np.max(probabilities))
        
        self.predictions_count += 1
        
        # Update predictions count on the latest history entry
        if len(self.history) > 0:
            self.history[0]['total_predictions'] = self.predictions_count
            try:
                with open(self.history_file, 'w') as f:
                    json.dump(self.history, f)
            except:
                pass
        
        predicted_class = self.class_names[prediction]
        
        explanation = f"The model predicts this flower belongs to the Iris {predicted_class} class " \
                      f"with {confidence*100:.1f}% confidence because its measurements closely match " \
                      f"patterns learned from the training dataset."
                      
        # Auto-export to CSV
        self.export_prediction_to_csv([sepal_length, sepal_width, petal_length, petal_width], predicted_class, confidence)
        
        return {
            "prediction": predicted_class,
            "confidence": confidence,
            "explanation": explanation
        }

    def save_model(self):
        os.makedirs('models', exist_ok=True)
        joblib.dump(self.model, 'models/knn_model.joblib')
        joblib.dump(self.scaler, 'models/scaler.joblib')

    def load_model(self):
        try:
            self.model = joblib.load('models/knn_model.joblib')
            self.scaler = joblib.load('models/scaler.joblib')
            self.is_trained = True
            return True
        except FileNotFoundError:
            return False

    def log_training_history(self):
        os.makedirs(os.path.dirname(self.history_file), exist_ok=True)
        with open(self.history_file, 'w') as f:
            json.dump(self.history, f, indent=4)
            
    def get_training_history(self):
        if os.path.exists(self.history_file):
            try:
                with open(self.history_file, 'r') as f:
                    return json.load(f)
            except:
                return []
        return []

    def generate_report(self):
        os.makedirs('reports', exist_ok=True)
        report_content = f"""DecodeLabs Project 2 - AI Classification Report
=============================================
Algorithm: K-Nearest Neighbors (K={self.n_neighbors})

Performance Metrics:
- Accuracy:  {self.metrics['accuracy']:.4f}
- Precision: {self.metrics['precision']:.4f}
- Recall:    {self.metrics['recall']:.4f}
- F1 Score:  {self.metrics['f1_score']:.4f}

Confusion Matrix:
{np.array(self.metrics['confusion_matrix'])}

Generated automatically by K. M. A² Intelligence Framework.
"""
        with open('reports/evaluation_report.txt', 'w') as f:
            f.write(report_content)

    def export_prediction_to_csv(self, features, predicted_class, confidence):
        os.makedirs('exports', exist_ok=True)
        file_path = 'exports/predictions_log.csv'
        
        df_new = pd.DataFrame([features + [predicted_class, confidence]], 
                              columns=self.feature_names + ['Predicted_Class', 'Confidence'])
                              
        if not os.path.isfile(file_path):
            df_new.to_csv(file_path, index=False)
        else:
            df_new.to_csv(file_path, mode='a', header=False, index=False)

    def _fig_to_base64(self, fig):
        buf = io.BytesIO()
        fig.savefig(buf, format='png', dpi=100, bbox_inches='tight')
        buf.seek(0)
        img_base64 = base64.b64encode(buf.read()).decode('utf-8')
        plt.close(fig)
        return img_base64

    # Existing Visualizations
    def generate_confusion_matrix_plot(self):
        if not self.metrics.get('confusion_matrix'): return None
        cm = np.array(self.metrics['confusion_matrix'])
        fig = plt.figure(figsize=(6, 4))
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=self.class_names, yticklabels=self.class_names)
        plt.title('Confusion Matrix')
        plt.xlabel('Predicted Label')
        plt.ylabel('True Label')
        return self._fig_to_base64(fig)
        
    def generate_feature_distribution_plot(self):
        fig = plt.figure(figsize=(8, 5))
        for feature in self.feature_names:
            sns.kdeplot(self.df[feature], label=feature, fill=True)
        plt.title('Feature Distributions')
        plt.legend()
        return self._fig_to_base64(fig)

    def generate_class_distribution_plot(self):
        fig = plt.figure(figsize=(6, 4))
        sns.countplot(data=self.df, x='Species', palette='viridis', hue='Species', legend=False)
        plt.title('Class Distribution')
        return self._fig_to_base64(fig)
        
    # Advanced Data Insights
    def generate_correlation_heatmap(self):
        fig = plt.figure(figsize=(6, 5))
        corr = self.df[self.feature_names].corr()
        sns.heatmap(corr, annot=True, cmap='coolwarm', fmt=".2f", vmin=-1, vmax=1)
        plt.title('Feature Correlation Heatmap')
        return self._fig_to_base64(fig)
        
    def generate_feature_importance_plot(self):
        # We use a quick Random Forest to extract feature importance for insights
        rf = RandomForestClassifier(n_estimators=100, random_state=42)
        rf.fit(self.df[self.feature_names], self.df['Target'])
        importances = rf.feature_importances_
        
        fig = plt.figure(figsize=(6, 4))
        sns.barplot(x=importances, y=self.feature_names, palette='magma', hue=self.feature_names, legend=False)
        plt.title('Feature Importance (via Random Forest)')
        plt.xlabel('Importance Score')
        return self._fig_to_base64(fig)

    def get_feature_importance_data(self):
        rf = RandomForestClassifier(n_estimators=100, random_state=42)
        rf.fit(self.df[self.feature_names], self.df['Target'])
        importances = rf.feature_importances_
        feature_importance_list = []
        for i, name in enumerate(self.feature_names):
            feature_importance_list.append({"name": name.replace('_', ' ').title(), "importance": importances[i]})
        
        feature_importance_list.sort(key=lambda x: x["importance"], reverse=True)
        return {
            "most_important": feature_importance_list[0],
            "least_important": feature_importance_list[-1]
        }


# Initialize single instance
pipeline = IrisMLPipeline()
