let currentDraggedElement;
let currCard;

/**
 * sets the value to the id of the dragged element
 * @param {number} id
 */
function startDragging(id) {
	currentDraggedElement = id;
	currCard = document.getElementById(`task${id}`);
	currCard.classList.add('card-drag');
}

/**
 * enables the functionality to drop elements inside the according container
 * @param {Event} ev
 */
function allowDrop(ev) {
	ev.preventDefault();
}

/**
 * sets the cardContainer of the dragged Task to the new value of the container it has been dropped inside
 * saves the changes on server
 * @param {HTMLElement} container
 */
async function moveTo(container) {
	allTasks[currentDraggedElement]['cardContainer'] = container;
	currCard.classList.remove('card-drag');
	await setItem('allTasks', allTasks);
	renderTasksBoard();
}

/**
 * implements hover effects when an element is dragged over
 * @param {number} id
 */
function highlight(id) {
	document.getElementById(id).classList.add('drag-area-highlight');
}

/**
 * removes the highlighting when dragged element is not over the container anymore
 * @param {number} id
 */
function removeHighlight(id) {
	document.getElementById(id).classList.remove('drag-area-highlight');
}

/**
 * toggles the move-to menu on a single card
 * @param {number} taskId
 */
function showMoveToMenu(taskId) {
	currentDraggedElement = taskId;
	let currCardMenu = document.getElementById(`card-menu${taskId}`);
	currCardMenu.classList.toggle('d-none');
}

/**
 * moves the task to the target location
 * @param {string} container
 */
async function clickMoveTo(container) {
	allTasks[currentDraggedElement]['cardContainer'] = container;
	await setItem('allTasks', allTasks);
	renderTasksBoard();
}
