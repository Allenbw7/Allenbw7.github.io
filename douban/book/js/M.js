function Modle(val,num){
  $.ajax({
 		url:'https://api.douban.com/v2/book/search?callback=?',
    dataType:'jsonp',
    data:{
      q:val,
      start:num,
      count:50
    },
    success:function(data){
    	//console.log(data)
      data.len = Math.ceil(data.total/data.count);
      $('#bookList').html(View(data));
      $('#page').html(Page(data));
      scrollTo(0,0);
    }
  });
}

function Modle2(val,num){
  $.ajax({
 		url:'https://api.douban.com/v2/book/search?callback=?',
    dataType:'jsonp',
    data:{
      q:val,
      start:num,
      count:50
    },
    success:function(data){
      data.len = Math.ceil(data.total/data.count);
      $('#bookList').html(View(data));
      scrollTo(0,0);
      pn(num/50,data.len);
    }
  });
}

function pn(n,len) {
  console.log(n,len)
  if(n == 0) {
    $('.prev').html('上一页');
  }else if(n == len) {
    $('.next').html('下一页');
  }else {
    $('.prev').html('<a href="javascript:;"><<上一页</a>');
    $('.next').html('<a href="javascript:;">下一页>></a>');
  }
}
