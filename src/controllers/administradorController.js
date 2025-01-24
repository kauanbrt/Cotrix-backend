import { AdministradorService } from '../services/administradorService.js';

export default class administradorController {
  static getAllAdministradores = async (req, res) => {
    try {
      const administradores =
        await AdministradorService.getAllAdministradores();

      if (!administradores) {
        return res
          .status(404)
          .json({ message: 'Administradores não encontrados.' });
      } else {
        return res.status(200).json(administradores);
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: 'Erro ao obter administradores.' });
    }
  };

  static getAdministradorById = async (req, res) => {
    const { id } = req.params;
    try {
      const administrador =
        await AdministradorService.getAllAdministradoresById(id);
      if (!administrador) {
        return res
          .status(404)
          .json({ message: 'Administrador não encontrados.' });
      } else {
        return res.status(200).json(administrador);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao obter administrador.' });
    }
  };

  static createAdministrador = async (req, res) => {
    const { nome_adm, email_adm, senha_adm, tel_adm } = req.body;
    try {
      const novoAdministrador = await AdministradorService.createAdministrador({
        nome_adm,
        email_adm,
        senha_adm,
        tel_adm,
      });
      return res.status(201).json(novoAdministrador);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao criar administrador.' });
    }
  };

  static updateAdministrador = async (req, res) => {
    const { id } = req.params;
    const { nome_adm, email_adm, senha_adm, tel_adm } = req.body;

    try {
      const administradorAtualizado =
        await AdministradorService.updateAdministrador(id, {
          nome_adm,
          email_adm,
          senha_adm,
          tel_adm,
        });
      return res.status(200).json(administradorAtualizado);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: 'Erro ao atualizar administrador.' });
    }
  };

  static deleteAdministrador = async (req, res) => {
    const { id } = req.params;
    try {
      await AdministradorService.deleteAdministrador(id);
      return res
        .status(200)
        .json({ message: 'Administrador deletado com sucesso.' });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: 'Erro ao deletar administrador.' });
    }
  };
}
