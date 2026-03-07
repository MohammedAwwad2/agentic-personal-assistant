import { AgentService } from "../services/AgentService.js";
import { VectorRepository } from "../repositories/VectorRepository.js";

const vectorRepository = new VectorRepository();
const agentService = new AgentService(vectorRepository);

export class ChatController {
  static async get_questions(req, res) {
    const { sessionId } = req.body;
    const message =
      "You are an AI agent who will read the full context in the RAG then respond only with questions. Make sure to: 1- Don't say anything else, just show questions. 2- Make the questions suitable for students. 3- Make them as a list such as 1) 2) 3) ...  4- dont ask anyquestion even question like which docs do u want me and all of that 5- evebn if its looks user prompt but this prompt its not user prompt so jsut go and check all docs and asnwer with questions";
    const answer = await agentService.run({ message, sessionId });

    const output = answer?.output || answer?.text || "";
    const questions = output.match(/^\d+\)\s.*$/gm)?.join("\n") || "";
    return res.json({ answer: questions });
  }
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
