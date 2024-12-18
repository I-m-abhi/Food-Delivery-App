import React from 'react';

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
      count: 0,
    }
  }

  async componentDidMount() {
    const data = await fetch('https://api.github.com/users/i-m-abhi');
    const json = await data.json();
    this.setState({
      userInfo: json,
    })
  }

  render() {
    const { login, url } = this.state.userInfo;

    return (
      <div className='user'>
        <h1>Count : {this.state.count}</h1>
        <button onClick={() => {
          this.setState({
            count: this.state.count + 1,
          })
        }}>Count Increase</button>
        <h1>{login}</h1>
        <h2>Location</h2>
        <h3>Contact</h3>
        <h4>Github: {url}</h4>
      </div>
    )
  }
};

export default UserClass;