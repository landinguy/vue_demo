const Mock = require("mockjs")

Mock.mock("/test", "post", {name: "xxf"});
Mock.mock("/login", "post", {code: 0});

