const mailError = document.querySelectorAll(".mailError")

main()
function main(){
  const mailInput = document.getElementById("exampleFormControlInput1")
  mailInput.value = 1;
  const confirmMail = document.getElementById("confirm_email")
  
  console.log(mailError)
  if(mailInput.value != confirmMail.value){ mailError.forEach( element => element.classList.add("visible")) }
}

const removeError = () => mailError.forEach( element => element.classList.remove("visible"));
