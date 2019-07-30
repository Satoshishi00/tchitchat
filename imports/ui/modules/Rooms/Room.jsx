import React from "react";
import { Link } from "react-router-dom";

const Room = ({ room, userId, remove }) => (
  <div className="rooms-item">
    <Link
      to={{
        pathname: "/room/" + room._id
      }}
      className="rooms-item--name"
    >
      <h5>{room.title}</h5>
    </Link>
    {room.userId === userId && (
      <div className="rooms-item--actions">
        <Link className="btn btn-warning" to={`/rooms/edit/${room._id}`}>
          <i className="fas fa-edit" />
        </Link>
        <button id={room._id} onClick={remove} className="btn btn-danger">
          <i className="fas fa-trash" />
        </button>
      </div>
    )}
  </div>
);

export default Room;
