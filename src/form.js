
main()

function main(){
  const btn = document.getElementById("contactSubmit")
  btn.addEventListener("click", e => validateForm(e))
}

function validateForm(e){
  const mailInput = document.getElementById("exampleFormControlInput1")
  const confirmMail = document.getElementById("confirm_email")
  const dates = document.querySelectorAll(".date")
  const nameInput = document.getElementById("name")
  const pn = document.getElementById("pn")
  const desc = document.getElementById("exampleFormControlTextarea1")


  const modalTitles = document.querySelectorAll(".modalTitles")
  const modal = new bootstrap.Modal(document.getElementById('modal'))

  e.preventDefault()
  if(!validateName(nameInput)) return ;
  if(!checkDate(dates)) return;
  if(!validatePn(pn)) return;
  if(!checkEmails(mailInput,confirmMail)) return;
  if(!validateDesc(desc)) return;

  
  console.log(modalTitles)
  modalTitles[0].innerHTML = `${modalTitles[0].innerHTML} ${nameInput.value}`
  modalTitles[1].innerHTML = `${modalTitles[1].innerHTML} ${mailInput.value}`
  modalTitles[2].innerHTML = `${modalTitles[2].innerHTML} ${pn.value}`
  modalTitles[3].innerHTML = `${modalTitles[3].innerHTML} ${dates[0].value.split("-").reverse().join("/")} - ${dates[1].value.split("-").reverse().join("/")}`
  modalTitles[4].innerHTML = `${modalTitles[4].innerHTML} ${desc.value}`


  modal.show();
  

}

function clearForm(){
  
}

function checkDate(dates){
  const dateErr = document.getElementById("dateErr")
  
  if(!dateErr.classList.contains("hide")) return false;

  if(dates[0].value.length != 0 && dates[1].value.length != 0){
    const start_date = new Date(dates[0].value).getTime(),
	  end_date = new Date(dates[1].value).getTime();
    if(start_date < end_date){
      let tmoDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime();
      if(start_date >= tmoDate) return true;
    }
  }

  dateErr.classList.remove("hide");
  const removeError = () => {
    dateErr.classList.add("hide");
    dates.forEach( date => date.removeEventListener("change",removeError));
  }
  
  dates.forEach( date => date.addEventListener("change", removeError));
  return false;
}

function checkEmails(mailInput,confirmMail){
  const mailError = document.querySelectorAll(".mailError")

  if(!mailError[0].classList.contains("hide")) return false;

  //remove err msg
  const removeError = () => {
    mailError.forEach( element => element.classList.add("hide"))
    mailInput.removeEventListener("keypress", mailInputOnChange)
    confirmMail.removeEventListener("keypress", mailInputOnChange)
  };

  
  if(mailInput.value != confirmMail.value || mailInput.value.length === 0 || !mailInput.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
    mailError.forEach( element => element.classList.remove("hide"));
    mailInput.addEventListener("keypress", removeError)
    confirmMail.addEventListener("keypress", removeError)
    return false
  }
  return true;
}


function validateName(nameInput){
  const nameInputError = document.getElementById("nameError")

  if(!nameInputError.classList.contains("hide")) return false;
  if(nameInput.value.match(/^(?=.*[A-Za-z])[A-Za-z'-]+(?: [A-Za-z'-]+)?$/)) return true;
  nameInputError.classList.remove("hide")
  const removeError = () => {
    console.log(nameInput.classList)
    nameInputError.classList.add("hide")
    nameInput.removeEventListener("keypress",removeError);
  }

  nameInput.addEventListener("keypress", removeError)
}

function validateDesc(desc){
  const descErr = document.getElementById("descErr")

  if(!descErr.classList.contains("hide")) return false;
  if(desc.value.length != 0) return true;
  descErr.classList.remove("hide")
  const removeError = () => {
    descErr.classList.add("hide")
    desc.removeEventListener("keypress",removeError);
  }

  desc.addEventListener("keypress", removeError)
}

function validatePn(pn){
  const pnError = document.getElementById("pnErr")

   if(!pnError.classList.contains("hide")) return false;
 
  if(pn.value.length !== 0 && pn.value.match(/^(?:(?:\+|00)44|0)7(?:[1345789]\d{2}|624)\s*\d{3}\s*\d{3}$/)) return true;
  pnError.classList.remove("hide")
  const removeError = () => {
    pnError.classList.add("hide")
    pn.removeEventListener("keypress",removeError);
  }
  
  pn.addEventListener("keypress", removeError) 
}

