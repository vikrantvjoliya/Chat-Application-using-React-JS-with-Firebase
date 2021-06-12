import React, { useRef, useEffect, } from "react";
import moment from 'moment'
import "./Message.css";

const Message = ({ message, user }) => {
	const checkUser = (user.photoURL || `https://avatars.dicebear.com/api/gridy/${user.email}.svg`) === message.image;
	const divRef = useRef(null);

	function convertTime(date){
		if(moment(date).isSameOrAfter(moment().subtract(1,'days'))) {
			return moment(date).fromNow();
		}
		return moment(date).calendar();
	}

	useEffect(() => {
		divRef.current.scrollIntoView({ behavior: 'smooth' });
	}, []);

	return (
		<div ref={divRef} className={`message ${checkUser ? "messageUser" : ""}`}>
			<div className={checkUser ? "userCard" : "otherCard"}>
				<img className="avatar" src={message.image} alt={message.user} title={message.user}/>
				<div className="messageText">
					{message.message}
				</div>
			</div>
			<div className="messageHeader"> {convertTime(new Date(message.timestamp?.toDate()))}</div>
		</div>
	);
}

export default Message;
