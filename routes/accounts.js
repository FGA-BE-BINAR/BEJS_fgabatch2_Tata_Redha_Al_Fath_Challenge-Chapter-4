const express = require("express");
const router = express.Router();

const accountController = require("../controllers/account.controller");

router.get("/", accountController.index);
router.post("/", accountController.create);
router.put("/:id", accountController.update);
router.get("/:id", accountController.detail);
router.delete("/:id", accountController.delete);

module.exports = router;
