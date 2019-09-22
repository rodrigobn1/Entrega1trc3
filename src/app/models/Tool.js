import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

import conn from "../../config/dbConnection";

mongoose.connect(conn.url);
autoIncrement.initialize(mongoose);

const ToolSchema = new mongoose.Schema({
  codigo: {
    type: String,
    unique: true,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  professor: {
    type: String,
    required: true,
  },
  departamento: [String]
},
  {
    versionKey: false,
  });

ToolSchema.plugin(autoIncrement.plugin, {
  model: "Tool",
  fiel: "id",
  startAt: 1,
  incrementBy: 1
});

export default mongoose.model("Tool", ToolSchema);
