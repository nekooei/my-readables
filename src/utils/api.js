const BASE_URL = "http://localhost:3001";
const headers = {
    "Authorization": "toumas",
    "Content-Type": "application/json"
};

const getUrl = (route) => `${BASE_URL}${route}`;

export const fetchCategories = () => (
    fetch(getUrl("/categories"), {headers})
      .then(res => res.json())
);

export const fetchPosts = (category = null) => {
    const url = category ? `/${category}/posts` : "/posts";
    return fetch(getUrl(url), {headers})
      .then(res => res.json())
};

export const fetchPost = (id) => (
    fetch(getUrl(`/posts/${id}`), {headers})
      .then(res => res.json())
);

export const fetchComments = (id) => (
    fetch(getUrl(`/posts/${id}/comments`), {headers})
      .then(res => res.json())
);

export const votePost = ({ id, vote }) => {
    const option = vote === 1 ? "upVote" : "downVote";

    return fetch(
        getUrl(`/posts/${id}`), {
            method: "POST",
            headers,
            body: JSON.stringify({option})
        }
    ).then(res => res.json())
};

export const voteComment = ({ id, vote }) => {
    const option = vote === 1 ? "upVote" : "downVote";

    return fetch(
        getUrl(`/comments/${id}`), {
            method: "POST",
            headers,
            body: JSON.stringify({option})
        }
    ).then(res => res.json())
};
