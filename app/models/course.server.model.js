const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    courseCode: {
        type: String, default: '',
        trim: true
    },
    courseName: {
        type: String, default: '',
        trim: true
    },
    section: {
        type: String, default: '',
        trim: true
    },
    semester: {
        type: String, default: '',
        trim: true
    },
    // title: {
    //     type: String,
    //     default: '',
    //     trim: true,
    //     required: 'Title cannot be blank'
    // },
    // content: {
    //     type: String, default: '',
    //     trim: true
    // },
    creator: {
        type: Schema.ObjectId,
        ref: 'Student'
    }
});
mongoose.model('Course', CourseSchema);
