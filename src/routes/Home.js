import React, { useEffect, useState } from "react";
import { dbService} from "../fbase";
import Twitt1 from "../components/Twitt";
import TwittFactory from "../components/TwittFactory"


//home은 prpops로 userobj로 받으며 이것은 전체적으로 영향을 준다
const Home = ({ userObj }) => {
  //userobj의 props 는 router로 부터 받음
  //userObj전달함으로 누가 로그인했는지 알수 있음
  
  const [Twitts, setTwitts] = useState([]);
  
  // const getTwtiits = async () => {
  //   const dbTwitts = await dbService.collection("Twitts").get(); //firebase에 있는 Twitts에 저장되어있는 컬렉션 가져옴

  //   dbTwitts.forEach((document) => {
  //     const TwittObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };

  //     setTwitts((prev) => [TwittObject, ...prev]); //set쓸때 값대신 함수 전달 (처음 다큐면터 + 이전 다큐먼트 배열로 반환)
  //   });
  // };

  //상태변환
  useEffect(() => {
    //realtime으로 트위팅 보여주기
    //여기서 Twitts는 파이어베어스 컬렉션에 들어가는 이름
    dbService.collection("Twitts").onSnapshot((snapshot) => {
      //listenr로 사용하는snapshot
      //snapshot이 그 기능 하는 함수
      //snapshot 받을 때 배열 생성
      const TwittArray = snapshot.docs.map((doc) => ({
        //배열 형태
        id: doc.id,
        ...doc.data(),
      }));
      setTwitts(TwittArray); //배열 생성후 배열에 넣고 반환
    });
  }, []);

 

  return (
    <div className="container">
      <TwittFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {Twitts.map((
          Twitt //map컴포넌트를 만듬
        ) => (
          <Twitt1
            key={Twitt.id}
            userObj={Twitt} //프로젝트 전체obj props
            isOwner={Twitt.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
