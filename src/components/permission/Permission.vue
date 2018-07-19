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
      onSelectChange(param) {
        if (param.length === 0) {
          return;
        }
        this.roleTree = [];
        let info = this.permissionInfo[param[0].nodeKey];
        this.roleTree.push({title:info.roleName});
        this.menuTree = [];
        let menu = info.menu;
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
            account.children.push({title: '子账户'});
          }
          if (account.children.length !== 0) {
            this.menuTree.push(account);
          }
        }
        if(menu.mould) {
          let mould = {
            title: "模板",
            children:[]
          };
          if (menu.mould.mouldCreate) {
            mould.children.push({title: '创建模板'});
          }
          if(menu.mould.mouldList) {
            mould.children.push({title: '模板列表'});
          }
          if(menu.mould.sign) {
            mould.children.push({title: '模板标签'});
          }
          if (mould.children.length !== 0) {
            this.menuTree.push(mould);
          }
        }
        if(menu.task) {
          let task = {
            title: "任务",
            children:[]
          };
          if (menu.task.taskCreate) {
            task.children.push({title: '新建任务'});
          }
          if(menu.task.taskList) {
            task.children.push({title: '任务列表'});
          }

          if (task.children.length !== 0) {
            this.menuTree.push(task);
          }
        }
        if(menu.stats) {
          let stats = {
            title: "统计",
            children:[]
          };
          if (menu.stats.sendStats) {
            stats.children.push({title: '发送统计'});
          }
          if(menu.stats.sendDetail) {
            stats.children.push({title: '发送详情'});
          }

          if (stats.children.length !== 0) {
            this.menuTree.push(stats);
          }
        }
        if(menu.channel) {
          let channel = {
            title: "通道",
            children:[]
          };
          if (menu.channel.channelInfo) {
            channel.children.push({title: '通道信息'});
          }
          if(menu.channel.channelAssignment) {
            channel.children.push({title: '通道分配'});
          }

          if (channel.children.length !== 0) {
            this.menuTree.push(channel);
          }
        }
        if(menu.system) {
          let system = {
            title: "系统",
            children:[]
          };
          if (menu.system.privilege) {
            system.children.push({title: '权限'});
          }

          if (system.children.length !== 0) {
            this.menuTree.push(system);
          }
        }
      },
      getDataFromNetwork() {
        axios.post("/role/list")
          .then(value => {
            let permissionInfo = value.data.data;
            this.permissionInfo = permissionInfo;
            for (let info of permissionInfo) {
              this.userTree.push({title: info.accountNickname});
            }
          }).catch(reason => {
          console.log(reason);
        })
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
