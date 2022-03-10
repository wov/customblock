//尝试在bilibili中打开picture in picture
//const video = document.querySelector('video')
//document.location.href = video.src

//todo: 判断一下路径。。

document.addEventListener('click', event => {
    let target = event.target;
//    console.log(target.tagName)
    if(target.href){
        window.location.href = target.href;
    }
})





if(window.location.href.indexOf('video') !== -1){
    if( !document.querySelector('.__puddingPlayInOriginDiv') ){
        const playInOrignButton = document.createElement('div');
        playInOrignButton.className = '__puddingPlayInOriginDiv';
        playInOrignButton.innerText = '布丁扩展：在原生播放器中播放';

        playInOrignButton.addEventListener('click', _ => {
            const video = document.querySelector('video')
            document.location.href = video.src
        });

        document.body.appendChild(playInOrignButton)
    }
}











