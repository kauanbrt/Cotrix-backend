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
      console.error(error);
      return { message: 'Erro ao obter administradores.' };
    }
  }

  static async getAllAdministradoresById(id) {
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
        return { message: 'Administrador não encontrado.' };
      }
      return administrador;
    } catch (error) {
      console.error(error);
      return { message: 'Erro ao obter administrador.' };
    }
  }

  static async createAdministrador(administrador) {
    try {
      const novoAdministrador = await prisma.administrador.create({
        data: {
          nome_adm: administrador.nome_adm,
          email_adm: administrador.email_adm,
          senha_adm: administrador.senha_adm,
          tel_adm: administrador.tel_adm,
        },
      });
      return novoAdministrador;
    } catch (error) {
      console.error(error);
      return { message: 'Erro ao criar administrador.' };
    }
  }

  static async updateAdministrador(id, administrador) {
    try {
      const administradorAtualizado = await prisma.administrador.update({
        where: { id_adm: parseInt(id) },
        nome_adm: administrador.nome_adm,
        email_adm: administrador.email_adm,
        senha_adm: administrador.senha_adm,
        tel_adm: administrador.tel_adm,
      });
      return administradorAtualizado;
    } catch (error) {
      console.error(error);
      return { message: 'Erro ao atualizar administrador.' };
    }
  }

  static async deleteAdministrador(id) {
    try {
      const administradorDeletado = await prisma.administrador.delete({
        where: { id_adm: parseInt(id) },
      });
      return administradorDeletado;
    } catch (error) {
      console.error(error);
      return { message: 'Erro ao deletar administrador.' };
    }
  }
}

export { AdministradorService };
