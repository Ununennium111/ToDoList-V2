const { Schema, model, Types } = require('mongoose');

const TaskSchema = new Schema({
    task: {
        type: String,
        required: [true, 'Task is required'],
        maxlength: [40, 'Task cannot contain more than 40 characters'],
        trim: true
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'UserId is required']
    }
}, {timestamps: true});

module.exports = model('Task', TaskSchema);