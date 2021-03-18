const postContainer = document.getElementById('post-container');
const loading = document.getElementById('loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// Functions
// 1. To fetch posts from API
async function getPosts() {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
      );

    const data = await res.json();

    return data;
}

// 2. To show posts in DOM
async function showPosts() {
    const posts = await getPosts();

    posts.forEach(post => {
        const postEl = document.createElement("div");
        postEl.classList.add('post');
        postEl.innerHTML = `
                <div class="number">${post.id}</div>
                <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
                </div>
        `;
        postContainer.appendChild(postEl);
    })
}

// 3. To loading the css animation and fetch more posts
function showLoading() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page+=1;
            showPosts();
        }, 300);
    }, 1000);
}

// 4. To filter posts by input
function filterPosts(e) {
    const filterWord = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();
        if (title.indexOf(filterWord) > -1 || body.indexOf(filterWord) > -1) {
            post.style.display = 'flex';
        }
        else {
            post.style.display = 'none';
        }
    });
}


// For loading the initial posts 
showPosts();

// Event Listeners
// 1. Scrolling function
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
        showLoading();
    }
})

// 2. Filter posts through the input
filter.addEventListener('input', filterPosts);