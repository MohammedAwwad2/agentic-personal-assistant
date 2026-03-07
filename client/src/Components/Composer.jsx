import React from "react";

const Composer = ({
  input,
  setInput,
  func1,
  func2,
  loading,
  onComposerKeyDown,
  placeholder = "Message your assistant…",
  buttonText1 = "Send",
  buttonText2 = "ask questions",
  hintText = "Enter to send · Shift+Enter for a new line",
  disabledCondition = (input, loading) => loading || !input.trim(),
  inputType = "textarea",
  rows = 1,
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
        <button className="Button" onClick={func1} disabled={isDisabled}>
          {buttonText1}
        </button>
        <button className="Button" onClick={func2}>
          {buttonText2}
        </button>
      </div>
      <div className="composerHint">{hintText}</div>
    </div>
  );
};

export default Composer;
