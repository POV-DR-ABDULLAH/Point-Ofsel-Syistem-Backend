const jsonServer = require("json-server"); // Import json-server
const server = jsonServer.create(); // Buat server
const router = jsonServer.router("db.json"); // Load db.json
const middlewares = jsonServer.defaults(); // Middleware bawaan json-server

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 5000; // Gunakan port dari environment, atau default ke 5000
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});
