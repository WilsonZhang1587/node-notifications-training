const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    data: { type: String, required: true } // required: function() { return this.userId != null; } 附加驗證器
  },
  { versionKey: false }
);

module.exports = mongoose.model("test", testSchema);
