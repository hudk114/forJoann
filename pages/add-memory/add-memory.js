// add-memory.js
const util = require('../../utils/util')

Page({
  data: {
    src: '',
    imgs: [],
    openCamera: false,
    date: '',
    nowDate: '',
    recordShow: false,
    memoryText: '',
    recorderManager: null,
  },
  takeRecord() {
    this.setData({
      recordShow: true,
      recorderManager: wx.getRecorderManager()
    })
  },
  handleRecordClose() {
    this.setData({
      recordShow: false,
      recorderManager: null
    })
  },
  handleRecord() {
    if (this.data.test) {
      this.setData({
        test: false
      })
      this.data.recorderManager.stop()
      return;
    }
    this.data.recorderManager.onStart(() => {

    })
    this.data.recorderManager.onStop((tempFilePath) => {
      console.log(tempFilePath)
    })

    const options = {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'aac',
      frameSize: 50
    }
    
    this.data.recorderManager.start(options)
    this.setData({
      test: true
    })
  },
  takeVideo() {
    wx.chooseVideo({
      success: (res) => {
        console.log(res)
        console.log(res.tempFilePath)
        const imgs = JSON.parse(JSON.stringify(this.data.imgs))
        Array.prototype.push.call(imgs, res.tempFilePaths)
        this.setData({
          imgs
        })
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
  handleDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  handleTextareaChange(e) {
    this.setData({
      memoryText: e.detail.value
    })
  },
  uploadMemory() {
    console.log(this.data.memoryText)
  },
  onLoad() {
    this.setData({
      nowDate: util.formatDate(new Date())
    })
  }
})