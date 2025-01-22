import prisma from "../database/prisma.js";

export default class feedbackController {
    static getAllFeedbacks = async (req, res) => {
        try {
            const feedbacks = await prisma.feedback.findMany({
                include: {
                    evento: true,
                    participante: true,
                },
            });
            return res.status(200).json(feedbacks);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter feedbacks." });
        }
    };

    static createFeedback = async (req, res) => {
        const { id_evento, id_participante, descricao_feedback, classificacao_feedback } = req.body;
        try {
            const novoFeedback = await prisma.feedback.create({
                data: {
                    id_evento,
                    id_participante,
                    descricao_feedback,
                    classificacao_feedback,
                },
            });
            return res.status(201).json(novoFeedback);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar feedback." });
        }
    };
}
