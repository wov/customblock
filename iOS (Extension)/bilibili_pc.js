const BS_NAME = "pudding_block_ups";
const BAD_NAME = "pudding_block_channels";
const BK_NAME = "pudding_block_keywords";

// add a class for reset the styles easly.
document.querySelector('body').classList.add('pd__ex');

function addViewPortMeta(){
    // add meta.
    var meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1, user-scalable=no";
    document.getElementsByTagName('head')[0].appendChild(meta);
}

addViewPortMeta();

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

document.addEventListener('scroll', _ => {
    removeAllTarget();
})

// 给视频添加inline的播放
let video = document.querySelector('video');
if(video){
    video.setAttribute('playsinline',"true");
    video.setAttribute('controls',"true");
    video.volume = 1;
    video.addEventListener('play', (event) => {
        video.muted= false;
    });
}


setTimeout( _ => {
    let video = document.querySelector('video');
    if(video){
        video.setAttribute('playsinline',"true");
        video.setAttribute('controls',"true");
        video.volume = 1;
        video.muted= false;
    }
},2000);


function addButtonAndBlock(){
    console.log('addButtonAndBlock');
    const items = document.querySelectorAll('.video-card,.rank-item,.bili-video-card,.bili-live-card');
    const CLASSFLAG = "pudding_extension";
    if(!items.length){return;}
    
    BlockContent();
    
    items.forEach( i => {
        if(i.classList.contains(CLASSFLAG)){return;}
        i.classList.add(CLASSFLAG);
        // 添加直接展开的功能
//        const t = i.querySelector('.video-card__content');

        // 添加屏蔽的功能
        // 用来放关闭按钮的容器
        const h = i.querySelector('.video-card__content,.img,.bili-video-card__image--wrap,.bili-live-card__image');
        // up主的名字..
        const upDom = i.querySelector('.up-name,.bili-video-card__info--author,.bili-live-card__info--uname');
                
        if(h && upDom){
            let up = upDom.textContent.replaceAll(/\s+/g, '');
            if(!up){return;}
            const blockDom = document.createElement('div');
            blockDom.className = '__pudding_block';
            h.appendChild(blockDom)

            blockDom.addEventListener('click', e => {
                e.stopPropagation();
                e.preventDefault();
                pd_showBlockModal(up);
            })
        }
    })
}

function BlockContent(){
    const items = document.querySelectorAll('.video-card,.rank-item,.bili-video-card,.bili-live-card');
    items.forEach( i => {
        
        // 添加屏蔽的功能
        // up主的名字..
        const upDom = i.querySelector('.up-name,.bili-video-card__info--author,.bili-live-card__info--uname');
        const titleDom = i.querySelector('.bili-video-card__info--tit,.bili-live-card__info--tit,.bili-movie-card__info--tit,.video-name,.info .title');
                
        if(upDom){
            let up = upDom.textContent.replaceAll(/\s+/g, '');
            if(!up){return;}
            
            let blockUsers = localStorage.getItem(BS_NAME) ? JSON.parse(localStorage.getItem(BS_NAME)) : [];
            if(blockUsers.includes(up)){
                i.remove();
            }
        }
        
        if(titleDom){
            let title = titleDom.textContent.replaceAll(/\s+/g, '');
            if(!title){return;}
            
            let blockKeyWords = localStorage.getItem(BK_NAME) ? JSON.parse(localStorage.getItem(BK_NAME)) : [];
            blockKeyWords.forEach( w => {
                if(title.indexOf(w) !== -1){
                    console.log('bingo',w);
                    i.remove();
                }
            })
        }
    })
}

function addButtonAndBlockToChannel(){
    console.log('addButtonAndBlockToChannel');
    const items = document.querySelectorAll('.floor-single-card');
    const CLASSFLAG = "pudding_extension";
    if(!items.length){return;}
    
    BlockChannel();
    
    items.forEach( i => {
        if(i.classList.contains(CLASSFLAG)){return;}
        i.classList.add(CLASSFLAG);
        // 添加直接展开的功能
//        const t = i.querySelector('.video-card__content');

        // 添加屏蔽的功能
        // 用来放关闭按钮的容器
        const h = i.querySelector('.cover-container');
        // up主的名字..
        const channelNameDom = i.querySelector('.floor-title');
                
        if(h && channelNameDom){
            let name = channelNameDom.textContent.replaceAll(/\s+/g, '');
            if(!name){return;}
            const blockDom = document.createElement('div');
            blockDom.className = '__pudding_block';
            h.appendChild(blockDom)

            blockDom.addEventListener('click', e => {
                e.stopPropagation();
                e.preventDefault();
                pd_showBlockChannelModal(name);
            })
        }
    })
}


function BlockChannel(){
    const items = document.querySelectorAll('.floor-single-card');
    items.forEach( i => {
        // 添加屏蔽的功能
        const channelNameDom = i.querySelector('.floor-title');
                
        if(channelNameDom){
            let name = channelNameDom.textContent.replaceAll(/\s+/g, '');
            if(!name){return;}
            
            let BlockChannels = localStorage.getItem(BAD_NAME) ? JSON.parse(localStorage.getItem(BAD_NAME)) : [];
            if(BlockChannels.includes(name)){
                i.remove();
            }
        }
    });
}


