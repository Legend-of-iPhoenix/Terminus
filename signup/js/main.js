function toggleSignIn() {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut();
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        if (username.length < 2 || username.length > 64 || username == "_iPhoenix_" || username == "Console" || username = "UniBot")
        {
          alert('Please enter a valid username');
          return;
        }
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('sign-in').disabled = false;
        });
      }
      document.getElementById('sign-in').disabled = true;
    }

    function handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    }

    function sendEmailVerification() {
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        alert('Email Verification Sent!');
      });
    }

    function sendPasswordReset() {
      var email = document.getElementById('email').value;
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        alert('Password Reset Email Sent!');
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
      });
    }

    function initApp() {
      firebase.auth().onAuthStateChanged(function(user) {
        document.getElementById('verify-email').disabled = true;
        if (user) {
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          if (!emailVerified) {
            document.getElementById('verify-email').disabled = false;
          }
        } else {
        }
        document.getElementById('sign-in').disabled = false;
      });

      document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);
      document.getElementById('sign-up').addEventListener('click', handleSignUp, false);
      document.getElementById('password-reset').addEventListener('click', sendPasswordReset, false);
    }

    window.onload = function() {
      initApp();
    };
