import prisma from "../database/prisma.js";

export default class certificadoController {
    static getAllCertificados = async (req, res) => {
        try {
            const certificados = await prisma.certificado.findMany({
                include: {
                    evento: true,
                    participante: true,
                },
            });
            return res.status(200).json(certificados);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter certificados." });
        }
    };

    static createCertificado = async (req, res) => {
        const { id_evento, id_participante, status_certificado } = req.body;
        try {
            const novoCertificado = await prisma.certificado.create({
                data: {
                    id_evento,
                    id_participante,
                    status_certificado,
                },
            });
            return res.status(201).json(novoCertificado);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar certificado." });
        }
    };
}
