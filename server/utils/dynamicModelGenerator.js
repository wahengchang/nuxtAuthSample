const mongoose = require('mongoose');

function generateDynamicModel(collection) {
    const dynamicSchema = new mongoose.Schema({
        collectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        data: { type: mongoose.Schema.Types.Mixed, required: true }
    }, { timestamps: true });

    // Add validation for each field
    collection.fields.forEach(field => {
        dynamicSchema.path('data').validate(function(value) {
            if (field.required && !value[field.name]) {
                return false;
            }
            if (value[field.name]) {
                switch (field.type) {
                    case 'number':
                        return typeof value[field.name] === 'number';
                    case 'date':
                        return value[field.name] instanceof Date;
                    case 'relation':
                        return mongoose.Types.ObjectId.isValid(value[field.name]);
                }
            }
            return true;
        }, `${field.name} is invalid`);
    });

    return mongoose.model(`CollectionItem_${collection._id}`, dynamicSchema);
}

module.exports = generateDynamicModel;