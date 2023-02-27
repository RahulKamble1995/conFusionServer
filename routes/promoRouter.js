const express = require('express');
const bodyParser = require('body-parser');

const Promotions = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req, res, next)=>{
    Promotions.find({})
      .then((pramotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(pramotions)
      }, (err) => (next.err))
      .catch((err) => (next.err));
})
.post((req, res, next)=>{
    Promotions.create(req.body)
       .then((pramotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(pramotions);
       }, (err) => (next.err))
       .catch((err) => (next.err));
})
.put((req, res, next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next)=>{
    Promotions.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => (next.err))
        .catch((err) => (next.err));
});

//for promo ID passed in parameters

promoRouter.route('/:promoId')
.get((req, res, next)=>{
    Promotions.findById(req.params.promoId)
       .then((pramotions) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(pramotions);
       }, (err) => (next.err))
       .catch((err) => (next.err));
})
.post((req, res, next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'+req.params.promoId);
})
.put((req, res, next)=>{
    Promotions.findByIdAndUpdate(req.params.id, {
        $set : req.body 
    }, { new : true})
        .then((promo) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }, (err) => (next.err))
         .catch((err) => (next.err));
})
.delete((req, res, next)=>{
    Promotions.findByIdAndRemove(req.params.promoId)
        .then((resp) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => (next.err))
        .catch((err) => (next.err))
})

module.exports = promoRouter;