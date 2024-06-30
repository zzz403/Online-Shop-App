/* HOME PAGE */
function putItem(){
    setPosition("itemHome1",35,65);
    setPosition("itemHome3",35,245);
    setPosition("itemHome5",35,-115);
    setPosition("itemHome2",180,155);
    setPosition("itemHome4",180,335);
    setPosition("itemHome6",180,-25);
    for(var i = 1; i < 7; i ++){
      setPosition("itemPicHome" + i,getXPosition("itemHome" +i) + 15,getYPosition("itemHome" + i) +10);
      setPosition("itemNameHome" + i,getXPosition("itemHome" +i),getYPosition("itemHome" + i) +100);
      setPosition("itemPriceHome" + i,getXPosition("itemHome" +i),getYPosition("itemHome" + i) + 125);
      setPosition("itemBtm" + i,getXPosition("itemHome" +i),getYPosition("itemHome" + i));
      setPosition("itemSales" + i,getXPosition("itemHome" +i) + 15,getYPosition("itemHome" + i) + 130);
  
      // Increase font size for itemSales, itemNameHome, and itemPriceHome
      setProperty("itemSales" + i, "font-size", "20px");
      setProperty("itemNameHome" + i, "font-size", "20px");
      setProperty("itemPriceHome" + i, "font-size", "20px");
  
      if(i < 5){
        itemchoose[i] = i-1;
        setIdemsH(i,itemchoose[i]);
      }else if(i == 5){
        itemchoose[i] = searchItems.length - 2;
        setIdemsH(i,itemchoose[i]);
      }else if(i == 6){
        itemchoose[i] = searchItems.length - 1;
        setIdemsH(i,itemchoose[i]);
      }
    }
  }
  
  //if UP key down
  onEvent("HomePage","keydown",function(event){
    if(event.key == "Up"){
      homePageDown();
    }else if (event.key == "Down"){
      homePageUp();
    }
  });
  
  // Events for up and down in home page
  onEvent("HomeUp","mouseover",function(){
    homeUpDown = "Up";
  });
  onEvent("HomeUp","mouseout",function(){
    if(homeUpDown == "Up"){
      homeUpDown = "";
    }
  });
  onEvent("HomeDown","mouseover",function(){
    homeUpDown = "Down";
  });
  onEvent("HomeDown","mouseout",function(){
    if(homeUpDown == "Down"){
      homeUpDown = "";
    }
  });
  
  //time loop for chontrl up and down
  function homeUpDownF(){
    timedLoop(30, function() {
      if(homeUpDown == "Up"){
        homePageDown();
      }else if(homeUpDown == "Down"){
        homePageUp();
      }
    });
  }
  
  //function for homw page down
  function homePageDown(){
    for(var i = 1; i < 7; i++){
      if(getYPosition("itemHome" +i)>=425){
        setPosition("itemHome" + i,getXPosition("itemHome" +i),-120);
        upChange(i);
      }else{
        setPosition("itemHome" + i,getXPosition("itemHome" +i),getYPosition("itemHome" + i) + 10);
      }
      setPosition("itemPicHome" + i,getXPosition("itemHome" +i) + 15,getYPosition("itemHome" + i) +10);
      setPosition("itemNameHome" + i,getXPosition("itemHome" +i),getYPosition("itemHome" + i) +100);
      setPosition("itemPriceHome" + i,getXPosition("itemHome" +i),getYPosition("itemHome" + i) + 125);
      setPosition("itemBtm" + i,getXPosition("itemHome" +i),getYPosition("itemHome" + i));
      setPosition("itemSales" + i,getXPosition("itemHome" +i) + 15,getYPosition("itemHome" + i) + 130);
    }
  }
  
  //function for homw page up
  function homePageUp(){
    for(var i = 1; i < 7; i++){
      if(getYPosition("itemHome" +i)<= - 120){
        setPosition("itemHome" + i,getXPosition("itemHome" +i),425);
        downChange(i);
      }else{
        setPosition("itemHome" + i,getXPosition("itemHome" +i),getYPosition("itemHome" + i) - 10);
      }
      setPosition("itemPicHome" + i,getXPosition("itemHome" +i) + 15,getYPosition("itemHome" + i) +10);
      setPosition("itemNameHome" + i,getXPosition("itemHome" +i),getYPosition("itemHome" + i) +100);
      setPosition("itemPriceHome" + i,getXPosition("itemHome" +i),getYPosition("itemHome" + i) + 125);
      setPosition("itemBtm" + i,getXPosition("itemHome" +i),getYPosition("itemHome" + i));
      setPosition("itemSales" + i,getXPosition("itemHome" +i) +15,getYPosition("itemHome" + i) + 130);
    }
  }
  
  //set idems in the home 
  function setIdemsH(i,a){
    setText("itemNameHome" + i,item_name[searchItems[a]]);
    setImageURL("itemPicHome" + i,item_picture[searchItems[a]]);
    setText("itemPriceHome" + i,"$ " + item_price[searchItems[a]]);
    setText("itemSales" + i,"Sales:" + item_sals[searchItems[a]]);
  }
  
  //if the board at the top change to down pic change
  function downChange(i){
    itemchoose[i] = itemchoose[i] + 6;
    if(itemchoose[i] >= searchItems.length){
      itemchoose[i] = itemchoose[i] - searchItems.length;
    }
    setIdemsH(i,itemchoose[i]);
  }
  
  //if the board at the down change to up pic change
  function upChange(i){
    itemchoose[i] -=6;
    if(itemchoose[i] < 0){
      itemchoose[i] = searchItems.length + itemchoose[i];
    }
    setIdemsH(i,itemchoose[i]);
  }
  
  //when put in the search bar show the search icon
  onEvent("searchBarH","input",function(){
    if(getText("searchBarH") != "" && search == false){
      search = true;
      setPosition("searchBarH",getXPosition("searchBarH"),getYPosition("searchBarH"),253);
      showElement("searchIconH");
    }else if(getText("searchBarH") == ""){
      setPosition("searchBarH",getXPosition("searchBarH"),getYPosition("searchBarH"),280);
      search = false;
      hideElement("searchIconH");
    }
  });
  
  //two ways searching
  onEvent("searchIconH","click",function(){
    searching();
  });
  onEvent("HomePage","keydown",function(event){
    if(event.key == "Enter" && getText("searchBarH") != ""){
      searching();
    }
  });
  
  //start searching
  function searching(){
    setPosition("searchBarH",getXPosition("searchBarH"),getYPosition("searchBarH"),280);
    search = false;
    hideElement("searchIconH");
      
    changeItems();
  }
  
  //searching anamation 
  function changeItems(){
    var time = 1000;
    var searching = getText("searchBarH").toLowerCase();
    timedLoop(1, function() {
      time --;
      homePageUp();
      for(var i = 1; i < 7; i++){
        var itemName = item_name[itemchoose[i]].toLowerCase();
        if(itemName.indexOf(searching) != -1){
          if(getYPosition("itemPicHome"+i) < 95){
            stopTimedLoop();
            homeUpDownF();
          }
        }
      }
      if(time < 0){
        stopTimedLoop();
        homeUpDownF();
        showElement("HomeSorry");
        setTimeout(function() {
          hideElement("HomeSorry");
        }, 2000);
      }
    });
  }
  
  /* CHANGE TO INFORMATION */
  
  //Event in the home page to information page
  onEvent("itemBtm1","click",function(){
    itemToInfor(1,itemchoose[searchItems[1]]);
  });
  
  onEvent("itemBtm2","click",function(){
    itemToInfor(2,itemchoose[searchItems[2]]);
  });
  
  onEvent("itemBtm3","click",function(){
    itemToInfor(3,itemchoose[searchItems[3]]);
  });
  
  onEvent("itemBtm4","click",function(){
    itemToInfor(4,itemchoose[searchItems[4]]);
  });
  
  onEvent("itemBtm5","click",function(){
    itemToInfor(5,itemchoose[searchItems[5]]);
  });
  
  onEvent("itemBtm6","click",function(){
    itemToInfor(6,itemchoose[searchItems[6]]);
  });
  
  //set Inforrmation Page informations
  function setInfor(b,a){
    
    infordex = a;
    showElement("informationBtm1");
    showElement("informationBtm2");
    hideElement("informationSorry");
    setImageURL("informationPic",item_picture[infordex]);
    setText("informationName",item_name[infordex]);
    setText("informationIntro","introduction : \n           " + item_infor[infordex]);
    setText("informationPrice","$ " + item_price[infordex]);
    setText("informationStock","stock:" + item_stock[infordex]);
    hideElement("informationdec");
    if(1 > item_stock[infordex]){
        setNumber("informationNum",0);
      hideElement("informationAdd");
    }else{
      if(1 < item_stock[infordex]){
        showElement("informationAdd");
      }else{
        hideElement("informationAdd");
      }
      setNumber("informationNum",1);
    }
    setText("informationPoster","From: " + item_poster[infordex]);
    setProperty("itemBtm"+b,"background-color", rgb(255, 255, 255, 0));
    setScreen("InformationPage");
    
    var touming = 0.7;
    setPosition("informationName", getXPosition("informationName"),getYPosition("informationName")+35);
    setPosition("informationPoster", getXPosition("informationPoster"),getYPosition("informationPoster")+35);
    setPosition("informationIntro", getXPosition("informationIntro"),getYPosition("informationIntro")+35);
    
    timedLoop(20, function() {
      setProperty("informationBtm1","background-color", rgb(255, 255, 255, touming));
      setProperty("informationBtm2","background-color", rgb(255, 255, 255, touming));
      touming = touming-0.02;
      
      setPosition("informationName", getXPosition("informationName"),getYPosition("informationName")-1);
      setPosition("informationPoster", getXPosition("informationPoster"),getYPosition("informationPoster")-1);
      setPosition("informationIntro", getXPosition("informationIntro"),getYPosition("informationIntro")-1);
      
      if(touming <= 0){
        hideElement("informationBtm1");
        hideElement("informationBtm2");
        stopTimedLoop();
        homeUpDownF();
      }
    });
  }
  
  //anamation for get in to the information page
  function itemToInfor(a,c){
    var b = 0;
    timedLoop(20, function() {
      setProperty("itemBtm"+a,"background-color", rgb(255, 255, 255, b));
      b = b+0.1;
      if(b > 0.7){
        stopTimedLoop();
        homeUpDownF();
        setInfor(a,c);
      }
    });
  }
  
  //animation for leave the information page to the home page
  onEvent("informationLeave","click",function(){
    timeLoopDebug();
    setPosition("informationName", getXPosition("informationName"),160);
    setPosition("informationPoster", getXPosition("informationPoster"),190);
    setPosition("informationIntro", getXPosition("informationIntro"),215);
    setScreen("HomePage");
    homeUpDownF();
  });
  
  //animation for leave the information page to the home page
  function inforToHomeAnimation(){
    setImageURL("inforToHomePic",item_picture[infordex]);
    setPosition("inforToHomePic",115,25,110,110);
    showElement("inforToHomePic");
    var time = 1;
    setTimeout(function() {
      timedLoop(50, function() {
        setPosition("inforToHomePic",115 + (time * 8),25 + (time * 34),
        110 - (time * 5),110 - (time * 5));
        time ++ ;
         if(time >= 12 ){
           timeLoopDebug();
           homeUpDownF();
         }
      });
    }, 150);
  }
  
  //information page cart number plus and dec
  onEvent("informationdec","click",function(){
    calSingle(-1);
  });
  
  onEvent("informationAdd","click",function(){
    calSingle(1);
  });
  
  //calculate the price for a single item in the information page
  function calSingle(a){
    var num = getNumber("informationNum") + a;
    setNumber("informationNum",num);
    if(num <= 1){
      hideElement("informationdec");
    }else{
      showElement("informationdec");
    }
    if(num >= item_stock[infordex]){
      hideElement("informationAdd");
    }else{
      showElement("informationAdd");
    }
    num = num * item_price[infordex];
    setText("informationPrice","$ " + num);
  }
  
  //when click the buy btm in the inforpage take the item to the cart
  onEvent("informationBuy","click",function(){
    if(item_stock[infordex] >= 1){
      addToCart(infordex,getNumber("informationNum"));
      inforToHomeAnimation();
      setScreen("HomePage");
    }else{
      showElement("informationSorry");
      setTimeout(function() {
        hideElement("informationSorry");
      }, 3000);
    }
  });
  
  //contact with the poster
  onEvent("informationContact","click",function(){
    var string = "Hi, I have a little problem with 【" + item_name[infordex] + "】";
    sendMessage(item_poster[infordex],string);
  });
  
  //function for add things to the shooping cart
  function addToCart (a,b){
    var inCart = false;
    for(var i = 0; i< cartIdemName.length; i++){
      if(cartIdemName[i] == a){
        inCart = true;
        if(cartIdemNum[i] + b >= item_stock[infordex]){
          cartIdemNum[i] = item_stock[infordex];
        }else{
          cartIdemNum[i] += b;
        }
        break;
      }
    }
    if(inCart == false){
      appendItem(cartIdemName,infordex);
      appendItem(cartIdemNum,b);
    }
    changeCartNum();
  }
  