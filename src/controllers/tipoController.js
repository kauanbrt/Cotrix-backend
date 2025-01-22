import prisma from "../database/prisma.js";

export default class tipoController {
    static getAllTipos = async (req, res) => {
        try {
            const tipos = await prisma.tipo.findMany({
                include: {
                    formularios: true,
                },
            });
            return res.status(200).json(tipos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter tipos." });
        }
    };

    static getTipoById = async (req, res) => {
        const { id } = req.params;
        try {
            const tipo = await prisma.tipo.findUnique({
                where: { id_tipo: parseInt(id) },
                include: {
                    formularios: true,
                },
            });
            if (!tipo) {
                return res.status(404).json({ message: "Tipo não encontrado." });
            }
            return res.status(200).json(tipo);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter tipo." });
        }
    };

    static createTipo = async (req, res) => {
        const { nome_tipo } = req.body;
        try {
            const novoTipo = await prisma.tipo.create({
                data: { nome_tipo },
            });
            return res.status(201).json(novoTipo);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar tipo." });
        }
    };

    static updateTipo = async (req, res) => {
        const { id } = req.params;
        const { nome_tipo } = req.body;
        try {
            const tipoAtualizado = await prisma.tipo.update({
                where: { id_tipo: parseInt(id) },
                data: { nome_tipo },
            });
            return res.status(200).json(tipoAtualizado);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar tipo." });
        }
    };

    static deleteTipo = async (req, res) => {
        const { id } = req.params;
        try {
            await prisma.tipo.delete({
                where: { id_tipo: parseInt(id) },
            });
            return res.status(200).json({ message: "Tipo deletado com sucesso." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao deletar tipo." });
        }
    };
}
