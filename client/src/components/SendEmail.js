import React, { useState } from "react";
import emailjs from "emailjs-com";
import { AiOutlineCloseCircle } from "react-icons/ai";

const SendEmail = () => {
  const [show, setshow] = useState(false);

  const sendEmaill = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_1z9z6mq",
        "template_qeolmsb",
        e.target,
        "user_S9eMeFyyQe70ehVpiy1d3"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <div>
      <button onClick={() => setshow(!show)}>Send Email</button>

      {show ? (
        <div className="modal-bg">
          <div className="modal-body">
            <AiOutlineCloseCircle
              onClick={() => setshow(!show)}
              size={28}
              className="close-email"
            />
            <form onSubmit={sendEmaill} className="modal-body-form">
              <h1>Demande devis</h1>
              <input type="text" placeholder="Enter your name" name="name" />
              <input type="text" placeholder="Enter your email" name="email" />
              <input
                type="text"
                placeholder="Enter your subject"
                name="subject"
              />
              <textarea
                name=""
                cols="30"
                rows="10"
                placeholder="enter your message here ..."
                name="message"
              ></textarea>
              <input type="submit" value="send" />
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SendEmail;
