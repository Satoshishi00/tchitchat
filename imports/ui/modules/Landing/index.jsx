import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="container">
      <h1>404</h1>
      <p>
        <Link to="rooms">Cliquer ici</Link> pour revenir sur les salons.
      </p>
      <img
        className="responsive"
        src="https://images.unsplash.com/photo-1501511795728-df53825d742a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        alt="Qu'êtes vous allé chercher ? 😛"
      />
    </div>
  );
};

export default Landing;
