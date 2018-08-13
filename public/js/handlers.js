const handlers= (() => {

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
				api.getUser(token.authToken)
			})
			.then(handleGetAllApps())
				// render.applications())
				// api.getUserApps(user))
	}

//APPLICATION HANDLERS
	const handleAppSubmit = event => {
		event.preventDefault();
		// const appForm = $(event.currentTarget).find('#add-app');
		let name = $('#name').val();
		let title = $('#title').val();
		let email = $('#email').val();
		let phone = $('#phone').val();

		let role = $('#role').val();
		let company = $('#company').val();
		let link = $('#link').val();
		let status = $('#status').val();
		// let i = document.getElementById('status').selectedIndex;
		// let status = document.getElementById('status').options[i].val;

		let contacts = {name, title, email, phone};
		let notes = $('#notes').val();
		let created = $('#date').val();

		// const newApp = JSON.stringify({
		// 	role, company, link, status, contacts, notes, created
		// })

		const newApp = JSON.stringify({
			role, company, link, status, contacts, notes, created
		});


		// appForm[0].reset();

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

		console.log(updatedApp)

		api.updateApp(id, updatedApp)
			.then((updated) => {
				handleGetAllApps();
				console.log(store)
			})
	}

	const handleGetApp = event => {
		console.log('handle get app');
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
			.then((applications) => {
				store.loadAllApps(applications)
				render.applications()
			})
	}

	return {
		handleSubmitNewUser,
		handleUserLogin,
		handleAppSubmit,
		handleAppDelete,
		handleAppUpdate,
		handleGetApp,
		handleGetAllApps
	}
})()
