const express = require("express")
const passport = require("passport")
const router = express.Router()

//@desc auth with google 
//@route GET /auth/google
router.get('/google', passport.authenticate("google", {scope: ["profile"]}))

//@desc Google auth callback
//@route GET /dashboard
router.get('/google/callback', passport.authenticate("google", {
    failureRedirect: "/"
}),
(req,res) => {
    req.session.user = req.user
    res.redirect("/dashboard")
})


//@desc Logout User
//@route /auth/logout
router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
module.exports = router