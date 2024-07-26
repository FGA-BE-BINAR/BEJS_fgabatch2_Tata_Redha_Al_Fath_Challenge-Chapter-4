const prisma = require("../config/prisma");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
  index: async (req, res, next) => {
    try {
      let users = await prisma.user.findMany();
      return res.json({ status: "success", data: users });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "error", message: "Internal Server Error :", error });
    }
  },

  create: async (req, res, next) => {
    try {
      const source = req.body;
      const schema = {
        name: { type: "string", empty: false },
        phone: { type: "string", empty: false, min: 9, max: 13 },
        address: { type: "string", empty: false },
        dob: { type: "date", convert: true },
      };

      const validate = v.compile(schema)(source);
      if (validate.length) {
        return res.status(400).json({
          status: "error",
          message: validate,
        });
      }

      let payload = {
        data: {
          name: source.name,
          phone: source.phone,
          address: source.address,
          dob: new Date(source.dob),
        },
      };

      await prisma.user.create(payload);
      return res.status(201).json({
        status: "succes",
        message: "Success Create User",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "error", message: "Internal Server Error :", error });
    }
  },

  update: async (req, res, next) => {
    try {
      const source = req.body;
      const id = parseInt(req.params.id);

      const schema = {
        name: { type: "string", empty: false },
        phone: { type: "string", empty: false, min: 9, max: 13 },
        address: { type: "string", empty: false },
        dob: { type: "date", convert: true },
      };

      const validate = v.compile(schema)(source);
      if (validate.length) {
        return res.status(400).json({
          status: "error",
          message: validate,
        });
      }

      const existingUser = await prisma.user.findUnique({ where: { id: id } });
      if (!existingUser) {
        return res.status(404).json({
          status: "error",
          message: "User data not found",
        });
      }

      const payload = {
        name: source.name,
        phone: source.phone,
        address: source.address,
        dob: new Date(source.dob),
      };

      await prisma.user.update({
        where: { id: id },
        data: payload,
      });

      return res.status(200).json({
        status: "succes",
        message: "Success Update User",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "error", message: "Internal Server Error :", error });
    }
  },

  detail: async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });
      if (!user)
        return res.status(404).json({
          status: "error",
          message: "User data not found",
        });

      return res.json({ status: "success", data: user });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "error", message: "Internal Server Error :", error });
    }
  },

  delete: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const user = await prisma.user.findUnique({
        where: { id: id },
      });
      if (!user)
        return res.status(404).json({
          status: "error",
          message: "User data not found",
        });

      await prisma.user.delete({ where: { id: id } });

      return res.json({ status: "success", message: "Success delete user" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "error", message: "Internal Server Error :", error });
    }
  },
};
