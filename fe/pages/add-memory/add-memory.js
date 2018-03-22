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
    const duration = e.detail.src.duration;
    const detail = {
      ...e.detail.src,
      // style: `width: 100rpx;`
      // style: `width: 500rpx;`
      style: `width: ${100 + 400 * duration / 60000}rpx;`,
      dura: `${Math.floor(duration / 1000)}s`,
      play: false
    };

    const recordList = JSON.parse(JSON.stringify(this.data.recordList))
    recordList.push(detail)
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
  handleRecordDelete (e) {
    const index = e.detail.index
    if (index == null) {
      return
    }

    const recordList = JSON.parse(JSON.stringify(this.data.recordList))
    recordList.splice(index, 1)
    this.setData({
      recordList
    })
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
  handleImgDelete (e) {
    const index = e.detail.index
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
    const params = {
      text: this.data.memoryText,
      time: this.data.date,
      imgList: this.data.imgList.filter(img => img.type === 'img'),
      recordList: this.data.recordList,
      videoList: this.data.imgList.filter(img => img.type === 'video')
    };
    // TODO 断言库
    if (params.time === '') {
      params.time = this.data.nowDate
    };

    // TODO 发送文件及params到后端
    console.log(params)
  },
  onLoad () {
    this.setData({
      nowDate: util.formatDate(new Date())
    })
  }
})
