"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, statusCode, data) => {
    res.status(statusCode).json({
        status: "success",
        data,
    });
};
exports.sendResponse = sendResponse;
