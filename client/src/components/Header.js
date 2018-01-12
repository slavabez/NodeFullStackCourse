import React, { Component } from 'react';

class Header extends Component {

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo" href="/">Emaily</a>
                    <ul className="right">
                        <li>
                            <a href="/auth/google">Login with Google</a>
                        </li>
                        <li>
                            <a href="/auth/email">Login with Email</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;