import {total, trend} from "../../api/home";
export default {
  state: {
    send: 1000,
    sendSuc: 200,
    remain: 10000000,
    statisticsRS:[],
    sortedData:[]
  },
  mutations: {
    setSend (state, send) {
      state.send = send
    },
    setSendSuc (state, sendSuc) {
      state.sendSuc = sendSuc
    },
    setRemain (state, remain) {
      state.remain = remain
    },
    setStatisticsRS (state, statisticsRS) {
      state.statisticsRS = statisticsRS
    },
    setSortedData (state) {
      state.sortedData = state.statisticsRS.sort(function(a,b){
        var s = a.timePoint;
        var t = b.timePoint;
        if(s < t) return -1;
        if(s > t) return 1;
      })
    }
  },

  actions: {

    handleTotal ({ commit }, {admin, st, et}) {
      return new Promise((resolve, reject) => {
        total({
          st,
          et,
          admin
        }).then(res => {

          const send = res.data.send
          commit('setSend', send)

          const sendSuc = res.data.sendSuc
          commit('setSendSuc', sendSuc)

          const remain = res.data.remain
          commit('setRemain', remain)

          resolve()
        }).catch(err => {

          commit('setSend', 5265)

          commit('setSendSuc', 52262)

          commit('setRemain', 5521265)
          reject(err)
        })
      })
    },

    handleTrend ({ commit }, { admin, st, et}) {
      return new Promise((resolve, reject) => {
        trend({
          st,
          et,
          admin
        }).then(res => {

          const statisticsRS = res.data.statisticsRS
          commit('statisticsRS', statisticsRS)
          resolve()
        }).catch(err => {
         var  statisticsRS=[
            {
              timePoint:  "2018-07-10 20:16:55",
              sendSuc: 200,
              tId: "1",
              tName: "测试"
            },

            {
              timePoint:  "2018-07-10 09:16:55",
              sendSuc: 300,
              tId: "1",
              tName: "测试"
            },
            {
              timePoint:  "2018-07-10 10:16:55",
              sendSuc: 500,
              tId: "1",
              tName: "测试"
            },
            {
              timePoint: "2018-07-10 02:16:55",
              sendSuc: 700,
              tId: "1",
              tName: "测试"
            },
            ]
          console.log(statisticsRS)
          commit('setStatisticsRS', statisticsRS)
          commit('setSortedData')

          reject(err)
        })
      })
    },

  }
}
