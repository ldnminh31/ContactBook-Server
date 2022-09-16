const express = require('express');
const cors = require('cors');

// Api Error

const ApiError = require('./api-error');

// Express
const app = express();

app.use(cors());
app.use(express.json());

// contactControllers 
const contactController = require('./controllers/contact.controller');


// start
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Contact Book Application.'
    });
});

app.route('/api/contacts')
    .get(contactController.findAll)
    .post(contactController.create)
    .delete(contactController.deleteAll);

app.route('/api/contacts/favorite').get(contactController.findAllFavorite);

app.route('/api/contacts/:id')
    .get(contactController.findOne)
    .put(contactController.update)
    .delete(contactController.delete);

// Handle 404 respone
app.use((req, res, next) =>{
    //Handle for unknown route.
    // Call next() to pass to the error handling middleware.
    return next(new ApiError(404, 'Resource not found'));
});

// Define error-handling middleware last, after other app.user() and routes calls.
app.use((error, req, res, next) => {
    // The centrailized error handling middleware
    // in any route handle, calling next(err)
    // will pass to this err handling middleware
    return res.status(error.statusCode || 500).json({
        message: error.message || 'Internal Server Error',
    });
});


module.exports = app;



