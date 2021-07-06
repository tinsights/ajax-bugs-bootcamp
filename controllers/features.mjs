export default function initFeaturesController(db) {
  const allFeatures = async (req, res) => {
    try {
      const features = await db.Feature.findAll();
      res.send({ features });
    }
    catch (error) {
      console.log(error);
    }
  };

  const addFeature = async (req, res) => {
    try {
      const feature = await db.Feature.create({
        name: req.body.name,
      });
      res.send({ feature });
    }
    catch (error) {
      console.log(error);
    }
  };
  return { allFeatures, addFeature };
}
