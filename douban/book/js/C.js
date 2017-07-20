
//搜索栏
const $btn = $('.inp-btn input'),
      $txt = $('#inp-query');
//初始页码
let num = 0,
    n = 0,
    val = '';

//初始化，显示javascript搜索结果书籍
Modle('javascript',num,n);

//点击搜索，按照输入内容请求数据并展示
$btn.click(function() {
  val = $txt.val();
  Modle(val,0,0);
  return false;
})

//搜索结果页码，上一页和下一页
const $pageA = $('#page'),
      $prev = $('.prev'),
      $next = $('.next');

//点击页码更新搜索结果
$pageA.on('click','a',function(ev) {
  num = (ev.target.innerHTML-1)*49;
  n = ev.target.innerHTML-1;
  val = val || 'javascript';
  Modle(val,num,n);
})

//翻页，上一页
$prev.click('a',function() {
  n--;
  Modle(val,num,n);
})

//翻页，下一页
$next.click('a',function() {
  n++;
  val = val || 'javascript';
  Modle(val,num,n);
})
