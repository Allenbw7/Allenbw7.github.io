//渲染首页搜索书籍结果信息
function View(data){
  //动态生成书籍目录结构
  let html = '';
  for(let i=0; i<data.books.length; i++) {
    //排除显示封面为空的书籍
    //if(data.books[i].image != 'https://img1.doubanio.com/f/shire/5522dd1f5b742d1e1394a17f44d590646b63871d/pics/book-default-medium.gif') {
      //书籍名称和作者名称
      let oldBName = data.books[i].subtitle || data.books[i].title || '未录入',
          oldName = data.books[i].author[0] || '未录入',
          newBName = '',
          newName = '';
      //传入名字，如果大于16字节，之后省略号显示
      function name(name) {
        let newN = '',
        n = num(name);
        if(n > 16) {
          for(let i=0; i<n; i++) {
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
      //计算字节，按照汉字2字节，大写字母1.5字节，其他1字节计算
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
              <dt class="cover">
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
    //}
  }
  return html;
}

//动态生成页码
function Page(data,n) {
  let html = '';
  for(let i=0; i<data.len; i++) {
    //如果遇到选中页码，加选中类名
    if(i == n) {
      html += `<span class="thispage">${i+1}</span>`;
      continue;
    }
    //如果页码大于20，并且小于等于32，部分页码用'...'表示
    if(data.len > 20 && data.len <=32) {
      //当选中页码小于16时，'...'在16后展示
      if(n < 15) {
        if(i < 16) {
          html += `<a href="javascript:;">${i+1}</a>`;
        }else {
          html += `
            <span class="break">...</span>
            <a href="javascript:;">${data.len-1}</a>
            <a href="javascript:;">${data.len}</a>
          `;
          break;
        }
      }else if(n >=15) {
        if(i < 2) {
          html += `<a href="javascript:;">${i+1}</a>`;
        }else if(i == 2) {
          html += `
            <span class="break">...</span>
          `;
        }else if(i > 2 && i < data.len-15) {
          continue;
        }else {
          html += `<a href="javascript:;">${i+1}</a>`;
        }
      }
    //如果页码大于32，部分页码用'...'表示
    }else if(data.len > 32) {
      //当选中页码小于16时，'...'在16后显示
      if(n < 15) {
        if(i < 16) {
          html += `<a href="javascript:;">${i+1}</a>`;
        }else {
          html += `
            <span class="break">...</span>
            <a href="javascript:;">${data.len-1}</a>
            <a href="javascript:;">${data.len}</a>
          `;
          break;
        }
        //当选中页码16以上的中间部分时，'...'在中间部分两侧显示
      }else if(n >=15 && n < data.len-15) {
        if(i < 2) {
          html += `<a href="javascript:;">${i+1}</a>`;
        }else if(i == 2) {
          html += `<span class="break">...</span>`;
        }else if(i > n-7 && i < n+7) {
          html += `<a href="javascript:;">${i+1}</a>`;;
        }else if(i >= data.len-15) {
          html += `
            <span class="break">...</span>
            <a href="javascript:;">${data.len-1}</a>
            <a href="javascript:;">${data.len}</a>
          `;
          break;
        }
        //当选中页码在最后15页部分时，'...'在页码2后显示
      }else if(n >= data.len-15) {
        if(i < 2) {
          html += `<a href="javascript:;">${i+1}</a>`;
        }else if(i == 2) {
          html += `
            <span class="break">...</span>
          `;
        }else if(i > 2 && i < data.len-15) {
          continue;
        }else {
          html += `<a href="javascript:;">${i+1}</a>`;
        }
      }
      //页码小于等于20，全部显示
    }else {
      html += `<a href="javascript:;">${i+1}</a>`;
    }
  }
  return html;
}
