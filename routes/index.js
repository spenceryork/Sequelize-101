const { Router } = require('express');
const router = Router();

router.use(require('./shows'));

module.exports = router;