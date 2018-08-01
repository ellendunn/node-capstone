
let MOCK_JOB_APPS = {
	'applications': [
		{
			'id': '11111111',
			'role': 'Junior Developer',
			'company': 'Google',
			'link': 'url.com',
			'status': 'Applied',
			'notes': 'need to follow up!',
			'created': 1470016976609
		},
		{
			'id': '22222222',
			'role': 'Senior Software Engineer',
			'company': 'Amazon',
			'link': 'url.com',
			'status': 'Interviewing',
			'contacts': {
				'name': 'Sarah Adams',
				'email': 'adams.saray@amazon.com',
				'phone': '312-555-1234'
				},
			'created': 1470016976608
		},
		{
			'id': '33333333',
			'role': 'DevOps Engineer',
			'company': 'Thinkful',
			'link': 'url.com',
			'status': 'Visited Application',
			'notes': 'still need to apply',
			'created': 1470016976607
		}
	]
};

//will need to change this to get actual API when it is set
//will instead be making AJAX call to endpoint using jQuery
function getCurrentApps(callback) {
	setTimeout(function() { callback(MOCK_JOB_APPS) }, 100)
}

function displayCurrentApps(data) {
	for (index in data.applications) {
		$('body').append('<p>' + data.applications[index].role + 
			' - ' + data.applications[index].company + '</p>');
	}
}

function getAndDisplayCurrentApps() {
	getCurrentApps(displayCurrentApps)
}

$(getAndDisplayCurrentApps())






