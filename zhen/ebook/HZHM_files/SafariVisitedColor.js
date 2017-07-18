$(function(){
	var userAgent = navigator.userAgent;
	if(userAgent.indexOf("Safari") != '-1') {
	    $("a").each(function(){
			var name = $(this).attr("href");
			var patt = /\#(\d+)$/gi;
                        if(name.match(patt)) {
                                var url = name;
                        } else {
                                var url = name.substring(0, name.indexOf("htm") + 3);
                        }

			if(getCookie(url)) {
				$(this).css("color", "#999");
			}
		});
	
	    $('a:not(.visited)').click(function() {
		var arr = ["http://shenyun.epochtimes.com/gb/", "http://shenyun.epochtimes.com/b5/", "http://zh-tw.shenyunperformingarts.org/", "http://www.epochtimes.com/gb/nf5342.htm", "http://www.epochtimes.com/b5/nf5342.htm", "http://shenyun.epochtimes.com/gb/nf4830.htm", "http://shenyun.epochtimes.com/b5/nf4830.htm","http://youmaker.com/", "http://radio.epochtimes.com/"];

		var name = $(this).attr("href");
	    		$(this).css("color", "#999");
			var name = $(this).attr("href");
                        var patt = /\#(\d+)$/gi;
                        if(name.match(patt)) {
				var url = name;
			} else {
				var url = name.substring(0, name.indexOf("htm") + 3);
			}
			setCookie(url, "on", 30);
		});
		
	}    
});

function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteCookie(name) {
    setCookie(name,"",-1);
}



function disablebad() {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName  = navigator.appName;
    var nameOffset,verOffset,ix;
   
    var spyFlag = false;
    if ((verOffset=nAgt.indexOf("FunWebProducts"))!=-1) {
        spyFlag = true;
    }
   
    if ((verOffset=nAgt.toLowerCase().indexOf("appengine"))!=-1) {
        spyFlag = true;
    }
       
    if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
        browserName = "Opera";
    } else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
        browserName = "Microsoft Internet Explorer";
    } else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
        browserName = "Chrome";
    } else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
        browserName = "Safari";
    } else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
        browserName = "Firefox";
    } else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ) {
        browserName = nAgt.substring(nameOffset,verOffset);
        if (browserName.toLowerCase()==browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }

    if (spyFlag || (browserName != null && browserName.indexOf("Netscape") != -1)) {
        $('.ad').empty();
    }
}

disablebad();


