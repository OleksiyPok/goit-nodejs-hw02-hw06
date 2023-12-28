const mongoose = require("mongoose");
const app = require("./app");

const { PORT = 3000, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const DB_HOST = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.7949mas.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connected successfully"))
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
