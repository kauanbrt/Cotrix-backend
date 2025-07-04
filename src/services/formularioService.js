import prisma from "../database/prisma.js";

export default class FormularioService {
    static async getAllFormularios() {
        return await prisma.formulario.findMany({
            include: {
                evento: true,
                administrador: true,
                tipo: true,
            },
        });
    }

    static async getFormularioById(id) {
        return await prisma.formulario.findUnique({
            where: { id_formulario: parseInt(id) },
            include: {
                evento: true,
                administrador: true,
                tipo: true,
            },
        });
    }

    static async createFormulario(data) {
        return await prisma.formulario.create({
            data,
        });
    }

    static async updateFormulario(id, data) {
        return await prisma.formulario.update({
            where: { id_formulario: parseInt(id) },
            data,
        });
    }

    static async deleteFormulario(id) {
        return await prisma.formulario.delete({
            where: { id_formulario: parseInt(id) },
        });
    }
}
