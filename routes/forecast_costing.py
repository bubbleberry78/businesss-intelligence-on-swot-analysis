import os
from flask import Blueprint, Flask, jsonify, request
from pymongo import MongoClient
import joblib

app = Flask(__name__)
costing_model_bp = Blueprint('costing-model', __name__)
# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['swot_user']  # Change 'your_database' to your actual database name
collection = db['users']  # Change 'your_collection' to your actual collection name

# Load the profit model
model_directory = os.path.join(os.getcwd(), 'models')
costing_model_path = os.path.join(model_directory, 'costing_model.joblib')

if os.path.exists(costing_model_path):
    costing_model = joblib.load(costing_model_path)
else:
    raise FileNotFoundError(f"Profit model not found at {costing_model_path}")

@costing_model_bp.route('/forecast/costing', methods=['POST'])
def forecast_sales():
    # Get session ID from frontend
    session_id = request.json.get('session_id')

    # Retrieve data from MongoDB based on session ID
    data = collection.find_one({'session_id': session_id})

    # Get forecast duration from frontend
    forecast_duration = request.json.get('forecast_duration')  # e.g., 1, 3, or 5 years

    if(forecast_duration==1):
        steps = 12
    elif(forecast_duration==3):
        steps = 36
    elif(forecast_duration==5):
        steps =60

    costing_forecast = costing_model.forecast(steps=steps)

    # Construct response data
    response_data = {
        'costing_forecast': costing_forecast.tolist()  # Convert to list for JSON serialization
        # Add other forecasted values if needed
    }

    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)
