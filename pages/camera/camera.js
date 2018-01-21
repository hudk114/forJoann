// camera.js
Page({ // eslint-disable-line
  data: {
    src: ''
  },
  takePhoto () {
    const ctx = wx.createCameraContext() // eslint-disable-line
    console.log(ctx)
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res)
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  onLoad () {
    const f = this.takePhoto
    setTimeout(f, 1000)
  },
  error (e) {
    console.log(e.detail)
  }
})
