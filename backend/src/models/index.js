// declare and fill models: that's where you should register your own managers

const models = {};

const UsersManager = require("./UsersManager");
const VideosManager = require("./VideosManager");
const PlaylistsManager = require("./PlaylistsManager");
const CategoriesManager = require("./CategoriesManager");
const CarouselsManager = require("./CarouselsManager");

models.users = new UsersManager();
models.videos = new VideosManager();
models.playlists = new PlaylistsManager();
models.categories = new CategoriesManager();
models.carousels = new CarouselsManager();

// bonus: use a proxy to personalize error message,
// when asking for a non existing model

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
