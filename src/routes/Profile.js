import { authService } from "fbase";
import React from "react";
import {useHistory} from "react-router-dom";


export default () => {
  const history = useHistory(); //router의 history를 사용함으로써 home으로 리다이렉트
  const onLogOutClick = () => { //로그아웃 버튼 이벤트 발생시
      authService.signOut(); //로그아웃
      history.push("/"); //리다이렉트
    };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
