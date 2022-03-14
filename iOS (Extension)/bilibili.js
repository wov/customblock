document.addEventListener('click', event => {
    let target = event.target;
    console.log(target)
    // 假设有链接就直接走链接了，不要使用js跳转
    if(target.href){
        window.location.href = target.href;
    }
    
    if(target.closest('.v-card-single')){
        setTimeout( _ => {
            addNativePlayButton();
            rebulidVideoRelated();
        },1000)
    }
    
})


//添加原生播放按钮
function addNativePlayButton(){
    if( !document.querySelector('.__puddingPlayInOriginDiv') && document.querySelector('video') ){
        const playInOrignButton = document.createElement('div');
        playInOrignButton.className = '__puddingPlayInOriginDiv';
        playInOrignButton.innerText = '布丁：在原生播放器中播放，上滑可以画中画';

        playInOrignButton.addEventListener('click', _ => {
            const video = document.querySelector('video')
            document.location.href = video.src
        });

        document.body.appendChild(playInOrignButton)
    }
}

//重构详情页下面的全是app推荐的元素
function rebulidVideoRelated(){
    const videoID = window.location.href.replace(/https?:\/\/m\.bilibili\.com\/video\/BV\d/,'');
    const requestUrl = `https://api.bilibili.com/x/web-interface/view/detail?bvid=${videoID}`;
    
    const request = new Request(requestUrl);

    const url = request.url;
    const method = request.method;
    const credentials = request.credentials;
    
    setTimeout( _=> {
        fetch(request)
            .then(response => response.json())
        .then(resData => {
            if(resData && resData.data && resData.data.Related  && resData.data.Related.length ){
                resData.data.Related.map( relatedData => {
                    createRelatedDom(relatedData)
                })
            }
        })
        
        
    } , 2000 )
}


function createRelatedDom(data){
//    console.log(data)
    const _outter = document.createElement('DIV');
    _outter.className = 'launch-app-btn v-card-toapp __pudding_create';
    
    const _a = document.createElement('A');
    _a.href = data.short_link_v2;
    
    const _card = document.createElement('DIV');
    _card.className = 'card';
    
    const _img = document.createElement('IMG');
    _img.className = 'm-bfs-pic pic';
    _img.src = data.pic;
    
    const _label = document.createElement('DIV');
    _label.className = 'label';
    _label.textContent = data.rcmd_reason;
    
    const _count = document.createElement('DIV');
    _count.className = 'count';
    
    const _left = document.createElement('DIV');
    _left.className = 'left';
    
        const _itemA = document.createElement('SPAN');
        _itemA.className = 'item';
        
            const _iconA = document.createElement('I');
            _iconA.className = 'iconfont icon_shipin_bofangshu';
            
            const _numA = document.createElement('SPAN');
            _numA.className = 'num';
            
            let views
            if(data.stat.view > 10000){
                views = parseInt(data.stat.view/10000) + '万'
            }else if(data.stat.view > 1000){
                views = parseInt(data.stat.view/1000) + '千'
            }else{
                views = data.stat.view
            }
            
            _numA.textContent = views;
        
            _itemA.appendChild(_iconA);
            _itemA.appendChild(_numA);

    
            const _itemB = document.createElement('SPAN');
            _itemB.className = 'item';
            
            const _iconB = document.createElement('I');
            _iconB.className = 'iconfont icon_shipin_danmushu';
            
            const _numB = document.createElement('SPAN');
            _numB.className = 'num';
            
            let danmaku
            if(data.stat.danmaku > 10000){
                danmaku = parseInt(data.stat.danmaku/10000) + '万'
            }else if(data.stat.danmaku > 1000){
                danmaku = parseInt(data.stat.danmaku/1000) + '千'
            }else{
                danmaku = data.stat.danmaku
            }
            
            _numB.textContent = danmaku;
            
            _itemB.appendChild(_iconB);
            _itemB.appendChild(_numB);
    
        _left.appendChild(_itemA);
        _left.appendChild(_itemB);
        
    const _duration = document.createElement('SPAN');
    _duration.className = 'duration';
    _duration.textContent = Math.floor(data.duration/60)+':'+(data.duration % 60);
    
    _count.appendChild(_left);
    _count.appendChild(_duration);
    
    _apptag = document.createElement('SPAN');
    _apptag.className = 'open-app weakened';
    _apptag.textContent = '布丁优化'
    
    _card.appendChild(_img);
    _card.appendChild(_label);
    _card.appendChild(_count);
    _card.appendChild(_apptag);

    _title = document.createElement('P');
    _title.className = 'title';
    _title.textContent = data.title;
    
    _a.appendChild(_card)
    _a.appendChild(_title)
    
    _outter.appendChild(_a);
    
    const _cardBox = document.querySelector('.m-video-related .card-box');
    if(_cardBox){
        _cardBox.appendChild(_outter)
    }
}


if(window.location.href.indexOf('video') !== -1){
    addNativePlayButton();
    rebulidVideoRelated();
}








