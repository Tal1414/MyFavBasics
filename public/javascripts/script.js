var login = document.getElementById("loginBtn");
var register = document.getElementById("registerBtn");
var logoutUser = document.getElementById("LogoutUser");
var league = document.getElementById("addLeague");
var teams = document.getElementById("addTeam");
var showl = document.getElementById("SL");
var showt = document.getElementById("ST");
var share = document.getElementById("shareBtn");
var DelT = document.getElementById("delTeam");
var DelL = document.getElementById("delLeague");
var DelAllL = document.getElementById("clearLeagues");
var DelAllT = document.getElementById("clearTeams");
var shared = document.getElementById("sharedBtn");
var goback = document.getElementById("goback1");


login.addEventListener('click', loginAjax);
register.addEventListener('click', registerAjax);
logoutUser.addEventListener('click', logoutFunc);
league.addEventListener('click', AddLeague);
teams.addEventListener('click', AddTeam);
showl.addEventListener('click', showle);
showt.addEventListener('click', showte);
share.addEventListener('click', shareProfile);
DelT.addEventListener('click', deleteTeam);
DelL.addEventListener('click', deleteLeague);
DelAllL.addEventListener('click', clearleagues);
DelAllT.addEventListener('click', clearteams);
shared.addEventListener('click', sharedProfile);
goback.addEventListener('click', goback2);


function goback2() {
    document.getElementById("page2").style.display = "inline";
    document.getElementById("page4").style.display = "none";
    document.getElementById("page3").style.display = "none";
    document.getElementById("page1").style.display = "none";
};


function shareProfile() {
    var user = document.getElementById("userShare");
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/sharew/" + user.value, true);
    xhttp.send();
}

function sharedProfile() {
    var xhttp = new XMLHttpRequest();
    var Tlist = document.getElementById("showTList");
    var Llist = document.getElementById("showLList");

    xhttp.onreadystatechange = function () {
        var respObj = JSON.parse(this.responseText);
        var arrayTeams = respObj.resp.teams;
        var arrayLeagues = respObj.resp.leagues;
        var user = respObj.theuser;


        Tlist.innerHTML = "";
        Llist.innerHTML = "";
        if (user) {
            sharedProUser.innerHTML = user + " Favorites: ";
        } else {
            sharedProUser.innerHTML = "NO SHARED PROFILE!"
        }

        for (var i = 0; i < arrayTeams.length; i++) {
            var currentPostId = arrayTeams[i].id;
            var currentPostData = arrayTeams[i].data;
            if (currentPostId == user) {
                Tlist.innerHTML += (currentPostData + "<br>");
            }
        }
        for (var i = 0; i < arrayLeagues.length; i++) {
            var currentPostId = arrayLeagues[i].id;
            var currentPostData = arrayLeagues[i].data;
            if (currentPostId == user) {
                Llist.innerHTML += (currentPostData + "<br>");
            }
        }
    }


    document.getElementById("page4").style.display = "inline";
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "none";
    document.getElementById("page1").style.display = "none";


    xhttp.open("POST", "/share", true);
    xhttp.send();
};

function clearleagues() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            itemsAjax();
        }
    };
    xhttp.open("POST", "/leaguesclear", true);
    xhttp.send();
    itemsAjax();
}

function clearteams() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            itemsAjax();
        }
    };
    xhttp.open("POST", "/teamsclear", true);
    xhttp.send();
    itemsAjax();
}


function deleteTeam() {
    var newMsg = document.getElementById("NewTeam");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            itemsAjax();
        }
    };
    xhttp.open("POST", "/teamsdel/" + newMsg.value, true);
    xhttp.send();
    itemsAjax();
}

function deleteLeague() {
    var newMsg = document.getElementById("NewLeague");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            itemsAjax();
        }
    };
    xhttp.open("POST", "/leaguesdel/" + newMsg.value, true);
    xhttp.send();
    itemsAjax();
}


function showle() {

    var doc = document.getElementById("showLeagues");
    if (doc.style.display === 'none') {
        doc.style.display = 'block';
    } else {
        doc.style.display = 'none';
    }
};

