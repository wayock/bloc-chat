import React, { Component } from 'react';



class User extends Component {


componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
      console.log(this.props.user);
    });
  }

signInWithPopup() {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider );
}

signOut() {
  this.props.firebase.auth().signOut();
}


render() {
  return (
    <div>
      <div>
        {this.props.user ? this.props.user.displayName : "Guest"}
      </div>
      <button onClick={() => this.signInWithPopup()}>
      Sign In
      </button>
      <button onClick={() => this.signOut()}>
        Sign Out
      </button>
    </div>
  )
}

}

export default User;
