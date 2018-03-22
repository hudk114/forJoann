// modules/record-fragment/record-fragment.js
/**
 * there should be only one record list in one page
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recordList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    iAC: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleDelete (e) {
      const index = e.target && e.target.dataset && e.target.dataset.index
      this.triggerEvent('recordDelete', {
        index
      })
    },
    handleRecordPlay (e) {
      const index = e.target && e.target.dataset && e.target.dataset.index
      // console.log(this.data.recordList)
      // console.log(this.data.recordList[index].tempFilePath)

      // TODO 如果当前在放现在的就stop不用接着放
      if (this.data.iAC) {
        this.data.iAC.stop()
      }

      const iAC = wx.createInnerAudioContext()
      iAC.src = this.data.recordList[index].tempFilePath
      iAC.onEnded = () => {
        this.setData({
          iAC: null
        })
      }
      this.setData({
        iAC,
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
