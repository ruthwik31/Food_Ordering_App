import React from "react";
class UserClass extends React.Component {
  constructor(props) {
    super(props); //or else it throws error
    console.log("child");

    this.state = {
      userInfo: {
        name: "Ruthwik",
        location: "Hyderabad",
        avatar_url: "http://dummy-photo.com",
      },
    };
    console.log(this.props.name + "child constructor"); //child props
  }
  //async
  //async function always returns a Promise,
  componentDidMount() {
    //const data = await fetch("https://api.github.com/users/ruthwik31");
    //const json = await data.json();
    //this.setState({
    //  userInfo: json,
    //});
    //console.log(json);
    //this.timer=setInterval(() => {
    //  console.log("Hai");
    //}, 1000);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.count != prevState.count) {
    }
    console.log("component updated");
  }
  componentWillUnmount() {
    //clearInterval(this.timer);
    console.log("component unmounted");
  }
  render() {
    //const { name } = this.props; //destructuring props
    const { name, location, avatar_url } = this.state.userInfo; //destructuring state
    const { count } = this.state;
    return (
      <div className="user-card">
        {/*<h1>count:{count}</h1>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          Count increment
        </button>*/}
        <img src={avatar_url} />
        <h2>Name:{name}</h2>
        <h3>Location:{location}</h3>
      </div>
    );
  }
}
//converted to html and displayed
//<h2>Name:{this.props.name}</h2>
export default UserClass;
