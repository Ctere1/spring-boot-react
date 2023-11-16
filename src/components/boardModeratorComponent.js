import React, { Component } from "react";

import UserService from "../services/userService";
import EventBus from "../common/eventBus";

export default class BoardModerator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getModeratorBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>
                    <div>
                        <p>
                            Moderator page is accessible to moderator role only.
                            <br />
                            <br />
                            You can access due to the following granted authorities assigned to you:
                            <br />
                            <br />
                            <ul>
                                <li>ROLE_MODERATOR</li>
                            </ul>

                        </p>
                    </div>
                </header>
            </div>
        );
    }
}