import TipoService from "../services/tipoService.js";

export default class TipoController {
    static async getAllTipos(req, res) {
        try {
            const tipos = await TipoService.getAllTipos();
            return res.status(200).json(tipos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter tipos." });
        }
    }

    static async getTipoById(req, res) {
        const { id } = req.params;
        try {
            const tipo = await TipoService.getTipoById(id);
            if (!tipo) {
                return res.status(404).json({ message: "Tipo não encontrado." });
            }
            return res.status(200).json(tipo);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter tipo." });
        }
    }

    static async createTipo(req, res) {
        const { nome_tipo } = req.body;
        try {
            const novoTipo = await TipoService.createTipo({ nome_tipo });
            return res.status(201).json(novoTipo);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar tipo." });
        }
    }

    static async updateTipo(req, res) {
        const { id } = req.params;
        const { nome_tipo } = req.body;
        try {
            const tipoAtualizado = await TipoService.updateTipo(id, { nome_tipo });
            return res.status(200).json(tipoAtualizado);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar tipo." });
        }
    }

    static async deleteTipo(req, res) {
        const { id } = req.params;
        try {
            await TipoService.deleteTipo(id);
            return res.status(200).json({ message: "Tipo deletado com sucesso." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao deletar tipo." });
        }
    }
}
