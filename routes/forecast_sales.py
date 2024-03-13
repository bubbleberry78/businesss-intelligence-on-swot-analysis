import os
from flask import Blueprint, Flask, jsonify, request
from pymongo import MongoClient
import joblib

app = Flask(__name__)
sales_model_bp = Blueprint('sales-model', __name__)
# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['swot_user']  # Change 'your_database' to your actual database name
collection = db['users']  # Change 'your_collection' to your actual collection name

# Load the profit model
model_directory = os.path.join(os.getcwd(), 'models')
sales_model_path = os.path.join(model_directory, 'sales_model.joblib')

if os.path.exists(sales_model_path):
    sales_model = joblib.load(sales_model_path)
else:
    raise FileNotFoundError(f"Profit model not found at {sales_model_path}")

@sales_model_bp.route('/forecast/sales', methods=['POST'])
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

    sales_forecast = sales_model.forecast(steps=steps)

    # Construct response data
    response_data = {
        'sales_forecast': sales_forecast.tolist()  # Convert to list for JSON serialization
        # Add other forecasted values if needed
    }

    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)
