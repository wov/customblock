// 给页面添加class
document.querySelector('body').classList.add('pd__ex');

// 全部评论从跳转app到跳转链接
setTimeout(_ =>{
    const dom_all_comment = document.querySelector('[data-boss="all&modular=comment"]');
    const dom_next_data = document.getElementById('__NEXT_DATA__');
    if(dom_all_comment && dom_next_data){
        let data = JSON.parse(dom_next_data.textContent);
        try{
            const a_id = data.props.pageProps.data.data.cid;
            if(a_id){
                let new_dom_all_comment = dom_all_comment.cloneNode(true);
                let new_dom_all_comment_link = new_dom_all_comment.querySelector('a');
                new_dom_all_comment_link.textContent = `布丁优化：${new_dom_all_comment_link.textContent.replace('布丁优化：','')}`
                if(new_dom_all_comment_link){
                    new_dom_all_comment_link.href = `/c/coral/${a_id}`;
                }
                dom_all_comment.parentNode.appendChild(new_dom_all_comment);
                dom_all_comment.remove();
            }
        }catch(e){
    
        }
    }
} , 1000);

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
