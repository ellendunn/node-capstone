const render =(() => {

	const newUserForm = () => {

		$('#app').html(
			`<form id='register' method='post' class='col-6'>
				<fieldset>
					<legend>New User Info:</legend>
					<label for='firstName'>First Name: </label>
					<input value='Ellen' name='firstName' id='firstName' type='text' placeholder='Jane'/><br>
					<label for='lastName'>Last Name: </label>
					<input value='Dunn' name='lastName' id='lastName' type='text' placeholder='Doe'/><br>
					<label for='username'>Username: </label>
					<input value='ellendunn' name='username' id='username' type='text' placeholder='janedoe'/><br>
					<label for='password'>Password: </label>
					<input value='password' name='password' id='password' type='text' placeholder='password123' /><br>
					<button type='submit'>Register</button> <br>
					<button type='button' id='take-to-login'>Already have an account?</button>
				</fieldset>
		</form>`)
	}

	const loginForm = () => {
		$('#app').html(
			`<form id='login' method='get' class='col-6'>
				<fieldset>
					<legend>User Info:</legend>
					<label for='username'>Username: </label>
					<input value='ellendunn' name='username' id='username' type='text' placeholder='janedoe'/><br>
					<label for='password'>Password: </label>
					<input value='password' name='password' id='password' type='text' placeholder='password123' /><br>
					<button type='submit'>Sign In</button>
				</fieldset>
			</form>`
		)
	}

	const newAppForm = () => {

		$('#app').html(`<form id='add-app' method='post' class='col-12'>
		<h2>Add a New Application</h2>
		<fieldset name='application'>
			<legend>Application Info</legend>
			<label for='role'>Role: </label>
			<input value='Engineer in Test' placeholder='Junior Developer' type='text' name='role' id='role' required/>
			<br>
			<label for='company'>Company: </label>
			<input value='Apple' placeholder='The Example Biz' type='text' name='company' id='company' required/>
			<br>
			<label for='link'>Link to Job Posting: </label>
			<input placeholder='www.joburl.com' type='text' name='link' id='link' />
			<br>
			<label for='status'>Status: </label>
			<select name='status' id='status'>
				<option value='viewed-app'>Viewed Application</option>
				<option value='applied' selected>Applied</option>
				<option value='interview'>Interviewing</option>
				<option value='follow-up'>Followed Up</option>
				<option value='rejected'>Rejected</option>
				<option value='offer'>Got an Offer!</option>
				<option value='declined-offer'>Declined Offer</option>
			</select>
			<br>
			<fieldset name='contact'>
				<legend>Contact: </legend>
				<label for='name'>Name: </label>
				<input placeholder="Sarah Smith" type='text' name='name' id='name' />
				<br>
				<label for='title'>Title: </label>
				<input placeholder="Project Manager" type='text' name='title' id='title' />
				<br>
				<label for='email'>Email: </label>
				<input placeholder="sarah.smith@job.com" type='email' name='email' id='email' />
				<br>
				<label for='phone'>Phone Number: </label>
				<input placeholder="555-555-1234" type='text' name='phone' id='phone' />
				<br>
			</fieldset>
			<label for='notes'>Notes: </label><br>
			<textarea id='notes' name='notes' rows='10' cols='30' placeholder='Need to follow up!'>
			</textarea>
			<br>
			<input for='date' type='hidden' name='date' id='date' />
				<script type='text/javascript'> document.getElementById('date').value=Date();
				</script>
			<button type='submit'>Add Application</button>
		</fieldset>
	</form>`
	)}

	const applications = () => {

		// let apps = store.applications;
		// if (store.filter) {
		// 	apps = apps.filter(app => app.status = store.filter)
		// }


		const statusObj = {
			'viewed-app': 'Viewed Application',
			'applied': 'Applied',
			'interview': 'Interviewing',
			'follow-up': 'Followed Up',
			'rejected': 'Rejected',
			'offer': 'Got an Offer!',
			'declined-offer': 'Declined Offer'
		}

		$('#app').html(
			`<h1>My Current Applications</h1>
			<label for='statusFilter'>Filter by Status: </label>
				<select name='statusFilter' id='statusFilter'>
					<option value= null> - Choose a status - </option>
					<option value='viewed-app'>Viewed Application</option>
					<option value='applied'>Applied</option>
					<option value='interview'>Interviewing</option>
					<option value='follow-up'>Followed Up</option>
					<option value='rejected'>Rejected</option>
					<option value='offer'>Got an Offer!</option>
					<option value='declined-offer'>Declined Offer</option>
				</select><br>` +

			store.applications.map(applications => {

			const created = applications.created
			const date = created.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$2-$3-$1')

			return `<div class='indiv-app col-4 ${applications.status}' id='${applications.id}'>
								<h3>${applications.role} at ${applications.company}</h3>
								<p>${statusObj[applications.status]}</p>
								<p>Notes: ${applications.notes}
								<p>Created on ${date}</p>
								<button type='button' class='edit'>Edit App</button>
								<button type='button' class='delete'>Delete App</button>
							</div>`
		})
			.join(""));
	};

	const updateAppForm = (application) => {

		if (application.link === undefined) {
			$('link').val('')
		};
		if (application.contacts.name === undefined) {
			application.contacts.name = '';
		};
		if (application.contacts.title === undefined) {
			application.contacts.title = '';
		};
		if (application.contacts.email === undefined) {
			application.contacts.email = '';
		};
		if (application.contacts.phone === undefined) {
			application.contacts.phone = '';
		};

		$('#app').html(`<form data-id='${application.id}' class='update-app' method='post'>
		<h2>Update this Application</h2>
		<fieldset name='application'>
			<legend>Application Info</legend>
			<label for='role'>Role: </label>
			<input value='${application.role}' type='text' name='role' id='role' required/>
			<br>
			<label for='company'>Company: </label>
			<input value='${application.company}' type='text' name='company' id='company' required/>
			<br>
			<label for='link'>Link to Job Posting: </label>
			<input value='${application.link}' type='text' name='link' id='link' />
			<br>
			<label for='status'>Status: </label>
			<select name='status' id='status'>
				<option value='viewed-app'>Viewed Application</option>
				<option value='applied'>Applied</option>
				<option value='interview'>Interviewing</option>
				<option value='follow-up'>Followed Up</option>
				<option value='rejected'>Rejected</option>
				<option value='offer'>Got an Offer!</option>
				<option value='declined-offer'>Declined Offer</option>
			</select>
			<br>
			<fieldset name='contact'>
				<legend>Contact: </legend>
				<label for='name'>Name: </label>
				<input value='${application.contacts.name}' type='text' name='name' id='name' />
				<br>
				<label for='title'>Title: </label>
				<input value='${application.contacts.title}' type='text' name='title' id='title' />
				<br>
				<label for='email'>Email: </label>
				<input value='${application.contacts.email}' type='email' name='email' id='email' />
				<br>
				<label for='phone'>Phone Number: </label>
				<input value='${application.contacts.phone}' type='text' name='phone' id='phone' />
				<br>
			</fieldset>
			<label for='notes'>Notes: </label><br>
			<textarea value='${application.notes}' id='notes' name='notes' rows='10' cols='30'>
			</textarea>
			<br>
			<input for='date' type='hidden' name='date' id='date' />
				<script type='text/javascript'> document.getElementById('date').value=Date();
				</script>
			<button class='save-update' type='button'>Update Application</button>

		</fieldset>
	</form>`
	);

	$(document).ready(function getStatus() {
		$('#status').val(application.status)
	})

}


	return {
		newAppForm,
		applications,
		updateAppForm,
		newUserForm,
		loginForm
	}

})()
