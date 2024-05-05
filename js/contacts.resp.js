let overlayCanBeHidden = false;

/**
 * @description This function opens the responsive modal window for adding a new contact by applying transition effects 
 * and displaying the overlay.
 */
function openAddNewContactRespWindow() {
	document.getElementById('addNewContactRespContainer').classList.add('addNewContactRespContainerTransition');
	document.getElementById('addNewContactRespContainer').classList.remove('addNewContactRespContainerTransitionRemove');
	document.querySelector('.overlayResp').style.display = 'flex';
}

/**
 * @description This function closes the responsive modal window for adding a new contact by reversing the transition effects
 *  and hiding the overlay.
 */
function closeAddNewContactRespWindow() {
	document.getElementById('addNewContactRespContainer').classList.add('addNewContactRespContainerTransitionRemove');
	document.getElementById('addNewContactRespContainer').classList.remove('addNewContactRespContainerTransition');
	document.querySelector('.overlayResp').style.display = 'none';
}

/**
 * @description This asynchronous function handles form submission to add a new contact in responsive mode, 
 * validating and collecting input data, creating the contact, refreshing the contact list, closing the modal, 
 * resetting the form values, animating the confirmation, and opening the contact card for the newly added contact.
 * @param {Event} event - The event object provided by the form submission.
*/
async function addNewContactResp(event) {
	event.preventDefault();
	let name = document.querySelector('.nameInputResp').value;
	let email = document.querySelector('.emailInputResp').value;
	let phone = document.querySelector('.phoneInputResp').value;
	await createNewContactDesktop(name, email, phone);
	await initContactlist();
	closeAddNewContactRespWindow();
	cancelInputValueResp();
	animateCloseAddNewContainerMobile();
	openResponsiveContactCardByName(name);
	return false;
}

/**
 * @description Opens the responsive contact card for a specific contact.
 * @param {string} name - The name of the contact to find and open in the responsive contact card view.
 */
function openResponsiveContactCardByName(name) {
	for (let i = 0; i < contacts.length; i++) {
		if (name == contacts[i].name) {
			openContactCardResp(i);
		}
	}
}

/**
 * @description Triggers a closing animation for the new contact container in a mobile view.
 * @description Applies a CSS transition class to initiate an animation, removes it after 1.5 seconds,
 * and updates the display properties of related DOM elements to reflect the change in view.
 */
function animateCloseAddNewContainerMobile() {
	document.querySelector('.createResponseContainerResponsiv').classList.add('createResponseContainerResponsivTransition');
	setTimeout(() => {
		document.querySelector('.createResponseContainerResponsiv').classList.remove('createResponseContainerResponsivTransition');
	}, 1500);
	document.querySelector('#initContacts').style.display = 'none';
	document.querySelector('.contRespWindow').style.display = 'flex';
	document.querySelector('.addNewContactIconContResp').style.display = 'none';
}

/**
 * @description Clears the input fields for adding a new contact in the responsive/mobile version of the interface.
 */
function cancelInputValueResp() {
	document.querySelector('.nameInputResp').value = '';
	document.querySelector('.emailInputResp').value = '';
	document.querySelector('.phoneInputResp').value = '';
}

/**
 * @description Opens the contact card in a responsive view and highlights the edit icon for the selected contact.
 * @description It sets the current contact index for further operations like editing or deleting.
 * @param {number} i - The index of the contact in the contacts array.
 */
function openContactCardResp(i) {
	contactDetailsInResponsiveView(i);
	highlightEditIconInResponsiveMode();
	currentContact = i;
}

/**
 * @description Highlights the edit icon in responsive mode by displaying it and changing its background and border colors after a delay, 
 * but only if the browser width is less than 960 pixels.
 */
function highlightEditIconInResponsiveMode() {
	if (window.innerWidth < 960) {
		document.querySelector('.editContactIconContResp').style.display = 'flex';
	}
	setTimeout(() => {
		document.querySelector('.editContactIconContResp').style.backgroundColor = '#2a3647';
		document.querySelector('.editContactIconContResp').style.border = '#2a3647';
	}, 1000);
}

/**
 * @description Displays contact details in a responsive view by updating the UI elements with specific contact data based on the given index.
 * @param {number} i - Index of the contact in the contacts array whose details are to be displayed.
 */
function contactDetailsInResponsiveView(i) {
	document.querySelector('.inicialCircleRespLetters').innerHTML = contacts[i].capitals;
	document.querySelector('.contactNameTextResp').innerHTML = contacts[i].name;
	document.querySelector('.emailContactResp').innerHTML = contacts[i].email;
	document.querySelector('.phoneContactResp').innerHTML = contacts[i].telefon;
	document.querySelector('.inicialCircleGroundResp').style.backgroundColor = contacts[i].color;
}

/**
 * @description Closes the responsive view of contact details and reverts the display state of related UI elements.
 */
function closeContactDetailsResp() {
	document.querySelector('#initContacts').style.display = 'block';
	document.querySelector('.contRespWindow').style.display = 'none';
	document.querySelector('.addNewContactIconContResp').style.display = 'flex';
	document.querySelector('.editContactIconContResp').style.display = 'none';
	document.querySelector('.editContactRespContainer').classList.add('addNewContactRespContainerTransitionRemove');
	document.querySelector('.editContactRespContainer').classList.remove('addNewContactRespContainerTransition');
}

/**
 * @description Displays the responsive edit contact window with visual transitions and temporary changes to overlay styles.
 */
