var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();


app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.text({type: '*/*'}));
app.use(cookieParser());

var uidCounter = 1;
var logedInUsers = {};
var PassList = {};
var logedInUsersTag = {};
var sharedWith = [];

var FavT = [];
var FavL = [];


app.use('/logout', function (req, res, next) {
    console.log("logout");
    res.clearCookie("uid");
});

app.use('/share', function (req, res, next) {
    var user = logedInUsersTag[req.cookies.uid];
    var result = {
        teams: FavT, leagues: FavL
    };
    res.json({resp: result, theuser: sharedWith[user]});
});

app.use('/sharew/:theuser', function (req, res, next) {
    var newuser = req.params.theuser;
    var user = logedInUsersTag[req.cookies.uid];
    sharedWith[newuser] = user;
    res.json({});
});

app.use('/login/:user/:pass', function (req, res, next) {
    console.log("login");
    var username = req.params.user;
    var pass = req.params.pass;
    var uid = logedInUsers[username];
    if (uid) {
        if (pass == PassList[username]) {
            res.cookie('uid', uid, {expire: new Date() + 3600000});
            res.json({msg: "OK"});
            res.status(200);
        } else {
            res.json({msg: "Wrong Pass"});
            res.status(500);
        }
    }
});

app.use('/register/:user/:pass', function (req, res, next) {
    console.log("register");
    var username = req.params.user;
    var pass = req.params.pass;
    if (logedInUsers[username]) {
        res.json({msg: "Username already exists"});
        res.status(500);
    } else {
        uidCounter++;
        logedInUsers[username] = uidCounter;
        logedInUsersTag[uidCounter] = username;
        PassList[username] = pass;
        res.cookie('uid', uidCounter, {expire: new Date() + 3600000});
        res.json({msg: "OK"});
        res.status(200);
    }
});
app.get('/', function (req, res) {
    res.sendfile('index.html', {root: __dirname + "/public"});
});


app.post('/teams/:newTeam', function (req, res, next) {
    var newt = req.params.newTeam;
    var user = logedInUsersTag[req.cookies.uid];
    console.log("add team" + " " + newt);
    FavT.push({"id": user, "data": newt});
    //FavT.push({"id":logedInUsersTag[req.cookies.uid], "data" : + 'newt' , "PostId":PostId});
    //{"id" : logedInUsers[logedInUsersTag[req.cookies.uid]], "data":"Willing to play till" + time}
    //PostId++;
    res.json({});

});

app.post('/leagues/:newLeague', function (req, res, next) {
    var newl = req.params.newLeague;
    var user = logedInUsersTag[req.cookies.uid];
    console.log("add league " + newl);
    FavL.push({"id": user, "data": newl});
    //FavT.push({"id":logedInUsersTag[req.cookies.uid], "data" : + 'newt' , "PostId":PostId});
    //{"id" : logedInUsers[logedInUsersTag[req.cookies.uid]], "data":"Willing to play till" + time}
    //PostId++;
    res.json({});

});


app.use('/items', function (req, res, next) {
    var user = logedInUsersTag[req.cookies.uid];
    console.log("items show");
    var result = {
        teams: FavT, leagues: FavL
    };
    //console.log('result:::::', result.result.id);
    res.json({resp: result, theuser: user});
});

app.use('/teamsdel/:team', function (req, res, next) {
    var team = req.params.team;
    for (var i = 0; i < FavT.length; i++) {
        if (FavT[i].data == team) {
            FavT.splice(i, 1);

        }
    }

});

app.use('/leaguesdel/:league', function (req, res, next) {
    var league = req.params.league;
    for (var i = 0; i < FavL.length; i++) {
        if (FavL[i].data == league) {
            FavL.splice(i, 1);

        }
    }

});

app.use('/teamsclear', function (req, res, next) {
    var user = logedInUsersTag[req.cookies.uid];
    for (var i = 0; i < FavT.length; i++) {
        if (FavT[i].id == user) {
            FavT.splice(i, 1);
            if (FavT[i].id == user && FavT.length == 1) {
                FavT = [];
            }

        }
    }

});

app.use('/leaguesclear', function (req, res, next) {
    var user = logedInUsersTag[req.cookies.uid];
    for (var i = 0; i < FavL.length; i++) {
        if (FavL[i].id == user) {
            FavL.splice(i, 1);
            if (FavL[i].id == user && FavL.length == 1) {
                FavL = [];
            }
        }
    }

});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    // render the error page
    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;
