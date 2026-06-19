# Advanced Iris Classification System

A premium machine learning application for Iris flower classification using the K-Nearest Neighbors (KNN) algorithm.

---

## 🌟 Overview
The **Advanced Iris Classification System** is an elegant, modern, and highly interactive machine learning web application. It integrates a powerful Python backend with a beautifully crafted frontend, allowing users to train a K-Nearest Neighbors (KNN) classification model from scratch, visually explore datasets, and perform real-time, highly accurate predictions on Iris flower species.

**Powered by the K. M. A² Intelligence Framework**

---

## 🚀 Features
- **Dynamic Model Training**: Train the KNN model in real-time with customizable `K` values.
- **Interactive Prediction Engine**: Predict flower species with confidence scores and detailed explanations.
- **Comprehensive Visualizations**: View Confusion Matrices, Feature Distributions, Class Distributions, and Correlation Heatmaps generated dynamically via Python.
- **Sample Flower Values Module**: Auto-fill prediction values using standard references for Setosa, Versicolor, and Virginica flowers.
- **Dataset Explorer**: Dive into the underlying Iris dataset with statistical summaries, exact measurements, and prediction logs.
- **Training & Prediction History**: Track every model training session, test accuracy, and manual prediction with full PDF export functionality.
- **Premium UI/UX**: Custom-designed dark mode interface with glassmorphism, micro-animations, loading splash screens, and responsive design.

---

## 🛠️ Technologies Used
- **Backend**: Python 3.x, FastAPI, Uvicorn
- **Machine Learning**: Scikit-Learn, Pandas, NumPy
- **Data Visualization**: Matplotlib, Seaborn
- **Frontend**: HTML5, Vanilla CSS3 (Custom Styling, Flexbox/Grid), Vanilla JavaScript (ES6)

---

## ⚙️ Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/alijanquasimi12-sketch/Advanced-Iris-Classification-System.git
   cd Advanced-Iris-Classification-System
   ```

2. **Set up a Virtual Environment** (Optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Application**:
   ```bash
   python main.py
   ```
   *The server will start at `http://127.0.0.1:8000`*

---

## 📖 Usage Instructions

### Model Training Workflow
1. Navigate to the **Model Settings** section.
2. Adjust the **K (Neighbors) Value** to tune the model.
3. Click **Train KNN Model**. The system will process the dataset, train the model, and display performance metrics (Accuracy, Precision, Recall, F1 Score) instantly.

### Prediction Workflow
1. Navigate to the **Prediction Engine**.
2. Enter measurements for Sepal Length, Sepal Width, Petal Length, and Petal Width.
3. Click **Predict Species** to view the classified flower, confidence percentage, and an AI-generated explanation.

### Sample Flower Values
1. Click the **Sample Flower Values** button in the Prediction Engine.
2. Select a flower (Setosa, Versicolor, or Virginica) to view reference measurements.
3. Click **Set as Default Values** to instantly auto-fill the Prediction Engine.

### Dataset Explorer
1. Click **Dataset Explorer** on the left panel.
2. Review the statistical summary, dataset shape, and explore the exact measurements from the training set alongside your own Prediction Dataset Log.

### Prediction History & Export Functionality
1. Click the **History** button within the Prediction Engine.
2. View all past manual predictions associated with the active session.
3. Click **Export PDF** to generate and download a beautifully formatted, print-ready PDF report of all your predictions.

---

## 👨‍💻 About Developer
**Mohammed Asjad Aliyan K (K. M. A²)**
Developed under **K. M. A² Innovation Labs**

---

## 📝 About Project
This project was developed as **Task 2** for the DecodeLabs internship program. It represents a synthesis of modern full-stack web development and applied machine learning, delivering not just a predictive model, but a complete, user-friendly AI product.

**K. M. A² Signature Series**
*Redefining Machine Learning Interfaces.*
