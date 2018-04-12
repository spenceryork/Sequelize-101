const { Router } = require('express');
const router = Router();

router.use(require('./shows'));
router.use(require('./directors'));

module.exports = router;