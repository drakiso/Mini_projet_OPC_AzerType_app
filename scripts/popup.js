function display_popup () {
    let background_popup = document.querySelector(".popup_background")

    background_popup.classList.add("active")
}

function hide_popup () {
    let background_popup = document.querySelector(".popup_background")

    background_popup.classList.remove("active")
}

function popup_manager(){
    let btn_share = document.querySelector(".btn_share")
    let background_popup = document.querySelector(".popup_background")

    btn_share.addEventListener(
        "click",
        function() {
            display_popup()
        }
    )

    background_popup.addEventListener(
        "click",
        (event) => {
            if (event.target === background_popup) {
                hide_popup()
            }
        }
    )
}