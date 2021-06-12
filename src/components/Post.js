import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import "./Post.css";
import { Link } from "react-router-dom";
import moment from 'moment'


//{(post.timestamp).toDate().toLocaleString("en-IN") } NUll value error
function Post({ postId, post, user ,timestamp}) {

    const [comments, setComments] = useState([]);
    const [likedPosts, setlikedPosts] = useState([]);
    const [comment, setComment] = useState('');
    const [hasMoreComments, setHasMoreComments] = useState(false);
    const icon = document.getElementById(postId);
    useEffect(() => {
		document.title = `Home | KluMedia`;
	}, [])


    useEffect(() => {
        if(postId){
            db.collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot)=>{
                if(snapshot.docs.length > 3){
                    setHasMoreComments(true);
                }
                setComments(snapshot.docs.slice(Math.max(snapshot.docs.length - 3, 0)).map((doc)=>doc.data()));
            });
        }

    }, [postId])

    useEffect(()=> {
        if(postId && user){

            db.collection("users").doc(user.email).collection("likes").onSnapshot((snapshot)=>{
                setlikedPosts(snapshot.docs.map((doc)=>doc.id));
            });

            if(likedPosts.indexOf(postId) >= 0){
                icon.classList.add('fas');
            }
        }
    }, [postId, likedPosts.length, icon, user])

    const changeHeart = () => {
        if(postId && user){
            icon.classList.toggle('fas');

            if(icon.classList.contains('fas')){
                db.collection("users").doc(user.email).collection("likes").doc(postId).set({
                    post: postId
                });
            }else{
                db.collection("users").doc(user.email).collection("likes").doc(postId).delete().then(function() {
                    console.log("Unliked Photo!");
                }).catch(function(error) {
                    console.error("Error unliking: ", error);
                });
            }
        }
    }

    const postComment= (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName || user.email.split('@')[0],
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setComment('');
    }


    const deletePost = () => {
    //delete post
    db.collection("posts")
        .doc(postId)
        .delete()
        .then(function () {
        console.log("Document successfully deleted!");
        })
        .catch(function (error) {
        console.error("Error removing document: ", error);
        });
    };

    function convertTime(date){
		if(moment(date).isSameOrAfter(moment().subtract(1,'days'))) {
			return moment(date).fromNow();
		}
		return moment(date).calendar();
	}


	return post && (
		<div className="post">
			<div className="postHeader">
				<img
					className="avatar"
					src={post.avatar}
					alt={post.username}
					title={post.username}
				/>
				<Link to={`/profile/${post.email}`}><h3 className="postUsername">{post.username}</h3></Link>
                
            <div className="posttimestamp">
                <p style={{ fontSize: "17px" }}> Just {convertTime(new Date(post.timestamp?.toDate()))}</p>
            </div>

		</div>
            
            
            
            
            <Link to={`/post/${postId}`}>
                <img
                    className="postImage"
                    src={post.imageUrl}
                    alt={postId}
                />
            </Link>
            <div className="postInteractionBar">
                <i onClick={changeHeart} id={postId} className="far fa-heart postInteractionItem postHeart "></i>
                <Link to={`/post/${postId}`}>
                    <i className="fas fa-fire-alt postInteractionItem "></i>
                </Link>
                    {user ? ((user.displayName || user.email.split('@')[0]) === post.username ? (<i onClick={deletePost} className="fas fa-trash-alt postInteractionItem"></i> ) : (<></>)) : ( <></> )}

            </div>
                
            <div className="postComments">
                {post.caption &&
                <p className="postCaption">
                    <strong><Link className="commentLink" to={`/profile/${post.email}`}>{post.username}</Link></strong> {post.caption}
                </p>
                }
                {comments.map((comment , i) => (
                    <p key={i} className="postCaption">
                        <strong><Link className="commentLink" to={`/profile/${post.email}`}>{comment.username}</Link></strong> {comment.text}
                    </p>
                ))}
                <Link to={`/post/${postId}`}>
                    {hasMoreComments && <p className="postCaption postMoreComments">See all comments ...</p>}
                </Link>
            </div>
            
            {user ?
            <form className="postCommentsInput">
                <input className="postComment" type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)}/>
                <button className="postCommentButton" type="submit" disabled={!comment} onClick={postComment}> Post </button>
            </form> : 
            ""
            }
		</div>
	);
}

export default Post;

//<p>{`Created on  ${moment(timestamp).format("MMMM Do , h:mma")}`}</p>
