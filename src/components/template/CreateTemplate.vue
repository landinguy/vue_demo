<template>
  <div class="bg">
    <div class="content_div">
      <Form ref="templateForm" :model="formData" :rules="ruleValidate" :label-width="120">
        <FormItem label="模板名称" prop="name">
          <Input v-model="formData.name" placeholder="不超过20个汉字长度" :maxlength="20" class="input_len"
                 :disabled="op=='view'"/>
        </FormItem>

        <FormItem label="模板类型" prop="contentType">
          <RadioGroup v-model="formData.contentType" type="button">
            <Radio label="营销类" class="radio_len" :disabled="op=='view'"></Radio>
            <Radio label="服务类" class="radio_len" :disabled="op=='view'"></Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="模板主题" prop="subject">
          <Input v-model="formData.subject" placeholder="不超过20个汉字长度" :maxlength="20" class="input_len"
                 :disabled="op=='view'"/>
        </FormItem>

        <FormItem label="模板内容" prop="contentValid">
          <p class="input_len" style="text-align: right">预估大小：{{getTotalSize}} MB / 上限 2.0 MB</p>
          <div id="parent">
            <div style="position: relative" v-for="(item,index) in materials">
              <div v-if="item.mt=='TEXT'" class="input_len parent_p"
                   style="" v-text="item.mc"></div>
              <img v-if="item.mt=='PIC'" :src="item.mc" class="input_len">
              <video v-if="item.mt=='VIDEO'" controls :src="item.mc" class="input_len"></video>
              <audio v-if="item.mt=='AUDIO'" controls :src="item.mc" class="input_len"></audio>
              <div style="position: absolute;right: -40px;top: 0px" v-if="op!='view'">
                <Button type="ghost" size="small" @click="edit(index)">编辑</Button>
                <br>
                <Button type="error" size="small" style="margin-top: 10px" @click="del(index)">删除</Button>
              </div>
            </div>
            <div @click="showModal" class="input_len add_div" id="addBtn" v-if="op!='view'">
              <a>
                <Icon type="plus"></Icon>
                点击添加素材
              </a>
            </div>
          </div>
        </FormItem>

        <FormItem label="签名位置" prop="signPlace">
          <RadioGroup v-model="formData.signPlace" type="button">
            <Radio label="尾部签名" class="radio_len" :disabled="op=='view'"></Radio>
            <Radio label="头部签名" class="radio_len" :disabled="op=='view'"></Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="模板签名" prop="sign">
          <Select v-model="formData.sign" class="input_len" :disabled="op=='view'">
            <Option v-for="item in signList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>

        <FormItem label="超信下载流量" prop="flowType">
          <RadioGroup v-model="formData.flowType" type="button">
            <Radio label="免流" class="radio_len" :disabled="op=='view'"></Radio>
            <Radio label="不免流" class="radio_len" :disabled="op=='view'"></Radio>
          </RadioGroup>
          <br>
          <template v-if="formData.flowType=='免流'">
            <p class="tip">
              如用户手机终端支持，接收超信的图片、视频等素材下载的流量由平台承担，不消耗用户手机套餐流量
            </p>
          </template>
          <template v-else>
            <p class="tip">
              接收超信图片、视频等素材下载的流量，将消耗用户手机套餐流量
            </p>
          </template>
        </FormItem>
      </Form>

      <div class="btn_div">
        <template v-if="op!='view'">
          <Button type="primary" class="radio_len" @click="submit">提交审核</Button>
          <Button type="ghost" class="radio_len" style="margin-left: 20px" @click="cancelSubmit">取消</Button>
        </template>
        <template v-if="op=='view'">
          <Button type="ghost" class="radio_len" style="margin-left: 20px" @click="back">返回</Button>
        </template>
      </div>

    </div>
    <Modal v-model="addModal" width="800" :closable="false">
      <div>
        <Tabs value="name1">
          <TabPane :label="tab1" name="name1">
            <div>
              <div style="display: inline-block;">
                <Form ref="materialForm" :model="material" :rules="materialValidate" :label-width="100">
                  <FormItem label="素材名称" prop="name">
                    <Input v-model="material.name" placeholder="自定义，不超过10个字" :maxlength="10" class="input_len"/>
                  </FormItem>

                  <FormItem label="素材类型" prop="t">
                    <RadioGroup v-model="material.t" type="button" @on-change="change">
                      <Radio label="文本"></Radio>
                      <Radio label="图片"></Radio>
                      <Radio label="视频"></Radio>
                      <!--<Radio label="音频"></Radio>-->
                    </RadioGroup>
                  </FormItem>

                  <template v-if="material.t=='文本'">
                    <FormItem label="文本内容" prop="text">
                      <Input v-model="material.text" type="textarea" :rows="4"
                             :placeholder="tip" class="input_len" :maxlength="500"/>
                      <p class="tip">
                        如模板下载免流，文本内容必须包含（本短信已免流量）字样
                      </p>
                      <p style="font-weight: bold;color: #333333">
                        已输入：{{getTotalCount}}字 / 上限500字
                      </p>
                    </FormItem>
                  </template>

                  <template v-if="material.t!='文本'">
                    <FormItem :label="getLabel" prop="uploadValid">
                      <Upload ref="upload"
                              :action="uploadUrl"
                              :format="getFormat"
                              :show-upload-list="false"
                              :before-upload="handleBeforeUpload"
                              :on-success="handleSuccess"
                              :data="extraParam"
                              :with-credentials="true"
                              style="display: inline-block">
                        <Button-Group>
                          <i-button type="ghost" icon="ios-cloud-upload-outline">
                            上传文件
                          </i-button>
                        </Button-Group>
                      </Upload>
                      <br>
                      <Tag v-if="tab1=='编辑素材'" class="input_len">
                        文件： {{material.uploadValid}}
                      </Tag>
                      <p class="tip">{{getUploadTip}}</p>
                    </FormItem>
                  </template>
                </Form>
              </div>
              <div class="mobile" :style="{backgroundImage:'url(' + phone + ')'}">
                <div class="mobile_content">
                  <p v-if="material.t=='文本'" class="c_text">{{material.text}}</p>
                  <img v-if="material.t=='图片'" class="c_img"/>
                  <video v-if="material.t=='视频'" id="c_video" class="c_video"
                         controls>
                  </video>
                  <audio v-if="material.t=='音频'" id="c_audio" class="c_audio" controls></audio>
                </div>
              </div>
            </div>
          </TabPane>
          <!--<TabPane label="我用过的素材" name="name2" disabled>标签二的内容</TabPane>-->
        </Tabs>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" @click="save">保存</Button>
        <Button type="ghost" @click="cancel" style="margin-left: 20px">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import axios from 'axios'
  import {mapGetters} from 'vuex'
  import url from '@/api/url'
  import phone from '@/assets/images/Phone_03.png'
  import {post, get} from "@/api/ax";
  import './createTemp.less'

  export default {
    name: 'CreateTemplate',
    data() {
      return {
        phone,
        extraParam: {
          type: 'PIC',
          txt: '',
          spaceUsage: 0,
          name: ''
        },
        index: null,
        signList: [],
        id: '',
        op: '',
        haveText: 0,
        tab1: '新建素材',
        materials: [
//          {mn: '图片xxx', mc: 'http://localhost/images/111.jpg', mt: '图片'},
//          {mn: '视频xxx', mc: 'http://localhost/video/v3.mp4', mt: '视频'},
        ],
        tip: '请输入文本、链接和最多5个参数，链接和参数必须使用通配符{$}包围。\n例如：尊敬的{$用户昵称}，您是我行{$会员级别}，您的详单请点击{$http://www.wostore.cn/}',
        uploadUrl: this.baseUrl + url.uploadMat,
        format: ['jpg', 'jepg', 'png', 'gif'],
        label: '上传图片',
        addModal: false,
        formData: {
          name: '',
          contentType: '营销类',
          subject: '',
          signPlace: '尾部签名',
          flowType: '免流',
          sign: '',
          content: [],
          contentValid: '1'
        },
        ruleValidate: {
          name: [{required: true, message: '请填写模板名称', trigger: 'blur'}],
          contentType: [{required: true, message: '请选择模板类型', trigger: 'change'}],
          subject: [{required: true, message: '请填写模板主题', trigger: 'blur'}],
          signPlace: [{required: true, message: '请选择签名位置', trigger: 'change'}],
          sign: [{required: true, message: '请选择模板签名', trigger: 'change'}],
          flowType: [{required: true, message: '请选择是否免流', trigger: 'change'}],
          contentValid: [{required: true, message: '模板内容不能为空', trigger: 'blur'}],
        },
        material: {
          id: '',
          name: '',
          t: '图片',
          uploadValid: '',
          text: '',
          size: 0,
          fileUrl: ''
        },
        materialValidate: {
//          name: [{required: true, message: '请填写素材名称', trigger: 'blur'}],
          t: [{required: true, message: '请选择素材类型', trigger: 'change'}],
          uploadValid: [{required: true, message: '请上传素材文件', trigger: 'blur'}],
          text: [
            {required: true, message: '请输入文本内容', trigger: 'blur'},
            {validator: this.validateText, trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      back() {
        this.clearData();
        this.$parent.content = 1;
      },
      edit(index) {
        this.index = index;
        this.tab1 = '编辑素材';
        this.material.name = this.materials[index].mn;
        let mt = this.materials[index].mt;
        this.material.t = mt == 'TEXT' ? '文本' : mt == 'PIC' ? '图片' : mt == 'VIDEO' ? '视频' : '音频';
        let mc = this.materials[index].mc;

        this.extraParam.type = mt;
        this.addModal = true;
        //等待video/audio加载之后在执行
        setTimeout(() => {
          if (this.material.t == '文本') {
            this.material.text = mc;
          } else {
            this.material.text = '';
            this.material.uploadValid = mc.substring(mc.lastIndexOf("/") + 1);
            this.showMaterialInPhone(mc);
          }
        }, 100);
      },
      showMaterialInPhone(mc) {
        if (this.material.t == '图片') {
          this.getByClass("c_img").setAttribute("src", mc);
        } else if (this.material.t == '视频') {
          this.getById("c_video").src = mc;
        } else if (this.material.t == '音频') {
          this.getById("c_audio").src = mc;
        }
      },
      del(index) {
        var $vue = this;
        this.$Modal.confirm({
          title: '删除',
          content: '确认删除该素材？',
          onOk() {
            if ($vue.materials[index].mt == 'TEXT') {
              $vue.haveText--;
            }
            $vue.materials.splice(index, 1);
          }
        });
      },
      cancelSubmit() {
        this.clearData();
        history.back();
      },
      submit() {
        if (this.haveText <= 0) {
          this.$Message.warning('模板内容至少应包含一个文本素材');
          return
        }
        if (this.getTotalSize > 2) {
          this.$Message.warning('模板内容应不大于2M');
          return
        }
        this.$refs.templateForm.validate((valid) => {
          if (valid) {
            this.clearData();
            const params = this.getParams();
            post(url.createTmpl, params).then(res => {
              if (res.code == 0) {
                this.$Message.success({
                  content: '提交成功',
                  duration: 1,
                  onClose() {
                    history.back();
                  }
                })
              } else {
                this.$Message.error(res.msg ? res.msg : '提交失败');
                this.formData.content = [];
              }
            });
          }
        })
      },
      getParams() {
        const tmpl = {};
        tmpl.name = this.formData.name;
        tmpl.contentType = this.formData.contentType == '服务类' ? 'SERVICE' : 'AD';
        tmpl.subject = this.formData.subject;
        tmpl.sign = this.formData.sign;
        tmpl.signPlace = this.formData.signPlace == '头部签名' ? 'HEAD' : 'TAIL';
        tmpl.flowType = this.formData.flowType == '免流' ? true : false;
        this.materials.forEach(item => {
          this.formData.content.push(item.mid);
        });
        tmpl.content = this.formData.content;
        return tmpl;
      },
      showModal() {
        this.$refs.materialForm.resetFields();
        this.tab1 = '新建素材';
        this.resetExtraParam();
        this.addModal = true
      },
      save() {//保存一个文本素材时，haveText加1
        this.$refs.materialForm.validate((valid) => {
          if (valid) {
            let m = this.material;
            let mc = m.fileUrl;
            let ms = m.size;
            let mt = m.t == '文本' ? 'TEXT' : m.t == '图片' ? 'PIC' : m.t == '视频' ? 'VIDEO' : 'AUDIO';

            if (mt == 'TEXT') {
              this.haveText++;
              this.extraParam.type = 'TEXT';
              this.extraParam.txt = m.text;
              this.extraParam.name = m.name;
              this.extraParam.spaceUsage = 0;
              mc = m.text;
              ms = 0;
              axios({
                url: this.baseUrl + url.uploadMat,
                method: 'post',
                data: this.extraParam,
                transformRequest: [function (data) {
                  // Do whatever you want to transform the data
                  let ret = ''
                  for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                  }
                  return ret
                }],
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }).then(res => {
                if (res.data.data) {
                  m.id = res.data.data.id;
                  this.updateMaterial(m, mc, mt, ms);
                } else {
                  this.$Message.error(res.data.msg);
                }
              });
            } else {
              this.updateMaterial(m, mc, mt, ms);
            }

            this.addModal = false;

            console.log("materials:" + JSON.stringify(this.materials));
          }
        })
      },
      updateMaterial(m, mc, mt, ms) {
        if (this.index != null) {//编辑素材
          let obj = this.materials[this.index];
          console.log("current material ->" + JSON.stringify(obj));
          obj.mid = m.id;
          obj.mn = m.name;
          obj.mc = mc;
          obj.mt = mt;
          obj.ms = ms;
          this.index = null;
        } else {
          this.materials.push({mid: m.id, mn: m.name, mc: mc, mt: mt, ms: ms});
        }
      },
      cancel() {
        this.addModal = false;
        this.$refs.materialForm.resetFields();
      },
      checkSize(size, max, msg) {
        if (size > max) {
          this.$Message.error(msg);
          return false
        }
        return true
      },
      resetExtraParam() {
        this.extraParam.type = 'PIC';
        this.extraParam.txt = '';
        this.extraParam.spaceUsage = 0;
        this.extraParam.name = '';
      },
      handleBeforeUpload(file) {
        let index = file.name.lastIndexOf(".");
        let type = file.name.substring(index + 1);
        let size = (file.size / (1024 * 1024)).toFixed(2);
        let m = this.material;
        //上传前对额外参数进行处理
        this.extraParam.type = m.t == '图片' ? 'PIC' : m.t == '视频' ? 'VIDEO' : m.t == '音频' ? 'AUDIO' : '';
        this.extraParam.txt = '';
        this.extraParam.name = m.name;
        this.extraParam.spaceUsage = size;
        console.log("before upload,extraParam:" + JSON.stringify(this.extraParam));

        if (m.t == '图片') {
          var arr = ["JPG", "PNG", "JEPG", "GIF"];
          if (arr.indexOf(type.toUpperCase()) == -1) {
            this.$Message.error('请上传jpg、png、jepg、gif图片文件');
            return false;
          }
          return this.checkSize(size, 0.2, '图片大小不得超过200KB');
        }

        if (m.t == '视频') {
          if (type.toUpperCase() != "MP4") {
            this.$Message.error('请上传mp4视频文件');
            return false;
          }
          return this.checkSize(size, 2, '视频大小不得超过2MB');
        }

        if (m.t == '音频') {
          if (type.toUpperCase() != "MP3") {
            this.$Message.error('请上传mp3音频文件');
            return false;
          }
          return this.checkSize(size, 2, '音频大小不得超过2MB');
        }
      },
      handleSuccess(res, file) {
        if (res.data) {
          console.log("res ->" + JSON.stringify(res.data));
          let url = res.data.resource;
          this.$Message.success('上传成功');
          this.material.id = res.data.id;
          this.material.uploadValid = url.substring(url.lastIndexOf("/") + 1);
          this.material.fileUrl = url;
          this.material.size = parseFloat((file.size / (1024 * 1024)).toFixed(2));
          this.showMaterialInPhone(url);
        } else {
          this.$Message.error('上传失败');
          this.material.uploadValid = '';
        }
      },
      change(val) {
        console.log("materialType:" + val);
      },
      validateText(rule, value, callback) {
        if (value.trim() == "") {
          callback(new Error("文本内容不能为空"));
        } else {
          callback()
        }
      },
      addMaterial(obj) {
        var $parent = document.getElementById("parent");
        var $addBtn = document.getElementById("addBtn");
        $parent.insertBefore(obj, $addBtn);
      },
      getById(n) {
        return document.getElementById(n);
      },
      getByClass(n) {
        return document.getElementsByClassName(n)[0];
      },
      clearData() {
        this.$store.state.template.id = '';
        this.$store.state.template.operation = 'default';
      },
      search(id) {
        get(url.getTmpl + id, {}).then(res => {
          if (res.data) {
            console.log(JSON.stringify(res.data));
            this.setData(res.data);
          } else {
            this.$Message.error('获取模板数据失败');
          }
        })
      },
      setData(res) {
        this.formData.name = res.name;
        this.formData.contentType = res.contentType == 'SERVICE' ? '服务类' : '营销类';
        this.formData.subject = res.subject;
        this.formData.sign = res.sign;
        this.formData.signPlace = res.signPlace == 'HEAD' ? '头部签名' : '尾部签名';
        this.formData.flowType = res.flowType ? '免流' : '不免流';
        if (res.mats != []) {
          this.formData.contentValid = "contentValid";
          res.mats.forEach(item => {
            this.materials.push({mid: item.id, mc: item.resource, mt: item.type, ms: parseFloat(item.spaceUsage)});
            if (item.type == 'TEXT') {
              this.haveText++;
            }
          })
        }
      },
      getSignList() {
        post(url.getSigns, {}).then(res => {
          if (res.data) {
            res.data.forEach(item => {
              if (item.status == 'AUDIT_PASSED') {
                this.signList.push({value: item.content, label: item.content})
              }
            });
          } else {
            this.$Message.error('获取签名数据失败');
          }
        })
      }
    },
    computed: {
      getFormat() {
        let t = this.material.t;
        return t == '图片' ? ['jpg', 'jepg', 'png', 'gif'] : t == '视频' ? ['mp4'] : t == '音频' ? ['mp3'] : [];
      },
      getUploadTip() {
        let t = this.material.t;
        return t == '图片' ? '支持JPG、JEPG、PNG、GIF格式的图片文件，建议单个图片200KB以内，竖版宽高640*820px，横版宽高640*360px，效果最佳'
          : t == '视频' ? '支持使用MP4文件，2MB以内，宽高640*480px，第一帧将作为视频封面。比特率800（超清）时长推荐15秒，比特率400（标清）不超过30秒为佳'
            : t == '音频' ? '支持使用MP3文件' : '';
      },
      getLabel() {
        let t = this.material.t;
        return t != '文本' ? '上传' + t : '';
      },
      getTotalCount() {
        return this.material.text.trim().length;
      },
      getTotalSize() {
        var sum = 0;
        this.materials.forEach(item => {
          sum += item.ms;
        });
        return sum;
      },
      ...mapGetters(['accountId'])
    },
    mounted() {
      this.getSignList();
      this.id = this.$store.state.template.id;
      this.op = this.$store.state.template.operation;
      if (this.id != '' && this.op != '') {//根据id查询模板
        console.log("op:" + this.op + ", id:" + this.id);
        this.search(this.id);
      }
    },
    beforeDestroy() {
      this.clearData();
    }
  }
</script>
