const mongoose = require("mongoose");
const ytFetch = require("./ytFetch");
mongoose
  .connect("mongodb://localhost:27017/cybermonk", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 5000,
  })
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => console.log("Connection to DB Failed", err));

let links = [];
const videoSchema = new mongoose.Schema({
    author: String,
    link: String,
    title: String,
    id: String,
    tag : [String],
    pubDate : {type:Date, default:Date.now()},
    announced : Boolean
});

const Video = mongoose.model("videos",videoSchema);
// Methods

async function getUnannouncedVideos(){
    console.log("Getting Unannounced Videos");
    const videos = await Video.find({announced:false}).sort({_id:1});
    console.log(videos);
    return videos;
}
async function getUnannouncedVideoLink(){
    console.log("Getting 1 Unannounced Videos");
    const video = await Video.findOne({announced:false});
    console.log(video);
    console.log(video.link);
    const link = video.link;
    return link;
}
async function postDiscord(){
    console.log("Getting 1 Unannounced Videos");
    var video = await Video.findOne({announced:false});
    if(video == null) return "No new Videos";
    else {
    video.announced = true;
    await video.save();
    const link = video.link;
    return link;
    }
    return "";
}
async function getAllVideos(){
    console.log("Getting Unannounced Videos");
    const videos = await Video.find().sort({_id:1});
    console.log(videos);
    return videos;
}

async function registerNewVideo(video){
    console.log("Registering new Videos");
    if(await duplicateCheck(video.link)){
        const document = new Video(video);
        document.announced= false;
        const save = await document.save();
    }
    else console.log("DUPLICATE + + +");
    
}
async function registerBatchVideos(){
    const batch = await fetch();
    console.log("Registering new Videos Batch");
    for(let video of batch){
        console.log(video);
        registerNewVideo(video);
    }

        



}
async function duplicateCheck(videolink){
    console.log("Checking for duplicate : "+ videolink);
    const videos = await Video.findOne({link:videolink}).countDocuments();
    //console.log(videos);
    if(videos>=1)  return false;
    else   return true;
}
async function fetch(){
    const response = await ytFetch.fetch();
    console.log("Fetching Videos");
    //console.log(response);
    return response;
}
registerBatchVideos();
getUnannouncedVideos();

exports.postDiscord = postDiscord;