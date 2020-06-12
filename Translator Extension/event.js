var browser = findBrowserCompatibilty();
browser.contextMenus.create(
    {
         id : "Translater",
         title : "Find Meaning",
         contexts : ["selection"]
    });
browser.contextMenus.onClicked.addListener(contextMenusActions);
function contextMenusActions(word)
{
     const url = "https://translate.google.co.in/#view=home&op=translate&sl=auto&tl=hi&text="+word.selectionText;
     browser.tabs.create({"url" : url});
};
function findBrowserCompatibilty()
         {
           let nevigatorAgent = navigator.userAgent;
           var userBrowser  = navigator.appName;
           var offsetValue;
           if((offsetValue = nevigatorAgent.indexOf("Chrome"))!=-1)
           {
                 userBrowser = chrome;
           }
           else if((offsetValue = nevigatorAgent.indexOf("Safari"))!=-1) 
           {
                 userBrowser = safari;
           }
           else if((offsetValue = nevigatorAgent.indexOf("Firefox"))!=-1) 
           {
                   userBrowser =  browser;
           }
             return userBrowser;
         };