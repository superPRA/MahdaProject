"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connctDb_1 = __importDefault(require("../utils/connctDb"));
const helper_1 = require("./helper");
function core(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const context = {
            body: req.body,
            action: {},
        };
        const helpers = {
            getRandomContinusId: helper_1.getRandomContinusId
        };
        let mod = null;
        if (!context.body.formId)
            return res.json({
                error: "formId is not included",
            });
        try {
            mod = yield Promise.resolve(`${`../api/v0/${context.body.formId}/route`}`).then(s => __importStar(require(s))).then((q) => q.default);
        }
        catch (err) {
            return res.json({
                error: err,
                a: `../api/v0/${context.body.formId}/route`
            });
        }
        if (typeof mod === "undefined") {
            return res.json({
                done: false,
                error: "module does not exist",
            });
        }
        list: for (let i = 0; i < mod.length; i++) {
            for (let j = 0; j < Object.keys(mod[i]).length; j++) {
                const key = Object.keys(mod[i])[j];
                const value = mod[i][key](context, helpers);
                if (typeof value === "string") {
                    return res.json({
                        done: false,
                        error: "",
                        message: value,
                    });
                }
                else if (value === false) {
                    continue list;
                }
                else if (value === true) {
                    context.action[key] = value;
                    continue;
                }
                else if (typeof value === "object" && "data-provider" in value) {
                    return res.json(Object.assign({ done: true }, value));
                }
                else if (typeof value === "object" && "sql" in value) {
                    try {
                        const res = yield connctDb_1.default
                            .query(value.sql, value.value || [])
                            .then((response) => {
                            if (typeof value.next === "function") {
                                return value.next(response);
                            }
                            return response;
                        });
                        context.action[key] = res;
                    }
                    catch (err) {
                        if (typeof value.onError === "function") {
                            return res.json({
                                done: false,
                                message: value.onError(err),
                            });
                        }
                        return res.json(err);
                    }
                }
                else if (typeof value === "object" && "error" in value) {
                    return res.json(Object.assign({ done: false }, value));
                }
            }
            return res.send("hi");
        }
    });
}
exports.default = core;
