const attachListeners = (() => () => {

	$('#add-app').submit(handlers.handleAppSubmit)
	$('.collection').on('click', '.delete', handlers.handleAppDelete)

// NAV BAR LISTENERS
	$('#current-apps').on('click', render.applications)
	$('#add-new').on('click', render.form)
	}
)()