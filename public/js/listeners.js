const attachListeners = () => {

	$('#app').on('submit', '#add-app', handlers.handleAppSubmit)
	$('.collection').on('click', '.delete', handlers.handleAppDelete) // $('#app').on('click', '.delete', handlers.handleAppDelete) put these in after authentication
	$('.collection').on('click', '.edit', handlers.handleGetApp)	// $('#app').on('click', '.edit', handlers.handleGetApp)
	$('#app').on('click', '.save-update', handlers.handleAppUpdate)

// NAV BAR LISTENERS
	$('#current-apps').on('click', handlers.handleGetAllApps)
	$('#add-new').on('click', render.newAppForm)

//LOGIN & REGISTER LISTENERS
	$('#app').on('submit', '#register', handlers.handleSubmitNewUser)
	$('#app').on('click', '#take-to-login', render.loginForm)
	$('#app').on('submit', '#login', handlers.handleUserLogin)

}
