// var carttemp=[];
// GetCartData();
// function GetData(){
//   $('#pagination-container').pagination({
//     dataSource: function(done) {
//       var data = { "category" :$("#category").val(),
//                    "name":$("#foodname").val(),
//                    "addrone":$("#addrone").val(),
//                    "addrtwo":$("#addrtwo").val(),
//                    "adress":$("#adress").val()
//                  };
//       $.ajax({
//         type:"post",
//         url:"/search",
//         dataType:"json",
//         data:data,
//           success: function(response) {
//             images = response.data.images;
//             console.log(response.data);
//               done(response.data.detail);
              
//           }
//       });
//    },
//     locator: 'data.detail',
//     pageSize: 15,
//     callback: function(data, pagination) {
//         // template method of yourself
//         var html = simpleTemplating(data,images);
//         $('#data-container').html(html);
//     }
//   })
// }
// function SendCartData(){
//   $('#cart-container').pagination({
//     dataSource: function(done) {
//       var data = { "category" :$("#category").val(),
//                    "name":$("#foodname").val()
//                  };
//       $.ajax({
//         type:"post",
//         url:"/create",
//         dataType:"json",
//         data:data,
//           success: function(response) {
//             carttemp = response.data.cart_id;
//             console.log(response.data);
//               // done(response.data.detail);
              
//           }
//       });
//    }
//   })
// }


// function simpleTemplating(data,images) {
//   var datilsection='';
//   for(let i=0;i<data.length;i++){
//     if((i%2) == 0){
//       datilsection +="<div class='w-layout-grid about-grid'>\
//       <div id='w-node-_86e64837-0616-515b-4568-76c147234d34-de4569aa'>";
//     }
//     else{
//       datilsection +="<div class='w-layout-grid about-grid cc-about-2'>\
//       <div id='w-node-_86e64837-0616-515b-4568-76c147234d41-de4569aa'>";                    
//     }
//       datilsection +="<div class='home-section-wrap'>\
//           <div class='label cc-light'>About</div>\
//           <h2 class='section-heading'>"+data[i].FOOD_NAME +"</h2>\
//           <p class='paragraph-light'>"+data[i].FOOD_DETAIL +"</p>\
//         </div>\
//         <a href='/Detail?id="+data[i].FOOD_ID+"' class='button w-inline-block'>\
//           <div>Learn More</div>\
//         </a></div>";
//         if((i%2) == 0){
//           datilsection +="<img src='"+images[i].PATH+"' id='w-node-_86e64837-0616-515b-4568-76c147234d3f-de4569aa'\
//           sizes='100vw' alt=''></div>";
//         }
//         else{
//           datilsection +="<img src='"+images[i].PATH+"' id='w-node-_86e64837-0616-515b-4568-76c147234d4c-de4569aa'\
//           sizes='100vw' alt=''></div>";                    
//         }
//   }
//   return datilsection;
// }

// $("#searchbutton").on("click",function(e){
//     e.preventDefault();
//     GetCartData();
// });

// $("#resetbutton").on("click",function(){    
//     $("#addrone").val("");
//     $("#addrtwo").val("");
//     $("#category").val("");
//     $("#adress").val("");
//     $("#foodname").val("");
// });

// $("#addrone").on("change",function(){
//     var addrone = $("#addrone").val();
//     changeaddrtwo(addrone);
// });

// function changeaddrtwo(addrone){
//     var childaddr = JSON.parse($("#allchildaddr").val());
//     var addrtwo="<option value=''>-請選擇-</option>";
//     for (const i in childaddr) {
//         if(childaddr[i].ADDR_PARENT_ID == addrone){
//             addrtwo += '<option value='+childaddr[i].ADDR_CODE_ID+'>'+childaddr[i].ADDR_CODE_NAME+'</option>';
//         }
//     }
//     //http://mirlab.org/jang/books/javascript/dynamicSelect.asp?title=7-3%20%B0%CA%BAA%A4U%A9%D4%A6%A1%BF%EF%B3%E6
//     // $("#addrtwo").empty();
//     // $("#addrtwo").append(addrtwo);
//     $("#addrtwo").html(addrtwo);
// }