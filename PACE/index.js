function toggleSideBar()
{
	console.log("Lol");
}

function loadDocMd(url)
{
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, false);
	xmlHttp.send(null);

	var html = marked.parse(xmlHttp.responseText).replaceAll('<pre>', '<pre style="background-color: #333; border-radius: 0.5em; padding: 0.5em">');

	var mdViewer = document.getElementById("MarkdownViewer");
	if(mdViewer === undefined)
		return;
	while(mdViewer.firstChild)
		mdViewer.removeChild(mdViewer.firstChild);
	mdViewer.insertAdjacentHTML( "beforeend", html);
}
