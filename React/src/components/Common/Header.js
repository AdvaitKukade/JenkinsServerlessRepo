import React from 'react';
import logo from "./../../assets/images/reuters_connect_logo.svg"
const Header = () => {
    return (
        <nav className="headerWrap navbar navbar-expand-lg navbar-dark">
          <a className="navbar-brand" href="/"><img alt="" src={logo} /></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">Discover</a>
              </li>
            </ul>
          </div>
        </nav>
    );
}

export default Header;