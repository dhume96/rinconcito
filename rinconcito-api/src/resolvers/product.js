import { combineResolvers } from 'graphql-resolvers';

import Product from '../models/product.js';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    products: async (parent, { cursor, limit = 100 }, { }) => {
      /*const cursorOptions = cursor
        ? {
          where: {
            createdAt: {
              [Sequelize.Op.lt]: fromCursorHash(cursor),
            },
          },
        }
        : {};*/

      const products = await Product.find();

      products.forEach(product => {
        product.dateAdded = new Date(product.dateAdded).toString();
      });

      /*const messages = await models.Message.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions,
      });*/

      const hasNextPage = products.length > limit;
      const edges = hasNextPage ? products.slice(0, -1) : products;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(
            edges[edges.length - 1].dateAdded.toString(),
          ),
        },
      };
    },
    product: async (parent, { id }, { }) => {
      return await Product.findById(id);
    },
  },

  Mutation: {
    /*createProduct: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { models, me }) => {
        const message = await models.Message.create({
          text,
          userId: me.id,
        });

        pubsub.publish(EVENTS.MESSAGE.CREATED, {
          messageCreated: { message },
        });

        return message;
      },
    ),*/

    createProductAdmin: async (parent, { name, store, dateAdded, quantity, unitPrice, pic }, { }) => {
      const product = await Product.create({
        name,
        store,
        dateAdded,
        quantity,
        unitPrice,
        pic,
      });

      return product;
    },

    updateProduct: async (parent, { id, name, store, quantity, unitPrice, pic }, { }) => {
      console.log(id);
      console.log(quantity);
      const newProduct = await Product.findOneAndUpdate({
        _id: id
      },
      {
        name,
        store,
        quantity,
        unitPrice,
        pic,
      });
      const updatedProduct = await Product.findById(id);

      return updatedProduct;
    },

    /*deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id }, { models }) => {
        return await models.Message.destroy({ where: { id } });
      },
    ),*/
  },
};
