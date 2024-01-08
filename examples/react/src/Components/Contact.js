import React from 'react';
import Altruist from 'altruist-sdk-web';
import countlyImage from './countly.jpg';

function Contact() {
    const emailUsClick = () => {
        Altruist.q.push(['add_event', {
            "key": "email-us-clicked",
            "count": 1
        }]);
        alert("Email us event triggered");
    }

    return (
        <div className="contact">
            <div>
                <img src={countlyImage} alt="Home"></img>
            </div>
            <div>
                <h1>support@firebird</h1>
            </div>
            <div>
                <button className="email-us" onClick={emailUsClick}>Email us</button>
            </div>
        </div>
    );
}

export default Contact;