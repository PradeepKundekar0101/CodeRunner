"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const code_routes_1 = __importDefault(require("./routes/code.routes"));
const express_rate_limit_1 = require("express-rate-limit");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
// Define the rate limiter middleware
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 10 * 1000,
    max: 1, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/v1/code', limiter);
app.get("/api/v1/health", (req, res) => {
    res.send("Hello");
});
app.use('/api/v1/user', user_routes_1.default);
app.use('/api/v1/code', code_routes_1.default);
// Unhandled Routes:
app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: `Can't find ${req.originalUrl} on this server`,
    });
});
