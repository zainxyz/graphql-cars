import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import { GET, POST, PUT, PATCH, DELETE } from '../api/HTTP';

/**
 * Setup the Manufacturer GraphQL Object Type
 */
const ManufacturerType = new GraphQLObjectType({
  name: 'Manufacturer',
  fields: () => ({
    founded: { type: GraphQLInt },
    founder: { type: GraphQLString },
    headquarters: { type: GraphQLString },
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    cars: {
      type: new GraphQLList(CarType),
      resolve: ({ id }, args) => GET({
        url: `http://localhost:3000/manufacturers/${id}/cars`
      })
    }
  }),
});

/**
 * Setup the Car GraphQL Object Type
 */
const CarType = new GraphQLObjectType({
  name: 'Car',
  fields: () => ({
    engine: { type: GraphQLString },
    hp: { type: GraphQLInt },
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLString },
    year: { type: GraphQLInt },
    manufacturer: {
      type: ManufacturerType,
      resolve: ({ manufacturerId }, args) => GET({
        url: `http://localhost:3000/manufacturers/${manufacturerId}`
      })
    }
  }),
});

/**
 * Setup our Root Query GraphQL Object Type
 */
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    car: {
      type: CarType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: (parent, { id }) => GET({
        url: `http://localhost:3000/cars/${id}`
      })
    },
    manufacturer: {
      type: ManufacturerType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: (parent, { id }) => GET({
        url: `http://localhost:3000/manufacturers/${id}`
      })
    },
  })
});

/**
 * Setup the Root Mutation GraphQL Object Type
 */
const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    /**
     * Add a Car to the DB
     * @type {Object}
     */
    addCar: {
      type: CarType,
      args: {
        engine: { type: GraphQLString },
        hp: { type: GraphQLInt },
        id: { type: new GraphQLNonNull(GraphQLString) },    // Required
        name: { type: new GraphQLNonNull(GraphQLString) },  // Required
        price: { type: new GraphQLNonNull(GraphQLString) }, // Required
        year: { type: GraphQLInt },
        manufacturerId: { type: GraphQLString }
      },
      resolve: (parent, { engine, hp, id, name, price, year }) => POST({
        url: `http://localhost:3000/cars`,
        body: { engine, hp, id, name, price, year }
      })

    },
    /**
     * Delete a Car from the DB
     * @type {Object}
     */
    deleteCar: {
      type: CarType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) } // Required
      },
      resolve: (parent, { id }) => DELETE({
        url: `http://localhost:3000/cars/${id}`
      })
    },
    /**
     * Edit a Car from the DB
     * @type {Object}
     */
    editCar: {
      type: CarType,
      args: {
        engine: { type: GraphQLString },
        hp: { type: GraphQLInt },
        id: { type: new GraphQLNonNull(GraphQLString) }, // Required
        name: { type: GraphQLString },
        price: { type: GraphQLString },
        year: { type: GraphQLInt },
        manufacturerId: { type: GraphQLString }
      },
      resolve: (parent, { engine, hp, id, name, price, year, manufacturerId }) => PATCH({
        url: `http://localhost:3000/cars/${id}`,
        body: { engine, hp, id, name, price, year, manufacturerId, }
      })
    }
  })
});

/**
 * Setup the GraphQL Schema with the
 * query and mutation we created earlier.
 */
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

/**
 * Export out the schema
 */
export {
  schema
}
