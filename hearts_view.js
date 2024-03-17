import {HeartsRobotKmp} from "./hearts_robot_kmp.js";
import {Card, Hand, Trick} from "./hearts_model.js";
import {HU} from "./hearts_utils.js";

export class HeartsView {
 //Need to figure out why it's saying undefined after player input && figure out how to get center display working during game

    #model
    #controller

    constructor(model, controller) {
        this.#model = model;
        this.#controller = controller;

    }

    // #doAsync() {
    //     return new Promise((resolve) => setTimeout(resolve, 0));
    // } 

    
//////choose name functionality not working, need to work on robots for those pts
///could animate cards moving in the playcard area OR could just add sound effect for .passcards and .playcards !!!!!
    render(render_div) {
        alert('in render')
        var robots_names = ["Robot 1", "Robot 2", "Robot 3"]; //initialize list of robot names
        // loadWelcome();
        var nameaccp = false;
       
        window.addEventListener('DOMContentLoaded', loadWelcome);
       
        
        var passsound = document.createElement("audio");
                                        passsound.src = `Sound/Pass.mp3`
        
        
        
        
            window.addEventListener('setRobotNames',(e)=>{
                e.preventDefault()
                
               
                
                let pn = e.detail.name
                let cn = e.detail.choosing_names
                let rob_names = ["","",""];

                document.getElementById('welcome').removeChild(document.getElementById('message_box'));
                document.getElementById('welcome').removeChild(document.getElementById('name_form'));

                if(!cn || rob_names[0].length > 0 && rob_names[1].length > 0 && rob_names[2].length > 0){
                  
                    window.dispatchEvent(new CustomEvent('nameaccepted', {detail: {
                        name: pn,
                        choosing_names: cn,
                        r1: "",
                        r2: "",
                        r3: ""
                    }}));
                }
                
                if(cn){
                    
                    var robotname_div = document.createElement('div'); //create div for program
                robotname_div.setAttribute("id","rob")
            
                var robnam_msg = document.createElement('p'); //create p for welcome message
                var nT = document.createTextNode("Enter your desired robot names below:");
            robnam_msg.appendChild(nT);
            robnam_msg.setAttribute('id','msgg')
            var enter_names = document.createElement('form');
            enter_names.setAttribute("id", "robot_name_form")
            // enter_name.setAttribute("method", "post");
            // enter_name.setAttribute("action", "submit.php"); //unsure about
            var name1 = document.createElement('input');
            name1.setAttribute("type", "text");
            name1.setAttribute("name","RobotName1");
            name1.setAttribute("placeholder", "Name of Robot 1");
            name1.setAttribute("id", "RobotName1")
            var name2 = document.createElement('input');
            name2.setAttribute("type", "text");
            name2.setAttribute("name","RobotName2");
            name2.setAttribute("placeholder", "Name of Robot 2");
            name2.setAttribute("id", "RobotName2")
            var name3 = document.createElement('input');
            name3.setAttribute("type", "text");
            name3.setAttribute("name","RobotName3");
            name3.setAttribute("placeholder", "Name of Robot 3");
            name3.setAttribute("id", "RobotName3")
            
            
            
            var sub = document.createElement("input");
            sub.setAttribute("type", "submit");
            sub.setAttribute("value", "Submit");
            sub.setAttribute("id", "robot_submit_button");
            
            enter_names.appendChild(name1); //add name piece to form
            enter_names.appendChild(document.createElement('br'));
            enter_names.appendChild(name2); //add name piece to form
            enter_names.appendChild(document.createElement('br'));
            enter_names.appendChild(name3); //add name piece to form
            enter_names.appendChild(document.createElement('br')); //break between player name and robot name selection
            enter_names.appendChild(sub); //add submit button to form
            
            robotname_div.appendChild(robnam_msg);
            robotname_div.appendChild(enter_names);
            document.getElementById('welcome').appendChild(robotname_div);
            
            sub.addEventListener("click", ()=>{
              
            
            let rob1 = (document.getElementById("RobotName1").value).toString()
            let rob2 = (document.getElementById("RobotName2").value).toString()
            let rob3 = (document.getElementById("RobotName3").value).toString()
            if(rob1.length > 0 && rob2.length > 0 && rob3.length > 0){
                // rob_names[0] = rob1
                // rob_names[1] = rob2
                // rob_names[2] = rob3
                window.dispatchEvent(new CustomEvent('nameaccepted', {detail: {
                    name: pn,
                    choosing_names: cn,
                    r1: rob1,
                    r2: rob2,
                    r3: rob3
                }}));
                document.getElementById('welcome').removeChild(document.getElementById(rob))
            } else {
                alert('no')
           
                document.getElementById("RobotName1").style.border = 'thin solid red'
                document.getElementById("RobotName2").style.border = 'thin solid red'
                document.getElementById("RobotName3").style.border = 'thin solid red'
                // window.dispatchEvent(new CustomEvent('setRobotNames', {detail: {
                //     name: player_name,
                //     choosing_names: true
                // }}))
            }

            
            
            });
                }
                
            
                
            })
            window.addEventListener('nameaccepted',(e) => {
            
            nameaccp = true;
            // window.removeEventListener('DOMContentLoaded', loadWelcome);
            var username = e.detail.name;
            var choosing = e.detail.choosing_names
            alert(e.detail.r1)
            if(choosing){
        
            } else {
                // document.getElementById('main').removeChild(document.getElementsById('welcome'))
        
            }
            // document.getElementById('welcome').removeChild(document.getElementById('message_box'));
            // document.getElementById('welcome').removeChild(document.getElementById('name_form'));
            
        
            var gamescreen = document.createElement('div'); //game screen, big picture with names and all
            gamescreen.style.width = '100%';
            gamescreen.style.height = '100%';
            // gamescreen.style.border = 'thin solid green';
            gamescreen.setAttribute("class", "container");
            gamescreen.setAttribute("id", "gamescreen");
        
            var playscreen =  document.createElement('div'); //active game pieces
            playscreen.style.width = '775px';
            playscreen.style.height = '775px';
            // playscreen.style.border = 'thin solid red';
            playscreen.style.position = 'relative';
            playscreen.setAttribute("class", "container");
            playscreen.setAttribute("id", "playscreen");
        
            var north_div =  document.createElement('div');//where north player stuff will go
            north_div.appendChild(document.createTextNode(robots_names[0]));
            north_div.setAttribute("id", "northpf");
        
            var east_div =  document.createElement('div');
            east_div.appendChild(document.createTextNode(robots_names[1]));
            east_div.setAttribute("id", "eastpf");
        
            var south_div =  document.createElement('div'); //player div
            
            // south_div.appendChild(document.createTextNode(username));
            south_div.appendChild(document.createElement('br'));
            
            south_div.setAttribute("id", "southpf"); //south playing field
        
            var west_div =  document.createElement('div');
            west_div.appendChild(document.createTextNode(`${robots_names[2]}`));
            west_div.appendChild(document.createElement('br'));
            west_div.setAttribute("id", "westpf");
        
            var playedcard_div = document.createElement('div');
            playedcard_div.setAttribute('id', 'playedcard_div');
        
             var centerdescription = document.createElement('textarea'); //game log so far
            centerdescription.style.width = '40%';
            centerdescription.style.height = '40%';
            centerdescription.style.maxHeight = '80%'
            // centerdescription.style.border = 'thin solid orange'
            centerdescription.setAttribute('id','centerDisplay')
            centerdescription.readOnly = true;
            
            playscreen.appendChild(north_div);
            playscreen.appendChild(east_div);
            playscreen.appendChild(south_div);
            playscreen.appendChild(west_div);
            playscreen.appendChild(centerdescription);
            playscreen.appendChild(playedcard_div);
            let rob3lbl = document.createElement('p')
            rob3lbl.innerHTML = `${robots_names[2]}`
            rob3lbl.setAttribute('id','rob3lbl')
            gamescreen.appendChild(rob3lbl)
            document.getElementById('welcome').appendChild(gamescreen);
            gamescreen.appendChild(playscreen);
            
            let usersnamelabel = document.createElement('p')
            usersnamelabel.innerHTML = `${username}`
            usersnamelabel.setAttribute('id','usersnamelabel')
            gamescreen.appendChild(usersnamelabel)
            let rob1lbl = document.createElement('p')
            rob1lbl.innerHTML = `${robots_names[0]}`
            rob1lbl.setAttribute('id','rob1lbl')
            gamescreen.appendChild(rob1lbl)
            let rob2lbl = document.createElement('p')
            rob2lbl.innerHTML = `${robots_names[1]}`
            rob2lbl.setAttribute('id','rob2lbl')
            gamescreen.appendChild(rob2lbl)
            
            
            
        
            window.dispatchEvent(new CustomEvent('initializedSetup'))
            
        
        
        }); 
    
        this.#model.addEventListener('stateupdate', () => {
            this.#model.getHand('north').addEventListener('update', (e)=>{
                let rN = this.#model.getHand('north').getCards()
                    
                           let n = document.getElementById('northpf');
                           n.innerHTML = "";
                           n.appendChild(document.createTextNode('\n'))
        
                           
                           for(let k = 0; k < rN.length; k++){
                               let m = document.createElement('img');
                                m.setAttribute('class',"backcards")
                                m.src = `Pictures/blackjoker.png`;
                                n.appendChild(m);
                           }
            })
            this.#model.getHand('east').addEventListener('update', (e)=>{
                let rE = this.#model.getHand('east').getCards()
                    
                           let b = document.getElementById('eastpf');
                           b.innerHTML = "";
                           b.appendChild(document.createTextNode('\n'))
        
                           
                           for(let k = 0; k < rE.length; k++){
                                let m = document.createElement('img');
                                m.setAttribute('class',"sidebackcards")
                                m.src = `Pictures/side.png`;
                                b.appendChild(m);
                           }
            })
            this.#model.getHand('west').addEventListener('update', (e)=>{
                let rW = this.#model.getHand('west').getCards()
                    
                           let w = document.getElementById('westpf');
                           w.innerHTML = "";
                           w.appendChild(document.createTextNode('\n'))
        
                           
                           for(let k = 0; k < rW.length; k++){
                                let m = document.createElement('img');
                                m.setAttribute('class',"sidebackcards")
                                m.src = `Pictures/side.png`;
                                w.appendChild(m);
                           }
            })
            this.#model.getHand('south').addEventListener('update', (e)=>{
                let southdiv = document.getElementById('southpf');
                let play = document.getElementById('playscreen');
                
                let ty = e.detail.type;
                let cs = e.detail.cards;
                
                    if(ty == "add") {
                        play.removeChild(southdiv);
                        document.getElementById('centerDisplay').append('You have received the following cards: \n')
                                for(let i = 0; i < cs.length; i++) {
                                    document.getElementById('centerDisplay').append(`${cs[i].toString()}\n`)
                                let img = document.createElement('img');
                                let cardtitle = cs[i].toString().split(" ");
                                img.setAttribute('class',"cardpics")
                                img.setAttribute('id',`${cardtitle[0]}${cardtitle[2]}`)
                                img.src = `Pictures/${cardtitle[0]}${cardtitle[2]}.png`
                              
                                southdiv.appendChild(img);
                                img.addEventListener('click', ()=> {
                                    window.dispatchEvent(new CustomEvent('imgclicked', {detail: {
                                        clickedcard: cardtitle
                                    }}));
                                });
                            }
                            play.appendChild(southdiv);
                    }
                   
            })

            let passinglist = []; 
            if (this.#model.getState() == 'passing') {
                
                if(this.#model.getScoreLog().length < 1) {
                   
                    window.addEventListener('initializedSetup', ()=>{
                        
                        let rN = this.#model.getHand('north').getCards()
                           let rE = this.#model.getHand('east').getCards()
                           let rW =this.#model.getHand('west').getCards()
                           let n = document.getElementById('northpf');
                           n.innerHTML = "";
                           n.appendChild(document.createTextNode('\n'))
                           let e = document.getElementById('eastpf');
                           e.innerHTML = "";
                           e.appendChild(document.createTextNode('\n'))
                           let w = document.getElementById('westpf');
                           w.innerHTML = "";
                           w.appendChild(document.createTextNode('\n'))
                           
                           for(let k = 0; k < rN.length; k++){
                               let m = document.createElement('img');
                                m.setAttribute('class',"backcards")
                                m.src = `Pictures/blackjoker.png`;
                                n.appendChild(m);
                           }
                           for(let k = 0; k < rE.length; k++){
                            let m = document.createElement('img');
                             m.setAttribute('class',"sidebackcards")
                             m.src = `Pictures/side.png`;
                             e.appendChild(m);
                            }
                            for(let k = 0; k < rW.length; k++){
                                let m = document.createElement('img');
                                m.setAttribute('class',"sidebackcards")
                                m.src = `Pictures/side.png`;
                                w.appendChild(m);
                            }
                        
                        document.getElementById('centerDisplay').append("Passing: " + this.#model.getPassing() + "\n");
                        let cards = [];
                        cards = this.#model.getHand('south').getCards();
                        let play = document.getElementById('playscreen')
                        let s = document.getElementById('southpf')
                        play.removeChild(s)
                        s.innerHTML = "";
                        // play.removeChild(s);
                        
                        for(let j = 0; j < cards.length; j++) {
                            let im = document.createElement('img');
                            let cardtitl = cards[j].toString().split(" ");
                            im.setAttribute('class',"cardpics")
                            im.setAttribute('id',`${cardtitl[0]}${cardtitl[2]}`)
                            im.src = `Pictures/${cardtitl[0]}${cardtitl[2]}.png`;
                            im.addEventListener('click', ()=> {
                                window.dispatchEvent(new CustomEvent('imgclicked', {detail: {
                                    clickedcard: cardtitl
                                }}));
                            });
                            s.appendChild(im);
                        }
                        
                        play.appendChild(s);
                    if (this.#model.getPassing() != 'none') {
                        document.getElementById('centerDisplay').append("Click 3 cards from your hand to pass.\n");
                        // document.getElementById('centerDisplay').append("Your hand:\n");
                        // document.getElementById('centerDisplay').append(this.#model.getHand('south').toString());
    
                        
                        window.addEventListener('imgclicked', (e)=> {
                            let clickedcard = e.detail.clickedcard;
                            let clickedrank = clickedcard[0];
                            
                            let suit = clickedcard[2];
                            let cardid = `${clickedrank}${suit}`
    
                            if(clickedrank == 'jack'){
                                clickedrank = 11
                           } else if(clickedrank =='queen') {
                            clickedrank = 12
                           } else if(clickedrank =='king') {
                            clickedrank = 13
                           } else if(clickedrank =='ace') {
                            clickedrank = 14
                           }
                            
                            let passCard = new Card(suit, clickedrank);
                            let playerHand = this.#model.getHand('south'); 
                            if(passinglist.length < 3) {
                                if(playerHand.contains(passCard)) { //player has the selected card
                                    
                                    passinglist.push(passCard); //put card in passinglist
                                    let cardobj = document.getElementById(cardid);
                                    let southdiv = document.getElementById('southpf');
                                    let play = document.getElementById('playscreen');
                                    play.removeChild(southdiv);
                                    southdiv.removeChild(cardobj);
                                    play.appendChild(southdiv);
                                    
                                    if(passinglist.length == 3){
                                        passsound.play()
                                        this.#controller.passCards('south',[passinglist[0],passinglist[1],passinglist[2]]);
                                        
                                    }
                                   
                                }
                            } 
                        })
                    }
                    })
                
                } else { //not 1st game
                    let rN = this.#model.getHand('north').getCards()
                           let rE = this.#model.getHand('east').getCards()
                           let rW =this.#model.getHand('west').getCards()
                           let n = document.getElementById('northpf');
                           n.innerHTML = "";
                           n.appendChild(document.createTextNode('\n'))
                           let e = document.getElementById('eastpf');
                           e.innerHTML = "";
                           e.appendChild(document.createTextNode('\n'))
                           let w = document.getElementById('westpf');
                           w.innerHTML = "";
                           w.appendChild(document.createTextNode('\n'))
                           
                           for(let k = 0; k < rN.length; k++){
                               let m = document.createElement('img');
                                m.setAttribute('class',"backcards")
                                m.src = `Pictures/blackjoker.png`;
                                n.appendChild(m);
                           }
                           for(let k = 0; k < rE.length; k++){
                            let m = document.createElement('img');
                             m.setAttribute('class',"sidebackcards")
                             m.src = `Pictures/side.png`;
                             e.appendChild(m);
                        }
                        for(let k = 0; k < rW.length; k++){
                            let m = document.createElement('img');
                             m.setAttribute('class',"sidebackcards")
                             m.src = `Pictures/side.png`;
                             w.appendChild(m);
                        }
                    document.getElementById('centerDisplay').append("Passing: " + this.#model.getPassing() + "\n");
                        var cards = [];
                        cards = this.#model.getHand('south').getCards();
                        var play = document.getElementById('playscreen')
                        var s = document.getElementById('southpf')
                        play.removeChild(s)
                        s.innerHTML = "";
                        // play.removeChild(s);
                        for(let j = 0; j < cards.length; j++) {
                           
                            let cardtitl = cards[j].toString().split(" ");
                            let cardid = `${cardtitl[0]}${cardtitl[2]}`
                            // let im = document.getElementById(cardid)
                            let im = document.createElement('img');
                            im.setAttribute('class',"cardpics")
                            im.setAttribute('id',`${cardtitl[0]}${cardtitl[2]}`)
                            im.src = `Pictures/${cardtitl[0]}${cardtitl[2]}.png`;
                            im.addEventListener('click', ()=> {
                                window.dispatchEvent(new CustomEvent('imgclicked', {detail: {
                                    clickedcard: cardtitl
                                }}));
                            });
                            s.appendChild(im);
                        }
                        
                        play.appendChild(s);
                    if (this.#model.getPassing() != 'none') {
                        document.getElementById('centerDisplay').append("Click 3 cards from your hand to pass.\n");
                        // document.getElementById('centerDisplay').append("Your hand:\n");
                        // document.getElementById('centerDisplay').append(this.#model.getHand('south').toString());
    
                        
                        window.addEventListener('imgclicked', (e)=> {
                            let clickedcard = e.detail.clickedcard;
                            let clickedrank = clickedcard[0];
                            
                            let suit = clickedcard[2];
                            let cardid = `${clickedrank}${suit}`
    
                            if(clickedrank == 'jack'){
                                clickedrank = 11
                           } else if(clickedrank =='queen') {
                            clickedrank = 12
                           } else if(clickedrank =='king') {
                            clickedrank = 13
                           } else if(clickedrank =='ace') {
                            clickedrank = 14
                           }
                            
                            let passCard = new Card(suit, clickedrank);
                            let playerHand = this.#model.getHand('south'); 
                            if(passinglist.length < 3) {
                                if(playerHand.contains(passCard)) { //player has the selected card
                                    
                                    passinglist.push(passCard); //put card in passinglist
                                    let cardobj = document.getElementById(cardid);
                                    let southdiv = document.getElementById('southpf');
                                    let play = document.getElementById('playscreen');
                                    play.removeChild(southdiv);
                                    southdiv.removeChild(cardobj);
                                    play.appendChild(southdiv);
                                    
                                    if(passinglist.length == 3){
                                        
                                        passsound.play()
                                        this.#controller.passCards('south',[passinglist[0],passinglist[1],passinglist[2]]);
                                        
                                        
                                    
                                    }
                                   
                                }
                            } 
                        })
                    }
                }
                

            } else if (this.#model.getState() == 'playing') {
                document.getElementById('centerDisplay').append("Passes complete, game starting.\n");
                if(this.#model.getScoreLog().length < 1) {
                    
                    // let southdiv = document.getElementById('southpf');
                    // let play = document.getElementById('playscreen');
                    // play.removeChild(southdiv);
                    // southdiv.innerHTML = "";
                    // var cards = [];
                    // cards = this.#model.getHand('south').getCards();
                    // for(let i = 0; i < cards.length; i++) {
                    //     let img = document.createElement('img');
                    //     let cardtitle = cards[i].toString().split(" ");
                    //     img.setAttribute('class',"cardpics")
                    //     img.setAttribute('id',`${cardtitle[0]}${cardtitle[2]}`)
                    //     img.src = `Pictures/${cardtitle[0]}${cardtitle[2]}.png`
                    //     southdiv.appendChild(img);
                    //     img.addEventListener('click', ()=> {
                    //         window.dispatchEvent(new CustomEvent('imgclicked', {detail: {
                    //             clickedcard: cardtitle
                    //         }}));
                    //     });
                    // }
                    // play.appendChild(southdiv)
                    window.addEventListener('imgclicked', (e)=> {
                        
                        let clickedcard = e.detail.clickedcard
                        let clickedrank = clickedcard[0];
                            
                            let suit = clickedcard[2];
                            // let cardid = `${clickedrank}${suit}`
    
                            if(clickedrank == 'jack'){
                                clickedrank = 11
                           } else if(clickedrank =='queen') {
                            clickedrank = 12
                           } else if(clickedrank =='king') {
                            clickedrank = 13
                           } else if(clickedrank =='ace') {
                            clickedrank = 14
                           }
                            
                            let passCard = new Card(suit, clickedrank);
                            let shand = this.#model.getHand('south')
                            //let playerHand = this.#model.getHand('south');
                            if(shand.contains(passCard) && this.#controller.isPlayable('south',passCard)){
                                // document.getElementById(cardid).style.border = "thin solid pink"
                                let rand = Math.ceil(Math.random()*4);
                                let playsound = document.createElement("audio");
                                    playsound.src = `Sound/CardDown${rand}.mp3`
                                    playsound.play()
                                   
                                this.#controller.playCard('south', passCard);
                                let cardname = passCard.toString().split(" ");
                                let idcard = `${cardname[0]}${cardname[2]}`
                                // alert(idcard)
                               
                                let cardobj = document.getElementById(idcard);
                                cardobj.style.border = 'thin solid blue'
                                    let southdiv = document.getElementById('southpf');
                                    
                                    let play = document.getElementById('playscreen');
                                    // play.removeChild(southdiv);
                                    southdiv.removeChild(cardobj);
                                    
                                    play.appendChild(southdiv);
                                    
                                    
                                    
                            } else {
                                var err = document.createElement("audio");
                                err.src = "Sound/Error_39.wav"
                                err.play()
                            }
                        }) 
                }
                else{

                }
                
                

            } else if (this.#model.getState() == 'complete') {
                var winner = null;
                var winning_score = 200;
                HU.positions.forEach(p => {
                    if (this.#model.getScore(p) < winning_score) {
                        winning_score = this.#model.getScore(p);
                        winner = p;
                    }
                });
                document.getElementById('centerDisplay').append(`Match over, ${this.#model.getPlayerName(winner)} wins!\n`);
            }
        })
    
        this.#model.addEventListener('trickstart', () => {
            document.getElementById('centerDisplay').append("Trick started\n");
            if (this.#model.getCurrentTrick().nextToPlay() == 'south') {
                document.getElementById('centerDisplay').append("Your turn to play. Click a card of your choice to get the trick kicked off.\n");
               
            }
        });
    
        this.#model.addEventListener('trickplay', (e) => {
            document.getElementById('centerDisplay').append(this.#model.getPlayerName(e.detail.position) + " played the " + e.detail.card.toString() + "\n");
            let tempcard = e.detail.card.toString().split(" ")
            let gg = document.createElement('img');
            gg.src = `Pictures/${tempcard[0]}${tempcard[2]}.png`
            gg.setAttribute('class','recentcard')
            if(document.getElementById('playedcard_div').childElementCount == 0) {
                // document.getElementById('playedcard_div').innerHTML = "";

                document.getElementById('playedcard_div').appendChild(gg);
            } else if(document.getElementById('playedcard_div').childElementCount == 1){
                let card1 = document.getElementById('playedcard_div').children[0]
                card1.setAttribute('class','middle')
                
                document.getElementById('playedcard_div').appendChild(gg);
            } else if(document.getElementById('playedcard_div').childElementCount == 2){
                let card1 = document.getElementById('playedcard_div').children[0]
                let card2 =document.getElementById('playedcard_div').children[1]
                card1.setAttribute('class','top')
                card2.setAttribute('class', 'middle')
                document.getElementById('playedcard_div').appendChild(gg);

            }
             else { //
                let card1 = document.getElementById('playedcard_div').children[0]
                let card2 =document.getElementById('playedcard_div').children[1]
                let card3 = document.getElementById('playedcard_div').children[2]
                document.getElementById('playedcard_div').removeChild(card1)
                card2.setAttribute('class','top')
                card3.setAttribute('class', 'middle')
                document.getElementById('playedcard_div').appendChild(gg);
            }
           

            if (this.#model.getCurrentTrick().nextToPlay() == 'south') {
                document.getElementById('centerDisplay').append("Your turn to play. Click any viable card.\n");
               
            }
        });
    
        this.#model.addEventListener('trickcollected', (e) => {
            document.getElementById('centerDisplay').append("Trick won by " + this.#model.getPlayerName(e.detail.position) + "\n");
        });
    
        this.#model.addEventListener('scoreupdate', (e) => {
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

