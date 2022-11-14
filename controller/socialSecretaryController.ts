import userModel from "../model/userModel";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { acceptance } from "../util/email";

import PresidentModel from "../model/socialSecretaryModel";

import candidateModel from "../model/candidateModel";

export const readPresident = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const read = await PresidentModel.find();
    return res.json({ message: "Reading all Social-Secretary", data: read });
  } catch (error) {
    return res.json({ message: error });
  }
};

export const readPresidentFromUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const read = await userModel.findById(req.params.id).populate({
      path: "socialSecretary",
      options: { sort: { createdAt: -1 } },
    });

    return res.json({
      message: "Reading all Social-Secretary Post",
      data: read,
    });
  } catch (error) {
    return res.json({ message: error });
  }
};

export const createPresident = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { fullName } = req.body;

    const user = await userModel.findById(req?.params.id);
    let name = user?.fullName;
    let email = user?.email;
    let id = user?._id;

    const candidate = await candidateModel.findOne({ fullName: name });

    if (candidate !== null) {
      return res.json({
        message: `You can't register '${name}' because he/she has already been registered, for the position of ${candidate.position}.`,
      });
    }

    if (user) {
      const getUser = await userModel.findById(user?._id);

      const positioned = await PresidentModel.create({
        _id: user._id,
        fullName: user?.fullName,
        position: "Social-Secretary",
        user,
      });

      getUser?.socialSecretary!.push(
        new mongoose.Types.ObjectId(positioned._id)
      );
      getUser?.save();

      await candidateModel.create({
        fullName: user?.fullName,
        position: positioned?.position,
        user,
      });

      await userModel.findByIdAndUpdate(
        req?.params.id,
        {
          position: "Social Secretary",
        },
        { new: true }
      );

      acceptance(email!, user, fullName).then((result) => {
        console.log("sent: ", result);
      });
      // console.log("getting data: ", getUser);
      return res.json({
        message: `Position as ${positioned.position} has been created for ${user?.fullName}`,
      });
    } else {
      return res.json({
        message: `You can't register because ${fullName} doesn't exist`,
      });
    }

    // return res.end();
  } catch (err) {
    return res.json({ message: `error message: ${err}` });
  }
};
