import React, { useState, useCallback } from "react";
import { Meteor } from "meteor/meteor";
import CustomInput from "/imports/ui/components/CustomInput";
import { Editor } from "@tinymce/tinymce-react";

const MessageForm = ({ history }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const update = useCallback((e, { name, value }) => {
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "title":
        setContent(value);
        break;
    }
  });

  const send = useCallback(() => {
    Meteor.call("messages.create", { title, content }, err => {
      if (err) console.log(err);
      else history.push("/home");
    });
  }, [title, content, history]);

  return (
    <div>
      <CustomInput
        placeholder="Title"
        name="title"
        value={title}
        update={update}
      />
      <Editor
        initialValue={content}
        onChange={e =>
          update(e, {
            name: "content",
            value: e.target.getContent()
          })
        }
      />
      <button onClick={send}>Créer le message</button>
    </div>
  );
};

export default MessageForm;
