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


// jump to login site ...
if(window.location.href.indexOf('login.wsgjp.com.cn/Login.aspx') !== -1){
    if(document.querySelector('#frame_content')){
        const url = document.querySelector('#frame_content').src;
        window.location.href = url;
    }
}

// 登录页面添加暂存到本地功能
if(window.location.href.indexOf('passport.wsgjp.com.cn/erp/login') !== -1){
//    let isStore
    setTimeout(function() {
        const company = localStorage.getItem("pudding_store_company");
        const username = localStorage.getItem("pudding_store_username");
        const password = localStorage.getItem("pudding_store_password");
        
        if(company && document.querySelector("#company")){
            document.querySelector("#company").value = company;
        }
        
        if(username && document.querySelector("#username")){
            document.querySelector("#username").value = username;
        }
        
        if(password && document.querySelector("#password")){
            document.querySelector("#password").value = password;
        }
        
        if(company && username && password && document.querySelector("#btnlogin") ){
            document.querySelector("#btnlogin").click();
        }
    }, 1000);

}else{
    document.addEventLinster('click',e => {
        const target = e.target;
        if(target.classList.contains('DropItem')){
            target.classList.add('selected');
        }
    })
}
