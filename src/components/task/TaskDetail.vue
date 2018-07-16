<template>
  <div>
    <Form :model="task" label-position="right" :label-width="100">
      <FormItem label="发送任务名称">
        <Input v-model="task.name" disabled></Input>
      </FormItem>
      <FormItem label="发送模板">
        <Input v-model="task.template_name" disabled></Input>
      </FormItem>
      <FormItem label="收件人">
        <Input v-model="task.receiver" disabled></Input>
      </FormItem>
      <FormItem label="提交数量">
        <Input v-model="task.receiver_amount" disabled></Input>
      </FormItem>

      <hr>
      <br>

      <FormItem label="发送时间">
        <Input v-model="task.receiver_amount" disabled></Input>
      </FormItem>
      <FormItem label="发送时段">
        <Input v-model="task.receiver_amount" disabled></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: "task-detail",
    data() {
      return {
        task: {
          name: 'aaa',
          template_name: '模板',
          receiver:'收件人',
          receiver_amount:1000,
          start_ts:'',
          end_ts:'',
          period:''



        }
      };
    }
  }
</script>

<style scoped>

</style>
