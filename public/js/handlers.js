const handlers= (() => {

	const handleErrors = message => {
		swal({
			title: message
		})
	}

//USER & AUTH HANDLERS
	const handleSubmitNewUser = event => {
		event.preventDefault();
		const userData = $( event.currentTarget ).serializeArray();

		const data = userData.reduce((obj, input) => {
			obj[input.name] = input.value
			return obj
		}, {})

		const newUser = JSON.stringify(data)

		api.postUser(newUser)
			.then(user => {
				console.log(user)
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
				render.navBar();
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
	const extractData = appData => {
		const data = appData.reduce((obj, input) => {
			obj[input.name] = input.value
			return obj
		}, {})
		data.contact = {};
		['name', 'title', 'email', 'phone'].forEach(field => {
			data.contact[field] = data[field]
			delete data[field]
		})
		return data
	}

	const handleAppSubmit = event => {
		event.preventDefault();
		const appData = $( event.currentTarget ).serializeArray();
		const extractedData = extractData(appData)
		console.log(extractedData)


		const newApp = JSON.stringify(extractedData);

		api.postApp(newApp)
			.then(newApplication => {
				swal({
					title: `New Application Added!`
				})
				store.addAppToStore(newApplication)
				console.log(newApplication)
				render.applications()
			})
	}

	const handleAppUpdate = event => {
		event.preventDefault();
		const $target = $(event.currentTarget);
		const id = $target.closest('#update-app').data().id;

		const appData = $target.closest('form').serializeArray();
		const extractedData = extractData(appData)
		extractedData.id = id;

		const updatedApp = JSON.stringify(extractedData)

		api.updateApp(id, updatedApp)

			.then((updated) => {
				swal({
					title: `Application updated!`
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
		localStorage.removeItem('location');

		const location = $('#locationSearch').val();
		localStorage.setItem('location', location);

		api.getNewJobs(location)
			.then(jobs => {
					render.openings(jobs, location)
				})
	}

	const handleJobs = (jobs, id) => {
		function isJob(array) {
			return array.id === id
		}

		const viewedJob = jobs.find(isJob);
		console.log(viewedJob)
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
					title: `New Application Added with the status "Viewed App"!`
				})
				store.addAppToStore(newApplication)
			})
	}

	const handleAddAppFromApi = event => {
		const selected = $(event.currentTarget).closest('.indiv-job');
		const _id = selected[0].id
		const location = localStorage.getItem('location');

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
