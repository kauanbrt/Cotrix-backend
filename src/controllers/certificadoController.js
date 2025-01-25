import { CertificadoService } from '../services/certificadoService.js';

export default class certificadoController {
  static getAllCertificados = async (req, res) => {
    try {
      const certificados = await CertificadoService.getAllCertificados();
      return res.status(200).json(certificados);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  };

  static createCertificado = async (req, res) => {
    const { id_evento, id_participante, status_certificado } = req.body;
    try {
      const novoCertificado = await CertificadoService.createCertificado({
        id_evento,
        id_participante,
        status_certificado,
      });
      return res.status(201).json(novoCertificado);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  };
}
