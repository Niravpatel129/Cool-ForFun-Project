import React from "react";
import "./Grid.css";

import axios from "axios";

class Grid extends React.Component {
  gridDiamter = 10;
  items = [];
  state = {
    clickedItems: [],
    countryImg: ""
  };

  componentDidMount() {
    this.getFlag();
  }

  getFlag = async () => {
    let res = await axios.get(
      "https://api.ipgeolocation.io/ipgeo?apiKey=14dbf6cd50244912b71b384696e9413a"
    );
    let countryCode = res.data.country_code2.toLowerCase();
    import(`./flags/${countryCode}.png`).then(dat => {
      this.setState({ countryImg: dat.default });
    });

    console.log(countryCode);
    return res.data.country_code2;
  };

  handleMouseClick = e => {
    this.setState({
      clickedItems: [...this.state.clickedItems, parseInt(e.target.id, 0)]
    });
  };

  renderGrid = () => {
    this.items = [];
    for (let i = 0; i < window.outerWidth * 4; i++) {
      if (this.state.clickedItems.includes(i)) {
        if (i === this.state.clickedItems[this.state.clickedItems.indexOf(i)]) {
          this.items.push(
            <div
              key={i.toString()}
              className="Grid"
              id={i}
              style={{
                backgroundImage: `url(${this.state.countryImg})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }}
              onClick={this.handleMouseClick}
            ></div>
          );
        }
      } else {
        this.items.push(
          <div
            key={i.toString()}
            className="Grid"
            id={i}
            onClick={this.handleMouseClick}
          ></div>
        );
      }
    }
    return this.items;
  };

  render() {
    return <div className="Page">{this.renderGrid()}</div>;
  }
}

export default Grid;
