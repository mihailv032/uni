
main()

function main(){
  const mailInput = document.getElementById("exampleFormControlInput1")

  const btn = document.getElementById("contactSubmit")
  btn.addEventListener("click", e => validateForm(e,mailInput))
}

function validateForm(e,mailInput){
  e.preventDefault()
  validateName()
  checkEmails(mailInput)
  validateDesc()
}

function clearForm(){
  
}

function checkDate(){
  const dates = document.querySelectorAll("date")
  const dateErr = document.getElementById("dateErr")
  
  for(let i=0;i<dates.length;i++){
    if(dates[i].value.length == 0){};
  }
  dateErr.classList.remove("hide");
  const removeError = () => {
    descErr.classList.add("hide");
    dates.forEach( date => date.removeEventListener("keypress",removeError));
  }
  
  dates.forEach( date => date.addEventListener("keypress", removeError));
}

function checkEmails(mailInput){

const mailError = document.querySelectorAll(".mailError")
  const confirmMail = document.getElementById("confirm_email")

  if(mailError[0].classList.contains("visible")) return false;

  //remove err msg
  const removeError = () => {
    mailError.forEach( element => element.classList.remove("visible"))
    mailInput.removeEventListener("keypress", mailInputOnChange)
    confirmMail.removeEventListener("keypress", mailInputOnChange)
  };

  
  if(mailInput.value != confirmMail.value || mailInput.value.length === 0 || !mailInput.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
    mailError.forEach( element => element.classList.add("visible"));
    mailInput.addEventListener("keypress", removeError)
    confirmMail.addEventListener("keypress", removeError)
    return false
  }
  return true;
}


function validateName(){
  const nameInput = document.getElementById("name")
  const nameInputError = document.getElementById("nameError")
  
  if(nameInput.value.match(/^(?=.*[A-Za-z])[A-Za-z'-]+(?: [A-Za-z'-]+)?$/)) return true;
  nameInputError.classList.remove("hide")
  const removeError = () => {
    console.log(nameInput.classList)
    nameInputError.classList.add("hide")
    nameInput.removeEventListener("keypress",removeError);
  }

  nameInput.addEventListener("keypress", removeError)
}

function validateDesc(){
  const desc = document.getElementById("exampleFormControlTextarea1")
  const descErr = document.getElementById("descErr")
  
  if(desc.value.length != 0) return true;
  descErr.classList.remove("hide")
  const removeError = () => {
    descErr.classList.add("hide")
    desc.removeEventListener("keypress",removeError);
  }

  desc.addEventListener("keypress", removeError)
}
