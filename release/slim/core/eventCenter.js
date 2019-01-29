import {warnIf} from '../helpers/throwIf'

let eventMap = {}

const EventCenter = {
  on(eventName, handler) {
    if (!eventMap[eventName]) eventMap[eventName] = []

    eventMap[eventName].push(handler)
  },

  off(eventName, handler) {
    let events = eventMap[eventName]

    // 事件集合不存在
    if (!Array.isArray(events)) return

    let idx = events.indexOf(handler)

    // 对应事件不存在
    if (idx === -1) return

    // 删除事件
    events.splice(idx, 1)
  },

  emit(eventName, ...args) {
    const handler = eventMap[eventName]

    warnIf(
      !handler,
      `there are no handler for event [${eventName}]`
    )

    handler && handler.forEach(h => {
      h(...args)
    })
  }
}

export default EventCenter
