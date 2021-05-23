var express = require('express');
var router = express.Router();

const apiController = require('../controllers/apiController');

//home page
router.get('/',apiController.Home);
//all data from category
router.get('/category',apiController.getCategory);
//all data from detail
router.post('/detail',apiController.getDetail);
//all data from address
router.get('/address',apiController.getAddress);

module.exports = router;
