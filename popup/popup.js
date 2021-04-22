let employee = {}
let my_form = document.getElementById("my_form");
let raido = document.getElementsByName("session");
let select_option = document.getElementById("maneger").value;

my_form.addEventListener('submit', (event) => {
    employee = {
            name: my_form[0].value,
            day_off: my_form[1].value,
            session: getRadioValue(),
            reason: my_form[6].value,
            maneger: select_option
        }
        // alert("name : " + employee.name + "\n" + "Day Off : " + employee.day_off + "\n" +
        //     "Session : " + employee.session + "\n" + "reason : " + employee.reason + "\n" +
        //     "maneger :" + employee.maneger);

});

getRadioValue = () => {
    let radio_checked;
    for (let i = 0; i < raido.length; i++) {
        if (raido[i].checked) {
            switch (i) {
                case 0:
                    radio_checked = "morning"
                    break;
                case 1:
                    radio_checked = "afternoon"
                    break;
                default:
                    radio_checked = "full day"
            }
            break;
        }
    }
    return radio_checked;
}