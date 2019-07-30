import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import React, { useState, useCallback, Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Rooms from "/imports/api/Rooms";

import Loader from "/imports/ui/components/Loader";
import { verify } from "crypto";

class verifyToken extends Component {
  state = {
    UserToken: Meteor.users.findOne(this.props.location.pathname.split("/")[2])
  };
  //   const remove = useCallback(({ target: { id } }) => {
  //     Meteor.call("rooms.remove", { id }, err => {
  //       if (err) {
  //         toast.error(err.reason);
  //       } else {
  //         console.log(room);
  //         toast.success("La chatroom a bien été supprimée !");
  //       }
  //     });
  //   }, []);
  static getDerivedStateFromProps(props) {
    console.log(props);
    if (!props.userId) {
      props.history.push("/singnin");
    }

    return {};
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    return (
      <div id="wrapper">
        <div id="topbar">
          <h1>Rooms</h1>
        </div>
      </div>
    );
  }
}

//       <div id="rooms">
//         <Link className="rooms-create" to="../rooms/add">
//           Créer une room
//         </Link>
//         <h2 className="rooms-title">Listing des rooms</h2>
//         <div className="rooms-container">
//           <Loader
//             loading={loading}
//             render={rooms.map(room => (
//               <Room
//                 key={room._id}
//                 userId={userId}
//                 room={room}
//                 remove={remove}
//               />
//             ))}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

export default withTracker(() => {
  //   console.log(this.props);
  //   const token = this.props.location.pathname.split("/")[2];
  //   console.log(token);

  console.log("bip");
  const bip = "bip";
  console.log(Meteor.user());
  //   Meteor.call("users.verify.token", { token });
  //const roomsPublication = Meteor.subscribe("rooms.lasts");
  //   const loading = !roomsPublication.ready();
  //   const rooms = Rooms.find({}, { sort: { createdAt: -1 } }).fetch();
  //   return {
  //     userId: Meteor.userId(),
  //     user: Meteor.user() || {},
  //     loading,
  //     rooms
  //   };
  //   Meteor.users.
  return {
    userId: Meteor.userId()
  };
})(verifyToken);
