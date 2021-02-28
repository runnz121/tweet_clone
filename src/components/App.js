import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "../fbase"; //firebase auth를 사용하기 위한 구문  export const authService = firbase.auth();

function App() {
  const [init, setInit] = useState(false); //firebase를 초기화 시키기 위해
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn ={isLoggedIn}/> : "Initializing ..."}
      <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </>
  );
}

export default App;
