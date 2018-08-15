const handlers= (() => {

	const handleGoogleApi = event => {

		api.getGoogleJobs()
		// render.openings()
	}

//USER & AUTH HANDLERS
	const handleSubmitNewUser = event => {
		event.preventDefault();

		let firstName = $('#firstName').val();
		let lastName = $('#lastName').val();
		let username = $('#username').val();
		let password = $('#password').val();

		const newUser = JSON.stringify({firstName, lastName, username, password})

		api.postUser(newUser)
			.then(user => {
				store.addUserToStore(user);
				handleGetAllApps() //will need to be based on the user's ID?
			})
	}

	const handleUserLogin = event => {
		event.preventDefault();

		let username = $('#username').val();
		let password = $('#password').val();

		const userCred = JSON.stringify({username, password})

		api.getUserJwt(userCred)
			.then(token => {
				localStorage.setItem('token', token.authToken);
				api.getUser(token.authToken);
				handleGetAllApps()
			})
	}


//APPLICATION HANDLERS
	const handleAppSubmit = event => {
		event.preventDefault();

		let name = $('#name').val();
		let title = $('#title').val();
		let email = $('#email').val();
		let phone = $('#phone').val();

		let role = $('#role').val();
		let company = $('#company').val();
		let link = $('#link').val();
		let status = $('#status').val();
		let contacts = {name, title, email, phone};
		let notes = $('#notes').val();
		let created = $('#date').val();

		const newApp = JSON.stringify({
			role, company, link, status, contacts, notes, created
		});
		console.log(newApp)

		api.postApp(newApp)
			.then(newApplication => {
				store.addAppToStore(newApplication)
				render.applications()
			})
	}

	const handleAppUpdate = event => {
		event.preventDefault();
		const id = $(event.currentTarget).closest('.update-app').data().id;

		let name = $('#name').val();
		let title = $('#title').val();
		let email = $('#email').val();
		let phone = $('#phone').val();

		let role = $('#role').val();
		let company = $('#company').val();
		let link = $('#link').val();
		let status = $('#status').val();

		let contacts = {name, title, email, phone};
		let notes = $('#notes').val();
		let created = $('#date').val();

		const updatedApp = JSON.stringify({
			id, role, company, link, status, contacts, notes, created
		})

		api.updateApp(id, updatedApp)
			.then((updated) => {
				handleGetAllApps();
			})
	}

	const handleGetApp = event => {
		const selected = $(event.currentTarget).closest('.indiv-app');
		const id = selected[0].id;

		api.getApp(id)
			.then((app) => {
				render.updateAppForm(app)
			})
	}

	const handleAppDelete = event => {
		const selected = $(event.currentTarget).closest('.indiv-app');
		const id = selected[0].id;

		api.deleteApp(id)
			.then(()=> {
				store.deleteAppFromStore(id);
				render.applications()
			})
	}

	const handleGetAllApps = event => {
		api.getAllApps()
			.then((apps) => {
				store.loadAllApps(apps)
				render.applications()
			})
	}

	const handleLogOut = event => {
		localStorage.removeItem('token');
		render.newUserForm();
	}

	const handleFilter = event => {
		store.filter = $('#statusFilter').val();
		render.applications()
	}

	return {
		handleGoogleApi,
		handleSubmitNewUser,
		handleUserLogin,
		handleAppSubmit,
		handleAppDelete,
		handleAppUpdate,
		handleGetApp,
		handleGetAllApps,
		handleLogOut,
		handleFilter
	}
})()
