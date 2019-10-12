import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron'


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
      activeRoom: "",
      user: ""
    };
  }

  setRoom = (room) => {
    this.setState({
      activeRoom: room
    })
    console.log(room);
  }

  setUser(user){
      this.setState({ user: user });
      console.log(user);
    }

  render() {
    return (

      <div className="App">
        <Jumbotron fluid>
          <h1>Bloc Chat</h1>
          <ion-icon name="chatbubbles"></ion-icon>
          <p>Chat, Learn, Connect.</p>
        </Jumbotron>
        <aside>
          <RoomList
          firebase = {firebase}
          setRoom={this.setRoom.bind(this)}
          />
        </aside>
        <header>
          < User
          firebase = {firebase}
          setUser = {this.setUser.bind(this)}
          user = {this.state.user}
          />
        </header>
        <main>
          <MessageList
          firebase = {firebase}
          activeRoom={this.state.activeRoom}
          user = {this.state.user}
          />
        </main>
      </div>
    );
  }
}

export default App;
