import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import React, { useState, useCallback } from "react";
import { withTracker } from "meteor/react-meteor-data";

import CustomInput from "../../components/CustomInput";

import Rooms from "/imports/api/Rooms";

import Loader from "/imports/ui/components/Loader";
import Room from "./Room";

const displayRooms = ({ userId, loading, rooms }) => {
  const remove = useCallback(({ target: { id } }) => {
    Meteor.call("rooms.remove", { id }, err => {
      if (err) console.log(err);
    });
  }, []);

  return (
    <div>
      <h1>Rooms</h1>
      <a href="/rooms/add">Créer une room</a>
      <p>Listing des rooms</p>
      <Loader
        loading={loading}
        render={rooms.map(room => (
          <Room key={room._id} userId={userId} room={room} remove={remove} />
        ))}
      />
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
