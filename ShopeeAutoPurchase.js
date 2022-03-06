// ==UserScript==
// @name Auto Shop Without Variation
// @namespace Script Runner Pro
// @description Add the item quantity to become 2 then click buy now, press the checkout button
// @match *://*/*
// @grant none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

var urlToApply = "";
var init = false;
var counter = 0;
var buy2 = true;//Whether to purchase 2 of this item

(function() {

  if(urlToApply != window.location.href){
    console.log("NOt same URL");
  }
  else{
    if(!init){
      init = true;
      console.log("Same URL");

      const clickAddQuantityButton = () =>{
      //First, add the quantity of the item to 2
        if(counter === 0){
           counter++;

          waitForKeyElements (
          ".rvHxix", //buyNow button
          clickBuyNowButton);
          //if(buy2 === true){
            //var plusBtn = Array.from(document.getElementsByClassName('_2KdYzP'))[2];//Hardcode click the 2nd index input to always set to 2
            //console.log(Array.from(document.getElementsByClassName('_2KdYzP'))[2]);
            //Make sure got registered click
            //plusBtn.click();
          //}else{
            //clickBuyNowButton();
          //}
        }};

      const waitForBuyNowButton = () =>{
        setTimeout(function() { clickBuyNowButton();}, 100);
      }

    const clickBuyNowButton = () =>{
        console.log("Click buy now button");
      if(counter === 1){
        counter++;
        //After adding quantity to 2, proceed to the buy now button
       Array.from(document.getElementsByClassName('_3Kiuzg')).find(e => e.textContent === 'buy now').click();

        //Find the checkout button and press on that button
        setTimeout(function(){
           waitForKeyElements (
          ".icon-plus-sign", //plus button
          clickCheckoutButton);
        },100);
      };
     }

    const clickCheckoutButton = ()=>{
      if(counter === 2){
        if(buy2){
          var plusBtn = Array.from(document.getElementsByClassName('icon-plus-sign'))[0].parentElement;
          plusBtn.click();
          waitToClick();
        }else{
          //console.log(Array.from(document.getElementsByClassName('shopee-button-solid--primary')));
        Array.from(document.getElementsByClassName('shopee-button-solid--primary'))[0].click();

        //Find the change preferred delivery time and press on that button
         waitForKeyElements (
          "._26DEZ8", //plus button
          clickOnChangeDeliveryMethod);
        }

        counter ++;

      }
    }

    const waitToClick = ()=>{
      setTimeout(function(){
          Array.from(document.getElementsByClassName('shopee-button-solid--primary'))[0].click();
        waitForKeyElements (
          "._26DEZ8", //plus button
          clickOnChangeDeliveryMethod);
        }, 500);
    }

    const clickOnChangeDeliveryMethod = ()=>{
      if(counter === 3){
        counter ++;
        //console.log(Array.from(document.getElementsByClassName('_26DEZ8')));
        Array.from(document.getElementsByClassName('_26DEZ8'))[0].click();

        //Find the change the delivery anytime and press on that button
         waitForKeyElements (
          ".PYpWnK", //plus button
          clickOnSelectDeliverAnytimeBtn);
      }
    }

    const clickOnSelectDeliverAnytimeBtn = ()=>{
      if(counter === 4){
        counter ++;
        //console.log(Array.from(document.getElementsByClassName('PYpWnK')));
        Array.from(document.getElementsByClassName('PYpWnK'))[0].click();

         //Find the submit delivery time button and click on it
        waitForKeyElements (
          ".-T3OGq", //plus button
          clickOnSubmitDeliveryTime);
      }
    }

    const clickOnSubmitDeliveryTime = ()=>{
      if(counter === 5){
        counter++;
        //console.log(Array.from(document.getElementsByClassName('-T3OGq')));
        Array.from(document.getElementsByClassName('-T3OGq'))[0].click();

        //Find the place order button and click on it
        clickOnPlaceOrder();
      }
    }

    const clickOnPlaceOrder = () =>{
      if(counter === 6){
        counter++;
        //console.log(Array.from(document.getElementsByClassName('_1qSlAe')));
        setTimeout(function(){
          Array.from(document.getElementsByClassName('_1qSlAe'))[0].click();
        }, 800);
      }
    }

    $(document).ready(function() {
  setTimeout(function(){
        waitForKeyElements (
    "._2KdYzP", //plus button
    clickAddQuantityButton
    ); }, 100);
  });

  /*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
    that detects and handles AJAXed content.

    Usage example:

        waitForKeyElements (
            "div.comments"
            , commentCallbackFunction
        );

        //--- Page-specific function to do what we want when the node is found.
        function commentCallbackFunction (jNode) {
            jNode.text ("This comment changed by waitForKeyElements().");
        }

    IMPORTANT: This function requires your script to have loaded jQuery.
*/
function waitForKeyElements (
    selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
    actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
    bWaitOnce,      /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
    iframeSelector  /* Optional: If set, identifies the iframe to
                        search.
                    */
) {
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        btargetsFound   = true;
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound     = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound   = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
    }
    else {
        btargetsFound   = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                300
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}


  }}})();