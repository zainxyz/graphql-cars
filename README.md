# graphql-cars
A sample GraphQL server running with a json-server to provide testing environment for queries and mutations.

`All written in ES6, transpiled via Babel.`

## How to start?
Install all of the dependencies via: 
````
npm i
````

Open up two tabs in Terminal (or 2 CMD Prompts).

* 1 will be used for the Node Server
* 1 will be used for the JSON Server

To start the Node Server simply run:
````
npm start
````

To start the JSON Server simply run:
````
npm run json:server
````

## Test it out!

#### GraphiQL
This is our GraphQL Playground, it helps us run queries on our database leveraging the GraphQL Server we've put together. Simply visit the following URL:
````
http://localhost:9000/graphql
````

#### Our Database
This is our JSON powered server to which we can send all sorts of HTTP requests (GET, PUT, PUSH, PATCH, DELETE). To access our DB, visit the following URL:
````
http://localhost:3000/
````

## Send some sample queries to our GraphiQL
##### Here is a sample Query that works well (note it has some fragments, etc.):
````
query findCar {
  db11: car(id: "db11") {
    ...carDetails
  }
  huracan: car(id: "huracan") {
    ...carDetails
  }
  maserati: manufacturer(id: "maserati") {
    ...manufacturerDetails
  }
}

fragment carDetails on Car {
  name
  year
  hp
  price
  manufacturer {
    name
    founded
    founder
  }
}

fragment manufacturerDetails on Manufacturer {
  name
  founded
  founder
  headquarters
  cars {
    name
    hp
    price
    manufacturer {
      name
    }
  }
}
````

Output of the previous query should be: 
````
{
  "data": {
    "db11": {
      "name": "GranTurismo",
      "year": 2017,
      "hp": 444,
      "price": "$132,825",
      "manufacturer": {
        "name": "Maserati S.p.A.",
        "founded": 1914,
        "founder": "Alfieri Maserati"
      }
    },
    "huracan": {
      "name": "Huracan",
      "year": 2015,
      "hp": 560,
      "price": "$199,800",
      "manufacturer": {
        "name": "Automobili Lamborghini S.p.A.",
        "founded": 1963,
        "founder": "Ferruccio Lamborghini"
      }
    },
    "maserati": {
      "name": "Maserati S.p.A.",
      "founded": 1914,
      "founder": "Alfieri Maserati",
      "headquarters": "Modena, Italy",
      "cars": [
        {
          "name": "GranTurismo",
          "hp": 444,
          "price": "$132,825",
          "manufacturer": {
            "name": "Maserati S.p.A."
          }
        }
      ]
    }
  }
}
````

##### Here is a sample Mutation to edit a car:
````
mutation {
  editCar(id: "huracan", hp: 3000, manufacturerId: "lamborghini") {
    name
    engine
    hp
    manufacturer {
      name
      headquarters
    }
  }
}
````

### Go Crazy with Cars and GraphQL :)