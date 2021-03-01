import React, { useEffect, useState } from "react";
import { storageService, dbService } from "fbase";
import { v4 as uuidv4 } from "uuid"; //uuid호출함
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const TwittFactory = ({ userObj }) => {
  const [Twitt, setTwitt] = useState("");
  const [attachment, setAttachment] = useState("");
  //제출
  const onSubmit = async (event) => {
    if (Twitt === "") {
      return;
    }
    event.preventDefault();
    let attachmentUrl = ""; //const로 선언하면 if문 내에서만 동작하기 위해 이를 전역변수로 설정
    if (attachment != "") {
      //사진을 첨부하지 않을 경우
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    //사진이 있는 경우 url까지 실행
    const tweet = {
      text: Twitt,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("Twitts").add(tweet);
    //     //fireabase의 twiits 컬렉션으로 데이터 보냄
    //     text: Twitt,
    //     createdAt: Date.now(),
    //     creatorId: userObj.uid, //user id를 생성 누가 트위팅 햇는지 알 수 있음
    //   });
    setTwitt("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event; //event안에 있는 target안에 있는 value를 요청
    setTwitt(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0]; //첫번째 파일만 받는다
    const reader = new FileReader(); //file이름을 읽어오는 api js api
    reader.onloadend = (finshedEvent) => {
      //이미지 로딩이 끝나면 종료
      const {
        currentTarget: { result },
      } = finshedEvent; //currentarget은 consolelog에서 찍어보고 image가 있는 부분을 찾고 그값을 찍은것
      setAttachment(result);
    };
    reader.readAsDataURL(theFile); //선택된 이미지 파일을 읽음
  };

  const onClearAttachment = () => setAttachment(""); //이미지 없애기 위한 함수

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={Twitt}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />

        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>

      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />

      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};
export default TwittFactory;
