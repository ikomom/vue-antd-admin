if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

// 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia
// 因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它。
if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function(constraints) {

    // 首先，如果有getUserMedia的话，就获得它
    var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia  ||
      navigator.msGetUserMedia;

    // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }

    // 否则，为老的navigator.getUserMedia方法包裹一个Promise
    return new Promise(function(resolve, reject) {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}

