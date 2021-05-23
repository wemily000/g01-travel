const fetch = require("node-fetch");
const Category = require('../models/Category');
const Detail = require('../models/Detail');
const Address = require('../models/Address');
const { json } = require("express");

exports.Home = async(req,res) =>{
    try{
        res.render('apihome');
    }catch(err){
        console.log(err);
    }    
}

exports.getAddress = async(req,res) =>{
    try{
        await Address.fetchAll().then(([rows]) => {
            res.json(rows);                  
        });
    }catch(err){
        console.log(err);
    }
}

exports.getCategory = async (req, res) => {
    try {
        await Category.fetchAll(req.query.maincategory).then(([rows]) => {
            res.json(rows);
        });
    } catch (err) {
        console.log(err);
    }
}

exports.getDetail = async(req,res)=>{
    let data={};
    try{
        await Detail.fetchDetail(req.body).then(([rows])=>{
            data.detail = rows;
            rows.forEach(function(item,index){                
                data.detail[index].path=item.path.split(',');
            });
        });
        res.json(data);
    }catch(err){
        console.log(err);
    }
}
