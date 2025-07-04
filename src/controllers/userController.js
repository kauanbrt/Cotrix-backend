import UserService from "../services/userService.js";

class UserController {
    static async getAllUserController(req, res) {
        try {
            const users = await UserService.getAllUsers(); 
            return res.status(200).json(users); 
        } catch (error) {
            console.error("Erro no controlador ao obter usuários:", error);
            return res.status(500).json({ message: "Erro ao obter usuários." }); 
        }
    }

}

export default UserController;

