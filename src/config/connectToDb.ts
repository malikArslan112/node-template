import { configDotenv } from "dotenv";
import { Sequelize } from "sequelize";
configDotenv();

const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USERNAME}`,
  `${process.env.DB_PASSWORD}`,
  {
    dialect: "mysql",
    host: `${process.env.DB_HOST}`,
    port: 3306,
  },
);

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySql Server.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, connectToDb };
