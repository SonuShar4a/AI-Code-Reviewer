const express=require('express');
const route=express.Router();
const aiController=require('../controllers/ai.controllers')
route.post('/get-review',aiController.getReview);


module.exports=route;