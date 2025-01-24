import prisma from '../../src/database/prisma.js';

class FeedbackService {
  static async getAllFeedbacks() {
    try {
      const feedbacks = await prisma.feedback.findMany({
        include: {
          evento: true,
          participante: true,
        },
      });
      return feedbacks;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao obter feedbacks.' });
    }
  }

  static async createFeedback(feedback) {
    try {
      const novoFeedback = await prisma.feedback.create({
        data: {
          id_evento: feedback.id_evento,
          id_participante: feedback.id_participante,
          descricao_feedback: feedback.descricao_feedback,
          classificacao_feedback: feedback.classificacao_feedback,
        },
      });
      return novoFeedback;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao criar feedback.' });
    }
  }
}

export { FeedbackService };