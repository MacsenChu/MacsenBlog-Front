import Vue from 'vue'

Vue.filter('dateFormat', originVal => {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + 1 + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.filter('dateFormatToDate', originVal => {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + 1 + '').padStart(2, '0')

  return `${y}-${m}-${d}`
})

Vue.filter('numberOfWords', originVal => {
  if (originVal / 1000 >= 1) {
    return originVal / 1000 + 'k'
  } else {
    return originVal
  }
})

Vue.filter('readingTime', originVal => {
  // 计算阅读时间(一般，人的阅读速度是300-500字/分钟 ，所以就取了个400，这个值可以根据自己的实际需求来更改)
  const readingTime = Math.round(originVal / 400)
  if (readingTime > 1) {
    return readingTime
  } else {
    return 1
  }
})

Vue.filter('countFilter', originVal => {
  if (originVal / 1000000 >= 1) {
    return Math.round(originVal / 1000000 * 100) / 100 + 'M'
  } else if (originVal / 100000 >= 1) {
    return Math.round(originVal / 10000 * 100) / 100 + 'w'
  } else {
    return originVal
  }
})

export default Vue
