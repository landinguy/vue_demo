import { statisticsCount,statisticsList,statisticsDetailCount,statisticsDetailList } from '@/api/statistics'
export default {
  state: {
    statsCount:0,
    statsList:[],
    statsDetailCount:0,
    statsDetailList:[],
  },
  mutations: {
    setStatsCount (state, statsCount) {
      state.statsCount = statsCount;
    },
    setStatsList (state, statsList) {
      state.statsList = statsList;
    },
    setStatsDetailCount (state, statsDetailCount) {
      state.statsDetailCount = statsDetailCount;
    },
    setStatsDetailList (state, statsDetailList) {
      state.statsDetailList = statsDetailList;
    }
  },

  actions: {

    handleStatisticsCount({commit}, {st, et, accountId,taskId}) {
      return new Promise((resolve, reject) => {
        statisticsCount({
          st, et, accountId,taskId
        }).then(res => {
          commit('setStatsCount', res.data.data)
          resolve(res)
        }).catch(err => {
          commit('setStatsCount', 50)
          reject(err)
        })
      })
    },

    handleStatisticsList({commit}, {st,et,page,pageSize,accountId,taskId}) {
      return new Promise((resolve, reject) => {
        statisticsList({st,et,page,pageSize,accountId,taskId}
        ).then(res => {
          commit('setStatsList', res.data.data)
          resolve(res)
        }).catch(err => {
          // var data = [
          //   {
          //     taskId: '123',
          //     st: "2017-08-07 10:02:05",
          //     taskName: '测试任务',
          //     preSend: '200',
          //     send: '180',
          //     sendSuc: 160,
          //     click: '120',
          //     clickUV: '1000',
          //     status: 'ok',
          //     cost: 180,
          //     action: '详情'
          //   },
          //   {
          //     taskId: '123',
          //     st: "2017-08-07 10:02:05",
          //     taskName: '测试任务',
          //     preSend: '200',
          //     send: '180',
          //     sendSuc: 160,
          //     click: '120',
          //     clickUV: '1000',
          //     status: 'ok',
          //     cost: 180,
          //     action: '详情'
          //   },
          //   {
          //     taskId: '123',
          //     st: "2017-08-07 10:02:05",
          //     taskName: '测试任务',
          //     preSend: '200',
          //     send: '180',
          //     sendSuc: 160,
          //     click: '120',
          //     clickUV: '1000',
          //     status: 'ok',
          //     cost: 180,
          //     action: '详情'
          //   },
          //   {
          //     taskId: '123',
          //     st: "2017-08-07 10:02:05",
          //     taskName: '测试任务',
          //     preSend: '200',
          //     send: '180',
          //     sendSuc: 160,
          //     click: '120',
          //     clickUV: '1000',
          //     status: 'ok',
          //     cost: 180,
          //     action: '详情'
          //   },
          // ]
          // commit('setStatsList', data)
          reject(err)
        })
      });
    },
    handleStatisticsDetailCount({commit}, {st, et, accountId}) {
      return new Promise((resolve, reject) => {
        statisticsDetailCount({st, et, accountId}).then(res => {
          commit('setStatsDetailCount', res.data.data)
          resolve()
        }).catch(err => {
          commit('setStatsDetailCount', 50)
          reject(err)
        })
      })
    },

    handleStatisticsDetailList({commit}, {st,et,page,pageSize,accountId}) {
      return new Promise((resolve, reject) => {
        statisticsDetailList({st,et,page,pageSize,accountId}
        ).then(res => {
          commit('setStatsDetailList', res.data.data);
          resolve(res);
        }).catch(err => {
          // var data = [
          //   {
          //     tel: '123',
          //     commitTs: "2017-08-07 10:02:05",
          //     sendTs: '2017-08-07 10:02:05',
          //     taskName: '测试',
          //     mouldTopic: '摸吧',
          //     taskStatus: '成功'
          //   },
          //   {
          //     tel: '123',
          //     commitTs: "2017-08-07 10:02:05",
          //     sendTs: '2017-08-07 10:02:05',
          //     taskName: '测试',
          //     mouldTopic: '摸吧',
          //     taskStatus: '成功'
          //   },
          //   {
          //     tel: '123',
          //     commitTs: "2017-08-07 10:02:05",
          //     sendTs: '2017-08-07 10:02:05',
          //     taskName: '测试',
          //     mouldTopic: '摸吧',
          //     taskStatus: '成功'
          //   },
          //   {
          //     tel: '123',
          //     commitTs: "2017-08-07 10:02:05",
          //     sendTs: '2017-08-07 10:02:05',
          //     taskName: '测试',
          //     mouldTopic: '摸吧',
          //     taskStatus: '成功'
          //   },
          // ]
          // commit('setStatsDetailList', data)
          reject(err)
        })
      })
    },
  }
}
