const db = require('../utils/database');

const Images = class Images {
  constructor(image_id,detail_id,path) {
    this.detail_id = detail_id;
    this.image_id = image_id;
    this.path = path;
  }

  // READ
  static fetchImageAll(){
    return db.execute('select b.part_name,a.* from image as a\
                       inner join part as b on a.part_id = b.part_id');
  }

  static fetchImagesbyid(query) {
        return db.execute("select a.path from image as a\
                           inner join part as b on a.part_id = b.part_id\
                           where b.part_name = ? and a.detail_id=?",[query.maincategory,query.id]);
  }

  static fetchImagesOne(data){      
      console.log("ImageLength:"+data.detail.length);
      var detailid=[]; 
      if(data.detail.length != undefined && data.detail.length != 0){
        data.detail.forEach(element => {
          detailid.push(element.detail_id);
        });
        console.log("ImageDetailId:"+detailid);
        var params = [];
        var sql = "select path from image as a\
        inner join part as b on a.part_id = b.part_id\
        where 1=1 @part@ and a.detail_id in (?)\
        group by  a.detail_id, b.part_id\
        order by a.detail_id";
        if(data.maincategory != undefined && data.maincategory !=null && data.maincategory !=''){
          sql = sql.replace("@part@","and b.part_name = ?");
          params.push(data.maincategory);
        }
        else{
          sql = sql.replace("@part@","");
        }
        params.push(detailid);
        console.log(params);
        return db.query(sql,params);
      }
  }

}

//test
// const test = async (req, res) => {
//   try {
//     await Detail.fetchFoodDetail().then(([rows]) => {
//       console.log('fetchAll', JSON.stringify(rows));
//         res.json(rows);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

//  test();

module.exports = Images;