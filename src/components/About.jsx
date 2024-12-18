import React from 'react';
import UserContext from "../utils/UserContext";
import UserClass from "./UserClass";

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('Parent componentDidMount');
  }

  render() {
    return (
      <>
        <h1>About me</h1>
        <UserContext.Consumer>
          {({ loggedUser }) => (
            <h1 className="text-xl font-bold">{loggedUser}</h1>
          )}
        </UserContext.Consumer>
        <UserClass name={'Abhishek'} profile='React.js Developer' />
      </>
    )
  }
}

export default About;