function editContactRespWindow() {
	overlayCanBeHidden = false;
	document.querySelector('.overlayResp').style.display = 'flex';
	document.querySelector('.overlayResp').style.opacity = 0.3;
	document.querySelector('.editContactIconContResp').style.border = '#29ABE2';
	document.querySelector('.editContSmallContResp').classList.remove('editContSmallContRespTransitionRemove');
	document.querySelector('.editContSmallContResp').classList.add('editContSmallContRespTransition');
	setTimeout(() => {
		document.querySelector('.editContactIconContResp').style.display = 'none';
	}, 350);
}

/**
 * @description Asynchronously deletes a contact from the responsive view, updates the remote storage, refreshes the contact list,
 * closes the contact details view, resets edit styles, and manages overlay visibility.
 */
async function deleteContactResp() {
	contacts.splice(currentContact, 1);
	setItem('contacts', contacts);
	initContactlist();
	closeContactDetailsResp();
	resetEditContactStyleResponsive();
	document.querySelector('.overlayResp').style.display = 'none';
	setTimeout(() => {
		document.querySelector('.editContactIconContResp').style.display = 'none';
	}, 350);
}

function resetEditContactStyleResponsive() {
	editContainerResponsiveTransitionOut();
	document.querySelector('.editContactIconContResp').style.backgroundColor = '#2a3647';
	document.querySelector('.editContactIconContResp').style.border = '#2a3647';
}

/**
 * @description Resets the styles for the edit contact icon container in the responsive view and initiates the transition effect
 * for hiding the edit container.
 * @param {Event} event - The event object provided by the form submission.
 */
async function editContactResp(event) {
	event.preventDefault();
	updateContactInfoResp();
	setItem('contacts', contacts);
	initContactlist();
	closeEditContactRespWindow();
	openContactCard(currentContact);
	editContainerResponsiveTransitionOut();
}

/**
 * @description Applies the transition effect to hide the small edit container in the responsive view by adding 
 * and removing specific CSS classes.
 */
function editContainerResponsiveTransitionOut() {
	document.querySelector('.editContSmallContResp').classList.add('editContSmallContRespTransitionRemove');
	document.querySelector('.editContSmallContResp').classList.remove('editContSmallContRespTransition');
}

/**
 * @description Updates the contact information for the currently selected contact in a responsive design mode, 
 * based on user input from the respective form fields.
 */
function updateContactInfoResp() {
	contacts[currentContact].name = document.querySelector('#nameEditResp').value;
	contacts[currentContact].email = document.querySelector('#emailEditResp').value;
	contacts[currentContact].telefon = document.querySelector('#phoneEditResp').value;
}

/**
 * @description Asynchronously handles the event to delete the currently selected contact in a responsive design mode,
 * updating the remote storage and UI elements appropriately after deletion.
 * @param {Event} event - The event object to prevent default behavior.
 */
async function deleteContactByEditResp(event) {
	event.preventDefault();
	contacts.splice(currentContact, 1);
	setItem('contacts', contacts);
	initContactlist();
	closeEditContactRespWindow();
	closeContactDetailsResp();
	editContainerResponsiveTransitionOut();
}

/**
 * @description Opens the edit contact modal for responsive displays, applying necessary transitions and
 * initializing fields with the current contact's information.
 */
function openEditContactRespWindow() {
	document.querySelector('.overlayResp').style.display = 'flex';
	document.querySelector('.editContactRespContainer').classList.add('addNewContactRespContainerTransition');
	document.querySelector('.editContactRespContainer').classList.remove('addNewContactRespContainerTransitionRemove');
	document.querySelector('.editContSmallContResp').classList.add('editContSmallContRespTransitionRemove');
	document.querySelector('.editContSmallContResp').classList.remove('editContSmallContRespTransition');
	document.querySelector('.contRespWindow').style.display = 'none';
	editFContactDetailsResp();
}

/**
 * @description Populates the editing fields in the responsive contact editing form with the current contact's details
 * and adjusts the UI elements like background color and displayed initials.
 */
function editFContactDetailsResp() {
	document.querySelector('#nameEditResp').value = contacts[currentContact].name;
	document.querySelector('#emailEditResp').value = contacts[currentContact].email;
	document.querySelector('#phoneEditResp').value = contacts[currentContact].telefon;
	document.querySelector('#editContactRespImageSubContainer').style.backgroundColor = contacts[currentContact].color;
	document.querySelector('.editContactRespLetters').innerHTML = contacts[currentContact].capitals;
}

/**
 * @description Closes the responsive edit contact window by hiding the overlay, adjusting CSS transitions,
 * hiding the edit contact icon, and reopening the contact card of the current contact.
 */
function closeEditContactRespWindow() {
	document.querySelector('.overlayResp').style.display = 'none';
	document.querySelector('.editContactRespContainer').classList.add('addNewContactRespContainerTransitionRemove');
	document.querySelector('.editContactRespContainer').classList.remove('addNewContactRespContainerTransition');
	document.querySelector('.editContactIconContResp').style.display = 'none';
	openContactCard(currentContact);
}

/**
 * @description Closes the small edit field in a responsive manner if the window width is less than 960 pixels
 * and the overlay can be hidden, hiding the overlay and adjusting CSS transitions.
 */
function closeSmallEditField() {
	if (window.innerWidth < 960) {
		document.querySelector('.overlayResp').style.display = 'none';
		document.querySelector('.overlayResp').style.opacity = 0.3;
		document.querySelector('.editContSmallContResp').classList.add('editContSmallContRespTransitionRemove');
		document.querySelector('.editContSmallContResp').classList.remove('editContSmallContRespTransition');
		document.querySelector('.editContactIconContResp').style.display = 'flex';
	}
}
