const pgp = require("pg-promise")();
const db = pgp("postgres://postgres:password@localhost:5432/planetsdb"); // Cambia con i tuoi dati

const setupDb = async () => {
  await db.none(`
    DROP TABLE IF EXISTS planets;

    CREATE TABLE planets (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      image TEXT
    );

    INSERT INTO planets (name) VALUES ('Earth');
    INSERT INTO planets (name) VALUES ('Mars');
  `);
};

module.exports = { db, setupDb };
