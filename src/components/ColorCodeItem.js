import React, { Component } from "react";

export default class ColorCodeDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = { name: this.props.name, bandColor: "" };

    this.onColorChange = this.onColorChange.bind(this);
  }

  onColorChange(event) {
    this.props.handleColorChange(this.state.name, event.target.value || null);
    this.setState({ bandColor: event.target.value || null });
  }

  render() {
    return (
      <div>
        <table className="table table-striped table-hover">
          <tbody>
            <tr>
              <td className="firstColumn">
                <label>{this.props.ColorBandText}</label>
              </td>
              <td className="secondColumn">
                <select onChange={this.onColorChange} className="form-control">
                  {this.props.ColorCodeList.map((color) => (
                    <option key={color.ColorCode} value={color.ColorCode}>
                      {color.ColorValue}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
