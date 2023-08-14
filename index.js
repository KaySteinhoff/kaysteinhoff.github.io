function openNav() {
  document.getElementById("sidenavContent").style.width = "250px";
}

function closeNav() {
  document.getElementById("sidenavContent").style.width = "0";
}

function sendEmail()
{
	document.forms[0].submit();
	document.getElementById("submitButton").remove();
	
	document.getElementById("gform").remove();
	
	var text = document.createElement("p");
	text.appendChild(document.createTextNode("Thanks for applying to Marauder's Shadows!"));
	text.classList.add("text");
	text.style.marginLeft="-50px";
	
	document.getElementById("center").appendChild(text);
}