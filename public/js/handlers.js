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
		let contact = {name, title, email, phone};
		let notes = $('#notes').val();
		let created = $('#date').val();
				
		const newApp = JSON.stringify({
			role, company, link, status, contact, notes, created
		})

		console.log(newApp);

		// appForm[0].reset();
	
		api.postApp(newApp)
			.then(newApplication => {
				store.addToStore(newApplication)
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

	return {
		handleAppSubmit,
		handleAppDelete
	}

})()