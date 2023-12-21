import 'dotenv/config'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import schemas from './schemas/index.js';
import resolvers from './resolvers/index.js';

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 9000;

const apolloServer = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

try {
    await mongoose.connect(process.env.MONGODB).then(() => console.log("MongoDB Connected Successfully!"));

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(morgan('combined'));

    //app.use('/', express.static('../rinconcito-fe/dist/rinconcito-fe/browser/'));
    
    await apolloServer.start();
    app.use(
        '/',
        cors({ origin: process.env.CORS_ORIGINS.split(",") }),
        express.json(),
        expressMiddleware(apolloServer)
    );

    app.listen(port, () => console.log(`🚀Server started on port ${port}🚀`));
} catch (error) {
    console.log(error);
}

