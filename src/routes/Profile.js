import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
  const history = useHistory(); //router의 history를 사용함으로써 home으로 리다이렉트
  const [newDisplayName, setNewDisplayName] = useState(userObj.newDisplayName);
  const onLogOutClick = () => {
    //로그아웃 버튼 이벤트 발생시
    authService.signOut(); //로그아웃
    history.push("/"); //리다이렉트
  };

  const getMyTwitts = async () => {
    const Twitts = await dbService
      .collection("Twitts")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .get();
    console.log(Twitts.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyTwitts();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};
