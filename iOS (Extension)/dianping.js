// 添加一个全局的class 用来方便修改样式
document.querySelector('body').classList.add('pd__ex');


let _search_results_doms = document.querySelectorAll('.list-search .list-item .card-container');


if(_search_results_doms.length){
    _search_results_doms.forEach(_r => {
        _r.addEventlistener('click', e => {
            let url = _r.getAttribute('data-launch-h5-url');
            console.log(url)
            if(url){
                window.location.href = url
            }
        })
    })
}
