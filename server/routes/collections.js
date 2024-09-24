const express = require('express');
const router = express.Router();
const Collection = require('../models/Collection');
const generateDynamicModel = require('../utils/dynamicModelGenerator');
const auth = require('../middleware/auth');

// List all collections for the authenticated user
router.get('/', auth, async(req, res) => {
    try {
        const collections = await Collection.find({ createdBy: req.user._id });
        res.json(collections);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching collections', error: error.message });
    }
});

// Create new collection
router.post('/', auth, async(req, res) => {
    try {
        const collection = new Collection({
            ...req.body,
            createdBy: req.user._id
        });
        await collection.save();
        res.status(201).json(collection);
    } catch (error) {
        res.status(400).json({ message: 'Error creating collection', error: error.message });
    }
});

// Get collection details
router.get('/:id', auth, async(req, res) => {
    try {
        const collection = await Collection.findOne({ _id: req.params.id, createdBy: req.user._id });
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        res.json(collection);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching collection', error: error.message });
    }
});

// Update collection
router.put('/:id', auth, async(req, res) => {
    try {
        const collection = await Collection.findOneAndUpdate({ _id: req.params.id, createdBy: req.user._id },
            req.body, { new: true, runValidators: true }
        );
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        res.json(collection);
    } catch (error) {
        res.status(400).json({ message: 'Error updating collection', error: error.message });
    }
});

// Delete collection
router.delete('/:id', auth, async(req, res) => {
    try {
        const collection = await Collection.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        res.json({ message: 'Collection deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting collection', error: error.message });
    }
});

// List items in a collection
router.get('/:id/items', auth, async(req, res) => {
    try {
        const collection = await Collection.findOne({ _id: req.params.id, createdBy: req.user._id });
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        const DynamicModel = generateDynamicModel(collection);
        const items = await DynamicModel.find({ collectionId: collection._id });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error: error.message });
    }
});

// Create new item in a collection
router.post('/:id/items', auth, async(req, res) => {
    try {
        const collection = await Collection.findOne({ _id: req.params.id, createdBy: req.user._id });
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        const DynamicModel = generateDynamicModel(collection);
        const item = new DynamicModel({
            collectionId: collection._id,
            createdBy: req.user._id,
            data: req.body.data
        });
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: 'Error creating item', error: error.message });
    }
});

// Get item details
router.get('/:id/items/:itemId', auth, async(req, res) => {
    try {
        const collection = await Collection.findOne({ _id: req.params.id, createdBy: req.user._id });
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        const DynamicModel = generateDynamicModel(collection);
        const item = await DynamicModel.findOne({ _id: req.params.itemId, collectionId: collection._id });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching item', error: error.message });
    }
});

// Update item
router.put('/:id/items/:itemId', auth, async(req, res) => {
    try {
        const collection = await Collection.findOne({ _id: req.params.id, createdBy: req.user._id });
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        const DynamicModel = generateDynamicModel(collection);
        const item = await DynamicModel.findOneAndUpdate({ _id: req.params.itemId, collectionId: collection._id }, { data: req.body.data }, { new: true, runValidators: true });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: 'Error updating item', error: error.message });
    }
});

// Delete item
router.delete('/:id/items/:itemId', auth, async(req, res) => {
    try {
        const collection = await Collection.findOne({ _id: req.params.id, createdBy: req.user._id });
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        const DynamicModel = generateDynamicModel(collection);
        const item = await DynamicModel.findOneAndDelete({ _id: req.params.itemId, collectionId: collection._id });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error: error.message });
    }
});

module.exports = router;