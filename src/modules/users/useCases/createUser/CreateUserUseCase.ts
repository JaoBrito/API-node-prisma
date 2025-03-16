import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { AppError } from "../../../../errors/AppError";

export class CreateUserUseCase {
  async execute({name, email} : CreateUserDTO): Promise<User> {
    // Verificar se o usario já existe
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        // email: email
        email
      }
    });
    if (userAlreadyExists){
      // Erro
      throw new AppError("User already exists!");
    }

    // Criar o usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
      }
    });

    return user;
  }
}