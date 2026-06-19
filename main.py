import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from ml_pipeline import pipeline
import os

app = FastAPI(title="DecodeLabs Project 2 - AI Classification")

# Mount assets directory for static files
app.mount("/assets", StaticFiles(directory="assets"), name="assets")

class TrainRequest(BaseModel):
    n_neighbors: int = 5

class PredictRequest(BaseModel):
    sepal_length: float
    sepal_width: float
    petal_length: float
    petal_width: float

@app.get("/")
async def read_index():
    return FileResponse("assets/index.html")

@app.get("/api/info")
async def get_info():
    info = pipeline.get_dataset_info()
    
    plots = {}
    try:
        plots["correlation_heatmap"] = pipeline.generate_correlation_heatmap()
    except:
        plots["correlation_heatmap"] = None
        
    try:
        plots["feature_importance"] = pipeline.generate_feature_importance_plot()
    except:
        plots["feature_importance"] = None
        
    try:
        plots["class_distribution"] = pipeline.generate_class_distribution_plot()
    except:
        plots["class_distribution"] = None
        
    try:
        feature_importance_data = pipeline.get_feature_importance_data()
    except:
        feature_importance_data = None
        
    if pipeline.is_trained:
        try: plots["confusion_matrix"] = pipeline.generate_confusion_matrix_plot()
        except: pass
        try: plots["feature_distribution"] = pipeline.generate_feature_distribution_plot()
        except: pass
        
    info["plots"] = plots
    info["feature_importance_data"] = feature_importance_data
    return info

@app.get("/api/dataset")
async def get_dataset():
    return pipeline.get_dataset_explorer_data()

@app.get("/api/history")
async def get_history():
    return pipeline.get_training_history()

@app.get("/api/reset")
async def reset_state():
    return pipeline.reset_state()

@app.get("/api/compare")
async def compare_models():
    try:
        results = pipeline.compare_models()
        return {"status": "success", "leaderboard": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/train")
async def train_model(req: TrainRequest):
    try:
        pipeline.n_neighbors = req.n_neighbors
        metrics = pipeline.train_model()
        
        # Generate base64 images for the dashboard
        cm_plot = pipeline.generate_confusion_matrix_plot()
        feature_plot = pipeline.generate_feature_distribution_plot()
        class_plot = pipeline.generate_class_distribution_plot()
        corr_heatmap = pipeline.generate_correlation_heatmap()
        feat_importance = pipeline.generate_feature_importance_plot()
        feature_importance_data = pipeline.get_feature_importance_data()
        
        return {
            "status": "success",
            "message": "Model trained successfully.",
            "metrics": metrics,
            "feature_importance_data": feature_importance_data,
            "plots": {
                "confusion_matrix": cm_plot,
                "feature_distribution": feature_plot,
                "class_distribution": class_plot,
                "correlation_heatmap": corr_heatmap,
                "feature_importance": feat_importance
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/predict")
async def predict(req: PredictRequest):
    try:
        result = pipeline.predict_species(
            req.sepal_length, 
            req.sepal_width, 
            req.petal_length, 
            req.petal_width
        )
        return {"status": "success", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    print("Starting K. M. A² Intelligence Framework...")
    if pipeline.load_model():
        print("Existing model loaded successfully.")
    else:
        print("No existing model found. Will train a new one upon request.")
        
    uvicorn.run(app, host="127.0.0.1", port=8000)
