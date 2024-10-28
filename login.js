var userLocation;

function enableUserInfo()
{
	document.getElementById('userInfo').removeAttribute('hidden');
	document.getElementById('userLocationColumn').setAttribute('hidden', 'hidden');
}

function populateUser()
{
	var nameObj = document.getElementById('userName');
	if(nameObj === undefined)
	{
		console.log("Failed to fetch username field!");
		return;
	}
	if(nameObj.value != "Tom" && nameObj.value != "TeacherTobe" && nameObj.value != "Admin")
	{
		console.log("Dieser User exsistiert nicht!");
		return;
	}
	var u = new User(nameObj.value, nameObj.value == "Admin" ? UserType.Admin : nameObj.value == "TeacherTobe" ? UserType.Lehrer : UserType.Schueler, location);
	sessionStorage.setItem("user", JSON.stringify(u));
}
