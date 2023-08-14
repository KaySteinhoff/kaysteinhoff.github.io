function openNav() {
  document.getElementById("sidenavContent").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("sidenavContent").style.width = "0";
  document.getElementById("main").style.marginLeft = "50px";
}

function sendEmail()
{
	document.getElementById("gform").remove();
	document.getElementById("center").appendChild(document.createTextNode("Test"));
}