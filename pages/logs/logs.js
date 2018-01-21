// logs.js
const util = require('../../utils/util.js')

Page({ // eslint-disable-line
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => { // eslint-disable-line
        return util.formatTime(new Date(log))
      })
    })
  }
})
