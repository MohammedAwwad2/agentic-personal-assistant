const API_URL = window._env_.VITE_API_URL;

const send = async (trimmed: string, sessionId: string = "123") => {
    const res = await fetch(`${API_URL}/api/cha/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, sessionId }),
    });

    return res;
};

const getquestion = async (sessionId: string = "123") => {
    const res = await fetch(`${API_URL}/api/chat/get_questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
    });

    return res;
};
export { send, getquestion };