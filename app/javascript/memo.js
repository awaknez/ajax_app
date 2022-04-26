const buildHTML = (XHR) => {
  const item = XHR.response.post; //ここのpostはcreateアクションでjson形式で指定したpostのこと（と思う）。
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e)=>{
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form);
    const XHR = new XMLHttpRequest();
    XHR.open("POST","/posts", true); 
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload =() =>{  //これより下はサーバーとの通信が成功した際の処理。「onload」が「通信に成功した時」というサイン。
        if (XHR.status != 200){ //ステータスコードが200（リクエストが成功した）と一致しない＝「リクエストに成功していない」という意味。
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null; //この記述によってJSの処理から抜け出す。以降のコードを実施しないというブレーキとなる。
        };
        const list = document.getElementById("list"); //index.html.erbの"list"部分に挿入するというイメージなので、idでlistと名付けた要素を取得する。
        const formText = document.getElementById("content");
        list.insertAdjacentHTML("afterend", buildHTML(XHR)); //idでlistと名のついた要素の直後にhtml変数の中に入っているhtmlの塊を挿入する。
        formText.value = "";
      };
  });
};

window.addEventListener('load',post);