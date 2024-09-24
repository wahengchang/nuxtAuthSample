const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: {
        type: String,
        enum: ['text', 'number', 'date', 'relation'],
        required: true
    },
    required: { type: Boolean, default: false },
    options: { type: mongoose.Schema.Types.Mixed }
});

const collectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    fields: [fieldSchema],
    isPublic: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Collection', collectionSchema);