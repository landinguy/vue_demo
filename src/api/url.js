var url = {
  base: "",
  //登录
  login: "/login",
  //首页
  homeTotal: "/index/total/",
  homeTrend: "/index/trend/",
  //账户
  getAdmininfo: "/account/get/",
  updateAdminNickname: "/account/info/base/update",
  updateAdminPassword: "/account/pwd/update",
  updateAdminProperty: "/account/info/property/update",
  //子账户
  subAccountList: "/subaccount/list",
  disableOrDeleteSubAccount: "/subaccount/status/modify",
  addSubAccount: "/subaccount/info/insert",
  modifySubAccount: "/subaccount/info/update",

  //发送统计
  statisticsCount: "/stats/count",
  statisticsList: "/stats/list",
  statisticsDetailCount: "/stats/detail/count",
  statisticsDetailList: "/stats/detail/list",

  //模板管理
  createTmpl: "/tmpl/create",
  getTmpls: "/tmpls",
  getTmplsCount: "/tmpls/count",
  getTmpl: "/tmpl/",
  delTmpl: "/tmpl/",
  uploadMat: "/mat/upload",

  //签名管理
  createSign: "/sign/create",
  delSign: "/sign/",
  getSigns: "/signs",
  getSignsCount: "/signs/count",

  //通道管理
  getChans: "/chan/items",
  delChan: "/chan/item/",
  haltChan: "/chan/item/halt/",
  enableChan: "/chan/item/enable/",
  bind: "/chan/item/bind",
  getChansCount: "/chan/items/count",
  getSuppliers: "/suppliers",
  getSupp1iersCount: "/suppliers/count",

}

export default url;
