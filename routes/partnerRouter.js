const express = require('express');
const bodyParser = require('body-parser');
const Partner = require('../models/partner');

const partnerRouter = express.Router();
partnerRouter.use(bodyParser.json());

partnerRouter.route('/')
    .get((req, res, next) => { //next is for error handling
        Partner.find()
            .then(partners => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(partners); //Sending json data to the client. Automatically closes the response stream afterward; so no res.end is needed
            })
            .catch(err => next(err)); //next(err) is passing off the error to the overall error handler so express can handle it.
    })
    .post((req, res, next) => {
        Partner.create(req.body) //Mongoose will let us know if we're missing any data in the request body
            .then(partner => {
                console.log('Partner Created ', partner); //Second argument; partner: will log info about the partner to the console.
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(partner); //Sends info about posted document to the client. (No res.end needed)
            })
            .catch(err => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /partners');
    })
    .delete((req, res, next) => {
        Partner.deleteMany() //Every document in partner collection will be deleted
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

partnerRouter.route('/:partnerId')
    .get((req, res, next) => {
        Partner.findById(req.params.partnerId) //this id is getting parsed from the http request; from whatever the user on client side typed in as the id they want to access
            .then(partner => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(partner);
            })
            .catch(err => next(err));
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /partners/${req.params.partnerId}`);
    })
    .put((req, res, next) => {
        Partner.findByIdAndUpdate(req.params.partnerId, {
            $set: req.body //update operator along with the data in the request body
        }, { new: true }) //this is so we get back info about the updated document resulting from this method
            .then(partner => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(partner);
            })
            .catch(err => next(err));
    })
    .delete((req, res, next) => {
        Partner.findByIdAndDelete(req.params.partnerId)
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

module.exports = partnerRouter;