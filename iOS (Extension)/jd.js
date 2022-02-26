//jd 一打开就会弹窗，测试是否可以屏蔽一打开就要下载app的confirm
window.confirm = () => false;
