import {warnIf} from '../loggers/throwIf'

class EventCenter {
  constructor() {
    this.eventMap = []
  }

  on(eventName, handler) {
    if (!this.eventMap[eventName]) this.eventMap[eventName] = []

    this.eventMap[eventName].push(handler)
  }

  off(eventName, handler) {
    let events = this.eventMap[eventName]

    // 事件集合不存在
    if (!Array.isArray(events)) return

    let idx = events.indexOf(handler)

    // 对应事件不存在
    if (idx === -1) return

    // 删除事件
    events.splice(idx, 1)
  }

  emit(eventName, ...args) {
    const handler = this.eventMap[eventName]

    warnIf(
      !handler,
      `there are no handler for event [${eventName}]`
    )

    handler && handler(...args)
  }
}

export default EventCenter
