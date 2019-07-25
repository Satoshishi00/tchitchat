import React from "react";
import { Link } from "react-router-dom";

const Room = ({ room, userId, remove }) => (
  <article
    style={{ border: "1px solid black", marginBottom: "3px", display: "flex" }}
    className="row"
  >
    <Link to={`/room/${room._id}`} className="col-8">
      <h5 style={{ width: "10em", textAlign: "center" }}>{room.title}</h5>
    </Link>
    {room.userId === userId && (
      <div style={{ right: "0px" }}>
        <Link className="btn btn-warning" to={`/rooms/edit/${room._id}`}>
          <i className="fas fa-edit" />
        </Link>
        <button
          id={room._id}
          style={{ marginLeft: "2em" }}
          onClick={remove}
          className="btn btn-danger"
        >
          <i className="fas fa-trash" />
        </button>
      </div>
    )}
    <div dangerouslySetInnerHTML={{ __html: room.content }} />
  </article>
);

export default Room;
