import axios from "axios";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { useMediaQuery, useTheme } from "@mui/material";
import clsx from "clsx";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import ConversationList from "./ui/ConversationList";
import ConversationScreen from "./ui/ConversationScreen";
import CreateMessageForm from "./ui/CreateMessageForm";
import CreateConversationForm from "./ui/CreateConversationForm";
import LoginForm from "./ui/LoginForm";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
const serverDomain = import.meta.env.VITE_ACTION_CABLE_SERVER_DOMAIN;
const httpUrl = `http://${serverDomain}`;
const wsUrl = `ws://${serverDomain}`;

export default function ActionCableClient() {
  const [activeTab, setActiveTab] = useState("conversation-screen");
  const theme = useTheme();
  const isMdOrLarger = useMediaQuery(theme.breakpoints.up("md"));
  const WS_URL = `${wsUrl}/cable`;
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const { lastMessage, sendMessage, readyState } = useWebSocket(WS_URL, {
    share: true,
    onOpen: () => {
      console.log("Web socket connected");
    },
    onError: (error) => {
      console.log("WEB-SOCKET ERROR: " + error);
    },
    onClose: (error) => {
      console.log("CONNECTION CLOSED: " + error);
    },
    reconnectAttempts: 10,
    reconnectInterval: 3000,
  });

  const fetchConversations = async function () {
    const response = await axios
      .get(`${httpUrl}/conversations`)
      .then((res) => res.data)
      .catch((axiosError) => {
        console.log("AXIOS ERROR: " + axiosError);
        return null;
      });

    if (Array.isArray(response)) {
      setConversations(
        response.map((c) => ({
          ...c,
          messages: c.messages.map((m) => ({ ...m, viewed: true })),
        }))
      );

      // Subscribe to the MessagesChannel for each conversation
      response.forEach((conversation) => {
        subscribeToConversation(conversation.id);
      });
    }
  };

  const handleLogin = async function (payload) {
    console.log(payload);
    const response = await axios
      .post(`${httpUrl}/login`, payload)
      .then((res) => res.data)
      .catch((axiosError) => {
        console.log("AXIOS ERROR: " + axiosError);
        return null;
      });

    if (response) {
      fetchCurrentLoggedInUser();
    }
  };

  const fetchCurrentLoggedInUser = async function () {
    const response = await axios
      .get(`${httpUrl}/current-user`)
      .then((res) => res.data)
      .catch((axiosError) => {
        console.log("AXIOS ERROR: " + axiosError);
        return null;
      });

    if (response) {
      setCurrentUser(response);
    }
  };

  const publishNewConversation = (newConversation) => {
    axios.post(`${httpUrl}/conversations`, newConversation);
  };

  const publishNewMessage = (newMessage) => {
    axios.post(`${httpUrl}/messages`, newMessage);
  };

  useEffect(() => {
    fetchCurrentLoggedInUser();
  }, []);

  useEffect(() => {
    if (currentUser && readyState === 1) {
      fetchConversations();
      subscribeUserToTheConversationsChannel();
    }
  }, [currentUser, readyState]);

  const subscribeUserToTheConversationsChannel = () => {
    sendMessage(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({ channel: "ConversationsChannel" }),
      })
    );
  };

  const subscribeToConversation = (conversationId) => {
    sendMessage(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          channel: "MessagesChannel",
          conversation: conversationId,
        }),
      })
    );
  };

  useEffect(() => {
    if (activeConversation) {
      setConversations((convs) =>
        convs.map((conv) => {
          if (conv.id === activeConversation.id) {
            return {
              ...conv,
              messages: conv.messages.map((m) => ({ ...m, viewed: true })),
            };
          } else {
            return conv;
          }
        })
      );
    }
  }, [activeConversation]);

  useEffect(() => {
    if (lastMessage && lastMessage.data) {
      const messageData = JSON.parse(lastMessage.data);
      if (messageData.identifier) {
        const messageIdentifier = JSON.parse(messageData.identifier);
        if (messageIdentifier.channel === "ConversationsChannel") {
          if (messageData.message) {
            const conversation = messageData.message.conversation;
            subscribeToConversation(conversation.id);
            setConversations((convs) => [conversation, ...convs]);
          }
        } else if (messageIdentifier.channel === "MessagesChannel") {
          if (messageData.message) {
            const message = messageData.message.message;
            setConversations((convs) =>
              convs.map((conv) => {
                if (conv.id === message.conversation_id) {
                  if (
                    !Boolean(conv.messages.find((m) => m.id === message.id))
                  ) {
                    conv.messages.push(message);
                  }
                }

                if (activeConversation?.id === conv.id) {
                  setActiveConversation(conv);
                }
                return conv;
              })
            );
          }
        }
      }
    }
  }, [lastMessage]);

  return (
    <>
      {currentUser ? (
        <div className="fixed inset-0 flex bg-gray-100">
          <div
            className={clsx("", {
              "min-w-[15rem] max-w-[15rem] border-r flex flex-col":
                isMdOrLarger,
              "": !isMdOrLarger,
              "flex flex-col flex-grow":
                !isMdOrLarger && activeTab === "conversation-listings",
              hidden: !isMdOrLarger && activeTab !== "conversation-listings",
            })}
          >
            <div className="border-b min-h-16 max-h-16 flex items-center">
              <h4 className="p-2 font-bold">{currentUser.name}</h4>
            </div>
            <ConversationList
              setActiveTab={setActiveTab}
              currentUser={currentUser}
              activeConversation={activeConversation}
              setActiveConversation={setActiveConversation}
              conversations={conversations}
              className="flex-grow vertical-scrollbar"
            />
          </div>
          <div
            className={clsx("flex-grow", {
              "min-w-[15rem] flex flex-col border-r": isMdOrLarger,
              "": !isMdOrLarger,
              "flex flex-col flex-grow":
                !isMdOrLarger && activeTab === "conversation-screen",
              hidden: !isMdOrLarger && activeTab !== "conversation-screen",
            })}
          >
            <div className="border-b flex items-center px-4 min-h-16">
              {!isMdOrLarger && (
                <button
                  onClick={() => setActiveTab("conversation-listings")}
                  className="flex items-center gap-2 text-black px-4 py-2 rounded-full hover:bg-text-800 duration-300"
                >
                  <ArrowLongLeftIcon height={24} />
                </button>
              )}
              {activeConversation && (
                <div className={`flex items-center gap-2 px-2 text-gray-700`}>
                  <div>{activeConversation.title}</div>
                </div>
              )}
              <div className="flex-grow"></div>
              <button className="hover:text-black text-gray-500">
                <EllipsisVerticalIcon height={20} />
              </button>
            </div>
            {activeConversation ? (
              <ConversationScreen
                currentUser={currentUser}
                conversation={activeConversation}
                className="flex-grow vertical-scrollbar border-b mb-2"
              />
            ) : (
              <div className="flex-grow flex justify-center p-12">
                <div className="max-w-lg">
                  <h2 className="text-xl font-bold mb-2 text-gray-500">
                    Welcome to <span className="text-gray-800">Hive</span>!
                  </h2>
                  <p className="text-gray-700">
                    Start chatting with your friends, colleagues, or anyone
                    you'd like. Feel free to create new conversations, send
                    messages, and express yourself.
                  </p>
                  <button
                    onClick={() => setActiveTab("conversation-listings")}
                    className="flex items-center gap-2 my-4 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 duration-300"
                  >
                    <ArrowLongLeftIcon height={24} />
                    <span>Conversations</span>
                  </button>
                </div>
              </div>
            )}
            {activeConversation ? (
              <CreateMessageForm
                currentUser={currentUser}
                className="mx-2 mb-2"
                onSubmit={publishNewMessage}
                conversation_id={activeConversation.id}
              />
            ) : (
              <CreateConversationForm
                currentUser={currentUser}
                className="mx-2 mb-2"
                onSubmit={publishNewConversation}
              />
            )}
          </div>
          <div className="hidden lg:block w-56 lg:w-[20rem] xl:w-[30rem]"></div>
        </div>
      ) : (
        <div className="fixed inset-0 bg-gray-100 flex items-center">
          <div className="container mx-auto p-4">
            <div className="max-w-lg min-w-[20rem] bg-white shadow py-12 px-6">
              <h4 className="font-extrabold text-lg my-2">Login to HIVE</h4>
              <LoginForm onSubmit={handleLogin} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
