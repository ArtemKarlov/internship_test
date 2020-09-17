"use strict"

let button = document.getElementById("button-login");
button.addEventListener('click', loginUser);
/*
let buttonLogOut = document.getElementById("button-logout");
buttonLogOut.addEventListener('click', function(e) {
	location.href = "index.html";
});
*/

function postJson(url, json) {
	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: json,
	});
}

function handleResponse(promise) {
	return promise
			.then((response) => { 
					console.log(response);
					if (response.ok) {
						return response.json();
					}
					else {
						showError();
						console.log(response.statusText);
					}
				}
			)
			.catch((error) => console.log(error))
}

function loginUser(e) {

	const url = 'https://us-central1-mercdev-academy.cloudfunctions.net/login';
	const enteredEmail = document.getElementById("login").value;
	const enteredPassword = document.getElementById("password").value;

	let user = {
		email: enteredEmail,
		password: enteredPassword,
	};
	// console.log(user);

	let json = JSON.stringify(user);
	// console.log(json);

	let response = postJson(url, json);

	handleResponse(response)
		.then(
			(userObject) => {
				let accountContainer = document.getElementById("account-div");
				let accountImg = document.createElement('img');
				accountImg.classList.add("account-img");
				let accountName = document.createElement('p');
				accountName.classList.add("account-name");
				
				accountImg.src = userObject.photoUrl;
				accountName.innerHTML = userObject.name;

				accountContainer.prepend(accountName);
				accountContainer.prepend(accountImg);

				showAccount();

				console.log(userObject);
			}
		)
		.catch((error) => console.log(error))
				
	//========================================================================================== 
	// response
	// 	.then(
	// 		(response_result) => {
	// 			console.log(response_result);

	// 			if(response_result.ok) {
	// 				response_result.json()
	// 					.then(
	// 						(userObject) => {
	// 							let accountContainer = document.getElementById("account-div");
	// 							let accountImg = document.createElement('img');
	// 							accountImg.classList.add("account-img");
	// 							let accountName = document.createElement('p');
	// 							accountName.classList.add("account-name");
								
	// 							accountImg.src = userObject.photoUrl;
	// 							accountName.innerHTML = userObject.name;

	// 							accountContainer.prepend(accountName);
	// 							accountContainer.prepend(accountImg);

	// 							// console.log(userObject);
	// 						}
	// 					);
	// 				showAccount();
	// 			}
	// 			else {
	// 				showError();
	// 				console.log(response_result.statusText);
	// 			}
	// 		}
	// 	)
	// 	.catch(
	// 		response_result => console.log(response_result)
	// 	)
	// ========================================================================

	// let xhr = new XMLHttpRequest();
	// xhr.open('POST','https://us-central1-mercdev-academy.cloudfunctions.net/login', true);
	// xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	// xhr.send(json);

	// xhr.onload = function() {
	// 	if (xhr.status == 200) {
	// 		showAccount();
	// 		let user = JSON.parse(xhr.response);

	// 		let accountContainer = document.getElementById("account-div");

	// 		let img = document.createElement('img');
	// 		img.src = user.photoUrl;
	// 		img.className = "account-img";

	// 		let p = document.createElement('p');
	// 		p.className = "account-name";
	// 		p.innerHTML = user.name;

	// 		accountContainer.prepend(p);
	// 		accountContainer.prepend(img);
	// 	} else {
	// 		showError();
	// 	}
	// };
	// xhr.onerror = function() {
	// 	console.log(`network error`);
	// }
	// ==========================================================================
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

