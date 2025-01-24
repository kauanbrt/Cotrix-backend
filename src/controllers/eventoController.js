import e from 'cors';
import { EventoService } from '../services/eventoService.js';

export default class eventoController {
  static getAllEventos = async (req, res) => {
    try {
      const eventos = await EventoService.getAllEventos();
      if (eventos.length === 0) {
        return res.status(404).json({ message: 'Eventos não encontrados.' });
      }
      return res.status(200).json(eventos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao obter eventos.' });
    }
  };

  static getEventoById = async (req, res) => {
    const { id } = req.params;
    try {
      const evento = await EventoService.getEventoById(id);
      if (!evento) {
        return res.status(404).json({ message: 'Evento não encontrado.' });
      }
      return res.status(200).json(evento);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao obter evento.' });
    }
  };

  static createEvento = async (req, res) => {
    const {
      nome_evento,
      data_inicio,
      data_fim,
      descricao_evento,
      id_adm,
      qtd_participantes,
      duracao,
      classificacao_evento,
    } = req.body;
    try {
      const novoEvento = await EventoService.createEvento(
        nome_evento,
        data_inicio,
        data_fim,
        descricao_evento,
        id_adm,
        qtd_participantes,
        duracao,
        classificacao_evento
      );
      return res.status(201).json(novoEvento);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao criar evento.' });
    }
  };

  static updateEvento = async (req, res) => {
    const { id } = req.params;
    const {
      nome_evento,
      data_inicio,
      data_fim,
      descricao_evento,
      qtd_participantes,
      duracao,
      classificacao_evento,
    } = req.body;
    try {
      const eventoAtualizado = await EventoService.updateEvento({
        where: { id_evento: parseInt(id) },
        nome_evento,
        data_inicio: new Date(data_inicio),
        data_fim: new Date(data_fim),
        descricao_evento,
        qtd_participantes,
        duracao,
        classificacao_evento,
      });
      return res.status(200).json(eventoAtualizado);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao atualizar evento.' });
    }
  };

  static deleteEvento = async (req, res) => {
    const { id } = req.params;
    try {
      await EventoService.deleteEvento({
        where: { id_evento: parseInt(id) },
      });
      return res.status(200).json({ message: 'Evento deletado com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao deletar evento.' });
    }
  };
}
