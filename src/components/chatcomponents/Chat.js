import React, { useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import Message from './Message';
import Rooms from './Rooms'
import { db } from "../../firebase";
import firebase from 'firebase';
import { useStateValue } from "../../StateProvider";
import './Chat.css'

function Chat() {
    const [message, setMessage] =  useState('');
	const [messages, setMessages] = useState([{}]);
	const { id } = useParams();
	const [roomName, setRoomName] = useState('');
	// eslint-disable-next-line
	const [{user}, dispatch] = useStateValue();

	useEffect(() => {
		document.title = `ChatRoom | KluMedia`;
	}, [])

	useEffect(() => {
		if(id){
			db.collection('rooms').doc(id).onSnapshot(snapshot => (
				setRoomName(snapshot.data().name)
			))

			db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot =>(
				setMessages(snapshot.docs.map(doc => doc.data()))
			))
		}
	},[id])
	
	const sendMessage = (event) => {
		event.preventDefault();
		if(user.displayName){
			db.collection('rooms').doc(id).collection('messages').add(
			{
				message: message,
				user: user.displayName,
				image: user.photoURL,
				timestamp: firebase.firestore.FieldValue.serverTimestamp()
			});
		}else{
			db.collection('rooms').doc(id).collection('messages').add(
			{
				message: message,
				user: user.email,
				image: `https://avatars.dicebear.com/api/gridy/${user.email}.svg`,
				timestamp: firebase.firestore.FieldValue.serverTimestamp()
			});
		}
		setMessage('');
	}

    return (
		<div className="content">
			<Rooms/>
			{id ? 
			<div className="chat">
				<h2 className="welcome">Welcome <img className="avatar" src={user.photoURL || `https://avatars.dicebear.com/api/gridy/${user.email}.svg`} alt={user.displayName} /> 
					{user.displayName || user.email} to {roomName}
				</h2>
				<div className="messages">
					{messages.map((message, id) => (
						<Message key={id} user={user} message={message}/>
					))}
				</div>
				<form className='form'>
					<div className="formcontrol">
						<input className="formmessage" value={message} onChange={event => setMessage(event.target.value)} 
						placeholder="Type a message..."/>
						
						{message ? 
							<button className="formbutton" 
								type='submit' variant="contained" color="primary" onClick={sendMessage}>
									<i className="fas fa-quote-right"></i>
							</button>: ""}
					</div>
				</form>
			</div>
			:
			""}
		</div>
    )
}

export default Chat
