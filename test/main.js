
function myGetElementsByClassName(selector) {

    if ( document.getElementsByClassName ) {

        return document.getElementsByClassName(selector);

    }

// Denna kod genererar ut rss födet

    var returnList = new Array();

    var nodes = document.getElementsByTagName('div');

    var max = nodes.length;

    for ( var i = 0; i < max; i++ ) {

        if ( nodes[i].className == selector ) {

            returnList[returnList.length] = nodes[i];

        }

    }

    return returnList;

}

 

var rssReader = {

    containers : null,

 

    init : function(selector) {

      var  containers = myGetElementsByClassName(selector);

        for(var i=0;i<containers.length;i++){

         
            var rssUrl = containers[i].getAttribute('rss_url');

            var num = containers[i].getAttribute('rss_num');

            var id = containers[i].getAttribute('id');

 

         
            var url = encodeURIComponent(rssUrl);

            var googUrl = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+num+'&q='+url+'&callback=rssReader.parse&context='+id;

 

            var script = document.createElement('script');

            script.setAttribute('type','text/javascript');

            script.setAttribute('charset','utf-8');

            script.setAttribute('src',googUrl);

            containers[i].appendChild(script);

        }

    },

 

   

    parse : function(context, data) {

        var container = document.getElementById(context);

        container.innerHTML = '';

 

      

        var mainList = document.createElement('ul');

 

       

        var entries = data.feed.entries;

        for (var i=0; i<entries.length; i++) {

            var listItem = document.createElement('li');

            var title = entries[i].title;

            var contentSnippet = entries[i].contentSnippet;

            var contentSnippetText = document.createTextNode(contentSnippet);

 

            var link = document.createElement('a');

            link.setAttribute('href', entries[i].link);

            link.setAttribute('target','_blank');

            var text = document.createTextNode(title);

            link.appendChild(text);

 

         

            listItem.appendChild(link);

 

            var desc = document.createElement('p');

            desc.appendChild(contentSnippetText);

 

       

            listItem.appendChild(desc);

 

           

            mainList.appendChild(listItem);

        }

        container.appendChild(mainList);

    }

};

 

window.onload = function() {

    rssReader.init('post_results');

}