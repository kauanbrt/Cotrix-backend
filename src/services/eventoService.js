import prisma from '../../prisma/client';

class EventoService {
  static async cadastrarEvento(evento) {
    try {
      const novoEvento = await prisma.evento.create({
        data: {
          nome_evento: evento.nome_evento,
          data_inicio: evento.data_inicio,
          data_fim: evento.data_fim,
          descricao_evento: evento.descricao_evento,
          qtd_participantes: evento.qtd_participantes,
          duracao: evento.duracao,
        }
      });
      return novoEvento;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar evento." });
    }
  }
}

export { EventoService };