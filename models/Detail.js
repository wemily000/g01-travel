const db = require('../utils/database');

const Detail = class Detail {
  constructor(detail_id,category_id,name,addr_code,addr,telphone,opentime,detail,price,traffic,addr_parent_name,addr_code_name,path) {
    this.detail_id = detail_id;
    this.category_id = category_id;
    this.name = name;
    this.addr_code = addr_code;
    this.addr = addr;
    this.telphone = telphone;
    this.opentime = opentime;
    this.detail = detail;
    this.addr_parent_name = addr_parent_name;
    this.addr_code_name = addr_code_name;
    //food
    this.price = price;
    //spot
    this.traffic = traffic;
    //image
    this.path = path;
  }

  // READ
  static fetchDetail(req) {
      var sql = "select a.part_id,b.part_name,a.category_id,c.category_title\
                 ,a.detail_id,a.name,a.detail,a.addr_code,e.addr_parent_name,e.addr_code_name,a.addr\
                 ,a.telphone,a.opentime,a.price,a.traffic,group_concat(d.path) as path\
                 from detail as a\
                 inner join part as b on a.part_id = b.part_id\
                 inner join category as c on a.category_id = c.category_id and b.part_id = c.part_id\
                 inner join image as d on d.detail_id = a.detail_id and b.part_id = d.part_id\
                 inner join address as e on a.addr_code=e.addr_code_id\
                 where 1=1 @PART@ @CATEGORY@ @NAME@ @ADDRESSCODE@ @ADDRESS@ @ID@\
                 group by a.detail_id, b.part_id";
      var param = [];
      console.log(req);
      if(req.maincategory != null && req.maincategory !=""){
        sql = sql.replace("@PART@"," and b.part_name = ?");
        param.push(req.maincategory.toLowerCase());
      }
      else{
        sql = sql.replace("@PART@","");
      }
      if(req.categoryid != null && req.categoryid !=""){
        sql = sql.replace("@CATEGORY@"," and a.category_id = ?");
        param.push(req.categoryid);        
      }
      else{
        sql = sql.replace("@CATEGORY@","");
      }
      if(req.name != null&&req.name != ""){
        sql = sql.replace("@NAME@"," and a.name like ?");
        param.push("%"+req.name+"%");
      }
      else{
        sql = sql.replace("@NAME@","");
      }
      if(req.addrone != null && req.addrone !=""){
        if(req.addrtwo != null && req.addrtwo !=""){//有郵遞區號
          sql = sql.replace("@ADDRESSCODE@"," and a.addr_code = ?");
          param.push(req.addrtwo);
        }
        else{//只有縣市
          sql = sql.replace("@ADDRESSCODE@"," and a.addr_code in (select addr_code_id from address where addr_parent_id = ?)");
          param.push(req.addrone);
        }                
      }
      else{
        sql = sql.replace("@ADDRESSCODE@","");
      }
      if(req.adress != null && req.adress != ''){
        sql = sql.replace("@ADDRESS@"," and a.addr like ?");
        param.push("%"+req.adress+"%");
      }
      else{
        sql = sql.replace("@ADDRESS@","");
      }
      if(req.detailid != null && req.detailid != undefined && req.detailid != ''){
        sql = sql.replace("@ID@"," and a.detail_id=?");
        param.push(req.detailid);
      }
      else{
        sql = sql.replace("@ID@","");
      }
      
      console.log("searchparam:"+param+"\nsearchsql:"+sql);
      return db.execute(sql,param);
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

module.exports = Detail;