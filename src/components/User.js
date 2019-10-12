import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';


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
    <div id="user">
      <Card className="text-center bg-light">
        <h1> </h1>
        <div>
          {this.props.user ? this.props.user.displayName : "Guest"}
        </div>
        <div>
          {this.props.user ?
            <button onClick={() => this.signOut()}> Sign Out </button>
            :
            <button onClick={() => this.signInWithPopup()}> Sign In </button>}
        </div>
        <h1> </h1>
      </Card>

    </div>
  )
}

}

export default User;
