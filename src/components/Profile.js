import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import { useParams } from 'react-router-dom';
import './Profile.css'
import { useStateValue } from "../StateProvider";
import Post from "./Post";

import LottieAnimation from './Extras/Lottie';
import home from './Extras/Lottie.json';

function Profile() {

    const { userid } = useParams();
    const [posts, setPosts] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
		document.title = `${posts[0]?.post.username} | KluMedia`;
	}, [posts[0]?.post.username])

    useEffect(() => {

        if(userid && userid){
            db.collection("posts").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
                setPosts(snapshot.docs.filter(doc =>(doc.data().email === userid) === true)
                .map( doc => (
                    {
                        id: doc.id,
                        post: doc.data()
                    }
                )))
            })
        }

    }, [userid])

    return (
        <div>
            <div className="profileContainer">
            
                <img className="profileAvatar" src={posts[0]?.post.avatar} alt="avatar"/>
                <LottieAnimation lotti={home} height={100} width={100} />
                    <h2 className="profileName">{posts[0]?.post.username}</h2>
                    <h3 className="profileName">Hey its my profile {posts[0]?.post.bio}</h3> 
                    <h2 className="profileName">{posts[0]?.post.email}</h2>
                
            </div>

            <div className="posts">
                {
                    posts.map(({id, post}) => (
                        <Post key={id} postId={id} user={user} post={post}/>
                    ))
                }
            </div>
            
        </div>
    )
}

export default Profile
