const ST_NAME = 'pudding_show_desktop_tip'

//给body添加一个class

document.querySelector('body').classList.add('pd__ex')

// add meta.
var meta = document.createElement('meta');
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1, user-scalable=no";
document.getElementsByTagName('head')[0].appendChild(meta);

setTimeout( _ => {
    window.scrollTo(0, 0);
},500)



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
            width:90%;
            margin: 0 auto;
            position: fixed;
            bottom: 3px;
            background: rgba(255,255,255);
            border-radius: 5px;
            left: 5%;
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
    title.textContent = '布丁扩展：已优化PC版在手机上的显示';
    title.className = "title";
    
    const content1 = document.createElement('P');
    content1.textContent = '1.点击浏览器下方图标"大小"';
    content1.className = "content";
    
    const content2 = document.createElement('P');
    content2.textContent = '2.点击请求桌面网站';
    content2.className = "content";
    
    const content3 = document.createElement('P');
    content3.textContent = '3.可能也需要点击豆瓣右上角电脑图标';
    content3.className = "content";
    
    const a = document.createElement('A');
    a.href = 'https://movie.douban.com';
    a.textContent = '4.点击这里访问桌面版';
    
    //    const button = document.createElement('BUTTON');
    //    button.textContent = '不再提示'
    //
    //    button.addEventListener('click', _ => {
    //        wrap.classList.add('displaynone');
    //        localStorage.setItem(ST_NAME,"false");
    //    })
    
    
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
