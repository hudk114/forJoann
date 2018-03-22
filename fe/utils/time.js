const CONFIG = {
  sleep: {
    start: 0,
    end: 7,
    msg: '夜深了，该睡啦'
  },
  morning: {
    start: 8,
    end: 11,
    msg: '早上好呀'
  },
  noon: {
    start: 12,
    end: 17,
    msg: '下午好呀'
  },
  night: {
    start: 18,
    end: 24,
    msg: '晚上好呀'
  }
}

const getTime = () => {
  const date = new Date()
  const hour = date.getHours()
  return hour
}

const getType = () => {
  const hour = getTime()
  for (const key in CONFIG) {
    if (CONFIG.hasOwnProperty(key)) {
      if (CONFIG[key].end >= hour && CONFIG[key].start <= hour) {
        return CONFIG[key].msg
      }
    }
  }
  return null
}

module.exports = {
  getType
}