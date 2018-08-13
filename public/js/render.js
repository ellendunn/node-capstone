const render =(() => {

	const newUserForm = () => {
		$('.nav-bar').hide()

		$('#user-auth').html(
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
		$('#user-auth').html(
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
		$('.collection').hide();

		$('#app').show().html(`<form id='add-app' method='post' class='col-12'>
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
		$('#app').hide();
		$('#user-auth').hide();

		function setStatus(app) {
			if (app.status === 'viewed-app') {
				return 'Viewed Application'
			}
			if (app.status === 'applied') {
				return 'Applied'
			}
			if (app.status === 'interview') {
				return 'Interviewing'
			}
			if (app.status === 'follow-up') {
				return 'Followed Up'
			}
			if (app.status === 'rejected') {
				return 'Rejected'
			}
			if (app.status === 'offer') {
				return 'Got an Offer!'
			}
			if (app.status === 'declined-offer') {
				return 'Declined Offer'
			}
		}

		$('.nav-bar').show();
		$('.collection').show().html(

			`<h1>My Current Applications</h1>` +
			store.applications.map(applications => {

			return `<div class='indiv-app col-4 ${applications.status}' id='${applications.id}'>
								<h3>${applications.role}</h3>
								<h4>${applications.company}</h4>
								<p>${setStatus(applications)}</p>
								<p>Application created on  ${applications.created}</p>
								<button type='button' class='delete'>Delete App</button>
								<button type='button' class='edit'>Edit App</button>
							</div>`
		})
			.join(""));
	};

	const updateAppForm = (application) => {
		$('.collection').hide();

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

		$('#app').show().html(`<form data-id='${application.id}' class='update-app' method='post'>
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
		console.log(application.status);
		if (application.status === 'viewed-app') {
			$('#status').val('viewed-app')
		}
		if (application.status === 'applied') {
			$('#status').val('applied')
		}
		if (application.status === 'interview') {
			$('#status').val('interview')
		}
		if (application.status === 'follow-up') {
			$('#status').val('follow-up')
		}
		if (application.status === 'rejected') {
			$('#status').val('rejected')
		}
		if (application.status === 'offer') {
			$('#status').val('offer')
		}
		if (application.status === 'declined-offer') {
			$('#status').val('declined-offer')
		}
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
