/* Function responsible for displaying words or phrases to enter by the user.*/
function show_proposition(proposition) {
    let zone_proposition = document.querySelector(".proposition-zone")
    zone_proposition.textContent = proposition
}

/* Function responsible for displaying the user's score.*/
function show_result(result, elements_number) {
    let score = document.querySelector(".score span")
    let msg = `${result} / ${elements_number}`

    score.textContent = msg
}

/* Function responsible for sending mail*/
function send_mail(name, mail, score) {
    let mailto = `mailto:${mail}?subject=Partage du score Azertype&body=Salut,
    je suis ${name} et je viens de réaliser le score ${score}
    sur le site d'Azertype !` // Creation du'une chaine mailto pour creer un lien vers un mail
    
    location.href = mailto // Demander a notre page de suivre ce lien.
}

/* Function responsible for testing the validity of name*/
function test_name_validity(name) {
    if (name.length < 2) {
        throw new Error("Le nom et/ou le mail est incorrecte")
    }
}

/* Function responsible for testing the validity of mail*/
function test_mail_validity(mail) {
    let regex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z._-]+\\.[a-zA-Z._-]+")

    if (!regex.test(mail)) {
        throw new Error("Le nom et/ou le mail est incorrecte")
    }
}

/* Function responsible for managing the share formular
Test the validity of mail and name and throw error if there are not correct*/
function formular_manager(score) {
    try {
        let balise_name = document.getElementById("name")
        let name = balise_name.value
        test_name_validity(name)
    
        let balise_mail = document.getElementById("mail")
        let mail = balise_mail.value
        test_mail_validity(mail)

        display_error_message("")

        send_mail(name, mail, score)
    } catch(error_message) {
        display_error_message(error_message)
    }
}

/* Function that show the error message*/
function display_error_message(message) {
    let span_error_message = document.getElementById("error_message")

    if (!span_error_message) {
        let popup_window = document.querySelector(".popup")
        span_error_message = document.createElement("span")
        span_error_message.id = "error_message"
        popup_window.appendChild(span_error_message)
    }

    span_error_message.textContent = message
}

/* Function responsible for running de game.
   Controle the different action (click on button for exemple) the user do
   and active the necessary mechanism
   */
function run_game_loop() {
    /* Show a popup when the user click on "Partager"
    It's only possible to click on "Partager when the exercice if finished"
    */
    popup_manager()

    // Desactivate the button "Partager"
    let btn_share = document.querySelector(".btn_share")
    btn_share.disabled = true

    // Initialize i(the element counter), result(user's score) and proposition(words or phrases to tape)
    let i = 0
    let result = 0
    proposition = words_list

    show_proposition(proposition[i])

    /* Action to do when the user click on valider
        check if the input of the user is equal to the word or phrases the program
        proposed, if yes, add 1 to result, 
        increment i and so on... */
    let type_by_user = document.querySelector('input[type="text"]')
    let validation_button = document.querySelector('.btn_validate')

    validation_button.addEventListener(
        "click",
        () => {
            if (type_by_user.value === proposition[i]) {
                result ++
            }

            i++
            show_result(result, i)
            type_by_user.value = ""

            if (proposition[i] === undefined) {
                show_proposition("Le jeu est terminé")
                validation_button.disabled = true
                list_btn_radio[0].disabled = true
                list_btn_radio[1].disabled = true
                btn_share.disabled = false
            } else {
                show_proposition(proposition[i])
            }
        }
    )

    /* Action to do when the user select option
    Initialize the proposition according to the choosed option
    */
    let list_btn_radio = document.querySelectorAll('input[type="radio"]')

    for (let index=0; index<list_btn_radio.length; index++){
        list_btn_radio[index].addEventListener(
            "change",
            (event) => {
                if (event.target.value === "mots") {
                    proposition = words_list
                } else{
                    proposition = phrases_list
                }

                show_proposition(proposition[i])
            }
        )
    }

    // Action when the user try to send the formular
    let form = document.querySelector(".popup_background form")
    form.addEventListener(
        "submit", 
        (event) => {
            event.preventDefault()
            let score = `${result} / ${i}`

            formular_manager(score)
        }
    )

    // Restart the game if the user click on "Reprendre"
    let btn_restart = document.querySelector(".btn_restart")

    btn_restart.addEventListener(
        "click", 
        () => {
            location.reload(true)
        }
    )
}