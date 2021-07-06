export default function initBugsController(db) {
  const index = async (req, res) => {
    try {
      const allBugs = await db.Bug.findAll();
      console.log('all bugs', allBugs);

      res.send({ allBugs });
    }
    catch (error) {
      console.log(error);
    }
  };

  const root = (req, res) => {
    res.render('root');
  };

  const newBug = async (req, res) => {
    console.log(req.body);
    console.log('user id', req.cookies.userId);
    try {
      const bug = await db.Bug.create({
        problem: req.body.problem,
        errorText: req.body.errorText,
        commit: req.body.commit,
        featureId: req.body.featureId,
        userId: Number(req.cookies.userId),
      });

      console.log('bug', bug);
      res.send({ bug });
    }
    catch (error) {
      console.log(error);
    }
  };
  return { index, root, newBug };
}
