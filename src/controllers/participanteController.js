import ParticipanteService from "../services/participanteService.js";

export default class ParticipanteController {
    static async getAllParticipantes(req, res) {
        try {
            const participantes = await ParticipanteService.getAllParticipantes();
            return res.status(200).json(participantes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter participantes." });
        }
    }

    static async getParticipanteById(req, res) {
        const { id } = req.params;
        try {
            const participante = await ParticipanteService.getParticipanteById(id);
            if (!participante) {
                return res.status(404).json({ message: "Participante não encontrado." });
            }
            return res.status(200).json(participante);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter participante." });
        }
    }

    static async createParticipante(req, res) {
        const { nome_participante, email_participante, RA_participante, tel_participante, isAluno, id_adm } = req.body;
        try {
            const novoParticipante = await ParticipanteService.createParticipante({
                nome_participante,
                email_participante,
                RA_participante,
                tel_participante,
                isAluno,
                administrador: id_adm ? { connect: { id_adm } } : undefined,
            });
            return res.status(201).json(novoParticipante);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar participante." });
        }
    }

    static async updateParticipante(req, res) {
        const { id } = req.params;
        const { nome_participante, email_participante, RA_participante, tel_participante, isAluno, id_adm } = req.body;
        try {
            const participanteAtualizado = await ParticipanteService.updateParticipante(id, {
                nome_participante,
                email_participante,
                RA_participante,
                tel_participante,
                isAluno,
                administrador: id_adm ? { connect: { id_adm } } : undefined,
            });
            return res.status(200).json(participanteAtualizado);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar participante." });
        }
    }

    static async deleteParticipante(req, res) {
        const { id } = req.params;
        try {
            await ParticipanteService.deleteParticipante(id);
            return res.status(200).json({ message: "Participante deletado com sucesso." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao deletar participante." });
        }
    }
}
