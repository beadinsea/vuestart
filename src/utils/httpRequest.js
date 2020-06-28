import { ajax } from 'rxjs/ajax'
import { catchError } from 'rxjs/operators'
import { of } from 'rxjs'

import { isError } from './common'

function request(url, options) {
  if (typeof url === 'object') {
    options = url
    url = undefined
  }
  options = options || {}
  const param = paramSetup(options)
  param.url = url || options.url
  const obs$ = ajax(param).pipe(
    catchError((error) => {
      parse(error)
      return of(error)
    })
  )
  obs$.subscribe(options.next || ((next) => console.log('data:', next)), options.err || ((err) => console.log('error:', err)), () => console.log('the end'))
}

function paramSetup(options) {
  const result = {
    method: options.method || 'POST',
    responseType: options.dataType || 'json',
  }
  if (options.xhr) {
    result.headers = { 'X-Requested-With': 'XMLHttpRequest' }
  }
  return result
}

function parse(error) {
  if (error.response) {
    const status = error.response.status
    const data = error.response.data
    if (status === 400) {
      if (data && data.message) {
        return new Error(data.message)
      } else {
        return new Error('Bad request')
      }
    } else if (status === 401) {
      // eventBus.$emit('user.unauthenticated')
      return new Error('Request not authorized.')
    } else if (status === 403) {
      return new Error('Request forbidden.')
    } else if (status === 404) {
      return new Error('Request failed. Request endpoint not found on the server.')
    } else if (status === 500) {
      if (data && data.message) {
        return new Error(data.message)
      } else {
        return new Error('here is an error on the server side. Please try again later.')
      }
    } else {
      return new Error('Request failed. Please try again later.')
    }
  } else if (error.request) {
    // Request was made and no response
    return new Error('Request failed. No response from the server.')
  } else {
    return isError(error) ? error : new Error(error)
  }
}

export { request }
