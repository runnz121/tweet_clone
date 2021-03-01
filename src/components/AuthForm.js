import React, { useState } from "react";
import { authService } from "../fbase";

const AuthForm = () => {


  const [email, setEmail] = useState(""); //이메일을 위한  hooks
  const [password, setPassword] = useState(""); //password를 위한 hooks
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    //onchange : 키를 누를 때마다 사용, event: input값이 변경
    const {
      target: { name, value }, //target: 변경이 일어난 부분
    } = event;
    if (name === "email") {
      setEmail(value); //email state를 변경
    } else if (name === "password") {
      setPassword(value); //password state를 변경
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    //html의 form을 이용할 떄마다 새로고침됨 그걸 방지하기 위한 코드(내가 핸들하기 위해)

    //firbase referenece에 있음 참고하여 코드 작성
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
        //create account
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
        //login
      }
      console.group(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />

        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign in" : "Create Account"}{" "}
      </span>{" "}
    </>
  );
};

export default AuthForm;
