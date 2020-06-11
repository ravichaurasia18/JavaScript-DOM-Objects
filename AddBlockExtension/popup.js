$(document).ready(function(){
    $(".addButton").click(function(){
        chrome.tabs.getSelected(null,function(tabs) 
        {
          var selectedUrl = tabs.url;
          var liIndex = tabs.index;
          var xmlhttpADD = new XMLHttpRequest();
          var lsUserId = "admin";
          var urlADD = "http://localhost/AddBlockExtension/AddBlockSitesAPI.php?userId="+lsUserId+"&urlSite="+selectedUrl;
          xmlhttpADD.onreadystatechange = function(){
              if(this.readyState == 4 && this.status == 200){  
                   console.log('Response Text:' + xmlhttpADD.responseText);
                   try{
                        var result = JSON.parse(xmlhttpADD.responseText);
                        let lsnotify = {
                                                type : 'basic',
                                                iconUrl : 'icon48.png',
                                                title: 'Ad-Blocker Extension',
                                                message: "Alert : " +result.response
                                             };
                                              chrome.notifications.create(lsnotify);
                        setTimeout(function()
                        {
                          chrome.runtime.sendMessage({todo : "reloadScript",liIndex : liIndex,selectedUrl : selectedUrl});
                        },5000);
                   }catch(error){
                     console.log(error.message + " in " + xmlhttpADD.responseText);
                   };
              };
            };
          xmlhttpADD.open("GET", urlADD, true);
          xmlhttpADD.send();
        });
    });
});