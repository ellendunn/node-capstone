const render =(() => {

	const form = () => {
		$('.collection').hide();

		$('#app').html(`<form id='add-app' method='post'>
		<h2>Add a New Application!</h2>
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
				<option value='declined'>'We're going in a different direction'</option>
				<option value='offer'>Got an Offer!</option>
				<option value='accepted'>Turned Down Offer</option>
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
			<textarea name='notes' rows='10' cols='30' placeholder='Need to follow up!'>
			</textarea>	
			<br>
			<input for='date' type='hidden' name='date' id='date' />
				<script type='text/javascript'> document.getElementById('date').value=Date();
				</script>
		</fieldset>
		<button type='submit'>Add Application</button>
	</form>`
	)}

	const applications = () => {
		//this will add the app to the DOM
		$('.collection').show().html(store.applications.map(applications => {

			$('#add-app').hide()
			
			return `<div class='indiv-app' id='${applications.id}'>
								<h3>${applications.role}</h3>
								<h4>${applications.company}</h4>
								<p>${applications.status}</p>
								<p>${applications.created}</p>
								<button type='button' class='delete'>Delete App</button>
							</div>`
		}));
	};

	return {
		applications,
		form
	}

})()