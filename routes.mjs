import db from './models/index.mjs';

// import your controllers here
import initBugsController from './controllers/bugs.mjs';
import initFeaturesController from './controllers/features.mjs';
import initUsersController from './controllers/users.mjs';

export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks
  const BugController = initBugsController(db);
  const FeatureController = initFeaturesController(db);
  const UserController = initUsersController(db);

  // define your route matchers here using app
  app.get('/', BugController.root);
  app.get('/index', BugController.index);
  app.post('/add-bug', BugController.newBug);
  app.get('/features', FeatureController.allFeatures);
  app.post('/add-feature', FeatureController.addFeature);
  app.get('/user', UserController.dashboard);
  app.post('/login', UserController.login);
}
