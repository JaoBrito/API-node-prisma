import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";

const createUserController = new CreateUserController();

const userRoutes = Router();

userRoutes.post("/", async (req, res) => {
    try {
        await createUserController.handle(req, res);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export { userRoutes }