import * as CategoryModel from '../models/category.js';

export const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.readCategories(req.pool);
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

export const getCategory = async (req, res) => {
    try {
        const category = await CategoryModel.readCategory(req.pool, req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch category' });
    }
};


export const createCategory = async (req, res) => {
    try {
        const { label, icon, color } = req.body;

        if ( !label || !icon || !color) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const category = await CategoryModel.createCategory(req.pool, label, icon, color);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { label, icon, color } = req.body;

        if (!label || !icon || !color) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const category = await CategoryModel.updateCategory(req.pool, req.params.id, label, icon, color);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category' });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const result = await CategoryModel.deleteCategory(req.pool, req.params.id);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.sendStatus(204);
    } catch (error) {
        if (error.code === '23503') { // Foreign key violation
            return res.status(409).json({ error: 'Category is being used in a publication and cannot be deleted' });
        }
        res.status(500).json({ error: 'Failed to delete category' });
    }
};
