// 添加一个全局的class 用来方便修改样式
document.querySelector('body').classList.add('pd__ex');

const CLASSFLAG = "pudding_expend";


function relaceClick2Link(){
    
    console.log('start chanage link')
    
    let _replacelink_doms = document.querySelectorAll('.list-search .list-item .card-container, .component-shop-review .review-item ,.component-shop-review-tag .groupTitle');
    console.log(_replacelink_doms.length)
    if(_replacelink_doms.length){
        _replacelink_doms.forEach(_r => {
            if(_r.classList.contains(CLASSFLAG)){return;}
            _r.classList.add(CLASSFLAG);
            let url = _r.getAttribute('data-launch-h5-url');
            
            if(url){
                let a = document.createElement('A');
                a.href = url;
                a.classList.add('pd__create_link')
                a.appendChild(_r.cloneNode(true));
                // 将节点放到a内部，删除原来的节点
                _r.parentNode.appendChild(a);
                _r.remove();
            }
        })
    }
}




//瀑布中的跳转app去除

let _moreRecommendCards = document.querySelectorAll('.seed-waterfall-item .moreRecommendCard');

if(_moreRecommendCards.length){
    _moreRecommendCards.forEach(_r => {
        _r.addEventlistener('click', e => {
            let url = _r.getAttribute('data-launch-app-url');
            
//       dianping://newfeeddetail?replyordertype=1&type=29&norecommend=1&mainid=120817123&styletype=1&videosrc=home_feed&poidetail=1&firstimagekey=b2e94b8312f2eb4673b5d37a5e7d8fc7&source=app.home.feed&from=app.home.feed&queryid=b707134d-752b-4af6-abc1-172c5d29a419&feedcontext=%7B%22deleteTypes%22%3A%2210%2C15%2C16%23301417737214441342%23base%22%7D&abflags=%7B%7D&bussiid=5&moduleid=1 https://m.dianping.com/ugcdetail/120306839?bizType=29&utm_source=shouyefeed&queryid=4fd978ac-7eee-4175-95af-a4c905c26b0e&feedcontext=%7B%7D&abflags=%7B%7D&bussiid=5&moduleid=0
            url = url.replace('dianping://','https://');
            
            if(url){
                window.location.href = url
            }
        })
    })
}


const rootChangeDom = document.querySelector('#app') || document.querySelector('#cocktail-root');
if(rootChangeDom){
    const config = { attributes: false, childList: true, subtree: true };
    const callback = function(mutationsList, observer) {
        relaceClick2Link();
    };
    const observer = new MutationObserver(callback);
    observer.observe(rootChangeDom, config);
}

//document.addEventListener('load',_ => {
//});
window.addEventListener('load', (event) => {
    relaceClick2Link();
});
