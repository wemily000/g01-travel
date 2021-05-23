// const db = require('../utils/database');

// const Cart = class Cart {
//   constructor(cart_id, user_order,cart_cat, cart_num, username) {
//     this.cart_id = cart_id;
//     this.user_order = user_order;
//     this.cart_cat = cart_cat;
//     this.cart_num = cart_num;
//     this.username = username;
//   }

//   // READCARTIMG
//   static fetchCart() {
//     return db.execute(
//       'select cart.*,name,DETAIL from cart inner join food on cart.cart_cat="food" and cart.cart_num = food.DETAIL_ID UNION ALL select cart.*,name,DETAIL from cart inner join spot on cart.cart_cat="spot" and cart.cart_num = spot.DETAIL_ID UNION ALL select cart.*,name,DETAIL from cart inner join activity on cart.cart_cat="activity" and cart.cart_num = activity.DETAIL_ID'
//     );
//   }
  
// };

// // test();

// module.exports = Cart;
