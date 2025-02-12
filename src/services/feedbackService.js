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

  static async createFeedback(feedbackData) {
    try {
      if (!feedbackData.id_participante) {
        if (!feedbackData.email_participante) {
          throw new Error('Email do participante é necessário para identificar o participante.');
        }

        const participante = await prisma.participante.findFirst({
          where: { email_participante: feedbackData.email_participante },
          include: { eventos: true },
        });

        if (!participante) {
          return { message: 'Email não está associado a nenhum participante.' };
        }

        const isInscritoNoEvento = participante.eventos.some(
          (evento) => evento.id_evento === feedbackData.id_evento
        );
        if (!isInscritoNoEvento) {
          return { message: 'Participante não inscrito no evento.' };
        }

        feedbackData.id_participante = participante.id_participante;
      }

      const existingFeedback = await prisma.feedback.findUnique({
        where: {
          id_evento_id_participante: {
            id_evento: feedbackData.id_evento,
            id_participante: feedbackData.id_participante,
          },
        },
      });

      if (existingFeedback) {
        return { message: 'Feedback já registrado para esse evento e participante.' };
      }

      const feedback = await prisma.feedback.create({
        data: feedbackData,
      });

      const feedbacks = await prisma.feedback.findMany({
        where: {
          id_evento: feedbackData.id_evento,
        },
        select: {
          classificacao_feedback: true,
        },
      });

      const totalClassificacao = feedbacks.reduce(
        (sum, feedback) => sum + feedback.classificacao_feedback,
        0
      );
      const novaMedia = totalClassificacao / feedbacks.length;

      const updatedEvento = await prisma.evento.update({
        where: {
          id_evento: feedbackData.id_evento,
        },
        data: {
          classificacao_evento: novaMedia,
        },
      });

      return { feedback, updatedEvento };
    } catch (error) {
      console.error('Erro ao criar feedback:', error);
      throw new Error('Erro ao criar feedback.');
    }
  }

  static async getAllFeedbackByEvento(id) {
    try {
      const feedbacksDoEvento = await prisma.evento.findMany({
        where: {
          id_evento: parseInt(id),
        },
        include: {
          feedbacks: true,
        },
      });

      if (!feedbacksDoEvento || feedbacksDoEvento.length === 0) {
        return { message: 'Nenhum feedback registrado.' };
      }

      return feedbacksDoEvento[0].feedbacks;
    } catch (error) {
      console.error('Erro ao obter feedback:', error);
      throw new Error('Erro ao obter feedback.');
    }
  }
}

export { FeedbackService };
