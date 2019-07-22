import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Fields from "./Fields";

const RoomsAdd = () => {
  const [room_name, setRoomName] = useState("");

  const update = useCallback(
    (e, { name, value }) => {
      if (room_name) {
        setRoomName(value);
      }
    },
    [setRoomName]
  );

  const addRoom = useCallback(() => {
    Accounts.createUser({ room_name }, err => {
      if (err) console.log(err);
    });
  }, [room_name]);

  return (
    <div>
      <h1>Créer un nouveau salon</h1>
      <a href="/rooms/add">Liste des salons</a>
      <form>
        <Fields
          update={update}
          state={{
            name
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
