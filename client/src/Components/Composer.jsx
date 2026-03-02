import React from "react";

const Composer = ({
  input,
  setInput,
  sendMessage,
  loading,
  onComposerKeyDown,
  placeholder = "Message your assistant…",
  buttonText = "Send",
  hintText = "Enter to send · Shift+Enter for a new line",
  disabledCondition = (input, loading) => loading || !input.trim(),
  inputType = "textarea",
  rows = 1
}) => {
  const isDisabled = disabledCondition(input, loading);

  return (
    <div className="composer">
      <div className="composerInner">
        {inputType === "textarea" ? (
          <textarea
            className="composerInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onComposerKeyDown}
            placeholder={placeholder}
            rows={rows}
          />
        ) : (
          <input
            className="composerInput"
            type={inputType}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onComposerKeyDown}
            placeholder={placeholder}
          />
        )}
        <button
          className="sendButton"
          onClick={sendMessage}
          disabled={isDisabled}
        >
          {buttonText}
        </button>
      </div>
      <div className="composerHint">{hintText}</div>
    </div>
  );
};

export default Composer;