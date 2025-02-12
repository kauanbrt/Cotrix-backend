import prisma from "../database/prisma.js";

export default class ParticipanteService {
    static async getAllParticipantes() {
        return await prisma.participante.findMany({
            include: {
                administrador: true,
                eventos: true,
                certificados: {
                    take: 1,
                    orderBy: {
                        id_certificado: 'desc'
                    },
                    where: {
                        status_certificado: true
                    }
                }
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

    static async getParticipanteByEmail(email) {
        return await prisma.participante.findFirst({
            where: { email_participante: email },
            include: {
                eventos: true,
            },
        });
    }

    static async createParticipante(data) {
        return await prisma.participante.create({
            data,
            include: {
                eventos: true,
            },
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

    static async addParticipanteToEvento(participanteData, eventoId) {
        const evento = await prisma.evento.findUnique({
            where: { id_evento: parseInt(eventoId) },
            include: { participantes: true }
        });

        if (!evento) {
            return {
                success: false,
                message: 'Evento não encontrado'
            };
        }

        if (evento.participantes.length >= evento.qtd_participantes) {
            return {
                success: false,
                message: 'Evento já atingiu o limite de participantes'
            };
        }

        let participante = await this.getParticipanteByEmail(participanteData.email_participante);

        if (!participante) {
            if (!participanteData.nome_participante || 
                !participanteData.RA_participante || 
                !participanteData.tel_participante || 
                participanteData.isAluno === undefined) {
                return {
                    success: false,
                    message: 'Dados insuficientes para criar novo participante'
                };
            }

            try {
                participante = await this.createParticipante(participanteData);
            } catch (error) {
                return {
                    success: false,
                    message: 'Erro ao criar novo participante'
                };
            }
        }

        const jaInscrito = evento.participantes.some(
            p => p.id_participante === participante.id_participante
        );

        if (jaInscrito) {
            return {
                success: false,
                message: 'Participante já está inscrito neste evento'
            };
        }

        try {
            const eventoAtualizado = await prisma.evento.update({
                where: { id_evento: parseInt(eventoId) },
                data: {
                    participantes: {
                        connect: { id_participante: participante.id_participante }
                    }
                },
                include: {
                    participantes: true
                }
            });

            return {
                success: true,
                message: 'Participante adicionado ao evento com sucesso',
                data: eventoAtualizado
            };
        } catch (error) {
            return {
                success: false,
                message: 'Erro ao adicionar participante ao evento'
            };
        }
    }

}