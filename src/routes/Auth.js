import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";
import AuthForm from "../components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";


//자동으로 import하기 위해선
const Auth = () => {


  

 
  const onSocialClick= async (event) => {
      const {target:{name}} = event;
      //console.log(event.target.name) //event가 발생하면 현재 타겟의 name을 반환 

      let provider; //provider을 통한 로그인 구현 
      if(name ==="google") {
        provider = new firebaseInstance.auth.GoogleAuthProvider();
      } else if(name==="github"){
        provider = new firebaseInstance.auth.GithubAuthProvider();
      }
     const data = await authService.signInWithPopup(provider);
     console.log(data); 
  }



  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
