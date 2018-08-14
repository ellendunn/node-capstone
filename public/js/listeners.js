const attachListeners = () => {

	$('#app').on('submit', '#add-app', handlers.handleAppSubmit)
	$('#app').on('click', '.delete', handlers.handleAppDelete) // $('#app').on('click', '.delete', handlers.handleAppDelete) put these in after authentication
	$('#app').on('click', '.edit', handlers.handleGetApp)	// $('#app').on('click', '.edit', handlers.handleGetApp)
	$('#app').on('click', '.save-update', handlers.handleAppUpdate)

// NAV BAR LISTENERS
	$('#current-apps').on('click', handlers.handleGetAllApps)
	$('#add-new').on('click', render.newAppForm)
	$('#logout').on('click', handlers.handleLogOut)
	$('#app').on('change', '#statusFilter', handlers.handleFilter)


//LOGIN & REGISTER LISTENERS
	$('#app').on('submit', '#register', handlers.handleSubmitNewUser)
	$('#app').on('click', '#take-to-login', render.loginForm)
	$('#app').on('submit', '#login', handlers.handleUserLogin)

}
