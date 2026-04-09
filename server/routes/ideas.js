import express from "express";
const router = express.Router();
import { Idea } from "../models/Idea.js";
import { analyzeIdea } from "../services/aiService.js";


router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const report = await analyzeIdea(title, description);

    const newIdea = new Idea({
      title,
      description,
      report
    });

    const savedIdea = await newIdea.save();
    res.status(201).json(savedIdea);
  } catch (error) {
    console.error('Error in POST /ideas:', error);
    res.status(500).json({ error: 'Failed to process idea analysis' });
  }
});

// GET /ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find({}, {
      title: 1,
      description: 1,
      'report.risk_level': 1,
      'report.profitability_score': 1,
      createdAt: 1
    }).sort({ createdAt: -1 });

    res.json(ideas);
  } catch (error) {
    console.error('Error in GET /ideas:', error);
    res.status(500).json({ error: 'Failed to fetch ideas' });
  }
});

// GET /ideas/:id
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }
    res.json(idea);
  } catch (error) {
    console.error('Error in GET /ideas/:id:', error);
    res.status(500).json({ error: 'Failed to fetch idea' });
  }
});

// DELETE /ideas/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedIdea = await Idea.findByIdAndDelete(req.params.id);
    if (!deletedIdea) {
      return res.status(404).json({ error: 'Idea not found' });
    }
    res.json({ message: 'Deleted' });
  } catch (error) {
    console.error('Error in DELETE /ideas/:id:', error);
    res.status(500).json({ error: 'Failed to delete idea' });
  }
});

export default router;
