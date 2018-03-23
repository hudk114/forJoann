Component({
  data: (() => ({
    oldDisatance: 0,
    scale: 1
  }))(),
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    list: {
      type: Array,
      value: [],
      observer (val) {
        if (val.length <= this.data.index) {
          return
        }
        this.setData({
          img: val[this.data.index].src
        })
      }
    },
    index: {
      type: Number,
      value: 0,
      observer (val) {
        if (val.length <= this.data.index) {
          return
        }
        this.setData({
          img: this.data.list[val].src
        })
      }
    }
  },
  methods: {
    handleClose () {
      this.triggerEvent('close')
    },
    handleTouchmove (e) {
      console.log(e)
      const touches = e.touches
      // TODO 只有双手缩放
      if (touches.length <= 1) {
        return
      }
      const x = touches[1].clientX - touches[0].clientX
      const y = touches[1].clientY - touches[0].clientY
      const distance = Math.sqrt(x * x + y * y)

      // TODO 放大不为1的时候不能滑动
      let distanceDiff = distance - this.data.oldDisatance;
      let newScale = this.data.scale + 0.005 * distanceDiff
      this.setData({
        oldDisatance: distance,
        scale: newScale
      })
    }
  }
})
