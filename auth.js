/* LOGIN PAGE*/
//hide pass word
onEvent("passwordInput", "input", function(){
    var newInput = getText("passwordInput");
    var comfirmPasswordHidden = "";
    if (newInput.length < Password.length){
      setText("passwordInput", "");
      Password = "";
    } else {
      Password = Password + newInput[newInput.length -1];
      for (var i = 0; i < newInput.length; i++){
        comfirmPasswordHidden =  comfirmPasswordHidden + "*";
      }
    setText("passwordInput",comfirmPasswordHidden);
    }
  });
  
  //check is user name and password rigth and login
  onEvent("loginBtm", "click", function(){ 
    login();
  });
  
  //check is log in password and usernames is right or not
  function login(){
    UserName = getText("usernameInput");
    readRecords("password", {}, function(records) {
      for (var i =0; i < records.length; i++) {
        if (UserName == records[i].UserName && Password == records[i].PassWord){  //If username right
        loginSuccessful(true);
        break;
        }
        if(i == records.length - 1){
          loginSuccessful(false);
        }
      }
    });
  }
  
  //function after check is log in right or not
  function loginSuccessful(a){
    if (a == true){  //done
      getIn();
      homeUpDownF();
      for(var i = 0; i< 3;i++){
        appendItem(Balance,0);
        appendItem(Card,"1234567890123456");
        appendItem(CardType,"creatCard.jpg");
      }
      readRecords("wallet", {}, function(records) {
        var j =0;
        for (var i =records.length -1; i > -1; i--) {
           if (UserName == records[i].UserName){  //If username right
            insertItem(Balance,j,records[i].balance);
            insertItem(Card,j,records[i].Card);
            insertItem(CardType,j,records[i].Type);
            j++;
            if(j>=3){
              break;
            }
          }
        }
      });
      
      setScreen("HomePage");
      putItem();
    }else if(a == false){ //not right
      prompt("Wrong user name or password.");
    }
  }
  
  //when "enter" down
  onEvent("LogInPage","keydown",function(event){
    if(event.key == "Enter"){
      login();
    }
  });
  
  
  /*Sign up Page*/
  onEvent("signUpBtm","click",function(){
    setScreen("SignUpPage");
  });
  
  //hide password
  onEvent("registrationPasswordInPut", "input", function(){
    var newInput = getText("registrationPasswordInPut");
    var passwordHidden = "";
    if (newInput.length < registerPassword.length){
      setText("registrationPasswordInPut", "");
      registerPassword = "";
    } else {
      registerPassword = registerPassword + newInput[newInput.length -1];
      for (var i = 0; i < newInput.length; i++){
        passwordHidden = passwordHidden + "*";
      }
    setText("registrationPasswordInPut",passwordHidden);
    }
  });
  
  //hide comfirm pass world
  onEvent("registrationComfirmPasswordInPut", "input", function(){
    var newInput = getText("registrationComfirmPasswordInPut");
    var comfirmPasswordHidden = "";
    if (newInput.length < Comfirmpassword.length){
      setText("registrationComfirmPasswordInPut", "");
      Comfirmpassword = "";
    } else {
      Comfirmpassword = Comfirmpassword + newInput[newInput.length -1];
      for (var i = 0; i < newInput.length; i++){
        comfirmPasswordHidden = comfirmPasswordHidden +  "*";
      }
    setText("registrationComfirmPasswordInPut",comfirmPasswordHidden);
    }
  });
  
  //check register is right or not
  onEvent("registrationRegister", "click", function(){
    UserName = getText("registrationUserName");
    var userExists = true;
    readRecords("password", {}, function(records) {
      for (var i = 0; i < records.length; i++){
        if (records[i].UserName == UserName){
          userExists = false;
          prompt("User already exists");
        }
      }
      signIn(userExists);
    });
  });
  
  //sign in function
  function signIn(a){
    if(a){
      if (Comfirmpassword != registerPassword){  
        prompt("Password and ConfirmPassword are not the same.");
      }else if(UserName == ""){
        prompt("Please write your name");
      }else { 
        var getNewUser = {
          UserName: UserName,
          PassWord: registerPassword
        };
        createRecord("password", getNewUser, function(record){
          console.log("User: " + record.userName + " Success created!");
        });
        for(var i = 0; i< 3;i++){
          appendItem(Balance,0);
          appendItem(Card,"1234567890123456");
          appendItem(CardType,"creatCard.jpg");
        }
        
        getIn();
        setScreen("HomePage");
        putItem();
        homeUpDownF();
      }
    }
  }
  