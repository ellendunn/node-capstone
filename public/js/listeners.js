const attachListeners = (() => () => {

	$('#app').on('submit', '#add-app', handlers.handleAppSubmit)
	$('.collection').on('click', '.delete', handlers.handleAppDelete)
	$('.collection').on('click', '.edit', handlers.handleGetApp)
	$('#app').on('click', '.save-update', handlers.handleAppUpdate)


// NAV BAR LISTENERS
	$('#current-apps').on('click', handlers.handleGetAllApps)
	$('#add-new').on('click', handlers.handleForm)
	}
)()