// const $txt = $('input'),
// $btn = $('button'),
// $temp = $('#temp');
// var num = 0;
// $btn.click(function () {
//   var val = $txt.val();
//   Modle(val,num);
//   $temp.html(View());
// });
// $('#app').on('click','a',function(ev){
//     num = (ev.target.innerHTML-1)*100;
//     Modle($txt.val(),num);
//     $temp.html(View());
// });

const $btn = $('.inp-btn input'),
      $txt = $('#inp-query');
let num = 0;
$btn.click(function() {
  let val = $txt.val();
  console.log(val);
  Modle(val,num);
  return false;
})
