const ST_NAME = 'pudding_show_desktop_tip'

//给body添加一个class
document.querySelector('body').classList.add('pd__ex');

// add meta.
var meta = document.createElement('meta');
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1, user-scalable=no";
document.getElementsByTagName('head')[0].appendChild(meta);


// 移除target
function removeAllTarget(){
    let As = document.querySelectorAll('a');
    As.forEach(function(_a) {
        _a.removeAttribute('target');
    });
}

removeAllTarget();


function addRequestDesktopTip(){
    if(document.querySelector('.pudding_request_desktop_wrap')){return;}
    
    var styles = `
        .pudding_request_desktop_wrap{
            padding: 20px;
            width:70%;
            margin: 0 auto;
            position: fixed;
            bottom: 3px;
            background: rgba(255,255,255);
            border-radius: 5px;
            left: 10%;
            box-sizing:border-box;
            text-align: center;
            box-shadow: 0 0 3px rgba(33,33,33,0.3);
            transition: 1s;
    
        }
    
        .pudding_request_desktop_wrap.hide{
            transform:translate3d(0,100%,0);
            opacity: 0;
            pointer-events: none;
        }
    
        .pudding_request_desktop_wrap.displaynone{
            display:none;
        }
    
        .pudding_request_desktop_wrap .title{
            font-size:16px;
            margin-bottom: 10px;
        }
    
        .pudding_request_desktop_wrap p{
            display: flex;
            justify-content: space-between;
        }
    
        .pudding_request_desktop_wrap .content,
        .pudding_request_desktop_wrap a{
            display:block;
            font-size:14px;
            margin-bottom: 10px;
            text-align:left;
        }
    
        .pudding_request_desktop_wrap button{
            font-size:14px;
        }
    `
    
    var styleSheet = document.createElement("style")
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
    
    const wrap = document.createElement('DIV');
    wrap.className = 'pudding_request_desktop_wrap';
    
    const title = document.createElement('DIV');
    title.textContent = '布丁扩展：已优化PC版';
    title.className = "title";
    
    const content1 = document.createElement('P');
    content1.textContent = '1.点击文字图标';
    content1.className = "content";
    
    const content2 = document.createElement('P');
    content2.textContent = '2.请求桌面网站';
    content2.className = "content";
    
    const content3 = document.createElement('P');
    content3.textContent = '3.可能需要点豆瓣右上角电脑图标';
    content3.className = "content";
    
    const a = document.createElement('A');
    a.href = 'https://movie.douban.com';
    a.textContent = '4.点击这里访问桌面版';
    
    
    const icon1 = document.createElement('IMG');
    icon1.setAttribute('src',"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTdweCIgaGVpZ2h0PSIxMHB4IiB2aWV3Qm94PSIwIDAgMTcgMTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+5aSn5bCPPC90aXRsZT4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZvbnQtZmFtaWx5PSJQaW5nRmFuZ1NDLVJlZ3VsYXIsIFBpbmdGYW5nIFNDIiBmb250LXNpemU9IjEwIiBmb250LXdlaWdodD0ibm9ybWFsIj4KICAgICAgICA8dGV4dCBpZD0i5aSn5bCPIiBmaWxsPSIjMDAwMDAwIj4KICAgICAgICAgICAgPHRzcGFuIHg9IjAiIHk9IjkiPuWkpzwvdHNwYW4+CiAgICAgICAgICAgIDx0c3BhbiB4PSIxMCIgeT0iOSIgZm9udC1zaXplPSI3Ij7lsI88L3RzcGFuPgogICAgICAgIDwvdGV4dD4KICAgIDwvZz4KPC9zdmc+");
    
    
    content1.appendChild(icon1);
    
    const icon2 = document.createElement('IMG');
    icon2.setAttribute('src',"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMHB4IiB2aWV3Qm94PSIwIDAgMTIgMTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+VW50aXRsZWQgMjwvdGl0bGU+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNNy40ODA2MjEyMSw5LjUyOTQ2NDcyIEM3LjU4ODc1NTE3LDkuNTI5NDY0NzIgNy42ODE3MTkzNCw5LjQ5MTA2MzQ0IDcuNzU5NTEzNzMsOS40MTQyNjA4NiBDNy44MzczMDgxMiw5LjMzNzQ1ODI5IDcuODc2MjA1MzIsOS4yNDQxNTA4IDcuODc2MjA1MzIsOS4xMzQzMzgzOCBDNy44NzYyMDUzMiw5LjAyNDgzMTE0IDcuODM3MzA4MTIsOC45MzA4NjI0MyA3Ljc1OTUxMzczLDguODUyNDMyMjUgQzcuNjgxNzE5MzQsOC43NzQwMDIwOCA3LjU4ODc1NTE3LDguNzM0Nzg2OTkgNy40ODA2MjEyMSw4LjczNDc4Njk5IEw3LjQ1OCw4LjczNSBMNy40NTgsNy44NzMgTDEwLjQxODcwMSw3Ljg3MjgxNzk5IEMxMC43NjU3ODc2LDcuODcyODE3OTkgMTEuMDM3ODI2NCw3Ljc3NTA2MDAyIDExLjIzNDgxNzQsNy41Nzk1NDQwNyBDMTEuNDMxODA4Myw3LjM4NDAyODEyIDExLjUzMDMwMzgsNy4xMTI3MjY4NSAxMS41MzAzMDM4LDYuNzY1NjQwMjYgTDExLjUzMDMwMzgsMS4yMDk5OTE0NiBDMTEuNTMwMzAzOCwwLjg2Mjg1NDAwNCAxMS40MzE4MDgzLDAuNTkwNzI2MjE3IDExLjIzNDgxNzQsMC4zOTM2MDgwOTMgQzExLjAzNzgyNjQsMC4xOTY0ODk5NyAxMC43NjU3ODc2LDAuMDk3OTMwOTA4MiAxMC40MTg3MDEsMC4wOTc5MzA5MDgyIEwxLjUyNDU4MTc5LDAuMDk3OTMwOTA4MiBDMS4xNzc0NDQzMywwLjA5NzkzMDkwODIgMC45MDUzMTY1NDcsMC4xOTY0ODk5NyAwLjcwODE5ODQyMywwLjM5MzYwODA5MyBDMC41MTEwODAzLDAuNTkwNzI2MjE3IDAuNDEyNTIxMjM4LDAuODYyODU0MDA0IDAuNDEyNTIxMjM4LDEuMjA5OTkxNDYgTDAuNDEyNTIxMjM4LDYuNzY1NjQwMjYgQzAuNDEyNTIxMjM4LDcuMTEyNzI2ODUgMC41MTEwODAzLDcuMzg0MDI4MTIgMC43MDgxOTg0MjMsNy41Nzk1NDQwNyBDMC45MDUzMTY1NDcsNy43NzUwNjAwMiAxLjE3NzQ0NDMzLDcuODcyODE3OTkgMS41MjQ1ODE3OSw3Ljg3MjgxNzk5IEw0LjQ4OCw3Ljg3MyBMNC40ODgsOC43MzUgTDQuNDYyMjAzODYsOC43MzQ3ODY5OSBDNC4zNTQzNzUwOCw4LjczNDc4Njk5IDQuMjYxNDg3Miw4Ljc3NDAwMjA4IDQuMTgzNTQwMjIsOC44NTI0MzIyNSBDNC4xMDU1OTMyNCw4LjkzMDg2MjQzIDQuMDY2NjE5NzUsOS4wMjQ4MzExNCA0LjA2NjYxOTc1LDkuMTM0MzM4MzggQzQuMDY2NjE5NzUsOS4yNDQxNTA4IDQuMTA1NTkzMjQsOS4zMzc0NTgyOSA0LjE4MzU0MDIyLDkuNDE0MjYwODYgQzQuMjYxNDg3Miw5LjQ5MTA2MzQ0IDQuMzU0Mzc1MDgsOS41Mjk0NjQ3MiA0LjQ2MjIwMzg2LDkuNTI5NDY0NzIgTDcuNDgwNjIxMjEsOS41Mjk0NjQ3MiBaIE0xMC41MTQzNzM3LDUuNzg3MzIzIEwxLjQyODQ1MTQxLDUuNzg3MzIzIEMxLjI5OTgxOTgyLDUuNzg3MzIzIDEuMjM1NTA0MDMsNS43MjEzNzk2IDEuMjM1NTA0MDMsNS41ODk0OTI4IEwxLjIzNTUwNDAzLDEuMjQ2MzA3MzcgQzEuMjM1NTA0MDMsMS4xNDQwMjI2MiAxLjI2NDE2NTEyLDEuMDY0MjA2NDQgMS4zMjE0ODczLDEuMDA2ODU4ODMgQzEuMzc4ODA5NDksMC45NDk1MTEyMSAxLjQ1ODQ2MDM3LDAuOTIwODM3NDAyIDEuNTYwNDM5OTQsMC45MjA4Mzc0MDIgTDEwLjM4MjMwODgsMC45MjA4Mzc0MDIgQzEwLjQ4NDI4ODQsMC45MjA4Mzc0MDIgMTAuNTY0Njg5NSwwLjk0OTUxMTIxIDEwLjYyMzUxMjEsMS4wMDY4NTg4MyBDMTAuNjgyMzM0OCwxLjA2NDIwNjQ0IDEwLjcxMTc0NjEsMS4xNDQwMjI2MiAxMC43MTE3NDYxLDEuMjQ2MzA3MzcgTDEwLjcxMTc0NjEsNS41ODk0OTI4IEMxMC43MTE3NDYxLDUuNzIxMzc5NiAxMC42NDU5NTUzLDUuNzg3MzIzIDEwLjUxNDM3MzcsNS43ODczMjMgWiIgaWQ9IvSAmZciIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=");
    
    content2.appendChild(icon2);
    
    wrap.appendChild(title);
    wrap.appendChild(content1);
    wrap.appendChild(content2);
    wrap.appendChild(content3);
    wrap.appendChild(a);
    //    wrap.appendChild(button);
    
    document.body.appendChild(wrap);
}


