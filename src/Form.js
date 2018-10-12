import React, { Component } from "react";

class Form extends Component {
    render() {
        var list = this.props.array.map(e => {
            return (
                <li
                    key={e}
                    style={{
                        listStyle: "none"
                    }}
                >
                    <img
                        src={e}
                        style={{
                            height: "300px",
                            width: 300,
                            margin: 20
                        }}
                        alt="Animal"
                    />
                </li>
            );
        });

        return (
            <div>
                <div>
                    <ul
                        style={{
                            display: "flex",
                            flexWrap: "wrap"
                        }}
                    >
                        {list}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Form;
