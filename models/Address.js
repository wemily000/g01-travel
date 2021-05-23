const db = require('../utils/database');

const Address = class Address {
  constructor(addr_code_id, addr_code_name,addr_parent_id) {
    this.addr_code_id = addr_code_id;
    this.addr_code_name = addr_code_name;
    this.addr_parent_id = addr_parent_id;
  }

  // READ
  static fetchAll() {
    return db.execute('select * from address');
  }
}

// test
// const test = async (req, res) => {
//   try {
//     await Category.fetchAll().then(([rows]) => {
//       console.log('fetchAll', JSON.stringify(rows));
//       //   res.json(rows);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

 //test();

module.exports = Address;