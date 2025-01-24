import prisma from '../../src/database/prisma.js';

class EventoService {

  static async getAllEventos() {
    try {
      const eventos = await prisma.evento.findMany({
        include: {
          administrador: true,
          participantes: true,
          formularios: true,
          feedbacks: true,
          certificados: true,
        },
      });
      return eventos;
    } catch (error) { 
      console.error(error);
      return { message: "Erro ao obter eventos." };
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
      console.error(error);
      return { message: "Erro ao obter evento." };
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
        }
      });
      return novoEvento;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar evento." });
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
          classificacao_evento: evento.classificacao_evento,
        }
      });
      return eventoAtuallizado;
    } catch {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar evento." });
    }
  }

  static deleteEvento(id) {
    try {
      const eventoDeletado = prisma.evento.delete({
        where: { id_evento: parseInt(id) },
      });
      return eventoDeletado;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao deletar evento." });
    }
  }
}

export { EventoService };