import React, { Component } from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';


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
  render() {
    return (
      <div className="App">
        <RoomList />
      </div>
    );
  }
}

export default App;
