/** @format */

import axios from 'axios'

const { REACT_APP_PORTAL_URL } = process.env;

const http = axios.create({
    baseURL: `${REACT_APP_PORTAL_URL}/v1/`,
    // baseURL: `http://localhost:8000/v1/`,
    // timeout: 1000,
})

http.interceptors.response.use(
  response => response,
  error => {
    // console.log(error);
    if (error.response.status >= 500) {
      console.log(error.message)
    }else{
      console.log(`${error?.response?.status} ${error?.response?.data?.title} \n ${error?.response?.data?.error?.detail}`)
    }
    return Promise.reject(error)
  }
)

export default http