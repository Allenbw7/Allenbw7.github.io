
//搜索栏
const $btn = $('.inp-btn input'),
      $txt = $('#inp-query');
//初始页码
let num = 0,//start从第num个数据开始显示
    n = 0,//页码
    sortMode = 1,//排序模式，1默认，2时间，3评分
    val = '';//要搜索的数据名称

//初始化，显示javascript搜索结果书籍
Modle('javascript',num,n);
//初始化，抓取所有数据存到本地待调用
ModleAll('javascript',num,n);

//点击搜索，按照输入内容请求数据并展示
$btn.click(function() {
  num = n = 0;
  val = $txt.val();
  Modle(val,num,n);//搜索后首次数据展示
  ModleAll(val,num,n);//拉取搜索匹配条目到本地
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
  changePage();
})

//翻页，上一页
$prev.click(function(ev) {
  if(n>0) {
    num -= 49;
    n--;
    changePage();
  }
})

//翻页，下一页
$next.on('click','a',function(ev) {
  num += 49;
  n++;
  val = val || 'javascript';
  changePage();
  return false;
})

//根据排序模式渲染数据
function changePage() {
  switch (sortMode) {
    case 1:
      Modle1(val,num,n);
      break;
    case 2:
      Modle2(val,num,n);
      break;
    case 3:
      Modle3(val,num,n);
      break;
    default:
      break;
  }
}

//搜索结果排序1，传参调用函数
for(let i=0; i<3; i++) {
  $('.bookSort a').eq(i).click(function() {
    bookS(i);
    $(this).addClass('deSort').parent().siblings().children().removeClass('deSort');
  });
}

//搜索结果排序2，0默认排序，1出版时间排序，2评分排序
function bookS(i) {
  val = val || 'javascript';
  switch (i) {
    case 0:
      Modle1(val,num,n);
      sortMode = 1;
      break;
    case 1:
      Modle2(val,num,n);
      sortMode = 2;
      break;
    case 2:
      Modle3(val,num,n);
      sortMode = 3;
      break;
    default:
      break;
  }
}
