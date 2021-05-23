const db = require('../utils/database');

const Cart = class Cart {
  constructor(cart_id, user_order,part_name, detail_id, username) {
    this.cart_id = cart_id;
    this.user_order = user_order;
    this.part_name = part_name;
    this.detail_id = detail_id;
    this.username = username;
  }

  // CREATE
  static create(req, res) {
    return db.execute(
      'INSERT INTO `cart` (`user_order`, `part_name`, `detail_id`, `username`) VALUES (?, ?, ?, ?)',
      [
        req.user_order,
        req.part_name,
        req.detail_id,
        req.username,
      ]
    );
  }

  // READ
  static fetchAll() {
    return db.execute('select * from cart');
  }
  // READCART
  static fetchCart() {
    return db.execute(
      'select TE.*,I.path from (select T.*,D.name,D.addr_code,D.addr from (select C.*,P.part_id from cart as C left join part as P on P.part_name=C.part_name) as T inner join detail as D on T.detail_id=D.detail_id and T.part_id=D.part_id) as TE inner join image as I on TE.part_id=I.part_id and TE.detail_id=I.detail_id group by cart_id order by user_order'
    );
  }

  static deleteCart(req, res) {
    return db.query('DELETE FROM `cart` WHERE cart_id = ?', [req]);
  }

  static upCart(req, res) {

    return db.query(
      'UPDATE heroku_08eb0fba6a8ae9c.cart\
      SET user_order = CASE cart_id \
          WHEN ? THEN ? \
          WHEN ? THEN ?  END WHERE cart_id IN (?,?)', 
    [
      req.cart_id,
      req.ex_order,
      req.ex_id,
      req.user_order,
      req.cart_id,
      req.ex_id
    ]
    );
  }

  static downCart(req, res) {

    return db.query(
      'UPDATE heroku_08eb0fba6a8ae9c.cart\
      SET user_order = CASE cart_id \
          WHEN ? THEN ? \
          WHEN ? THEN ?  END WHERE cart_id IN (?,?)', 
    [
      req.cart_id,
      req.next_order,
      req.next_id,
      req.user_order,
      req.cart_id,
      req.next_id
    ]
    );
  }
  
};

// test();

module.exports = Cart;
