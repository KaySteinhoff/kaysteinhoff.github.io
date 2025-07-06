function extendSidebar()
{
	let sb = document.getElementById("Sidebar");
	if(sb === undefined)
		return;

	sb.style.left = "0px";
	document.body.classList.add("stop-scroll");
}

function retractSidebar()
{
	let sb = document.getElementById("Sidebar");
	if(sb === undefined)
		return;

	sb.style.left = "-100%";
	document.body.classList.remove("stop-scroll");
}
