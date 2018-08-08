// import swal from 'sweetalert';


const api = (() => {

	const url = window.location.origin + '/applications'

	const postApp = application =>
	// console.log('api application data', application);
		$.ajax({
			type: 'POST',
			url,
			data: application,
			dataType: 'json',
			contentType:  'application/json'
		}) 
		.then(res => res)

	const getAllApps = () => {
		return $.getJSON(url) 
		.then(res => res)
	}

	const deleteApp = app_id => 
		// swal('Are you sure you want to delete this application?')
		$.ajax({
			type: 'DELETE',
			url: url + `/${app_id}`,
			dataType: 'json',
			contentType:  'application/json'
		})
		.then(res => res)
	

	const getApp = app_id => 
		$.ajax({
			type: 'GET',
			url: url + `/${app_id}`,
			dataType: 'json',
			contentType: 'application/json'
		})
		.then(res => res)

	const updateApp = (app_id, updated) => 
		$.ajax({
			type: 'PUT',
			url: url + `/${app_id}`,
			data: updated,
			dataType: 'json',
			contentType: 'application/json'
		})
		.then(res =>  res)
	
	return{
		postApp,
		getAllApps,
		deleteApp,
		getApp,
		updateApp
	}

})()