import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form'


class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      name: ''
    };
  this.roomsRef = this.props.firebase.database().ref('rooms');

}

createRoom(e) {
  this.roomsRef.push({
    name: this.state.name
  });
  this.setState({name: ''})
  e.preventDefault();
}

componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) })
       console.log(snapshot.val());
     });
   }

handleChange(e) {
   this.setState({ name: e.target.value })
 }

 handleSubmit(e) {
     if (!this.state.name) { return }
     const newRoom = { name: this.state.name, isCompleted: false };
     this.setState({ name: [...this.state.name, newRoom], newRoomName: '' });
     e.preventDefault();
   }


render() {
  return(
    <div>
      <h2>Chat Rooms</h2>
      <Form id="newChat" center onSubmit={(e) => this.createRoom(e)}>
        <input type="text" value={this.state.name} onChange={ (e) => this.handleChange(e) } />
        <input type="submit" value="Create New Room" />
      </Form>
      <ul>
        {this.state.rooms.map((room) =>
          <ListGroup>
            <ListGroup.Item action><li className="room" key={room.key} onClick = {() => this.props.setRoom(room)}>
              {room.name}
            </li></ListGroup.Item>
          </ListGroup>
        )}
      </ul>


    </div>
  )
 }
}

export default RoomList;
