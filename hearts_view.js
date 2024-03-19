import {HeartsRobotKmp} from "./hearts_robot_kmp.js";
import {HeartsRobotAP} from "./hearts_robot_ap.js";
import {Card, Hand, Trick} from "./hearts_model.js";
import {HU} from "./hearts_utils.js";

export class HeartsView {
    #model
    #controller

    constructor(model, controller) {
        this.#model = model;
        this.#controller = controller;

    }
    render(render_div) {
        window.addEventListener('DOMContentLoaded', loadWelcome); //load in welcome screen & name entry form
        var passsound = document.createElement("audio"); //ready the passing cards sound
        passsound.src = `Sound/Pass.mp3`;
        
        window.addEventListener('setRobotNames',(e)=>{ //setting robot names to default or user
            e.preventDefault();
            let pn = e.detail.name;
            let cn = e.detail.choosing_names; //T/F if player is choosing robot names
            let rob_names = ["Robot 1","Robot 2","Robot 3"]; //default robot names
            if(pn == 'Tarheel'){ //Tarheel Easter Egg code
                document.body.style.backgroundColor = "#62C6F2";
            } else {
                document.body.style.backgroundColor = "palevioletred";
            }

            document.getElementById('welcome').removeChild(document.getElementById('message_box')); //remove welcome & name entry form
            document.getElementById('welcome').removeChild(document.getElementById('name_form'));

            if(!cn){ //players not choosing name = set to default
                
                window.dispatchEvent(new CustomEvent('nameaccepted', {detail: {
                    name: pn,
                    choosing_names: cn,
                    r1: rob_names[0],
                    r2: rob_names[1],
                    r3: rob_names[2]
                }}));
            }
            
            if(cn){ //player IS choosing robot names
                var robotname_div = document.createElement('div'); //create div for robot form
                robotname_div.setAttribute("id","rob");
                var robnam_msg = document.createElement('p'); //create p for robot message
                var nT = document.createTextNode("Enter your desired robot names below:");
                robnam_msg.appendChild(nT);
                robnam_msg.setAttribute('id','msgg');

                var enter_names = document.createElement('form'); //create form for robot name entry
                enter_names.setAttribute("id", "robot_name_form");
           
                var name1 = document.createElement('input'); //spot for robot names 1, 2, and 3
                name1.setAttribute("type", "text");
                name1.setAttribute("name","RobotName1");
                name1.setAttribute("placeholder", "Name of Robot 1");
                name1.setAttribute("id", "RobotName1");
                var name2 = document.createElement('input');
                name2.setAttribute("type", "text");
                name2.setAttribute("name","RobotName2");
                name2.setAttribute("placeholder", "Name of Robot 2");
                name2.setAttribute("id", "RobotName2");
                var name3 = document.createElement('input');
                name3.setAttribute("type", "text");
                name3.setAttribute("name","RobotName3");
                name3.setAttribute("placeholder", "Name of Robot 3");
                name3.setAttribute("id", "RobotName3");
            
            
            
                var sub = document.createElement("input"); //submit button for robot entry form
                sub.setAttribute("type", "submit");
                sub.setAttribute("value", "Submit");
                sub.setAttribute("id", "robot_submit_button");
                
                enter_names.appendChild(name1); //add name inputs to form with breaks between
                enter_names.appendChild(document.createElement('br'));
                enter_names.appendChild(name2);
                enter_names.appendChild(document.createElement('br'));
                enter_names.appendChild(name3); 
                enter_names.appendChild(document.createElement('br')); 
                enter_names.appendChild(sub); //add submit button to form
                
                robotname_div.appendChild(robnam_msg); //add the robot instruction message
                robotname_div.appendChild(enter_names); //add the robot name form
                document.getElementById('welcome').appendChild(robotname_div); //add the div to the actual screen
                
                document.getElementById('robot_submit_button').addEventListener("click", ()=>{ //now need to see when user submits robot name form
                    let rob1 = (document.getElementById("RobotName1").value).toString(); //save input values of robot name
                    let rob2 = (document.getElementById("RobotName2").value).toString();
                    let rob3 = (document.getElementById("RobotName3").value).toString();
                    if(rob1.length > 0 && rob2.length > 0 && rob3.length > 0){ //as long as all 3 robots are named, proceed
                    
                        document.getElementById('welcome').removeChild(document.getElementById('rob'));
                        window.dispatchEvent(new CustomEvent('nameaccepted', {detail: {
                            name: pn,
                            choosing_names: cn,
                            r1: rob1,
                            r2: rob2,
                            r3: rob3
                        }}));
                    } else { //all 3 robots aren't named - go back
               
                        document.getElementById("RobotName1").style.border = 'thin solid red'; //angry empty boxes
                        document.getElementById("RobotName2").style.border = 'thin solid red';
                        document.getElementById("RobotName3").style.border = 'thin solid red';

                        alert('Please try again and be sure to enter names for each of your robots.');
                    }
                });
            } 
        });

        window.addEventListener('nameaccepted',(e) => { //user and all robots have valid names 
            var username = e.detail.name; //get users name
            var robot1 = e.detail.r1; //get all robots names
            var robot2 = e.detail.r2;
            var robot3 = e.detail.r3;
            document.body.style.backgroundColor = "palevioletred"; //default background

            if(username == "Tarheel"){ //Easter Egg background
                let tarheel = document.createElement("audio"); //RAHHHH
                tarheel.src = `Sound/RAH.mp3`;
                tarheel.play();
                alert("I'm a Tar Heel born I'm a Tar Heel bred \nAnd when I die I'm a Tar Heel dead.") ;
                alert("So it's RAH, RAH, Car'lina 'lina \nRAH, RAH, Car'lina 'lina"); //They probably think I'm done here but throw in 1 more
                alert("RAH, RAH, Car'lina \nRAH! RAH! RAH!");
                document.body.style.backgroundColor = "#62C6F2"; //The best blue
            }

            var gamescreen = document.createElement('div'); //whole game area
            gamescreen.style.width = '100%';
            gamescreen.style.height = '100%';
            gamescreen.setAttribute("class", "container");
            gamescreen.setAttribute("id", "gamescreen");
        
            var playscreen =  document.createElement('div'); //card play  area
            playscreen.style.width = '775px';
            playscreen.style.height = '775px';
            playscreen.style.position = 'relative';
            playscreen.setAttribute("class", "container");
            playscreen.setAttribute("id", "playscreen");
    
            var north_div =  document.createElement('div');//north player card area
            north_div.appendChild(document.createTextNode(robot1));
            north_div.setAttribute("id", "northpf");
        
            var east_div =  document.createElement('div'); //east player card area
            east_div.appendChild(document.createTextNode(robot2));
            east_div.setAttribute("id", "eastpf");
        
            var south_div =  document.createElement('div'); //player div
            south_div.appendChild(document.createElement('br'));
            south_div.setAttribute("id", "southpf"); 
    
            var west_div =  document.createElement('div'); //west player card area
            west_div.appendChild(document.createTextNode(robot3));
            west_div.appendChild(document.createElement('br'));
            west_div.setAttribute("id", "westpf");
    
            var playedcard_div = document.createElement('div'); //recent 3 cards
            playedcard_div.setAttribute('id', 'playedcard_div');
    
            var centerdescription = document.createElement('textarea'); //game log
            centerdescription.style.width = '40%';
            centerdescription.style.height = '40%';
            centerdescription.style.maxHeight = '80%';
            centerdescription.setAttribute('id','centerDisplay');
            centerdescription.readOnly = true;

            if(username == 'Tarheel'){ //Easter Egg matching center description
                centerdescription.style.backgroundColor = "#627af2";
            } else {
                centerdescription.style.backgroundColor = "lightpink";
            }

            playscreen.appendChild(north_div); //add all 4 card areas to the playscreen
            playscreen.appendChild(east_div);
            playscreen.appendChild(south_div);
            playscreen.appendChild(west_div);
            playscreen.appendChild(centerdescription); //add game log to playscreen
            playscreen.appendChild(playedcard_div); //add 3 recent card area to playscreen
            
            let rob3lbl = document.createElement('p'); //create label for West robot (added early for easy directional ordering)
            rob3lbl.innerHTML = `${robot3}`;
            rob3lbl.setAttribute('id','rob3lbl');
            gamescreen.appendChild(rob3lbl); //add label to gamescreen
            document.getElementById('welcome').appendChild(gamescreen); //add gamescreen to visible welcome div
            gamescreen.appendChild(playscreen); //add playscreen to gamescreen
        
            let usersnamelabel = document.createElement('p'); //create label for player 
            usersnamelabel.innerHTML = `${username}`;
            usersnamelabel.setAttribute('id','usersnamelabel');
            gamescreen.appendChild(usersnamelabel); //add label to gamescreen

            let rob1lbl = document.createElement('p'); //create label for North robot (added early for easy directional ordering)
            rob1lbl.innerHTML = `${robot1}`;
            rob1lbl.setAttribute('id','rob1lbl');
            gamescreen.appendChild(rob1lbl); //add label to gamescreen

            let rob2lbl = document.createElement('p'); //create label for East robot (added early for easy directional ordering)
            rob2lbl.innerHTML = `${robot2}`;
            rob2lbl.setAttribute('id','rob2lbl');
            gamescreen.appendChild(rob2lbl); //add label to gamescreen
        
            window.dispatchEvent(new CustomEvent('initializedSetup', {detail:{ //now that overall game board is setup - alert listeners it's okay to get the game going
            ro1: e.detail.r1,
            ro2: e.detail.r2,
            ro3: e.detail.r3
            
            }}));
        }); 

        window.addEventListener('initializedSetup', (e)=>{//listener for overall setup being done 
            var west_robot = new HeartsRobotAP(this.#model, this.#controller, 'west'); //creating robots
            var north_robot = new HeartsRobotAP(this.#model, this.#controller, 'north');
            var east_robot = new HeartsRobotAP(this.#model, this.#controller, 'east');     
            
            this.#controller.startGame(e.detail.ro1, e.detail.ro2, 'You', e.detail.ro3); //starting game with names all set
    
            this.#model.addEventListener('stateupdate', () =>{ //now that overall setup done, can listen for game state changes and start playing
                if(this.#model.getState() == 'passing') { //first passing state - game is starting
                    window.dispatchEvent(new CustomEvent('startinggame')); //signal game is starting so listeners can take action
                }
            });
        })
    
        this.#model.addEventListener('stateupdate', () => {  //state update - game is changing in some way
            this.#model.getHand('north').addEventListener('update', (e)=>{ //if north hand is updated, update the imgs in the div
                let rN = this.#model.getHand('north').getCards();
                let n = document.getElementById('northpf');
                n.innerHTML = ""; //reset north images
                n.appendChild(document.createTextNode('\n'));
                for(let k = 0; k < rN.length; k++){ //for each card in north's hand, the player should see a card back
                    let m = document.createElement('img');
                    m.setAttribute('class',"backcards");
                    m.src = `Pictures/blackjoker.png`;
                    n.appendChild(m);
                }
            })
            this.#model.getHand('east').addEventListener('update', (e)=>{ //if east hand is updated, update the imgs in the div
                let rE = this.#model.getHand('east').getCards();
                let b = document.getElementById('eastpf');
                b.innerHTML = "";
                b.appendChild(document.createTextNode('\n'));
                for(let k = 0; k < rE.length; k++){
                    let m = document.createElement('img');
                    m.setAttribute('class',"sidebackcards");
                    m.src = `Pictures/side.png`;
                    b.appendChild(m);
                }
            })
            this.#model.getHand('west').addEventListener('update', (e)=>{ //if west hand is updated, update the imgs in the div
                let rW = this.#model.getHand('west').getCards();
                let w = document.getElementById('westpf');
                w.innerHTML = "";
                w.appendChild(document.createTextNode('\n'));
                for(let k = 0; k < rW.length; k++){
                    let m = document.createElement('img');
                    m.setAttribute('class',"sidebackcards");
                    m.src = `Pictures/side.png`;
                    w.appendChild(m);
                }
            })
            this.#model.getHand('south').addEventListener('update', (e)=>{//if player hand is updated, update the imgs in the div
                let southdiv = document.getElementById('southpf');
                let play = document.getElementById('playscreen');
                
                let ty = e.detail.type;
                let cs = e.detail.cards;
                
                if(ty == "add") { //remove cards handled in each event, only need to deal with adding during passing phase
                    play.removeChild(southdiv); //remove southdiv so we can fix
                    document.getElementById('centerDisplay').append('You have received the following cards: \n'); //let player know what cards are passed to them
                    for(let i = 0; i < cs.length; i++) {
                        document.getElementById('centerDisplay').append(`${cs[i].toString()}\n`);
                        let img = document.createElement('img');
                        let cardtitle = cs[i].toString().split(" ");
                        img.setAttribute('class',"cardpics");
                        img.setAttribute('id',`${cardtitle[0]}${cardtitle[2]}`); //add correct images
                        img.src = `Pictures/${cardtitle[0]}${cardtitle[2]}.png`;
                        southdiv.appendChild(img);
                        img.addEventListener('click', ()=> { //images need to be ready to be clicked for passing and playing
                            window.dispatchEvent(new CustomEvent('imgclicked', {detail: {
                                clickedcard: cardtitle
                            }}));
                        });
                    }
                    play.appendChild(southdiv); //putting it back together
                }   
            })

            let passinglist = []; 
            if (this.#model.getState() == 'passing') { //passing phase
                let rN = this.#model.getHand('north').getCards(); //set up North, East, and West hands
                let rE = this.#model.getHand('east').getCards();
                let rW =this.#model.getHand('west').getCards();
                let n = document.getElementById('northpf');
                n.innerHTML = "";
                n.appendChild(document.createTextNode('\n'));
                let e = document.getElementById('eastpf');
                e.innerHTML = "";
                e.appendChild(document.createTextNode('\n'));
                let w = document.getElementById('westpf');
                w.innerHTML = "";
                w.appendChild(document.createTextNode('\n')); //reset N, E, W play areas
                           
                for(let k = 0; k < rN.length; k++){ //add cards for North
                    let m = document.createElement('img');
                    m.setAttribute('class',"backcards");
                    m.src = `Pictures/blackjoker.png`;
                    n.appendChild(m);
                }
                for(let k = 0; k < rE.length; k++){ //add cards for East
                let m = document.createElement('img');
                    m.setAttribute('class',"sidebackcards");
                    m.src = `Pictures/side.png`;
                    e.appendChild(m);
                }
                for(let k = 0; k < rW.length; k++){ //add cards for West
                    let m = document.createElement('img');
                        m.setAttribute('class',"sidebackcards");
                        m.src = `Pictures/side.png`;
                        w.appendChild(m);
                }
                document.getElementById('centerDisplay').append("Passing: " + this.#model.getPassing() + "\n"); //let player know passing direction
                var cards = [];
                cards = this.#model.getHand('south').getCards(); //look at player hand
                var play = document.getElementById('playscreen');
                var s = document.getElementById('southpf');
                play.removeChild(s); //reset S on the playscreen, making changes
                s.innerHTML = "";
                for(let j = 0; j < cards.length; j++) {
                    let cardtitl = cards[j].toString().split(" "); //get the card title broken up into the 3 words rank, of, suit
                    let im = document.createElement('img'); //create img for player cards
                    im.setAttribute('class',"cardpics");
                    im.setAttribute('id',`${cardtitl[0]}${cardtitl[2]}`); //id card by its rank and suit 
                    im.src = `Pictures/${cardtitl[0]}${cardtitl[2]}.png`; //find src by rank and suit
                    im.addEventListener('click', ()=> { //imgs need to be clickable
                        window.dispatchEvent(new CustomEvent('imgclicked', {detail: {
                            clickedcard: cardtitl
                        }}));
                    });
                    s.appendChild(im); //add image to south
                }
                play.appendChild(s); //add south back to playscreen

                if (this.#model.getPassing() != 'none') { //as long as the trick has a passing direction, need to pass
                    document.getElementById('centerDisplay').append("Click 3 cards from your hand to pass.\n"); //prompt user
                    window.addEventListener('imgclicked', (e)=> { //watch for user to click their 3 cards
                        let clickedcard = e.detail.clickedcard;
                        let clickedrank = clickedcard[0];
                        let suit = clickedcard[2];
                        let cardid = `${clickedrank}${suit}`; //find the id of the clicked card
                        if(clickedrank == 'jack'){ //fix rank for card making if it's a word rank
                            clickedrank = 11;
                        } else if(clickedrank =='queen') {
                            clickedrank = 12;
                        } else if(clickedrank =='king') {
                            clickedrank = 13;
                        } else if(clickedrank =='ace') {
                            clickedrank = 14;
                        }
                        let passCard = new Card(suit, clickedrank); //make card that we're passing
                        let playerHand = this.#model.getHand('south'); //get the player hand
                        if(passinglist.length < 3) { //only passing 3 cards
                            if(playerHand.contains(passCard)) { //player has the selected card (should always be true)
                                passinglist.push(passCard); //put clicked card in passinglist
                                let cardobj = document.getElementById(cardid);
                                let southdiv = document.getElementById('southpf');
                                let play = document.getElementById('playscreen');
                                play.removeChild(southdiv);
                                southdiv.removeChild(cardobj); //remove the south div from playscreen to update, and then remove the selected card to pass
                                play.appendChild(southdiv); //reappend the changed south div
                                if(passinglist.length == 3){ //once the 3rd card is selected, we can pass
                                    passsound.play();
                                    this.#controller.passCards('south',[passinglist[0],passinglist[1],passinglist[2]]); //pass cards
                                }
                            }
                        } 
                    })
                }
            } else if (this.#model.getState() == 'playing') { //playing now
                document.getElementById('centerDisplay').append("Passes complete, game starting.\n"); //inform user
                if(this.#model.getScoreLog().length < 1) { //1st play through (cards are fresh)
                    window.addEventListener('imgclicked', (e)=> { //add listener to cards 
                        let clickedcard = e.detail.clickedcard;
                        let clickedrank = clickedcard[0];
                        let suit = clickedcard[2];
                        if(clickedrank == 'jack'){
                            clickedrank = 11;
                        } else if(clickedrank =='queen') {
                            clickedrank = 12;
                        } else if(clickedrank =='king') {
                            clickedrank = 13;
                        } else if(clickedrank =='ace') {
                            clickedrank = 14;
                        } 
                        let passCard = new Card(suit, clickedrank);
                        let shand = this.#model.getHand('south');
                        if(shand.contains(passCard) && this.#controller.isPlayable('south',passCard)){ //as long as the player has the card they want to play and it is a playable card...
                            let rand = Math.ceil(Math.random()*4); //choose a random number for which playing card sound activates
                            let playsound = document.createElement("audio"); 
                            playsound.src = `Sound/CardDown${rand}.mp3`;
                            playsound.play(); //play a card noise
                                
                            this.#controller.playCard('south', passCard); //play the actual card

                            let cardname = passCard.toString().split(" ");
                            let idcard = `${cardname[0]}${cardname[2]}`; //get the id for the card that was clicked
                            let cardobj = document.getElementById(idcard);

                            let southdiv = document.getElementById('southpf');
                            let play = document.getElementById('playscreen');
                            southdiv.removeChild(cardobj); //remove the card from the users visible hand
                            play.appendChild(southdiv); //append fixed south div    
                        } else { //card can't be played for some reason
                            var err = document.createElement("audio"); //play a little error noise
                            err.src = "Sound/Error_39.wav";
                            err.play();
                        }
                    }) 
                }
            } else if (this.#model.getState() == 'complete') { //game is over
                var winner = null;
                var winning_score = 200;
                HU.positions.forEach(p => {
                    if (this.#model.getScore(p) < winning_score) {
                        winning_score = this.#model.getScore(p);
                        winner = p;
                    }
                });
                document.getElementById('centerDisplay').append(`Match over, ${this.#model.getPlayerName(winner)} wins!\n`); //Alert the player to the winner!
            }
        })
    
        this.#model.addEventListener('trickstart', () => { //start of a trick
            document.getElementById('centerDisplay').append("Trick started\n");
            if (this.#model.getCurrentTrick().nextToPlay() == 'south') {
                document.getElementById('centerDisplay').append("Your turn to play. Click a card of your choice to get the trick kicked off.\n"); //user has to play a card 
               
            }
        });
    
        this.#model.addEventListener('trickplay', (e) => { //playing in a trick
            document.getElementById('centerDisplay').append(this.#model.getPlayerName(e.detail.position) + " played the " + e.detail.card.toString() + "\n"); //let user know of other plays

            let tempcard = e.detail.card.toString().split(" "); //get info a
            let gg = document.createElement('img');
            gg.src = `Pictures/${tempcard[0]}${tempcard[2]}.png`;
            gg.setAttribute('class','recentcard');

            if(document.getElementById('playedcard_div').childElementCount == 0) { //no cards yet, can just add
                document.getElementById('playedcard_div').appendChild(gg);
            } else if(document.getElementById('playedcard_div').childElementCount == 1){ //1 card yet, need to shuffle thatup
                let card1 = document.getElementById('playedcard_div').children[0];
                card1.setAttribute('class','middle');
                document.getElementById('playedcard_div').appendChild(gg);
            } else if(document.getElementById('playedcard_div').childElementCount == 2){ //2 cards, need to shuffle everything up
                let card1 = document.getElementById('playedcard_div').children[0];
                let card2 =document.getElementById('playedcard_div').children[1];
                card1.setAttribute('class','top');
                card2.setAttribute('class', 'middle');
                document.getElementById('playedcard_div').appendChild(gg);
            } else {  //3 cards, time to start popping the oldest, bye buddy!
                let card1 = document.getElementById('playedcard_div').children[0];
                let card2 =document.getElementById('playedcard_div').children[1];
                let card3 = document.getElementById('playedcard_div').children[2];
                document.getElementById('playedcard_div').removeChild(card1);
                card2.setAttribute('class','top');
                card3.setAttribute('class', 'middle');
                document.getElementById('playedcard_div').appendChild(gg);
            }
            if (this.#model.getCurrentTrick().nextToPlay() == 'south') {
                document.getElementById('centerDisplay').append("Your turn to play. Click any viable card.\n"); //let the player know it's their time to shine
            }
        });
        this.#model.addEventListener('trickcollected', (e) => { //someone won the trick
            document.getElementById('centerDisplay').append("Trick won by " + this.#model.getPlayerName(e.detail.position) + "\n"); //announce trick winner
        });
        this.#model.addEventListener('scoreupdate', (e) => { //score updating between rounds
            if (e.detail.moonshooter != null) {
                alert(this.#model.getPlayerName(e.detail.moonshooter) + " shot the moon!"); 
            }
            document.getElementById('centerDisplay').append(`Score update: 
            ${this.#model.getPlayerName('north')}: ${e.detail.entry.north}
            ${this.#model.getPlayerName('east')} : ${e.detail.entry.east}
            ${this.#model.getPlayerName('south')}: ${e.detail.entry.south}
            ${this.#model.getPlayerName('west')} : ${e.detail.entry.west}\n`);
            document.getElementById('centerDisplay').append(`Current totals: 
            ${this.#model.getPlayerName('north')}: ${this.#model.getScore('north')}
            ${this.#model.getPlayerName('east')} : ${this.#model.getScore('east')}
            ${this.#model.getPlayerName('south')}: ${this.#model.getScore('south')}
            ${this.#model.getPlayerName('west')} : ${this.#model.getScore('west')}\n`);
        }); 
    }
    #parseCard(cstr) {
        var rank_char = cstr[0];
        var suit_char = cstr[1];

        var rank;
        if (rank_char == 'T' || rank_char == 't') {
            rank = 10;
        } else if (rank_char == 'J' || rank_char == 'j') {
            rank = 11;
        } else if (rank_char == 'Q' || rank_char == 'q') {
            rank = 12;
        } else if (rank_char == 'K' || rank_char == 'k') {
            rank = 13;
        } else if (rank_char == 'A' || rank_char == 'a') {
            rank = 14;
        } else {
            rank = parseInt(rank_char);
        }
        var suit;
        if (suit_char == 'H' || suit_char == 'h') {
            suit = 'hearts';
        } else if (suit_char == 'S' || suit_char == 's') {
            suit = 'spades';
        }
        if (suit_char == 'C' || suit_char == 'c') {
            suit = 'clubs';
        }
        if (suit_char == 'D' || suit_char == 'd') {
            suit = 'diamonds';
        }

        return new Card(suit, rank);
    }
    
    
}

