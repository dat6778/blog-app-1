import express, { Request, Response } from 'express';
import Article from '../models/Article';

const router = express.Router();

// Get all articles
router.get('/', async (req: Request, res: Response) => {
  try {
    const articles = await Article.find();
    res.json({
      message: "Success",
      data: articles
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error",
      error: error.message
    });
  }
});

// Get article by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({
        message: "Error",
        error: "Article not found"
      });
    }
    res.json({
      message: "Success",
      data: article
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error",
      error: error.message
    });
  }
});

// Create new article
router.post('/', async (req: Request, res: Response) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json({
      message: "Success",
      data: article
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Error",
      error: error.message
    });
  }
});

export default router; 