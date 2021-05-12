// A 'test' method is declared in this page.
// As web-view in page.axml has set 'test' for the call of 'onMessage',
// after my.postMessage is executed in the web-view, test will be called.
Page({
  data: {
    currentUrl: `https://dev.customer.themallph.com/xload-test-store`
  },
  onLoad(e) {
    console.log('page loaded');
    const global_data = getApp().globalData;
    this.setData({
      currentUrl: `${this.data.currentUrl}/thankyou/gcash/${global_data.currentOrderId}`
    })
    console.log({ currentUrl: this.data.currentUrl });
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
    const global_data = getApp().globalData;
    console.log({ fromWebview });
    if (fromWebview.detail.name.includes('/thankyou/gcash/redirect')) {
      global_data.currentOrderId = null;
      my.navigateTo({
        url: '/pages/store/store'
      });
    }
  }
});