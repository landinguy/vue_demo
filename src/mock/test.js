const Mock = require("mockjs");
const res1 = [
  {
    "id": "1",
    "channelNo": "1065541810733",
    "supplierName": "小沃",
    "unicomSupport": true,
    "mobileSupport": true,
    "telcomSupport": false,
    "accountId": "xxf1",
    "remainder": 500000,
    "freeFlow": "全部",
    "costPrice1": "0.15",
    "costPrice2": "0.20",
    "desc": "服务类，数字营销使用",
    "status": "正常"
  },
  {
    "id": "2",
    "channelNo": "1065541810734",
    "supplierName": "小沃",
    "unicomSupport": true,
    "mobileSupport": true,
    "telcomSupport": true,
    "accountId": "xxf2",
    "remainder": 400000,
    "freeFlow": "免流",
    "costPrice1": "0.15",
    "costPrice2": "",
    "desc": "服务类，数字营销使用",
    "status": "停用"
  }
];
const res2 = {
  "name": "测试数据",
  "contentType": "服务类",
  "subject": "测试数据",
  "content": [],
  "sign": "【招商银行】",
  "signPlace": "头部签名",
  "flowType": false,
  "id": "",
  "accountId": ""
};
const signRS = [
  {
    signId: "111",
    sign: "【小沃科技】"
  }, {
    signId: "222",
    sign: "【招商银行】"
  }, {
    signId: "333",
    sign: "【农业银行】"
  }, {
    signId: "444",
    sign: "【中国移动】"
  }, {
    signId: "555",
    sign: "【中国联通】"
  }
];
Mock.mock("/test", "post", {name: "xxf"});
Mock.mock("/login", "post", {code: 0});
Mock.mock("/tmpl", "delete", {msg: 'delete success', code: 0});
Mock.mock("/chan/items", "post", {msg: '', code: 0, res: res1});
Mock.mock("/tmpl/1", "get", {msg: '', code: 0, res: res2});
Mock.mock("/sign/get/11", "post", {msg: '', code: 0, res: signRS});
Mock.mock("/tmpl/create", "post", {msg: '', code: 0});

