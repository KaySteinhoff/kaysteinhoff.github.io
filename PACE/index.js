function loadDocMd(url)
{
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, false);
	xmlHttp.send(null);

	var html = marked.parse(xmlHttp.responseText);
	
	var mdViewer = document.getElementById("MarkdownViewer");
	if(mdViewer === undefined)
		return;
	
	while(mdViewer.firstChild)
		mdViewer.removeChild(mdViewer.firstChild);
	
	mdViewer.insertAdjacentHTML( "beforeend", html);
	
	var codes = mdViewer.getElementsByTagName("code");
	for(let i = 0; i < codes.length; ++i)
	{
		let CSS = [];
		let backgroundSize = "";
		codes[i].innerText = codes[i].innerText.replaceAll('\t', '    ');
		codes[i].style = "background: " + convertToCSS(findTokens(codes[i].innerText)) + "; background-clip: text; -webkit-background-clip: text; background-repeat: no-repeat; color: transparent; width: 80ch; font-family: monospace; font-size: 20px; line-height: 22px;";
	}
}
