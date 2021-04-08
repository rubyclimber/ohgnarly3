import path from 'path';
import {Request, Response} from 'express';
import {CategoryRepository} from '../repositories/categoryRepository';

export class HomeController {
    categoryRepository: CategoryRepository;

    constructor(categoryRepository?: CategoryRepository) {
        this.categoryRepository = categoryRepository || new CategoryRepository();
    }

    showHomePage = async (req: Request, res: Response) => {
        return res.sendFile(path.join(__dirname, 'public', 'index.html'));
    };

    ping = async (req: Request, res: Response) => {
        res.send(req.body);
    };

    getCategories = async (req: Request, res: Response) => {
        try {
            const categories = await this.categoryRepository.getAll();
            return res.send(categories);
        } catch (err) {
            return res.send(err);
        };
    };
}