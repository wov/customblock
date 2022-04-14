// 添加一个全局的class 用来方便修改样式
document.querySelector('body').classList.add('pd__ex');

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
