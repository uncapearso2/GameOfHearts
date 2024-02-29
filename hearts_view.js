export class HeartsView {

    #model
    #controller

    constructor(model, controller) {
        this.#model = model;
        this.#controller = controller;
    }


    render(render_div) {
        var player_name = ""; //initialize variable for player name
        var robots_names = ["Robot 1", "Robot 2", "Robot 3"]; //initialize list of robot names
       // let choosingNames = false;
        let welcome_div = document.createElement('div'); //create div for program
        welcome_div.setAttribute("id","welcome")

        let welcome_message = document.createElement('p'); //create p for welcome message
        let nodeText = document.createTextNode("Welcome to Hearts! Please enter your name:");
        welcome_message.appendChild(nodeText);
        let enter_name = document.createElement('form');
        enter_name.setAttribute("id", "name_form")
       // enter_name.setAttribute("method", "post");
       // enter_name.setAttribute("action", "submit.php"); //unsure about
        let name = document.createElement('input');
        name.setAttribute("type", "text");
        name.setAttribute("name","PlayerName");
        name.setAttribute("placeholder", "Name");
        name.setAttribute("id", "name_field")

        let select_robot_names = document.createElement('input');
        select_robot_names.setAttribute("type", "radio");
        select_robot_names.setAttribute("id", "name_robots");
        select_robot_names.setAttribute("name", "robot_name");
        select_robot_names.setAttribute("value", "Choose Robot Names");
        let choose_label = document.createElement('label');
        choose_label.setAttribute("for", "name_robots");
        choose_label.innerHTML= "Choose Robot Names";


        let default_robot_names = document.createElement('input');
        default_robot_names.setAttribute("type", "radio");
        default_robot_names.setAttribute("id", "default_robots");
        default_robot_names.setAttribute("name", "robot_name");
        default_robot_names.setAttribute("value", "Default Robot Names");
        
        let default_label = document.createElement('label');
        default_label.setAttribute("for", "default_robots");
        default_label.innerHTML= "Default Robot Names";
        

        let submit = document.createElement("input");
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
        submit.addEventListener("click", () => {
            player_name = (document.getElementById("name_field").value).toString(); //get player response and make it a string
            player_name = player_name.trim(); //get rid of any whitespaces/prevent players from being named " "
            if(player_name.length < 1) {
                alert("Please enter your name to continue.");
            } else {
                alert(`Your name has been set to ${player_name}`);
                welcome_div.removeChild(welcome_message); 
                welcome_div.removeChild(enter_name); 



                // var choosingNames = document.getElementById('name_robots').checked;
              
                // if(document.getElementById('name_robots').checked) { //player wants to choose names
                //     choosingNames = true;

                // }// else {//whether you select default or nothing, you get default
                //     welcome_div.removeChild(welcome_message); 
                // }
                    
               
                //since name is set, don't need the name form
            }
        } ); //submit button response
        

        

            //tried robot naming functionality below
        // if(document.getElementById('name_robots').checked){
        //     welcome_div.removeChild(welcome_message); 
        //         welcome_div.removeChild(enter_name); 
        //     alert("huh");
        //     alert("chose checked");
        //             welcome_div.removeChild(welcome_message);
        //             welcome_div.removeChild(enter_name); //remove current form
                    
        //             welcome_message.removeChild(nodeText);
        //             let robot_prompt = document.createTextNode("Please name your robots below:")
        //             welcome_message.appendChild(robot_prompt);
        //             welcome_div.appendChild(welcome_message);
                    
        //              let robot_names = document.createElement('form');
        //              enter_name.setAttribute("id", "robot_name_form")
        //              let robot1 = document.createElement('input');
        //              robot1.setAttribute("type", "text");
        //              robot1.setAttribute("name","robot1");
        //              robot1.setAttribute("placeholder", "Robot 1");
        //              robot1.setAttribute("id", "robot1");
        //              let robot2 = document.createElement('input');
        //              robot2.setAttribute("type", "text");
        //              robot2.setAttribute("name","robot2");
        //              robot2.setAttribute("placeholder", "Robot 2");
        //              robot2.setAttribute("id", "robot2");
        //              let robot3 = document.createElement('input');
        //              robot3.setAttribute("type", "text");
        //              robot3.setAttribute("name","robot3");
        //              robot3.setAttribute("placeholder", "Robot 3");
        //              robot3.setAttribute("id", "robot3");


        //             let submit = document.createElement("input");
        //             submit.setAttribute("type", "submit");
        //             submit.setAttribute("value", "Submit");
        //             submit.setAttribute("id", "submit_button");
                    
        //             robot_names.appendChild(robot1); //add robot1 piece to form
        //             robot_names.appendChild(document.createElement('br'));
        //             robot_names.appendChild(robot2);
        //             robot_names.appendChild(document.createElement('br'));
        //             robot_names.appendChild(robot3);
        //             robot_names.appendChild(document.createElement('br'));
        //             robot_names.appendChild(submit); //add submit button to form
            
        //             welcome_div.appendChild(robot_names);
                    


        // } else {
        //     welcome_div.removeChild(welcome_message); 
        //         welcome_div.removeChild(enter_name); 
        // }
        

    }
    
    

    
}