chrome.runtime.getBackgroundPage(function()
{
    function callExecuteBlocked()
    {
        var lsUserId = "admin";
        var xmlhttpBlock = new XMLHttpRequest();
        var urlBlock = "http://localhost/AddBlockExtension/retriveBlockSitesAPI.php?userId="+lsUserId;
        xmlhttpBlock.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){  
                 console.log('Response Text:' + xmlhttpBlock.responseText);
                 try{
                      var blockSite = JSON.parse(xmlhttpBlock.responseText);
                      const blockStack = blockSite.block;
                      if(blockStack != null)
                      {
                        chrome.webRequest.onBeforeRequest.addListener(
                            function(details) { return { cancel: true }},
                            { urls: blockStack},
                            ["blocking"]
                        )
                      };
                 }catch(error){
                   console.log(error.message + " in " + xmlhttpBlock.responseText);
                 };
            };
          };
        xmlhttpBlock.open("GET", urlBlock, true);
        xmlhttpBlock.send();
    };
chrome.runtime.onMessage.addListener(function(request){
    if(request.todo == "reloadScript"){
      var liIndex = request.liIndex;
      var urlUpdate = request.selectedUrl;
      chrome.tabs.query({},function(tabs)
      { 
        chrome.tabs.update(tabs[liIndex].id, {url: urlUpdate});
        callExecuteBlocked();
      });
    };
});
callExecuteBlocked();
});
