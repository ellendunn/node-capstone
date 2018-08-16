const handlers= (() => {

	const handleErrors = message => {
		swal({
			title: message,
			icon: 'warning'
		})
	}

//USER & AUTH HANDLERS
	const handleSubmitNewUser = event => {
		event.preventDefault();

		let firstName = $('#firstName').val();
		let lastName = $('#lastName').val();
		let location = $('#location').val()
		let username = $('#username').val();
		let password = $('#password').val();

		const newUser = JSON.stringify({firstName, lastName, location, username, password})

		localStorage.setItem('location', location)

		api.postUser(newUser)
			.then(user => {
				store.addUserToStore(user);
				render.loginForm()
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

	const handleLogOut = event => {
		localStorage.removeItem('token');
		render.newUserForm();
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

		api.postApp(newApp)
			.then(newApplication => {
				swal({
					title: 'New Application Added!',
					icon: 'success'
				})
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

		swal({
			title: 'Are you sure you want to delete this application?',
			icon: 'warning',
			buttons: true,
  		dangerMode: true
		})
		.then((willDelete) => {
			if (willDelete) {
				api.deleteApp(id)
					.then(()=> {
						store.deleteAppFromStore(id);
						render.applications()
					})
			}
		})
	}

	const handleGetAllApps = event => {
		api.getAllApps()
			.then((apps) => {
				store.loadAllApps(apps)
				render.applications()
			})
	}

	const handleFilter = event => {
		store.filter = $('#statusFilter').val();
		render.applications()
	}

	const handleJobsApi = event => {

		api.getUserLocation(id)

		api.getNewJobs('chicago')
			.then(jobs => render.openings(jobs))
	}

	const handleAddAppFromApi = event => {
		const selected = $(event.currentTarget).closest('.indiv-job');
		const id = selected[0].id
		console.log(id)
	}

	return {
		handleJobsApi,
		handleSubmitNewUser,
		handleUserLogin,
		handleAppSubmit,
		handleAppDelete,
		handleAppUpdate,
		handleGetApp,
		handleGetAllApps,
		handleLogOut,
		handleFilter,
		handleAddAppFromApi,
		handleErrors
	}
})()