//         // Uncomment the following line if you want to see four robots
//         // play each other instead of entering commands
//         //var south_robot = new HeartsRobotKmp(this.#model, this.#controller, 'south');
var west_robot = new HeartsRobotKmp(this.#model, this.#controller, 'west');
var north_robot = new HeartsRobotKmp(this.#model, this.#controller, 'north');
var east_robot = new HeartsRobotKmp(this.#model, this.#controller, 'east');     

this.#controller.startGame(robots_names[0], robots_names[1], 'You', robots_names[2]);
        
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







function loadWelcome(){
    alert('in welcome')
    document.removeEventListener('DOMContentLoaded', loadWelcome)
    
// var choosingNames = false;
    var welcome_div = document.createElement('div'); //create div for program
    welcome_div.setAttribute("id","welcome")

    var welcome_message = document.createElement('p'); //create p for welcome message
    var nodeText = document.createTextNode("Welcome to Hearts! Please enter your name:");
    welcome_message.appendChild(nodeText);
    welcome_message.setAttribute('id','message_box')
    var enter_name = document.createElement('form');
    enter_name.setAttribute("id", "name_form")
// enter_name.setAttribute("method", "post");
// enter_name.setAttribute("action", "submit.php"); //unsure about
    var name = document.createElement('input');
    name.setAttribute("type", "text");
    name.setAttribute("name","PlayerName");
    name.setAttribute("placeholder", "Name");
    name.setAttribute("id", "name_field")

    var select_robot_names = document.createElement('input');
    select_robot_names.setAttribute("type", "radio");
    select_robot_names.setAttribute("id", "name_robots");
    select_robot_names.setAttribute("name", "robot_name");
    select_robot_names.setAttribute("value", "Choose Robot Names");
    var choose_label = document.createElement('label');
    choose_label.setAttribute("for", "name_robots");
    choose_label.innerHTML= "Choose Robot Names";


    var default_robot_names = document.createElement('input');
    default_robot_names.setAttribute("type", "radio");
    default_robot_names.setAttribute("id", "default_robots");
    default_robot_names.setAttribute("name", "robot_name");
    default_robot_names.setAttribute("value", "Default Robot Names");
    
    var default_label = document.createElement('label');
    default_label.setAttribute("for", "default_robots");
    default_label.innerHTML= "Default Robot Names";
    

    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Submit");
    submit.setAttribute("id", "submit_button");
    
    enter_name.appendChild(name); //add name piece to form
    enter_name.appendChild(document.createElement('br')); //break between player name and robot name selection
    enter_name.appendChild(select_robot_names);
    enter_name.appendChild(choose_label);
    enter_name.appendChild(document.createElement('br'));
    enter_name.appendChild(default_robot_names);
    enter_name.appendChild(default_label);
    enter_name.appendChild(document.createElement('br'));
    enter_name.appendChild(submit); //add submit button to form

    welcome_div.appendChild(welcome_message);
    welcome_div.appendChild(enter_name);
    document.getElementById('main').append(welcome_div);
    document.getElementById('submit_button').addEventListener("click", submitresponse); //submit button response
    
}


    function submitresponse(){
        
    var choose_names = false;
        var player_name = (document.getElementById("name_field").value).toString(); //get player response and make it a string
        player_name = player_name.trim(); //get rid of any whitespaces/prevent players from being named " "
        if(player_name.length < 1) {
            var ee = document.createElement("audio");
                ee.src = "Sound/Error_39.wav"
                        ee.play()
            alert("Please enter your name to continue.");
            document.getElementById('main').removeChild(document.getElementById('welcome'));
            // document.getElementById('welcome').removeChild(document.getElementById('name_form'));
            loadWelcome();
        } else {
            alert(`Your name has been set to ${player_name}`);
            choose_names = document.getElementById('name_robots').checked;
            // if(choose_names) { //player wants to choose game
                window.dispatchEvent(new CustomEvent('setRobotNames', {detail: {
                    name: player_name,
                    choosing_names: choose_names
                }}))
            
            
            
                document.getElementById('submit_button').removeEventListener("click", submitresponse); 
            
            // return player_name;
        }
}