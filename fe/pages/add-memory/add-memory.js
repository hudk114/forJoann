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
    imgScrollShow: false,
    imgScrollIndex: 0,
    memoryText: '',
    isScroll: true,
    textareaDisabled: false,
    popUp: false
  },
  handleRecordLayoutClose () {
    this.setData({
      isScroll: true,
      popUp: false,
      recorderShow: false
    })
  },
  handleImgScrollClose () {
    this.setData({
      imgScrollShow: false
    })
  },
  takeRecord () {
    this.setData({
      isScroll: false,
      popUp: true,
      recorderShow: true
    })
  },
  handleRecordOver (e) {
    const duration = e.detail.src.duration
    const detail = {
      ...e.detail.src,
      // style: `width: 100rpx;`
      // style: `width: 500rpx;`
      style: `width: ${100 + 400 * duration / 60000}rpx;`,
      dura: `${Math.floor(duration / 1000)}s`,
      play: false
    }

    const recordList = JSON.parse(JSON.stringify(this.data.recordList))
    recordList.push(detail)
    this.setData({
      recordList
    })
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
  handleImgClick (e) {
    const index = e.detail.index
    const imgList = this.data.imgList
    if (index == null) {
      return
    }
    if (imgList[index].type === 'img') {
      // img 开scroll
      // 之前的里面有视频，需要在index中去掉
      let fixedIndex = index;
      for (let i = 0; i < index; i++) {
        if (imgList[i].type === 'video') {
          fixedIndex --;
        }
      }

      this.setData({
        imgScrollShow: true,
        imgScrollIndex: fixedIndex,
        fixedImgList: imgList.filter(item => item.type === 'img')
      })      
    } else {
      // TODO video 开另外的
      
    }
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
    }
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
  },
  onPageScroll () {

  }
})
