import service from './axiosMiddleware'

class Http {
  get({url,params={}}) {
    return service.get(url, { params })
  }
  post({url,data={}}) {
    return service.post(url, data)
  }
}
export default new Http()
