import Tool from "../models/Tool";

class ToolController {
  // GET
  async index(req, res) {
    try {
      if (req.query.tags) {
        const tools = await Tool.find({ tags: { $all: req.query.tags } });

        return res.status(200).json(tools);
      }

      const tools = await Tool.find();
      return res.status(200).json(tools);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  // POST
  async store(req, res) {
    const { codigo } = req.body;

    const verification = await Tool.findOne({ codigo });

    if (verification) {
      return res.status(400).json({ message: "Codigo de disciplina ja cadastrado" });
    }
    try {
      const tool = await Tool.create(req.body);

      if (!tool) {
        return res
          .status(400)
          .json({ message: "Codigo, Nome, Professor e Departamento necessarios para cadastro" });
      }

      return res.status(201).json({ tool });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  // PUT
  async update(req, res) {
    const toolToUpdate = await Tool.findOne({
      _id: req.params.id
    });

    if (!toolToUpdate) {
      return res.status(400).json({ error: "Disciplina invalida" });
    }

    const tool = await Tool.update(req.body);

    return res.status(201).json({ message: "Disciplina alterada" });
  }

  // DELETE
  async delete(req, res) {
    const toolToDelete = await Tool.findOne({
      _id: req.params.id
    });

    if (!toolToDelete) {
      return res.status(400).json({ error: "Disciplina invalida" });
    }

    const result = await Tool.deleteOne({ _id: req.params.id });

    return res.status(204).json({ message: "Disciplina deletada" });
  }
}

export default new ToolController();
