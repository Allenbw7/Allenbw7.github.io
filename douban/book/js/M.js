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
    	console.log(data,n)
      data.len = Math.ceil(data.total/49);
      $('#bookList').html(View(data));
      $('#page').html(Page(data,n));
      scrollTo(0,0);
      pn(n,data.len-1);
    }
  });
}


//当选中第一页和最后一页时，对应上一页或下一页不可点击状态
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
