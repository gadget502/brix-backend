import { moment } from "../";

module.exports = (Comment) =>{
  Comment.pre("save", function(next){ 
    this.time = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm");
    next(null, this);
  });
}
