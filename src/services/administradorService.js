import prisma from '../../src/database/prisma.js';

class AdministradorService {
  static async getAllAdministradores() {
    try {
      const administradores = await prisma.administrador.findMany({
        include: {
          eventos: true,
          formularios: true,
          participantes: true,
        },
      });
      return administradores;
    } catch (error) {
      console.error('Erro ao obter administradores:', error);
      throw new Error('Erro ao obter administradores.');
    }
  }

  static async getAdministradoresById(id) {
    try {
      const administrador = await prisma.administrador.findUnique({
        where: { id_adm: parseInt(id) },
        include: {
          eventos: true,
          formularios: true,
          participantes: true,
        },
      });
      return administrador;
    } catch (error) {
      console.error('Erro ao obter administrador:', error);
      throw new Error('Erro ao obter administrador.');
    }
  }

  static async createAdministrador(administrador) {
    try {
      const novoAdministrador = await prisma.administrador.create({
        data: {
          nome_adm: administrador.nome_adm,
          email_adm: administrador.email_adm,
          tel_adm: administrador.tel_adm,
        },
      });
      return novoAdministrador;
    } catch (error) {
      console.error('Erro ao criar administrador:', error);
      throw new Error('Erro ao criar administrador.');
    }
  }

  static async updateAdministrador(id, administrador) {
    try {
      const administradorAtualizado = await prisma.administrador.update({
        where: { id_adm: parseInt(id) },
        data: {
          nome_adm: administrador.nome_adm,
          email_adm: administrador.email_adm,
          tel_adm: administrador.tel_adm,
        },
      });
      return administradorAtualizado;
    } catch (error) {
      console.error('Erro ao atualizar administrador:', error);
      throw new Error('Erro ao atualizar administrador.');
    }
  }

  static async deleteAdministrador(id) {
    try {
      const administradorDeletado = await prisma.administrador.delete({
        where: { id_adm: parseInt(id) },
      });
      return administradorDeletado;
    } catch (error) {
      console.error('Erro ao deletar administrador:', error);
      throw new Error('Erro ao deletar administrador.');
    }
  }
}

export { AdministradorService };
