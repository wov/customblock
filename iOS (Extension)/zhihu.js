// 添加一个全局的class 用来方便修改样式
document.querySelector('html').classList.add('pd__ex');

/***之前使用知乎自己的暗黑模式Start***/
//
const rootHtml = document.documentElement;
const config = { attributes: true, childList: true, subtree: true };
//
const callback = function(mutationsList, observer) {
//    document.querySelector('body').classList.add('pd__ex');
//    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//        rootHtml.setAttribute('data-theme','dark');
//    }
    removeAllTarget();
};

const observer = new MutationObserver(callback);
observer.observe(document.body, config);

function addDarkMeta(){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // remove origin theme color...
        
        if( document.querySelector("[name='theme-color']")){
            document.querySelector("[name='theme-color']").remove();
        }

        //add a dark meta..
        var meta = document.createElement('meta');
        meta.name = "theme-color";
        meta.content = "#121212";
        meta.media = "(prefers-color-scheme: dark)";
        document.getElementsByTagName('head')[0].appendChild(meta);
    }
}

addDarkMeta();

/***之前使用知乎自己的暗黑模式End***/



// 去掉所有的 a target 属性
function removeAllTarget(){
    let As = document.querySelectorAll('a');
    As.forEach(function(_a) {
        _a.removeAttribute('target');
    });
}

removeAllTarget();

//document.addEventListener('scroll', _ => {
//    removeAllTarget();
//})
