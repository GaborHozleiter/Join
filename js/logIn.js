document.addEventListener('DOMContentLoaded', () => {
	handleRememberMe();
	showUserName();

	const loginButton = document.querySelector('.logIn-button');
	if (loginButton) {
		loginButton.addEventListener('click', validateLogin);
	}

	const guestLoginButton = document.getElementById('guestLogIn');
	if (guestLoginButton) {
		guestLoginButton.addEventListener('click', function () {
			const greetingName = document.getElementById('greeting-name');
			if (greetingName) {
				greetingName.textContent = '';
			}
			localStorage.removeItem('userName');
			localStorage.removeItem('email');
			localStorage.removeItem('password');
			localStorage.removeItem('rememberMe');

			window.location.href = '../html/summary.html';
		});
	}
});

/**
 * Extracts the initials from the user's name stored in localStorage and displays them in the specified element.
 */

/**
 * Handles input in the password field and updates the icon based on field content.
 *
 * @param {string} fieldId - The ID of the password input field.
 */
function handlePasswordInput(fieldId) {
	const field = document.getElementById(fieldId);
	const icon = document.getElementById(fieldId + 'Icon');
	icon.src = field.value ? '../img/HidePassword.png' : '../img/Lock.png';
}

/**
 * Toggles the visibility of the password and updates the icon accordingly.
 *
 * @param {string} fieldId - The ID of the password input field.
 * @param {string} iconId - The ID of the icon indicating visibility state.
 */
function togglePasswordVisibility(fieldId, iconId) {
	const field = document.getElementById(fieldId);
	const icon = document.getElementById(iconId);

	if (!field.value) {
		return;
	}

	field.type = field.type === 'password' ? 'text' : 'password';
	icon.src = field.type === 'password' ? '../img/HidePassword.png' : '../img/ShowPassword.png';
}

/**
 * Initiates the validation of the login attempt by retrieving input and checking credentials.
 */
async function validateLogin() {
	const email = getEmailInput();
	const password = getPasswordInput();
	const rememberCheckbox = document.getElementById('rememberMeCheckbox');

	if (!email || !password) {
		setWrongPasswordStyles();
		return;
	}

	handleLoginAttempt(email, password, rememberCheckbox);
}

/**
 * Handles the login attempt by validating user credentials and processing the result.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @param {HTMLElement} rememberCheckbox - The checkbox element.
 */
async function handleLoginAttempt(email, password, rememberCheckbox) {
	try {
		const user = await validateUserCredentials(email, password);
		processLoginResult(user, email, password, rememberCheckbox);
	} catch (error) {
		handleLoginError(error);
	}
}

/**
 * Retrieves and trims the email input value.
 * @returns {string} The trimmed email value.
 */
function getEmailInput() {
	return document.getElementById('email').value.trim();
}

/**
 * Retrieves and trims the password input value.
 * @returns {string} The trimmed password value.
 */
function getPasswordInput() {
	return document.getElementById('password').value.trim();
}

/**
 * Validates user credentials against stored values.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<Object|null>} A user object if credentials are valid, otherwise null.
 */
async function validateUserCredentials(email, password) {
	let users = await getItem('users');
	if (!users) {
		throw new Error('Keine Benutzerdaten gefunden.');
	}
	const user = users.find((user) => user.email === email && user.password === password);
	if (!user) {
		return null;
	}
	return user; // Gibt das ganze User-Objekt zurück
}

/**
 * Processes the result of a login attempt.
 * @param {Object|null} user - The user object returned from credentials validation.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @param {HTMLElement} rememberCheckbox - The remember me checkbox element.
 */
function processLoginResult(user, email, password, rememberCheckbox) {
	if (user) {
		handleSuccessfulLogin(user, email, password, rememberCheckbox);
		window.location.href = '../html/summary.html';
	} else {
		displayWrongPasswordMessage();
	}
}

/**
 * Handles successful login by managing local storage based on remember me checkbox.
 * @param {Object} user - The user object.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @param {HTMLElement} rememberCheckbox - The remember me checkbox element.
 */
