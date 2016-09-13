import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';

 function responseGoogle(response){
    console.log("Response is", response);
    $.ajax({
      url: "${process.env.host}/login",
      method: "post",
      data: {
        googleId: response.googleId,
        username: response.profileObj.name
      }
    }).done((user) => {
      console.log("Google response is", response);
      this.props.loggedIn(user.name);
      //Save token to localStorage
      window.localStorage.token = user.token;
      window.localStorage.username = user.name;
      window.localStorage.phoneNumber = user.phoneNumber;

    }).fail(function(err){
      console.log(err);
    });
  }
class Login extends Component {

  // render
  render() {
    return (
        <GoogleLogin
          clientId="381712618241-mjfqk9us65hroajpmjgt7ale2tsossjb.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle.bind(this)}
          onFailure={responseGoogle.bind(this)}
        />
      );
  }
}
export default Login;
