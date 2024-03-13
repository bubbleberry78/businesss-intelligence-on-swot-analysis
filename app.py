from flask import Flask, render_template,jsonify
from flask_cors import CORS
from routes.model_linear import train_model_bp
from routes.forecast_profit import profit_model_bp
from routes.forecast_sales import sales_model_bp
from routes.forecast_production import production_model_bp
from routes.forecast_market_size import marketsize_model_bp
from routes.forecast_customer_model import customer_model_bp
from routes.forecast_costing import costing_model_bp
from routes.forecast_operatin_exp import operations_model_bp

# Create a Flask application instance
app = Flask(__name__)
CORS(app)
app.register_blueprint(train_model_bp)
app.register_blueprint(profit_model_bp)
app.register_blueprint(sales_model_bp)
app.register_blueprint(production_model_bp)
app.register_blueprint(marketsize_model_bp)
app.register_blueprint(customer_model_bp)
app.register_blueprint(costing_model_bp)
app.register_blueprint(operations_model_bp)




# Define a route for the home page


@app.route('/')
def index():
    return render_template('index.html')


# Run the application if executed directly
if __name__ == '__main__':
    app.run(debug=True, port=5001)
