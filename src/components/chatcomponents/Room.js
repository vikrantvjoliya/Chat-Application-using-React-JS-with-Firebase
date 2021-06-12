import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import './Room.css'
import firebase from "firebase";


function Room({id, name, addNewRoom, user}) {
    const [messages, setMessages] = useState('');

    useEffect(() => {
        if (id) {
            db.collection('rooms')
            .doc(id).collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => 
                setMessages(snapshot.docs.map((doc) => 
                    doc.data()
                ))
            );
        }
        
    }, [id])
    
    const createRoom = () => {
        const roomName = prompt("Enter a name for the room");
        const rName = prompt("Enter Pass RoomCode  ");
        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                code: rName,
            })
        }
    }

    const deleteRoom = () => {
        //delete post
        
        db.collection("rooms")
            .doc(id)
            .delete()
            .then(function () {
            console.log("Document successfully deleted!");
            })
            .catch(function (error) {
            console.error("Error removing document: ", error);
            });
        };
    



    return !addNewRoom ? (
        <Link to={`/chat/${id}`}>
            <div className="room">
                <img className="avatar" src={`https://avatars.dicebear.com/api/gridy/${id}.svg`} alt={name}/> 
                <h4><i className="fas fa-power-off" onClick={deleteRoom}></i> </h4>

                <div className="roomInfo">
                    <h2>{name}</h2>
                    <p>{messages[0] ? `${(messages[0].user).split(' ')[0]}: ` : ""}{messages[0]?.message}</p>
                    
                </div>
            </div>
        </Link>
        
    ) : (
    <div className="room" onClick={createRoom}>
        <h4>Add New Room  <i className="fas fa-plus-circle"></i> </h4>
        
    </div>
    )
}

export default Room