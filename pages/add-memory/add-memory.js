// add-memory.js
Page({
  data: {
    src: '',
    imgs: [],
    openCamera: false
  },
  takeRecord() {
    const recorderManager = wx.getRecorderManager()

    recorderManager.onStart(() => {

    })

    const options = {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'aac',
      frameSize: 50
    }
    
    recorderManager.start(options)
  },
  takeVideo() {
    wx.chooseVideo({
      success: (res) => {
        console.log(res.tempFilePaths)
      },
      fail: (err) => {

      }
    })
  },
  takePhoto() {
    wx.chooseImage({
      success: (res) => {
        const imgs = JSON.parse(JSON.stringify(this.data.imgs))
        Array.prototype.push.apply(imgs, res.tempFilePaths)
        this.setData({
          imgs
        })
      },
      fail: (err) => {
        console.log('err')
        console.log(err)
      }
    })
  },
  handleDelete(e) {
    const index = e.target && e.target.dataset && e.target.dataset.index
    if (index == null) {
      return;
    }
    const imgs = JSON.parse(JSON.stringify(this.data.imgs))
    imgs.splice(index, 1)    
    this.setData({
      imgs
    })
  },
  onLoad() {
    
  }
})