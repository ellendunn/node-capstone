$(() => {

	handlers.handleLogOut()
	attachListeners()

	//this will have to happen once the user is authenticated:
	// api.getAllApps()
	// 	.then(applications => {
	// 		store.loadAllApps(applications);
	// 		render.applications();
	// 		render.navBar();
	// 	})
})

