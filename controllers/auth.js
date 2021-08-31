const User = require('../models/user');
const bcrypt = require('bcryptjs');
const sendGridTransport = require('@sendgrid/mail');

const crypto = require('crypto');

sendGridTransport.setApiKey('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');


exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if(message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path:'/login',
        pageTitle: 'Login',
        errorMessage: message
    });
};

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if(message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: message
    });
};



exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email})
        .then(user => {
            if(!user) {
                req.flash('error', 'Invalid Email.')
                return res.redirect('/login');
            }
            
            bcrypt.compare(password, user.password)
            .then(doMatch => {
                if(doMatch) {
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    return req.session.save(err => {
                    console.log(err);
                    res.redirect('/');})
                }
                req.flash('error', 'Invalid Password.')
                return res.redirect('/login');
            })
            .catch(err => {
                console.log(err);
                res.redirect('/login');
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({email:email})
        .then(userDoc => {
            if(userDoc) {
                req.flash('error', 'An Account With That Email Already Exists.')
                return res.redirect('/signup');
            }
            return bcrypt.hash(password, 12)
            .then(hashedPassword => {
                const user = new User({
                    email: email,
                    password: hashedPassword,
                    cart: {items:[]}
                });
                return user.save();
            })
            .then(result => {
                res.redirect('/login');
                const msg = {
                    to: email,
                    from: 'moalzoabi@outlook.com',
                    subject: 'Signup Succeeded',
                    html:'<h3>You successfully signed up</h3>'
                  };
                  return sendGridTransport.send(msg);
        })
        .catch(err => {
            console.log(err);
        })
    })
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};

exports.getReset = (req, res, next) => {
    let message = req.flash('error');
    if(message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'Reset Password',
        errorMessage: message
      });
}

exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if(err) {
            return res.redirect('/reset');
        }

        const token = buffer.toString('hex');
        User.findOne({email: req.body.email})
            .then(user => {
                if(!user) {
                    req.flash('error', 'No Account With Such Email Exists.');
                    return res.redirect('/reset');
                }

                user.resetToken = token;
                user.resetTokenExp = Date.now() + 3600000;
                return user.save();
            })
            .then(result => {
                res.redirect('/')
                const msg = {
                    to: req.body.email,
                    from: 'moalzoabi@outlook.com',
                    subject: 'Password Reset',
                    html: `
                    <p> Password Reset Request <p>
                    <p> Click This <a href="http://localhost:3000/reset/${token}">Link</a> To Reset Your Password </p>
                    `
                };
                sendGridTransport.send(msg)
            })
            .catch(err => {
                console.log(err);
            })
    });
}

exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;
    User.findOne({resetToken: token, resetTokenExp: {$gt: Date.now()}})
        .then(user => {
            let message = req.flash('error');
            if(message.length > 0) {
                message = message[0];
            } else {
                message = null;
            }
        res.render('auth/new-password', {
            path: '/new-password',
            pageTitle: 'New Password',
            errorMessage: message,
            userId: user._id.toString(),
            passwordToken: token});
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;

    User.findOne({resetToken: passwordToken, resetTokenExp: {$gt: Date.now()}, _id: userId})
        .then(user => {
            resetUser = user;
            return bcrypt.hash(newPassword, 12);
        })
        .then(hashedPassword => {
            resetUser.password = hashedPassword;
            resetUser.resetToken = null;
            resetUser.resetTokenExp = undefined;
            return resetUser.save()
        })
        .then(result => {
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        })
}