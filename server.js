// Servidor local para el Americano de pádel. Sin dependencias: solo necesita Node.js.
// Uso:  node server.js        (o  PORT=8080 node server.js)
const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PORT = Number(process.env.PORT) || 3000;
const DATA_FILE = path.join(__dirname, "datos.json");
const PAGE = path.join(__dirname, "public", "index.html");

let store = { version: 0, data: null };
try { store = JSON.parse(fs.readFileSync(DATA_FILE, "utf8")); } catch (e) {}

function persist() {
  fs.writeFile(DATA_FILE, JSON.stringify(store), err => { if (err) console.error("No se pudo guardar:", err.message); });
}
function send(res, code, body, type = "application/json; charset=utf-8") {
  res.writeHead(code, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(body);
}

http.createServer((req, res) => {
  const url = req.url.split("?")[0];
  if (url === "/api/state" && req.method === "GET") return send(res, 200, JSON.stringify(store));
  if (url === "/api/state" && req.method === "POST") {
    let body = "";
    req.on("data", c => { body += c; if (body.length > 5e6) req.destroy(); });
    req.on("end", () => {
      try {
        const { data } = JSON.parse(body);
        store = { version: store.version + 1, data };
        persist();
        send(res, 200, JSON.stringify({ version: store.version }));
      } catch (e) { send(res, 400, JSON.stringify({ error: "Datos inválidos" })); }
    });
    return;
  }
  if (url === "/" || url === "/index.html") {
    return fs.readFile(PAGE, (err, html) => err ? send(res, 500, "Falta public/index.html", "text/plain") : send(res, 200, html, "text/html; charset=utf-8"));
  }
  send(res, 404, "No encontrado", "text/plain; charset=utf-8");
}).listen(PORT, "0.0.0.0", () => {
  console.log("\n  Americano de pádel funcionando\n");
  console.log(`  En esta computadora:  http://localhost:${PORT}`);
  for (const list of Object.values(os.networkInterfaces()))
    for (const i of list || [])
      if (i.family === "IPv4" && !i.internal) console.log(`  Desde el celular (misma wifi):  http://${i.address}:${PORT}`);
  console.log("\n  Para detenerlo: Ctrl + C\n");
});
