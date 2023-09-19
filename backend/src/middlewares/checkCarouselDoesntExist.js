const models = require("../models");

const checkCarouselDoesntExists = async (req, res, next) => {
  const [carousel] = await models.carousels.findByCarouselTitle(req.body.title);

  if (carousel.length) {
    return res.status(400).json({ message: "Carousel already exists" });
  }

  return next();
};

module.exports = checkCarouselDoesntExists;
