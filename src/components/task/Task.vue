<template>
  <div class="bg">
    <Form id='task' ref="task" :model="task" :rules="ruleValidate" label-position="right" :label-width="100">
      <FormItem label="发送任务名称" prop="name">
        <Input v-model="task.name" placeholder="助记用，不显示给用户；不超过20个汉字长度" :maxlength="maxLength"
               :disabled="id !== ''"></Input>
      </FormItem>
      <FormItem label="发送模板" prop="template">
        <Row>
          <Col :span="id === '' ? 10 : 24">
          <Input v-model="task.template" placeholder="请选择模板" disabled></Input>
          </Col>
          <Col span="10" style="margin-left: 10px" v-if="id === ''">
          <Button type="primary" @click="showChooseTemplateModal">选择模板</Button>
          <Button type="ghost" @click="newTemplate">新建模板</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="发送人群" prop="receiver">
        <Row>
          <Col :span="id === '' ? 10 : 24">
          <Input v-model="task.receiver" placeholder="请选择已创建的联系人组" disabled></Input>
          </Col>
          <Col span="10" style="margin-left: 10px" v-if="id === ''">
          <!--<Button type="primary" @click="showChooseReceiverModal">选择联系人组</Button>-->
          <Button type="ghost" @click="newReceiverModal = true">新建联系人</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="提交数量" prop="number">
        <Input v-model="task.number" placeholder="----" disabled></Input>
      </FormItem>

      <br/>

      <FormItem label="发送时间" prop="sendTime">
        <RadioGroup v-model="task.sendTime" type="button" @on-change="rgChange">
          <Radio label="rightNow" :disabled="id !== ''">立即发送</Radio>
          <Radio label="sometime" :disabled="id !== ''">预约发送</Radio>
        </RadioGroup>
      </FormItem>

      <div v-if="task.sendTime === 'sometime'">
        <FormItem label="开始时间" prop="customSendStartTime">
          <DatePicker @on-change="handleStartDateChange" type="datetime" format="yyyy-MM-dd HH:mm" :editable='false' :options="dateOption" placeholder="请选择开始时间" style="width: 200px"></DatePicker>
        </FormItem>
        <br>
        <FormItem label="结束时间">
          <DatePicker @on-change="handleEndDateChange" type="datetime" format="yyyy-MM-dd HH:mm" :editable='false' :options="dateOption" placeholder="请选择结束时间" style="width: 200px"></DatePicker>
        </FormItem>
      </div>

      <!--<FormItem label="发送时段" prop="sendPeriod">
        <RadioGroup v-model="task.sendPeriod" type="button">
          <Radio label="dayTime" :disabled="id !== ''">白天时段</Radio>
          <Radio label="customTime" :disabled="id !== ''">自定义时段</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem v-if="task.sendPeriod === 'customTime'" prop="customSendPeriod">
        <TimePicker @on-change="handleTimeChange" :editable='false' confirm type="timerange" placement="bottom-start" placeholder="请选择发送时段" style="width: 168px"></TimePicker>
      </FormItem>

      <FormItem label="发送控速" prop="sendSpeed">
        <RadioGroup v-model="task.sendSpeed" type="button">
          <Radio label="defaultSpeed" :disabled="id !== ''">默认速度</Radio>
          <Radio label="customSpeed" :disabled="id !== ''">自定义速度</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem v-if="task.sendSpeed === 'customSpeed'" prop="customSendSpeed">
        <Input v-model="task.customSendSpeed" placeholder="请输入正整数" number>
        <span slot="append">条/秒</span>
        </Input>
      </FormItem>

      <FormItem label="单日发送上限" prop="daySendLimit">
        <RadioGroup v-model="task.daySendLimit" type="button">
          <Radio label="notLimit" :disabled="id !== ''">不限制</Radio>
          <Radio label="customLimit" :disabled="id !== ''">自定义上限</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem v-if="task.daySendLimit === 'customLimit'" prop="customDaySendLimit">
        <Input v-model="task.customDaySendLimit" placeholder="请输入正整数" number>
        <span slot="append">条/天</span>
        </Input>
      </FormItem>

      <FormItem label="发送地域" prop="sendArea">
        <RadioGroup v-model="task.sendArea" type="button">
          <Radio label="everywhere" :disabled="id !== ''">不限制</Radio>
          <Radio label="customArea" :disabled="id !== ''">自定义省市</Radio>
          <Radio label="excludeArea" :disabled="id !== ''">屏蔽省市</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem v-if="task.sendArea === 'customArea'">
          <Card>
            <p slot="title">自定义省市区</p>
            <div style="max-height: 250px;overflow-y: scroll">
              <Tree :data="customCityTree" ref="customAreaRef" show-checkbox multiple></Tree>
            </div>
          </Card>
      </FormItem>

      <FormItem v-if="task.sendArea === 'excludeArea'">
        <Card>
          <p slot="title">屏蔽省市区</p>
          <div style="max-height: 250px;overflow-y: scroll">
            <Tree :data="shieldCityTree" ref="excludeAreaRef" show-checkbox multiple></Tree>
          </div>
        </Card>
      </FormItem>-->

      <FormItem v-if="id === ''">
        <Button type="primary" @click="handleSubmit('task')">提交</Button>
        <Button type="ghost" @click="handleReset('task')" style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>

    <br>

    <Button type="ghost" v-if="id || modifyId || copyId" @click="goBack">返回</Button>

    <Modal v-model="chooseTemplateModal" width="800">
      <p slot="header">
        <Icon type="information-circled"></Icon>
        <span>选择模板</span>
      </p>

      <Table height="500" :columns="chooseTemplateModalColumns" :data="templateData"></Table>

      <div slot="footer">
      </div>
    </Modal>

    <Modal v-model="chooseReceiverModal" width="800">
      <p slot="header">
        <Icon type="information-circled"></Icon>
        <span>选择收件人</span>
      </p>

      <Table height="500" :columns="chooseReceiverModalColumns" :data="receiverRS"></Table>

      <div slot="footer">
      </div>
    </Modal>

    <Modal
      v-model="newReceiverModal">
      <p slot="header">
        <Icon type="information-circled"></Icon>
        <span>新建收件人</span>
      </p>

      <div v-if="!uploadComplete">
        <Upload
          :before-upload="handleBeforeUpload"
          :action="uploadUrl">
          <Button type="ghost" icon="ios-cloud-upload-outline">点击从本地选择文件</Button>
        </Upload>
        <div v-if="file !== null" style="margin-top: 20px">待上传文件: {{ file.name }}</div>
        <p style="margin-top: 20px">请上传 TXT、CSV、XLS、XLSX文件，第1列填手机号，2-5列填参数，最多使用5个参数，无参数留空，文件不多于10万行数据。</p>
        <Checkbox v-model="saveToContacts" style="margin-top: 20px">保存至我的联系人</Checkbox>
      </div>

      <div v-if="uploadComplete" style="text-align: center">
        <p>识别到正确号码并提交成功</p>
        <h1 style="display: inline-block">{{uploadRightNumber}}</h1>个
        <div v-if="uploadWrongNumber > 0">
          <hr style="margin-top: 20px;margin-bottom: 20px">
          <p>识别到错误信息{{uploadWrongNumber}}个，点击下载 <a :href="downloadErrorDetailUrl">《错误详单》</a></p>
        </div>
      </div>

      <div slot="footer">
        <Button v-if="!uploadComplete" type="primary" size="large" long :loading="loadingStatus" @click="upload">
          {{ loadingStatus ? '上传中' : '点击上传' }}
        </Button>
        <Button v-if="uploadComplete" type="primary" size="large" long @click="uploadFinish">完成</Button>
      </div>
    </Modal>
  </div>

