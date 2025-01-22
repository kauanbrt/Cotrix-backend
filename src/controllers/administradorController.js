import prisma from "../database/prisma.js";

export default class administradorController {
    static getAllAdministradores = async (req, res) => {
        try {
            const administradores = await prisma.administrador.findMany({
                include: {
                    eventos: true,
                    formularios: true,
                    participantes: true,
                },
            });
            return res.status(200).json(administradores);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter administradores." });
        }
    };

    static getAdministradorById = async (req, res) => {
        const { id } = req.params;
        try {
            const administrador = await prisma.administrador.findUnique({
                where: { id_adm: parseInt(id) },
                include: {
                    eventos: true,
                    formularios: true,
                    participantes: true,
                },
            });
            if (!administrador) {
                return res.status(404).json({ message: "Administrador não encontrado." });
            }
            return res.status(200).json(administrador);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter administrador." });
        }
    };

    static createAdministrador = async (req, res) => {
        const { nome_adm, email_adm, senha_adm, tel_adm } = req.body;
        try {
            const novoAdministrador = await prisma.administrador.create({
                data: {
                    nome_adm,
                    email_adm,
                    senha_adm,
                    tel_adm,
                },
            });
            return res.status(201).json(novoAdministrador);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar administrador." });
        }
    };

    static updateAdministrador = async (req, res) => {
        const { id } = req.params;
        const { nome_adm, email_adm, senha_adm, tel_adm } = req.body;
        try {
            const administradorAtualizado = await prisma.administrador.update({
                where: { id_adm: parseInt(id) },
                data: {
                    nome_adm,
                    email_adm,
                    senha_adm,
                    tel_adm,
                },
            });
            return res.status(200).json(administradorAtualizado);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar administrador." });
        }
    };

    static deleteAdministrador = async (req, res) => {
        const { id } = req.params;
        try {
            await prisma.administrador.delete({
                where: { id_adm: parseInt(id) },
            });
            return res.status(200).json({ message: "Administrador deletado com sucesso." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao deletar administrador." });
        }
    };
}
