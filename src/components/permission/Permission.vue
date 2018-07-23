<template>
  <div>
    <Row>
      <Col span="8">
        <Card>
          <p slot="title">用户树</p>
          <Tree :data="userTree" @on-select-change="onSelectChange"></Tree>
        </Card>
      </Col>
      <Col span="8" >
        <Card>
          <p slot="title">角色树</p>
          <Tree :data="roleTree"></Tree>
        </Card>
      </Col>
      <Col span="8" >
        <Card>
          <p slot="title">菜单树</p>
          <Tree :data="menuTree"></Tree>
        </Card>
      </Col>
    </Row>


  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: "permission",
    mounted(){
      this.getDataFromNetwork();
    },
    methods: {
      initMenu(menu) {
        this.menuTree = [];
        if (menu.index) {
          this.menuTree.push({title: "首页"});
        }
        if(menu.account) {
          let account = {
            title: "账户管理",
            children:[]
          };
          if (menu.account.accountInfo) {
            account.children.push({title: '账户信息'});
          }
          if(menu.account.subaccount) {
            account.children.push({title: '子账户管理'});
          }
          if (account.children.length !== 0) {
            this.menuTree.push(account);
          }
        }
        if(menu.mould) {
          let mould = {
            title: "模板管理",
            children:[]
          };
          if (menu.mould.mouldCreate) {
            mould.children.push({title: '新建模板'});
          }
          if(menu.mould.mouldList) {
            mould.children.push({title: '我的模板'});
          }
          if(menu.mould.sign) {
            mould.children.push({title: '签名管理'});
          }
          if (mould.children.length !== 0) {
            this.menuTree.push(mould);
          }
        }
        if(menu.task) {
          let task = {
            title: "发送管理",
            children:[]
          };
          if (menu.task.taskCreate) {
            task.children.push({title: '新建任务'});
          }
          if(menu.task.taskList) {
            task.children.push({title: '发送记录'});
          }

          if (task.children.length !== 0) {
            this.menuTree.push(task);
          }
        }
        if(menu.stats) {
          let stats = {
            title: "数据统计",
            children:[]
          };
          if (menu.stats.sendStats) {
            stats.children.push({title: '发送统计'});
          }
          if(menu.stats.sendDetail) {
            stats.children.push({title: '发送详单'});
          }

          if (stats.children.length !== 0) {
            this.menuTree.push(stats);
          }
        }
        if(menu.channel) {
          let channel = {
            title: "通道管理",
            children:[]
          };
          if (menu.channel.channelInfo) {
            channel.children.push({title: '通道接入'});
          }
          if(menu.channel.channelAssignment) {
            channel.children.push({title: '通道配置'});
          }

          if (channel.children.length !== 0) {
            this.menuTree.push(channel);
          }
        }
        if(menu.system) {
          let system = {
            title: "系统管理",
            children:[]
          };
          if (menu.system.privilege) {
            system.children.push({title: '用户权限'});
          }

          if (system.children.length !== 0) {
            this.menuTree.push(system);
          }
        }
      },
      onSelectChange(param) {
        if (param.length === 0) {
          return;
        }
        let info = this.permissionInfo[param[0].nodeKey];
        axios.post(this.baseUrl + "/role/get/" + info.roleId)
          .then(value => {
            console.log(value);
            this.roleTree = [];
            this.roleTree.push({title:value.data.data.roleName});
            console.log(value.data.data.menu);
            this.initMenu(value.data.data.menu);
          }).catch(reason => {
          console.log(reason);
        });
      },
      getDataFromNetwork() {
        axios.post(this.baseUrl + "/subaccount/list", {})
          .then(value => {
            console.log(value);
            let data = value.data.data;
            this.permissionInfo = data;
            for (let obj of data) {
              this.userTree.push({title: obj.subaccountNickname});
            }
          }).catch(reason => {
          console.log(reason);
        });

      }
    },
    data() {
      return {
        permissionInfo:'',
        userTree: [],
        roleTree: [],
        menuTree: []
      }
    }
  }
</script>

<style scoped>

</style>
