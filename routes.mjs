import sequelizePackage from 'sequelize';
import db from './models/index.mjs';

const { ValidationError, DatabaseError } = sequelizePackage;
// import your controllers here

export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks
  app.use((req, res, next) => {
    req.loggedIn = false;
    if (req.cookies.loggedIn) {
      req.loggedIn = true;
    }
    next();
  });
  // define your route matchers here using app
  app.get('/', (req, res) => {
    console.log('req.cookies :>> ', req.cookies);
    const { loggedIn } = req;
    res.render('index', { loggedIn });
  });
  app.post('/bug', async (req, res) => {
    console.log('req.cookies.userId :>> ', req.cookies.userId);
    console.log('req.body :>> ', req.body);
    const bugData = req.body;
    bugData.userId = req.cookies.userId;
    const bug = await db.Bug.create(bugData);
    console.log('bug :>> ', bug);
    res.send({ bug });
  });
  app.post('/signup', async (req, res) => {
    console.log('req.body :>> ', req.body);
    try {
      const newUser = await db.User.create(req.body);
      console.log('newUser :>> ', newUser);
      res.send({ newUser });
    }
    catch (exception) {
      if (exception instanceof ValidationError) {
        console.error('This is a validation error!');
        console.log('exception :>> ', exception);
        console.error('The following is the first error message:');
        console.error(exception.errors[0].message);
      } else if (exception instanceof DatabaseError) {
        console.error('This is a database error!');
        console.log('exception :>> ', exception);
      } else {
        console.log('exception :>> ', exception);
      }
      res.send(exception);
    }
  });
  app.post('/login', async (req, res) => {
    console.log('req.body :>> ', req.body);
    try {
      const user = await db.User.findOne({
        where: {
          email: req.body.email,
          password: req.body.password,
        },
      });

      console.log('user :>> ', user);

      if (user !== null) {
        res.cookie('loggedIn', true);
        res.cookie('userId', user.id);
        console.log('req.cookies :>> ', req.cookies);
        const cookies = {
          loggedIn: true,
          userId: user.id,
        };
        res.send(cookies);
      }
      else {
        const data = {
          errors: [
            {
              message: 'Invalid credentials',
            },
          ],
        };
        res.send(data);
      }
    }
    catch (exception) {
      if (exception instanceof ValidationError) {
        console.error('This is a validation error!');
        console.log('exception :>> ', exception);
        console.error('The following is the first error message:');
        console.error(exception.errors[0].message);
      } else if (exception instanceof DatabaseError) {
        console.error('This is a database error!');
        console.log('exception :>> ', exception);
      } else {
        console.log('exception :>> ', exception);
      }
      res.send(exception);
    }
  });
}
