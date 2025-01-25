import prisma from "../database/prisma.js";

class UserService {
    static async getAllUsers() {
        try {
            const users = await prisma.usuario.findMany(); 
            return users;
        } catch (error) {
            console.error("Erro no serviço ao obter usuários:", error);
            throw new Error("Erro ao buscar usuários."); 
        }
    }

}

export default UserService;
