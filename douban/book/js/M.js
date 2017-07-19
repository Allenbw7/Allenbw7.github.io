function Modle(val,num){
  $.ajax({
 		url:'https://api.douban.com/v2/book/search?callback=?',
    dataType:'jsonp',
    data:{
      q:val,
      start:num,
      count:100
    },
    success:function(data){
    	console.log(data)
      data.len = Math.ceil(data.total/data.count);
      $('#bookList').html(View(data));
    }
  });
}
