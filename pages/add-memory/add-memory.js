// add-memory.js
const util = require('../../utils/util')

Page({
  data: {
    src: '',
    imgList: [],
    recordList: [],
    openCamera: false,
    date: '',
    nowDate: '',
    recorderShow: false,
    memoryText: ''
  },
  handleRecordLayoutClose () {
    this.setData({
      recorderShow: false
    })
  },
  takeRecord () {
    this.setData({
      recorderShow: true
    })
  },
  handleRecordOver (e) {
    const recordList = JSON.parse(JSON.stringify(this.data.recordList))
    recordList.push(e.detail.src)
    this.setData({
      recordList
    })
  },
  handleRecordPlay (e) {
    const index = e.target && e.target.dataset && e.target.dataset.index
    const iAC = wx.createInnerAudioContext()
    iAC.src = this.data.recordList[index].tempFilePath
    iAC.onError((err) => {
      console.log(err)
    })
    iAC.play()
  },
  takeVideo () {
    wx.chooseVideo({
      success: (res) => {
        console.log(res)
        const imgList = JSON.parse(JSON.stringify(this.data.imgList))
        imgList.push({
          src: res.tempFilePath,
          type: 'video'
        })
        this.setData({
          imgList
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  takePhoto () {
    wx.chooseImage({
      success: (res) => {
        const imgList = JSON.parse(JSON.stringify(this.data.imgList))
        Array.prototype.push.apply(imgList, res.tempFilePaths.map(src => ({
          src,
          type: 'img'
        })))
        this.setData({
          imgList
        })
      },
      fail: (err) => {
        console.log('err')
        console.log(err)
      }
    })
  },
  handleDelete (e) {
    const index = e.target && e.target.dataset && e.target.dataset.index
    if (index == null) {
      return
    }
    const imgList = JSON.parse(JSON.stringify(this.data.imgList))
    imgList.splice(index, 1)
    this.setData({
      imgList
    })
  },
  handleDateChange (e) {
    this.setData({
      date: e.detail.value
    })
  },
  handleTextareaChange (e) {
    this.setData({
      memoryText: e.detail.value
    })
  },
  uploadMemory () {
    console.log(this.data.memoryText)
  },
  onLoad () {
    this.setData({
      nowDate: util.formatDate(new Date())
    })
  }
})
