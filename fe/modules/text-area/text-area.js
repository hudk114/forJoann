Component({
  data: (() => {
    return {
      textNum: 0
    }
  })(),
  properties: {
    value: {
      type: String,
      value: ''
    },
    disabled: {
      type: Boolean,
      value: false
    },
    popUp: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    handlerInput (e) {
      this.setData({
        textNum: e.detail.value.length,
        value: e.detail.value
      })
      this.triggerEvent('valueChange', {
        value: e.detail.value
      })
    }
  }
})
