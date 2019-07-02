import Vue from 'vue'
import axios from 'axios'

const Http = axios.create()

Http.interceptors.request.use(config => {
  return config
})

Http.interceptors.response.use(response => {
  return response
})

export const HttpService = Http
