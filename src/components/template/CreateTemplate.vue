<template>
  <div>
    <div class="content_div">
      <Form ref="templateForm" :model="formData" :rules="ruleValidate" :label-width="120" class="form">
        <FormItem label="模板名称" prop="name">
          <Input v-model="formData.name" placeholder="不超过20个汉字长度" :maxlength="20" class="input_len"/>
        </FormItem>

        <FormItem label="模板类型" prop="type">
          <RadioGroup v-model="formData.type" type="button">
            <Radio label="营销类" class="radio_len"></Radio>
            <Radio label="服务类" class="radio_len"></Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="模板主题" prop="theme">
          <Input v-model="formData.theme" placeholder="不超过20个汉字长度" :maxlength="20" class="input_len"/>
        </FormItem>

        <FormItem label="模板内容" prop="content">
          <p class="input_len" style="text-align: right">预估大小：0 MB / 上限 2.0 MB</p>
          <div id="parent">
            <div style="position: relative" v-for="i in 2">
              <img src="http://localhost/images/111.jpg" class="input_len" style="border: 1px solid black">
              <div style="position: absolute;right: -40px;top: 0px">
                <Button type="ghost" size="small">编辑</Button><br>
                <Button type="error" size="small" style="margin-top: 10px">删除</Button>
              </div>
            </div>
            <div @click="showModal" class="input_len add_div" id="addBtn">
              <a>
                <Icon type="plus"></Icon>
                点击添加素材
              </a>
            </div>
          </div>
        </FormItem>

        <FormItem label="签名位置" prop="signPosition">
          <RadioGroup v-model="formData.signPosition" type="button">
            <Radio label="尾部签名" class="radio_len"></Radio>
            <Radio label="头部签名" class="radio_len"></Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="模板签名" prop="sign">
          <Select v-model="formData.sign" class="input_len">
            <Option value="1">【小沃科技】</Option>
            <Option value="2">【中国联通】</Option>
            <Option value="3">【招商银行】</Option>
          </Select>
        </FormItem>

        <FormItem label="超信下载流量" prop="flowType">
          <RadioGroup v-model="formData.flowType" type="button">
            <Radio label="免流" class="radio_len"></Radio>
            <Radio label="不免流" class="radio_len"></Radio>
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
        <Button type="primary" class="radio_len" @click="submit">提交审核</Button>
        <Button type="ghost" class="radio_len" style="margin-left: 20px">取消</Button>
      </div>
    </div>
    <Modal v-model="addModal" width="800">
      <div>
        <Tabs value="name1">
          <TabPane label="新建素材" name="name1">
            <div style="display: inline-block;margin-top: 20px">
              <Form ref="materialForm" :model="material" :rules="materialValidate" :label-width="100">
                <FormItem label="素材名称" prop="name">
                  <Input v-model="material.name" placeholder="自定义，不超过10个字" :maxlength="10" class="input_len"/>
                </FormItem>

                <FormItem label="素材类型" prop="t">
                  <RadioGroup v-model="material.t" type="button" @on-change="change">
                    <Radio label="文本"></Radio>
                    <Radio label="图片"></Radio>
                    <Radio label="视频"></Radio>
                    <Radio label="音频"></Radio>
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
                  <FormItem :label="label" prop="uploadValid">
                    <Upload :action="uploadUrl"
                            :format="format"
                            :show-upload-list="false"
                            :before-upload="handleBeforeUpload"
                            :on-success="handleSuccess" style="display: inline-block">
                      <Button-Group>
                        <i-button type="ghost" icon="ios-cloud-upload-outline">
                          上传文件
                        </i-button>
                      </Button-Group>
                    </Upload>
                    <p class="tip">{{uploadTip}}</p>
                  </FormItem>
                </template>
              </Form>
            </div>
            <div class="mobile">
              <div class="mobile_content">
                <p v-if="material.t=='文本'" class="c_text">{{material.text}}</p>
                <img v-if="material.t=='图片'" src="http://localhost/images/zl_cover.jpg" class="c_img"/>
                <video v-if="material.t=='视频'" class="c_video" src="http://localhost/video/v2.mp4" controls>
                </video>
                <audio v-if="material.t=='音频'" class="c_audio" controls src="http://localhost/yp.m4a"></audio>
              </div>
            </div>
          </TabPane>
          <TabPane label="我用过的素材" name="name2">标签二的内容</TabPane>
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
  export default {
    name: 'CreateTemplate',
    data() {
      return {
        tip: '请输入文本、链接和最多5个参数，链接和参数必须使用通配符{$}包围。\n例如：尊敬的{$用户昵称}，您是我行{$会员级别}，您的详单请点击{$http://www.wostore.cn/}',
        uploadTip: '支持JPG、JEPG、PNG、GIF格式的图片文件，单个图片200KB以内，竖版宽高640*820px，横版宽高640*360px，效果最佳',
        uploadUrl: '',
        format: ['jpg', 'jepg', 'png', 'gif'],
        label: '上传图片',
        addModal: false,
        formData: {
          name: '',
          type: '营销类',
          theme: '',
          signPosition: '尾部签名',
          flowType: '免流',
          sign: '',
          content: '11',


        },
        ruleValidate: {
          name: [{required: true, message: '请填写模板名称', trigger: 'blur'}],
          type: [{required: true, message: '请选择模板类型', trigger: 'change'}],
          theme: [{required: true, message: '请填写模板主题', trigger: 'blur'}],
          signPosition: [{required: true, message: '请选择签名位置', trigger: 'change'}],
          sign: [{required: true, message: '请选择模板签名', trigger: 'change'}],
          flowType: [{required: true, message: '请选择是否免流', trigger: 'change'}],
          content: [{required: true, message: '模板内容不能为空', trigger: 'blur'}],
        },
        material: {
          name: '',
          t: '图片',
          uploadValid: '',
          text: ''
        },
        materialValidate: {
          name: [{required: true, message: '请填写素材名称', trigger: 'blur'}],
          t: [{required: true, message: '请选择素材类型', trigger: 'change'}],
          uploadValid: [{required: true, message: '请上传素材文件', trigger: 'blur'}],
          text: [{required: true, message: '请输入文本内容', trigger: 'blur'}, {
            validator: this.validateText,
            trigger: 'blur'
          }],
        }
      }
    },
    methods: {
      submit() {
        this.$refs.templateForm.validate((valid) => {
          if (valid) {
            history.back();
          } else {
            alert(2);
//            var para=document.createElement("p");
//            var node=document.createTextNode("这是新段落。");
//            para.appendChild(node);
//            this.addMaterial(para);
          }
        })
      },
      showModal() {
        this.$refs.materialForm.resetFields();
        this.addModal = true
      },
      save() {
        this.$refs.materialForm.validate((valid) => {
          if (valid) {
            alert(1)
          } else {
            alert(2)
          }
        })
      },
      cancel() {
        this.addModal = false;
        this.$refs.materialForm.resetFields();
      },
      handleBeforeUpload(file) {
        var index = file.name.lastIndexOf(".");
        var type = file.name.substring(index + 1);
        if (this.material.t == '图片') {
          if (type.toUpperCase() != "JPG" && type.toUpperCase() != "PNG" && type.toUpperCase() != "JEPG" && type.toUpperCase() != "GIF") {
            this.$Message.error('请上传jpg、png、jepg、gif图片文件');
            return false;
          }
        }
        if (this.material.t == '视频' && type.toUpperCase() != "MP4") {
          this.$Message.error('请上传mp4视频文件');
          return false;
        }
        if (this.material.t == '音频' && type.toUpperCase() != "MP3") {
          this.$Message.error('请上传mp3音频文件');
          return false;
        }
      },
      handleSuccess(res, file) {
        if (res != null) {
          console.log("res ->" + res);
          this.$Message.success('上传成功');
          this.material.uploadValid = res;
        } else {
          this.$Message.error('上传失败');
          this.material.uploadValid = '';
        }
      },
      change(val) {
        console.log("materialType:" + val);
        switch (val) {
          case '文本':
            this.format = [];
            break;
          case '图片':
            this.label = '上传图片';
            this.format = ['jpg', 'jepg', 'png', 'gif'];
            this.uploadTip = '支持JPG、JEPG、PNG、GIF格式的图片文件，单个图片200KB以内，竖版宽高640*820px，横版宽高640*360px，效果最佳';
            break;
          case '视频':
            this.label = '上传视频';
            this.format = ['mp4'];
            this.uploadTip = '支持使用MP4文件，1.6MB以内，宽高640*480px，第一帧将作为视频封面。比特率800（超清）时长推荐15秒，比特率400（标清）不超过30秒为佳';
            break;
          case '音频':
            this.label = '上传音频';
            this.format = ['mp3'];
            this.uploadTip = '支持使用MP3文件';
            break;
        }
        console.log("format:" + this.format);
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
      }
    },
    computed: {
      getTotalCount() {
        return this.material.text.trim().length;
      }
    }
  }
