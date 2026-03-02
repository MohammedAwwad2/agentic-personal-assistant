import { AgentService } from "../services/AgentService.js";
import { VectorRepository } from "../repositories/VectorRepository.js";

const vectorRepository = new VectorRepository();
const agentService = new AgentService(vectorRepository);

export class ChatController {
  static async handleChat(req, res) {
    try {
      const { message, sessionId } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message required" });
      }

      const answer = await agentService.run({ message, sessionId });
      const output = answer?.output || answer?.text || "";

      if (!output || output.trim() === "") {
        return res.json({
          answer:
            "I apologize, but I couldn't generate a proper response. Could you please rephrase your question?",
        });
      }

      res.json({ answer: output });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
}
