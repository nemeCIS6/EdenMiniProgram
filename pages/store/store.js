// A 'test' method is declared in this page.
// As web-view in page.axml has set 'test' for the call of 'onMessage',
// after my.postMessage is executed in the web-view, test will be called.
Page({
  data:{
    otp: null,
    authentication: null,
    currentUrl: `https://dev.customer.themallph.com/xload-test-store`
  },
  onLoad(e) {
    console.log('page loaded');
    const global_data = getApp().globalData;
    this.setData({
      currentUrl: `${this.data.currentUrl}/${global_data.authentication.otp}/${global_data.authentication.authentication}/gcash`
    })
    console.log({currentUrl:this.data.currentUrl});
    this.webViewContext = my.createWebViewContext('web-view-1');

   // my.postMessage({ 'sendToMiniProgram': '0' });

    /*my.onMessage = function (e) {
      console.log(e);
      this.setData({
        currentUrl: e.name
      })
    }*/
  },
  listenToURLChange(fromWebview) {
    console.log({fromWebview});
    this.setData({
        currentUrl: fromWebview.detail
      })
  }
});