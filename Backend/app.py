from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load models
fertilizer_model = joblib.load('fertilizer_recommendation_model.pkl')
crop_yield_model = joblib.load('cropdetectionyeild.pkl')

@app.route('/fertilizer', methods=['POST'])
def predict_fertilizer():
    """API to predict fertilizer recommendation."""
    data = request.get_json()  # Get JSON data from React frontend
    
    input_data = np.array([[  
        float(data['temperature']),
        float(data['humidity']),
        float(data['moisture']),
        float(data['nitrogen']),
        float(data['potassium']),
        float(data['phosphorous']),
        int(data['soil_type']),  
        int(data['crop_type'])    
    ]])

    prediction = fertilizer_model.predict(input_data)[0]
    return jsonify({'predicted_fertilizer': prediction})

@app.route('/cropyield', methods=['POST'])
def get_crop_yield():
    """API to predict crop yield."""
    data = request.get_json()
    
    input_data = np.array([[  
        float(data['N']),
        float(data['P']),
        float(data['K']),
        float(data['temperature']),
        float(data['humidity']),
        float(data['ph']),
        float(data['rainfall']),
    ]])

    prediction = crop_yield_model.predict(input_data)[0]
    return jsonify({'predicted_crop_yield': prediction})

if __name__ == '__main__':
    app.run(debug=True)
