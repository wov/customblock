
// 添加一个全局的class 用来方便修改样式
document.querySelector('body').classList.add('pd__ex');
console.log('tieba js ...')


// 移除跳转下载app
document.addEventListener('click',e => {
    const _target = e.target;
    if(_target.hasAttribute("data-type") &&
       _target.getAttribute("data-type") === "feed" &&
       _target.hasAttribute("data-tid")
       ){
        
        const id = _target.getAttribute("data-tid");
        const url = `//tieba.baidu.com/p/${id}`;
        console.log(url);
        window.location.href = url;
    }
});
