const store = (() => {
	let applications = [];
	let users = [];

	function addUserToStore(newUser) {
		users.push(newUser);
	};

	function addAppToStore(newApp) {
		this.applications.push(newApp);
	};

	function loadAllApps(appData) {
		this.applications = appData.applications
	};

	function deleteAppFromStore(id) {
		this.applications = this.applications.filter(app => app.id != id)
	};

	function updateAppInStore(updatedApp) {
		this.applications = this.applications.map(application => {
				if (application.id == updatedApp.id) {
					Object.assign({}, application, updatedApp);

				} else {
					return application
				}
			});
	}

	let filter = ''
//
	return {
		addUserToStore,
		addAppToStore,
		loadAllApps,
		deleteAppFromStore,
		updateAppInStore,
		applications,
		users,
		filter
	}
})()
