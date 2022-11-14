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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workOut = exports.searchForUser = exports.searchUser = exports.changePassword = exports.resetPassword = exports.signinUser = exports.VerifiedUserFinally = exports.VerifiedUser = exports.readOrgUsers = exports.readUser = exports.readUsers = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const organisationModel_1 = __importDefault(require("../model/organisationModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cloudinary_1 = __importDefault(require("../util/cloudinary"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const email_1 = require("../util/email");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, organisationName, email, password } = req.body;
        const findOrg = yield organisationModel_1.default.findOne({
            organisationName,
        });
        // findOrg?.user.length < 3;
        console.log("Org Name: ", findOrg);
        if (findOrg) {
            if ((findOrg === null || findOrg === void 0 ? void 0 : findOrg.user.length) < 3) {
                const getOrganisation = yield organisationModel_1.default.findById(findOrg._id);
                const salt = yield bcrypt_1.default.genSalt(10);
                const hash = yield bcrypt_1.default.hash(password, salt);
                const val = Math.random() * 1000;
                const realToken = jsonwebtoken_1.default.sign(val, "this is the Word");
                const img = yield cloudinary_1.default.uploader.upload(req === null || req === void 0 ? void 0 : req.file.path);
                const getUser = yield userModel_1.default.create({
                    fullName,
                    email,
                    password: hash,
                    orgName: organisationName,
                    orgEmail: getOrganisation === null || getOrganisation === void 0 ? void 0 : getOrganisation.email,
                    token: realToken,
                    image: img.secure_url,
                    superAdmin: false,
                });
                getOrganisation === null || getOrganisation === void 0 ? void 0 : getOrganisation.user.push(new mongoose_1.default.Types.ObjectId(getUser._id));
                getOrganisation === null || getOrganisation === void 0 ? void 0 : getOrganisation.save();
                (0, email_1.verifiedUser)(email, fullName, realToken, getUser).then((result) => {
                    console.log("sent: ", result);
                });
                return res.json({
                    message: "Account has been created, please check your mail to finish up the Process!",
                });
            }
            else {
                return res.status(404).json({
                    message: `This ${organisationName} has reached their maximum entry of delegate!`,
                });
            }
        }
        else {
            return res.json({
                message: `You can't register because ${organisationName} doesn't exist`,
            });
        }
    }
    catch (err) {
        return res.json({ message: err });
    }
});
exports.createUser = createUser;
const readUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const read = yield userModel_1.default.find();
        return res.json({ message: "Reading all Users", data: read });
    }
    catch (error) {
        return res.json({ message: error });
    }
});
exports.readUsers = readUsers;
const readUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const read = yield userModel_1.default.findById(req.params.id);
        return res.json({ message: "Reading all User", data: read });
    }
    catch (error) {
        return res.json({ message: error });
    }
});
exports.readUser = readUser;
const readOrgUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("read");
        const read = yield organisationModel_1.default.findById(req.params.id);
        // .populate({
        //   path: "user",
        //   options: { createdAt: -1 },
        // });
        console.log(read);
        return res.json({
            message: "Reading all Organisation Users",
            data: read,
        });
    }
    catch (error) {
        return res.json({ message: error });
    }
});
exports.readOrgUsers = readOrgUsers;
const VerifiedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const generateToken = crypto_1.default.randomBytes(2).toString("hex");
        const getUser = yield userModel_1.default.findById(req.params.id);
        if (getUser) {
            console.log("start: ", generateToken);
            yield userModel_1.default.findByIdAndUpdate(req.params.id, {
                voteCode: generateToken,
            }, { new: true });
            console.log("show Data: ", getUser);
            (0, email_1.verifiedByAdmin)(getUser).then((result) => {
                console.log("sent: ", result);
            });
            res.status(201).json({ message: "Sent..." });
        }
        else {
            return res.status(404).json({
                message: "user doesn't exist",
            });
        }
    }
    catch (err) {
        return res.json({ message: err });
    }
});
exports.VerifiedUser = VerifiedUser;
const VerifiedUserFinally = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { response } = req.body;
        const generateToken = crypto_1.default.randomBytes(2).toString("hex");
        const getUser = yield userModel_1.default.findById(req.params.id);
        if (response === "Yes") {
            if (getUser) {
                yield userModel_1.default.findByIdAndUpdate(req.params.id, {
                    token: "",
                    verified: true,
                }, { new: true });
                (0, email_1.verifiedByAdminFinally)(getUser).then((result) => {
                    console.log("sent: ", result);
                });
                res.status(201).json({ message: "Sent..." });
            }
            else {
                return res.status(404).json({
                    message: "user doesn't exist",
                });
            }
        }
        if (response === "No") {
            if (getUser) {
                yield userModel_1.default.findByIdAndDelete(req.params.id);
                // verifiedByAdminFinally(getUser, generateToken).then((result) => {
                //   console.log("sent: ", result);
                // });
                res.status(201).json({ message: "user has been deleted" });
            }
        }
        else {
            return res.json({ message: "You can't be accepted" });
        }
        res.end();
    }
    catch (err) {
        return;
    }
});
exports.VerifiedUserFinally = VerifiedUserFinally;
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, voteCode, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        // if (user) {
        //   const pass = await bcrypt.compare(password, user.password);
        //   if (pass) {
        //     if (voteCode === user.voteCode) {
        //       if (user.verified) {
        //         const { ...info } = user._doc;
        //         const tokenData = jwt.sign(
        //           { id: user._id, fullName: user.fullName, email: user.email },
        //           "VoterCode"
        //         );
        //         return res.status(200).json({
        //           message: `welcome back ${user.fullName}`,
        //           data: { tokenData, info },
        //         });
        //       } else {
        //         return res.status(404).json({
        //           message: "error: user hasn't been verified",
        //         });
        //       }
        //     }
        //   } else {
        //     return res.status(404).json({
        //       message: "error: password not correct",
        //     });
        //   }
        // } else {
        //   return res.status(404).json({
        //     message: "error: ",
        //   });
        // }
        // const { ...info } = user._doc;
        // const tokenData = jwt.sign(
        //   { id: user._id, fullName: user.fullName, email: user.email },
        //   "VoterCode"
        // );
        if ((user === null || user === void 0 ? void 0 : user.verified) && user.token === "" && user.voteCode === voteCode) {
            const pass = yield bcrypt_1.default.compare(password, user.password);
            if (pass) {
                const getToken = jsonwebtoken_1.default.sign({
                    email: user.email,
                    _id: user._id,
                    fullName: user.fullName,
                    superAdmin: user.superAdmin,
                }, "voteApp");
                const info = __rest(user._doc, []);
                res.status(200).json({
                    message: `welcome back ${user.fullName}`,
                    data: { getToken },
                });
            }
            else {
                return res.status(404).json({
                    message: "error: password is incorrect",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "error: no user found",
            });
        }
    }
    catch (err) {
        return res.status(404).json({
            message: "error: ",
            err,
        });
    }
});
exports.signinUser = signinUser;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            if ((user === null || user === void 0 ? void 0 : user.verified) && (user === null || user === void 0 ? void 0 : user.token) === "") {
                const token = crypto_1.default.randomBytes(5).toString("hex");
                const myToken = jsonwebtoken_1.default.sign({ token }, "ThisIsAVoteApp");
                const name = user === null || user === void 0 ? void 0 : user.fullName;
                yield userModel_1.default.findByIdAndUpdate(user._id, { token: myToken }, { new: true });
                (0, email_1.resetMyPassword)(name, user, myToken)
                    .then((result) => {
                    console.log("message been sent to you: ");
                })
                    .catch((error) => console.log(error));
                return res.status(200).json({
                    message: "Please check your email to continue",
                });
            }
            else {
                return res
                    .status(404)
                    .json({ message: "You do not have enough right to do this!" });
            }
        }
        else {
            return res.status(404).json({ message: "user can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: "An Error Occur " });
    }
});
exports.resetPassword = resetPassword;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const user = yield userModel_1.default.findById(req.params.id);
        if (user) {
            if (user.verified && user.token === req.params.token) {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashed = yield bcrypt_1.default.hash(password, salt);
                yield userModel_1.default.findByIdAndUpdate(user._id, {
                    token: "",
                    password: hashed,
                }, { new: true });
            }
        }
        else {
            return res.status(404).json({ message: "operation can't be done" });
        }
        return res.status(200).json({
            message: "password has been changed",
        });
    }
    catch (error) {
        return res.status(404).json({ message: "An Error Occur" });
    }
});
exports.changePassword = changePassword;
const searchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchUser = req.query;
        // const makeSearch = req.query
        //   ? {
        //       $or: [
        //         { fullName: { $regex: req.query.search, $options: "i" } },
        //         { _id: { $regex: req.query.search, $options: "i" } },
        //         // { userName: { $regex: req.query.search, $options: "i" } },
        //         //  { accounNumber: { $regex: req.query.search, $options: "i" } },
        //       ],
        //     }
        //   : req.query;
        const user = yield userModel_1.default.find(searchUser);
        return res.status(200).json({ message: "user found", data: user });
    }
    catch (error) {
        return res.status(404).json({ message: "An Error Occur" });
    }
});
exports.searchUser = searchUser;
const searchForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("search");
        return res.end("Found");
    }
    catch (error) {
        return res.status(404).json({ message: `error Message: ${error}` });
    }
});
exports.searchForUser = searchForUser;
const workOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("search");
        const newQuery = req.query;
        const users = yield userModel_1.default.find(newQuery);
        return res
            .status(200)
            .json({ message: `search user found`, data: users[0] });
    }
    catch (error) {
        return res.status(404).json({ message: `error Message: ${error}` });
    }
});
exports.workOut = workOut;
