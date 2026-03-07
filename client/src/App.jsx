import { useEffect, useRef, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Upload from "./Components/Upload";
import ChatPanel from "./Components/ChatPanel";
import { getquestion, send } from "./apis/sendmessage";


function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);


  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);

    try {
      const response = await send(trimmed);

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "Chat request failed");
      }

      setMessages((prev) => [...prev, { role: "ai", text: data.answer }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "ai", text: err?.message ?? "Chat request failed" }]);
    } finally {
      setLoading(false);
    }
  };

    const askquestion = async() =>{
    const trimmed = input.trim();

    setLoading(true);
    try {
      const response = await getquestion(trimmed);

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "Chat request failed");
      }

      setMessages((prev) => [...prev, { role: "ai", text: data.answer }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "ai", text: err?.message ?? "Chat request failed" }]);
    } finally {
      setLoading(false);
    }

    };

  const onComposerKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="appShell">
      <Header />
      <main className="appMain">
        <Upload />
        <ChatPanel
          messages={messages}
          loading={loading}
          input={input}
          setInput={setInput}
          askquestion={askquestion}
          sendMessage={sendMessage}
          onComposerKeyDown={onComposerKeyDown}
          endOfMessagesRef={endOfMessagesRef}
        />
      </main>
    </div>
  );
}

export default App;
