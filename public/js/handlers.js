const handlers= (() => {

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
		let contacts = {name, title, email, phone};
		let notes = $('#notes').val();
		let created = $('#date').val();
				
		// const newApp = JSON.stringify({
		// 	role, company, link, status, contacts, notes, created
		// })

		const newApp = JSON.stringify({
			role, company, link, status, contacts, notes, created
		});

		console.log(newApp);

		// appForm[0].reset();
	
		api.postApp(newApp)
			.then(newApplication => {
				console.log(newApplication)
				store.addToStore(newApplication)
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
				store.deleteFromStore(id);
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

	const handleForm = event => {
		render.form()
	}


	return {
		handleAppSubmit,
		handleAppDelete,
		handleAppUpdate,
		handleGetApp,
		handleGetAllApps,
		handleForm
	}
})()