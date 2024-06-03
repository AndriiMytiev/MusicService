const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/user.router");
const musicRouter = require("./routers/music.router");
const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api", userRouter);
app.use("/api", musicRouter);

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS",
  );
  res.end("<h1>Home page</h1>");
});

app.listen(PORT, () => console.log(`server started on post ${PORT}`));
