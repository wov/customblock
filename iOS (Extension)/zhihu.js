const rootHtml = document.documentElement;
const config = { attributes: true, childList: true, subtree: true };

const callback = function(mutationsList, observer) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        rootHtml.setAttribute('data-theme','dark');
    }
};

const observer = new MutationObserver(callback);
observer.observe(document.body, config);

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
