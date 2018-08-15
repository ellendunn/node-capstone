// import swal from 'sweetalert';

const api = (() => {

	const url = window.location.origin ;
	const key = 'AIzaSyC5P9hIVyDKn1KP71Ns9c6Teng6-7lVbGY';
	// const GOOGLE_JOBS_URL = 'https://www.googleapis.com/auth/jobs?key='+ key ;

	const GOOGLE_JOBS_URL = 'https://jobs.googleapis.com/v2/jobs?key=' + key;

	const getGoogleJobs = (query, endpoint) =>
		$.ajax({
			type: 'POST',
			url: GOOGLE_JOBS_URL,
			data: {
				q: query,
				pageSize: 10
			},
			dataType: 'jsonp',
			contentType: 'application/json'
			})
			.then(res => console.log(res))



	const postUser = user =>
		 $.ajax({
			type: 'POST',
			url: url + '/users',
			data: user,
			dataType: 'json',
			contentType: 'application/json'
		})
		.then(res => res)

	const getUserJwt = userCred =>
		$.ajax({
			type: 'POST',
			url: url + '/auth/login',
			data: userCred,
			dataType: 'json',
			contentType: 'application/json'
		})
		.then(res => res)

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
		.then(res => console.log(res))

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
		// swal('Are you sure you want to delete this application?')
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
		getGoogleJobs
	}

})()
