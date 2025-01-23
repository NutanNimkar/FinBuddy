import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth } from '../firebaseConfig';

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<
    { user: string; message: string; timestamp: Date }[]
  >([]);

  useEffect(() => {
    // Listen for messages in Firestore
    const messagesQuery = query(
      collection(db, 'chats'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          user: data.user,
          message: data.message,
          timestamp: data.timestamp?.toDate() || new Date(),
        };
      });
      setMessages(fetchedMessages);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, 'chats'), {
        user: auth.currentUser?.email || 'Anonymous',
        message,
        timestamp: new Date(),
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow-md max-w-md w-full">
      <div className="mb-4">
        <h1 className="text-xl font-bold">Chat</h1>
        <div className="overflow-y-auto h-64 bg-white p-4 rounded border">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <strong>{msg.user}:</strong> {msg.message}
            </div>
          ))}
        </div>
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={sendMessage}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default Chat;
