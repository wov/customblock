// 添加一个全局的class 用来方便修改样式
document.querySelector('body').classList.add('pd__ex');

function addDarkMeta(){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // remove origin theme color...
        document.querySelector("[name='theme-color']").remove();

        //add a dark meta..
        var meta = document.createElement('meta');
        meta.name = "theme-color";
        meta.content = "#121212";
        meta.media = "(prefers-color-scheme: dark)";
        document.getElementsByTagName('head')[0].appendChild(meta);
    }
}

addDarkMeta();


function addExpendForLongText(){
    const texts = document.querySelectorAll('.weibo-text');
    const CLASSFLAG = 'pudding_expend';
    texts.forEach( t => {
        if(t.classList.contains(CLASSFLAG)){return;}
        t.classList.add(CLASSFLAG);
        const as = t.querySelectorAll('a');
        as.forEach( a => {
            if(a.textContent === '全文'){
                const pudding_expend_button = document.createElement('a');
                pudding_expend_button.href = "javascript:;"
                pudding_expend_button.textContent = ' [直接展开by布丁] ';
                pudding_expend_button.addEventListener( 'click' , e => {
                    // const ajaxHref = a.href.replace();
                    const id  =  a.href.replace(/.*\/(\w+)\/?$/, '$1');
                    const requestUrl = `/statuses/extend?id=${id}`;
                    fetch(requestUrl)
                    .then(response => response.json())
                    .then(data => {
                        if(data.ok && data.ok === 1 && data.data && data.data.longTextContent){
                            a.parentNode.innerHTML = data.data.longTextContent;
                        }
                    });
                });
                t.appendChild(pudding_expend_button);
            }
        })
    });
}

function openLongPictureInNewWindow(){
    const images = document.querySelectorAll('.m-img-box');
    const CLASSFLAG = "pudding_expend";

    images.forEach( i => {
        if(i.classList.contains(CLASSFLAG)){return;}
        i.classList.add(CLASSFLAG);
        if(i.querySelector('.feed-mark') && i.querySelector('.feed-mark').textContent === "长图"){
            const img = i.querySelector('img');
            const a = document.createElement('A');
            a.href = img.src;
            a.setAttribute('target','weibo_image_view');
            a.appendChild(i.cloneNode(true));
            a.querySelector('.feed-mark').textContent = '[布丁优化长图]';
            i.parentNode.appendChild(a);
            i.remove();
        }
    });
}

const rootChangeDom = document.querySelector('#app');
if(rootChangeDom){
    const config = { attributes: true, childList: true, subtree: true };
    const callback = function(mutationsList, observer) {
        addExpendForLongText();
        openLongPictureInNewWindow();
    };
    const observer = new MutationObserver(callback);
    observer.observe(rootChangeDom, config);
}