</template>

<script>
  import axios from 'axios';
  import citytree from '../../api/citytree';
  import {mapGetters} from 'vuex';

  export default {
    name: "Task",
    data() {
      const validateNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空!'));
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字!'));
        }
        else {
          if (value <= 0) {
            callback(new Error('请输入正整数'));
          } else {
            callback();
          }
        }
      };
      return {
        downloadErrorDetailUrl: '',
        uploadUrl: this.baseUrl + '/receiver/upload',
        id: '',
        modifyId: '',
        copyId: '',
        maxLength: 20,
        file: null,
        loadingStatus: false,
        chooseTemplateModal: false,
        chooseReceiverModal: false,
        newReceiverModal: false,
        saveToContacts: true,
        uploadComplete: false,
        uploadRightNumber: -1,
        uploadWrongNumber: -1,
        customCityTree: JSON.parse(JSON.stringify(citytree)),
        shieldCityTree: JSON.parse(JSON.stringify(citytree)),
        chooseTemplateModalColumns: [],
        chooseReceiverModalColumns: [],
        templateData: [],
        receiverRS: [],
        dateOption: {
          disabledDate(date) {
            if (date === '') {
              return date;
            }
            let dayBefore = date.valueOf() < Date.now() - 86400000;
            let dayAfter = date.valueOf() > Date.now() + 86400000 * 15;
            return dayBefore || dayAfter;
          }
        },
        task: {
          name: '',
          template: '',
          templateId: '',
          receiver: '',
          number: 0,
          sendTime: 'rightNow',
          sendSpeed: 'defaultSpeed',
          sendPeriod: 'dayTime',
          daySendLimit: 'notLimit',
          sendArea: 'everywhere',
          customSendStartTime: '',
          customSendEndTime: '',
          customSendPeriod:'',
          customSendSpeed:'',
          customDaySendLimit: '',
          customSendArea: [],
          customExcludeArea: [],
        },
        ruleValidate: {
          name: [{required: true, message: '发送任务名称不能为空', trigger: 'blur'}],
          template: [{required: true, message: '发送模板不能为空', trigger: 'blur'}],
          receiver: [{required: true, message: '收件人不能为空', trigger: 'blur'}],
          number: [{validator: validateNumber, trigger: 'blur'}],
          sendTime: [{required: true, message: '发送时间不能为空', trigger: 'change'}],
          /*sendPeriod: [{ required: true, message: '发送时段不能为空', trigger: 'change' }],
          sendSpeed: [{ required: true, message: '发送控速不能为空', trigger: 'change' }],
          daySendLimit: [{ required: true, message: '请选择单日发送上限', trigger: 'change' }],
          sendArea: [{ required: true, message: '请选择发送地域', trigger: 'change' }],*/

          customSendStartTime:[
            // { required: true, message: '发送时间不能为空', trigger: 'change' },
            {
              validator(rule, value, callback, source, options) {
                let errors = [];
                if (value === '') {
                  callback('发送时间不能为空');
                }
                callback(errors);
              }
            }
          ],
          customSendPeriod: [
            {
              validator(rule, value, callback, source, options) {
                let errors = [];
                if (value === '' || value == ',') {
                  callback('发送时段不能为空');
                }
                callback(errors);
              }
            }
          ],
          /*customSendSpeed: [{ validator: validateNumber, trigger: 'blur' }],
          customDaySendLimit: [{ validator: validateNumber, trigger: 'blur' }],*/
        }
      };
    },
    methods: {
      rgChange() {
        this.task.customSendEndTime = '';
        this.task.customSendStartTime = '';
      },
      goBack() {
        this.$store.state.task.task_id = '';
        this.$store.state.task.task_operation = '';
        history.back();
      },
      newTemplate() {
        this.$router.push({name: 'create_template'})
      },
      uploadFinish() {
        this.uploadComplete = false;
        this.newReceiverModal = false;
      },
      handleSubmit(name) {
        console.log("form value : " + JSON.stringify(this.task));

        let vue = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            let startTime = new Date(this.task.customSendStartTime).getTime();
            let endTime = new Date(this.task.customSendEndTime).getTime();
            if (this.task.customSendEndTime !== '') {
              if (endTime < startTime) {
                vue.$Message.error('结束时间不能大于开始时间!');
                return;
              }
            }
            console.log("aaa:"+endTime);
            let taskData = {
              accountId:this.accountId,
              name:this.task.name,
              templateId:this.task.templateId,
              templateName:this.task.template,
              receiverGroupId:this.task.receiver,
              receiverAmount:this.task.number,
              startTs:this.task.sendTime === 'sometime' ? startTime: '',
              endTs:this.task.sendTime === 'sometime' ? (this.task.customSendEndTime === '' ? '': endTime): '',
              sendType:this.task.sendTime === 'sometime' ? 'RESERVATION' : 'IMMEDIATE',
              // periodFrom:'',
              // periodTo:'',
              rateLimit: '',
              // region:'',
            };
            console.log("post task data: " + JSON.stringify(taskData));
            axios.post(this.baseUrl + "/task/create", taskData).then(function (response) {
              if (response.data.code === 0) {
                vue.$Message.success('提交任务成功!');
              } else if(response.data.code === 401){
                vue.$Message.error('登录超时!');
              } else {
                vue.$Message.error('提交任务失败!');
              }
            })
              .catch(function (error) {
                console.log(error);
                vue.$Message.error('提交任务失败!');
              });
          } else {
            this.$Message.error('请填写必要信息!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      handleStartDateChange(time) {
        this.task.customSendStartTime = time;
      },
      handleEndDateChange(time) {
        this.task.customSendEndTime = time;
      },
      handleBeforeUpload(file) {
        let fileName = file.name;
        if (fileName.endsWith(".txt") || fileName.endsWith(".csv") || fileName.endsWith(".xls") || fileName.endsWith(".xlsx")) {
          this.file = file;
        } else {
          this.$Notice.warning({
            title: '文件格式不正确',
            desc: file.name + '文件格式不正确, 请选择txt、csv、xls、xlsx格式的文件!'
          });
        }
        return false;
      },
      upload() {
        console.log(this.file);
        if (this.file !== null) {
          this.loadingStatus = true;
          let vue = this;
          let data = new FormData();
          data.append('accountNo', this.accountId);
          data.append('save', this.saveToContacts.toString());
          data.append('file', this.file);
          axios.post(this.uploadUrl, data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(value => {
            console.log("upload success response: " + JSON.stringify(value));
            vue.uploadRightNumber = value.data.data.amount;
            vue.uploadWrongNumber = value.data.data.errorAmount;
            vue.downloadErrorDetailUrl = vue.baseUrl + '/receiver/download/error/' + value.data.data.group_id;
            this.file = null;
            this.loadingStatus = false;
            this.uploadComplete = true;
            this.$Message.success('上传文件成功!');
            this.task.receiver = value.data.data.group_id;
            this.task.number = value.data.data.amount;
          }).catch(reason => {
            console.log("upload faile response: " + reason);
            this.loadingStatus = false;
            this.uploadComplete = false;
            this.$Message.error('上传文件失败!')
          });
        } else {
          this.$Message.info('请选择文件!');
        }
      },
      showChooseTemplateModal() {
        this.chooseTemplateModal = true;
        let vue = this;
        let param = {
          status: 'AUDIT_PASS',
          pageNo: '1',
          pageSize: '20',
          accountId: this.accountId
        };
        axios.post(this.baseUrl + "/tmpls", param)
          .then(function (response) {
            console.log(response.data.data);
            vue.templateData = response.data.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      showChooseReceiverModal() {
        this.chooseReceiverModal = true;
        let vue = this;
        axios.post(this.baseUrl + "/send/receiver/get/" + this.accountId)
          .then(function (response) {
            // console.log(response.data.receiverRS);
            vue.receiverRS = response.data.receiverRS;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      chooseTemlate(index) {
        console.log(index);
        this.chooseTemplateModal = false;
        this.task.template = this.templateData[index].name;
        this.task.templateId = this.templateData[index].id;
      },
      chooseReceiver(index) {
        console.log(index);
        this.chooseReceiverModal = false;
        this.task.receiver = this.receiverRS[index].name;
        this.task.number = this.receiverRS[index].cover;
      },
      geTemplateTableColumns() {
        return [
          {title: '模板编号', key: 'id',},
          {title: '模板名称', key: 'name'},
          {
            title: '状态', key: 'status', render: (h, params) => {
            return h('div', '审核通过')
          }
          },
          {
            title: '操作', key: 'action', width: 150, align: 'center',
            render: (h, params) => {
              let newVar = [];
              let status = params.row.status;
              if (status !== '审核失败' && status !== '已失效') {
                newVar.push(h('Button', {
                  props: {type: 'primary', size: 'small'},
                  style: {marginRight: '5px'},
                  on: {
                    click: () => {
                      this.chooseTemlate(params.index)
                    }
                  }
                }, '选择'));
              }
              return h('div', newVar);
            }
          }
        ];
      },
      getReceiverTableColumns() {
        return [
          {title: '收件人组名称', key: 'name',},
          {title: '提交数量', key: 'cover'},
          {title: '创建时间', key: 'createTS'},
          {
            title: '操作', key: 'action', width: 150, align: 'center', render: (h, params) => {
            return h('div', [h('Button', {
              props: {type: 'primary', size: 'small'},
              style: {marginRight: '5px'},
              on: {
                click: () => {
                  this.chooseReceiver(params.index)
                }
              }
            }, '选择')]);
          }
          }
        ];
      },
      changeTableColumns() {
        this.chooseReceiverModalColumns = this.getReceiverTableColumns();
        this.chooseTemplateModalColumns = this.geTemplateTableColumns();
      },
      getTaskDetail(id) {
        let vue = this;
        axios.post(this.baseUrl + "/task/get/" + id, {accountId: this.accountId}).then(value => {
          let data = value.data.data;
          console.log(data);
          vue.task.name = data.name;
          vue.task.template = data.templateName;
          vue.task.receiver = data.receiverGroupId;
          vue.task.number = data.receiverAmount;
        }).catch(reason => {
          console.log(reason);
        })
      }
    },
    computed: {
      ...mapGetters(['accountId'])
    },
    mounted() {
      this.id = this.$store.state.task.task_id;
      this.modifyId = this.$store.state.task.task_operation;
      this.copyId = this.$store.state.task.task_operation;
      console.log("store: " + this.id + " modifyId: " + this.modifyId + " copyId: " + this.copyId);
      if (this.id !== undefined && this.id.length !== 0) {
        console.log("modifyId not null request network for task detail");
        this.getTaskDetail(this.id);
      }
      if (this.modifyId !== undefined && this.modifyId.length !== 0) {
        console.log("id not null request network for task detail");
        this.getTaskDetail(this.modifyId);
      }
      if (this.copyId !== undefined && this.copyId.length !== 0) {
        console.log("copyId not null request network for task detail");
        this.getTaskDetail(this.copyId);
      }
      this.changeTableColumns();
    }
  }
</script>

<style scoped>
  #task {
    max-width: 80%;
  }

  .bg {
    background-color: white;
    width: 100%;
    height: 100%;
    padding: 16px;
  }
</style>
