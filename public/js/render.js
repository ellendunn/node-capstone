const render =(() => {

	const newUserForm = () => {

		$('#app').html(
			`<div class = 'user-auth'>
				<form id='register-form' method='post' class='col-6'>
					<fieldset>
						<legend>New User Info:</legend>
						<label for='firstName'>First Name: </label>
						<input value='Ellen' name='firstName' id='firstName' type='text' placeholder='Jane' required/><br>
						<label for='lastName'>Last Name: </label>
						<input value='Dunn' name='lastName' id='lastName' type='text' placeholder='Doe' required/><br>
						<label for='location'>Location (City, State): </label>
						<input value='Chicago, IL' name='location' id='location' type='text' placeholder='Phoenix, AZ' required/><br>
						<label for='username'>Username: </label>
						<input value='ellendunn' name='username' id='username' type='text' placeholder='janedoe' required/><br>
						<label for='password'>Password: </label>
						<input value='password' name='password' id='password' type='password' placeholder='password123' required/><br>
						<button type='submit'>Register</button> <br>
						<button type='button' id='take-to-login'>Already have an account?</button>
					</fieldset>
				</form>
			</div>`)
	}

	const loginForm = () => {
		$('#app').html(
			`<div class = 'user-auth'>
				<form id='login-form' method='get' class='col-6'>
					<fieldset>
						<legend>User Info:</legend>
						<label for='username'>Username: </label>
						<input value='ellendunn' name='username' id='username' type='text' placeholder='janedoe' required/><br>
						<label for='password'>Password: </label>
						<input value='password' name='password' id='password' type='password' placeholder='password123' required /><br>
						<button type='submit'>Sign In</button>
					</fieldset>
				</form>
			</div>`
		)
	}

	const newAppForm = () => {

		$('#app').html(`
			<nav role='navigation' class='nav-bar'>
				<ul>
					<button class='nav-option' type='button' id='add-new'>Add New</button>
					<button class='nav-option' type='button' id='current-apps'>Current Applications</button>
					<button class='nav-option' type='button' id='current-jobs'>Current Openings</button>
					<button class='nav-option' type='button' id='logout'>Log Out</button>
				</ul>
			</nav>
		<form id='add-app' method='post' class='col-8'>
			<h2>Add a New Application</h2>
			<fieldset name='application' id='app-fieldset'>
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
				<fieldset name='contact' id='contact-fieldset'>
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

		$('#app').html(`
			<nav role='navigation' class='nav-bar'>
				<ul>
					<button class='nav-option' type='button' id='add-new'>Add New</button>
					<button class='nav-option' type='button' id='current-apps'>Current Applications</button>
					<button class='nav-option' type='button' id='current-jobs'>Current Openings</button>
					<button class='nav-option' type='button' id='logout'>Log Out</button>
				</ul>
			</nav>
			<form data-id='${application.id}' id='update-app' class='col-8' method='post'>
				<h2>Update this Application</h2>
				<fieldset name='application' id='app-fieldset'>
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
					<fieldset name='contact' id='contact-fieldset'>
						<legend class='contact-legend'>Contact:</legend>
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
			</form>
			</div>`
	);

	$(document).ready(function getStatus() {
		$('#status').val(application.status)
	})

	}

	const applications = () => {

		if (store.applications.length < 1) {
			$('#app').html(`
				<nav role='navigation' class='nav-bar'>
					<ul>
						<button class='nav-option' type='button' id='add-new'>Add New</button>
						<button class='nav-option' type='button' id='current-apps'>Current Applications</button>
						<button class='nav-option' type='button' id='current-jobs'>Current Openings</button>
						<button class='nav-option' type='button' id='logout'>Log Out</button>
					</ul>
				</nav>
				<h1>My Current Applications</h1>
					<label for='statusFilter'>Filter by Status: </label>
						<select name='statusFilter' id='statusFilter'>
							<option value='all'>Show All</option>
							<option value='viewed-app'>Viewed Application</option>
							<option value='applied'>Applied</option>
							<option value='interview'>Interviewing</option>
							<option value='follow-up'>Followed Up</option>
							<option value='rejected'>Rejected</option>
							<option value='offer'>Got an Offer!</option>
							<option value='declined-offer'>Declined Offer</option>
						</select><br>
					<div class='no-apps'>
						<h2>You have no applications yet!</h2>
						<button class='nav-option' type='button' id='add-new'>Add Your First App</button>
					</div>
				`)
		} else {

			let applications = store.applications

			if (store.filter) {
				applications = applications.filter(app => {
					return app.status == store.filter
				})
			}

			console.log(applications)

		$('#app').html(`
			<nav role='navigation' class='nav-bar'>
				<ul>
					<button class='nav-option' type='button' id='add-new'>Add New</button>
					<button class='nav-option' type='button' id='current-apps'>Current Applications</button>
					<button class='nav-option' type='button' id='current-jobs'>Current Openings</button>
					<button class='nav-option' type='button' id='logout'>Log Out</button>
				</ul>
			</nav>
			<h1>My Current Applications</h1>
			<label for='statusFilter'>Filter by Status: </label>
				<select name='statusFilter' id='statusFilter'>
					<option value=''>Show All</option>
					<option value='viewed-app'>Viewed Application</option>
					<option value='applied'>Applied</option>
					<option value='interview'>Interviewing</option>
					<option value='follow-up'>Followed Up</option>
					<option value='rejected'>Rejected</option>
					<option value='offer'>Got an Offer!</option>
					<option value='declined-offer'>Declined Offer</option>
				</select><br>` +

			applications.map(apps => {

			const created = apps.created
			const date = created.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$2-$3-$1')
			const statusObj = {
				'viewed-app': 'Viewed Application',
				'applied': 'Applied',
				'interview': 'Interviewing',
				'follow-up': 'Followed Up',
				'rejected': 'Rejected',
				'offer': 'Got an Offer!',
				'declined-offer': 'Declined Offer'
			}

			return `<div class='indiv-app col-4 ${apps.status}' id='${apps.id}'>
								<h3>${apps.role} at ${apps.company}</h3>
								<p>${statusObj[apps.status]}</p>
								<p>Notes: ${apps.notes}</p>
								<p>Created on ${date}</p>
								<button type='button' class='edit'>Edit App</button>
								<button type='button' class='delete'>Delete App</button>
							</div>`
						})
			.join(""));

			if (applications.length < 1) {
				$('#app').append(`
					<div class='no-apps'>
						<h2>You have no applications with that status</h2>
					</div>
					`)
			}

			$(document).ready(function getStatus() {
				if (store.filter){
					$('#statusFilter').val(store.filter)
				} else {
					$('#statusFilter').val('')
				}
			})
		}
	};


const openings = (jobs) => {
	$('#app').html(`
		<nav role='navigation' class='nav-bar'>
			<ul>
				<button class='nav-option' type='button' id='add-new'>Add New</button>
				<button class='nav-option' type='button' id='current-apps'>Current Applications</button>
				<button class='nav-option' type='button' id='current-jobs'>Current Openings</button>
				<button class='nav-option' type='button' id='logout'>Log Out</button>
			</ul>
		</nav>
		<h1>Current openings in User.Location</h1>` +

		jobs.map(job => {
			return `<div class='indiv-job col-12' id='${job.id}'>
								<h3>${job.title} at ${job.company}</h3>
								<p>${job.location}</p>
								<p>Want to apply?</p>
								<a class='app-link' href='${job.url}' target='_blank'>${job.url}</a>
								<p>Posted on ${job.created_at}</p>
							</div>`
						})
			.join(""));
		}


	return {
		newAppForm,
		applications,
		updateAppForm,
		newUserForm,
		loginForm,
		openings
	}

})()
