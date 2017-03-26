/**
 * Queries
 */

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

/**
 * Mutations
 */

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
