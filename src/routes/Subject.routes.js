const { Router } = require('express');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const ensuredTeacher = require('../middlewares/ensuredTeacher');

const SubjectController = require('../controllers/SubjectController');

const subjectRouter = Router();

subjectRouter.post(
  '/subject',
  ensureAuthenticated,
  ensuredTeacher,
  SubjectController.store,
);
subjectRouter.get(
  '/subject',
  ensureAuthenticated,
  ensuredTeacher,
  SubjectController.index,
);
subjectRouter.get(
  '/subject/:subject_id',
  ensureAuthenticated,
  ensuredTeacher,
  SubjectController.show,
);
subjectRouter.delete(
  '/subject/:subject_id',
  ensureAuthenticated,
  ensuredTeacher,
  SubjectController.delete,
);
subjectRouter.put(
  '/subject/:subject_id',
  ensureAuthenticated,
  ensuredTeacher,
  SubjectController.update,
);
module.exports = subjectRouter;
