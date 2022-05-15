//import {resolvers} from "./resolvers";
const {gql} = require("apollo-server-express");

const typeDefs = gql`
    type Query {
        hello: String
        greet(name: String!): String
        tasks: [Task]
        showUsers: [User!]!
        showVideos(limit: Int!, skip: Int!): [Video!]!
        showPodcasts(limit: Int!, skip: Int!): [Podcast!]!
        findUser(username: String!, password: String!): User!
        findUserId(id: String!): User!
        login(username: String!, email: String!, password: String!): User
        findVideo(id: String!): Video!
        showVideosAuthor(idAuthor: String!, limit: Int!, skip: Int!): [Video]
        findAuthor(id: String!): User!
        searchVideo(title: String!): [Video]
        findPodcast(id: String!): Podcast!
        showPodcastsAuthor(idAuthor: String!, limit: Int!, skip: Int!): [Podcast]
        searchPodcast(title: String!): [Podcast]
    }

    type Task {
        _id: ID,
        title: String!,
        description: String!,
        number: Int
    }

    type User {
        _id: ID,
        id: String!,
        username: String!,
        email: String!,
        password: String!,
        follows: [User]
    }

    type Comments {
        _id: ID,
        id: String!,
        user: User!,
        comment: String!,
        date: String!,
    }

    type Video {
        _id: ID,
        id: String!,
        url: String!,
        image: String!,
        author: User!,
        nameAuthor: String!,
        title: String!,
        date: String!,
        description: String,
        comments: [Comments],
    }

    type Podcast {
        _id: ID,
        id: String!,
        url: String!,
        image: String!,
        author: User!,
        nameAuthor: String!,
        title: String!,
        date: String!,
        description: String,
        comments: [Comments],
    }

    type Mutation {
        createTask(input: TaskInput): Task
        createUser(username: String!, email: String!, password: String!): User
        createComment(id: String!, user: String!, comment: String!): Comments
        addComment(id: String!, comment: String!): Video!
        addCommentPodcast(id: String!, comment: String!): Podcast!
        addVideo(url: String!, image: String!, author: String!, title: String!, description: String!): Video
        addPodcast(url: String!, image: String!, author: String!, title: String!, description: String!): Podcast
        updateUser(id: String!, username: String, email: String, password: String): Boolean!
        addFollow(id: String!, idFollow: String!): User
        removeFollow(id: String!, idFollow: String!): User
    }

    input TaskInput {
        title: String!,
        description: String!,
        number: Int
    }

    input UserInput {
        username: String!,
        email: String!,
        password: String!
    }

    input VideoInput{
        url: String!,
        author: String!,
        title: String!,
        date: String!,
        description: String,
        comments: [String],
    }
`;

module.exports = {typeDefs};
