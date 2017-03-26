import express from 'express';
import graphqlHTTP from 'express-graphql';
import { schema } from './schema/schema';

const PORT = process.env.PORT || 9000;
const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log(`GraphQL Cars have arrived on PORT: ${PORT}`);
});
