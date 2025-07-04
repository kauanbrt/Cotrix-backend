import prisma from '../../src/database/prisma.js';

class EventoService {
  static async getAllEventos() {
    try {
      const eventos = await prisma.evento.findMany({
        include: {
          administrador: true,
          _count: {
            select: {
              participantes: true,
            }
          },
          formularios: true,
          feedbacks: true,
          certificados: true,
        },
      });
      return eventos;
    } catch (error) {
      console.error('Erro ao obter eventos:', error);
      throw new Error('Erro ao obter eventos.');
    }
  }

  static async getEventoById(id) {
    try {
      const evento = await prisma.evento.findUnique({
        where: { id_evento: parseInt(id) },
        include: {
          administrador: true,
          participantes: true,
          formularios: true,
          feedbacks: true,
          certificados: true,
        },
      });
      return evento;
    } catch (error) {
      console.error('Erro ao obter evento:', error);
      throw new Error('Erro ao obter evento.');
    }
  }

  static async createEvento(evento) {
    try {
      const novoEvento = await prisma.evento.create({
        data: {
          nome_evento: evento.nome_evento,
          data_inicio: evento.data_inicio,
          data_fim: evento.data_fim,
          descricao_evento: evento.descricao_evento,
          qtd_participantes: evento.qtd_participantes,
          duracao: evento.duracao,
          classificacao_evento: 0,
          administrador: {
            connect: { id_adm: evento.id_adm },
          },
        },
      });
      return novoEvento;
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      throw new Error('Erro ao criar evento.');
    }
  }

  static updateEvento = async (id, evento) => {
    try {
      const eventoAtuallizado = await prisma.evento.update({
        where: { id_evento: parseInt(id) },
        data: {
          nome_evento: evento.nome_evento,
          data_inicio: evento.data_inicio,
          data_fim: evento.data_fim,
          descricao_evento: evento.descricao_evento,
          qtd_participantes: evento.qtd_participantes,
          duracao: evento.duracao,
        },
      });
      return eventoAtuallizado;
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      throw new Error('Erro ao atualizar evento.');
    }
  };

  static deleteEvento(id) {
    try {
      const eventoDeletado = prisma.evento.delete({
        where: { id_evento: parseInt(id) },
      });
      return eventoDeletado;
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
      throw new Error('Erro ao deletar evento.');
    }
  }

  static async calcularMediaEvento(id) {
    try {
      const feedbacks = await prisma.feedback.findMany({
        where: { id_evento: parseInt(id) },
      });

      if (feedbacks.length === 0) {
        return res.status(404).json({ message: 'Nenhuma feedback encontrado.' });
      }

      const somaNotas = feedbacks.reduce((soma, feedback) => soma + feedback.classificacao_feedback, 0);
      const media = somaNotas / feedbacks.length;

      await prisma.evento.update({
        where: { id_evento },
        data: { classificacao_evento: Math.round(media) },
      });

      return media;
    } catch (error) {
      console.error('Erro ao calcular média do evento:', error);
      throw new Error('Erro ao calcular média do evento.');
    }
  }
}

export { EventoService };
