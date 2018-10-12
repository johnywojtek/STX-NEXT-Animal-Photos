import React, { Component } from "react";
import Form from "./Form";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            value: "Wybierz zwierze",
            number: 1,
            isLoading: false,
            showMenu: false
        };
    }
    handleClick = e => {
        e.preventDefault();
        var url;

        if (
            this.state.value === "random" ||
            this.state.value === "Wybierz zwierze"
        ) {
            var textArray = ["shibes", "cats", "birds"];
            var random = Math.floor(Math.random() * textArray.length);
            var randomNumber = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

            url = `http://shibe.online/api/${
                textArray[random]
            }?count=${randomNumber}`;
            this.setState({
                value: textArray[random],
                number: randomNumber
            });
        } else {
            console.log(this.state.value);

            url = `http://shibe.online/api/${this.state.value}?count=${
                this.state.number
            }`;
        }

        this.setState({
            arr: [],
            isLoading: true
        });

        fetch(url)
            .then(function(res) {
                return res.json();
            })
            .then(data => {
                data.forEach(e => {
                    this.setState({
                        arr: [e, ...this.state.arr],
                        isLoading: false
                    });
                });
            })
            .catch(function(err) {
                console.log(err);
            });
    };
    showMenu = () => {
        this.setState({ showMenu: true }, () => {
            document.addEventListener("click", this.closeMenu);
        });
    };
    closeMenu = () => {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener("click", this.closeMenu);
        });
    };

    handleChange = event => {
        this.setState({ value: event.target.innerText });
    };

    handleChangeNumber = event => this.setState({ number: event.target.value });

    render() {
        return (
            <div>
                <form className="form">
                    <input
                        type="number"
                        min="1"
                        max="10"
                        onChange={this.handleChangeNumber}
                        value={this.state.number}
                        className="inputNumber"
                    />
                    <div className="showMenu" onClick={this.showMenu}>
                        {this.state.value}
                    </div>
                    {this.state.showMenu ? (
                        <ul className="menu">
                            <li onClick={this.handleChange}>shibes</li>
                            <li onClick={this.handleChange}>cats</li>
                            <li onClick={this.handleChange}>birds</li>
                            <li onClick={this.handleChange}>random</li>
                        </ul>
                    ) : null}

                    <input
                        type="submit"
                        value={
                            this.state.isLoading ? "Ładowanie danych" : "Szukaj"
                        }
                        onClick={this.handleClick}
                        disabled={this.state.isLoading}
                    />
                </form>
                <Form array={this.state.arr} />
            </div>
        );
    }
}

export default App;
