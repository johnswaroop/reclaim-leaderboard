// components/GoogleSignInButton.js
import axios from "axios";
import { useEffect } from "react";

const GoogleSignInButton = () => {
  useEffect(() => {
    let win = window as any;
    if (win.google) {
      win.google.accounts.id.initialize({
        client_id: process.env.GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      win.google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { theme: "outline", size: "large" } // customization options
      );
    }
  }, []);

  const handleCredentialResponse = (response: any) => {
    // Handle the ID token received from Google
    const id_token = response.credential;
    fetch("/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: id_token }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.success) {
          // Handle successful login
          console.log("Login successful", data);
          localStorage.setItem("token", data.token);
          let dbres = await axios.post("/api/sign-up", {
            name: data.user.name,
            email: data.user.email,
            picture: data.user.picture,
          });
          if (dbres.status == 200 || dbres.status == 201) {
            window.location.href = "/";
          }
        } else {
          // Handle login error
          console.error("Login error", data);
        }
      });
  };

  return <div id="googleSignInButton"></div>;
};

export default GoogleSignInButton;
