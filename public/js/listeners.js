const attachListeners = () => {

	$('#app').on('submit', '#add-app', handlers.handleAppSubmit)
	$('#app').on('click', '.delete', handlers.handleAppDelete) // $('#app').on('click', '.delete', handlers.handleAppDelete) put these in after authentication
	$('#app').on('click', '.edit', handlers.handleGetApp)	// $('#app').on('click', '.edit', handlers.handleGetApp)
	$('#app').on('click', '.save-update', handlers.handleAppUpdate)

// NAV BAR LISTENERS
	$('#app').on('click', '#current-apps', handlers.handleGetAllApps)
	$('#app').on('click', '#add-new', render.newAppForm)
	$('#app').on('click', '#logout', handlers.handleLogOut)
	$('#app').on('change', '#statusFilter', handlers.handleFilter)
	$('#app').on('click', '#current-jobs', handlers.handleGoogleApi)


//LOGIN & REGISTER LISTENERS
	$('#app').on('submit', '#register', handlers.handleSubmitNewUser)
	$('#app').on('click', '#take-to-login', render.loginForm)
	$('#app').on('submit', '#login', handlers.handleUserLogin)

}
