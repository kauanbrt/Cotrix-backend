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
      console.error('Erro ao obter feedbacks:', error);
      throw new Error('Erro ao obter feedbacks.');
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
      console.error("Erro ao criar feedback", error);
      throw new Error('Erro ao criar feedback.');
    }
  }

  static async getAllFeedbackByEvento(id) {
    try {
      const feedback = await prisma.evento.findMany({
        where: {
          id_evento: parseInt(id),
        },
        include: {
          participantes: true,
        },
      });
      if (feedback.length === 0) {
        return { message: 'Nenhum feedback registrado.' };
      }
      return feedback;
    } catch (error) {
      console.error('Erro ao obter feedback.', error);
      throw new Error('Erro ao obter feedback.');
    }
  }
}

export { FeedbackService };