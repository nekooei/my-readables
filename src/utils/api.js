const BASE_URL = "http://localhost:3001";
const headers = {
    "Authorization": "toumas",
    "Content-Type": "application/json"
};

const uuid = () => `${Date.now()}-${Math.random().toString(36).substr(-8)}`

const getUrl = (route) => `${BASE_URL}${route}`;

export const fetchCategories = () => (
    fetch(getUrl("/categories"), {headers})
      .then(res => res.json())
);

export const addPost = ({title, body, author, category}) => (
    fetch(
        getUrl('/posts'),
        {
            method: "POST",
            headers,
            body: JSON.stringify({
                id: uuid(),
                timestamp: Date.now(),
                author,
                body,
                title,
                category
            })
        }
    ).then(res => res.json())
)

export const deletePost = (id) => (
    fetch(
        getUrl(`/posts/${id}`),
        {
            method: "DELETE",
            headers
        }
    ).then(res => res.json())
)

export const editPost = ({id, title, body}) => (
    fetch(
        getUrl(`/posts/${id}`),
        {
            method: "PUT",
            headers,
            body: JSON.stringify({
                title,
                body
            })
        }
    ).then(res => res.json())
)

export const fetchPosts = (category = null) => {
    const url = category ? `/${category}/posts` : "/posts";
    return fetch(getUrl(url), {headers})
      .then(res => res.json())
}

export const fetchPost = (id) => (
    fetch(getUrl(`/posts/${id}`), {headers})
      .then(res => res.json())
)

export const fetchComments = (id) => (
    fetch(getUrl(`/posts/${id}/comments`), {headers})
      .then(res => res.json())
)

export const addComment = ({ postId, author, body }) => (
    fetch(
        getUrl('/comments'), {
            method: "POST",
            headers,
            body: JSON.stringify({
                id: uuid(),
                timestamp: Date.now(),
                parentId: postId,
                author,
                body
            })
        }
    ).then(res => res.json())
)

export const votePost = ({ id, vote }) => {
    const option = vote === 1 ? "upVote" : "downVote";

    return fetch(
        getUrl(`/posts/${id}`), {
            method: "POST",
            headers,
            body: JSON.stringify({option})
        }
    ).then(res => res.json())
}

export const voteComment = ({ id, vote }) => {
    const option = vote === 1 ? "upVote" : "downVote";

    return fetch(
        getUrl(`/comments/${id}`), {
            method: "POST",
            headers,
            body: JSON.stringify({option})
        }
    ).then(res => res.json())
}

export const editComment = ({ id, body }) => (
    fetch(
        getUrl(`/comments/${id}`), {
            method: "PUT",
            headers,
            body: JSON.stringify({
                timestamp: Date.now(),
                body
            })
        }
    ).then(res => res.json())
)

export const deleteComment = (id) => (
    fetch(
        getUrl(`/comments/${id}`), {
            method: "DELETE",
            headers
        }
    ).then(res => res.json())
)
