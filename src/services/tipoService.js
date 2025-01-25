import prisma from "../database/prisma.js";

export default class TipoService {
    static async getAllTipos() {
        return await prisma.tipo.findMany({
            include: {
                formularios: true,
            },
        });
    }

    static async getTipoById(id) {
        return await prisma.tipo.findUnique({
            where: { id_tipo: parseInt(id) },
            include: {
                formularios: true,
            },
        });
    }

    static async createTipo(data) {
        return await prisma.tipo.create({
            data,
        });
    }

    static async updateTipo(id, data) {
        return await prisma.tipo.update({
            where: { id_tipo: parseInt(id) },
            data,
        });
    }

    static async deleteTipo(id) {
        return await prisma.tipo.delete({
            where: { id_tipo: parseInt(id) },
        });
    }
}
