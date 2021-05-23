var express = require('express');
var router = express.Router();

const CategoryController = require('../controllers/CategoryController');
const CartController = require('../controllers/CartController');

/* GET home page. */
// READ
router.get('/',CategoryController.getHomepage);
router.get('/Category', CategoryController.getCategorypage);
router.post('/search', CategoryController.getCategory);
router.get('/Detail',CategoryController.getDetailpage);

//cart
//router.get('/cart',CartController.getCart);
router.post('/create', CartController.createCart);
//router.get('/getcart',CartController.getCartT);
router.get('/getcartA',CartController.getCartA);

router.get('/delete/:id',CartController.deletecartbyid);

router.get('/up',CartController.upcartbyid);
router.get('/down',CartController.downcartbyid);

module.exports = router;
