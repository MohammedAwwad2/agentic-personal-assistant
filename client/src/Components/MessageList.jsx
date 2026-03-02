import React from "react";
import ReactMarkdown from "react-markdown";

const MessageList = ({
  messages,
  loading,
  endOfMessagesRef,
  emptyStateMessage = "Upload a PDF to ingest it, then ask a question below.",
  loadingText = "Thinking…",
  renderMessage,
  messageKey = "text",
  roleKey = "role"
}) => {
  const defaultRenderMessage = (message, index) => (
    <div key={index} className={message[roleKey] === "user" ? "messageRow isUser" : "messageRow isAi"}>
      <div className="messageBubble">
        {message[roleKey] === "ai" ? <ReactMarkdown>{message[messageKey]}</ReactMarkdown> : message[messageKey]}
      </div>
    </div>
  );

  return (
    <div className="messages">
      {messages.length === 0 && (
        <div className="emptyState">
          {emptyStateMessage}
        </div>
      )}

      {messages.map((m, i) => (
        renderMessage ? renderMessage(m, i) : defaultRenderMessage(m, i)
      ))}

      {loading && (
        <div className="messageRow isAi">
          <div className="messageBubble isTyping">{loadingText}</div>
        </div>
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default MessageList;