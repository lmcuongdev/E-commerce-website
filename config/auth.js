module.exports = {
  isLoggedIn: (req, res, next) => {
    // if user is authenticated in the session, move on
    if (req.isAuthenticated()) return next();
    // else go to homepage
    console.log("Currently logged in");
    res.redirect("/");
  },
  isLoggedOut: (req, res, next) => {
    // if user is authenticated, go to homepage
    if (req.isAuthenticated()) res.redirect("/");
    // if not authenticated then move on
    else {
      console.log("Currently logged out");
      next();
    }
  },
};
