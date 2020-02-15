import React, { Component } from 'react';

export default class Main extends Component {
    render() {
        return (
            <div>
                <p>{this.props.name}, Shall we</p>
                <p>See the secret area: <a href="/secret">Click here</a></p>
                <hr />

                {!this.props.auth.isAuthenticated() &&
                    <div>
                        <p>Please login first</p>
                        <hr />
                        <button onClick={this.props.auth.login}>Login</button>
                    </div>
                }
            </div>
        )
    }
}