function pd_showBlockModal(up){
    
    if(document.querySelector('.pudding_block_Modal')){return;}
    
    const blockModal = document.createElement('div');
    blockModal.className = 'pudding_block_Modal';
    
    const inner = document.createElement('div');
    inner.className = 'pudding_block_inner';
    
    const description = document.createElement('h3');
    description.textContent = "布丁扩展:屏蔽up主，或者标题关键词。屏蔽只在本地有效。"
    
    const upLabel = document.createElement('label');
    const upCheck = document.createElement('input');
    upCheck.type = 'checkbox';
    
    const upSpan = document.createElement('span');
    upSpan.textContent = `屏蔽：${up}`;
    upSpan.checked = true;
    
    const keyWordLabel = document.createElement('label');
    const keySpan = document.createElement('span');
    keySpan.textContent = '关键词:'
    const keyInput = document.createElement('input');
    keyInput.type = "text";
    keyInput.placeholder = "填入你想屏蔽的关键词";
    
    const buttons = document.createElement('div');
    buttons.className = "buttons";
    
    const confirm = document.createElement('button');
    confirm.textContent = '确定';
    
    const cancel = document.createElement('button');
    cancel.textContent = '取消';
    
    const download = document.createElement('button');
    download.textContent = '下载';
    
    
    inner.appendChild(description);
    upLabel.appendChild(upCheck)
    upLabel.appendChild(upSpan)
    inner.appendChild(upLabel);
    
    keyWordLabel.appendChild(keySpan);
    keyWordLabel.appendChild(keyInput);
    inner.appendChild(keyWordLabel);

    buttons.appendChild(confirm);
    buttons.appendChild(cancel);
//    buttons.appendChild(download);

    inner.appendChild(buttons);
    
    blockModal.appendChild(inner);
    document.body.appendChild(blockModal);
    
    //取消按钮
    cancel.addEventListener('click',e => {
        blockModal.remove();
    });
    
    //确定按钮
    confirm.addEventListener('click',e => {
        //添加到up主屏蔽名单
        if(upCheck.checked){
            let blockUsers = localStorage.getItem(BS_NAME) ? JSON.parse(localStorage.getItem(BS_NAME)) : [];
            blockUsers.push(up);
            localStorage.setItem(BS_NAME,JSON.stringify(blockUsers));
        }
        //添加到关键字屏蔽名单
        if(keyInput.value){
            let blockKeyWords = localStorage.getItem(BK_NAME) ? JSON.parse(localStorage.getItem(BK_NAME)) : [];
            blockKeyWords.push(keyInput.value);
            
            blockKeyWords = blockKeyWords.filter(function(item, pos) {
                return blockKeyWords.indexOf(item) == pos;
            })
            
            localStorage.setItem(BK_NAME,JSON.stringify(blockKeyWords));
        }
        BlockContent();
        blockModal.remove();
    });
    
    download.addEventListener('click',e => {
        let blockUsers = localStorage.getItem(BS_NAME) ? JSON.parse(localStorage.getItem(BS_NAME)) : [];
        let blockKeyWords = localStorage.getItem(BK_NAME) ? JSON.parse(localStorage.getItem(BK_NAME)) : [];
        downloadObjectAsJson({blockUsers , blockKeyWords},'B站屏蔽')
    });
    
}


function pd_showBlockChannelModal(name){
    
    if(document.querySelector('.pudding_block_Modal')){return;}
    
    const blockModal = document.createElement('div');
    blockModal.className = 'pudding_block_Modal';
    
    const inner = document.createElement('div');
    inner.className = 'pudding_block_inner';
    
    const description = document.createElement('h3');
    description.textContent = `布丁扩展:屏蔽${name}频道?。屏蔽只在本地有效。`
    
    const buttons = document.createElement('div');
    buttons.className = "buttons";
    
    const confirm = document.createElement('button');
    confirm.textContent = '确定';
    
    const cancel = document.createElement('button');
    cancel.textContent = '取消';
    
    inner.appendChild(description);

    buttons.appendChild(confirm);
    buttons.appendChild(cancel);

    
    inner.appendChild(buttons);
    
    blockModal.appendChild(inner);
    document.body.appendChild(blockModal);
    
    //取消按钮
    cancel.addEventListener('click',e => {
        blockModal.remove();
    });
    
    //确定按钮
    confirm.addEventListener('click',e => {
        let blockChannels = localStorage.getItem(BAD_NAME) ? JSON.parse(localStorage.getItem(BAD_NAME)) : [];
        blockChannels.push(name);
        localStorage.setItem(BAD_NAME,JSON.stringify(blockChannels));
        BlockChannel();
        blockModal.remove();
    });
}

setTimeout(_ => {
    addButtonAndBlock();
    addButtonAndBlockToChannel();
},1000)


const rootChangeDom = document.querySelector('#app,main.bili-layout,main.bili-feed4-layout');
if(rootChangeDom){
    const config = { attributes: false, childList: true, subtree: true };
    const callback = function(mutationsList, observer) {
        addButtonAndBlock();
        addButtonAndBlockToChannel();
//        openLongPictureInNewWindow();
    };
    const observer = new MutationObserver(callback);
    observer.observe(rootChangeDom, config);
}

// 下载屏蔽数据。
function downloadObjectAsJson(exportObj, exportName){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
