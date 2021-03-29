import mongoose from 'mongoose';
import {CategoryDocument, categorySchema} from '../models/category';

const CategoryModel = mongoose.model('Category', categorySchema, 'Categories');

export class CategoryRepository {
    getAll: () => Promise<CategoryDocument[]> = async () => {
        return await CategoryModel.find().exec() as any as CategoryDocument[];
    };
}