function loadWelcome(){ //welcome screen and name function load in
    document.body.style.backgroundColor = "palevioletred"; //default background
    document.removeEventListener('DOMContentLoaded', loadWelcome);
    
    var welcome_div = document.createElement('div'); //create div for program
    welcome_div.setAttribute("id","welcome");

    var welcome_message = document.createElement('p'); //create p for welcome message
    var nodeText = document.createTextNode("Welcome to Hearts! Please enter your name:");
    welcome_message.appendChild(nodeText);
    welcome_message.setAttribute('id','message_box');

    var enter_name = document.createElement('form'); //create form for user name
    enter_name.setAttribute("id", "name_form");
    var name = document.createElement('input');
    name.setAttribute("type", "text");
    name.setAttribute("name","PlayerName");
    name.setAttribute("placeholder", "Tarheel"); //wink wink
    name.setAttribute("id", "name_field");

    var select_robot_names = document.createElement('input'); //create radio button for choosing the robot names
    select_robot_names.setAttribute("type", "radio");
    select_robot_names.setAttribute("id", "name_robots");
    select_robot_names.setAttribute("name", "robot_name");
    select_robot_names.setAttribute("value", "Choose Robot Names");
    var choose_label = document.createElement('label');
    choose_label.setAttribute("for", "name_robots");
    choose_label.innerHTML= "Choose Robot Names";


    var default_robot_names = document.createElement('input'); //create radio button for going with the default robot names
    default_robot_names.setAttribute("type", "radio");
    default_robot_names.setAttribute("id", "default_robots");
    default_robot_names.setAttribute("name", "robot_name");
    default_robot_names.setAttribute("value", "Default Robot Names");
    var default_label = document.createElement('label'); 
    default_label.setAttribute("for", "default_robots");
    default_label.innerHTML= "Default Robot Names";
    

    var submit = document.createElement("input"); //create submit button
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Submit");
    submit.setAttribute("id", "submit_button");
    
    enter_name.appendChild(name); //add name piece to form
    enter_name.appendChild(document.createElement('br')); //break between player name and robot name selection
    enter_name.appendChild(select_robot_names); //robot selection radio buttons & their labels
    enter_name.appendChild(choose_label);
    enter_name.appendChild(document.createElement('br'));
    enter_name.appendChild(default_robot_names);
    enter_name.appendChild(default_label);
    enter_name.appendChild(document.createElement('br'));
    enter_name.appendChild(submit); //add submit button to form

    welcome_div.appendChild(welcome_message); //add the welcome message and name form
    welcome_div.appendChild(enter_name);
    document.getElementById('main').append(welcome_div); //display welcome div
    document.getElementById('submit_button').addEventListener("click", submitresponse); //need to wait for player to submit name and choices
    
}


function submitresponse(){
    var choose_names = false; //default resopnse about robot names
    var player_name = (document.getElementById("name_field").value).toString(); //get player response and make it a string
    player_name = player_name.trim(); //get rid of any whitespaces/prevent players from being named " "
    if(player_name.length < 1) { //make sure name is at least one character
        var ee = document.createElement("audio"); //name isn't even a character, eerrrrr
        ee.src = "Sound/Error_39.wav";
        ee.play();
        alert("Please enter your name to continue."); //try again!
        document.getElementById('main').removeChild(document.getElementById('welcome'));
        loadWelcome(); //reload the welcome message and name form
    } else { //player submitted a good name!
        alert(`Your name has been set to ${player_name}`); //confirm name is set
        choose_names = document.getElementById('name_robots').checked; //if the player wants to choose robot names
        window.dispatchEvent(new CustomEvent('setRobotNames', {detail: { //let the player set the robot names (or bypass if they want default)
            name: player_name,
            choosing_names: choose_names
        }}));
    }
}