const store = (() => {
	let applications =[]

	function addToStore(newApp) {
		this.applications.push(newApp);
		console.log(`added app to the store`)
	}

	function loadAllApps(appData) {
		this.applications = appData.applications
	}

	function deleteFromStore(id) {
		this.applications = this.applications.filter(app => app.id != id)
		console.log(`deleted app ${id}`)
	}

	function updateInStore(updatedApp) {
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
		addToStore,
		loadAllApps,
		deleteFromStore,
		updateInStore,
		applications
	}
})()