import { CertificadoService } from "../services/certificadoService.js";

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

  static updateCertificadosByEvent = async (req, res) => {
    const { id_evento } = req.body;
    try {
      const certificadosAtualizados = await CertificadoService.updateCertificadosByEvent(id_evento);
      return res.status(201).json(certificadosAtualizados);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  };

  static exportarCertificadosXML = async (req, res) => {
    try {
      const { id_evento } = req.params;
      const xmlContent = await CertificadoService.exportarCertificadosXML(id_evento);

      if (!xmlContent) {
        return res.status(404).json({ message: "Nenhum certificado encontrado para este evento." });
      }

      // Configura o cabeçalho para download do arquivo
      res.setHeader("Content-Type", "application/xml");
      res.setHeader("Content-Disposition", `attachment; filename=certificados_evento_${id_evento}.xml`);

      // Envia o conteúdo XML como resposta
      res.status(200).send(xmlContent);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  };
}
