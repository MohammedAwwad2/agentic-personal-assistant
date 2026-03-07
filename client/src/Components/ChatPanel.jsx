import React from "react";
import MessageList from "./MessageList";
import Composer from "./Composer";

const ChatPanel = ({
  messages,
  loading,
  input,
  setInput,
  sendMessage,
  askquestion,
  onComposerKeyDown,
  endOfMessagesRef,
  messageListProps = {},
  composerProps = {},
  className = "chatPanel"
}) => {
  return (
    <section className={className}>
      <MessageList
        messages={messages}
        loading={loading}
        endOfMessagesRef={endOfMessagesRef}
        {...messageListProps}
      />
      <Composer
        input={input}
        setInput={setInput}
        func1={sendMessage}
        func2={askquestion}
        loading={loading}
        onComposerKeyDown={onComposerKeyDown}
        {...composerProps}
      />
    </section>
  );
};

export default ChatPanel;