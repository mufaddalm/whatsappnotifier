function nodeInsertedCallback(event) {
    var str = event.relatedNode;
    if (str.className =="chat-secondary") {
        ProcessHTMLData();
    }
};

window.onload = function () { 
    alert("Whatsapp Notifier Loaded, Lets Stop Distractions!");
    document.addEventListener('DOMNodeInserted', nodeInsertedCallback);
}


var results = [];
var notifyHTML='';
var totalpendingchats =0;
function ProcessHTMLData(){
    var html = document.querySelector('.infinite-list-viewport').innerHTML;



	totalpendingchats=0;
	notifyHTML='';

	var div = document.createElement("div");
	div.innerHTML = html; //document.getElementById('pagetitle').innerHTML;

	var nodes = div.getElementsByClassName("unread");
	//alert(nodes.length);
	try{
        for(var i=0; i < nodes.length; i++) { 
            totalpendingchats = totalpendingchats + 1;
            //alert(nodes)
            
            var node = nodes[i].getElementsByClassName("emojitext");
            
            if(node[0].title=='Mufaddal Mohammed' || node[0].title=='mufaddalphotoworks.com' || node[0].title=='+965 6621 6152' || node[0].title=='instagram @mufaddalphotoworks'){
                var result=[];

                var bFound = false;
                var bOveride = false;
                //console.log('ResultCount:' + results.length);
                for(var j=0;j<results.length-1;j++){
                    console.log(node[0].title);
                    if(results[j]['chat_title'] == node[0].title){
                        node = nodes[i].getElementsByClassName("unread-count");
                        console.log('results_chat_count:'+ node[0].innerHTML);
                        if(results[j]['chat_count'] == node[0].innerHTML){
                            bFound=true;
                            break;
                        }else{
                            results[j]['chat_count']= node[0].innerHTML;
                            //console.log(node[0].title + ' Updated.');
                            notifyHTML = notifyHTML + results[j]['chat_title'] + ' AA: ' + node[0].innerHTML + ' ';
                            break;
                        }
                        
                    }
                }

                if (bFound == false){
                    result['chat_title'] = node[0].title; //node[0].innerHTML;
                    var node = nodes[i].getElementsByClassName("unread-count");
                    
                    result['chat_count'] = node[0].innerHTML;
                    notifyHTML = notifyHTML + result['chat_title'] + ' BB : ' + result['chat_count'] + ' ';
                    
                    results.push(result);
                }
                

            }
		}
    }
    catch(err){
        console.log(err.message);
    }
	
    
     if(notifyHTML != ''){
        var opt = {
            type: "basic",
            title: "Whatsapp Notification",
            message: notifyHTML,
            iconUrl: "alert.png"
            }

         
         chrome.runtime.sendMessage({type: "shownotification", opt: opt}, function(){});
         
         notifyHTML='';
     }
        
        
}


