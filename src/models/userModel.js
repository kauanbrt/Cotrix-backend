import prisma from '../database/prisma.js';

export default class userModel{

    static getAllUserModel = async () => {
        const users = await prisma.usuario.findMany();
        return users;
    };

}