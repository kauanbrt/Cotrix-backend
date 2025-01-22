import prisma from "../database/prisma.js";

export default class formularioController {
    static getAllFormularios = async (req, res) => {
        try {
            const formularios = await prisma.formulario.findMany({
                include: {
                    evento: true,
                    administrador: true,
                    tipo: true,
                },
            });
            return res.status(200).json(formularios);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter formulários." });
        }
    };

    static getFormularioById = async (req, res) => {
        const { id } = req.params;
        try {
            const formulario = await prisma.formulario.findUnique({
                where: { id_formulario: parseInt(id) },
                include: {
                    evento: true,
                    administrador: true,
                    tipo: true,
                },
            });
            if (!formulario) {
                return res.status(404).json({ message: "Formulário não encontrado." });
            }
            return res.status(200).json(formulario);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter formulário." });
        }
    };

    static createFormulario = async (req, res) => {
        const { id_evento, id_adm, id_tipo, nome_formulario, status_formulario } = req.body;
        try {
            const novoFormulario = await prisma.formulario.create({
                data: {
                    id_evento,
                    id_adm,
                    id_tipo,
                    nome_formulario,
                    status_formulario,
                },
            });
            return res.status(201).json(novoFormulario);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar formulário." });
        }
    };

    static updateFormulario = async (req, res) => {
        const { id } = req.params;
        const { nome_formulario, status_formulario } = req.body;
        try {
            const formularioAtualizado = await prisma.formulario.update({
                where: { id_formulario: parseInt(id) },
                data: { nome_formulario, status_formulario },
            });
            return res.status(200).json(formularioAtualizado);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar formulário." });
        }
    };

    static deleteFormulario = async (req, res) => {
        const { id } = req.params;
        try {
            await prisma.formulario.delete({
                where: { id_formulario: parseInt(id) },
            });
            return res.status(200).json({ message: "Formulário deletado com sucesso." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao deletar formulário." });
        }
    };
}
