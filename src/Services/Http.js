import axios from 'axios'
import Cookies from 'js-cookie'

const Http = axios.create()

Http.defaults.baseURL = process.env['REACT_APP_API_BASE'] ||
	'http://localhost/api'

Http.interceptors.request.use(request => {
	if (Cookies.get('auth_token')) {
		request.headers['Authorization'] = `bearer ${Cookies.get('auth_token')}`
	}
	return request
}, async error => {
	throw error
})
Http.interceptors.response.use(response => {
	return response
}, async error => {

	if (error.response.status === 401) {
		Cookies.remove('access_token')
	}

	throw error
})

export default Http
