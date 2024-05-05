async function initLegal() {
	let prevPage = document.referrer;
	await includeHTML();
	if (prevPage.includes('logIn.html' || prevPage.includes('signUp.html'))) {
		document.getElementById('menu-items').classList.add('d-none');
		document.getElementById('header-icons').classList.add('d-none');
		document.getElementById('menu-items-resp').classList.add('d-none');
		document.getElementById('menu-bottom').classList.add('d-none');
	} else {
		showUserInitials();
	}
}

function historyBack() {
	window.history.back();
}
