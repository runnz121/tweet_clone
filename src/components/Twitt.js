import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import attachmentUrl from "../routes/Home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Twitt1 = ({ userObj, isOwner }) => {
  const [editing, setEditing] = useState(false); //true or false 반환
  const [newTwitt, setnewTwitt] = useState(userObj.text); //input에 입력된 text업데이트

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this Twitt?");
    if (ok) {
      await dbService.doc(`Twitts/${userObj.id}`).delete(); //userObj의 (id, doc) 에서 id를 삭제함으로doc도 같이 삭제
      await storageService.refFromURL(userObj.attachmentUrl).delete(); //firebase안의 사진까지 삭제
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  //칸에 값을 입력할 수 있게 하기 위한 onchange 변경
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(userObj, newTwitt);

    //업데이트된 작성글을 파이어베이스 데이터베이스에 해당 id를 기준으로 보냄
    await dbService.doc(`Twitts/${userObj.id}`).update({
      text: newTwitt, // 파이어베이스에 보낼 내용은 text인데 그것은 newTwitt이다
    });
    setEditing(false); //수정후 수정모드에서 벗어나게끔 하기 위함
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setnewTwitt(value);
  };

  //isOwner  = 소유자가 아니면 버튼을 볼 수 없게끔 처리
  return (
    <div className="nweet">
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit} className="container nweetEdit">
                <input
                  type="text"
                  placeholder="Edit Twitt"
                  value={newTwitt}
                  required
                  autoFocus
                  onChange={onChange}
                  className="formInput"
                />
                <input type="submit" value="Update Twitt" className="formBtn" />
              </form>
              <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </span>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{userObj.text}</h4>
          {userObj.attachmentUrl && <img src={userObj.attachmentUrl} />}

          {isOwner && (
            <div class="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Twitt1;
