
// add meta.
var meta = document.createElement('meta');
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1, user-scalable=no";
document.getElementsByTagName('head')[0].appendChild(meta);

setTimeout( _ => {
    window.scrollTo(0, 0);
},500)


// 去掉所有的 a target 属性
function removeAllTarget(){
    let As = document.querySelectorAll('a');
    As.forEach(function(_a) {
        _a.removeAttribute('target');
    });
}

removeAllTarget();

//TODO: 添加关闭的功能...
document.addEventListener('scroll', _ => {
    
//    const player = document.querySelector('#bilibiliPlayer');
////    if(player){
////        player.classList.remove("mode-miniscreen");
////    }

    removeAllTarget();
    
    
})
