const Category = require('../models/Category');
const Detail = require('../models/Detail');
const Address = require('../models/Address');
const Cart = require('../models/cart_model');
const fetch = require("node-fetch");
const URLSearchParams = require('url').URLSearchParams;

// READ
exports.getHomepage = async (req, res) => { 
    let cart={};   
    try {        
        //推薦行程預覽畫面
        await Cart.fetchCart().then(([rows]) => {
            cart = rows;
          });
        res.render('index', { title: 'Homepage',cartdata:cart});
    } catch (err) {
        console.log(err);
        res.render('error',{message:"網頁錯誤"});
    }
}

exports.getCategorypage = async (req, res) => {
    let data = {};
    let cart = {};
    data.maincategory = req.query.maincategory;
    data.pagenum = req.query.pagenum == undefined || 
                   req.query.pagenum<=0 || 
                   isNaN(parseInt(req.query.pagenum,10))? 1 : req.query.pagenum;
    try {
        //寫法1
        // const addressres = await fetch('https://g09-travel.herokuapp.com/api/category?'
        // + new URLSearchParams({
        //     maincategory: data.maincategory
        // }));
        // const address = await addressres.json();

        //寫法2
        await fetch('https://g09-travel.herokuapp.com/api/category?'
        + new URLSearchParams({
            maincategory: data.maincategory
        })).then(res => 
            res.json()
        ).then(resdata => {            
            data.category = resdata;
        });
        
        await fetch('https://g09-travel.herokuapp.com/api/address').then(res => 
            res.json()
        ).then(resdata => {
            data.parentaddress = [];
            data.childaddress = [];
            resdata.forEach(element => {
                if(element.addr_parent_id == null){
                    data.parentaddress.push(element);                                       
                }
                else{
                    data.childaddress.push(element);                    
                }
            });
        });

        //推薦行程預覽畫面
        await Cart.fetchCart().then(([rows]) => {
            cart = rows;
          });

        res.render('search', { title: 'Categorypage', data:data ,cartdata:cart});        
    } catch (err) {
        console.log(err);
        res.render('error',{message:"網頁錯誤"});
    }
}

exports.getCategory = async (req,res) =>{
    try{
        let data={};
        data.maincategory = req.body.maincategory;
        console.log(req.body);
        await fetch('https://g09-travel.herokuapp.com/api/detail',{
                    method:"POST",
                    body:JSON.stringify(req.body),
                    headers: { 'Content-Type': 'application/json' }
                }).then(res => 
                    res.json()
                ).then(resdata => {
                    data = resdata;
                });

        res.send({ data:data});
    }catch(err){
        res.render('error',{message:"網頁錯誤"});
        console.log(err);
    }
}

exports.getDetailpage = async (req, res) => {
    try{
        let data={};
        let cart={};
        await fetch('https://g09-travel.herokuapp.com/api/detail',{
                    method:"POST",
                    body:JSON.stringify(req.query),
                    headers: { 'Content-Type': 'application/json' }
                }).then(res => 
                    res.json()
                ).then(resdata => {
                    data = resdata;
                    data.detail[0].address = data.detail[0].addr_parent_name + data.detail[0].addr_code_name
                    +(data.detail[0].addr == null ?"":data.detail[0].addr);
                });
        
        //推薦行程預覽畫面
        await Cart.fetchCart().then(([rows]) => {
            cart = rows;
        });

        res.render('Detail',{title:"Detailpage",data:data.detail,cartdata:cart});
    }catch(err){
        res.render('error',{message:"網頁錯誤"});
        console.log(err);
    }
};

