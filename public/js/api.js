

const api = (() => {

	const JOBS_SEARCH_URL = 'https://jobs.github.com/';

	const getNewJobs = (query, callback) =>
		$.ajax({
			type: 'GET',
			url: JOBS_SEARCH_URL + 'positions.json',
			data: {
				location: query,
			},
			dataType: 'jsonp',
			contentType: 'application/json',
			})
			.then(res => res)


	const url = window.location.origin ;

	const postUser = user =>
		$.ajax({
			type: 'POST',
			url: url + '/users',
			data: user,
			dataType: 'json',
			contentType: 'application/json'
		})
		.done(res => res)
		.fail(function(error) {
			let errMsg = error.responseJSON.message;
			handlers.handleErrors(errMsg)
		})


	const getUserJwt = userCred =>
		$.ajax({
			type: 'POST',
			url: url + '/auth/login',
			data: userCred,
			dataType: 'json',
			contentType: 'application/json',
		})
		.then(res => res)
		.fail(function(error) {
			handlers.handleErrors('Invalid Username or Password')
		})

	const getUser = token =>
		$.ajax({
			type: 'GET',
			url: url + '/protected',
			dataType: 'json',
			contentType: 'application/json',
			headers: {
				Authorization: `Bearer ${token}`
			 }
		})
		.then(res => res)
		.fail(function(error) {
			let errMsg = error.responseJSON.message;
			handlers.handleErrors(errMsg)
		})

	const getAllUsers = () => {
		return $.getJSON(url + '/users')
		.then(res => res)
	}

	const postApp = application => {
		const token = localStorage.getItem('token');

		return	$.ajax({
			type: 'POST',
			url: url + '/applications',
			data: application,
			dataType: 'json',
			contentType:  'application/json',
			headers: {
				Authorization: `Bearer ${token}`
			 }
		})
		.then(res => res)
	}

	const getAllApps = () => {
		const token = localStorage.getItem('token')

		return $.ajax({
			type: 'GET',
			url: url + '/applications',
			dataType: 'json',
			contentType: 'application/json',
			headers: {
				Authorization: `Bearer ${token}`
			 }
		})
		.then(res => res)
	}

	const deleteApp = app_id => {
		const token = localStorage.getItem('token')

		return $.ajax({
			type: 'DELETE',
			url: url + `/applications/${app_id}`,
			dataType: 'json',
			contentType:  'application/json',
			headers: {
				Authorization: `Bearer ${token}`
			 }
		})
		.then(res => res)
	}

	const getApp = app_id =>{
		const token = localStorage.getItem('token')

		return $.ajax({
			type: 'GET',
			url: url + `/applications/${app_id}`,
			dataType: 'json',
			contentType: 'application/json',
			headers: {
				Authorization: `Bearer ${token}`
			 }
		})
		.then(res => res)
	}

	const updateApp = (app_id, updated) => {
		const token = localStorage.getItem('token')

		return $.ajax({
			type: 'PUT',
			url: url + `/applications/${app_id}`,
			data: updated,
			dataType: 'json',
			contentType: 'application/json',
			headers: {
				Authorization: `Bearer ${token}`
			 }

		})
		.then(res =>  res)
	}

	return{
		postUser,
		getUserJwt,
		getUser,
		getAllUsers,
		postApp,
		getAllApps,
		deleteApp,
		getApp,
		updateApp,
		getNewJobs
		}

})()
