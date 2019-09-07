import React from "react";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "774002361902-v98e8n5pk9v7qavqn6f431llivci8psl.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          //   find out if user is signed in
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });

          //   listen constantly for user sign in state
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div>Nope, don't know if you're signed in</div>;
    } else if (this.state.isSignedIn) {
      return <div>Congrats! You are signed in!</div>;
    } else {
      return <div>Nope you're not signed in yet</div>;
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
