GetData($("#pagenum").val());
function GetData(pagenum=1){
  $('#pagination-container').pagination({
    dataSource: function(done) {
      var data = { "maincategory":$("#maincategory").val(),
                   "categoryid" :$("#category").val(),
                   "name":$("#foodname").val(),
                   "addrone":$("#addrone").val(),
                   "addrtwo":$("#addrtwo").val(),
                   "adress":$("#adress").val()
                 };
      $.ajax({
        type:"post",
        url:"/search",
        dataType:"json",
        data:data,
        success: function(response) {
          console.log(response.data);
          done(response.data.detail);            
        }
      });
   },
    locator: 'data.detail',
    pageSize: 10,
    pageNumber:pagenum,
    callback: function(data, pagination) {
        // template method of yourself
        var html = simpleTemplating(data);
        $('#data-container').html(html);
        if(pagination.pageNumber != 1){
          $('html,body').animate({
            scrollTop:$('#data-container').offset().top
          }, 100);
        }        
    }
  })
}


function simpleTemplating(data) {
  var detailsection='';
  for(let i=0;i<data.length;i++){
    if((i%2) == 0){
      detailsection +="<div class='w-layout-grid about-grid '>\
      <div id='w-node-_86e64837-0616-515b-4568-76c147234d34-de4569aa'>";
    }
    else{
      detailsection +="<div class='w-layout-grid about-grid cc-about-2'>\
      <div id='w-node-_86e64837-0616-515b-4568-76c147234d41-de4569aa'>";                    
    }
    detailsection +="<div class='home-section-wrap'>\
          <div class='label cc-light'>About</div>\
          <h2 class='section-heading'>"+data[i].name +"</h2>\
          <p class='paragraph-light'>"+data[i].detail +"</p>\
        </div>\
        <a href='/Detail?maincategory="+$("#maincategory").val()+"&detailid="+data[i].detail_id+"' class='button w-inline-block'>\
          <div>Learn More</div>\
          </a>\
          <button type='button' id='addbutton' value='"+data[i].detail_id +"'  class='button w-inline-block'>ADD</a>\
        </div>";
        if((i%2) == 0){
          detailsection +="<img src='"+(data[i].path==null ?"":data[i].path[0])+"' id='w-node-_86e64837-0616-515b-4568-76c147234d3f-de4569aa'\
          sizes='100vw' alt=''></div>";
        }
        else{
          detailsection +="<img src='"+(data[i].path==null?"":data[i].path[0])+"' id='w-node-_86e64837-0616-515b-4568-76c147234d4c-de4569aa'\
          sizes='100vw' alt=''></div>";                    
        }
  }
  //無符合資料
  if(detailsection == ''){
    detailsection = "<p>該條件無符合資料</p>";
  }
  return detailsection;
}

function Send2CartData(dataid){
  var cartdata = { 
    "part_name":$("#maincategory").val(),
    "detail_id" :dataid,
    "username":"me"
   };
  $.ajax({
    type:"post",
    url:"/create",
    dataType:"json",
    data:cartdata,
    success: function(response) {
      console.log("Data sent to sql successfully");
      alert("成功!");
      
    },
    error:function(response){
      console.log("err");
    }
  });
}
$("#data-container").on('click',"#addbutton",function (){
  var data_id =$(this).val();
  var cart_cat=$("#maincategory").val();
  console.log("I Click number :"+ data_id + ",cart_cat is :"+ cart_cat);
  Send2CartData(data_id);
  
});

$("#searchbutton").on("click",function(e){
    e.preventDefault();
    GetData();
});

$("#resetbutton").on("click",function(){    
    $("#addrone").val("");
    $("#addrtwo").val("");
    $("#category").val("");
    $("#adress").val("");
    $("#foodname").val("");
});

$("#addrone").on("change",function(){
    var addrone = $("#addrone").val();
    changeaddrtwo(addrone);
});

function changeaddrtwo(addrone){
    var childaddr = JSON.parse($("#allchildaddr").val());
    var addrtwo="<option value=''>-請選擇-</option>";
    for (const i in childaddr) {
        if(childaddr[i].addr_parent_id == addrone){
            addrtwo += '<option value='+childaddr[i].addr_code_id+'>'+childaddr[i].addr_code_name+'</option>';
        }
    }
    //http://mirlab.org/jang/books/javascript/dynamicSelect.asp?title=7-3%20%B0%CA%BAA%A4U%A9%D4%A6%A1%BF%EF%B3%E6
    // $("#addrtwo").empty();
    // $("#addrtwo").append(addrtwo);
    $("#addrtwo").html(addrtwo);
}

//推薦行程
$("#gocart").on("click",function(){
  window.location.href="/getcartA";
});