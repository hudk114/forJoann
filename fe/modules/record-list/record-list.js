// modules/record-fragment/record-fragment.js
/**
 * there should be only one record list in one page
 */
Component({
  properties: {
    recordList: {
      type: Array,
      value: []
    },
    canDelete: {
      type: Boolean,
      value: false
    }
  },
  data: {
    tI: null,
    iAC: null
  },
  methods: {
    setStatus (list, key, status, index) {
      list[index][key] = status
    },
    setAllStatus (list, key, status) {
      list.map(item => {
        item[key] = status
      })
    },
    handleDelete (e) {
      const index = e.target && e.target.dataset && e.target.dataset.index
      this.triggerEvent('recordDelete', {
        index
      })
    },
    handleRecordPlay (e) {
      const index = e.target && e.target.dataset && e.target.dataset.index
      const recordList = JSON.parse(JSON.stringify(this.data.recordList))
      this.setAllStatus(recordList, 'play', false)
      
      if (typeof index !== 'number') {
        return
      }

      if (this.data.iAC) {
        this.data.iAC.stop()
      }

      // 如果当前在放现在的就stop不用接着放
      if (this.data.tI === index) {
        this.setData({
          iAC: null,
          tI: null,
          recordList
        })
        return
      }

      this.setStatus(recordList, 'play', true, index)
      this.setData({
        recordList
      })

      const iAC = wx.createInnerAudioContext()
      iAC.src = this.data.recordList[index].tempFilePath
      iAC.onEnded(() => {
        this.setStatus(recordList, 'play', false, index)
        this.setData({
          iAC: null,
          tI: null,
          recordList
        })
      })
      iAC.onError(() => {
        this.setStatus(recordList, 'play', false, index)
        this.setData({
          iAC: null,
          tI: null,
          recordList
        })
        console.log('error')
      })
      this.setData({
        iAC,
        tI: index
      })
      iAC.play()
    },
    stopRecord () {
      if (!this.data.iAC) {
        return
      }
      this.data.iAC.stop()
    },
    handleRecordStop () {

    }
  }
})
