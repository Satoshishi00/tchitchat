import React from "react";
import { Link } from "react-router-dom";

const Rooms = () => {
  return (
    <div>
      <h1>Rooms</h1>
      <a href="/rooms/add">Créer une room</a>
      <p>Listing des rooms</p>
    </div>
  );
};

export default Rooms;
