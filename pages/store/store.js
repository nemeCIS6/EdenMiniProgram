Page({
  data: {
    otp: null,
    authentication: null,
    currentUrl: `https://dev.customer.themallph.com/xload-test-store`
  },
  onLoad(e) {
    console.log('page loaded');
    const global_data = getApp().globalData;
    this.setData({
      currentUrl: `${this.data.currentUrl}/${global_data.authentication.otp}/${global_data.authentication.authentication}/hideTopNav`
    })
    console.log({ currentUrl: this.data.currentUrl });
    this.webViewContext = my.createWebViewContext('web-view-1');

  },
  listenToURLChange(fromWebview) {
    const global_data = getApp().globalData;
    console.log({ fromWebview });
    if (fromWebview.detail.name.includes('/checkout/gcash/')) {
      const orderId = fromWebview.detail.name.replace(`/${global_data.slug}/checkout/gcash/`, '');
      console.log({ orderId });
      this.paymentInitiate(orderId);
    }
    this.setData({
      currentUrl: fromWebview.detail
    })
  },
  paymentInitiate(orderId) {
    const global_data = getApp().globalData;
    console.log({
      currUrl: `${global_data.shopconnectAPI()}${global_data.endpoints.checkout(orderId)}`
      , headers: {
        otp: global_data.authentication.otp,
        authentication: global_data.authentication.authentication
      }
    });

    my.showLoading({
      content: 'Payment page loading'
    });

    my.request({
      url: `${global_data.shopconnectAPI()}${global_data.endpoints.checkout(orderId)}`,
      method: 'POST',
      data: {},
      headers: {
        otp: global_data.authentication.otp,
        authentication: global_data.authentication.authentication
      },
      dataType: 'json',
      success: function (res) {
        console.log({ successCheckout: res })
        my.tradePay({
          paymentUrl: res.data.actionForm.redirectionUrl,
          success: (res) => {
            if (res.resultCode === "9000") {
              my.alert({
                content: `Payment with GCash Success`,
              });
              global_data.currentOrderId = orderId;
              my.navigateTo({
                url: '/pages/thankyou/thankyou'
              });
            }
          },
          fail: (res) => {
            my.alert({ content: 'Payment failed' });
          }
        });
        my.hideLoading();
      },
      fail: function (res) {
        console.log({ failCheckout: res })
        my.hideLoading();
        my.alert({ content: 'Payment failed' });
      },
      complete: function (res) {
        //my.alert({ content: 'complete' });
      }
    });
  }
});