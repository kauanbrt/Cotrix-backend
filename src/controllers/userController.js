import userService from "../services/userService.js"; 

export default class userController {

    static getAllUserController = async (req, res) => {
        try {
            const users = await userService.getAllUserService();
            return res.status(200).json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter usuários." });
        }
    };

}
