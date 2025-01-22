import prisma from "../database/prisma.js";

export default class participanteController {

    static getAllParticipantes = async (req, res) => {
        try {
            const participantes = await prisma.participante.findMany({
                include: {
                    administrador: true,
                    eventos: true,
                },
            });
            return res.status(200).json(participantes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter participantes." });
        }
    };

    static getParticipanteById = async (req, res) => {
        const { id } = req.params;
        try {
            const participante = await prisma.participante.findUnique({
                where: { id_participante: parseInt(id) },
                include: {
                    administrador: true,
                    eventos: true,
                },
            });
            if (!participante) {
                return res.status(404).json({ message: "Participante não encontrado." });
            }
            return res.status(200).json(participante);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter participante." });
        }
    };

    static createParticipante = async (req, res) => {
        const { nome_participante, email_participante, RA_participante, tel_participante, isAluno, id_adm } = req.body;
        try {
            const novoParticipante = await prisma.participante.create({
                data: {
                    nome_participante,
                    email_participante,
                    RA_participante,
                    tel_participante,
                    isAluno,
                    administrador: id_adm ? { connect: { id_adm } } : undefined,
                },
            });
            return res.status(201).json(novoParticipante);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar participante." });
        }
    };

    static updateParticipante = async (req, res) => {
        const { id } = req.params;
        const { nome_participante, email_participante, RA_participante, tel_participante, isAluno, id_adm } = req.body;
        try {
            const participanteAtualizado = await prisma.participante.update({
                where: { id_participante: parseInt(id) },
                data: {
                    nome_participante,
                    email_participante,
                    RA_participante,
                    tel_participante,
                    isAluno,
                    administrador: id_adm ? { connect: { id_adm } } : undefined,
                },
            });
            return res.status(200).json(participanteAtualizado);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar participante." });
        }
    };

    // Deletar participante por ID
    static deleteParticipante = async (req, res) => {
        const { id } = req.params;
        try {
            await prisma.participante.delete({
                where: { id_participante: parseInt(id) },
            });
            return res.status(200).json({ message: "Participante deletado com sucesso." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao deletar participante." });
        }
    };
}
