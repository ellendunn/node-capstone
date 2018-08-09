$(() => {
	// render.form()
	attachListeners()

	api.getAllApps()
		.then(applications => {
			store.loadAllApps(applications);
			render.applications();
		})
})








