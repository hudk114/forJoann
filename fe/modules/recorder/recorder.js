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
  created () {
    console.log('create')
  },
  attached () {
    this.setData({
      recorderManager: wx.getRecorderManager()
    })
    this.data.recorderManager.onStop((tempFilePath) => {
      console.log('onstop')
      this.triggerEvent('recordOver', {
        src: tempFilePath
      })
    })
    console.log('attached')
  },
  ready () {
    console.log('ready')
  },
  moved () {
    console.log('moved')
  },
  detached () {
    this.setData({
      recorderManager: null
    })
  },
  methods: {
    handleClose () {
      console.log('123')
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
