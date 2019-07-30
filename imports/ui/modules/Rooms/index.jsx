import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import React, { useState, useCallback } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CustomInput from "../../components/CustomInput";

import Rooms from "/imports/api/Rooms";

import Loader from "/imports/ui/components/Loader";
import Room from "./Room";

const displayRooms = ({ userId, loading, rooms }) => {
  const remove = useCallback(({ target: { id } }) => {
    Meteor.call("rooms.remove", { id }, err => {
      if (err) {
        toast.error(err.reason);
      } else {
        console.log(room);
        toast.success("La chatroom a bien été supprimée !");
      }
    });
  }, []);

  return (
    <div id="wrapper">
      <div id="topbar">
        <h1>Rooms</h1>
      </div>

      <div id="rooms">
        <Link className="rooms-create" to="../rooms/add">
          Créer une room
        </Link>
        <h2 className="rooms-title">Listing des rooms</h2>
        <div className="rooms-container">
          <Loader
            loading={loading}
            render={rooms.map(room => (
              <Room
                key={room._id}
                userId={userId}
                room={room}
                remove={remove}
              />
            ))}
          />
        </div>
      </div>
    </div>
  );
};

export default withTracker(() => {
  const roomsPublication = Meteor.subscribe("rooms.lasts");
  const loading = !roomsPublication.ready();
  const rooms = Rooms.find({}, { sort: { createdAt: -1 } }).fetch();
  return {
    userId: Meteor.userId(),
    user: Meteor.user() || {},
    loading,
    rooms
  };
})(displayRooms);
