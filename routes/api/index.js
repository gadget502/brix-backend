import to from "await-to-js";
import { Router } from "express";
import { Comments } from "../../mongo";

let router = Router();

router.get("/", async function(req, res, next) {
  const comments = await Comments({});
  return res.status(200).json(comments);
})

.get("/:id", async (req, res) =>{
  const { id } = req.params;
  const comment = await Comments({ paragraphId: id });
  if(!comment) return res.status(404).json({message: "comment not found"})
  return res.status(200).json(comment);
});



export { router };
