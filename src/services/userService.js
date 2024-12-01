import userModel from '../models/userModel.js';

export default class userService extends userModel{

    static getAllUserService = async (req, res) => {
        const users = await userService.getAllUserModel();
        return res.status(200).json(users);
    };

}