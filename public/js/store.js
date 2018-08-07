const store = (() => {
	let applications =[]

	function addToStore(newApp) {
		this.applications.push(newApp);
	}

	function loadAllApps(appData) {
		this.applications = appData.applications
	}

	function deleteFromStore(id) {
		this.applications = this.applications.filter(app => app.id != id)
		console.log(`deleted app ${id}`)
	}

	return {
		addToStore,
		loadAllApps,
		deleteFromStore,
		applications
	}
})()