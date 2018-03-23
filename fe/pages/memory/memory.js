// TODO 加入弹窗，可有看图片与播放视频
Page({
  data: {
    imgList: [],
    recordList: [],
    date: '',
    memoryText: ''
  },
  takeRecord () {
    this.setData({
      recorderShow: true
    })
  },
  handleTextareaChange (e) {
    this.setData({
      memoryText: e.detail.value
    })
  },
  onLoad () {}
})
