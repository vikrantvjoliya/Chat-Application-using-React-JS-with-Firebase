import React, { useState, useEffect } from 'react'
import './Rooms.css'
import {db, auth} from '../../firebase'
import Room from './Room';
import cx from "classnames";
import { useStateValue } from '../../StateProvider';

function Rooms() {
    const [rooms, setRooms] = useState([]);
    // eslint-disable-next-line
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        db.collection('rooms').orderBy('name', 'asc').onSnapshot(snapshot => (
			setRooms(snapshot.docs.map( doc => ({
                id: doc.id,
                data: doc.data(),
            }))
        )));
    }, [])

    const handleAuthenticaton = () => {
		if (user) {
			auth.signOut();
		}
	};

    return (
        <div id="rooms" className={cx("rooms","close")}>
            
            <Room addNewRoom />
            {rooms.map(room => (
                <Room key={room.id} id={room.id} name={room.data.name}/>
            ))}
            <div className="placeholder"></div>
        </div>
    )
}

export default Rooms