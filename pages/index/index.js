// A 'test' method is declared in this page.
// As web-view in page.axml has set 'test' for the call of 'onMessage',
// after my.postMessage is executed in the web-view, test will be called.
Page({
  data: {
    text: 'Please wait... Logging you in...'
  },
  onLoad(e) {
    my.showLoading({
      content: this.data.text
    });
    const that = this;
    const global_data = getApp().globalData;
    const setErrorMesaage = ()=> {
        this.setData({
          text: "Authentication error. Please re-open store in GLife Menu."
        })
    }
    console.log({ globalData: global_data })
    my.getAuthCode({
      scopes: 'auth_user',
      success: (res) => {
        console.log(`inside success`);
        my.request({
          url: `${global_data.shopconnectAPI()}${global_data.endpoints.authenticate(global_data.merchantId)}`,
          method: 'POST',
          data: {
            "referenceClientId": global_data.clientId,
            "grantType": "AUTHORIZATION_CODE",
            "authCode": res.authCode,
            "extendInfo": "{\"customerBelongsTo\":\"GCASH\"}"
          },
          dataType: 'json',
          success: function (res) {
            console.log({ resDataSuccess:res.data });
            if (res.error) throw {};
            global_data.authentication = res.data;
            my.hideLoading();
            my.navigateTo({
              url: '/pages/store/store'
            });
          },
          fail: function (res) {
            console.log({ resDataFail:res.data });
            my.hideLoading();
            setErrorMesaage();
          },
          complete: function (res) {
            my.hideLoading();
          }
        });
        console.log({ url: `${global_data.shopconnectAPI()}${global_data.endpoints.authenticate(global_data.merchantId)}` });
        console.log(`exit success`);
        my.hideLoading({
          page: that,  // Prevents switching to other pages when execution, page pointing is not accurate
        });
        console.log({ resMyGetAuth: res })
      },
      fail: (e) => {
        console.log({ this: this });
        this.setData({
          text: "Authentication error. Please re-open store in GLife Menu."
        })
        my.hideLoading({
          page: that,  // Prevents switching to other pages when execution, page pointing is not accurate
        })
      }
    });
  }
});