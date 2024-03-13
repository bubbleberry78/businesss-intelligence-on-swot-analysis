const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    year: String,
    profit: String,
    sales: String,
    production: String,
    marketSize: String,
    customer: String,
    costing: String,
    operatingExpenses: String,
    sessionId: String ,
});

module.exports = mongoose.model('User', userSchema);
