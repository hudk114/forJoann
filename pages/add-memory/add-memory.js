// add-memory.js
Page({
  data: {
    src: ''
  },
  takeRecord() {
    const recorderManager = wx.getRecorderManager()

    recorderManager.onStart(() => {

    })

    const options = {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'aac',
      frameSize: 50
    }
    
    recorderManager.start(options)
  },
  takePic() {
    // TODO use createCameraContext
    const cameraContext = wx.createCameraContext();
    cameraContext.takePhoto({
      quality: 'high',
      success: (res) => {

      },
      fail: (err) => {

      }
    });
  },
  uploadPic() {
    wx.chooseImage({
      success: (res) => {
        console.log('success')
        console.log(res)
      },
      fail: (err) => {
        console.log('err')
        console.log(err)
      },
      complete: (arg) => {
        console.log('complete')
        console.log(arg)
      }
    })
  },
  onLoad() {
    
  }
})