</script>
<style lang="less">
  .input_len {
    width: 360px;
  }

  .radio_len {
    width: 100px;
    text-align: center;
  }

  .tip {
    .input_len;
    margin-top: 10px;
    line-height: 20px;
    color: gray;
  }

  .content_div {
    width: 700px;
    margin: 0 auto;
    border: 1px solid #E6E6E6;
    padding: 20px 0px;
  }

  .form {
    width: 500px;
    margin: 0 auto
  }

  .btn_div {
    text-align: center;
    width: 700px;
    margin-top: 40px;
  }

  .add_div {
    height: 40px;
    line-height: 40px;
    border: 1px solid #2D8CF0;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
  }

  .mobile {
    background: rgba(0, 0, 0, 0) url("../../assets/images/Phone_03.png") no-repeat scroll 0 0;
    height: 570px;
    width: 272px;
    display: inline-block;
    float: right;
    position: relative;
  }

  .mobile_content {
    position: absolute;
    /*border: 1px solid black;*/
    width: 272px;
    top: 90px;
    height: 200px;
  }

  .c {
    width: 220px;
    margin: 0 auto;
  }

  .c_text {
    .c;
    word-wrap: break-word
  }

  .c_img, .c_video {
    .c;
    height: 124px;
    display: block;
  }

  .c_audio {
    width: 200px;
    display: block;
    margin: 0 auto;
    position: relative;
    left: -20px;
  }

</style>
