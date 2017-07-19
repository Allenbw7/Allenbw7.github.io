function View(data){
  //动态生成书籍目录结构
  let html = '';
  for(let i=0; i<data.books.length; i++) {
    //排除显示封面为空的书籍
    if(data.books[i].image != 'https://img1.doubanio.com/f/shire/5522dd1f5b742d1e1394a17f44d590646b63871d/pics/book-default-medium.gif') {
      //书名和作者名称
      let oldBName = data.books[i].title || '未录入',
          oldName = data.books[i].author[0] || '未录入',
          newBName = '',
          newName = '';
      //传入名字，如果length大于10，省略号显示
      function name(name) {
        let newN = '';
        if(name.length > 10) {
          newN = name.replace(name.substring(10),'...');
        }else{
          newN = name;
        }
        return newN;
      }
      //获取截取后的书籍名称和作者名称
      newBName = name(oldBName);
      newName = name(oldName);
      //动态添加书籍封面图、截取处理后的书籍名称和作者名称
      html += `
        <li class="bookInfo fl">
          <img width="110" height="155" src="${data.books[i].images.large}">
          <p class="title">${newBName}</p>
          <p class="author">${newName}</p>
          <p class="rating">评分：${data.books[i].rating.average}</p>
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