const is_mobile_site = (window.location.host.indexOf('m.douban.com') !== -1);
const is_close_tip = (localStorage.getItem(ST_NAME) && localStorage.getItem(ST_NAME) === "false");

if(is_mobile_site && !is_close_tip){
    addRequestDesktopTip();
}


document.addEventListener('scroll', _ => {
    //移除a的target
    removeAllTarget();
    
    // 只要用户滚动就隐藏这个。。
    const pudding_tip = document.querySelector('.pudding_request_desktop_wrap');
    if(pudding_tip){
        pudding_tip.classList.add('hide');
    }
    
})

//首页轮播图的处理
function clearSlide(){
    const dom_ui_slide_items = document.querySelectorAll('.ui-slide-item');
    console.log(dom_ui_slide_items.length)
    
    if(!dom_ui_slide_items.length){return;}
    
    //1. 去掉空的dom
    //2. 去掉重复的dom
    //3. 就不管排序了吧...
    let titles = [];
    let putToBack = true;
        
    dom_ui_slide_items.forEach(function(slide,index) {
        const children = slide.childNodes;
        // 因为浏览器暂时还不支持 blank伪类，先用js删除
        if(children.length === 1 && children[0].nodeType === Node.TEXT_NODE ){
            slide.remove();
        }
        const title = slide.getAttribute('data-title');
        if(title){
            if(titles.includes(title)){
                slide.remove();
                console.log(slide,title)
            }else{
                if(slide.classList.contains('s') && index > 0){
                    putToBack = false;
                }
                
                if(putToBack){
                    const cloneSlide = slide.cloneNode(true);
                    slide.parentNode.appendChild(cloneSlide);
                    slide.remove();
                }
            
                titles.push(title);
            }
        }
    
    });
}

// 最后的计时器处理。
setTimeout( _ => {
    window.scrollTo(0, 0);
    clearSlide();
},500)







