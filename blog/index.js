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
		const sortedBlogs = data.blogs.sort(
			(a, b) => new Intl.DateTimeFormat('en-US').format(new Date(a.Date)) - new Intl.DateTimeFormat('en-US').format(new Date(b.Date))
		);
		console.log(sortedBlogs[0]);
	}).catch(e => {
		console.log(e);
	});
}