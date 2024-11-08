//to ensure values are inputed while creating post
form.addEventListener('submit', function(event) {
    // Clear any previous error messages
    titleErrorError.textContent = '';
    contentErrorError.textContent = '';
    
    successMessage.textContent = ''; // Clear previous success message

    let isValid = true;

    if (titleInput.value.trim() === '') {
        titleError.textContent = 'Please enter a title for your post';
        isValid = false;
    }

    if (contentInput.value.trim() === '') {
        contentError.textContent = 'Your blog post must have a content';
        isValid = false;
    }


    // If all inputs are valid, show success message
    if (isValid) {
        successMessage.textContent = 'Post created successfully';
    }

})

const form = document.getElementById('submitForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting for now
        console.log('Form submitted!'); // Check if form submission is working
    });


//shows the posts on the homepage
    function displayPosts() {
        const postsList = document.getElementById('posts-list');
        const posts = getPost();
    
        postsList.innerHTML = '';
        posts.forEach((post, index) => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post-item';
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <a href="post.html?id=${index}" class="btn">View/Edit</a>
            `
            ;
            postsList.appendChild(postDiv);
        });
    }
    
//to get new posts from local
    function getPosts() {
        return JSON.parse(localStorage.getItem('posts')) || [];
    }


    function editPost(event, postId) {
        event.preventDefault();
    
        const title = document.getElementById('edit-title').value;
        const content = document.getElementById('edit-content').value;
        const image = document.getElementById('edit-image').value;
    
        const posts = getPosts();
        posts[postId] = {title, content, image};

    }

//to create a new post
    const newPosts = {
        title,
        content,
        image,
    };

    function createNewPosts(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const image = document.getElementById('image').value;
    }

//save new posts to local storage
function savePosts(newPost) {
    localStorage.setItem('posts', JSON.stringify(posts));
    posts.push(newPost);
    window.location.href = "index.html";
}

function savePosts(newPost) {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// to edit a post
function displayPost() {
    const postId = new URLSearchParams(window.location.search).get('id');
    const posts = getPosts();
    const post = posts[postId];

    const postContainer = document.getElementById('post-container');
    const editContainer = document.getElementById('edit-container');

    if (post) {
        postContainer.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Post Image">` : ''}
        `;

        document.getElementById('edit-title').value = post.title;
        document.getElementById('edit-content').value = post.content;
        document.getElementById('edit-image').value = post.image;
        document.getElementById('delete-btn').addEventListener('click', (event) => deletePost(postId));
        document.getElementById('edit-form').addEventListener('submit', (event) => editPost(event, postId));
        
        editContainer.style.display = 'block';
    } else {
        postContainer.innerHTML = <p>"Post not found!"</p>;
    }
}