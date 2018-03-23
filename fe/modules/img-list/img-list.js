Component({
  properties: {
    imgList: {
      type: Array,
      value: []
    },
    canDelete: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    handleDelete (e) {
      const index = e.target && e.target.dataset && e.target.dataset.index
      this.triggerEvent('imgDelete', {
        index
      })
    },
    handleTap (e) {
      const index = e.target && e.target.dataset && e.target.dataset.index
      this.triggerEvent('imgClick', {
        index
      })
    }
  }
})
