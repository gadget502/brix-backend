import mongoose, { mongo } from "mongoose";
import rndString from "randomstring";
import { MongooseAutoIncrementID } from "mongoose-auto-increment-reworked";

const { name } = require("../package.json");

mongoose.connect("mongodb://localhost/" + name, {
  useNewUrlParser: true,
  useFindAndModify: false
});

mongoose.Promise = global.Promise;

let CommentSchema = mongoose.Schema({
  chapterId: { type: String },
  paragraphId: { type: String },
  parentId: { type: Number },
  title: { type: String },
  content: { type: String },
  time: { type: String },
  start: { type: String },
  end: { type: String }
});

require("./preset")(CommentSchema);

MongooseAutoIncrementID.initialise("no");
CommentSchema.plugin(MongooseAutoIncrementID.plugin, { modelName: "comments" });

let Comments = mongoose.model("comments", CommentSchema);

export { Comments };
