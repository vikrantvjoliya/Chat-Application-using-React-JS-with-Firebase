import React from "react";

import "./Footer.css";

function Footer() {
    return (
        <footer id="footer" className="footer">            
            <p>
            <i className="	fas fa-terminal"></i> Made with ❤ by 
                <a
                    href="https://github.com/vikrantvjoliya"
                    target="_blank"
                    rel="noopener noreferrer"
                > VIKRANT 
                <i className="fas fa-user-astronaut"></i> & </a>
                <a
                    href="https://github.com/kunalvasudevan"
                    target="_blank"
                    rel="noopener noreferrer"
                >  KUNAL
                <i className="fas fa-user-secret"></i></a>
                <br/>
            </p>
        </footer>
    );
};

export default Footer;