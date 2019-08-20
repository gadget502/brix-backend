import to from "await-to-js";
import { Router } from "express";
import { Comments } from "../../mongo";

let router = Router();

router.get("/comment", async function(req, res, next) {
  const comments = await Comments.find({}, {__v: 0});
  return res.status(200).json(comments);
})

.get("/comment/paragraph/:id", async (req, res) =>{
  const { id } = req.params;
  const comment = await Comments.find({ paragraphId: id }, {__v: 0});
  if(!comment) return res.status(404).json({message: "comment not found"})
  return res.status(200).json(comment);
})

.get("/comment/:id", async(req, res)=>{
  const { id } = req.params;
  const comment = await Comments.findOne({ _id: id }, {__v: 0});
  if(!comment) return res.status(404).json({message: "comment not found"})
  return res.status(200).json(comment);
})

.post("/comment", async(req, res) =>{
  const { content, paragraphId, start, end, parentId } = req.body;
  const newComment = { content, paragraphId, start, end };
  if(parentId) newComment.parentId = parentId;
  const newData = new Comments(newComment);
  const [err, result] = await to(newData.save());
  console.log(err);
  if(err) return res.status(500).json({message: "save error", detail: err});
  return res.status(200).json(newData);
})

.delete("/comment", async(req, res)=>{
  const { id } = req.body;
  const result = await Comments.remove({_id: id});
  if(result.deletedCount)
    return res.status(200).json({ message: "success" });
  return res.status(404).json({message: "maybe note not exsit"});
});


export { router };
