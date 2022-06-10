import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class GetFlowers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      flowers: [],
    }
  }

  componentDidMount() {
    fetch("https://flowrspot-api.herokuapp.com/api/v1/flowers")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            flowers: result.flowers
          });
        },
        (err) => {
          this.setState({
            isLoaded: true,
            err
          });
        }
      )
  }

  render() {
    const { flowers } = this.state;
    let isLoginSuccessful = this.props.loginState;

    return (
      <div>
        <div className='flowers'>
          {flowers.map(flower => (
          <div className='flowers__card' key={flower.id}>
            <div className='flowers__card-text'>
              <h4 className='flowers__card-title'>{flower.name}</h4>
              <p className='flowers__card-latin-name'><i>{flower.latin_name}</i></p>
              <button className="flowers__card-button">{flower.sightings} sightings</button>
            </div>
            <img src={flower.profile_picture} className='flowers__card-image'/>
            {isLoginSuccessful ? <button className="flowers__card-favorite-button" onClick={() => this.favoriteFlower(flower.id, this.props.authToken)}>
            <FontAwesomeIcon icon="star" />
              </button> : null }
            </div>
          ))}
        </div>
      </div>
    );
  }

  favoriteFlower(id, clientToken) {
    fetch("https://flowrspot-api.herokuapp.com/api/v1/flowers/" + id + "/favorites", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + clientToken
      }
    })
      .then(res => res.json())
      .then(
      (result) => {
        console.log(result)
      },

      (error) => {
        console.log(error)
      }
    )
  }
}

export default GetFlowers;