import { XMLBuilder } from "fast-xml-parser";
import prisma from "../../src/database/prisma.js";

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
      console.error("Erro ao obter certificados:", error);
      throw new Error("Erro ao obter certificados.");
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
      console.error("Erro ao criar certificado:", error);
      throw new Error("Erro ao criar certificado.");
    }
  }

  static async exportarCertificadosXML(id_evento) {
    try {
      const certificados = await prisma.certificado.findMany({
        where: {
          id_evento: parseInt(id_evento),
          status_certificado: true,
        },
        include: {
          participante: true,
        },
      });

      if (certificados.length === 0) {
        return null;
      }

      // Estruturando os dados para XML
      const data = {
        certificados: {
          certificado: certificados.map(({ participante }) => ({
            RA: participante.RA_participante,
            nome: participante.nome_participante,
          })),
        },
      };

      // Criando XML
      const builder = new XMLBuilder({ format: true });
      return builder.build(data);
    } catch (error) {
      console.error("Erro ao exportar certificados:", error);
      throw new Error("Erro ao exportar certificados.");
    }
  }
}

export { CertificadoService };
