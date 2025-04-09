const cRegex = [
	{
		regex: /"(.*?)"/g, //strings
		val: '#FFD658',
		code: 'A'
	},
	{
		regex: /(\d+\.?)/g, // numbers
		val: ' #A7C',
		code: 'B'
	},
	{
		regex: /\b(char|short|int|long|float|double|unsigned|void|const|static|typedef|struct|[^\s]+_t)\b/g, // keywords and types
		val: '#78dce8',
		code: 'C'
	},
	{
		regex: /(\w[A-Za-z0-9_]*)(?=\()/g, // functions
		val: '#a6e22e',
		code: 'D'
	},
	{
		regex: /\b(sizeof|delete|switch|case|if|else|extern|return|for|while|break|continue|include)\b/g, // command
		val: '#E68',
		code: 'E'
	},
	{
		regex: /\b(true|false|NULL|\$)(?=[^\w])/g, // constants
		val: '#ae81ff',
		code: 'F'
	},
	{
		regex: /([\b\s])([!=]=|[!=]==|\+\+|--|&&|\|\|<=|>=|>>|<<|\.\.\.)(?!span)([\b\s\w])/g, // operators
		val: '#f92672',
		code: 'G'
	},
	{
		regex: /(\/\/.*)/g, // single line comment
		val: 'gray',
		code: 'H'
	},
];

const jsRegex = [
   {
       regex: /(\d+\.?)/g, //number
       val: " #A7C",
       code: "A"
   },
   {
       regex: /\b(var|let|const|function|this|do|super|as|constructor|instanceof|default)\b/g, //keyword
       val: "#78dce8",
       code: "D"
   },
   {
       regex: /\b(typeof|try|catch|finally|delete|switch|case|in|of|if|else|import|from|as|export|extends|new|return|throw|for|while|break|continue|async|await)\b/g, //command
       val: "#E68",
       code: "E"
   },
   {
       regex: /\b(true|false|null|undefined|NaN|Infinity|\$)(?=[^\w])/g, //literal
       val: "#ae81ff",
       code: "F"
   },
   {
       regex: /([\b\s])([!=]=|[!=]==|\+\+|--|&&|\|\||!|<=|>=|>>|<<|\.\.\.)(?!span)([\b\s\w])/g, //operator
       val: "#f92672",
       code: "G"
   },
   {
       regex: /\b(window|document|navigator|console|self|top|process|require|module|define|global|Promise|Array|Math|String|Number|Symbol|Function|Reflect|Proxy|Error)\b/g, //global
       val: "#fd971f",
       code: "H"
   },
   {
       regex: /(\w[A-Za-z0-9]*)(?=\()/g, //functions
       val: "#a6e22e",
       code: "I"
   },
   {
       regex: /\b(getElementsBy(TagName|ClassName|Name)|getElementById|(get|set|remove)Attribute|querySelector(|All))(?=[^\w])/g, //DOM
       val: "#7E7",
       code: "J"
   },
      {
       regex: /'(.*?)'/g, //st2
       val: "#FFD658",
       code: "B"
   },
   {
       regex: /(\/\/.*)/g, //sj comment
       val: "lightgrey",
       code: "C"
   },

];

function toggleNavBar()
{
	// To be implemented
}

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
		codes[i].style = "background: " + convertToCSS(findTokens(codes[i].innerText, cRegex), cRegex) + "; background-clip: text; -webkit-background-clip: text; background-repeat: no-repeat; color: transparent; font-family: monospace; ";
	}
}
