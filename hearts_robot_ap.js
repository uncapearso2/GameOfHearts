export class HeartsRobotAP {
    #model;
    #controller;
    #position;

    constructor(model, controller, position) {
        this.#model = model;
        this.#controller = controller;
        this.#position = position;
//bot that always passes 2 of clubs (for chance to win first trick), never passes ace of clubs (definitely win first trick), and always chooses the highest rank card in hopes of winning
        
        this.#model.addEventListener('stateupdate', () => {
            let state = this.#model.getState();

            if ((state == 'passing') && (this.#model.getPassing() != 'none')) { 
                let hand = this.#model.getHand(this.#position);
                let robcards = hand.getCards();
                let x = '';
                let hastwoclubs = false;
                let twoclubs = '';
                let hasaceclubs = false;
                let twoofclubs = '';
                let aceclubs = '';
                
                for(let i = 0; i < robcards.length; i++) { //see if passing robot has 2 or ace of clubs
                    if(robcards[i].toString() == '2 of clubs'){
                        hastwoclubs = true;
                        twoclubs = i
                        twoofclubs = robcards[i]
                        robcards.splice(twoclubs,1) //remove two of clubs from passable cards
                    } else if(robcards[i].toString() == 'ace of clubs'){
                        // alert('woot')
                        hasaceclubs = true;
                        aceclubs = i
                        // alert(robcards)
                        robcards.splice(aceclubs,1); //remove ace of clubs from passable cards
                        // alert(robcards)
                    }

                }
                
                if(hastwoclubs){ //if you have 2 of clubs, always want to pass it
                    let cards_to_pass = robcards.map(c => [c, Math.random()]) //2 random passing cards
                                                .sort((a,b) => a[1] - b[1])
                                                .slice(0, 2)
                                                .map(cr => cr[0]);
                    cards_to_pass[2] = (twoofclubs) //add the two of clubs
                    this.#controller.passCards(this.#position, cards_to_pass);  
                } else {
                    let cards_to_pass = robcards.map(c => [c, Math.random()]) //all random cards
                                                .sort((a,b) => a[1] - b[1])
                                                .slice(0, 3)
                                                .map(cr => cr[0]);
                    this.#controller.passCards(this.#position, cards_to_pass);  
                } 
            } 
        });
    
        this.#model.addEventListener('trickstart', () => this.#playCard());
        this.#model.addEventListener('trickplay', () => this.#playCard());
    }

    #playCard() {
        
        if (this.#model.getCurrentTrick().nextToPlay() == this.#position) {
            let playable_cards = this.#model.getHand(this.#position)
                                            .getCards()
                                            .filter(c => this.#controller.isPlayable(this.#position, c));
            let highestcard = playable_cards[0];
            
            let highestrank = playable_cards[0].getRank();
           
            
            if (playable_cards.length > 0) { //always choose the highest rank
              
                for(let j = 0; j <playable_cards.length; j++){
                    
                    let rank = playable_cards[j].getRank()
                    
                    if(rank > highestrank){
                        highestrank = rank;
                        highestcard = playable_cards[j];
                    }
                }
                // let card = playable_cards.map(c => [c, Math.random()])
                //                          .sort((a,b) => a[1] - b[1])[0][0];
                let crd = highestcard;
                // alert(highestcard)
                // alert(`cards: ${this.#model.getPlayerName('north')}: ${this.#model.getHand('north').getCards().length}, ${this.#model.getPlayerName('east')} : ${this.#model.getScore('east').getCards().length}, ${this.#model.getPlayerName('south')}: ${this.#model.getScore('south').getCards().length}, ${this.#model.getPlayerName('west')} : ${this.#model.getScore('west').getCards().length}\n`)

                this.#controller.playCard(this.#position, crd);
            } else {
                // This should never happen.
                console.log(`${this.#position} has no playable cards`);
            }
        }
    }
}