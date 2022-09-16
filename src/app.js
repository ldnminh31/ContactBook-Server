const express = require('express');
const cors = require('cors');

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

module.exports = app;



