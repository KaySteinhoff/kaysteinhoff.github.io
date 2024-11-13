const githubBlogData = "https://raw.githubusercontent.com/KaySteinhoff/kaysteinhoff.github.io/main/blog/blogData.txt";
let overlayOpen = false;
window.onload = main;
window.onkeyup = (event) => {
	if(!overlayOpen || event.key != "Escape")
		return;
	removeSearchOverlay();
};


function main()
{
	fetchBlogs();
}

function min(a, b)
{
	return a > b ? b : a;
}

function appendBlogToList(blog, list)
{
	var blogItem = document.createElement("a");
	blogItem.text = blog.Title;
	blogItem.href = blog.BlogFile;
	blogItem.classList.add("centerH");
	blogItem.style = "display: inline flex";
	list.appendChild(blogItem);
}

function fetchBlogs()
{
	const blogList = document.getElementById("blogList");
	if(blogList === null)
		return;
	
	fetch(githubBlogData).then(response => {
		if(!response.ok)
		{
			alert("Failed to fetch latest blog posts!");
			return;
		}
		return response.json();
	}).then(data => {
		let blogs = data.blogs.sort(
			(a, b) => new Intl.DateTimeFormat('en-US').format(new Date(a.Date)) - new Intl.DateTimeFormat('en-US').format(new Date(b.Date))
		);
		for (let i = 0; i < min(blogs.length, 5); ++i)
			appendBlogToList(blogs[i], blogList);
	}).catch(e => {
		console.log(e);
	});
}

function similarity(s1, s2) {
	var longer = s1;
	var shorter = s2;
	if (s1.length < s2.length) {
		longer = s2;
		shorter = s1;
	}
	var longerLength = longer.length;
	if (longerLength == 0) {
		return 1.0;
	}
	return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
	s1 = s1.toLowerCase();
	s2 = s2.toLowerCase();
	
	var costs = new Array();
	for (var i = 0; i <= s1.length; i++) {
	var lastValue = i;
	for (var j = 0; j <= s2.length; j++) {
		if (i == 0)
		costs[j] = j;
		else {
		if (j > 0) {
			var newValue = costs[j - 1];
			if (s1.charAt(i - 1) != s2.charAt(j - 1))
			newValue = Math.min(Math.min(newValue, lastValue),
				costs[j]) + 1;
			costs[j - 1] = lastValue;
			lastValue = newValue;
		}
		}
	}
	if (i > 0)
		costs[s2.length] = lastValue;
	}
	return costs[s2.length];
}

async function searchForBlog(title)
{
	let response = await fetch(githubBlogData);
	if(!response.ok)
	{
		alert("Failed to fetch latest blog posts!");
		return;
	}
	let data = await response.json();
	
	let result = [];
	for(let i = 0; i < data.blogs.length; ++i)
	{
		result.push({post: data.blogs[i], prob: similarity(data.blogs[i].Title, title)});
	}
	result.sort((a, b) => b.prob-a.prob);
	return result;
}

function removeSearchOverlay()
{
	var overlay = document.getElementById("searchOverlay");
	if(overlay === null)
	{
		alert("Failed to grab the 'searchOverlay' element although it seems to be instanced! If you have an overlay please reload the page to make it usable again.");
		return;
	}
	overlay.remove();
	overlayOpen = false;
}

function searchBlogs()
{
	overlayOpen = true;
	
	var overlay = document.createElement("div");
	overlay.id = "searchOverlay";
	overlay.style.position = "fixed";
	overlay.style.top = "0";
	overlay.style.left = "0";
	overlay.style.width = "100%";
	overlay.style.height = "100%";
	overlay.style.zIndex = "1000";
	overlay.style.backgroundColor = "#101010A0";
	overlay.onclick = (event) => {
		removeSearchOverlay();
	};
	
	var searchbar = document.createElement("input");
	searchbar.id = "searchSearchbar";
	searchbar.type = "search";
	searchbar.placeholder = "Search here..."
	searchbar.classList.add("center");
	searchbar.onclick = (event) => {
		event.stopPropagation(); // Prevent the overlay from closing when the searchbar is clicked
	};
	searchbar.onkeyup = (event)=>
	{
		var searchbar = document.getElementById("searchSearchbar");
		searchForBlog(searchbar.value).then((posts)=>{
			var sugHol = document.getElementById("suggestionHolder");
			if(sugHol === null)
				return;
			sugHol.textContent = '';
			for(let i = 0; i < posts.length; ++i)
				if(posts[i].prob > 0.2)
					appendBlogToList(posts[i].post, sugHol);
		});
	};
	overlay.appendChild(searchbar);
	
	var suggestionHolder = document.createElement("div");
	suggestionHolder.id = "suggestionHolder";
	suggestionHolder.style.margin.top = "25%";
	overlay.appendChild(suggestionHolder);
	
	document.body.appendChild(overlay);
}
