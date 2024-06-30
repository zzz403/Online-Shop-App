// user name and pass word put in 
var UserName = "";
var Password = "";

//sign up
var registerPassword = "";
var Comfirmpassword = "";

//wallet
var Balance = [];
var Card = [];
var CardType = [];
var cardex =[0,1,2];
var cardChoose = 1;
var cardChanging = false;

//Home page from data 
var item_name = getColumn("items","Name");
var item_price = getColumn("items","Price");
var item_picture = getColumn("items","Picture");
var item_infor = getColumn("items","Intro");
var item_poster = getColumn("items","Poster");

var item_sals = getColumn("storehouse","Sales");
var item_stock = getColumn("storehouse","Stock");

//home page designs
var itemchoose = [];

var search = false;

//information transfer from home page
var infordex = 0;

var cartIdemName = [];
var cartIdemNum = [];
var cartPageNum = 1;
var cartChanging = true;

var totalPrice = 0;

changeCartNum();//setRight number for cart numbers

var searchItems = [];//the items we use in home page

//somthing for chontrol the up and down
var homeUpDown = "";

//dowmLode and use all the datas
function getIn(){
  item_name = getColumn("items","Name");
  item_price = getColumn("items","Price");
  item_picture = getColumn("items","Picture");
  item_infor = getColumn("items","Intro");
  item_poster = getColumn("items","Poster");
  item_sals = getColumn("storehouse","Sales");
  item_stock = getColumn("storehouse","Stock");
  for(var i = 0; i < item_name.length; i++){
    searchItems[i] = i;
  }
}

// Main Event Listeners
onEvent("homeBtmH", "click", function(){ changeScreen('h'); });
onEvent("homeBtmW", "click", function(){ changeScreen('w'); });
onEvent("homeBtmP", "click", function(){ changeScreen('p'); });
onEvent("homeBtmS", "click", function(){ changeScreen('s'); });
onEvent("homeBtmR", "click", function(){ changeScreen('r'); });

onEvent("walletBtmH", "click", function(){ changeScreen('w'); });
onEvent("walletBtmW", "click", function(){ changeScreen('w'); });
onEvent("walletBtmP", "click", function(){ changeScreen('w'); });
onEvent("walletBtmS", "click", function(){ changeScreen('w'); });
onEvent("walletBtmR", "click", function(){ changeScreen('w'); });

onEvent("postBtmH", "click", function(){ changeScreen('p'); });
onEvent("postBtmW", "click", function(){ changeScreen('p'); });
onEvent("postBtmP", "click", function(){ changeScreen('p'); });
onEvent("postBtmS", "click", function(){ changeScreen('p'); });
onEvent("postBtmR", "click", function(){ changeScreen('p'); });

onEvent("shoppingCartBtmH", "click", function(){ changeScreen('s'); });
onEvent("shoppingCartBtmW", "click", function(){ changeScreen('s'); });
onEvent("shoppingCartBtmP", "click", function(){ changeScreen('s'); });
onEvent("shoppingCartBtmS", "click", function(){ changeScreen('s'); });
onEvent("shoppingCartBtmR", "click", function(){ changeScreen('s'); });

onEvent("profileBtmH", "click", function(){ changeScreen('r'); });
onEvent("profileBtmW", "click", function(){ changeScreen('r'); });
onEvent("profileBtmP", "click", function(){ changeScreen('r'); });
onEvent("profileBtmS", "click", function(){ changeScreen('r'); });
onEvent("profileBtmR", "click", function(){ changeScreen('r'); });

function changeScreen(i){
  timeLoopDebug();
  switch(i){
    case 'h':
      homeUpDownF();
      setScreen("HomePage");
      break;
    case 'w':
      WalletBack();
      setScreen("WalletPage");
      break;
    case 'p':
      hideElement("postInportant");
      setScreen("PostPage");
      break;
    case 's':
      changeToCart();
      setScreen("ShoppingCartPage");
      break;
    case 'r':
      changeChatHistory();
      setScreen("ProfilePage");
      break;
    default:
      break;
  }
}

function changeCartNum(){
  if(cartIdemNum.length > 0){
    setNumber("cartNumH",cartIdemNum.length);
    setNumber("cartNumW",cartIdemNum.length);
    setNumber("cartNumP",cartIdemNum.length);
    setNumber("cartNumS",cartIdemNum.length);
    setNumber("cartNumR",cartIdemNum.length);
    setNumber("cartNumI",cartIdemNum.length);
    setNumber("cartNumC",cartIdemNum.length);
    
    showElement("cartNumH");
    showElement("cartNumW");
    showElement("cartNumP");
    showElement("cartNumS");
    showElement("cartNumR");
    showElement("cartNumI");
    showElement("cartNumC");
  }else{
    hideElement("cartNumH");
    hideElement("cartNumW");
    hideElement("cartNumP");
    hideElement("cartNumS");
    hideElement("cartNumR");
    hideElement("cartNumI");
    hideElement("cartNumC");
  }
}
