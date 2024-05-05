let submenuActive = false;

function notCloseSidebar(event) {
	if (submenuActive == true) {
		closeSidemenu();
		submenuActive = false;
	} else {
		event.stopPropagation();
		submenuInit();
		submenuActive = true;
	}
}

function closeSidemenu() {
	document.getElementById('submenu').classList.add('submenuTransitionRemove');
	document.getElementById('submenu').classList.remove('submenuTransition');
}

function submenuInit() {
	let submenu = document.getElementById('submenu');
	if (window.innerWidth <= 1100) {
		submenu.innerHTML = '';
		submenu.innerHTML = `
            <div class="submenu">
                <a href="../html/help.html">
                    <div class="submenuItem">
                            <span class="submenuText">Help</span>
                    </div>
                </a>
                <a href="../html/legalNotice.html">
                    <div class="submenuItem">
                        <span class="submenuText">Legal Notice</span>
                    </div>
                </a>    
                <a href="../html/privacyPolicy.html">
                    <div class="submenuItem">
                            <span class="submenuText">Privacy Policy</span>
                        </div>
                </a>  
                <a href="../html/logIn.html">
                    <div class="submenuItem">
                            <span class="submenuText">Log out</span>
                        </div>
                </a>          
            </div>
        `;
	}
	document.getElementById('submenu').classList.add('submenuTransition');
	document.getElementById('submenu').classList.remove('submenuTransitionRemove');
	if (window.innerWidth > 1100) {
		submenu.innerHTML = '';
		submenu.innerHTML = `
            <div class="submenu">
                <a href="../html/legalNotice.html">
                    <div class="submenuItem">
                        <span class="submenuText">Legal Notice</span>
                    </div>
                </a>  
                <a href="../html/privacyPolicy.html">
                    <div class="submenuItem">
                            <span class="submenuText">Privacy Policy</span>
                        </div>
                </a>  
                <a href="../html/logIn.html">
                    <div class="submenuItem">
                            <span class="submenuText">Log out</span>
                        </div>
                </a>    
            </div>
        `;
	}
	document.getElementById('submenu').classList.add('submenuTransition');
	document.getElementById('submenu').classList.remove('submenuTransitionRemove');
}
