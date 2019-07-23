import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Fields from "./Fields";
import { Meteor } from "meteor/meteor";

const RoomsAdd = ({ rooms }) => {
  const [room_name, setRoomName] = useState("");

  const update = useCallback(
    (e, { room_name, value }) => {
      if (room_name) {
        setRoomName(value);
      }
    },
    [setRoomName]
  );

  const addRoom = useCallback(() => {
    Meteor.call("rooms.create", { room_name }, err => {
      if (err) console.log(err);
      else rooms.push("/rooms");
    });
  }, [room_name, rooms]);

  return (
    <div>
      <h1>Créer un nouveau salon</h1>
      <a href="/rooms">Liste des salons</a>
      <form>
        <Fields
          update={update}
          state={{
            room_name
          }}
        />
        <button className="btn btn-primary" onClick={addRoom}>
          Build Room
        </button>
      </form>
    </div>
  );
};

export default RoomsAdd;
