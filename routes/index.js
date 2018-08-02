const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.getAllApps);
router.get('/:id', controllers.getApp)
router.post('/', controllers.postApp);
router.put('/:id', controllers.updateApp);
router.delete('/:id', controllers.deleteApp);

module.exports = router