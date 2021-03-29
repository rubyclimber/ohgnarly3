import path from 'path';
import {Request, RequestHandler, Response} from 'express';
import {CategoryRepository} from '../repositories/categoryRepository';

export class HomeController {
    categoryRepository: CategoryRepository;

    constructor(categoryRepository?: CategoryRepository) {
        this.categoryRepository = categoryRepository || new CategoryRepository();
    }

    showHomePage = async (req: Request, res: Response) => {
        return res.sendFile(path.join(__dirname, 'public', 'index.html'));
    };

    ping: RequestHandler = (req, res) => {
        res.send(req.body);
    };

    getCategories: RequestHandler = (req, res) => {
        this.categoryRepository.getAll().then(categories => {
            res.send(categories);
        }).catch(error => {
            res.send(error);
        });
    };
}