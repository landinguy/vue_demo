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
const res5 = [{
  "id": "",
  "name": "小沃",
  "cpid": "cpid",
  "billingType": "PRE",
  "remainder": 1000000,
  "accountSecret": "wqdqfqwedfqfqwfq",
  "token": "token",
  "apiId": "apiId",
  "apiSecret": "apiSecret",
  "chans": [
    {
      "id": "",
      "channelNo": "1065541810733",
      "supplierId": "",
      "supplierName": "小沃1",
      "channelType": "LONG",
      "unicomSupport": true,
      "mobileSupport": false,
      "telcomSupport": false,
      "remainder": 1000000,
      "maxRate": 200,
      "freeFlowSupport": "YES",
      "costPrice1": "0.15",
      "costPrice2": "",
      "bizType": "SERVICE",
      "shareable": false
    },
    {
      "id": "",
      "channelNo": "1065541810734",
      "supplierId": "",
      "supplierName": "小沃2",
      "channelType": "SHORT",
      "unicomSupport": true,
      "mobileSupport": true,
      "telcomSupport": true,
      "remainder": 2000000,
      "maxRate": 200,
      "freeFlowSupport": "NO",
      "costPrice1": "",
      "costPrice2": "0.25",
      "bizType": "AD",
      "shareable": true
    },
    {
      "id": "",
      "channelNo": "1065541810735",
      "supplierId": "",
      "supplierName": "小沃3",
      "channelType": "SHORT",
      "unicomSupport": true,
      "mobileSupport": true,
      "telcomSupport": true,
      "remainder": 1500000,
      "maxRate": 100,
      "freeFlowSupport": "ALL",
      "costPrice1": "0.15",
      "costPrice2": "0.25",
      "bizType": "AD",
      "shareable": true
    }
  ]
},
  {
    "id": "",
    "name": "三体",
    "cpid": "cpid1",
    "billingType": "PRE1",
    "remainder": 2000000,
    "accountSecret": "qqqqqqqqqqqqqqqqqq",
    "token": "token1",
    "apiId": "apiId1",
    "apiSecret": "apiSecret1",
    "chans": [
      {
        "id": "",
        "channelNo": "1065541810743",
        "supplierId": "",
        "supplierName": "小沃1",
        "channelType": "SHORT",
        "unicomSupport": false,
        "mobileSupport": true,
        "telcomSupport": true,
        "remainder": 3000000,
        "maxRate": 300,
        "freeFlowSupport": "YES",
        "costPrice1": "0.15",
        "costPrice2": "",
        "bizType": "SERVICE",
        "shareable": true
      }
    ]
  }
];
Mock.mock("/test", "post", {name: "xxf"});
Mock.mock("/login", "post", {code: 0});
Mock.mock("/tmpl/1", "delete", {msg: '', code: 0});
Mock.mock("/chan/items", "post", {msg: '', code: 0, res: res1});
Mock.mock("/chan/item/1", "post", {msg: '', code: 0});
Mock.mock("/chan/item/halt/1", "post", {msg: '', code: 0});
Mock.mock("/chan/item/bind", "post", {msg: '', code: 0});
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
Mock.mock("/suppliers/count", "post", function () {
  return 30
});
Mock.mock("/suppliers", "post", function (req, res) {
  res = res5;
  return res;
});

Mock.mock("/mat/upload", "post", function (req, res) {
  console.log("req:" + JSON.stringify(req));
  res = {
    // msg: '', code: 0, res: 'http://192.168.2.57/images/111.jpg'
    msg: '',
    code: 0,
    res: '',
    data: {
      id: "",
      type: "",
      resource: "http://localhost/video/v3.mp4"
    }
  };
  return res;
});

const sendRecord = [
  {
    "task_id": "a",
    "name": "发送1波数据",
    "template_name": "模块名称1",
    "receiver_amount": 1000,
    "start_ts": 1531389519000,
    "status": "审核中",
    "id": ""
  },
  {
    "task_id": "b",
    "name": "发送2波数据",
    "template_name": "模块名称2",
    "receiver_amount": 1500,
    "start_ts": 1531389519000,
    "status": "审核失败",
    "id": ""
  },
  {
    "task_id": "c",
    "name": "发送3波数据",
    "template_name": "模块名称3",
    "receiver_amount": 2000,
    "start_ts": 1531389519000,
    "status": "已失效",
    "id": ""
  },
  {
    "task_id": "d",
    "name": "发送4波数据",
    "template_name": "模块名称4",
    "receiver_amount": 2500,
    "start_ts": 1531389519000,
    "status": "等待开始",
    "id": ""
  },
  {
    "task_id": "e",
    "name": "发送5波数据",
    "template_name": "模块名称5",
    "receiver_amount": 3000,
    "start_ts": 1531389519000,
    "status": "正在发送",
    "id": ""
  },
  {
    "task_id": "f",
    "name": "发送6波数据",
    "template_name": "模块名称6",
    "receiver_amount": 3500,
    "start_ts": 1531389519000,
    "status": "暂停中",
    "id": ""
  },
  {
    "task_id": "g",
    "name": "发送7波数据",
    "template_name": "模块名称7",
    "receiver_amount": 4000,
    "start_ts": 1531389519000,
    "status": "发送完成",
    "id": ""
  },
  {
    "task_id": "h",
    "name": "发送8波数据",
    "template_name": "模块名称8",
    "receiver_amount": 4500,
    "start_ts": 1531389519000,
    "status": "发送终止",
    "id": ""
  },
];
const stopTask = {
  "result": "success"
};
const receiverRS = {
  "receiverRS": [
    {"name": "aaa", "cover": 1000, "createTS": "2017-10-15"},
    {"name": "bbb", "cover": 1500, "createTS": "2017-10-15"},
    {"name": "ccc", "cover": 2000, "createTS": "2017-10-15"},
    {"name": "ddd", "cover": 2500, "createTS": "2017-10-15"},
  ]
};
const templateData = [
  {"id": "1", "name": "模板1", "status": "审核通过",},
  {"id": "2", "name": "模板2", "status": "审核中",},
  {"id": "3", "name": "模板3", "status": "审核失败",},
  {"id": "4", "name": "模板4", "status": "已失效",},
];
const taskDetail = {
  "name": "This is 任务名称",
  "receiver_groupid": "123",
  "template_id": "aaa",
  "template_name": "模板名称",
  "receiver_amount": "1000",
  "start_ts": "2017-10-10",
  "end_ts": ""
};
Mock.mock("/send/task/list/1", "post", {msg: '', code: 0, res: sendRecord});
Mock.mock("/send/task/stop/{taskId}", "post", {msg: '', code: 0, res: stopTask});
Mock.mock("/send/task/delete/{taskId}", "post", {msg: '', code: 0});
Mock.mock("/send/receiver/get/{subaccountNumber}", "post", receiverRS);
Mock.mock("/tmpls", "post", {msg: '', code: 0, data: templateData});
Mock.mock("/send/task/get/{id}", "post", {msg: '', code: 0, data: taskDetail});
Mock.mock("/send/task/create", {msg: '', code: 0});

