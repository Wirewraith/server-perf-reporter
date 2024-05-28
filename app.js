const { createServer } = require("node:http");
const si = require("systeminformation");

const hostname = "0.0.0.0";
const port = 3000;

const server = createServer(async (req, res) => {
  if (req.headers.authorization !== process.env.KEY) {
    res.statusCode = 401;
    res.end();
    return;
  }

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(
    JSON.stringify(
      await si.get({
        time: "uptime",
        mem: "available, total",
        currentLoad: "avgLoad, currentLoad",
        fsSize: "fs, size, used, available, use | fs:overlay",
      })
    )
  );
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
