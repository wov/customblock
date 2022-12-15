// 添加一个全局的class 用来方便修改样式
document.querySelector('body').classList.add('pd__ex');

function addDarkMeta(){
//    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // remove origin theme color...
        
//        if( document.querySelector("[name='theme-color']")){
//            document.querySelector("[name='theme-color']").remove();
//        }

        //add a dark meta..
        var meta = document.createElement('meta');
        meta.name = "theme-color";
        meta.content = "#121212";
        meta.media = "(prefers-color-scheme: dark)";
        document.getElementsByTagName('head')[0].appendChild(meta);
//    }
}

addDarkMeta();



// 移除target，手机端真的不需要新窗口打开了，啊喂～
function removeAllTarget(){
    let As = document.querySelectorAll('a');
    As.forEach(function(_a) {
        _a.removeAttribute('target');
    });
}

removeAllTarget();

// 因为很多懒加载内容，所以需要移除
document.addEventListener('scroll', _ => {
    //移除a的target
    removeAllTarget();
});



// copy...
function Copy(content){
//  var querySelector = $this.next().attr("id");
//  var emailLink = document.querySelector("#"+querySelector);

  if (navigator.clipboard) {
//    var myText = emailLink.textContent;
    navigator.clipboard.writeText(content).then(function() {
        alert('复制成功');
      // Do something to indicate the copy succeeded
    }).catch(function() {
      // Do something to indicate the copy failed
    });
  } else {
    // Here's where you put the fallback code for older browsers.
  }
}


function addCopyButton(){
    console.log('addCopyButton');
    const items = document.querySelectorAll('code');
    const CLASSFLAG = "pudding_extension";
    if(!items.length){return;}
    
    
    
//    BlockContent();
    
    items.forEach( i => {
        if(i.classList.contains(CLASSFLAG)){return;}
        i.classList.add(CLASSFLAG);
        // 添加直接展开的功能
//        const t = i.querySelector('.video-card__content');

        // 添加屏蔽的功能
        // 用来放关闭按钮的容器
        
        const parent = i.parentNode;
        
        const copyDom = document.createElement('div');
        copyDom.className = '__pudding_copy';
        
        parent.appendChild(copyDom);
        
        copyDom.textContent = '复制代码';
        
        copyDom.addEventListener('click', e => {
            e.stopPropagation();
            e.preventDefault();
            Copy(i.textContent);
        });
    })
}








const rootChangeDom = document.querySelector('#main');
if(rootChangeDom){
    const config = { attributes: false, childList: true, subtree: true };
    const callback = function(mutationsList, observer) {
//        addButtonAndBlock();
//        openLongPictureInNewWindow();
        addCopyButton();
    };
    const observer = new MutationObserver(callback);
    observer.observe(rootChangeDom, config);
}

setTimeout(_ => {
    addCopyButton();
},1000)
