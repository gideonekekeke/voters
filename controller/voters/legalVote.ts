import userModel from "../../model/userModel";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { acceptance } from "../../util/email";

import PresidentModel from "../../model/secretaryModel";

import PresidentialVotesModel from "../../model/positions/PresidentialVotesModel";
import votersModel from "../../model/votersModel";

import candidateModel from "../../model/candidateModel";
import presyModel from "../../votes/president/legalVoteModel";

export const readVote = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const read = await votersModel.find();
    return res.json({ message: "Reading all Voters", data: read });
  } catch (error) {
    return res.json({ message: error });
  }
};

export const readYourVoters = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const read = await userModel.findById(req.params.id).populate({
      path: "voter",
      options: { sort: { createdAt: -1 } },
    });

    return res.json({
      message: `Reading ${read?.fullName} voters`,
      data: read,
    });
  } catch (error) {
    return res.json({ message: error });
  }
};

export const createVote = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await userModel.findById(req.params.voterID);
    const getUser = await userModel.findById(req.params.id);

    const getVote = await presyModel.findById(req.params.voterID);

    if (!getVote) {
      const vote = await votersModel.create({
        user,
        fullName: user?.fullName,
      });

      await presyModel.create({
        _id: user?._id,
        fullName: user?.fullName,
        user,
      });

      getUser!.voter?.push(new mongoose.Types.ObjectId(vote._id));
      getUser!.save();

      return res.status(201).json({ message: "vote added" });
    } else {
      return res.json({ message: `Already voted` });
    }
  } catch (err) {
    return res.json({ message: `error message: ${err}` });
  }
};

// export const deleteVote = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const getUser = await userModel.findById(req.params.id);
//     const voter = await votersModel.findByIdAndRemove(req.params.votersID);

//     getUser?.voter?.pull!(new mongoose.Types.ObjectId(voter!._id));
//     getUser?.save();
//     console.log(getUser?.voter);
//     console.log(voter);

//     return res.status(201).json({ message: "voter deleted" });
//   } catch (err) {
//     return res.json({ message: `error message: ${err}` });
//   }
// };
