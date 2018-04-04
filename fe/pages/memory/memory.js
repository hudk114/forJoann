// TODO 加入弹窗，可有看图片与播放视频
Page({
  data: {
    imgList: [],
    videoList: [],
    recordList: [],
    date: '2013-2-4',
    memoryText: '没有回忆',
    imgScrollShow: false,
    imgScrollIndex: 0
  },
  handleImgClick (e) {
    const index = e.detail.index
    // const imgList = this.data.imgList
    if (index == null) {
      return
    }

    this.setData({
      imgScrollShow: true,
      imgScrollIndex: index
    })
  },
  handleImgScrollClose () {
    this.setData({
      imgScrollShow: false
    })
  },
  onLoad () {}
})
