import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "../fbase"; //firebase auth를 사용하기 위한 구문  export const authService = firbase.auth();

function App() {
  //3가지의 상태변화를 갖고있다.
  const [init, setInit] = useState(false); //firebase를 초기화 시키기 위해
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  //인증 부분을 핸들링 한다
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args), //우리가 원하는 값을 얻기위한 함수
        }); //user를 어딘가에 저장하고 쓰게 하기위함
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => { //더 작은 object를 가져와서 리랜더링가능케 함
    const user = authService.currentUser;
    setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
  });
}

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        "Initializing ..."
      )}
      <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </>
  );
}

export default App;
