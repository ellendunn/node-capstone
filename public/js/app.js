$(() => {

const token = localStorage.getItem('token');

if(token !== null) {
	api.getAllApps()
		.then(applications => {
			store.loadAllApps(applications);
			render.applications();
			render.navBar();
		})
} else{
	render.loginForm()
}

attachListeners()


})
