let sidebar = document.getElementById("sidebarBody");
let content = document.getElementById("content");

function loadPage(pagePath)
{
	console.log(pagePath);
}

function onSidebarClick()
{
	if(sidebar.style.width )
	{
		sidebar.style.width  = null;
		content.style.marginLeft = null;
	}else{
		sidebar.style.width = "300px";
		content.style.marginLeft = "300px";
	}
}

async function fetchFiles(root, url, parentPath)
{
	var data = await fetch(url).then(res => res.json());
	var arr = data.tree;
	var ul = document.createElement("ul");
	var element;

	root.appendChild(ul); // append the created ul to the root

	arr.forEach(function(item) {
		if (item.type != "blob") { // if it's an array
			element = document.createElement("details");
			ul.appendChild(element);
			var sum = document.createElement("summary");
			var a = document.createElement("a");
			a.appendChild(document.createTextNode(item.path));
			a.href = parentPath + item.path + ".html";
			sum.appendChild(a);
			element.appendChild(sum);
			fetchFiles(element, item.url, parentPath + item.path + "/"); // call arrToUl with the li as the root
			return;
		}

		if(arr.find(node => item.path.replace(".html", "") == node.path && node.type === "tree"))
			return;

		element = document.createElement("li"); // create a new list item
		var a = document.createElement("a");
		a.href = parentPath + item.path;
		a.appendChild(document.createTextNode(item.path.replace(".html", "")));
		element.appendChild(a); // append the text to the li
		ul.appendChild(element); // append the list item to the ul
	});
}

async function buildTree()
{
	var data = await fetch("https://api.github.com/repos/KaySteinhoff/kaysteinhoff.github.io/git/trees/main").then(res => res.json());
	var root = data.tree.find(node => node.path === "docFiles");
	if(root)
		fetchFiles(sidebar, root.url, "");
}

buildTree();
