// add a class for reset the styles easly.
document.querySelector('body').classList.add('pd__ex');
//https://developer.mozilla.org/en-US/docs/Web/API/Picture-in-Picture_API
// 给视频添加inline的播放
function initVideo(){
//    console.log('init video...')
    const video_button = document.querySelector('.ahmp-player-startbtn');
    if(video_button){
        video_button.click();
    }
    
    let video = document.querySelector('video');
    if(video){
        video.setAttribute('playsinline',"true");
        video.setAttribute('controls',"true");
        video.volume = 1;
        video.addEventListener('play', (event) => {
            video.muted= false;
        });
        video.addEventListener("leavepictureinpicture",e => {
            video.setAttribute('controls',"true");
        }, false);

    }
}

initVideo();
setTimeout( _ => {
    initVideo();
}, 2000 )

//Object.freeze(location)
