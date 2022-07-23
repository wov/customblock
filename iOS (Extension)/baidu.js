const BS_NAME = "pudding_block_sites";
const BAD_NAME = "pudding_block_ads";

// add a class for reset the styles easly.
document.querySelector('body').classList.add('pd__ex')

let _search_results_doms = document.querySelectorAll('.c-result.result');
let hideTipTimer;
let SiteBlockCount = 0;
let ADBlockCount = 0;

// 百度搜索
if(_search_results_doms.length){
    
    // 显示可以重置屏蔽的按钮
    function showBlockButton(){
        const pudding_blocked_tip = document.querySelector(".pudding_blocked_tip");
        if(!SiteBlockCount && !ADBlockCount){return;}
    
        if(pudding_blocked_tip){
            //如果已经有了，就显示出来
            pudding_blocked_tip.classList.remove('hide');
            if(SiteBlockCount){
                pudding_blocked_tip.querySelector('.countText').textContent = `屏蔽了${SiteBlockCount}个域名`;
            }
            if(ADBlockCount){
                pudding_blocked_tip.querySelector('.countTextAd').textContent = `屏蔽了${ADBlockCount}个广告`;
            }

            if(hideTipTimer){
                clearTimeout(hideTipTimer);
                hideTipTimer = null;
            }
            // 5秒后自动关闭。
            hideTipTimer = setTimeout( _ => {
                pudding_blocked_tip.classList.add('hide');
            },5000)
            
        }else{
            // 没有的话就创建一个
            //css
            var styles = `
                .pudding_blocked_tip{
                    width: 40%;
                    border-radius: 20px;
                    position: fixed;
                    padding: 8px;
                    margin: 0 auto;
                    bottom: 5px;
                    background-color: rgba(255,255,255);
                    left: 30%;
                    box-sizing:border-box;
                    text-align: center;
                    transition: 1s;
                    font-size: 12px;
                    box-shadow: 0 0 3px rgba(33,33,33,0.3);
                    z-index:1000;
                }
            
                .pudding_blocked_tip.hide{
                    transform:translate3d(0,100%,0);
                    opacity: 0;
                    pointer-events: none;
                }
            
                .pudding_blocked_tip .pudding_tip_title{
                    display:flex;
                    margin-bottom: 5px;
                    font-size:14px;
                    align-items: center;
                    justify-content : center;
                }
            
                .pudding_blocked_tip .pudding_tip_avatar{
                    width:16px;
                    height:16px;
                }
            
                .pudding_blocked_tip .tip_button{
                   color: rgb(10, 132, 255);
                }
                
                @media (prefers-color-scheme: dark) {
                    .pudding_blocked_tip{
                        background-color: #222;
                    }
                }
            `
            
            var styleSheet = document.createElement("style")
            styleSheet.innerText = styles
            document.head.appendChild(styleSheet)
            
            const tip_wrap = document.createElement('DIV');
            tip_wrap.className = 'pudding_blocked_tip';
            
            const title = document.createElement('DIV');
            title.className= "pudding_tip_title";
            
            const avatar = document.createElement('IMG');
            avatar.className = 'pudding_tip_avatar';
            
            avatar.setAttribute('src','data:image/png;base64,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');
            
            const name = document.createElement('DIV');
            name.className = 'pudding_tip_name';
            name.textContent = '布丁扩展';
            
            
            const content = document.createElement('P');
            content.className = 'pudding_tip_content countText';
            if(SiteBlockCount){
                content.textContent = `屏蔽了${SiteBlockCount}个域名`
            }
            
            const content2 = document.createElement('P');
            content2.className = 'pudding_tip_content countTextAd';
            
            if(ADBlockCount){
                content2.textContent = `屏蔽了${ADBlockCount}个广告`
            }
            
            const content3 = document.createElement('P');
            content3.className = 'pudding_tip_content tip_button';
            content3.textContent = `点击重置`
            
            title.appendChild(avatar)
            title.appendChild(name)
            
            tip_wrap.appendChild(title)
            tip_wrap.appendChild(content)
            tip_wrap.appendChild(content2)
            tip_wrap.appendChild(content3)
            
            tip_wrap.addEventListener( 'click', _ =>{
                const r = confirm('确定要重置所有屏蔽吗？')
                if(r){
                    localStorage.removeItem(BS_NAME);
                    localStorage.removeItem(BAD_NAME);
                    tip_wrap.classList.add('hide');
                    window.location.reload();
                }
            })
            
            document.body.appendChild(tip_wrap);
            
            if(hideTipTimer){
                clearTimeout(hideTipTimer);
                hideTipTimer = null;
            }
            // 5秒后自动关闭。
            hideTipTimer = setTimeout( _ => {
                tip_wrap.classList.add('hide');
            },5000)
            
        }
    }
    
    
    // 添加关闭按钮
    function addCloseAndHideResult(){
        SiteBlockCount = 0;
        ADBlockCount = 0;
        
        let results = document.querySelectorAll('.c-result.result');
        results.forEach(function(_r) {
            if(_r.classList.contains('__pudding')){return;}
            
            const log = _r.getAttribute('data-log');
            if(!log){return;}
            
            const logData = JSON.parse(log);
            if(!logData || !logData.mu){return;}
            
            let blockSites = localStorage.getItem(BS_NAME) ? JSON.parse(localStorage.getItem(BS_NAME)) : []
            
            let host;
            
            try {
                host = (new URL(logData.mu)).host || '';
            } catch (_){
                
            }
            if(!host){return;}

            
            // 假设包含了这个结果，则直接删除
            if(blockSites.includes(host)){
                SiteBlockCount++;
                _r.remove();
            }
            
            const _close = document.createElement('div');
            _close.className = "__pudding_close";
            _close.addEventListener('click',function(e){
                e.stopPropagation();
                
                let blockSites = localStorage.getItem(BS_NAME) ? JSON.parse(localStorage.getItem(BS_NAME)) : [];
                
                const c = confirm(`【布丁扩展】\n\n是否屏蔽来自“${host}”的结果？`);
                if(c){
                    blockSites.push(host);
                    localStorage.setItem(BS_NAME,JSON.stringify(blockSites));
                    _r.remove();
                    SiteBlockCount++;
                    showBlockButton();
                }else{
                    // nothing will happen
                }
            })
            
            _r.appendChild(_close);
            _r.classList.add('__pudding');
        });
        
        let ads = document.querySelectorAll('.c-container');
        ads.forEach( ad => {
            if(ad.classList.contains('__pudding')){return;}
            
            //判断是不是广告
            if(ad.querySelector('.ec-tuiguang') && ad.querySelector('.ec-tuiguang').textContent === "广告" && ad.querySelector('.c-showurl > span') && ad.querySelector('.c-showurl > span').textContent ){
                const adSource = ad.querySelector('.c-showurl > span').textContent;
                
                let blockAds = localStorage.getItem(BAD_NAME) ? JSON.parse(localStorage.getItem(BAD_NAME)) : [];
                
                // 假设包含了这个结果，则直接删除
                if(blockAds.includes(adSource)){
                    ADBlockCount++;
                    ad.remove();
                }
                
                const _close = document.createElement('div');
                _close.className = "__pudding_close";
                _close.addEventListener('click',function(e){
                    e.stopPropagation();

                    const adSource = ad.querySelector('.c-showurl > span').textContent;
                    let blockAds = localStorage.getItem(BAD_NAME) ? JSON.parse(localStorage.getItem(BAD_NAME)) : [];

                    const c = confirm(`【布丁扩展】\n\n是否屏蔽来自“${adSource}”的广告？`);
                    if(c){
                        if(!blockAds.includes(adSource)){
                            blockAds.push(adSource);
                            localStorage.setItem(BAD_NAME,JSON.stringify(blockAds));
                        }
                        ad.remove();
                        ADBlockCount++;
                        showBlockButton();
                    }else{
                        // nothing will happen
                    }
                })
                
                ad.appendChild(_close);
            }
            
            ad.classList.add('__pudding');
        })
        
        showBlockButton();
    }
    
    setTimeout( _ => {
        addCloseAndHideResult();
    },500)
    
    showBlockButton();
    addCloseAndHideResult();
    
    //点击下一页的时候
    const dom_next = document.querySelector('.new-pagenav-right');
    
    if(dom_next){
        dom_next.addEventListener('click', _ => {
            setTimeout( _ => {
                addCloseAndHideResult();
            },1000)
        })
    }
    
    
    document.addEventListener('scroll', _ => {
//        addCloseAndHideResult();
        
        // 只要用户滚动就隐藏这个。。
        const pudding_tip = document.querySelector('.pudding_blocked_tip');
        if(pudding_tip){
            pudding_tip.classList.add('hide');
        }
    });
}

const pageDom = document.querySelector('#page');

if(pageDom){
    const config = { attributes: true, childList: true, subtree: true };

    const callback = function(mutationsList, observer) {
        addCloseAndHideResult();
    };

    const observer = new MutationObserver(callback);
    observer.observe(pageDom, config);
}


// baidu baike
// baidu百科自动点击加载更多。
// 这里只要出现这个按钮自动触发这个按钮的事件。。
const baikeLoadmore = document.querySelector('.yx-load-more-inner.J-yx-load-moreContent');
if(baikeLoadmore){
    const observer = new IntersectionObserver(callback);
    observer.observe(baikeLoadmore);
    function callback(entries) {
        var _tap = new Event('tap');
        baikeLoadmore.dispatchEvent(_tap);
    }
}

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
