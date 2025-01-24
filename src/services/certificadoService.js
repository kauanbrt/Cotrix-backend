import prisma from '../../src/database/prisma.js';

class CertificadoService {
  static async getAllCertificados() {
    return prisma.certificado.findMany({
      include: {
        evento: true,
        participante: true,
      },
    });
  }

  static async createCertificado(certificado) {
    return prisma.certificado.create({
      data: {
        id_evento: certificado.id_evento,
        id_participante: certificado.id_participante,
        status_certificado: certificado.status_certificado,
      },
    });
  }
}

export { CertificadoService };
