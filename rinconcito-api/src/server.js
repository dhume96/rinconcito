import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { startStandaloneServer } from '@apollo/server/standalone';

import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import schemas from './schemas/index.js';
import resolvers from './resolvers/index.js';

const app = express();
const httpServer = http.createServer(app);
const MONGODB = 'mongodb+srv://hume:faMcqW22r4938mZh@rinconcito.xweovmo.mongodb.net/?retryWrites=true&w=majority';
const port = process.env.PORT || 9000;

const apolloServer = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

try {
    await mongoose.connect(MONGODB).then(() => console.log("MongoDB Connected Successfully"));

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    //app.use('/', express.static('../rinconcito-fe/dist/rinconcito-fe/browser/'));

    await apolloServer.start();
    app.use(
        '/',
        cors({ origin: ['http://localhost:8000', 'http://192.168.0.22:8000', 'http://192.168.0.30:4200'] }),
        express.json(),
        expressMiddleware(apolloServer)
    );

    app.listen(port, () => console.log(`🚀Server started on port ${port}🚀`));
} catch (error) {
   console.log(error); 
}

