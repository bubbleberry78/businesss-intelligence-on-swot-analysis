import os
from flask import Blueprint, Flask, jsonify, request
from pymongo import MongoClient
import joblib

app = Flask(__name__)
operations_model_bp = Blueprint('operations-model', __name__)
# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['swot_user']  # Change 'your_database' to your actual database name
collection = db['users']  # Change 'your_collection' to your actual collection name

# Load the profit model
model_directory = os.path.join(os.getcwd(), 'models')
operations_model_path = os.path.join(model_directory, 'operatingExpenses_model.joblib')

if os.path.exists(operations_model_path):
    operations_model = joblib.load(operations_model_path)
else:
    raise FileNotFoundError(f"Profit model not found at {operations_model_path}")

@operations_model_bp.route('/forecast/operations', methods=['POST'])
def forecast_production():
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

    operations_forecast = operations_model.forecast(steps=steps)

    # Construct response data
    response_data = {
        'operations_forecast': operations_forecast.tolist()  # Convert to list for JSON serialization
        # Add other forecasted values if needed
    }

    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)
