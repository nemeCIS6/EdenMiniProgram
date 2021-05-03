App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
  globalData: {
    merchantId: '5716170548183040',
    clientId: '2021020917121300012392',
    GCashSession:{
      accessToken: null,
      gcashCustomerId: null,
    },
    authentication:{
      otp: null,
      authentication: null
    },
    customer:{
      gcashUserId:null
    },
    shopconnectAPI:(env='dev')=>{
      if(env === 'prod') return `https://backend.themallph.com`;
      return `https://dev.backend.themallph.com`
    },
    endpoints:{
      authenticate: (merchantId)=> `/gcash/authenticate/${merchantId}`,
      verify: `/gcash/verify`,
      checkSession: `/gcash/session`
    }
  }
});
