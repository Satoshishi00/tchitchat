import React from "react";
import formatTime from "/imports/utils/formatTime";

const Message = ({ message, userId }) => (
  <div>
    <small> {formatTime(message.createdAt)} </small>
    <b className={userId === message.userId ? "text-primary" : ""}>
      {message.userName}
    </b>
    <span> : {message.content}</span>
  </div>
);

export default Message;
