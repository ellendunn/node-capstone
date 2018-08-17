const attachListeners = () => {

	$('#app').on('submit', '#add-app', handlers.handleAppSubmit)
	$('#app').on('click', '.delete', handlers.handleAppDelete) // $('#app').on('click', '.delete', handlers.handleAppDelete) put these in after authentication
	$('#app').on('click', '.edit', handlers.handleGetApp)	// $('#app').on('click', '.edit', handlers.handleGetApp)
	$('#app').on('click', '.save-update', handlers.handleAppUpdate)
	$('#app').on('change', '#statusFilter', handlers.handleFilter)


// NAV BAR LISTENERS
	$('.container').on('click', '#current-apps', handlers.handleGetAllApps)
	$('.container').on('click', '#add-new', render.newAppForm)
	$('#app').on('click', '#add-first', render.newAppForm)
	$('.container').on('click', '#logout', handlers.handleLogOut)
	$('.container').on('click', '#current-jobs', handlers.handleJobsApi)

//LOGIN & REGISTER LISTENERS
	$('#app').on('submit', '#register-form', handlers.handleSubmitNewUser)
	$('#app').on('click', '#take-to-login', render.loginForm)
	$('#app').on('submit', '#login-form', handlers.handleUserLogin)


	$('#app').on('click', '.app-link', handlers.handleAddAppFromApi)
}
