import { FeedbackService } from '../services/feedbackService.js';
import { EventoService } from '../services/eventoService.js';

export default class feedbackController {

  static getAllFeedbacks = async (req, res) => {
    try {
      const feedbacks = await FeedbackService.getAllFeedbacks();

      if (feedbacks.length === 0) {
        return res.status(404).json({ message: 'Nenhum feedback registrado.' });
      } else {
        return res.status(200).json(feedbacks);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  };

  static getAllFeedbackByEvento = async (req, res) => {
    const { id } = req.params;
    try {
      const feedback = await FeedbackService.getAllFeedbackByEvento(id);
      return res.status(200).json(feedback);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  static createFeedback = async (req, res) => {
    const { id_evento, email_participante, descricao_feedback, classificacao_feedback } = req.body;

    try {
      const feedback = await FeedbackService.createFeedback({
        id_evento,
        email_participante,
        descricao_feedback,
        classificacao_feedback,
      });
  
      return res.status(feedback.status).json({ feedback });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  };
}
