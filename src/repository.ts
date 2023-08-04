import { Router, Request } from 'express';
import { prisma, octokit } from './index';
import { RequestInterface } from "@octokit/types";
import { RequestError } from 'octokit';

const router = Router();

interface CreateRepositoryRequest extends Request {
    body: {
        owner: string
        repo: string
    }
}

router.post("", async (req: CreateRepositoryRequest, res) => {
    try {
        const prInfo = await octokit.request('GET /repos/{owner}/{repo}', {
            owner: req.body.owner,
            repo: req.body.repo,
            headers: { 'X-GitHub-Api-Version': '2022-11-28' }
        });
    } catch (e: unknown) {
        console.error(e);
        if (e instanceof RequestError) {
            if (e.status && e.status === 404) return res.status(400).json(e);
        }
        return res.status(500);
    }

    const repository = await prisma.repository.create({
        data: { name: req.body.owner, owner: req.body.owner }
    });
    return res.status(201).json({ repository });
});

export { router };
