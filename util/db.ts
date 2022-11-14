import mongoose from "mongoose";

const url: string = "mongodb://localhost/AjElectionDB";
const newURL: string =
	"mongodb+srv://shotkode:shotkode@cluster0.2kfdg.mongodb.net/AjMainVote?retryWrites=true&w=majority";

mongoose.connect(newURL, () => {
	console.log("database is now connected...!");
});

export default mongoose;
