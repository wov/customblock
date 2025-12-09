
// add a class for reset the styles easly.
document.querySelector('body').classList.add('pd__ex');

const BS_NAME = "pudding_block_ups";
const BK_NAME = "pudding_block_keywords";

function addButtonAndBlock(){
    console.log('addButtonAndBlock');
    const items = document.querySelectorAll('.cell');
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
        const h = i;
        // up主的名字..
        const upDom = i.querySelector('strong a');
        
        const titleDom = i.querySelector('.item_title a,.reply_content');

        if(h && upDom){
            let up = upDom.textContent.replaceAll(/\s+/g, '');
            let title = titleDom ? titleDom.textContent : '';
            if(!up){return;}
            const blockDom = document.createElement('div');
            blockDom.className = '__pudding_block';
            h.appendChild(blockDom)

            blockDom.addEventListener('click', e => {
                e.stopPropagation();
                e.preventDefault();
                pd_showBlockModal(up,title);
            })
        }
    })
}

function BlockContent(){
    const items = document.querySelectorAll('.cell');
    items.forEach( i => {
        
        // 添加屏蔽的功能
        // up主的名字..
        const upDom = i.querySelector('strong a');
        const titleDom = i.querySelector('.item_title a,.reply_content');
                
        
        if(upDom){
            let up = upDom.textContent.replaceAll(/\s+/g, '');
            if(!up){return;}
            
            let blockUsers = localStorage.getItem(BS_NAME) ? JSON.parse(localStorage.getItem(BS_NAME)) : [];
            if(blockUsers.includes(up)){
                console.log('bingo remove up',up);
                i.remove();
            }
        }
        
        if(titleDom){
            let title = titleDom.textContent.replaceAll(/\s+/g, '');
            console.log(title)
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





function pd_showBlockModal(up,title){
    
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
    
    const titleEm = document.createElement('em');
    titleEm.textContent = title;
    
    
    const keyWordLabel = document.createElement('label');
    const keySpan = document.createElement('span');
    keySpan.textContent = '关键词:'
    const keyInput = document.createElement('input');
    keyInput.type = "text";
    keyInput.placeholder = "填入想屏蔽的关键词";
    
    const buttons = document.createElement('div');
    buttons.className = "buttons";
    
    const confirm = document.createElement('button');
    confirm.textContent = '确定';
    
    const cancel = document.createElement('button');
    cancel.textContent = '取消';
    
    const download = document.createElement('button');
    download.textContent = '下载';
    
    inner.appendChild(description);
    upLabel.appendChild(upCheck);
    upLabel.appendChild(upSpan);
    
    inner.appendChild(upLabel);

    inner.appendChild(titleEm);
    
    
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



//setTimeout(_ => {
addButtonAndBlock();
//},1000)
