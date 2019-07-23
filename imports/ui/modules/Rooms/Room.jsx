import React from "react";
import { Link } from "react-router-dom";

const Room = ({ room, userId, remove }) => (
  <article style={{ border: "1px solid black" }}>
    <Link to={`/room/${room._id}`}>
      <h3>{room.title}</h3>
    </Link>
    {room.userId === userId && (
      <div>
        <button id={room._id} onClick={remove}>
          Supprimer
        </button>
        <Link to={`/rooms/edit/${room._id}`}>Modifier</Link>
      </div>
    )}
    <div dangerouslySetInnerHTML={{ __html: room.content }} />
  </article>
);

export default Room;
