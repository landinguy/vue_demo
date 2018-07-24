<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Button type="ghost">
        <icon :size="18" type="person"></icon>
        &nbsp;{{accountNumber}}&nbsp;
        <Icon :size="12" type="arrow-down-b"></Icon>
      </Button>
      <DropdownMenu slot="list">
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'User',
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    handleClick (name) {
      switch (name) {
        case 'logout':
            this.$router.push({
              name: 'login'
            })
          break
      }
    }
  },
  computed:{
    ...mapGetters(['accountNumber'])
  }
}
</script>
