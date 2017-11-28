import { Vue } from '../'

const hasConsole = typeof console !== 'undefined'

function warn (msg, vm) {
  const trace = ''
  if (Vue.config.warnHandler) {
    Vue.config.warnHandler.call(null, msg, vm, trace)
  } else if (hasConsole && (!Vue.config.silent)) {
    console.error(`[Vue warn]: ${msg}${trace}`)
  }
}

export function handleError (err, vm, info) {
  if (vm) {
    let cur = vm
    while ((cur = cur.$parent)) {
      const hooks = cur.$options.errorCaptured
      if (hooks) {
        for (let i = 0; i < hooks.length; i++) {
          try {
            const capture = hooks[i].call(cur, err, vm, info) === false
            if (capture) return
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook')
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info)
}

function globalHandleError (err, vm, info) {
  if (Vue.config.errorHandler) {
    try {
      return Vue.config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler')
    }
  }
  logError(err, vm, info)
}

function logError (err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(`Error in ${info}: "${err.toString()}"`, vm)
  }
  /* istanbul ignore else */
  if (hasConsole) {
    console.error(err)
  } else {
    throw err
  }
}
