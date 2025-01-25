import prisma from '../../src/database/prisma.js';

class CertificadoService {
  static async getAllCertificados() {
    try {
      const certificados = await prisma.certificado.findMany({
        include: {
          evento: true,
          participante: true,
        },
      });
      return certificados;
    } catch (error) {
      console.error('Erro ao obter certificados:', error);
      throw new Error('Erro ao obter certificados.');
    }
  }

  static async createCertificado(certificado) {
    try {
      const novoCertificado = await prisma.certificado.create({
        data: {
          id_evento: certificado.id_evento,
          id_participante: certificado.id_participante,
          status_certificado: certificado.status_certificado,
        },
      });
      return novoCertificado;
    } catch (error) {
      console.error('Erro ao criar certificado:', error);
      throw new Error('Erro ao criar certificado.');
    }
  }
}

export { CertificadoService };
