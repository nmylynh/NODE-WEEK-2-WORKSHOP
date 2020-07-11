const express = require('express');
const bodyParser = require('body-parser');
const Promotion = require('../models/promotion');

const promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());

// (/ is defining the route for promotions)
promotionRouter.route('/')
    .get((req, res, next) => { //next is for error handling
        Promotion.find()
            .then(promotions => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions); //Sending json data to the client. Automatically closes the response stream afterward; so no res.end is needed
            })
            .catch(err => next(err)); //next(err) is passing off the error to the overall error handler so express can handle it.
    })
    .post((req, res, next) => {
        Promotion.create(req.body) //Mongoose will let us know if we're missing any data in the request body
            .then(promotion => {
                console.log('Promotion Created ', promotion); //Second argument; promotion: will log info about the promotion to the console.
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion); //Sends info about posted document to the client. (No res.end needed)
            })
            .catch(err => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete((req, res, next) => {
        Promotion.deleteMany() //Every document in promotion collection will be deleted
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

promotionRouter.route('/:promotionId')
    .get((req, res, next) => {
        Promotion.findById(req.params.promotionId) //this id is getting parsed from the http request; from whatever the user on client side typed in as the id they want to access
            .then(promotion => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            })
            .catch(err => next(err));
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /campsites/${req.params.promotionId}`);
    })
    .put((req, res, next) => {
        Promotion.findByIdAndUpdate(req.params.promotionId, {
            $set: req.body //update operator along with the data in the request body
        }, { new: true }) //this is so we get back info about the updated document resulting from this method
            .then(promotion => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            })
            .catch(err => next(err));
    })
    .delete((req, res, next) => {
        Promotion.findByIdAndDelete(req.params.promotionId)
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

module.exports = promotionRouter;