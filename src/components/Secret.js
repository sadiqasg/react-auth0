import React, { Component } from 'react';

export default class Secret extends Component {
    render() {
        return (
            <div>
                <p>This is a classified secret area</p>
                <p>Go back to <a href="/">Home</a></p>
                <hr/>
                Or <button onClick={this.props.auth.logout}>Logout</button>
            </div>
        )
    }
}