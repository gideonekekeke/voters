"use strict";
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
exports.acceptance = exports.resetMyPassword = exports.verifiedSignUser = exports.verifiedByAdminFinally = exports.verifiedByAdmin = exports.verifiedUser = void 0;
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const GOOGLE_SECRET = "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";
const GOOGLE_ID = "1001238833498-cqm9f9c1mh3m1khppm3392npjalj8b4s.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN = "1//04h7d93kXEa_mCgYIARAAGAQSNwF-L9IrRBMf9gTPHHPp4rsWwU2m6arOFmIUgpZPaL-Cov37TXIF6SM2XIoFhScTFOD1ZDaezBY";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });
const url = "https://nycn-vote.web.app";
const urlLocal = "localhost:2245";
const verifiedUser = (email, fullName, realToken, getUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "ajwalletcoins@gmail.com",
                refreshToken: accessToken.token,
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                accessToken: GOOGLE_REFRESHTOKEN,
            },
        });
        const myTransporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                // user: "Shotkode123@gmail.com",
                // pass: "sfclnmvbtajhaals",
                user: "Gideonekeke64@gmail.com",
                pass: "sgczftichnkcqksx",
            },
        });
        const buildFile = path_1.default.join(__dirname, "../views/AccountCreated.ejs");
        const data = yield ejs_1.default.renderFile(buildFile, {
            name: fullName,
            id: getUser === null || getUser === void 0 ? void 0 : getUser._id,
            realToken,
            organisation: getUser === null || getUser === void 0 ? void 0 : getUser.orgName,
        });
        const mailOptions = {
            from: "AJ Vote ❤❤❤ <newstudentsportal2@gmail.com>",
            to: email,
            subject: "Account Verification",
            html: data,
        };
        transporter.sendMail(mailOptions, () => {
            console.log("sent successfully");
        });
    }
    catch (error) {
        return error;
    }
});
exports.verifiedUser = verifiedUser;
const verifiedByAdmin = (generateToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "ajwalletcoins@gmail.com",
                refreshToken: accessToken.token,
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                accessToken: GOOGLE_REFRESHTOKEN,
            },
        });
        const myTransporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "Gideonekeke64@gmail.com",
                pass: "sgczftichnkcqksx",
                // user: "Shotkode123@gmail.com",
                // pass: "sfclnmvbtajhaals",
            },
        });
        const buildFile = path_1.default.join(__dirname, "../views/viewByAdmin.ejs");
        const data = yield ejs_1.default.renderFile(buildFile, {
            name: generateToken === null || generateToken === void 0 ? void 0 : generateToken.fullName,
            organisation: generateToken === null || generateToken === void 0 ? void 0 : generateToken.orgName,
            id: generateToken === null || generateToken === void 0 ? void 0 : generateToken._id,
            code: generateToken.voteCode,
        });
        const mailOptions = {
            from: "AJ Vote ❤❤❤ <newstudentsportal2@gmail.com>",
            to: generateToken === null || generateToken === void 0 ? void 0 : generateToken.orgEmail,
            subject: "Please Verify this Account",
            html: data,
        };
        transporter.sendMail(mailOptions, () => {
            console.log("sent successfully");
        });
    }
    catch (error) {
        return error;
    }
});
exports.verifiedByAdmin = verifiedByAdmin;
const verifiedByAdminFinally = (generateToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "ajwalletcoins@gmail.com",
                refreshToken: accessToken.token,
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                accessToken: GOOGLE_REFRESHTOKEN,
            },
        });
        const myTransporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "Gideonekeke64@gmail.com",
                pass: "sgczftichnkcqksx",
            },
        });
        console.log("userData: ", generateToken);
        const buildFile = path_1.default.join(__dirname, "../views/voterCode.ejs");
        const data = yield ejs_1.default.renderFile(buildFile, {
            name: generateToken === null || generateToken === void 0 ? void 0 : generateToken.fullName,
            organisation: generateToken === null || generateToken === void 0 ? void 0 : generateToken.orgName,
            id: generateToken === null || generateToken === void 0 ? void 0 : generateToken._id,
            code: generateToken.voteCode,
        });
        const mailOptions = {
            from: "AJ Vote ❤❤❤ <newstudentsportal2@gmail.com>",
            to: generateToken === null || generateToken === void 0 ? void 0 : generateToken.orgEmail,
            subject: `${generateToken === null || generateToken === void 0 ? void 0 : generateToken.fullName}'s Account has been Verify`,
            html: data,
        };
        myTransporter.sendMail(mailOptions, () => {
            console.log("sent successfully");
        });
    }
    catch (error) {
        return error;
    }
});
exports.verifiedByAdminFinally = verifiedByAdminFinally;
const verifiedSignUser = (findUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "ajwalletcoins@gmail.com",
                refreshToken: accessToken.token,
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                accessToken: GOOGLE_REFRESHTOKEN,
            },
        });
        const myTransporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "Gideonekeke64@gmail.com",
                pass: "sgczftichnkcqksx",
            },
        });
        const buildFile = path_1.default.join(__dirname, "../views/signinAccount.ejs");
        const data = yield ejs_1.default.renderFile(buildFile, {
            name: findUser === null || findUser === void 0 ? void 0 : findUser.fullName,
            id: findUser === null || findUser === void 0 ? void 0 : findUser._id,
            myToken: findUser === null || findUser === void 0 ? void 0 : findUser.token,
        });
        const mailOptions = {
            from: "AJ Vote ❤❤❤  <newstudentsportal2@gmail.com>",
            to: findUser === null || findUser === void 0 ? void 0 : findUser.email,
            subject: "Account re-Verification",
            html: data,
        };
        myTransporter.sendMail(mailOptions, () => {
            console.log("sent successfully");
        });
    }
    catch (error) {
        return error;
    }
});
exports.verifiedSignUser = verifiedSignUser;
const resetMyPassword = (name, user, myToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "ajwalletcoins@gmail.com",
                refreshToken: accessToken.token,
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                accessToken: GOOGLE_REFRESHTOKEN,
            },
        });
        const myTransporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "Gideonekeke64@gmail.com",
                pass: "sgczftichnkcqksx",
            },
        });
        const buildFile = path_1.default.join(__dirname, "../views/resetPassword.ejs");
        const data = yield ejs_1.default.renderFile(buildFile, {
            name,
            id: user === null || user === void 0 ? void 0 : user._id,
            myToken,
        });
        const mailOptions = {
            from: "AJ Vote ❤❤❤  <newstudentsportal2@gmail.com>",
            to: user === null || user === void 0 ? void 0 : user.email,
            subject: "Requesting for Password Reset",
            html: data,
        };
        myTransporter.sendMail(mailOptions, () => {
            console.log("sent successfully");
        });
    }
    catch (error) {
        return error;
    }
});
exports.resetMyPassword = resetMyPassword;
const acceptance = (email, positioned, fullName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("position from email: ", positioned === null || positioned === void 0 ? void 0 : positioned.position);
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "ajwalletcoins@gmail.com",
                refreshToken: accessToken.token,
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                accessToken: GOOGLE_REFRESHTOKEN,
            },
        });
        const myTransporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "Gideonekeke64@gmail.com",
                pass: "sgczftichnkcqksx",
            },
        });
        const buildFile = path_1.default.join(__dirname, "../views/Acceptance.ejs");
        const data = yield ejs_1.default.renderFile(buildFile, {
            name: positioned === null || positioned === void 0 ? void 0 : positioned.fullName,
            position: positioned === null || positioned === void 0 ? void 0 : positioned.position,
            email: email,
        });
        const mailOptions = {
            from: "AJ Vote ❤❤❤  <newstudentsportal2@gmail.com>",
            to: email,
            subject: `Acceptance for the Position of ${positioned === null || positioned === void 0 ? void 0 : positioned.position}`,
            html: data,
        };
        myTransporter.sendMail(mailOptions, () => {
            console.log("sent successfully");
        });
    }
    catch (error) {
        return error;
    }
});
exports.acceptance = acceptance;
