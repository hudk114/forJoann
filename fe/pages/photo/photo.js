Page({
  data: {
    zero: true,
    first: false,
    second: false
  },
  onLoad: function () {
    this.zero = false
    setTimeout(() => {
      this.setData({
        first: true
      })
    }, 2000)
    setTimeout(() => {
      this.setData({
        second: true
      })
    }, 4000)
  }
})
