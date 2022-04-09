const rootHtml = document.documentElement;
const config = { attributes: true, childList: true, subtree: true };

const callback = function(mutationsList, observer) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        rootHtml.setAttribute('data-theme','dark');
    }
};

const observer = new MutationObserver(callback);
observer.observe(document.body, config);
