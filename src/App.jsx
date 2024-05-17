// import axios from "axios";
// import { useEffect, useState } from "react";
// import useWebSocket from "react-use-websocket";
// import CreateConversationForm from "./components/CreateConversationForm";
// import ConversationList from "./components/ConversationList";
// import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
// import CreateMessageForm from "./components/CreateMessageForm";
// import ConversationScreen from "./components/ConversationScreen";

import { useEffect } from "react";

// function App() {
//   const WS_URL = "ws://192.168.100.14:3000/cable";
//   const [conversations, setConversations] = useState([]);
//   const [activeConversation, setActiveConversation] = useState(null);

//   const fetchConversations = async function () {
//     const response = await axios
//       .get("http://192.168.100.14:3000/conversations")
//       .then((res) => res.data)
//       .catch((axiosError) => {
//         console.log("AXIOS ERROR: " + axiosError);
//         return null;
//       });

//     if (Array.isArray(response)) {
//       setConversations(response);

//       // Subscribe to the MessagesChannel for each conversation
//       response.forEach((conversation) => {
//         subscribeToConversation(conversation.id);
//       });
//     }
//   };

//   const publishNewConversation = (newConversation) => {
//     axios.post("http://192.168.100.14:3000/conversations", newConversation);
//   };

//   const publishNewMessage = (newMessage) => {
//     axios.post("http://192.168.100.14:3000/messages", newMessage);
//   };

//   const { lastMessage, sendMessage, readyState } = useWebSocket(WS_URL, {
//     share: true,
//     onOpen: () => {
//       console.log("Web socket connected");
//       sendMessage(
//         JSON.stringify({
//           command: "subscribe",
//           identifier: JSON.stringify({ channel: "ConversationsChannel" }),
//         })
//       );
//     },
//     onError: (error) => {
//       console.log("WEB-SOCKET ERROR: " + error);
//     },
//     onClose: (error) => {
//       console.log("CONNECTION CLOSED: " + error);
//     },
//     reconnectAttempts: 10,
//     reconnectInterval: 3000,
//   });

//   useEffect(() => {
//     fetchConversations();
//   }, []);

//   const subscribeToConversation = (conversationId) => {
//     sendMessage(
//       JSON.stringify({
//         command: "subscribe",
//         identifier: JSON.stringify({
//           channel: "MessagesChannel",
//           conversation: conversationId,
//         }),
//       })
//     );
//   };

//   // useEffect(() => {
//   //   if (readyState === 1) {
//   //     sendMessage(
//   //       JSON.stringify({
//   //         command: "subscribe",
//   //         identifier: JSON.stringify({ channel: "MessagesChannel" }),
//   //       })
//   //     );
//   //   }
//   // }, [readyState]);

//   useEffect(() => {
//     if (lastMessage && lastMessage.data) {
//       const messageData = JSON.parse(lastMessage.data);
//       if (messageData.identifier) {
//         const messageIdentifier = JSON.parse(messageData.identifier);
//         if (messageIdentifier.channel === "ConversationsChannel") {
//           if (messageData.message) {
//             const conversation = messageData.message.conversation;
//             subscribeToConversation(conversation.id);
//             setConversations((convs) => [conversation, ...convs]);
//           }
//         } else if (messageIdentifier.channel === "MessagesChannel") {
//           if (messageData.message) {
//             const message = messageData.message.message;
//             setConversations((convs) =>
//               convs.map((conv) => {
//                 if (conv.id === message.conversation_id) {
//                   if (
//                     !Boolean(conv.messages.find((m) => m.id === message.id))
//                   ) {
//                     conv.messages.push(message);
//                   }
//                 }
//                 return conv;
//               })
//             );
//           }
//         }
//       }
//     }
//   }, [lastMessage]);

//   return (
//     <div className="fixed inset-0 flex bg-gray-100">
//       <div className="border-r w-56">
//         <div className="border-b h-16 flex items-center">
//           <h4 className="p-2 font-bold">ConversationList</h4>
//         </div>
//         <ConversationList
//           activeConversation={activeConversation}
//           setActiveConversation={setActiveConversation}
//           conversations={conversations}
//           className=""
//         />
//       </div>
//       <div className="flex-grow flex flex-col">
//         <div className="h-16 border-b flex items-center px-4">
//           {activeConversation && (
//             <div
//               className={`flex items-center gap-2 px-2 hover:bg-black text-gray-700 hover:text-white duration-300 cursor-pointer`}
//             >
//               <div className="w-8 h-8 flex justify-center items-center border-4 border-gray-700 rounded-full font-semibold">
//                 {activeConversation.title?.slice(0, 1)}
//               </div>
//               <div>{activeConversation.title}</div>
//             </div>
//           )}
//           <div className="flex-grow"></div>
//           <button className="hover:text-black text-gray-500">
//             <EllipsisVerticalIcon height={20} />
//           </button>
//         </div>
//         {activeConversation ? (
//           <ConversationScreen
//             conversation={activeConversation}
//             className="flex-grow overflow-y-scroll"
//           />
//         ) : (
//           <div className="flex-grow flex justify-center p-12">
//             <div className="max-w-lg">
//               <h2 className="text-xl font-bold mb-2 text-gray-500">
//                 Welcome to <span className="text-gray-800">Hive</span>!
//               </h2>
//               <p className="text-gray-700">
//                 Start chatting with your friends, colleagues, or anyone you'd
//                 like. Feel free to create new conversations, send messages, and
//                 express yourself.
//               </p>
//             </div>
//           </div>
//         )}
//         {activeConversation ? (
//           <CreateMessageForm
//             className="mx-2 mb-2"
//             onSubmit={publishNewMessage}
//             conversation_id={activeConversation.id}
//           />
//         ) : (
//           <CreateConversationForm
//             className="mx-2 mb-2"
//             onSubmit={publishNewConversation}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

export default function App() {
  const login = function () {
    fetch("http://192.168.100.14:3000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: "erick",
        password: "password",
      }),
    }).then((response) => {
      response.json().then((res) => {
        console.log(res);
      });
    });
  };

  const currentUser = function () {
    fetch("http://192.168.100.14:3000/current-user", {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      response.json().then((res) => {
        console.log(res);
      });
    });
  };

  useEffect(() => {
    // login();
    currentUser();
  }, []);

  return <div></div>;
}
