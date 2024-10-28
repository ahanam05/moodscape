const mongoose = require('mongoose');

//add playlists, tags etc
const moodboardSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Please enter a title'],
        minlength : [3, 'Title shoudld be at least 3 characters'],
        maxlength : [50, 'Title cannot exceed 50 characters']
    },
    description : {
        type : String, 
        maxlength : [200, 'Description cannot exceed 200 characters'],
    },
    //array of images
    images : [{
        url : String,
        alt : String
    }],
    //array of notes
    notes : [{
        content : String,
        createdAt : {
            type : Date,
            default : Date.now
        }
    }],
    lastModified : {
        type : Date,
        default : Date.now
    }
});

//add settings like grid/list and light/dark theme
const dashboardSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
        unique : true
    }, 
    username : {
        type : String,
        required : true
    }, 
    moodboards : [moodboardSchema]
});

dashboardSchema.index({userId : 1});
moodboardSchema.index({title : 'text'});

module.exports = mongoose.model('Dashboard', dashboardSchema);