import prisma from "../database/prisma.js";

export default class ParticipanteService {
    static async getAllParticipantes() {
        return await prisma.participante.findMany({
            include: {
                administrador: true,
                eventos: true,
            },
        });
    }

    static async getParticipanteById(id) {
        return await prisma.participante.findUnique({
            where: { id_participante: parseInt(id) },
            include: {
                administrador: true,
                eventos: true,
            },
        });
    }

    static async createParticipante(data) {
        return await prisma.participante.create({
            data,
        });
    }

    static async updateParticipante(id, data) {
        return await prisma.participante.update({
            where: { id_participante: parseInt(id) },
            data,
        });
    }

    static async deleteParticipante(id) {
        return await prisma.participante.delete({
            where: { id_participante: parseInt(id) },
        });
    }
}
