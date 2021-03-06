const User = require('../models/user');

module.exports.profile = function(req, res) {
    // res.end('<h1>User Profile</h1>');
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        })
    });
    
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}



//render the sign up page
module.exports.signUp = function(req, res){

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codeial | SignUp"
    });
}

//render the sign in page
module.exports.signIn = function(req, res){
    
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: "Codeial | SignIn"
    });
}

//get the sign-up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');

            })
        } else {
            return res.redirect('back');
        }
    });
}

//get the sign-in data
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Sucessfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    req.logout(); 
    req.flash('success', 'Logged out Sucessfully');
    return res.redirect('/');
}