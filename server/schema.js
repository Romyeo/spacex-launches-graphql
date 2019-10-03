const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

// Utility
const sortAsc = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const sortDesc = (a, b) => {
  if (a < b) return 1;
  if (a > b) return -1;
  return 0;
};

// Launch type
const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    details: { type: GraphQLString },
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_date_unix: { type: GraphQLString },
    launch_date_utc: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    launch_year: { type: GraphQLString },
    rocket: { type: RocketType }
  })
});

// Rocket type
const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    launches: {
      type: GraphQLList(LaunchType),
      args: {
        sortBy: { type: GraphQLString },
        sort: { type: GraphQLString }
      },
      resolve: async (_, args) => {
        const response = await axios.get(
          'https://api.spacexdata.com/v3/launches'
        );

        if (!args || !args.sortBy || !args.sort) return response.data;

        const { sortBy, sort } = args;

        return response.data.sort((a, b) => {
          const valueA = a[sortBy];
          const valueB = b[sortBy];

          switch (sort) {
            case 'asc':
              return sortAsc(valueA, valueB);
            case 'desc':
              return sortDesc(valueA, valueB);
            default:
              return 0;
          }
        });
      }
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve: async (_, args) => {
        const response = await axios.get(
          `https://api.spacexdata.com/v3/launches/${args.flight_number}`
        );
        return response.data;
      }
    },
    rockets: {
      type: GraphQLList(RocketType),
      resolve: async () => {
        const response = await axios.get(
          'https://api.spacexdata.com/v3/rockets'
        );
        return response.data;
      }
    },
    rocket: {
      type: RocketType,
      args: {
        rocket_id: { type: GraphQLString }
      },
      resolve: async (_, args) => {
        const response = await axios.get(
          `https://api.spacexdata.com/v3/rockets/${args.rocket_id}`
        );
        return response.data;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
