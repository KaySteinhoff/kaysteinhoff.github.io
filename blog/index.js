fetchBlogs();

function fetchBlogs()
{
	const githubBlogData = "https://raw.githubusercontent.com/KaySteinhoff/kaysteinhoff.github.io/main/blog/blogData.txt"
	fetch(githubBlogData).then(response => {
		if(!response.ok)
		{
			alert("Failed to fetch latest blog posts!");
			return;
		}
		return response.json();
	}).then(data => {
		console.log(data);
	}).catch(e => {
		console.log(e);
	});
}