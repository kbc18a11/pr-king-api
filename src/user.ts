import { Router, Request } from 'express';
import { prisma } from './index';

const router = Router();

router.get("", async (req, res) => {
    const users = await prisma.user.findMany();
    return res.status(200).json({ users });
});

interface CreateUserRequest extends Request {
    body: {
        name: string
    }
}

router.post("", async (req: CreateUserRequest, res) => {
    const user = await prisma.user.create({
        data: { name: req.body.name }
    });
    return res.status(201).json({ user });
});

interface UpdateUserRequest extends Request {
    params: {
        id: string
    },
    body: {
        name: string
    }
}

router.patch("/:id", async (req: UpdateUserRequest, res) => {
    const user = await prisma.user.update({
        where: { id: req.params.id },
        data: { name: req.body.name }
    });
    return res.status(200).json({ user });
});


interface DeleteUserRequest extends Request {
    params: {
        id: string
    },
    body: {
        name: string
    }
}

router.delete("/:id", async (req: DeleteUserRequest, res) => {
    await prisma.user.delete({
        where: { id: req.params.id },
    });
    return res.status(204);
});

export { router };
