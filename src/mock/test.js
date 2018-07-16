const Mock = require("mockjs");
const res1 = [
  {
    "channelId": "1",
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
    "channelId": "2",
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
const res3 = [
  {
    "id": "1",
    "name": "模板1",
    "subject": "主题1",
    "createTs": "2018-7-10 16:00:00",
    "status": "审核中",
  }, {
    "id": "2",
    "name": "模板2",
    "subject": "主题2",
    "createTs": "2018-7-10 16:00:00",
    "status": "审核中",
  },
  {
    "id": "3",
    "name": "模板3",
    "subject": "主题3",
    "createTs": "2018-7-10 16:00:00",
    "status": "审核中",
  },
];
const res4 = [
  {
    createTs: "2018-07-12 18:00:00",
    "id": "1",
    "content": "【小沃科技】",
    "cp": "xxxx",
    "accountId": "xxxx",
    "source": "运营添加",
    "status": "审核中",
    "updater": "xxx",
    "updateTs": "2018-07-12 18:00:00"
  }, {
    createTs: "2018-07-12 18:00:00",
    "id": "2",
    "content": "【中国移动】",
    "cp": "xxxx",
    "accountId": "xxxx",
    "source": "运营添加",
    "status": "审核中",
    "updater": "xxx",
    "updateTs": "2018-07-12 18:00:00"
  }, {
    createTs: "2018-07-12 18:00:00",
    "id": "3",
    "content": "【中国联通】",
    "cp": "xxxx",
    "accountId": "xxxx",
    "source": "运营添加",
    "status": "审核中",
    "updater": "xxx",
    "updateTs": "2018-07-12 18:00:00"
  }
];
Mock.mock("/test", "post", {name: "xxf"});
Mock.mock("/login", "post", {code: 0});
Mock.mock("/tmpl/1", "delete", {msg: '', code: 0});
Mock.mock("/chan/items", "post", {msg: '', code: 0, res: res1});
Mock.mock("/chan/item/1", "post", {msg: '', code: 0});
Mock.mock("/chan/item/halt/1", "post", {msg: '', code: 0});
Mock.mock("/chan/items/count", "post", {msg: '', code: 0, res: 60});

Mock.mock("/tmpl/1", "get", {msg: '', code: 0, res: res2});
Mock.mock("/sign/get/11", "post", {msg: '', code: 0, res: signRS});
Mock.mock("/tmpl/create", "post", {msg: '', code: 0});
Mock.mock("/tmpls", "post", {msg: '', code: 0, res: res3});
Mock.mock("/tmpls/count", "post", {msg: '', code: 0, data: 50});
Mock.mock("/sign/create", "post", {msg: '', code: 0});
Mock.mock("/sign/1", "delete", {msg: '', code: 0});
Mock.mock("/signs/count", "post", {msg: '', code: 0, count: 30});
Mock.mock("/signs", "post", {msg: '', code: 0, res: res4});

