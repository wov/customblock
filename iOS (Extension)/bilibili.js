//尝试在bilibili中打开picture in picture
//const video = document.querySelector('video')
//document.location.href = video.src

if( !document.querySelector('.__puddingPlayInOriginDiv') ){
    const playInOrignButton = document.createElement('div');
    playInOrignButton.className = '__puddingPlayInOriginDiv';
    playInOrignButton.innerText = '布丁扩展：在原生播放器中播放';

    playInOrignButton.addEventListener('click', _ => {
        const video = document.querySelector('video')
        document.location.href = video.src
    });

    const playerDom = document.querySelector('.m-video-player');

    playerDom.appendChild(playInOrignButton)
}






