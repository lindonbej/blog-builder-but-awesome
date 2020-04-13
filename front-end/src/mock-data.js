let mock = [
    {
        id: 2,
        title: "Welcome to Blog Builder!",
        dateCreated: new Date('March 18, 2020 03:24:00'),
        dateUpdated: undefined,
        content: [
            "Blog builder is a tool that lets you build your own simple blog! Read the posts below to see how it works"
        ]
    },
    {
        id: 1,
        title: "How it works",
        dateCreated: new Date('March 16, 2020 02:27:00'),
        dateUpdated: new Date('March 18, 2022 05:59:00'),
        content: [
            "This is the Blog page. Here you will see all of the blog posts that you have created. You can add new posts or edit existing posts by going to the edit page. Posts will appear in the order you create them, most recent first. Feel free to delete these posts once you know what you're doing and then create your own!"
        ]
    },
    {
        id: 0,
        title: "In the future",
        dateCreated: new Date('December 17, 1995 03:24:00'),
        dateUpdated: undefined,
        content: [
            "The Blog Builder is currently incomplete. Every time you reload the website, all your changes will be lost. But in the future, blog builder will have a database so your blog can be saved! It will also have login/authentication capabilities so that only you will be able to edit your posts, and multiple people can host their blog here.",
            "Happy blogging!"
        ]
    }
]

export default mock;