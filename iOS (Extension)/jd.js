
// 添加一个全局的class 用来方便修改样式
document.querySelector('body').classList.add('pd__ex');


console.log('can i stop this???')

function preventAutoOpenApp(e){
    if(e.target.href.indexOf('openapp.jdmobile'!== -1)){
        console.log('ouch open a app???')
        const originHref = e.target.href;
        e.target.href = "javascript:;"
//        showBlockButton(originHref);
        removePreventAutoOpenAppEvent();
    }
}

//去掉烦人的自动打开app...
document.addEventListener('click',preventAutoOpenApp)

function removePreventAutoOpenAppEvent(){
    document.removeEventListener('click',preventAutoOpenApp);
}
