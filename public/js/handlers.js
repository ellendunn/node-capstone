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
		let username = $('#username').val();
		let password = $('#password').val();
		const newUser = JSON.stringify({firstName, lastName, username, password})

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
				render.navBar()
				handleGetAllApps()
			})
	}


	const handleLogOut = event => {
		localStorage.removeItem('token');

		$('.container').html(`<h1>[ Trackter ] </h1>
		<p> Organize Your Job Search<p>`)
		render.loginForm();
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
					title: `New Application Added with the status "${newApplication.status}"!`,
					icon: 'success'
				})
				store.addAppToStore(newApplication)
				render.applications()
			})
	}

	const handleAppUpdate = event => {
		event.preventDefault();
		const id = $(event.currentTarget).closest('#update-app').data().id;

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
				swal({
					title: `Application updated!`,
					icon: 'success'
				})
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
		event.preventDefault();
		const location = $('#locationSearch').val();

		api.getNewJobs(location)
			.then(jobs => {
					render.openings(jobs, location)
				})
	}

	const handleJobs = (jobs, id) => {
		function isJob(array) {
			return array.id === id
		}

		const viewedJob = jobs.find(isJob)
		let role = viewedJob.title;
		let company = viewedJob.company;
		let link = viewedJob.url;
		let contact = {
			name: '',
			title: '',
			email: '',
			phone: ''
		}
		let status = 'viewed-app';
		let created = new Date();

		const newApp = JSON.stringify({
			role, company, link, contact, status, created
		});

		api.postApp(newApp)
			.then(newApplication => {
				swal({
					title: `New Application Added with the status "Viewed App"!`,
					icon: 'success'
				})
				store.addAppToStore(newApplication)
			})
	}

	const handleAddAppFromApi = event => {
		const selected = $(event.currentTarget).closest('.indiv-job');
		const _id = selected[0].id
		const location = localStorage.getItem('location')

		api.getNewJobs(location)
		.then(jobs => {
			handleJobs(jobs, _id)
		})

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
		handleErrors,
		handleJobs
	}
})()
