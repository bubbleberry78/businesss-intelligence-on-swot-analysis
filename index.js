const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
const cors = require('cors');

app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/swot_user', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


app.post('/api/form', async (req, res) => {
    try {
        const formData = req.body;
        const newUser = new User(formData);
        // Save the new user document
        await newUser.save();
        res.status(201).json({ message: 'Form data saved successfully', data: newUser });
    } catch (error) {
        // If an error occurs, send a 500 status code and error message
        console.error('Error saving form data:', error);
        res.status(500).json({ message: 'An error occurred while saving form data' });
    }
});

app.get('/api/data/:sessionId', async (req, res) => {
    try {
        const sessionId = req.params.sessionId;
        // Retrieve data from MongoDB based on session ID
        const userData = await User.find({ sessionId: sessionId });
        res.json(userData);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'An error occurred while retrieving data' });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});