//console.log("Hello World!", browser);

var tab = browser.tabs.captureVisibleTab
var dom_url = document.querySelector('#url')

browser.runtime.sendMessage({type: "change styles"});

browser.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    dom_url.appendChild(document.createTextNode(url) )
});


browser.storage.local.get((item) => {
    if (Object.keys(item).length !== 0){
        document.getElementById('rules').value = item.styles
    }
});


function saveRuleToStorage(){
    let rules = document.getElementById("rules").value;
    console.log(rules)
    
    browser.storage.local.set({styles: rules}, function() {
      console.log('rule is set to ' + rules);
    });
    
    window.close()
}
