// 添加一个全局的class 用来方便修改样式
document.querySelector('body').classList.add('pd__ex');

function addViewPortMeta(){
    // add meta.
    if(!document.querySelector('meta#pd_meta')){
        var meta = document.createElement('meta');
        meta.id = 'pd_meta';
        meta.name = "viewport";
        meta.content = "width=device-width, initial-scale=1, user-scalable=no";
        document.getElementsByTagName('head')[0].appendChild(meta);
    }
}

addViewPortMeta();


// 去掉所有的 a target 属性
function removeAllTarget(){
    let As = document.querySelectorAll('a');
    As.forEach(function(_a) {
        _a.removeAttribute('target');
    });
}

removeAllTarget();