function handleSuccessfulLogin(user, email, password, rememberCheckbox) {
	if (rememberCheckbox.checked) {
		localStorage.setItem('email', email);
		localStorage.setItem('password', password);
		localStorage.setItem('rememberMe', 'true');
	} else {
		localStorage.removeItem('email');
		localStorage.removeItem('password');
		localStorage.removeItem('rememberMe');
	}
	localStorage.setItem('userName', user.name);
}

/**
 * Displays the username on the greeting section of the page if available in localStorage.
 * Get the username from localStorage
 * Check if the username exists
 * If username exists, set it as the text content of the greeting section
 */
function showUserName() {
	const userName = localStorage.getItem('userName');
	const greetingName = document.getElementById('greeting-name');

	if (greetingName) {
		greetingName.textContent = userName ? userName : '';
	}
}

document.addEventListener('DOMContentLoaded', showUserName);

/**
 * Handles login errors by logging the error and applying wrong password styles.
 * @param {Error} error - The caught error object.
 */
function handleLoginError(error) {
	console.error('Fehler bei der Anmeldung:', error);
	setWrongPasswordStyles();
}

/**
 * Displays a wrong password message and applies wrong password styles.
 */
function displayWrongPasswordMessage() {
	setWrongPasswordStyles();
	const wrongPwElement = document.querySelector('.wrongPw');
	wrongPwElement.textContent = 'Wrong password! Try again';
}

/**
 * Applies visual feedback for a wrong password attempt.
 */
function setWrongPasswordStyles() {
	const wrongPwElement = document.querySelector('.wrongPw');
	const passwordInput = document.getElementById('password');
	wrongPwElement.style.color = '#FF8190';
	passwordInput.style.border = '1px solid rgb(252, 57, 73)';
}

/**
 * Toggles the checkbox image between checked and unchecked states.
 */
function toggleCheckbox() {
	const checkboxImg = document.getElementById('rememberMeCheckbox');
	if (checkboxImg.src.includes('Checkbox.png')) {
		checkboxImg.src = '../img/CheckboxCheck.png';
	} else {
		checkboxImg.src = '../img/Checkbox.png';
	}
}

/**
 * Removes the box shadow style from the email input field upon user input.
 *
 * @param {HTMLElement} element - The email input field element.
 */
function removeEmailBoxShadow(element) {
	element.style.boxShadow = 'none';
}

/**
 * Handle Remember Me functionality by setting event listeners and prefilling data.
 */
function handleRememberMe() {
	const rememberCheckbox = document.getElementById('rememberMeCheckbox');
	if (!rememberCheckbox) return;

	setupCheckboxListener(rememberCheckbox);
	prefillLoginDataFromStorage(rememberCheckbox);
}

/**
 * Set up event listener for Remember Me checkbox changes.
 * @param {HTMLElement} checkbox - The remember me checkbox element.
 */
function setupCheckboxListener(checkbox) {
	checkbox.addEventListener('change', function () {
		toggleLocalStorage(this.checked);
	});
}

/**
 * Toggle the state of local storage based on checkbox state.
 * @param {boolean} isChecked - State of the checkbox.
 */
function toggleLocalStorage(isChecked) {
	const emailInput = document.getElementById('email').value;
	const passwordInput = document.getElementById('password').value;
	if (isChecked) {
		localStorage.setItem('email', emailInput);
		localStorage.setItem('password', passwordInput);
		localStorage.setItem('rememberMe', 'true');
	} else {
		localStorage.removeItem('email');
		localStorage.removeItem('password');
		localStorage.removeItem('rememberMe');
	}
}

/**
 * Prefill login data from local storage if Remember Me was selected.
 * @param {HTMLElement} checkbox - The remember me checkbox element.
 */
function prefillLoginDataFromStorage(checkbox) {
	const emailInput = document.getElementById('email');
	const passwordInput = document.getElementById('password');
	emailInput.value = localStorage.getItem('email') || '';
	passwordInput.value = localStorage.getItem('password') || '';
	checkbox.checked = true;
}
