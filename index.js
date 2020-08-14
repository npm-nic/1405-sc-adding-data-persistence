const server = require("./api/app");
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n Server Running on PORT ${PORT}\n`);
});
