/* CART PAGE */

//function for first time get in to the cart page and set the positions
function changeToCart(){
    chrtBack();
    
    totalPrice = 0;
    for(var i = 0; i < cartIdemName.length;i++){
      totalPrice = totalPrice + (item_price[cartIdemName[i]]* cartIdemNum[i]);
    }
  
    if(totalPrice > 0){
      setProperty("CheckOut","background-color", rgb(89, 142, 179, 0.83));
    }else{
      setProperty("CheckOut","background-color", rgb(234,87,13,0.83));
    }
    
    setNumber("cartpageNum",cartPageNum);
    
    setText("cartTotalPrice","$ " + totalPrice);
    
    if(cartPageNum > 1){
      showElement("CartLeft");
    }else{
      hideElement("CartLeft");
    }
    
    if(cartPageNum*4 < cartIdemNum.length){
      showElement("CartRight");
    }else{
      hideElement("CartRight");
    }
    for(i = 1; i < 5; i++){
      hideElement("cartItemPic"+i);
      hideElement("cartItemName"+i);
      hideElement("cartItemNum"+i);
      hideElement("cartItemPrice"+i);
      hideElement("cartItemCancle"+i);
    }
    
    for(i = 1; (cartIdemName.length >= (cartPageNum-1) * 4 + i) && (i <= 4); i++){
      showElement("cartItemPic"+i);
      showElement("cartItemName"+i);
      showElement("cartItemNum"+i);
      showElement("cartItemPrice"+i);
      showElement("cartItemCancle"+i);
      
      var number = (cartPageNum-1) * 4 + i - 1;
      setImageURL("cartItemPic" + i, item_picture[cartIdemName[number]]);
      setText("cartItemName"+i,item_name[cartIdemName[number]]);
      setNumber("cartItemNum"+i,cartIdemNum[number]);
      setText("cartItemPrice"+i,"$" + cartIdemNum[number] * item_price[cartIdemName[number]]);
    }
  }
  
  //cancle btms to the funcion
  onEvent("cartItemCancle1","click",function(){
    cancleItem(1);
  });
  
  onEvent("cartItemCancle2","click",function(){
    cancleItem(2);
  });
  
  onEvent("cartItemCancle3","click",function(){
    cancleItem(3);
  });
  
  onEvent("cartItemCancle4","click",function(){
    cancleItem(4);
  });
  
  //cancle a item from the cart
  function cancleItem(a){
    if(cartChanging){
      removeItem(cartIdemName, 4 * (cartPageNum - 1) + a - 1);
      removeItem(cartIdemNum, 4 * (cartPageNum - 1) + a - 1);
      cartChanging = false;
      var b = false;
      if((cartIdemName.length < (cartPageNum-1) * 4 + 1) && cartPageNum > 1){
        cartPageNum --;
        b = true;
      }
      cancleAnamation(a,b);
    }
  }
  
  //animation for cancle a item
  function cancleAnamation (i,b){
    var time = 0;
    var speed = 30;
    timedLoop(50, function() {
      setPosition("cartItemPic" + i,getXPosition("cartItemPic" + i) - speed,getYPosition("cartItemPic" + i));
      setPosition("cartItemName" + i,getXPosition("cartItemName" + i)- speed,getYPosition("cartItemName" + i));
      setPosition("cartItemNum" + i,getXPosition("cartItemNum" + i)- speed,getYPosition("cartItemNum" + i));
      setPosition("cartItemPrice" + i,getXPosition("cartItemPrice" + i)- speed,getYPosition("cartItemPrice" + i));
      setPosition("cartItemCancle" + i,getXPosition("cartItemCancle" + i)- speed,getYPosition("cartItemCancle" + i));
      time ++;
      if(time >= 15){
        stopTimedLoop();
        
        cartChanging = true;
        if(b){
          cartIn('-');
        }else{
          changeToCart();  
        } 
        changeCartNum();
      }
    });
  }
  
  //clear  the cart
  onEvent("cartClear","click",function(){
    if(cartChanging){
      cartChanging = false;
      cartIdemNum = [];
      cartIdemName = [];
      cartPageNum = 1;
      for(var i = 1; i < 5; i++){
        cartLeaveAnimation(i,'+',false);
      }
    }
  });
  
  //move next page in shooping cart
  onEvent("CartRight","click",function(){
    if(cartChanging){
      cartChanging = false;
      cartPageNum ++;
      for(var i = 1; i < 5; i++){
        cartLeaveAnimation(i,'+',true);
      }
    }
    
  });
  
  //move last page in shooping cart
  onEvent("CartLeft","click",function(){
    if(cartChanging){
      cartChanging = false;
      cartPageNum --;
      for(var i = 1; i < 5; i++){
        cartLeaveAnimation(i,'-',true);
      }
    }
  });
  
  //anamation for a item to the left animation
  function cartLeaveAnimation(i,a) {
    var speed = 30;
    if(a == '-'){
      speed = -30;
    }
  
    setTimeout(function() {
      
      if(i < 4){
        timedLoop(50, function() {
          setPosition("cartItemPic" + i,getXPosition("cartItemPic" + i) - speed,getYPosition("cartItemPic" + i));
          setPosition("cartItemName" + i,getXPosition("cartItemName" + i)- speed,getYPosition("cartItemName" + i));
          setPosition("cartItemNum" + i,getXPosition("cartItemNum" + i)- speed,getYPosition("cartItemNum" + i));
          setPosition("cartItemPrice" + i,getXPosition("cartItemPrice" + i)- speed,getYPosition("cartItemPrice" + i));
          setPosition("cartItemCancle" + i,getXPosition("cartItemCancle" + i)- speed,getYPosition("cartItemCancle" + i));
        });
      }else{
        var time = 0;
        timedLoop(50, function() {
          setPosition("cartItemPic" + i,getXPosition("cartItemPic" + i) - speed,getYPosition("cartItemPic" + i));
          setPosition("cartItemName" + i,getXPosition("cartItemName" + i)- speed,getYPosition("cartItemName" + i));
          setPosition("cartItemNum" + i,getXPosition("cartItemNum" + i)- speed,getYPosition("cartItemNum" + i));
          setPosition("cartItemPrice" + i,getXPosition("cartItemPrice" + i)- speed,getYPosition("cartItemPrice" + i));
          setPosition("cartItemCancle" + i,getXPosition("cartItemCancle" + i)- speed,getYPosition("cartItemCancle" + i));
          time ++;
          if(time >= 14){
            if(change){
              stopTimedLoop();
              cartIn(a);
            }else{
              changeCartNum();
              cartChanging = true;
              stopTimedLoop();
            }
          }
        });
      }
    }, 150*i);
  }
  
  //continue the anamation up there
  function cartIn(a){
     changeToCart();
    if(a == '+'){
      for(var i = 1; i < 5; i++){
        setPosition("cartItemPic" + i,345,65 + 50 * (i-1));
        setPosition("cartItemName" + i,380,75 + 50 * (i-1));
        setPosition("cartItemNum" + i,500,75 + 50 * (i-1));
        setPosition("cartItemPrice" + i,540,75 + 50 * (i-1));
        setPosition("cartItemCancle" + i,610,75 + 50 * (i-1));
        cartInAnimation(i,'+');
      }
    }else if(a == '-'){
      for(var j = 1; j < 5; j++){
        setPosition("cartItemPic" + j,-315,65 + 50 * (j-1));
        setPosition("cartItemName" + j,-280,75 + 50 * (j-1));
        setPosition("cartItemNum" + j,-160,75 + 50 * (j-1));
        setPosition("cartItemPrice" + j,-120,75 + 50 * (j-1));
        setPosition("cartItemCancle" + j,-50,75 + 50 * (j-1));
        cartInAnimation(j,'-');
      }
    }
  }
  
  //animaiton of the item to the right
  function cartInAnimation(i,a){
    var speed = 30;
    if(a == '-'){
      speed = -30;
    }
  
    setTimeout(function() {
      if(i < 4){
        var time = 0;
        timedLoop(50, function() {
          if(time <= 10){
            setPosition("cartItemPic" + i,getXPosition("cartItemPic" + i) - speed,getYPosition("cartItemPic" + i));
            setPosition("cartItemName" + i,getXPosition("cartItemName" + i)- speed,getYPosition("cartItemName" + i));
            setPosition("cartItemNum" + i,getXPosition("cartItemNum" + i)- speed,getYPosition("cartItemNum" + i));
            setPosition("cartItemPrice" + i,getXPosition("cartItemPrice" + i)- speed,getYPosition("cartItemPrice" + i));
            setPosition("cartItemCancle" + i,getXPosition("cartItemCancle" + i)- speed,getYPosition("cartItemCancle" + i));
            time ++;
          }
        });
      }else{
        var time2 = 0;
        timedLoop(50, function() {
          if(time2 <= 10){
            setPosition("cartItemPic" + i,getXPosition("cartItemPic" + i) - speed,getYPosition("cartItemPic" + i));
            setPosition("cartItemName" + i,getXPosition("cartItemName" + i)- speed,getYPosition("cartItemName" + i));
            setPosition("cartItemNum" + i,getXPosition("cartItemNum" + i)- speed,getYPosition("cartItemNum" + i));
            setPosition("cartItemPrice" + i,getXPosition("cartItemPrice" + i)- speed,getYPosition("cartItemPrice" + i));
            setPosition("cartItemCancle" + i,getXPosition("cartItemCancle" + i)- speed,getYPosition("cartItemCancle" + i));
            time2++;
          }else{
            stopTimedLoop();
            cartChanging = true;
          }
        });
      }
    }, 150*(i-1));
  }
  
  //for debug make sure all the items in the right place when they get in to the cart page
  function chrtBack(){
    for(var i = 1; i < 5; i++){
      setPosition("cartItemPic" + i,15,65 + 50 * (i-1));
      setPosition("cartItemName" + i,50,75 + 50 * (i-1));
      setPosition("cartItemNum" + i,170,75 + 50 * (i-1));
      setPosition("cartItemPrice" + i,210,75 + 50 * (i-1));
      setPosition("cartItemCancle" + i,280,75 + 50 * (i-1));
    }
  }
  
  //checkout when the total price bigger then 0
  onEvent("CheckOut","click",function(){
    if(totalPrice > 0){
      lastCall();
    }
  });
  
  //function to told user is the last ask befor the pay
  function lastCall(){
    setText("lastCheckPrice","Are you sure to pay\n$" + totalPrice);
    setText("lastCheckNumber","Yor card number: \n");
    for(var i = 1; i < 17; i++){
      setText("lastCheckNumber",getText("lastCheckNumber") + Card[cardex[1]][i-1]);
      if(i%4 == 0){
        setText("lastCheckNumber",getText("lastCheckNumber") + " ");
      }
    }
    
    showElement("lastCheckPrice");
    showElement("lastCheckNumber");
    showElement("lastCheckNo");
    showElement("lastCheckYes");
    showElement("cartCover");
    
    setProperty("cartCover","background-color", rgb(0, 0, 0, 0.5));
  }
  
  //if user choose no
  onEvent("lastCheckNo","click",function(){
    hideElement("lastCheckPrice");
    hideElement("lastCheckNumber");
    hideElement("lastCheckNo");
    hideElement("lastCheckYes");
    hideElement("cartCover");
  
  });
  
  //if user choose yes
  onEvent("lastCheckYes","click",function(){
    hideElement("lastCheckPrice");
    hideElement("lastCheckNumber");
    hideElement("lastCheckNo");
    hideElement("lastCheckYes");
    showElement("loading");
    setTimeout(function() {
      hideElement("loading");
      if(totalPrice > Balance[cardex[1]]){
        setText("lastCheckPrice","Sorry, you don't have enough money");
        showElement("lastCheckPrice");
        setTimeout(function() {
          hideElement("lastCheckPrice");
          hideElement("cartCover");
        }, 2000);
      }else{
        setScreen("BillPage");
        setText("billNumber","$"+totalPrice);
        Balance[cardex[1]] = Balance[cardex[1]] - totalPrice;
        readRecords("wallet", {}, function(records) {
          for (var i =0; i < records.length; i++) {
            if(Card[cardex[1]] == records[i].Card){
              balanceDex(records[i].id);
            }
          }
        });
        
        
      }
    }, 1500);
  });
  
  //motions after pay
  function balanceDex(a){
    updateRecord("wallet", {id:a, UserName:UserName,
      Card:Card[cardex[1]],balance:Balance[cardex[1]], Type:CardType[cardex[1]]
    });
    readRecords("storehouse", {}, function(records) {
      for (var i =0; i < records.length; i++) {
        for(var j = 0; j < cartIdemName.length;j++){
          if(records[i].Name == item_name[cartIdemName[j]]){
            var newSales = records[i].Sales + cartIdemNum[j];
            var newStock = records[i].Stock -cartIdemNum[j];
            if(newStock < 0){
              newStock = 0;
            }
            updateRecord("storehouse", {id:records[i].id ,
              Name: item_name[cartIdemName[j]],
              Sales: newSales,
              Stock:newStock});
            
          }
        }
      }
      cartIdemNum = [];
      cartIdemName = [];
      setTimeout(function() {
        item_sals = getColumn("storehouse","Sales");
        item_stock = getColumn("storehouse","Stock");
        changeCartNum();
      }, 500);
    });
  }
  