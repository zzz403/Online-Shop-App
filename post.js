/*Poster Page*/

onEvent("postPicInput","input",function(){
    setImageURL("postItemPic",getText("postPicInput"));
  });
  
  onEvent("PostBtm","click",function(){
    if(checkPost() == true){
      var type;
      if(getChecked("electronicsRadio")){
        type = "ele";
      }else if(getChecked("clothingRadio")){
        type = "clo";
      }else if(getChecked("cosmeticsRadio")){
        type = "cos";
      }else if(getChecked("otherRadio")){
        type ="oth";
      }
      
      var newItem = {
        Name:getText("postNameInput"),
        Poster:UserName,
        Price:getText("postPriceInput"),
        Picture:getText("postPicInput"),
        Intro:getText("introductionInput"),
        Type: type
      };
      
      createRecord("items", newItem);
      
      newItem = {
        Name:getText("postNameInput"),
        Sales:0,
        Stock:getText("postStockInput")
      };
      
      createRecord("storehouse", newItem);
      
      setText("postNameInput","");
      setText("postPriceInput","");
      setText("postStockInput","");
      setText("postPicInput","");
      setText("introductionInput","");
      setChecked("electronicsRadio",false);
      setChecked("clothingRadio",false);
      setChecked("cosmeticsRadio",false);
      setChecked("otherRadio",false);
      
      setTimeout(function() {
        getIn();
        changeScreen('h');
      }, 1000);
    }else{
      showElement("postInportant");
      setTimeout(function() {
        hideElement("postInportant");
      }, 3000);
    }
  });
  
  function checkPost(){
    var allIn = false;
    if(getText("postNameInput")!= ""){
      if(getText("postPriceInput")!=""){
        if(getText("postStockInput")!=""){
          if(getText("postPicInput")!=""){
            if((getChecked("electronicsRadio") == true)||(getChecked("clothingRadio") == true)||
            (getChecked("cosmeticsRadio") == true)||(getChecked("otherRadio") == true)){
              allIn = true;
            }
          }
        }
      }
    }
    return allIn;
  }
  