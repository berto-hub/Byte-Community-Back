//import {tasks} from "./sample";
//import User from "./models/User";
//import Video from "./models/Video";
const User = require("./models/User");
const Comments = require("./models/Comments");
const Video = require("./models/Video");
const Podcast = require("./models/Podcast");

const resolvers = {
    Query: {
        hello: () => {
            return "Hello World";
        },
        greet(root, {name}, context) {
            console.log(context);
            
            return `hello ${name}`;
        },
        tasks() {
            return tasks;
        },
        async showUsers(){
            const users = await User.find();
            return users;
        },

        async findUser(root, {username, password}) {
            const user = await User.findOne({
                username: username,
                password: password
            });

            if(user == null){
                console.log("No existe en la base de datos");
            }
            //console.log(user);
            
            return user;
        },

        async findUserId(root, {id}) {
            const user = await User.findOne({
                id: id
            });

            if(user == null){
                console.log("No existe en la base de datos");
            }
            //console.log(user);
            
            return user;
        },

        async login(root, {username, email, password}) {
            const user = await User.findOne({
                username: username,
                email: email,
                password: password
            });

            if(user == null){
                console.log("No existe en la base de datos");
            }
            //console.log(user);
            
            return user;
        },

        async showVideos(root, {limit, skip}){
            const videos = await Video.find().sort({date: "desc"}).skip(skip).limit(limit);

            console.log(videos);

            return videos;
        },

        /*async showMoreVideos(){
            const videos = await Video.find().sort({date: "desc"}).skip();

            console.log(videos);

            return videos;
        },*/

        async showVideosAuthor(root, {idAuthor, skip, limit}){
            const videos = await Video.find({author: idAuthor}).sort({date: "desc"}).skip(skip).limit(limit);

            console.log(videos);

            return videos;
        },

        async findVideo(root, {id}) {
            const video = await Video.findOne({
                id: id
            });

            if(video == null){
                console.log("No existe en la base de datos");
            }
            //console.log(user);
                        
            return video;
        },

        async findAuthor(root, {id}) {
            const user = await User.findOne({
                id: id
            });

            if(user == null){
                console.log("No existe en la base de datos");
            }
            //console.log(user);
            
            return user;
        },

        async searchVideo(root, {title}) {
            const video = await Video.find({
                title: {$regex: title}
            }).sort({date: "desc"});

            if(video == null){
                console.log("No existe en la base de datos");
            }
            //console.log(user);
            
            return video;
        },

        async showPodcasts(root, {limit, skip}){
            const podcasts = await Podcast.find().sort({date: "desc"}).skip(skip).limit(limit);

            console.log(podcasts);

            return podcasts;
        },

        async showPodcastsAuthor(root, {idAuthor, skip, limit}){
            const podcasts = await Podcast.find({author: idAuthor}).sort({date: "desc"}).skip(skip).limit(limit);

            console.log(podcasts);

            return podcasts;
        },

        async findPodcast(root, {id}) {
            const podcast = await Podcast.findOne({
                id: id
            });

            if(podcast == null){
                console.log("No existe en la base de datos");
            }
            //console.log(user);
            
            return podcast;
        },

        async searchPodcast(root, {title}) {
            const podcast = await Podcast.find({
                title: {$regex: title}
            }).sort({date: "desc"});

            if(podcast == null){
                console.log("No existe en la base de datos");
            }
            //console.log(user);
            
            return podcast;
        },
    },

    User: {
        follows: async (parent) => {
            var follows = await User.find({
                id: parent._doc.follows
            });
            console.log(parent);
            console.log(follows);

            return follows;
        }
    },

    Comments: {
        user: async (parent) => {
            var user = await User.findOne({
                id: parent._doc.user
            });
            console.log(parent);
            console.log(user);

            return user;
        },
    },

    Video: {
        author: async (parent) => {
            var user = await User.findOne({
                id: parent._doc.author
            });
            console.log(parent);
            console.log(user);

            return user;
        },

        comments: async (parent) => {
            var comment = await Comments.find({
                id: parent._doc.comments
            }).sort({date: "desc"});
            console.log(parent);
            console.log(comment);

            return comment;
        }
    },

    Podcast: {
        author: async (parent) => {
            var user = await User.findOne({
                id: parent._doc.author
            });
            console.log(parent);
            console.log(user);

            return user;
        },

        comments: async (parent) => {
            var comment = await Comments.find({
                id: parent._doc.comments
            }).sort({date: "desc"});
            console.log(parent);
            console.log(comment);

            return comment;
        }
    },

    Mutation: {
        createTask(_, {input}) {
            input._id = tasks.length;
            tasks.push(input);
            console.log(input);
            return input;
        },

        async createUser(_, {username, email, password}){
            const makeRandomId= (length) => {
                let result = ''
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                for (let i = 0; i < length; i++ ) {
                  result += characters.charAt(Math.floor(Math.random() * characters.length));
               }
               return result;
            }

            const user = new User({id: makeRandomId(10), username, email, password, follows: []});
            console.log(user);
            await user.save();
            return user;
        },

        async updateUser(_, {id, username, email, password}){
            const filter = {id: id};
            var update;

            if(username){
                update = {username: username}
                await User.findOneAndUpdate(filter, update)
            }
            if(email){
                update = {email: email}
                await User.findOneAndUpdate(filter, update)
            }
            if(password){
                update = {password: password}
                await User.findOneAndUpdate(filter, update)
            }

            return true;
        },

        async addComment(_, {
            id, comment
        }) {
            const filter = {id: id};
            var update;

            update = {$push: {comments: comment}};
            const video = await Video.findOneAndUpdate(filter, update, {new: true});

            return video;
        },

        async addCommentPodcast(_, {
            id, comment
        }) {
            const filter = {id: id};
            var update;

            update = {$push: {comments: comment}};
            const podcast = await Podcast.findOneAndUpdate(filter, update, {new: true});

            return podcast;
        },

        async addFollow(_, {
            id, idFollow
        }) {
            const filter = {id: id};
            var update;

            update = {$push: {follows: idFollow}};
            const user = await User.findOneAndUpdate(filter, update, {new: true});

            return user;
        },

        async removeFollow(_, {
            id, idFollow
        }) {
            const filter = {id: id};
            var update;

            update = {$pull: {follows: idFollow}};
            const user = await User.findOneAndUpdate(filter, update);

            return user;
        },
        
        async addVideo(_, {
            title, author, url, description, image
        }) {
            const time = Date.now();
            var date = new Date(time);

            const makeRandomId= (length) => {
                let result = ''
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                for (let i = 0; i < length; i++ ) {
                  result += characters.charAt(Math.floor(Math.random() * characters.length));
               }
               return result;
            }

            const video = new Video({
                id: makeRandomId(10),
                title: title,
                image: image,
                author: author,
                url: url,
                date: date,
                description: description,
                comments: [],
            });
            console.log(video);
            
            await video.save();
            return video;
        },

        async addPodcast(_, {
            title, author, url, description, image
        }) {
            const time = Date.now();
            var date = new Date(time);

            const makeRandomId= (length) => {
                let result = ''
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                for (let i = 0; i < length; i++ ) {
                  result += characters.charAt(Math.floor(Math.random() * characters.length));
               }
               return result;
            }

            const podcast = new Podcast({
                id: makeRandomId(10),
                title: title,
                image: image,
                author: author,
                url: url,
                date: date,
                description: description,
                comments: [],
            });
            console.log(podcast);
            
            await podcast.save();
            return podcast;
        },

        async createComment(_, {
            id, user, comment
        }) {
            const time = Date.now();
            var date = new Date(time);

            const makeRandomId= (length) => {
                let result = ''
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                for (let i = 0; i < length; i++ ) {
                  result += characters.charAt(Math.floor(Math.random() * characters.length));
               }
               return result;
            }

            const com = new Comments({
                id: id,
                user: user,
                comment: comment,
                date: date,
            });
            console.log(com);
            
            await com.save();
            return com;
        },
    }
};

module.exports = {resolvers};