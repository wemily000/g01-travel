const Cart = require('../models/cart_model');


// READ cart
exports.getCart = async (req, res) => {
    let data={};
    console.log(data);
    try {
        await Cart.fetchAll().then(([rows]) => {
            console.log('getCart', JSON.stringify(rows));
            data.cart = rows;
            // res.json(data.cart[0].cart_id);
          });
        res.render('cart', { title: 'CartHomepage' , cartData : data.cart});
    } catch (err) {
        console.log(err);
    }
}
//onlyejs
exports.getCartT = async (req, res) => {
  let data={};
  console.log(data);
  try {
      await Cart.fetchAll().then(([rows]) => {
          console.log('getCart', JSON.stringify(rows));
          data.cart = rows;
          // res.json(data.cart[0].cart_id);
        });
      res.render('cartsample', { title: 'CartHomepage' });
  } catch (err) {
      console.log(err);
  }
}
//onlysql
exports.getCartA = async (req, res) => {
  let data={};

  console.log(data);
  try {
      await Cart.fetchCart().then(([rows]) => {
          // console.log('getCart', JSON.stringify(rows));
          data.cart = rows;
          // res.json(data.cart[0].cart_id);
          // res.json(data.cart);
        });
         res.render('cartsample', { title: 'CartHomepage' , cartdata : data.cart});
  } catch (err) {
      console.log(err);
  }
}

// CREATE
//'INSERT INTO `g09_title`.`cart` (`user_order`, `part_name`, `detail_id`, `username`) VALUES (?, ?, ?, ?)'
exports.createCart = async (req, res) => {
  let cartdata={};
  cartdata=req.body;
  let data={};
  await Cart.fetchCart().then(([rows]) => {
    data.cart = rows;
  });
  cartdata.user_order=data.cart.length+2;
    console.log('createCart', req.body);
    try {
      await Cart.create(cartdata).then(([rows]) => {
        //res.redirect('/crown2_xx/cart2_xx');
        res.json(req.body);
        // console.log(req.body);
      });
      // console.log("aaaa cartdata",cartdata);
    } catch (err) {
      console.log(err);
    }
  };

  exports.deletecartbyid = async function (req, res, next) {
    let id = req.params.id;
    try {
      await Cart.deleteCart(id).then(([rows]) => {
        //res.redirect('/crown2_xx/cart2_xx');
        // res.json(res.body);
        // console.log(req.body);
      });
    } catch (err) {
      console.log(err);
    }
    res.redirect('/getcartA');
  };

  exports.upcartbyid = async function (req, res, next) {
    let data=req.query;
    if(data.user_order==1){
      res.send('已是第一筆');
    }else{
      try {
        let updata={};
        await Cart.fetchCart().then(([rows]) => {
          updata = rows;
        });
        ex=Number(data.user_order)-2;
        data.ex_id=updata[ex].cart_id;
        data.ex_order=req.query.user_order-1;
        // res.json(updata);
        await Cart.upCart(data).then(([rows]) => {
        });
      } catch (err) {
        console.log(err);
      }
      res.redirect('/getcartA');
    }
    
  };

  exports.downcartbyid = async function (req, res, next) {
    let data=req.query;
    let updata={};

    try {
      await Cart.fetchCart().then(([rows]) => {
        updata = rows;
      });
      if(Number(data.user_order)==updata.length){
        // res.json(updata.length);
        res.send('已是最後一筆');
      }else{
        nextorder=Number(data.user_order);
        data.next_id=Number(updata[nextorder].cart_id);
        data.next_order=Number(req.query.user_order)+1;
        // res.json(data);
        await Cart.downCart(data).then(([rows]) => {
        });
        res.redirect('/getcartA');
      }
    } catch (err) {
      console.log(err);
    }
    
  };