import React, { Component } from 'react';

export default class NavBar extends Component {
    state = {
        toggle: false
    };

    Toggle = () => {
        this.setState({ toggle: !this.state.toggle });
    };
    render() {
        const li = [
            {
                link: "/",
                text: "Home"
            },
            {
                link: "/about/",
                text: "About us"
            },
            {
                link: "/contact/",
                text: "Contact us"
            }
        ];
        return (
            <>
                <div className="navBar">
                    <button onClick={this.Toggle}>

                    </button>
                    <ul className={this.state.toggle ? "links show-nav" : "links"}>
                        {li.map((objLink, i) => {
                            return (<li key={i}><a href={objLink.link}>{objLink.text}</a></li>);
                        })}
                    </ul>
                </div>
            </>
        );
    }
}
