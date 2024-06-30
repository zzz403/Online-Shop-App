/*Wallet Page*/

//put all the things right in wallet page
function WalletBack(){
    hideElement("walletName");
    hideElement("walletOwner");
    hideElement("walletNum");
    hideElement("balanceLabel");
    hideElement("walletBalance");
    hideElement("walletChoose2");
    hideElement("walletChoose");
    
    hideElement("TDradio");
    hideElement("Masterradio");
    hideElement("VISAradio");
    hideElement("TDLabel");
    hideElement("MasterLabel");
    hideElement("VISALabel");
    hideElement("AdvantagesCC");
    hideElement("CCcheck");
    hideElement("policyCC");
    hideElement("creatCC");
    
    setImageURL("walletLeft",CardType[cardex[0]]);
    setImageURL("walletMain",CardType[cardex[1]]);
    setImageURL("walletRight",CardType[cardex[2]]);
    
    setPosition("walletRight",230,75,80,45);
    setPosition("CardCoverRight",230,75,80,45);
    setPosition("CardCoverMain",75,40,160,90);
    setPosition("walletMain",75,40,160,90);
    setPosition("CardCoverLeft",5,75,80,45);
    setPosition("walletLeft",5,75,80,45);
    
    setProperty("CardCoverRight","background-color", rgb(255, 255, 255, 0.5));
    setProperty("CardCoverLeft","background-color", rgb(255, 255, 255, 0.5));
    setProperty("CardCoverMain","background-color", rgb(255, 255, 255, 0));
    
    if(CardType[cardex[1]] != "creatCard.jpg"){
      walletCreated();
    }else{
      walletShouldCreat();
    }
  }
  
  //show the items if the user did't have a card
  function walletShouldCreat(){
    showElement("TDradio");
    showElement("Masterradio");
    showElement("VISAradio");
    showElement("TDLabel");
    showElement("MasterLabel");
    showElement("VISALabel");
    showElement("AdvantagesCC");
    showElement("CCcheck");
    showElement("policyCC");
    showElement("creatCC");
    
    setChecked("TDradio",false);
    setChecked("Masterradio",false);
    setChecked("VISAradio",false);
    setText("AdvantagesCC","Advantages:");
  }
  
  //events for choosing the card in creat
  onEvent("TDradio","click",function(){
    setImageURL("walletMain","TDCard.png");
    setText("AdvantagesCC","Advantages:\nStart a TD card and get an initial amount of    $5000");
  });
  onEvent("Masterradio","click",function(){
    setImageURL("walletMain","masterCard.jpg");
    setText("AdvantagesCC","Advantages:\nCreate a MASTER card and receive an initial $3,000 and a 15% reduction on every payment.");
  });
  onEvent("VISAradio","click",function(){
    setImageURL("walletMain","VISACard.jpg");
    setText("AdvantagesCC","Advantages:\nCreate a VISA card and receive an initial amount of $3000 and an additional 20% on each receipt.");
  });
  
  //creat a card
  onEvent("creatCC","click",function(){
    if(getChecked("Masterradio")|| getChecked("TDradio")|| getChecked("VISAradio")){
      if(getChecked("CCcheck")){
        var newB = 0;
        var newC = "";
        for(var j = 0; j < 16; j++){
          newC = newC + randomNumber(0,9);
        }
        var newT = "";
        if(getChecked("Masterradio")){
          newB = 3000;
          newT = "MasterCard1.jpg";
        }else if(getChecked("TDradio")){
          newB = 5000;
          newT = "TDCard.png";
        }else if(getChecked("VISAradio")){
          newB = 3000;
          newT = "VISACard.jpg";
        }
        
        for(var i = 0; i < 3; i ++){
          if(CardType[i] == "creatCard.jpg"){
            insertItem(Balance,i,newB);
            insertItem(Card,i,newC);
            insertItem(CardType,i,newT);
            break;
          }
        }
        
        createRecord("wallet", {UserName:UserName,Card:newC,balance:newB,Type:newT});
        WalletBack();
      }
    }
  });
  
  //creat a crad
  function walletCreated(){
    showElement("walletLeftBtm");
    showElement("walletRightBtm");
    showElement("walletName");
    showElement("walletOwner");
    showElement("walletNum");
    showElement("balanceLabel");
    showElement("walletBalance");
    
    switch(CardType[cardex[1]]){
      case "MasterCard1.jpg":
        setText("walletName","Master Card");
        break;
      case "VISACard.jpg":
        setText("walletName","VISA Card");
        break;
      case "TDCard.png":
        setText("walletName","TD Card");
        break;
      default:
        break;
    }
    
    setText("walletOwner","Owner: " + UserName);
    setText("walletNum","");
    for(var i = 1; i < 17; i++){
      setText("walletNum",getText("walletNum") + Card[cardex[1]][i-1]);
      if(i%4 == 0){
        setText("walletNum",getText("walletNum") + " ");
      }
    }
    setText("walletBalance","$ " + Balance[cardex[1]]);
    
    if(cardChoose == cardex[1]){
      hideElement("walletChoose");
      showElement("walletChoose2");
    }else{
      hideElement("walletChoose2");
      showElement("walletChoose");
    }
  }
  
  //btms for next and last page
  onEvent("walletLeftBtm","click",function(){
    if(cardChanging != true){
      walletLeftAnamation();
    }
  });
  
  onEvent("walletRightBtm","click",function(){
    if(cardChanging != true){
      walletRightAnamation();
    }
  });
  
  //if the left ot right key down 
  onEvent("WalletPage","keydown",function(event){
    if(event.key == "Left" && cardChanging != true){
      walletLeftAnamation();
    }
  });
  
  onEvent("WalletPage","keydown",function(event){
    if(event.key == "Right" && cardChanging != true){
      walletRightAnamation();
    }
  });
  
  //animation for wallet to left
  function walletLeftAnamation(){
    cardChanging = true;
    WalletBack();
    var time = 1;
    setTimeout(function() {
      timedLoop(75, function() {
        setStyle("walletMain", "z-index: 4");
        setStyle("CardCoverMain", "z-index: 5");
        setStyle("walletLeft", "z-index: 0");
        setStyle("CardCoverLeft", "z-index: 1");
        setStyle("walletRight", "z-index: 2");
        setStyle("CardCoverRight", "z-index: 3");
        
        setPosition("walletMain",75 - (time * 7),40 + (time * 3.5),
        160 - (time * 8),90 - (time * 4.5));
        setPosition("CardCoverMain",75 - (time * 7),40 + (time * 3.5),
        160 - (time * 8),90 - (time * 4.5));
        
        setPosition("walletRight",230 - (time * 15.5),75 - (time * 3.5),
        80 + (time * 8),45 + (time * 4.5));
        setPosition("CardCoverRight",230 - (time * 15.5),75 - (time * 3.5),
        80 + (time * 8),45 + (time * 4.5));
        
        setPosition("walletLeft",5 + (time * 25),75);
        setPosition("CardCoverLeft",5 + (time * 25),75);
        
        setProperty("CardCoverRight","background-color", rgb(255, 255, 255, 0.5-(time*0.05)));
        setProperty("CardCoverMain","background-color", rgb(255, 255, 255, 0+(time*0.05)));
        
        time ++ ;
         if(time >= 10 ){
           stopTimedLoop();
           var oldList = [];
           oldList[0] = cardex[0];
           oldList[1] = cardex[1];
           oldList[2] = cardex[2];
           
           cardex[0] = oldList[1];
           cardex[1] = oldList[2];
           cardex[2] = oldList[0];
           
           WalletBack();
           
           cardChanging = false;
         }
      });
    }, 100);
  }
  
  //animation for wallet to right
  function walletRightAnamation(){
    cardChanging = true;
    WalletBack();
    var time = 1;
    setTimeout(function() {
      timedLoop(75, function() {
        setStyle("walletMain", "z-index: 4");
        setStyle("CardCoverMain", "z-index: 5");
        setStyle("walletLeft", "z-index: 2");
        setStyle("CardCoverLeft", "z-index: 3");
        setStyle("walletRight", "z-index: 0");
        setStyle("CardCoverRight", "z-index: 1");
        
        setPosition("walletMain",75 + (time * 16),40 + (time * 3.5),
        160 - (time * 8),90 - (time * 4.5));
        setPosition("CardCoverMain",75 + (time * 16),40 + (time * 3.5),
        160 - (time * 8),90 - (time * 4.5));
        
        setPosition("walletLeft",5 + (time * 7),75 - (time * 3.5),
        80 + (time * 8),45 + (time * 4.5));
        setPosition("CardCoverLeft",5 + (time * 7),75 - (time * 3.5),
        80 + (time * 8),45 + (time * 4.5));
        
        
        setPosition("walletRight",230 - (time * 25),75);
        setPosition("CardCoverRight",230 - (time * 25),75);
        
        setProperty("CardCoverLeft","background-color", rgb(255, 255, 255, 0.5-(time*0.05)));
        setProperty("CardCoverMain","background-color", rgb(255, 255, 255, 0+(time*0.05)));
        
        time ++ ;
         if(time >= 10 ){
           stopTimedLoop();
           var oldList = [];
           oldList[0] = cardex[0];
           oldList[1] = cardex[1];
           oldList[2] = cardex[2];
           
           cardex[0] = oldList[2];
           cardex[1] = oldList[0];
           cardex[2] = oldList[1];
           
           WalletBack();
           
           cardChanging = false;
         }
      });
    }, 100);
  }
  
  //if click the right and left buttom 
  onEvent("CardCoverRight","click",function(){
    if(cardChanging != true){
      walletLeftAnamation();
    }
  });
  
  onEvent("CardCoverLeft","click",function(){
    if(cardChanging != true){
      walletRightAnamation();
    }
  });
  
  //choose a card to pay
  onEvent("walletChoose","click",function(){
    cardChoose = cardex[1];
    hideElement("walletChoose");
    showElement("walletChoose2");
  });
  
  //if the the enter btm click
  onEvent("WalletPage","keydown",function(event){
    if(event.key == "Enter"){
      cardChoose = cardex[1];
      hideElement("walletChoose");
      showElement("walletChoose2");
    }
  });
  