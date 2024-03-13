from flask import Blueprint, jsonify, request
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
from statsmodels.tsa.seasonal import seasonal_decompose
import base64
import matplotlib.pyplot as plt
from io import BytesIO
import os
from joblib import dump

train_model_bp = Blueprint('train-model', __name__)

@train_model_bp.route('/train_model', methods=['POST'])
def train_model():
    try:
        # Read CSV file into pandas DataFrame
        file = request.files['file']
        df = pd.read_csv(file)

        # Data cleaning logic for time series analysis
        # Convert 'year' column to datetime format
        df['year'] = pd.to_datetime(df['year'], format='%Y')

        # Check for and handle missing values
        df = df.dropna()

        # Check for and handle duplicate rows
        df = df.drop_duplicates()

        # Sort DataFrame by timestamp column
        df = df.sort_values(by='year')
        MODELS_DIR = 'models/'
        if not os.path.exists(MODELS_DIR):
            os.makedirs(MODELS_DIR)


        # Define target variables
        target_variables = ['profit', 'sales', 'production', 'marketSize', 'customer', 'costing', 'operatingExpenses']
        models = {}
        plots = {}

        # Train one ARIMA model for each target variable
        for target in target_variables:
            # Extract the feature and target variables
            X = df[['year']]
            y = df[target]

            # Train the ARIMA model
            model = ARIMA(y, order=(1, 1, 1))  # Adjust order as needed
            fitted_model = model.fit()

            # Store the trained model
            models[target] = fitted_model

            # Generate autocorrelation plot
            autocorrelation_plot = plot_acf(fitted_model.resid, lags=50)
            autocorrelation_plot_buffer = BytesIO()
            plt.savefig(autocorrelation_plot_buffer, format='png')
            autocorrelation_plot_buffer.seek(0)
            autocorrelation_plot_encoded = base64.b64encode(autocorrelation_plot_buffer.getvalue()).decode()

            # Generate seasonal decomposition plot
            seasonal_decomposition = seasonal_decompose(y, model='additive', period=12)
            seasonal_decomposition_plot = seasonal_decomposition.plot()
            seasonal_decomposition_plot_buffer = BytesIO()
            plt.savefig(seasonal_decomposition_plot_buffer, format='png')
            seasonal_decomposition_plot_buffer.seek(0)
            seasonal_decomposition_plot_encoded = base64.b64encode(seasonal_decomposition_plot_buffer.getvalue()).decode()

            plots[target] = {
                'autocorrelation_plot': autocorrelation_plot_encoded,
                'seasonal_decomposition_plot': seasonal_decomposition_plot_encoded
            }

            # Clear current plot to release memory
            plt.clf()

            model_filename = os.path.join(MODELS_DIR, f'{target}_model.joblib')
            dump(fitted_model, model_filename)

            models[target] = model_filename


        return jsonify({'message': 'Models trained successfully', 'plots': plots})
    except Exception as e:
        return jsonify({'error': str(e)})
