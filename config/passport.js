const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const loginStrategy = passport.use(
  "local.login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      db.query(
        "SELECT * FROM users WHERE username=?",
        [username],
        (err, rows) => {
          if (err) return done(err);
          // if username is correct
          if (rows.length) {
            const user = rows[0];
            bcrypt.compare(password, user.password, function (err, isCorrect) {
              // if correct password
              if (isCorrect) {
                console.log(user);
                return done(null, user);
              }
              // if wrong password
              else {
                return done(
                  null,
                  false,
                  // req.flash(
                  //   "loginMessage",
                  //   "Tài khoản hoặc mật khẩu không chính xác"
                  // )
                  { message: "Tài khoản hoặc mật khẩu không chính xác" }
                );
              }
            });
          }
          // no username found
          else {
            // FIXME: this one is not done
            return done(
              null,
              false,
              req.flash("loginMessage", "Tài khoản không tồn tại")
            );
            //   res.status(200).json({ headers: req.headers });
          }
        }
      );
    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      // find a user whose username is the same as the forms username
      // check if this username exist
      db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, rows) => {
          if (err) return done(err);
          if (rows.length) {
            return done(
              null,
              false,
              req.flash("signupMessage", {
                type: "danger",
                message: "That username is already taken.",
              })
            );
          } else {
            // if there is no user with that username
            // create the user
            const { first_name, last_name, address, gender, phone } = req.body;
            bcrypt.hash(password, saltRounds, (err, hash) => {
              const newUser = {
                username,
                password: hash,
                first_name,
                last_name,
                address,
                phone,
              };
              const insertQuery =
                "INSERT INTO users ( username, password,first_name,last_name,address,phone ) values (?,?,?,?,?,?)";
              db.query(
                insertQuery,
                [username, hash, first_name, last_name, address, phone],
                (err, rows) => {
                  // if (err) console.log(err);
                  newUser.id = rows.insertId;
                  return done(null, newUser);
                }
              );
            });
          }
        }
      );
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(id);
  db.query("SELECT * FROM users WHERE id = ? ", [id], (err, rows) => {
    if (err) done(err);
    else done(null, rows[0]);
  });
});
