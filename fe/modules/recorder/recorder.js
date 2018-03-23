Component({
  data: (() => {
    return {
      recordStart: false,
      recorderManager: null
    }
  })(),
  properties: {
    recorderShow: {
      type: Boolean,
      value: false
    }
  },
  attached () {
    this.setData({
      recorderManager: wx.getRecorderManager()
    })
    this.data.recorderManager.onStop((tempFilePath) => {
      this.triggerEvent('recordOver', {
        src: tempFilePath
      })
    })
  },
  detached () {
    this.setData({
      recorderManager: null
    })
  },
  methods: {
    handleClose () {
      // record start will disable close
      if (this.data.recordStart) {
        return
      }
      this.triggerEvent('close')
    },
    handleNull () {},
    handleRecord () {
      if (this.data.recordStart) {
        this.data.recorderManager.stop()
        this.setData({
          recordStart: false
        })
        this.handleClose()
        return
      }

      const options = {
        format: 'mp3',
        frameSize: 50
      }

      this.data.recorderManager.start(options)
      this.setData({
        recordStart: true
      })
    }
  }
})
