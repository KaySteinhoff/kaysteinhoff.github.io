const UserType = {
	Schueler: 'Schueler',
	Lehrer: 'Lehrer',
	Admin: 'Admin'
}

class User
{
	constructor(name, type, location)
	{
		this.name = name;
		this.type = type;
		this.location = location;
	}
}

document.addEventListener('DOMContentLoaded', function() {
	var user = JSON.parse(sessionStorage.getItem("user"));

	if(user == null || user.type == UserType.Schueler)//Enable login, disable calling for help
	{
		var helpObj = document.getElementById('callHelp');
		if(helpObj != undefined)
			helpObj.remove();
	}
	if(user != null)
	{
		var loginObj = document.getElementById('login');
		if(loginObj != undefined)
		{
			login.innerHTML = user.name;
			console.log(user.name);
		}
	}
}, false);
