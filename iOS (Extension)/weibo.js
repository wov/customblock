const BS_NAME = "pudding_block_users";

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

// 添加直接展开的按钮
// function addExpendForLongText(){
//     const texts = document.querySelectorAll('.weibo-text');
//     const CLASSFLAG = 'pudding_expend';
//     texts.forEach( t => {
//         if(t.classList.contains(CLASSFLAG)){return;}
//         t.classList.add(CLASSFLAG);
//         const as = t.querySelectorAll('a');
//         as.forEach( a => {
//             if(a.textContent === '全文'){
//                 const pudding_expend_button = document.createElement('a');
//                 pudding_expend_button.href = "javascript:;"
//                 pudding_expend_button.textContent = ' [直接展开 by布丁]';
//                 pudding_expend_button.addEventListener( 'click' , e => {
//                     // const ajaxHref = a.href.replace();
//                     const id  =  a.href.replace(/.*\/(\w+)\/?$/, '$1');
//                     const requestUrl = `/statuses/extend?id=${id}`;
//                     fetch(requestUrl)
//                     .then(response => response.json())
//                     .then(data => {
//                         if(data.ok && data.ok === 1 && data.data && data.data.longTextContent){
//                             a.parentNode.innerHTML = data.data.longTextContent;
//                         }
//                     });
//                 });
//                 t.appendChild(pudding_expend_button);
//             }
//         })
//     });
// }

// 添加block的功能&展开的功能
function addButtonAndBlock(){
    const items = document.querySelectorAll('.wb-item-wrap');
    const CLASSFLAG = "pudding_extension";
    if(!items.length){return;}

    items.forEach( i => {
        if(i.classList.contains(CLASSFLAG)){return;}
        i.classList.add(CLASSFLAG);

        // 添加直接展开的功能
        const t = i.querySelector('.weibo-text');
        if(t){
            const as = t.querySelectorAll('a');
            as.forEach( a => {
                if(a.textContent === '全文'){
                    const pudding_expend_button = document.createElement('a');
                    pudding_expend_button.href = "javascript:;"
                    pudding_expend_button.textContent = ' [布丁展开]';
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
        }

        // 添加屏蔽的功能
        const h = i.querySelector('header.weibo-top');
        const idDom = h.querySelector('.m-text-box > a');
        if(h && idDom){
            const id = idDom.href.replace(/.*\/(\w+)\/?$/, '$1');
            const name =idDom.querySelector('.m-text-cut').textContent.replaceAll(/\s/g,'');
            let blockUsers = localStorage.getItem(BS_NAME) ? JSON.parse(localStorage.getItem(BS_NAME)) : [];
            if(blockUsers.includes(id)){
                i.remove();
            }
            const blockDom = document.createElement('div');
            blockDom.classList.add('m-add-box');
            blockDom.classList.add('m-followBtn');
            blockDom.innerHTML = '<span class="m-add-box" style="margin:0 0 0 3px;"><h4>屏蔽</h4></span>'
            h.appendChild(blockDom)

            blockDom.addEventListener( 'click', e => {
                const r = confirm(`布丁扩展🍮\n\n确定要屏蔽“${name}”吗？\n屏蔽只对本地有效`);
                if(r){
                    let blockUsers = localStorage.getItem(BS_NAME) ? JSON.parse(localStorage.getItem(BS_NAME)) : [];
                    blockUsers.push(id);
                    localStorage.setItem(BS_NAME,JSON.stringify(blockUsers));
                    i.remove();
                }
            } )
        }

    } )
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
            a.querySelector('.feed-mark').textContent = '[🍮优化长图]';
            i.parentNode.appendChild(a);
            i.remove();
        }
    });
}

const rootChangeDom = document.querySelector('#app');
if(rootChangeDom){
    const config = { attributes: true, childList: true, subtree: true };
    const callback = function(mutationsList, observer) {
        addButtonAndBlock();
        openLongPictureInNewWindow();
    };
    const observer = new MutationObserver(callback);
    observer.observe(rootChangeDom, config);
}
