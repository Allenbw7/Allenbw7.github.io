let bookAll = {books:[]},//默认排序
    bookAll1 = {books:[]},//时间排序
    bookAll2 = {books:[]};//评分排序

//向豆瓣接口请求搜索内容的具体数据
function ModleAll(val,num,n){
  $.ajax({
 		url:'https://api.douban.com/v2/book/search?callback=?',
    dataType:'jsonp',
    data:{
      q:val,
      start:num,
      count:100,
    },
    success:function(data){
      if(n == 0) {
        bookAll = {books:[]};
      }
      for(let i=0; i<data.books.length; i++) {
        bookAll.books.push(data.books[i]);
        n++;
      }
      num += 100;
      if(n < data.total) {
        ModleAll(val,num,n);
      }else {
        bookAll1 = extend(bookAll);
        bookAll2 = extend(bookAll);
        bookAll1.books.sort(function(a,b) {
          return getDate(b.pubdate) - getDate(a.pubdate);
        });
        bookAll2.books.sort(function(a,b) {
          return b.rating.average - a.rating.average;
        });
        console.log(bookAll,bookAll1,bookAll2);
      }
    }
  });
}

//深度克隆数组/对象
function extend(obj){
  var o = Object.prototype.toString.call(obj) === '[object Array]'?[]:{};
  for(var attr in obj){
    if(typeof obj[attr] === 'object'){
      o[attr] = extend( obj[attr] );
    }else{
      o[attr] = obj[attr];
    }
  }
  return o;
}


//向豆瓣接口请求搜索内容的具体数据
function Modle(val,num,n){
  $.ajax({
 		url:'https://api.douban.com/v2/book/search?callback=?',
    dataType:'jsonp',
    data:{
      q:val,
      start:num,
      count:49,
    },
    success:function(data){
    	console.log(data)
      data.len = Math.ceil(data.total/49);
      $('.trr').html(`<h5 class="trr">搜索结果${data.start+1}-${data.start+49},共${data.total}</h5>`);
      $('#bookList').html(View(data,num));
      $('#page').html(Page(data,n));
      scrollTo(0,0);
      pn(n,data.len-1);
    }
  });
}


//按时间排序，新拉取数据
// function Modle1(val,num,n){
//   $.ajax({
//  		url:'https://api.douban.com/v2/book/search?callback=?',
//     dataType:'jsonp',
//     data:{
//       q:val,
//       start:num,
//       count:49,
//     },
//     success:function(data){
//     	//console.log(data)
//       data.books.sort(function(a,b) {
//         return getDate(b.pubdate) - getDate(a.pubdate);
//       })
//       //console.log(data)
//       data.len = Math.ceil(data.total/49);
//       $('.trr').html(`<h5 class="trr">搜索结果${data.start+1}-${data.start+49},共${data.total}</h5>`);
//       $('#bookList').html(View(data));
//       $('#page').html(Page(data,n));
//       scrollTo(0,0);
//       pn(n,data.len-1);
//     }
//   });
// }


//按评分排序，新拉取数据
// function Modle2(val,num,n){
//   $.ajax({
//  		url:'https://api.douban.com/v2/book/search?callback=?',
//     dataType:'jsonp',
//     data:{
//       q:val,
//       start:num,
//       count:49,
//     },
//     success:function(data){
//     	//console.log(data)
//       data.books.sort(function(a,b) {
//         return b.rating.average - a.rating.average;
//       })
//       data.len = Math.ceil(data.total/49);
//       $('.trr').html(`<h5 class="trr">搜索结果${data.start+1}-${data.start+49},共${data.total}</h5>`);
//       $('#bookList').html(View(data));
//       $('#page').html(Page(data,n));
//       scrollTo(0,0);
//       pn(n,data.len-1);
//     }
//   });
// }


//按默认排序，缓存数据
function Modle1(val,num,n){

      // bookAll.books.sort(function(a,b) {
      //   return getDate(b.pubdate) - getDate(a.pubdate);
      // })
      bookAll.len = Math.ceil(bookAll.books.length/49);
      $('.trr').html(`<h5 class="trr">搜索结果${num+1}-${num+49},共${bookAll.books.length}</h5>`);
      $('#bookList').html(View(bookAll,num));
      $('#page').html(Page(bookAll,n));
      scrollTo(0,0);
      pn(n,bookAll.len-1);

}


//按时间排序，缓存数据
function Modle2(val,num,n){

      // bookAll.books.sort(function(a,b) {
      //   return getDate(b.pubdate) - getDate(a.pubdate);
      // })
      bookAll1.len = Math.ceil(bookAll1.books.length/49);
      $('.trr').html(`<h5 class="trr">搜索结果${num+1}-${num+49},共${bookAll1.books.length}</h5>`);
      $('#bookList').html(View(bookAll1,num));
      $('#page').html(Page(bookAll1,n));
      scrollTo(0,0);
      pn(n,bookAll1.len-1);

}


//按评分排序，缓存数据
function Modle3(val,num,n){

    	//console.log(data)
      // bookAll.books.sort(function(a,b) {
      //   return b.rating.average - a.rating.average;
      // })
      bookAll2.len = Math.ceil(bookAll2.books.length/49);
      $('.trr').html(`<h5 class="trr">搜索结果${num+1}-${num+49},共${bookAll2.books.length}</h5>`);
      $('#bookList').html(View(bookAll2,num));
      $('#page').html(Page(bookAll2,n));
      scrollTo(0,0);
      pn(n,bookAll2.len-1);

}


//当选中第一页和最后一页时，对应上一页或下一页不可点击状态
function pn(n,len) {
  //console.log(n,len)
  if(n == 0) {
    $('.prev').html('上一页');
    $('.prev').attr('onOff',false);
  }else if(n == len) {
    $('.next').html('下一页');
    $('.next').attr('onOff',false);
  }else {
    $('.prev').html('<a href="javascript:;"><<上一页</a>');
    $('.next').html('<a href="javascript:;">下一页>></a>');
  }
}

//转换时间格式
function getDate(data) {
  let time = data.split('-');
  if(time.length == 0) {
    time = '00';
  }else if(time.length == 1) {
    time = time[0];
  }else if(time.length == 2) {
    if(time[1].length == 1) {
      time[1] = '0' + time[1];
    }
    time = time[0] + time[1] + '00';
  }else if(time.length == 3) {
    for(let i=1; i<time.length; i++) {
      if(time[i].length == 1) {
        time[i] = '0' + time[i];
      }
    }
    time = (time[0]+time[1]+time[2]);
  }
  return time*1;
}
