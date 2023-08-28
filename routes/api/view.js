const express = require('express');
const router = express.Router();
const resetGraphics = require('../../helpers/viewHelpers');

router.get('/resetGraphics', (req, res) => {
  const result = resetGraphics();
  res.json(result);
});

module.exports = router;