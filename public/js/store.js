const store = (() => {
	let applications = [];
	let users = [];

	function addUserToStore(newUser) {
		users.push(newUser);
		// console.log(`added user ${newUser.firstName} ${newUser.lastName} to the store`)
	};

	function addAppToStore(newApp) {
		this.applications.push(newApp);
		console.log(`added app to the store`)
	};

	function loadAllApps(appData) {
		this.applications = appData.applications
	};

	function deleteAppFromStore(id) {
		this.applications = this.applications.filter(app => app.id != id)
		console.log(`deleted app ${id}`)
	};

	function updateAppInStore(updatedApp) {
		this.applications = this.applications.map(application => {
				if (application.id == updatedApp.id) {
					Object.assign({}, application, updatedApp);
					console.log(updatedApp, application, 'updated and app')

				} else {
					return application
					console.log(application, 'application')
				}
			});

	}


	return {
		addUserToStore,
		addAppToStore,
		loadAllApps,
		deleteAppFromStore,
		updateAppInStore,
		applications
	}
})()
