/*
function validateForm() {
  let x = document.forms["lesson9"]["fname"].value;
  //console.log(x);
  if (x == "") {
      alert("Enter name");
      return false;
  }
} 
validateForm()
*/
let form = document.getElementById('l9');

form.onsubmit = function(){
  let name = document.forms["l9"]["fname"].value;
  let lastname = document.forms["l9"]["lastname"].value;
  let age = document.forms["l9"]["age"].value;
  let message = document.forms["l9"]["message"].value;

  if((name == "") || (lastname == "") || (age == "") || (message == "" || message.length<=15)){
    if (name == "") {
      alert("Enter name");
      return false;
    }
    if (lastname == "") {
        alert("Enter lastname");
        return false;
    }
    if (age == "") {
        alert("Enter age");
        return false;
    }
    if (message == "" || message.length<=15) {
        alert("Enter message, length of message must be mare than 15 symbols");
        return false;
    }
  }
  else{
    alert("Спасибо "+name+" "+lastname+", Ваше сообщение принято!");
    console.log(JSON.stringify(name));
    console.log(JSON.stringify(lastname));
    console.log(JSON.stringify(age));
    console.log(JSON.stringify(message));
  }
}