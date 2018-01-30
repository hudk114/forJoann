// modules/record-fragment/record-fragment.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url: {
      type: String,
      value: ''
    },
    // TODO 不应该用index，因为会变化，应该用别的
    index: {
      type: Number,
      value: -1
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
    handleDelete () {
      this.triggerEvent('recordDelete', {
        index: this.data.index
      })
    },
    handleRecordPlay () {
      // notify others stop
      this.triggerEvent('recordPlay', {
        index: this.data.index
      })
      if (!this.data.iAC) {
        this.setData({
          iAC: wx.createInnerAudioContext()
        })
      }
      this.data.iAC.src = this.data.url
      this.data.iAC.onError((err) => {
        console.log(err)
      })
      this.data.iAC.play()
    },
    handleRecordStop () {

    }
  }
})
