import React, { Component } from "react";
import ColorCodeDropDown from "./ColorCodeItem";

import ColorCodeMessage from "./ColorCodeMessage";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export default class OhmValueCalculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ColorAandBCodeList: [],
      MultiplierColorCodeList: [],
      ToleranceColorCodeList: [],
      Output: {},
      BandName: "",
      colorA: "",
      colorB: "",
      colorC: "",
      colorD: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // creates entity
    fetch("http://localhost:64019/OhmValue/band4/ResistorColorCodes", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Origin: "http://localhost:3000/",
      },
      // body: JSON.stringify({
      //   name: this.state.name,
      //   notes: this.state.notes,
      // }),
    })
      .then((response) => response.json())
      .then((json) =>
        this.setState({
          ColorAandBCodeList: json.ColorAandBCodeList,
          MultiplierColorCodeList: json.MultiplierColorCodeList,
          ToleranceColorCodeList: json.ToleranceColorCodeList,
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }

  // Creating below function to set state of this (parent) component.
  handleColorChange = (name, colorCode) => {
    if (name === "colorA") {
      this.setState({ colorA: colorCode });
    }
    if (name === "colorB") {
      this.setState({ colorB: colorCode });
    }
    if (name === "colorC") {
      this.setState({ colorC: colorCode });
    }
    if (name === "colorD") {
      this.setState({ colorD: colorCode });
    }
  };

  handleSubmit = (event) => {
    const jsonRequest = {
      colorA: this.state.colorA,
      colorB: this.state.colorB,
      colorC: this.state.colorC,
      colorD: this.state.colorD,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonRequest),
    };

    fetch("http://localhost:64019/OhmValue/band4/Calculate", requestOptions)
      .then((result) => result.json())
      .then((result) => this.setState({ Output: result }));

    event.preventDefault();
  };

  render() {
    return (
      <Container>
        <div className="jumbotron jumbotron-custom-height text-center">
          <h2>Ohm Resistor Calculator</h2>
        </div>

        <fieldset>
          <legend>
            <strong>Select color codes</strong>
          </legend>

          <Row>
            <div className="col-lg-12">
              <ColorCodeDropDown
                key="colorA"
                name="colorA"
                ColorBandText="Band A Color"
                ColorCodeList={this.state.ColorAandBCodeList}
                handleColorChange={this.handleColorChange}
              />
            </div>
          </Row>
          <Row>
            <div className="col-lg-12">
              <ColorCodeDropDown
                key="colorB"
                name="colorB"
                ColorBandText="Band B Color"
                ColorCodeList={this.state.ColorAandBCodeList}
                handleColorChange={this.handleColorChange}
              />
            </div>
          </Row>
          <Row>
            <div className="col-lg-12">
              <ColorCodeDropDown
                key="colorC"
                name="colorC"
                ColorBandText="Multiplier Color Code"
                ColorCodeList={this.state.MultiplierColorCodeList}
                handleColorChange={this.handleColorChange}
              />
            </div>
          </Row>
          <Row>
            <div className="col-lg-12">
              <ColorCodeDropDown
                key="colorD"
                name="colorD"
                ColorBandText="Tolerance Color Code"
                ColorCodeList={this.state.ToleranceColorCodeList}
                handleColorChange={this.handleColorChange}
              />
            </div>
          </Row>
          <Row>
            <div className="col-lg-12 text-center">
              <Button variant="primary" onClick={this.handleSubmit}>
                Calculate
              </Button>
            </div>
          </Row>
        </fieldset>
        <br />
        <fieldset>
          <h4>
            {this.state.Output.OhmValue && (
              <strong>
                Resistor Value : {this.state.Output.OhmValue} Ohms
              </strong>
            )}
            <br />
            {this.state.Output.OhmDenominatedLetter != null &&
              this.state.Output.OhmDenominatedLetter != undefined && (
                <ColorCodeMessage
                  OhmDenominatedValue={this.state.Output.OhmDenominatedValue}
                  OhmDenominatedLetter={this.state.Output.OhmDenominatedLetter}
                  Tolerance={this.state.Output.ToleranceValue}
                />
              )}
          </h4>
        </fieldset>
      </Container>
    );
  }
}
