// import swal from 'sweetalert';

const api = (() => {

	const url = window.location.origin ;

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
			data: token,
			dataType: 'json',
			contentType: 'application/json',
			headers: {
				Authorization: `Bearer ${token}`
			 }
		})
		.then(res => res)

	const getAllUsers = () => {
		return $.getJSON(url + '/users')
		.then(res => console.log(res))
	}

	const getUserApps = (user) =>
		$.getJSON(url + `/applications/${user.id}`)
		.then(res => res)


	const postApp = application =>
	// console.log('api application data', application);
		$.ajax({
			type: 'POST',
			url: url + '/applications',
			data: application,
			dataType: 'json',
			contentType:  'application/json'
		})
		.then(res => res)

	// const getAllApps = () => {
	// 	return $.getJSON(url + '/applications/')
	// 	.then(res => res)
	// }

	const deleteApp = app_id =>
		// swal('Are you sure you want to delete this application?')
		$.ajax({
			type: 'DELETE',
			url: url + `/applications/${app_id}`,
			dataType: 'json',
			contentType:  'application/json'
		})
		.then(res => res)

	const getApp = app_id =>
		$.ajax({
			type: 'GET',
			url: url + `applications/${app_id}`,
			dataType: 'json',
			contentType: 'application/json'
		})
		.then(res => res)

	const updateApp = (app_id, updated) =>
		$.ajax({
			type: 'PUT',
			url: url + `applications/${app_id}`,
			data: updated,
			dataType: 'json',
			contentType: 'application/json'
		})
		.then(res =>  res)

	return{
		postUser,
		getUserJwt,
		getUser,
		getUserApps,
		getAllUsers,
		postApp,
		// getAllApps,
		deleteApp,
		getApp,
		updateApp
	}

})()
