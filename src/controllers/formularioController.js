import FormularioService from "../services/formularioService.js";

export default class FormularioController {
    static async getAllFormularios(req, res) {
        try {
            const formularios = await FormularioService.getAllFormularios();
            return res.status(200).json(formularios);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter formulários." });
        }
    }

    static async getFormularioById(req, res) {
        const { id } = req.params;
        try {
            const formulario = await FormularioService.getFormularioById(id);
            if (!formulario) {
                return res.status(404).json({ message: "Formulário não encontrado." });
            }
            return res.status(200).json(formulario);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter formulário." });
        }
    }

    static async createFormulario(req, res) {
        const { id_evento, id_adm, id_tipo, nome_formulario, status_formulario } = req.body;
        try {
            const novoFormulario = await FormularioService.createFormulario({
                id_evento,
                id_adm,
                id_tipo,
                nome_formulario,
                status_formulario,
            });
            return res.status(201).json(novoFormulario);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar formulário." });
        }
    }

    static async updateFormulario(req, res) {
        const { id } = req.params;
        const { nome_formulario, status_formulario } = req.body;
        try {
            const formularioAtualizado = await FormularioService.updateFormulario(id, {
                nome_formulario,
                status_formulario,
            });
            return res.status(200).json(formularioAtualizado);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar formulário." });
        }
    }

    static async deleteFormulario(req, res) {
        const { id } = req.params;
        try {
            await FormularioService.deleteFormulario(id);
            return res.status(200).json({ message: "Formulário deletado com sucesso." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao deletar formulário." });
        }
    }
}
