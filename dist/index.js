"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./util/db"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io");
const userRoute_1 = __importDefault(require("./router/userRoute"));
const organisationRoute_1 = __importDefault(require("./router/organisationRoute"));
const presidentRoute_1 = __importDefault(require("./router/presidentRoute"));
const vicePresidentRoute_1 = __importDefault(require("./router/vicePresidentRoute"));
const secretaryRoute_1 = __importDefault(require("./router/secretaryRoute"));
const socialSecretaryRoute_1 = __importDefault(require("./router/socialSecretaryRoute"));
const proRoute_1 = __importDefault(require("./router/proRoute"));
const legalRoute_1 = __importDefault(require("./router/legalRoute"));
const votersRouter_1 = __importDefault(require("./router/voters/votersRouter"));
const viceVote_1 = __importDefault(require("./router/voters/viceVote"));
const secVote_1 = __importDefault(require("./router/voters/secVote"));
const socialVote_1 = __importDefault(require("./router/voters/socialVote"));
const proVoter_1 = __importDefault(require("./router/voters/proVoter"));
const legalVote_1 = __importDefault(require("./router/voters/legalVote"));
const port = 2233;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: { origin: "*" },
});
db_1.default;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    return res.json({ message: "This is the Voting API" });
});
app.get("/start", (req, res) => {
    return res.json({ message: "This is the Voting API" });
});
app.use("/api/user", userRoute_1.default);
app.use("/api/organisation", organisationRoute_1.default);
app.use("/api/president", presidentRoute_1.default);
app.use("/api/vicepresident", vicePresidentRoute_1.default);
app.use("/api/secretary", secretaryRoute_1.default);
app.use("/api/socialSecretary", socialSecretaryRoute_1.default);
app.use("/api/pro", proRoute_1.default);
app.use("/api/legal", legalRoute_1.default);
app.use("/api/presVote", votersRouter_1.default);
app.use("/api/viceVote", viceVote_1.default);
app.use("/api/secVote", secVote_1.default);
app.use("/api/socialVote", socialVote_1.default);
app.use("/api/proVote", proVoter_1.default);
app.use("/api/legalVote", legalVote_1.default);
const db = mongoose_1.default.connection;
// db.on("open", () => {
//   const observer = db.collection("voter").watch();
//   observer.on("change", (change) => {
//     if (change.operationType === "insert") {
//       io.emit("voter");
//     }
//   });
// });
app.listen(process.env.PORT || port, () => {
    console.log("");
    console.log("server is now ready...!");
    console.log("");
});
