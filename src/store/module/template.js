export default {
  state: {
    id: '',//模板id
    operation: 'default',//模板查看、修改操作,
  },
  mutations: {
    setId(state, id) {
      state.id = id
    },
    setOperation(state, operation) {
      state.operation = operation
    }
  }
}
