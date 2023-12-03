const app = require("./app");
const ApiPort = 3000;

app.listen(ApiPort, () => {
  console.log(`Server running. Use our API on port: ${ApiPort}`);
});