function showte() {

    var doc = document.getElementById("showTeams");
    if (doc.style.display === 'none') {
        doc.style.display = 'block';
    } else {
        doc.style.display = 'none';
    }
};


function logoutFunc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        document.getElementById("page1").style.display = "inline";
        document.getElementById("page2").style.display = "none";
        document.getElementById("page3").style.display = "none";
    };
    xhttp.open("GET", "/logout", true);
    xhttp.send();
    console.log("logout");
}

function AddTeam() {
    var newMsg = document.getElementById("NewTeam");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            itemsAjax();
        }
    };
    xhttp.open("POST", "/teams/" + newMsg.value, true);
    xhttp.send();
    console.log("Post::", newMsg.value);
}

function AddLeague() {
    var newMsg = document.getElementById("NewLeague");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            itemsAjax();
        }
    };
    xhttp.open("POST", "/leagues/" + newMsg.value, true);
    xhttp.send();
    console.log("Post::", newMsg.value);
}

function postAjax() {
    var newMsg = document.getElementById("newMsg");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            itemsAjax();
        }
    };
    xhttp.open("POST", "/item/" + newMsg.value, true);
    xhttp.send();
    console.log("Post::", newMsg.value);
}

function itemsAjax() {
    var teams = document.getElementById("Teams");
    var leagues = document.getElementById("Leagues");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respObj = JSON.parse(this.responseText);
            var arrayTeams = respObj.resp.teams;
            var arrayLeagues = respObj.resp.leagues;
            var user = respObj.theuser;
            teams.innerHTML = "";
            leagues.innerHTML = "";
            for (var i = 0; i < arrayTeams.length; i++) {
                var currentPostId = arrayTeams[i].id;
                var currentPostData = arrayTeams[i].data;
                if (currentPostId == user) {
                    Teams.innerHTML += (currentPostData + "<br>");
                }
            }
            for (var i = 0; i < arrayLeagues.length; i++) {
                var currentPostId = arrayLeagues[i].id;
                var currentPostData = arrayLeagues[i].data;
                if (currentPostId == user) {
                    Leagues.innerHTML += (currentPostData + "<br>");
                }
            }
        }
    };

    xhttp.open("GET", "/items", true);
    xhttp.send();

}


function loginAjax() {
    var user = document.getElementById("LoginUsername");
    var pass = document.getElementById("LoginPass");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // document.getElementById("demo").innerHTML =
            //   this.responseText;

            var respObj = JSON.parse(this.responseText);
            if (respObj.msg === "Wrong Pass") {
                console.log("Wrong Pass");
                document.getElementById("page2").style.display = "none";
                document.getElementById("page1").style.display = "inline";
                document.getElementById("page3").style.display = "inline";
                document.getElementById("page4").style.display = "none";

            }
            if (respObj.msg === "OK") {
                console.log("OK");
                document.getElementById("page2").style.display = "inline";
                document.getElementById("page1").style.display = "none";
                document.getElementById("page3").style.display = "none";
                document.getElementById("page4").style.display = "none";
                itemsAjax();
            } else {

            }
        }
    };
    xhttp.open("GET", "/login/" + user.value + "/" + pass.value, true);
    xhttp.send();
    console.log("Login::", user.value + "/" + pass.value);
}

function registerAjax() {
    var user = document.getElementById("LoginUsername");
    var pass = document.getElementById("LoginPass");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // document.getElementById("demo").innerHTML =
            //   this.responseText;
            var respObj = JSON.parse(this.responseText);
            if (respObj.msg === "OK") {
                console.log("OK");
                document.getElementById("page2").style.display = "inline";
                document.getElementById("page1").style.display = "none";
                document.getElementById("page3").style.display = "none";
                document.getElementById("page4").style.display = "none";
                itemsAjax();
            }
            if (respObj.msg == "Username already exists") {
                console.log("Username already exists");
                document.getElementById("page1").style.display = "inline";
                document.getElementById("page2").style.display = "none";
                document.getElementById("page3").style.display = "none";
                document.getElementById("page4").style.display = "none";

            }
        }
    };
    xhttp.open("GET", "/register/" + user.value + "/" + pass.value, true);
    xhttp.send();
    console.log("register::", user.value + "/" + pass.value);
}