import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB4HdEdnb2P8spdAY2nwNP-0wl15hP72Vs",
    authDomain: "bloc-chat-6d653.firebaseapp.com",
    databaseURL: "https://bloc-chat-6d653.firebaseio.com",
    projectId: "bloc-chat-6d653",
    storageBucket: "bloc-chat-6d653.appspot.com",
    messagingSenderId: "773699918126"
  };
  firebase.initializeApp(config);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      activeRoom: ""
    };
  }

  setRoom = (room) => {
    this.setState({
      activeRoom: room.key
    })
    console.log(room);
  }

  setUser = (user) => {
    this.setUser({ user });
    console.log(user);
  }

  render() {
    return (
      <div className="App">
        <aside>
          <RoomList
          firebase = {firebase}
          setRoom={this.setRoom.bind(this)}
          />
        </aside>
        <header>
          < User
          firebase = {firebase}
          />
        </header>
        <main>
          <MessageList
          firebase = {firebase}
          activeRoom={this.state.activeRoom}
          />
        </main>
      </div>
    );
  }
}

export default App;
