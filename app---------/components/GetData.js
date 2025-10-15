"use client"
import { useState, useEffect } from 'react';

function GetData() {
    
    const [posts, setPosts] = useState(null)
    useEffect(() => {
        async function fetchPosts() {
            let res = await fetch('https://zmapi.zoikomobile.co.uk/api/v1/products')
            let data = await res.json()
            setPosts(data.products.products)
        }
        fetchPosts()
    }, [])

    if (!posts) return <div>Loading...</div>
    console.log(posts);

    return (
    <ul>
        {posts.map((post) => (
        <li key={post.id}>{post.name}, {post.description}, {post.price_uk}, {post.price_usa}</li>
        ))}
    </ul>
    );
}
export default GetData;