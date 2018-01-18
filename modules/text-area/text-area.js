Component({
  data: (() => {
    return {
      textNum: 0,
    }
  })(),
  methods: {
    handlerInput(e) {
      this.setData({
        textNum: e.detail.value.length
      })
    }
  }
})