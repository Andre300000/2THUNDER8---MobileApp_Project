//javascript code for blog app including functions of buttons and include functions for alert boxes and sliders
/* Authors
Aliz Dhital 
Andrew Ali 
Olorunfemi Adeosun 
Lisha Tamang 
*/
const SERVER_URL2 = "http://140.184.230.209:3056";

let z = document.getElementById("CH1");


var isVis = true;

//hides and shows keyboard and text area elements

function vis() {
    if (isVis) {

        document.getElementById("inpBlock").style.visibility = "Visible";
        document.getElementById("d2").style.display = "none";
        document.getElementById("b1").style.visibility = "visible";
        document.getElementById("b2").style.visibility = "visible";

        isVis = false;
    }
    else {

        document.getElementById("inpBlock").style.visibility = "Hidden";
        document.getElementById("d2").style.display = "Block";
        document.getElementById("b2").style.visibility = "Hidden";
        document.getElementById("b1").style.visibility = "hidden";

        isVis = true;
    }
}

let beenPressed = false;

//funtion used to set value to true on HTML shift element
function toTrue() {
    beenPressed = true;
}

//allows typing in textarea
function addChar(selection) {
    // Get the value from the id'ed field
    var currChars = $("#w3review").val();

    if (selection === "bksp") {
        // Set the id'ed field to a shortened string
        // @ts-ignore
        $("#w3review").val(currChars.substring(0, currChars.length - 1));
    }
    else {
        if (beenPressed) {
            $("#w3review").val(currChars.concat(selection.toUpperCase()));
            beenPressed = false;
        } else {
            $("#w3review").val(currChars.concat(selection));
        }
    }
}
// function for undo button
function undo() {

    var str = $("#w3review").val();
    var lastIndex = str.lastIndexOf(" ");

    // document.getElementById("w3review").innerHTML = str.substring(0, lastIndex);
    $("#w3review").val(str.substring(0, lastIndex));

    document.getElementById("ubtn").addEventListener('click', () => {
        document.getElementById("w3review").focus();
    });
}


//saves value to console
function enter() {
    // var currChars = $("#w3review").val();


    // $("#w3review").val(currChars.concat("                                                                                                      "));

}


//removes all text in text area
function cancel() {
    $("#w3review").val("");
    vis();
    window.location.reload();

}


function save() {

    let input1 = $("#w3review").val();



    $.post(SERVER_URL2 + "/w3review", { name: input1 });

    $.post(SERVER_URL2 + "/blogs", (req, res) => {
        const blog = new Blog(req.body);
     
        blog.save().then((result) => {
          res.redirect('/blogs');
        })
     })


    vis();
    window.location.reload();



}
function saveWordBank() {
    let wordbank_textarea = $("#w").val();
    document.getElementById("test").innerHTML += '<a href="#" class="btn btn-primary">' + " "+ wordbank_textarea + '</a>';
    console.log("hello")

    $.post(SERVER_URL2 + "/w", { name: wordbank_textarea });

    $("#test").on("click", function () {
        addChar2(wordbank_textarea);
    });
    console.log("work please ddddd");
    $("#w").val("");
    document.getElementById("w").focus();
}

//variable used in addChar2 function
let beenPressed2 = true;

//logic for word bank
function addChar2(selection) {
    // Get the value from the id'ed field
    var currChars = $("#w3review").val();

    if (beenPressed2) {
        $("#w3review").val(currChars.concat(selection + " "));

    }
}


// java script for displaying and hiding alert boxes
function showWar() {
    document.getElementById("customAlert").style.display = "block";

}
function showWar1() {
    document.getElementById("customAlert1").style.display = "block";

}

function showWar2() {
    document.getElementById("customAlert2").style.display = "block";

}
function hidealert() {

    document.getElementById("customAlert").style.display = "none";
}
function hideWar1() {
    hidealert();
    document.getElementById("customAlert1").style.display = "none";
}
function hideWar2() {
    hidealert();
    document.getElementById("customAlert2").style.display = "none";
}



