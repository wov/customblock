//去掉淘宝烦人的自动打开app...



document.addEventListener('click',function(e){
    if(e.target.href.indexOf('tbopen'!== -1)){
        e.target.href = "javascript:;"
    }
})
