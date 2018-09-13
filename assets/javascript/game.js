//Array of Playable Characters 
$(document).ready(function () {

    var myChar, opponentChar, choices, enemyArray, haveCharacter, haveAttacker, numEnemies;	//Set Variables
    var wins = 0;
    var loses = 0;

    var varSet = function () {
        myChar;
        opponentChar;

        choices = [];
        enemyArray = [{
            id: 0,
            name: "Jordan",
            pic: 'assets/images/jordan.png',
            alt: 'jordan',
            hitPoints: setPoints(100,200),
            attackPower: setPoints(8,18),
        }, {
            id: 1,
            name: "Austin",
            pic: 'assets/images/austin.png',
            alt: 'austin',
            hitPoints: setPoints(100,200),
            attackPower: setPoints(8,18),
        }, {
            id: 2,
            name: "Cameron",
            pic: 'assets/images/cameron.png',
            alt: 'cameron',
            hitPoints: setPoints(100,200),
            attackPower: setPoints(8,18),
        }, {
            id: 3,
            name: "Victoria",
            pic: 'assets/images/victoria.png',
            alt: 'victoria',
            hitPoints: setPoints(100,200),
            attackPower: setPoints(8,18),
        }, {
            id: 4,
            name: "Logan",
            pic: 'assets/images/logan.png',
            alt: 'logan',
            hitPoints: setPoints(100,200),
            attackPower: setPoints(8,18),
        }];

        haveCharacter = false;
        haveAttacker = false;
        numEnemies = 4;


        //creates character divs and writes them to page 
        for (var i = 0; i < enemyArray.length; i++) {
            choices += "<div id=" + enemyArray[i].id + " class='character col-sm' value=" + enemyArray[i].id +
                ">" + "<div class='character-name'>" + enemyArray[i].name + "</div>" + "<img class='character-image' src=" + enemyArray[i].pic + " alt=" + enemyArray[i].alt + "><br> HP: " + enemyArray[i].hitPoints +
                "<br> AP: " + enemyArray[i].attackPower + " </div>";
        }

        $("#character-section").html(choices);
        $("#todo").html("Click to Choose Your Character");
        $("#wins").html("Wins: " + wins);
        $("#loses").html("Losses: " + loses);

        $("#attack").hide();
        $("#restart").hide();
        $('#fight').hide();
        $('#whathappens').hide();
        $('.hero').remove();
        $('.fighting').remove();

        setCharacter();
    }

    //character selection 
    function setCharacter() {
        $('.character').on("click", function () {

            if (!haveCharacter) {
                myChar = $(this).attr('id');
                $("#myguy").append(this);
                $(this).addClass("hero");
                $("#character-title").hide();
                $('#fight').show();
                haveCharacter = true;
                $('#whathappens').html("");
                $("#todo").html("Choose your Opponent!");
            }
            //You have a character and you're picking your opponent
            else if (!haveAttacker && haveCharacter && myChar !== $(this).attr('id')) {
                opponentChar = $(this).attr('id');
                $("#enemy").append(this);
                $(this).addClass("fighting");
                $("#attack").show();
                $("#restart").show();
                haveAttacker = true;
                $('#whathappens').html("");
                $("#todo").html("Click Fight to Attack!");
            }
        });
    }

    //updates characters with points 
    function renderCharacters() {
        var hero = "<div id=" + enemyArray[myChar].id + " class='character text-center hero col-sm' value=" + enemyArray[myChar].id +
            ">" + "<div class='character-name'>" + enemyArray[myChar].name + "</div>" + "<img class='character-image' src=" + enemyArray[myChar].pic + " alt=" + enemyArray[myChar].alt + "><br> HP: " + enemyArray[myChar].hitPoints +
            "<br> AP: " + enemyArray[myChar].attackPower + " </div>";
        var badguy = "<div id=" + enemyArray[opponentChar].id + " class='character text-center fighting col-sm' value=" + enemyArray[opponentChar].id +
            ">" + "<div class='character-name'>" + enemyArray[opponentChar].name + "</div>" + "<img class='character-image' src=" + enemyArray[opponentChar].pic + " alt=" + enemyArray[opponentChar].alt + "><br> HP: " + enemyArray[opponentChar].hitPoints +
            "<br> AP: " + enemyArray[opponentChar].attackPower + " </div>";
        $('#myguy').html(hero);
        $('#enemy').html(badguy);
    }

    //prints actions to page 
    function whatHappens() {
        $('#whathappens').show();
        var description = enemyArray[myChar].name + " attacks " + enemyArray[opponentChar].name + " with " + enemyArray[myChar].attackPower + " damage!<br>" +
            enemyArray[opponentChar].name + " counterattacks with " + enemyArray[opponentChar].attackPower + " damage!";
        $('#whathappens').html(description);
    }

    //attack button operations
    $('#attack').on('click', function () {
        if (!haveCharacter) {
            $('#whathappens').html("You need to pick your character first!");
        } else if (!haveAttacker) {
            $('#whathappens').html("Pick who you are fighting!");
        } else if (haveCharacter && haveAttacker) {
            whatHappens();
            enemyArray[opponentChar].hitPoints = enemyArray[opponentChar].hitPoints - enemyArray[myChar].attackPower;	//Hit Them
            enemyArray[myChar].hitPoints = enemyArray[myChar].hitPoints - enemyArray[opponentChar].attackPower;	//Get Hit

            if (enemyArray[opponentChar].hitPoints < 0) {
                numEnemies--;
                if (numEnemies > 0) {
                    $(".fighting").remove();
                    $("#whathappens").hide();
                    enemyArray[myChar].hitPoints = enemyArray[myChar].hitPoints + 50;
                    $("#todo").html("You have defeated " + enemyArray[opponentChar].name + "! Choose another opponent." );
                    haveAttacker = false;
                } else {
                    whatHappens();
                    alert("Congratulations! " + enemyArray[myChar].name + " is the Winner!")
                    // $("#todo").html(enemyArray[myChar].name + "is the Winner!");
                    wins++;
                    $("#wins").html("Wins: " + wins);
                    varSet();
                }
            } else if (enemyArray[myChar].hitPoints < 0) {
                whatHappens();
                alert("You have been defeated by " + enemyArray[opponentChar].name + "! Try again!");
                loses++;
                $("#loses").html("Losses: " + loses);
                varSet();
            } else {
                whatHappens();
                renderCharacters();
            }

        }
    });

    //restart button
    $('#restart').on("click", function () {
        varSet();

    });

    //random  number generator 
    function setPoints(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }







    varSet();

});