function View(data){
  //动态生成书籍目录结构
  let html = '';
  for(let i=0; i<data.books.length; i++) {
    //排除显示封面为空的书籍
    if(data.books[i].image != 'https://img1.doubanio.com/f/shire/5522dd1f5b742d1e1394a17f44d590646b63871d/pics/book-default-medium.gif') {
      //书名和作者名称
      let oldBName = data.books[i].subtitle || data.books[i].title || '未录入',
          oldName = data.books[i].author[0] || '未录入',
          newBName = '',
          newName = '';
      //传入名字，如果length大于10，省略号显示
      function name(name) {
        let newN = '',
        n = num(name);
        if(n > 16) {
          //newN = name.replace(name.substring(10),'...');
          for(let i=0; i<n; i++) {
            console.log(name.substring(0,i))
            if(num(name.substring(0,i)) < 16) {
              newN = name.replace(name.substring(i),'...');
            }else {
              break;
            }
          }
        }else{
          newN = name;
        }
        return newN;
      }
      //计算字节
      function num(str) {
        let n = 0;
        for(var i=0; i<str.length; i++) {
          if(/[\u4e00-\u9fa5]/.test(str[i])) {
            n += 2;
          }else if(/[A-Z]/.test(str[i])) {
            n += 1.5;
          }else {
            n++;
          }
        }
        return n;
      }
      //获取截取后的书籍名称和作者名称
      newBName = name(oldBName);
      newName = name(oldName);
      //动态添加书籍封面图、截取处理后的书籍名称和作者名称
      html += `
        <li class="bookInfo fl">
          <dl>
            <dt>
              <a href="javascript:;">
                <img width="110" height="155" src="${data.books[i].images.large}">
              </a>
            </dt>
            <dd>
              <p class="title">
                <a href="javascript:;" title="${oldBName}">${newBName}</a>
              </p>
              <p class="author">${newName}</p>
              <p class="rating">评分：${data.books[i].rating.average}</p>
            </dd>
          </dl>
        </li>
      `;
    }
  }
  return html;
}


//  <ul>
//    <%for(var i=0;i<subjects.length;i++){%>
//      <li title="<%=subjects[i].title%>">
//        <img width="128" height="182" src="<%=subjects[i].images.medium%>">
//        <%if(subjects[i].title.length > 5){%>
//          <p><%=subjects[i].title.replace(subjects[i].title.substring(5),'..')%></p>
//        <%}else{%>
//          <p><%=subjects[i].title%></p>
//        <%}%>
//        <p>评分:<%=subjects[i].rating.average%>分</p>
//      </li>
//    <%}%>
//  </ul>


//  <div>
//    <%for(var i=0;i<len;i++){%>
//      <a href="javascript:;"><%=(i+1)%></a>
//    <%}%>
//  </div>
