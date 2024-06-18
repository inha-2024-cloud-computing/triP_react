import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Link, useOutletContext } from "react-router-dom";
import { FaPaperPlane, FaSpinner } from "react-icons/fa"; // react-icons에서 아이콘 임포트
import move from "../assets/mgg_animation.mp4";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(""); // 새로운 메시지를 저장할 상태
  const [loadingMessages, setLoadingMessages] = useState(true); // 메시지 로드 상태
  const [sendingMessage, setSendingMessage] = useState(false); // 메시지 전송 상태
  const observer = useRef();
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const prevHeightRef = useRef(0);
  const token = localStorage.getItem("accessToken"); // 토큰 가져오기
  const userId = localStorage.getItem("userId"); // 유저 ID 가져오기
  const { backgroundVideo, handleImageSelect } = useOutletContext();

  useEffect(() => {
    const loadChatData = async () => {
      try {
        const response = await axios.get(
          "https://trip-ani.kro.kr/chatbot/chat",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
            params: {
              userId: userId, // 유저 ID를 파라미터로 추가
            },
          }
        );

        setMessages(response.data); // 응답 데이터를 상태에 저장
        setLoadingMessages(false); // 로딩 완료
      } catch (error) {
        console.error("Fetch error:", error);
        setLoadingMessages(false); // 로딩 완료 (에러 발생 시에도)
      }
    };
    loadChatData();
  }, [token, userId]);

  const firstMessageRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && messages.length > 0) {
          prevHeightRef.current = scrollContainerRef.current.scrollHeight;
        }
      });
      if (node) observer.current.observe(node);
    },
    [messages.length]
  );

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  useEffect(() => {
    if (prevHeightRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight - prevHeightRef.current;
      prevHeightRef.current = 0;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; // 메시지가 비어있으면 전송하지 않음

    setSendingMessage(true); // 메시지 전송 시작

    try {
      const response = await axios.post(
        "https://trip-ani.kro.kr/chatbot/chat",
        null, // body는 null로 설정
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: {
            userId: userId, // 유저 ID를 파라미터로 추가
            text: newMessage, // 보낼 메시지 추가
          },
        }
      );
      console.log("Message sent:", response.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: newMessage }, // 새로운 메시지를 상태에 추가
        { role: "assistant", content: response.data }, // 봇의 응답을 상태에 추가
      ]);
      setNewMessage(""); // 메시지 입력 필드를 초기화
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSendingMessage(false); // 메시지 전송 완료
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-start text-purple-900"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <header className="bg-orange-100 text-purple-900 p-4 fixed top-0 left-0 right-0 z-20">
        <h1 className="text-center text-2xl font-bold">리피톡</h1>
        <Link to="/" className="absolute left-4 top-4 text-purple-900">
          뒤로
        </Link>
      </header>
      <div className="fixed top-0 left-0 w-full h-full z-10">
        <video
          muted
          autoPlay
          loop
          key={backgroundVideo}
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      </div>
      <div
        className="relative w-full min-h-screen z-10 bg-gray-600 bg-opacity-60 flex flex-col"
        style={{ paddingTop: "64px", paddingBottom: "64px" }} // 입력창 높이만큼 패딩 추가
      >
        <main
          ref={scrollContainerRef}
          className="w-full max-w-full p-4 flex-1 overflow-y-auto"
          style={{ paddingBottom: "64px" }}
        >
          {loadingMessages ? (
            <div className="w-full h-full flex items-center justify-center">
              <FaSpinner className="animate-spin text-white" size={40} />
            </div>
          ) : messages.length > 0 ? (
            messages.map((message, index) => {
              const isFirstMessage = index === 0;
              return (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } mb-4`}
                  ref={isFirstMessage ? firstMessageRef : null}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      message.role === "user"
                        ? "bg-yellow-200 text-black"
                        : "bg-orange-100 text-black"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-white">리피와 대화 시작하기!!</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>
        <footer className="w-full max-w-full p-4 fixed bottom-0 bg-orange-200 text-purple-900 flex">
          <input
            type="text"
            className="w-full p-2 rounded-lg"
            placeholder="메시지를 입력하세요..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)} // 입력 필드 변경 핸들러
            disabled={sendingMessage} // 전송 중일 때 입력 필드 비활성화
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center"
            disabled={sendingMessage} // 전송 중일 때 버튼 비활성화
          >
            {sendingMessage ? (
              <FaSpinner className="animate-spin" size={20} />
            ) : (
              <FaPaperPlane size={20} /> // 전송 아이콘 추가
            )}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ChatComponent;
