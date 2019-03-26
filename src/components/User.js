import React, { Component } from 'react';
import * as firebase from 'firebase';


class User extends Component {
  constructor(props) {
    super(props);

    this.signInWithPopup = this.signInWithPopup(this);
    this.signOutWithPopup = this.signOutWithPopup(this);
}

componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

signInWithPopup() {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider );
}

signOutWithPopup() {
  this.props.firebase.auth().signOut();
}

render() {
  return (
    <div>
      <button onClick={this.signInWithPopup}>
      Sign In
      </button>
      <button onClick={this.signOutWithPopup}>
        Sign Out
      </button>
    </div>
  )
}

}

export default User;
