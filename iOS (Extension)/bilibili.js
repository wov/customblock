// bilibili 手机站
// 主要就是添加切换到pc站的提示

let hideTipTimer;

// 显示可以重置屏蔽的按钮
function showTurnPCButton(){
    const pudding_blocked_tip = document.querySelector(".pudding_openpc_tip");
    if(pudding_blocked_tip){ return;}
    
    //css
    var styles = `
            .pudding_openpc_tip{
                width: 40%;
                border-radius: 20px;
                position: fixed;
                padding: 8px 15px;
                margin: 0 auto;
                bottom: 5px;
                background-color: rgba(255,255,255);
                left: 5%;
                box-sizing:border-box;
                text-align: center;
                transition: 1s;
                font-size: 12px;
                box-shadow: 0 0 3px rgba(33,33,33,0.3);
                z-index: 100;
            }
        
            .pudding_openpc_tip.hide{
                transform:translate3d(0,100%,0);
                opacity: 0;
                pointer-events: none;
            }
        
            .pudding_openpc_tip .pudding_tip_title{
                display:flex;
                margin-bottom: 5px;
                font-size:14px;
                align-items: center;
                justify-content : center;
            }
        
            .pudding_openpc_tip .pudding_tip_avatar{
                width:16px;
                height:16px;
            }
        
            .pudding_openpc_tip .pudding_tip_content{
                display: flex;
                justify-content: space-between;
            }
            
            @media (prefers-color-scheme: dark) {
                .pudding_openpc_tip{
                    background-color: #222;
                }
        
                .pudding_tip_content img{
                    filter: brightness(0) invert(1);
                }
            }
        `
    
    var styleSheet = document.createElement("style")
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
    
    const tip_wrap = document.createElement('DIV');
    tip_wrap.className = 'pudding_openpc_tip';
    
    const title = document.createElement('DIV');
    title.className= "pudding_tip_title";
    
    const avatar = document.createElement('IMG');
    avatar.className = 'pudding_tip_avatar';

    
    avatar.setAttribute('src','data:image/png;base64,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');
    
    
    
    const name = document.createElement('DIV');
    name.className = 'pudding_tip_name';
    name.textContent = ' 布丁扩展 ';
    
    const content = document.createElement('P');
    content.className = 'pudding_tip_content countText';
    content.textContent = `已优化该PC页面`
    
    const content2 = document.createElement('P');
    content2.className = 'pudding_tip_content step_1';
    content2.textContent = `1.点击文字图标`
    
    const content3 = document.createElement('P');
    content3.className = 'pudding_tip_content step_2';
    content3.textContent = `2.请求桌面网站`
    
    const icon1 = document.createElement('IMG');
    icon1.setAttribute('src',"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTdweCIgaGVpZ2h0PSIxMHB4IiB2aWV3Qm94PSIwIDAgMTcgMTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+5aSn5bCPPC90aXRsZT4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZvbnQtZmFtaWx5PSJQaW5nRmFuZ1NDLVJlZ3VsYXIsIFBpbmdGYW5nIFNDIiBmb250LXNpemU9IjEwIiBmb250LXdlaWdodD0ibm9ybWFsIj4KICAgICAgICA8dGV4dCBpZD0i5aSn5bCPIiBmaWxsPSIjMDAwMDAwIj4KICAgICAgICAgICAgPHRzcGFuIHg9IjAiIHk9IjkiPuWkpzwvdHNwYW4+CiAgICAgICAgICAgIDx0c3BhbiB4PSIxMCIgeT0iOSIgZm9udC1zaXplPSI3Ij7lsI88L3RzcGFuPgogICAgICAgIDwvdGV4dD4KICAgIDwvZz4KPC9zdmc+");
    
    
    content2.appendChild(icon1);
    
    const icon2 = document.createElement('IMG');
    icon2.setAttribute('src',"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMHB4IiB2aWV3Qm94PSIwIDAgMTIgMTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+VW50aXRsZWQgMjwvdGl0bGU+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNNy40ODA2MjEyMSw5LjUyOTQ2NDcyIEM3LjU4ODc1NTE3LDkuNTI5NDY0NzIgNy42ODE3MTkzNCw5LjQ5MTA2MzQ0IDcuNzU5NTEzNzMsOS40MTQyNjA4NiBDNy44MzczMDgxMiw5LjMzNzQ1ODI5IDcuODc2MjA1MzIsOS4yNDQxNTA4IDcuODc2MjA1MzIsOS4xMzQzMzgzOCBDNy44NzYyMDUzMiw5LjAyNDgzMTE0IDcuODM3MzA4MTIsOC45MzA4NjI0MyA3Ljc1OTUxMzczLDguODUyNDMyMjUgQzcuNjgxNzE5MzQsOC43NzQwMDIwOCA3LjU4ODc1NTE3LDguNzM0Nzg2OTkgNy40ODA2MjEyMSw4LjczNDc4Njk5IEw3LjQ1OCw4LjczNSBMNy40NTgsNy44NzMgTDEwLjQxODcwMSw3Ljg3MjgxNzk5IEMxMC43NjU3ODc2LDcuODcyODE3OTkgMTEuMDM3ODI2NCw3Ljc3NTA2MDAyIDExLjIzNDgxNzQsNy41Nzk1NDQwNyBDMTEuNDMxODA4Myw3LjM4NDAyODEyIDExLjUzMDMwMzgsNy4xMTI3MjY4NSAxMS41MzAzMDM4LDYuNzY1NjQwMjYgTDExLjUzMDMwMzgsMS4yMDk5OTE0NiBDMTEuNTMwMzAzOCwwLjg2Mjg1NDAwNCAxMS40MzE4MDgzLDAuNTkwNzI2MjE3IDExLjIzNDgxNzQsMC4zOTM2MDgwOTMgQzExLjAzNzgyNjQsMC4xOTY0ODk5NyAxMC43NjU3ODc2LDAuMDk3OTMwOTA4MiAxMC40MTg3MDEsMC4wOTc5MzA5MDgyIEwxLjUyNDU4MTc5LDAuMDk3OTMwOTA4MiBDMS4xNzc0NDQzMywwLjA5NzkzMDkwODIgMC45MDUzMTY1NDcsMC4xOTY0ODk5NyAwLjcwODE5ODQyMywwLjM5MzYwODA5MyBDMC41MTEwODAzLDAuNTkwNzI2MjE3IDAuNDEyNTIxMjM4LDAuODYyODU0MDA0IDAuNDEyNTIxMjM4LDEuMjA5OTkxNDYgTDAuNDEyNTIxMjM4LDYuNzY1NjQwMjYgQzAuNDEyNTIxMjM4LDcuMTEyNzI2ODUgMC41MTEwODAzLDcuMzg0MDI4MTIgMC43MDgxOTg0MjMsNy41Nzk1NDQwNyBDMC45MDUzMTY1NDcsNy43NzUwNjAwMiAxLjE3NzQ0NDMzLDcuODcyODE3OTkgMS41MjQ1ODE3OSw3Ljg3MjgxNzk5IEw0LjQ4OCw3Ljg3MyBMNC40ODgsOC43MzUgTDQuNDYyMjAzODYsOC43MzQ3ODY5OSBDNC4zNTQzNzUwOCw4LjczNDc4Njk5IDQuMjYxNDg3Miw4Ljc3NDAwMjA4IDQuMTgzNTQwMjIsOC44NTI0MzIyNSBDNC4xMDU1OTMyNCw4LjkzMDg2MjQzIDQuMDY2NjE5NzUsOS4wMjQ4MzExNCA0LjA2NjYxOTc1LDkuMTM0MzM4MzggQzQuMDY2NjE5NzUsOS4yNDQxNTA4IDQuMTA1NTkzMjQsOS4zMzc0NTgyOSA0LjE4MzU0MDIyLDkuNDE0MjYwODYgQzQuMjYxNDg3Miw5LjQ5MTA2MzQ0IDQuMzU0Mzc1MDgsOS41Mjk0NjQ3MiA0LjQ2MjIwMzg2LDkuNTI5NDY0NzIgTDcuNDgwNjIxMjEsOS41Mjk0NjQ3MiBaIE0xMC41MTQzNzM3LDUuNzg3MzIzIEwxLjQyODQ1MTQxLDUuNzg3MzIzIEMxLjI5OTgxOTgyLDUuNzg3MzIzIDEuMjM1NTA0MDMsNS43MjEzNzk2IDEuMjM1NTA0MDMsNS41ODk0OTI4IEwxLjIzNTUwNDAzLDEuMjQ2MzA3MzcgQzEuMjM1NTA0MDMsMS4xNDQwMjI2MiAxLjI2NDE2NTEyLDEuMDY0MjA2NDQgMS4zMjE0ODczLDEuMDA2ODU4ODMgQzEuMzc4ODA5NDksMC45NDk1MTEyMSAxLjQ1ODQ2MDM3LDAuOTIwODM3NDAyIDEuNTYwNDM5OTQsMC45MjA4Mzc0MDIgTDEwLjM4MjMwODgsMC45MjA4Mzc0MDIgQzEwLjQ4NDI4ODQsMC45MjA4Mzc0MDIgMTAuNTY0Njg5NSwwLjk0OTUxMTIxIDEwLjYyMzUxMjEsMS4wMDY4NTg4MyBDMTAuNjgyMzM0OCwxLjA2NDIwNjQ0IDEwLjcxMTc0NjEsMS4xNDQwMjI2MiAxMC43MTE3NDYxLDEuMjQ2MzA3MzcgTDEwLjcxMTc0NjEsNS41ODk0OTI4IEMxMC43MTE3NDYxLDUuNzIxMzc5NiAxMC42NDU5NTUzLDUuNzg3MzIzIDEwLjUxNDM3MzcsNS43ODczMjMgWiIgaWQ9IvSAmZciIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=");
    
    content3.appendChild(icon2);

    
    title.appendChild(avatar)
    title.appendChild(name)
    
    tip_wrap.appendChild(title)
    tip_wrap.appendChild(content)
    tip_wrap.appendChild(content2)
    tip_wrap.appendChild(content3)

    
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

showTurnPCButton()

document.addEventListener('scroll', _ => {
    // 只要用户滚动就隐藏这个。。
    const pudding_tip = document.querySelector('.pudding_openpc_tip');
    if(pudding_tip){
        pudding_tip.classList.add('hide');
    }
    
})
