const db = require('../utils/database');

const Category = class Category {
  constructor(category_id, category_title, category_summary) {
    this.category_id = category_id;
    this.category_title = category_title;
    this.category_summary = category_summary;
  }

  // READ
  static fetchAll(category) {
    console.log("categoryhome:"+category);
    if(category == null || category == undefined){
      return db.execute('SELECT b.part_name,a.* FROM category as a\
      inner join part as b on a.part_id = b.part_id');
    }
    else{
      return db.execute('SELECT b.part_name,a.* FROM category as a\
      inner join part as b on a.part_id = b.part_id\
      where b.part_name = ?',[category.toLowerCase()]); 
    } 
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

module.exports = Category;