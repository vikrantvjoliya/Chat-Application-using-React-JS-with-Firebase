import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import LoginHeader from "./components/LoginHeader";
import Login from "./components/Login";
import Post from "./components/Post";
import SinglePost from "./components/SinglePost";
import Profile from "./components/Profile";
import Upload from "./components/Upload";
import Footer from "./components/Footer";

// Chat Components
import Chat from "./components/chatcomponents/Chat";
import Headerchat from "./components/chatcomponents/Headerchat";

import { db, auth } from "./firebase";
import "./App.css";

import { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";

function App() {
	const [{ user }, dispatch] = useStateValue();

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		db.collection("posts").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
			setPosts(snapshot.docs.map(doc => (
				{
					id: doc.id,
					post: doc.data()
				}
			)))
		})
	}, [])

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, []);


	

	return (
		<div className="App">
			{!user ? (
					<Router>
						<LoginHeader />
						<Login />
						<Footer/>	
					</Router>			
			):(

			<Router>
				<Switch>
					
					<Route exact path="/post/:id">
						<Header />
						<SinglePost />
						{user ?
							<Upload user={user}/> : ""
						}
						<Footer/>
					</Route>
					
					<Route exact path="/profile/:userid">
						<Header />
						<Profile />
						{user ?
							<Upload user={user}/> : ""
						}
						<Footer/>
					</Route>
	
					<Route exact path="/chat">
								<Headerchat />
								<Chat />
								<Footer/>
							</Route>
						<Route exact path="/chat/:id">
								<Headerchat />
								<Chat/>
								<Footer/>
							</Route>
	
					<Route exact path="/home">
						<Header />
						<div className="posts">
							{
								posts.map(({id, post}) => (
									<Post key={id} postId={id} user={user} post={post} />
								))
							}
						</div>
						{user ?
							<Upload user={user}/> : ""
						}	
						<Footer />
					</Route>
					<Route><Redirect to="/home"/></Route>
				</Switch>
			</Router>
			)}

			<div className="filter"></div>
			
		</div>
	);
}

export default App;
//timestamp={posts.timestamp}