import React, {Component} from 'react';

const style = {
  margin:'auto',
  width: '200px'
}
class Login extends Component {

  onSignIn(response){
     console.log("Response is", response);
     $.ajax({
       url: `${process.env.host}/login`,
       method: "post",
       data: {
         googleId: response.El,
         name: response.getBasicProfile().getName(),
         familyName: response.getBasicProfile().getFamilyName(),
         givenName: response.getBasicProfile().getGivenName(),
         imageUrl: response.getBasicProfile().getImageUrl(),
         email: response.getBasicProfile().getEmail(),
         accessToken: response.Zi.access_token
       }
     }).done(function(user) {
       console.log("Google response is", response);
       console.log("this is", this);
       this.props.loggedIn(user.name);
       //Save token to localStorage
       window.localStorage.token = user.token;
       window.localStorage.username = user.name;
       window.localStorage.phoneNumber = user.phoneNumber;

     }.bind(this)).fail(function(err){
       console.log(err);
     });
   }

   componentDidMount(){
     $.getScript('https://apis.google.com/js/platform.js')
         .done(() => {
             // execute any gapi calls here...
             gapi.signin2.render('my-signin2', {
               'scope': 'https://www.googleapis.com/auth/plus.login',
               'width': 200,
               'height': 50,
               'longtitle': true,
               'theme': 'dark',
               'onsuccess': this.onSignIn.bind(this)
             })
         });
   }
  // render
  render() {
    return (
        <div id="my-signin2" style={style}></div>
      );
  }
}
export default Login;
