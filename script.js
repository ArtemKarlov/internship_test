"use strict"

let button = document.getElementById("button-login");
button.addEventListener('click', loginUser);
/*
let buttonLogOut = document.getElementById("button-logout");
buttonLogOut.addEventListener('click', function(e) {
	location.href = "index.html";
});
*/
function loginUser(e) {
	let user = new User();
	let json = JSON.stringify(user);

	let xhr = new XMLHttpRequest();
	xhr.open('POST','https://us-central1-mercdev-academy.cloudfunctions.net/login', true);
	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	xhr.send(json);

	xhr.onload = function() {
		if (xhr.status == 200) {
			showAccount();
			let user = JSON.parse(xhr.response);

			let accountContainer = document.getElementById("account-div");

			let img = document.createElement('img');
			img.src = user.photoUrl;
			img.className = "account-img";

			let p = document.createElement('p');
			p.className = "account-name";
			p.innerHTML = user.name;

			accountContainer.prepend(p);
			accountContainer.prepend(img);
		} else {
			showError();
		}
	};
};

function User() {
	this.email = document.getElementById("login").value;
	this.password = document.getElementById("password").value;
};

function showError() {
	document.getElementById("show").className = "error-login-container";
	document.getElementById("login").className = "error-input-login";
	document.getElementById("password").className = "error-input-login";
	document.getElementById("error-container").style.display = 'block';
	document.getElementById("login").value = "";
	document.getElementById("password").value = "";
};

function showAccount() {
	document.getElementById("show").style.display = 'none';
	document.getElementById("hide").style.display = 'block';
};

