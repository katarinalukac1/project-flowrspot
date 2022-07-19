import React from "react";
import Navbar from "./Navbar";

class Sightings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          err: null,
          isLoaded: false,
          sightings: [],
        }
      }
    
      componentDidMount() {
        fetch("https://flowrspot-api.herokuapp.com/api/v1/sightings")
          .then(r => r.json())
          .then(
            (res) => {
              this.setState({
                isLoaded: true,
                sightings: res.sightings
              });
            },
            (err) => {
              this.setState({
                isLoaded: true,
                err
            });
        })
    }

    render() {
        return (
            <div className="main-container">
                <Navbar />
                <div className="sightings">

                </div>
            </div>
        )
    }
}

export default Sightings;