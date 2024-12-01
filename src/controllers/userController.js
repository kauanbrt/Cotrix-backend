import userService from "../services/userService.js";

export default class userController extends userService{

    static getAllUserController = async (req, res) => {
        const users = await userController.getAllUserService();
        return res.status(200).json(users);
    };

}