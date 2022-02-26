//jd 一打开就会弹窗，测试是否可以屏蔽一打开就要下载app的confirm
console.log('start load global js...')

//window.location.href = 'openApp.jdMobile://virtual?params=%7B%22category%22%3A%22jump%22%2C%22des%22%3A%22productDetail%22%2C%22skuId%22%3A%222560386%22%2C%22sourceType%22%3A%22Item%22%2C%22sourceValue%22%3A%22view-ware%22%2C%22M_sourceFrom%22%3A%22sx%22%2C%22msf_type%22%3A%22auto%22%2C%22m_param%22%3A%7B%22m_source%22%3A%220%22%2C%22event_series%22%3A%7B%7D%2C%22jda%22%3A%22122270672.16458545764081059108667.1645854576.1645883387.1645885464.11%22%2C%22usc%22%3A%22direct%22%2C%22ucp%22%3A%22-%22%2C%22umd%22%3A%22none%22%2C%22utr%22%3A%22-%22%2C%22jdv%22%3A%22122270672%7Cdirect%7C-%7Cnone%7C-%7C1645854576408%22%2C%22ref%22%3A%22https%3A%2F%2Fitem.m.jd.com%2Fproduct%2F2560386.html%3F_fd%3Djdm%26cover%3Djfs%2Ft1%2F93519%2F5%2F22881%2F24036%2F62189cd2E7d790897%2F8979adc421d0cfaa.jpg%26ptag%3D138561.2.1%22%2C%22psn%22%3A%2216458545764081059108667%7C11%22%2C%22psq%22%3A18%2C%22unpl%22%3A%22%22%2C%22pc_source%22%3A%22%22%2C%22mba_muid%22%3A%2216458545764081059108667%22%2C%22mba_sid%22%3A%2216458833877357069002233639681%22%2C%22std%22%3A%22MO-J2011-1%22%2C%22par%22%3A%22_fd%3Djdm%26cover%3Djfs%2Ft1%2F93519%2F5%2F22881%2F24036%2F62189cd2E7d790897%2F8979adc421d0cfaa.jpg%26ptag%3D138561.2.1%22%2C%22event_id%22%3A%22MDownLoadFloat_AppArouseA1%22%2C%22mt_xid%22%3A%22V2_52007VwMVV1lRVl8bTx5ZBG4DE1ZVWFNTGE4fbAVvUxRQXwwHRhxJSlkZYlEUAkFRAVIbVUwMATdUFwcIWQAPT3kaXQZkHxNRQVtVSx9NEl8HbAcRYl9oUmodSxpVDWcEFlpcaFJTG04%3D%22%2C%22mt_subsite%22%3A%22%22%2C%22YINLIUhuanqi%22%3A%22https%3A%2F%2Fitem.m.jd.com%2Fproduct%2F2560386.html%3F_fd%3Djdm%26cover%3Djfs%2Ft1%2F93519%2F5%2F22881%2F24036%2F62189cd2E7d790897%2F8979adc421d0cfaa.jpg%26ptag%3D138561.2.1%22%7D%2C%22SE%22%3A%7B%22mt_subsite%22%3A%22%22%2C%22__jdv%22%3A%22122270672%7Cdirect%7C-%7Cnone%7C-%7C1645854576408%22%2C%22unpl%22%3A%22%22%2C%22__jda%22%3A%22122270672.16458545764081059108667.1645854576.1645883387.1645885464.11%22%7D%7D'


//window.addEventListener("beforeunload", function (event) {
//    console.log('before unload....')
//});
//

//var scripts = document.getElementsByTagName("script");
//for (var i = 0; i < scripts.length; i++) {
//  if (scripts[i].src) {
//      if(scripts[i].src.indexOf('downloadAppPlugin.min.js')!== -1){
//          console.log(i, scripts[i].src);
//          scripts[i].remove()
//      }
//  } else {
////    console.log(i, scripts[i].innerHTML);
//  }
//}

//var $ = window.$;

if (window.$ && typeof window.$.downloadAppPlugInOpenApp === 'function') {
    
    console.log(window.$)
    
    window.$.downloadAppPlugInOpenApp() = function(){}
}

document.addEventListener('click', function (event) {
    console.log('clicked?')
    let _target = event.target;
    if(_target.tagName === 'A' && _target.href.indexOf('openapp.jdmobile')!==-1){
      event.preventDefault();
      return false;
    }
}, false);

window.open = function (url, windowName, windowFeatures) {
    console.log(url);
}

