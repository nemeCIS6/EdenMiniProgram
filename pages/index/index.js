// A 'test' method is declared in this page.
// As web-view in page.axml has set 'test' for the call of 'onMessage',
// after my.postMessage is executed in the web-view, test will be called.
Page({
  onLoad(e){
    console.log('page loaded');

    this.webViewContext = my.createWebViewContext('web-view-1');    

    my.postMessage({'sendToMiniProgram': '0'});

    my.onMessage = function(e) {
      console.log(e); //{'sendToWebView': '1'}
    }

    // my.getAuthCode({
    //   scopes: 'auth_user',
    //   success: (res) => {
    //     my.alert({
    //       content: res.authCode,
    //     });
    //   },
    // });
  },
  test(e){
    console.log('test event');
    my.alert({
      content:JSON.stringify(e.detail),
    });  
    this.webViewContext.postMessage({'sendToWebView': '1'});
  },
  onGetAuthorize(res) {
    my.getOpenUserInfo({
        fail: (res) => {
          console.log('err: ', res);
        },
        success: (res) => {
            let userInfo = JSON.parse(res.response).response;
            console.log('success: ', userInfo);
        }
    });
  }
});