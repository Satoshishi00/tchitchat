import React from "react";
import formatTime from "/imports/utils/formatTime";

const Message = ({ message, roomId, userId }) => (
  <div>
    {message.roomId === roomId && (
      <div>
        <small> {formatTime(message.createdAt)} </small>
        <b className={userId === message.userId ? "text-primary" : ""}>
          {message.userName}
        </b>
        <span> : {message.content}</span>
      </div>
    )}
  </div>
);

export default Message;
