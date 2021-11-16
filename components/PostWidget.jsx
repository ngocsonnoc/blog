import moment from 'moment'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getRecentPosts, getSimilarPosts } from '../services'
const PostWidget = ({ categories, slug }) => {
    const [relatedPost, setRelatedPost] = useState([])

    useEffect(() => {
        if (slug) {
            getSimilarPosts(categories, slug)
                .then((result) => setRelatedPost(result))
        } else {
            getRecentPosts()
                .then((result) => setRelatedPost(result))
        }

    }, [slug])
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h3 className='text-xl mb-8 font-semibold border pb-4'>
                {slug ? 'Related Post:' : 'Recent Post:'}
            </h3>
            {relatedPost.map((post,index) => (
                <div key={post.title} className='flex items-center w-full mb-4'>
                    <div className='w-16 flex-none'>
                        <img src={post.featuredimage.url} alt={post.title} width='60px' height='60px'
                            className='align-middle rounded-full' />
                    </div>
                    <div className="flex-grow ml-4">
                        <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
                        <Link href={`/post/${post.slug}`} className="text-md" key={index}>{post.title}</Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostWidget
