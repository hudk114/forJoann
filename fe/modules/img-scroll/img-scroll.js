Component({
  data: (() => {
    
  })(),
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
  }
})
