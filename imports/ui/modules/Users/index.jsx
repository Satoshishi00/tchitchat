import React, { useState, useCallback } from "react";
import { Accounts } from "meteor/accounts-base";
import { Link } from "react-router-dom";

const Users = () => {
  return (
    <div>
      <h1>Users</h1>
      <p>Liste des utilisateurs</p>
      <Link to="rooms">Rooms</Link>
    </div>
  );
};

export default Users;
