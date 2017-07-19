
//搜索栏
const $btn = $('.inp-btn input'),
      $txt = $('#inp-query');
//初始页码
let num = 0,
    val = '';

//初始化，显示javascript搜索结果书籍
Modle('javascript',num);

//点击搜索，按照输入内容请求数据并展示
$btn.click(function() {
  val = $txt.val();
  Modle(val,0);
  return false;
})

//搜索结果页码，上一页和下一页
const $pageA = $('#page'),
      $prev = $('.prev'),
      $next = $('next');

//点击页码更新搜索结果
$pageA.on('click','a',function(ev) {
  num = (ev.target.innerHTML-1)*50;
  val = val || 'javascript';
  Modle2(val,num);
  $(this).addClass('thispage').siblings('a').removeClass('thispage');
})

//上一页
// #prev.click(function() {
//   if(num  1) {
//
//   }
// })
