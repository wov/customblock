const ST_NAME = 'pudding_show_desktop_tip'

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
    
    const wrap = document.createElement('DIV');
    wrap.className = 'pudding_request_desktop_wrap';
    
    const title = document.createElement('DIV');
    title.textContent = '布丁扩展：已优化PC版在手机上的显示';
    title.className = "title";
    
    const content1 = document.createElement('P');
    content1.textContent = '1.点击浏览器文字图标';
    content1.className = "content";
    
    const content2 = document.createElement('P');
    content2.textContent = '2.点击请求桌面网站';
    content2.className = "content";
    
    const a = document.createElement('A');
    a.href = 'https://movie.douban.com';
    a.textContent = '3.点击这里访问桌面版';
    
    const button = document.createElement('BUTTON');
    button.textContent = '不再提示'
    
    button.addEventListener('click', _ => {
        wrap.classList.add('displaynone');
        localStorage.setItem(ST_NAME,"false");
    })
    
    
    wrap.appendChild(title);
    wrap.appendChild(content1);
    wrap.appendChild(content2);
    wrap.appendChild(a);
    wrap.appendChild(button);
    
    document.body.appendChild(wrap);
}


const is_mobile_site = (window.location.host.indexOf('m.douban.com') !== -1);
const is_close_tip = (localStorage.getItem(ST_NAME) && localStorage.getItem(ST_NAME) === "false");

if(is_mobile_site && !is_close_tip){
    addRequestDesktopTip();
}
