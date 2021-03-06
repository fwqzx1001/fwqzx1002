if(typeof(grazeBaseUrl) == 'undefined') var grazeBaseUrl = dbn_protocol +"widget.engageya.com/";
if(typeof(dbn_addEvent) == 'undefined') var dbn_addEvent = (function () {
    if (document.addEventListener) {
        return function (el, type, fn) {
            if (el && el.nodeName || el === window) {
                el.addEventListener(type, fn, false);
            } else if (el && el.length) {
                for (var i = 0; i < el.length; i++) {
                    dbn_addEvent(el[i], type, fn);
                }
            }
        };
    } else {
        return function (el, type, fn) {
            if (el && el.nodeName || el === window) {
                el.attachEvent('on' + type, function () {
                    return fn.call(el, window.event);
                });
            } else if (el && el.length) {
                for (var i = 0; i < el.length; i++) {
                    dbn_addEvent(el[i], type, fn);
                }
            }
        };
    }
})();

var sprk_libs={};

if(typeof(dbnjQCheck) == 'undefined') var dbnjQCheck = function(){

    if (dbnwebid == 30548) return true;

    var jq_ver_base=new Array(0,0,0);

    if(typeof(jQuery)!='undefined'&& typeof(jQuery.fn)!='undefined'&& typeof(jQuery.fn.jquery)!='undefined')    //jQuery available
    {
        var jq_ver_cur=jQuery.fn.jquery.split('.');
        if(typeof(jq_ver_cur[0])!='undefined'){
            jq_ver_cur[0]=parseInt(jq_ver_cur[0]);
            if(!isNaN(jq_ver_cur[0])) jq_ver_base[0]=jq_ver_cur[0];
        }
        if(typeof(jq_ver_cur[1])!='undefined'){
            jq_ver_cur[1]=parseInt(jq_ver_cur[1]);
            if(!isNaN(jq_ver_cur[1])) jq_ver_base[1]=jq_ver_cur[1];
        }
        if(typeof(jq_ver_cur[2])!='undefined'){
            jq_ver_cur[2]=parseInt(jq_ver_cur[2]);
            if(!isNaN(jq_ver_cur[2])) jq_ver_base[2]=jq_ver_cur[2];
        }
        if(parseInt(jq_ver_base.join(''))>=172 || dbnpid == 26843) // Minimal version 1.7.2 or actual_light
        {
            return true;    //required version available
        }
        else {
            return false;	//require version available
        }
    }
    else {
        return false;    //no jQuery
    }
};


if(typeof(dbnjQLoader) == 'undefined') var dbnjQLoader = (function(){

    var loadJQ = !dbnjQCheck();

    if (loadJQ) {
        var script = document.getElementById("grazit_script");
        if (script) {
            var newScript = document.createElement("script");
            newScript.id = "grazit_jq";
            newScript.type = "text/javascript"
            newScript.src = "http://widget.engageya.com/scripts/jquery.min.js";
            script.parentNode.appendChild(newScript);
        }
    }
    else {
        sprk_libs.jq=jQuery;
    }
})();// jquery end


if(typeof(dbnlibLoader) == 'undefined') var dbnlibLoader = (function(){

    if (typeof (gwImgHandler) == 'undefined') gwImgHandler = function (idx, i) {
        sprk_widgets[idx].layoutObj.imgHandler(i);

    }
    if(typeof(sprk_click) == 'undefined') sprk_click = function(obj,clickUrl){
        obj.href = clickUrl;
        return true;
    }

    //>>>. git slideshow
    git_slideshow = function(index){
        //  slideshow parameters
        this.ss_slides;             //holds array of slides (divs) in slideshow
        this.ss_duration = 3000;    //in milliseconds
        this.ss_currentindex = 0;   //index of current slide
        this.ss_interval = 0;       //slide show interval
        this.ss_index = index;
    }

    git_slideshow.prototype.stop = function(){
        if(this.ss_interval) clearInterval(this.ss_interval)
    }
    git_slideshow.prototype.start = function(){
        this.stop();
        var ref=this;
        this.ss_interval = setInterval(function(){ref.show("next");},this.ss_duration);
    }
    git_slideshow.prototype.gotoSlide = function (slide) {
        sprk_libs.jq(this.ss_slides[this.ss_currentindex]).fadeOut();
        this.ss_currentindex = slide;
        sprk_libs.jq(this.ss_slides[this.ss_currentindex]).fadeIn();
        this.displayActivePage();
    }
    git_slideshow.prototype.show = function (direction) {
        if(direction == "next")    this.ss_slideindex = this.ss_currentindex < this.ss_slides.length - 1 ? this.ss_currentindex+1 : 0
        else if(direction == "prev") this.ss_slideindex = this.ss_currentindex > 0 ? this.ss_currentindex-1   : this.ss_slides.length - 1;
        this.gotoSlide(this.ss_slideindex);
    }


    git_slideshow.prototype.displayActivePage = function () {
        if (document.getElementById("git_pg_page_" + this.ss_index)) {
            document.getElementById("git_pg_page_"+ this.ss_index).innerHTML=this.ss_currentindex+1 + "/"+ this.ss_slides.length;
        }
    }

    git_slideshow.prototype.init = function(){
        var ss_container = document.getElementById("git_slides_wrap_"+ this.ss_index);
        this.ss_slides=new Array();
        var ss=this.ss_slides;
        sprk_libs.jq(ss_container).children("div.gslide").each(function(){
            ss.push(this);
        });

        for(var i=1;i<ss.length;i++) //Hide all but first
            //sprk_libs.jq(this).css('opacity',0);
            sprk_libs.jq(ss[i]).css('display','none');

        //enable previous/next controls.
        var slideShowObject = this;
        sprk_libs.jq("#git_wrapper_"+ this.ss_index ).hover(function(){
            slideShowObject.stop()
        },function(){
            slideShowObject.start()
        });
        sprk_libs.jq("div#git_pg_prev_"+ this.ss_index +" a").click(function(){
            slideShowObject.show("prev");
        });
        sprk_libs.jq("div#git_pg_next_"+ this.ss_index +" a").click(function(){
            slideShowObject.show("next");
        });
        this.start();
        this.displayActivePage();
    }
    //<<<. git slideshow

    //>>>. git_layout begin
    git_layout = function(widget){
	git_layout = this;
        this.widget = widget;
        this.idx = this.widget.idx;
        this.baseUrl = grazeBaseUrl;
        this.titleText = this.widget.dbnheader;


        this.widgetTitleColor = "inherit";
        this.widgetTitleBgColor = "inherit";
        this.titleColor ="inherit";
        this.descColor="inherit";
        this.linkColor = "inherit";

        this.closeColor = "#c9267a";
        this.navNextColor = "#c9267a";
        this.navPrevColor = "#c9267a";
        this.reminderColor = this.widget.dbnremindercolor;
        this.dbndirection = this.widget.dbndirection;
        this.bulletcolor = this.widget.dbnbulletcolor;// (typeof(this.widget.dbnbulletcolor) =='undefined')?"#c9267a":this.widget.dbnbulletcolor;
        this.bgColorType = this.widget.dbnbgcolortype;  //1= light, 2= dark
        this.backgroundColor = this.widget.dbnbgcolor;
        if (typeof (this.backgroundColor) == 'undefined') {
            if(this.widget.isstaticWidget())    //if widget is static bgcolor is not specified then take from container background
            {
                this.backgroundColor = "none";
            }
            else//sliding widget, set default bg colors
            {
                if (this.bgColorType == 1) {
                    this.backgroundColor = "#fff";
                }
                else if(this.bgColorType == 2)    //if dark background has specified and no background color specified then default to some dark background color.
                {
                    this.backgroundColor = "#000";
                }
            }
        }

        //this.widgetType = ((typeof(this.widget.dbnanchors) == 'undefined')? 'sliding': 'static');

        if (typeof (this.widget.dbncolor) != 'undefined') {
            this.titleColor = this.closeColor = this.navNextColor = this.navPrevColor = this.widget.dbncolor;
        }
    };

    git_layout.prototype.cbPreLayout = function () {

        if(this.bgColorType == 2 && (this.widget.dbnlayout!=10 && this.widget.dbnlayout!=11)){    //dark layout
            this.widgetTitleBgColor = "transparent";
            this.widgetTitleColor = "#FFFFFF";
            this.linkColor = this.titleColor;
            this.descColor = "#FFFFFF";
        }
        if (dbnwix == true && this.widget.dbnlayout == 10 ) {
            this.closeColor = this.navNextColor = this.navPrevColor = "#000";
        }
    }
    
    git_layout.prototype.getBranding = function (networkId, languageId) {
        var linkStyle = 'text-align:right; font-size:8px; color:#BBBBBB; font-weight:bold; text-decoration:none';

        switch (networkId) {
            case 2:
                return '<div class="post_here" style="right:0;float: right;"><a class="post_here_link" style="' + linkStyle + '" href="http://tradeup.com.ua/" target="_blank" title="Tradeup">ENGAGEYA for TRADEUP</a></div><div  style="clear: both"></div>';
                break;
            case 3:
                return '<div class="post_here her_campus" style="right:0;float: right;"><a class="post_here_link" style="' + linkStyle + '" href="http://hercampus.engageya.com/" title="ENGAGEYA for Her Campus" target="_blank"><span style="vertical-align:super">ENGAGEYA for</span> <span style="padding-left: 3px; vertical-align:bottom;"><img style="margin-bottom: -6px;" src="http://widget.engageya.com/img/brands/hercampus/logohorizontal.png" alt="ENGAGEYA for Her Campus" style="border: 0px solid #ffffff;"></span></a></div><div style="clear: both"></div>';
                break;
            case 4:
                return '<div class="post_here" style="right:0;float: right;"><a class="post_here_link" style="' + linkStyle + '" href="#" title="ENGAGEYA for MATOMY"><span style="vertical-align:super">ENGAGEYA for</span> <span style="padding-left: 3px; vertical-align:bottom;"><img style="margin-bottom: 0px;" src="http://widget.engageya.com/img/brands/matomy/matomy_logo.jpg" alt="ENGAGEYA for MATOMY" style="border: 0px solid #ffffff;"></span></a></div><div  style="clear: both"></div>';
                break;
            case 6:
                return '<div class="post_here" style="right:0;float: right;"><a class="post_here_link" style="' + linkStyle + '" href="#" title="ENGAGEYA for Conde Nast DE"><span style="vertical-align:super">ENGAGEYA for Conde Nast DE</span> <span style="padding-left: 3px; vertical-align:bottom;"><img style="margin-bottom: -9px;" src="http://widget.engageya.com/img/brands/condenastde/logo_gq.jpg" alt="ENGAGEYA for Conde Nast DE" style="border: 0px solid #ffffff;"></span></a></div><div  style="clear: both"></div>';
                break;
	    case 7:
                return '<div class="post_here" style="right:0;float: right;"><a class="post_here_link" style="' + linkStyle + '" href="#" title="ENGAGEYA for Girls Gone Sporty"><span style="vertical-align:super">ENGAGEYA for</span> <span style="padding-left: 3px; vertical-align:bottom;"><img style="margin-bottom: -0px;" src="http://widget.engageya.com/img/brands/girlsgonesporty/ggs_logo.png" alt="ENGAGEYA for Girls Gone Sporty" style="border: 0px solid #ffffff;"></span></a></div><div  style="clear: both"></div>';
                break;
            default:
                var alignment = '';
                var text = '';
                var url = '';
                var alignClass = '';
                switch (languageId) {
                    case 11:
                        var text = '&#1605;&#1602;&#1575;&#1604;&#1603; &#1587;&#1608;&#1601; &#1610;&#1592;&#1607;&#1585; &#1607;&#1606;&#1575;';
                        var alignment = 'style="left:0;float: left;"';
                        alignClass = 'align_left';
                        var url = 'http://www.engageya.com/widgets/new/';
                        break;
                    case 4:
                        var text = '&#1492;&#1508;&#1493;&#1505;&#1496; &#1513;&#1500;&#1498; &#1497;&#1493;&#1510;&#1490; &#1499;&#1488;&#1503;';
                        var alignment = 'style="left:0;float: left;"';
                        alignClass = 'align_left';
                        var url = 'http://www.engageya.com/widgets/new/';
                        break;
                    case 3:
                        var text = 'por Engageya';
                        var alignment = 'style="right:0;float: right;"';
                        var url = 'http://www.engageya.com/widgets/new/';
                        break;
                    default:
                        var text = 'ENGAGEYA';
                        var alignment = 'style="right:0;float: right;"';
                        var url = 'http://www.engageya.com/widgets/new/';
                        break;
                }

                return '<div ' + alignment + ' class="post_here ' + alignClass + '"><a class="post_here_link" style="' + linkStyle + '" href="' + url + '" target="_blank">' + text + '</a></div><div  style="clear: both"></div>';
                break;

        }
    };

    git_layout.prototype.getHtml = function (parentWidth) {

        var html = '';
        var dbncolor = this.widget.dbncolor;
        var layout = this.widget.dbnlayout;

	var postType1Exists = false;
	
	if (layout == 17 || layout == 20 || layout == 21) {		

		for (var i = 0; i < this.widget.data.recs.length; i++) {
		    if (this.widget.data.recs[i].postType == 1) {
			postType1Exists = true;
			break;
		    }
		}

		if (postType1Exists && typeof (FB) == 'undefined') {
		    html += "<div id='fb-root'></div>";
		    html += '<script>(function(d, s, id) {\
		       var js, fjs = d.getElementsByTagName(s)[0];\
		       if (typeof(d.getElementById(id))==undefined || d.getElementById(id) == null)\
		       {\
		       js = d.createElement(s); js.id = id;\
		       js.src = "http://connect.facebook.net/en_US/all.js#xfbml=1?appId=513835295354955";\
		       fjs.parentNode.insertBefore(js, fjs);}\
		   }(document, "script", "facebook-jssdk"));</script>';
		}
	}

        switch (layout) {
            case 1:
                if (typeof (dbncolor) != 'undefined') {
                    //this.backgroundColor ="#fff";
                    this.widgetTitleColor = "#535353";
                    this.widgetTitleBgColor = "transparent";
                    this.descColor="#535353";
                    this.linkColor = "#a0a0a0";
                }
                html = this.layout1(this.widget.data);
                break;
            case 2:
                if (typeof (dbncolor) != 'undefined') {
                    //this.backgroundColor ="#fff";
                    this.widgetTitleColor = "#fff";
                    this.widgetTitleBgColor = "#7d7d7d";
                    this.descColor="#535353";
                    this.linkColor = "#a0a0a0";
                }
                html = this.layout1(this.widget.data);
                break;
            case 3:
                if (typeof (dbncolor) != 'undefined') {
                    //this.backgroundColor ="#fff";
                    this.widgetTitleColor = "#fff";
                    this.widgetTitleBgColor = dbncolor;
                    this.descColor = "#535353";
                    this.linkColor = "#a0a0a0";
                }
                html = this.layout1(this.widget.data);
                break;
            case 4:
                if (typeof (dbncolor) != 'undefined') {
                    //this.backgroundColor ="#fff";
                    this.widgetTitleColor = "#535353";
                    this.widgetTitleBgColor = "transparent";
                    this.descColor = "#535353";
                    this.linkColor = "#a0a0a0";
                }
                html = this.AdSenseLayout(this.widget.data);
                break;
            case 5:
                if (typeof (dbncolor) != 'undefined') {
                    //this.backgroundColor ="#fff";
                    this.widgetTitleColor = "#fff";
                    this.widgetTitleBgColor = "#7d7d7d";
                    this.descColor = "#535353";
                    this.linkColor = "#a0a0a0";
                }
                html = this.AdSenseLayout(this.widget.data);
                break;
            case 6:
                if (typeof (dbncolor) != 'undefined') {
                    //this.backgroundColor ="#fff";
                    this.widgetTitleColor = "#fff";
                    this.widgetTitleBgColor = dbncolor;
                    this.descColor = "#535353";
                    this.linkColor = "#a0a0a0";
                }
                html = this.AdSenseLayout(this.widget.data);
                break;
            case 10:
            case 11:
                if (typeof (dbncolor) != 'undefined') {
                    this.backgroundColor = "#fff";
                    this.widgetTitleColor = "#fff";
                    this.widgetTitleBgColor = "#c9267a";
                    this.descColor = "#fff";
                    this.linkColor = "#a0a0a0";
                }
                html = this.LargeImageLayout(this.widget.data);
                break;
            case 15:
                if (typeof (dbncolor) != 'undefined') {
                    //this.backgroundColor ="#fff";
                    this.widgetTitleColor = "#171717";
                    this.descColor = "#000";
                    this.linkColor = dbncolor;
                }

                html = this.staticBulletsLayout(this.widget.data);
                break;

            case 17:
                if (typeof (dbncolor) != 'undefined') {
                    //this.backgroundColor ="#fff";
                    this.widgetTitleColor = dbncolor;
                    this.descColor = "#000";
                    this.linkColor = dbncolor;
                }

                html += this.static4ImageLayout(this.widget.data);
                break;
            case 19:
                if (typeof (dbncolor) != 'undefined') {
                    //this.backgroundColor ="#fff";
                    this.widgetTitleColor = "#171717";
                    this.descColor = "#000";
                    this.linkColor = dbncolor;
                }
                html = this.LinkWithinLayout(this.widget.data, parentWidth);
                break;
            case 20:
                if (typeof (dbncolor) != 'undefined') {
                    //this.backgroundColor ="#fff";
                    this.widgetTitleColor = "#171717";
                    this.descColor = "#000";
                    this.linkColor = dbncolor;
                }

                html += this.static4ImageLayout100(this.widget.data, parentWidth);
                break;

            case 21:
                if (typeof (dbncolor) != 'undefined') {
                    //this.backgroundColor ="#fff";
                    this.widgetTitleColor = "#171717";
                    this.descColor = "#000";
                    this.linkColor = dbncolor;
                }

                html += this.static4ImageLayout130(this.widget.data, parentWidth);
                break;
            case 22:
                if (typeof (dbncolor) != 'undefined') {
                    //this.backgroundColor ="#fff";
                    this.widgetTitleColor = "#171717";
                    this.descColor = "#000";
                    this.linkColor = dbncolor;
                }
                html = this.textBulletsWithIconLayout(this.widget.data, parentWidth);
                break;
            case 23:
                if (typeof (dbncolor) != 'undefined') {
                    //this.backgroundColor ="#fff";
                    this.widgetTitleColor = "#171717";
                    this.descColor = "#000";
                    this.linkColor = dbncolor;
                }
                html = this.Shadow4ImagesLayout130(this.widget.data, parentWidth);
                break;
            case 24:
                if (typeof (dbncolor) != 'undefined') {
                    //this.backgroundColor ="#fff";
                    this.widgetTitleColor = "#171717";
                    this.descColor = "#000";
                    this.linkColor = dbncolor;
                }
                html = this.layoutWixReloaded(this.widget.data, parentWidth);
                break;
            case 25:
                if (typeof (dbncolor) != 'undefined') {
                    //this.backgroundColor ="#fff";
                    this.widgetTitleColor = "#171717";
                    this.descColor = "#000";
                    this.linkColor = dbncolor;

                }
                html = this.rectangleHoveredWShadowLayout(this.widget.data, parentWidth);
                break;
            case 26:
                if (typeof (dbncolor) != 'undefined') {
                    //this.backgroundColor ="#fff";
                    this.widgetTitleColor = "#171717";
                    this.descColor = "#000";
                    this.linkColor = dbncolor;

                }
                html = this.circleLayout(this.widget.data, parentWidth);
                break;
            case 27:
                if (typeof (dbncolor) != 'undefined') {
                    this.widgetTitleColor = "#171717";
                    this.descColor = "#000";
                    //this.linkColor = dbncolor;
                    this.linkColor = "#ffffff";

                    this.widget.dbnfont = "Helvetica";
                    this.widget.dbntitlefontsize = "12px;";
                }
                html = this.layoutBlueLarge(this.widget.data, parentWidth);
                break;
            case 28:
                if (typeof (dbncolor) != 'undefined') {
                    //this.backgroundColor ="#fff";
                    this.widgetTitleColor = "#171717";
                    this.descColor = "#000";
                    this.linkColor = dbncolor;

                }
                html = this.rectangleHoveredWShadow28Layout(this.widget.data, parentWidth);
                break;

        }

        if ((layout == 17 || layout == 20 || layout == 21) && postType1Exists) {
            window.data = this.widget.data;

            html += '<style type="text/css">.fb_partner_like {margin:5px auto 0 auto; height: 22px; overflow:hidden;}</style>';

            html += '<script>window.fb_interval = setInterval(function(){\
            if (typeof(FB) == "undefined")\
                return;\
            clearInterval(window.fb_interval);\
            debugger;\
            sprk_libs.jq(".fb_partner_like").each(function(){ FB.XFBML.parse(sprk_libs.jq(this).parent()[0]) });\
            FB.Event.subscribe("edge.create",\
                         function(response, e) {\
                         var postid = parseInt(e.getAttribute("data-postid"));\
                         for (var i=0; i<window.data.recs.length; i++)\
                         {\
                            if (window.data.recs[i].postId == postid) { \
                                git_layout.showLikeWindow(window.data.recs[i]); \
                            break;}\
                         }\
                         });\
                         },10)</script>';
        }

        return html;
    }

    git_layout.prototype.showLikeWindow = function(rec){
        var css = '<style>\
            .like_window {\
                position:fixed;width:100%;height:100%; top:0; left:0; z-index: 100;font-size: 14px; font-family: "lucida grande", tahoma, verdana, arial, sans-serif;\
            }\
            .like_window a{\
                color: #3B5998; text-decoration: none;\
            }\
            .like_window a:hover{\
                text-decoration: underline;\
            }\
            .like_window .inner{\
                width: 400px; height: 150px; top: 50%; left: 50%;margin: -75px 0 0 -200px; position: absolute;background-color: white;border:1px solid #555555\
            }\
            .like_window .header{\
                height: 25px; background-color: #6d84b4;\
            }\
            .like_window .header .title{\
                line-height: 25px; padding-left: 10px;color: white; font-weight: bold;\
            }\
            .like_window .content{\
                height: 69px;\
            }\
             .like_window .content{\
                color: black; font-size: 12px; font-weight: bold;padding-left: 10px;\
             }\
             .like_window .content a{\
            }\
            .like_window .footer{\
                height: 43px; border-top: 1px solid #cccccc; background-color: #f2f2f2; padding-left: 10px;\
            }\
            .like_window .footer .cancel{\
                font-size:11px; line-height: 43px; float:left;\
            }\
            .like_window .footer .like_btn{\
                margin-right: 10px;float: right; display:block;text-decoration:none;margin-top: 10px;height: 22px;border: 1px solid #29447e;background-color: #637bad;color: white;width: 87px;text-align: center;line-height: 22px;\
            }\
            </style>';

        var openPageString = navigator.userLanguage == 'ru' ? 'Открыть страницу' : 'Open page';
        var likePageString = navigator.userLanguage == 'ru' ? 'Как страницу' : 'Like page';
        var thankYouString = navigator.userLanguage == 'ru' ? 'Спасибо за Ваши оценки {0} странице!' : 'Thank you for Liking {0} page!';
        var cancelString = navigator.userLanguage == 'ru' ? 'отменить' : 'Cancel';
        var visitString = navigator.userLanguage == 'ru' ? 'посещение' : 'Visit';	
 
        sprk_libs.jq.ajax({
            type: "GET",
            dataType: 'jsonp',
            url: rec.clickUrl,
            async: true
        });

        var window = sprk_libs.jq('<div class="like_window">' +
            '<div class="inner">' +
            '<div class="header"><span class="title">' + likePageString +'</span></div>' +
            '<div class="content"><p>' + thankYouString.replace('{0}', rec.displayName) + '</p><p>'+ visitString +' <a class="page_link" target="_blank" href="' + rec.url +'">' + rec.displayName +'</a></p></div>' +
            '<div class="footer"><a class="cancel" href="javascript:void(0)">'+ cancelString +'</a><a class="like_btn" target="_blank" href="' + rec.url+'">'+ openPageString +'</div><div style="clear:both"></div></div>' +	    
            '</div>' +
            '</div>');

        sprk_libs.jq('body').append(sprk_libs.jq(css));
        sprk_libs.jq('body').append(window);

        sprk_libs.jq('.like_window a').click(function(){
            sprk_libs.jq('.like_window').remove();
        })
        
    }

    git_layout.prototype.shorten = function (s, n) {
        var origLength = s.length;
        var cut= s.indexOf(' ', n);
        if (cut == -1) {
            if (origLength <= n)  return s;
            else return s.substring(0, n)+ "...";
        }
        sS = s.substring(0, cut)
        if(sS.length < origLength) sS = sS + "...";
        return sS;
    }

    git_layout.prototype.shortenMod = function (s, n) {


        //$.trim(s);
        if(s.length>n){
            s=s.substring(0,n)+"...";
        }

        return s;
    }

    git_layout.prototype.getHost = function (url) {
        var urlParts = url.split("/");

        if(urlParts.length>2 && urlParts[2].length>0) return urlParts[2].replace("www.","");
        else return url.replace("www","");
    }

    git_layout.prototype.imgHandler = function (i) {
        if(document.getElememtById('g_img_'+ this.idx +'_'+ i)){
            var r=document.getElememtById('g_img_'+ this.idx +'_'+ i).parent.parent;
            r.parent.removeChild(r);
            sprk_libs.jq('div#gslide_desc_'+ this.idx +'_'+i +' > div').html(this.shorten(this.widget.data.recs[i].description,200));
        }

    }

    git_layout.prototype.addTarget = function (webId) {
        var target = '';
        if (webId == 36097 || webId == 37303){
            target = 'target="_parent"';
        }
        else if (webId != this.widget.dbnwebid) {
            target = 'target="_blank"';
        }

        return target;
    }

    git_layout.prototype.thumbSize = function (thumb, category_id, size) {
        var lastIndex;

        if (thumb) {

            for (var i = 1; i <= 4; i++) {
                if (i == size) continue;
                lastIndex = thumb.lastIndexOf("_" + i + ".");
                if (lastIndex != -1) {
                    thumb = thumb.substr(0, lastIndex) + "_" + size + "." + thumb.substr(lastIndex + 3);
                    break;
                }
            }
        }
        else {
            thumb = layoutErrorImageHandling(null,category_id,size,this.baseUrl)
        }

        return thumb;
    }
	
    // *********** LAYOUTS ******
    git_layout.prototype.textBulletsWithIconLayout = function (data, parentWidth) {
        // layout 22
        var list_width=parentWidth-28; //28 = icon + row padding
        var maxElements = (data.recs.length > 6) ? 6 : data.recs.length;
        var chars=(list_width/8);
        var html,hoverColor,iconColor;
        var elID = "git_wrapper_" + this.idx;
        this.titleColor = this.titleColor || "inherit";

        if (this.bgColorType == 1) {
            hoverColor = "#dde";
            iconColor = this.titleColor || "#0d5ed6";
        } else {
            hoverColor = "#efefef";
            iconColor = this.titleColor || "#0d5ed6";
        }

        if (this.widget.dbndirection == "rtl") {
            var extraCss = "float:right;text-align:right;direction: rtl;";
            var extraCss2 = "float:right;text-align:right;direction: rtl;margin-right:5px;";
        }

        var gslide_domain_css = "padding:0px;";
        var gslide_domain_css = "padding-left: 10px;font-size:9px; font-weight:normal; font-family:" + this.widget.dbnfont + "; color:#bbb; text-decoration:none; font-style: italic;";

        html = '<style type="text/css">';
        html += '#' + elID + ' {display:inline-block;margin:10px 0px 10px 10px;background-color:' + this.backgroundColor + ';}';
        html += '#' + elID + ' h2 {margin-bottom:5px;font-size:' + this.widget.dbntitlefontsize + 'px; font-weight:bold;color:' + this.titleColor + ';' + extraCss + '}';
        html += '#' + elID + ' h3 {float:left;clear:none !important;font-family:' + this.widget.dbnfont + ';line-height:16px;padding:0px;margin:3px 0 0;font-size:inherit;color:' + this.titleColor + ';font-weight:normal;' + extraCss2 + '}';
        html += '#' + elID + ' ul {padding:0;margin:0;list-style:none;}';
        html += '#' + elID + ' ul li {float:left;background:none;border:none;padding:0;margin:0;width:'+list_width+'px;clear:both;padding:6px;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;}';
        html += '#' + elID + ' ul li:hover {box-shadow:0px 0px 3px #666;-moz-box-shadow:0px 0px 3px #666;-webkit-box-shadow:0px 0px 3px #666;}';
        if (this.bgColorType != 1) {
            html += '#' + elID + ' ul li:hover {background-color:white;}';
        }

        html += '#' + elID + ' ul li:last-child {border:none;}';
        html += '#' + elID + ' ul li a {float:left;text-decoration:none;width:100%;}';
        html += '#' + elID + ' ul li a span.icon {float: left;background-color: '+iconColor+';border-radius: 4px;color: white;padding: 0px 6px 1px 6px;font-size: 14px;line-height: 18px;margin-top: 1px;margin-right: 5px;'+extraCss+'}';

        html += '#' + elID + ' ul li a div {padding:2px;border:solid 1px ' + hoverColor + ';background-color:transparent;float:left;margin-bottom:5px;}';
        html += '#' + elID + ' ul li a div img {border:none;float:left;padding:0 !important;}';
        html += '#' + elID + ' .post_here {position:absolute;margin-right:10px;bottom:3px;}';
        html += '#' + elID + ' .post_here a {text-align:right; font-size:8px; color:#BBBBBB !important; font-weight:bold; text-decoration:none}';


        html += '</style>';
        html += '<div id="'+ elID +'">';
        html += '<h2>' + this.titleText + '</h2>';
        html += '<ul>';

        for (i = 0; i < maxElements; i++) {
            var domain = this.domainname(data.recs[i].recType, data.recs[i].url, data.recs[i].displayName, 20);
            var post_link = this.addTarget(data.recs[i].partner_id) +
                ' href="' + data.recs[i].url +
                '" onclick="sprk_click(this,\'' + data.recs[i].clickUrl + '\');"';

            html += '<li>';
            html += '<a ' + post_link + ' title="' + data.recs[i].title + '">';
            html += '<span class="icon">&raquo;</span>';
            html += '<h3>' + this.shortenMod(data.recs[i].title,chars) + '</h3>';
            if (domain)
                html += '<span class="gslide_domain" ' + post_link + '" style="' + gslide_domain_css + '">(' + domain + ')</span>';
            html += '</a>';
            html += '</li>';
        }
        html += '</ul>';
        html += this.getBranding(data.srcAdminNetworkId, 1);
        html += '</div>';

        return html;
    }

    git_layout.prototype.LinkWithinLayout = function (data, parentWidth) {
        // layout 19
        var elWidth = 119;
        var maxElements = Math.floor(parseInt(parentWidth) / elWidth);
        if (data.recs.length <= maxElements) {
            maxElements = data.recs.length;
        }
        var hoverColor;
        var html;
        var elID = "git_wrapper_" + this.idx;

        if (this.bgColorType == 1) {
            hoverColor = "#dde";
        } else {
            hoverColor = "#efefef";
        }

        var gslide_domain_css = "display:block;padding: 0px; margin:0px;border: none;bottom: 0px;";
        gslide_domain_css += "font-size:11px; font-weight:normal; font-family:" + this.widget.dbnfont + "; color:#bbb; text-decoration:none; font-style: italic;";
        html  = '<style type="text/css">';
        html += '#' + elID + ' {display:inline-block;margin:10px 0px;background-color:' + this.backgroundColor + '}';
        html += '#' + elID + ' h2 {font-size:' + this.widget.dbntitlefontsize + 'px; font-weight:bold;color:' + this.widgetTitleColor + ';}';
        html += '#' + elID + ' h3 {font-family:' + this.widget.dbnfont + ';line-height:19px;padding:0px;margin:0px;font-size:12px;color:' + this.titleColor + ';font-weight:normal;max-height:' + (this.widget.dbnwebid == 30665 ? '92' : '54') + 'px;overflow:hidden;display:inline-block;}';
        html += '#' + elID + ' ul {padding:0;margin:0;list-style:none;max-height:189px;overflow:hidden;}';
        html += '#' + elID + ' ul li {float:left;background:none;border:none;padding:0;margin:0;width:106px;padding:6px;border-right:solid 1px ' + hoverColor + ';min-height:175px;overflow: hidden;}';
        html += '#' + elID + ' ul li.first {border-left:solid 1px transparent;}';
        html += '#' + elID + ' ul li.noBorder {border-right:solid 1px transparent;}';
        html += '#' + elID + ' ul li:hover {background-color:' + hoverColor + ';padding-bottom:2px !important;padding-top:6px;}';
        html += '#' + elID + ' ul li.facebook:hover {background-color:#eaedf4;border:solid 1px #cbd3e6;}';
        html += '#' + elID + ' ul li.facebook h3 {height:38px;}';
        html += '#' + elID + ' ul li.facebook iframe {visibility:hidden;}';
        html += '#' + elID + ' ul li.facebook:hover .like_facebook {}';
        html += '#' + elID + ' ul li:last-child {border:none;}';
        html += '#' + elID + ' ul li a {float:left;text-decoration:none;}';
        html += '#' + elID + ' ul li a div {padding:2px;border:solid 1px ' + hoverColor + ';background-color:transparent;float:left;margin-bottom:5px;position:relative;}';
        html += '#' + elID + ' ul li a div img {border:none !important;float:left;padding:0 !important;position:relative;z-index:1;}';
        html += '#' + elID + ' .post_here {float:right;margin-top:20px;clear:both;}';
        html += '#' + elID + ' .post_here a {text-align:right; font-size:8px; color:#BBBBBB !important; font-weight:bold; text-decoration:none}';
        html += '#' + elID + ' .like_facebook {float:left;margin-top:5px;min-width:85px;height:20px;background:url("' + this.baseUrl + 'img/facebook-counter-bg.png") no-repeat left;border:none;}';
        html += '#' + elID + ' .like_facebook span {float:right;height:20px;font-size:10px;font-family:Arial;color:black;background:url("' + this.baseUrl + 'img/facebook-counter-repeat.png") repeat-x;border-right:solid 1px #c1c1c1;border-top: none;border-bottom: none;margin-top: 1px;height: 18px;margin-right: 2px;padding-right: 6px;line-height: 18px;}';

        html += '#' + elID + ' .post_here {margin-right:10px;bottom:3px;}';
        html += '#' + elID + ' .post_here.align_left{float:left}';
        html += '#' + elID + ' .post_here a {text-align:right; font-size:8px; color:#BBBBBB !important; font-weight:bold; text-decoration:none}';

        html += '#' + elID + ' .post_here img{padding: 0px !important;background: none !important;border: none !important;-moz-box-shadow: none !important;-webkit-box-shadow: none !important;box-shadow: none !important;}';

        html += '</style>';
        html += '<div id="'+ elID +'">';
        html += '<h2>' + this.titleText + '</h2>';
        html += '<ul>';

        for (i = 0; i < maxElements; i++) {
            var post_title = data.recs[i].title;
            var domain = this.domainname(data.recs[i].recType, data.recs[i].url, data.recs[i].displayName, 20);
            var post_link = this.addTarget(data.recs[i].partner_id) +
                ' href="' + data.recs[i].url +
                '" onclick="sprk_click(this,\'' + data.recs[i].clickUrl + '\');"';
            var post_type = data.recs[i].postType;
            var post_title = data.recs[i].title;

            if(post_type==1) {
                var extraDetails = post_title.split("@");
                post_title = extraDetails[0];
                extraDetails = extraDetails[1].split(",");
                var countLikes = 0;
                if (extraDetails[0])  {
                    countLikes = extraDetails[0].replace("L","");
                }
                var countComments = 0;
                if (extraDetails[1])  {
                    countComments = extraDetails[1].replace("C","");
                }

            }

            var li_class = "";
            if(post_type==1) { li_class = 'facebook '; }
            if(i==0) { li_class += "first "}

            var img= this.thumbSize(data.recs[i].thumbnail_path,data.recs[i].category_id,3);

            html += '<li class="'+li_class+'"">';
            html += '<a ' + post_link + ' title="' + data.recs[i].title + '">';
            html += '<div class="git_post_image' + i + '">';
            html += '<img onerror="layoutErrorImageHandling(this,' + data.recs[i].category_id + ',3,\''+this.baseUrl+'\')"   src="'+ img +'"  alt="" />';
            if(post_type==1)
            {
                html += '<img onerror="this.style.display=\'none\';"  src="' + this.baseUrl + 'img/facebook-like.png" style="position:absolute;z-index:2;left:2px;bottom:2px;"  alt="" />';
            }
            html += '</div>';
            html += '<h3>' + this.shorten(post_title,60) + '</h3>';

            if(post_type==1 && countLikes>0)
            {
                // html += '<iframe src="//www.facebook.com/plugins/like.php?href='+encodeURIComponent(data.recs[i].clickUrl)+'&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;font&amp;colorscheme=light&amp;action=like&amp;height=21&amp;appId=248458955273978" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px;margin-top:5px;display:inline-block;" allowTransparency="true"></iframe>';
                html += '<div class="like_facebook"><span>'+countLikes+'</span></div>';
            }
            else if (domain)
                html += '<div class="gslide_domain" style="' + gslide_domain_css + '">(' + domain + ')</div>';

            html += '</a>';
            html += '</li>';
        }
        html += '</ul>';
        html += this.getBranding(data.srcAdminNetworkId, 1);
        html += '</div>';

        return html;
    }

    git_layout.prototype.Shadow4ImagesLayout130 = function (data, parentWidth) {
        // layout 23
        var elWidth = 156;
        var maxElements = Math.floor(parseInt(parentWidth) / elWidth);
        if (data.recs.length <= maxElements) {
            maxElements = data.recs.length;
        }
        var hoverColor;
        var html;
        var elID = "git_wrapper_" + this.idx;

        if (this.bgColorType == 1) {
            hoverColor = "#dde";
        } else {
            hoverColor = "#efefef";
        }

        if (this.widget.dbndirection == "rtl") {
            var extraCss = "float:right;text-align:right;direction: rtl;width:100%;";
            var extraCss2 = "float:right;text-align:right;direction: rtl;margin-right:5px;";
        }

        var gslide_domain_css = "padding:0px;";
        var gslide_domain_a_css = "display:block;padding: 0px 0px 0px 6px; margin:0px;";
        gslide_domain_a_css += "font-size:11px; font-weight:normal; font-family:" + this.widget.dbnfont + "; color:#bbb; text-decoration:none; font-style: italic;";

        html = '<style type="text/css">';
        html += '#' + elID + ' {display:inline-block;margin:10px 0px 10px 10px;background-color:' + this.backgroundColor + '}';
        html += '#' + elID + ' h2 {margin-bottom:5px;font-size:' + this.widget.dbntitlefontsize + 'px; font-weight:bold;color:' + this.widgetTitleColor + ';' + extraCss + '}';

        html += '#' + elID + ' h3 {font-family:' + this.widget.dbnfont + ';overflow:hidden;padding:0px;display:inline-block;margin:0px 0 0;font-size:12px;color:' + this.titleColor + ';font-weight:normal;margin-left:7px;width:90%;' + extraCss2 + '}';
        html += '#' + elID + ' ul {padding:0;margin:0;list-style:none;}';
        html += '#' + elID + ' ul li {float:left;background:none;border:none;padding:0;margin:0;width:143px;padding:6px;border-right:solid 1px ' + hoverColor + ';min-height:204px;max-height:204px;overflow:hidden;margin-bottom:20px;}';


        html += '#' + elID + ' ul li:first-child {padding-left:0px;}';


        html += '#' + elID + ' ul li:hover {border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;box-shadow:0px 0px 3px #ccc;-moz-box-shadow:0px 0px 3px #ccc;-webkit-box-shadow:0px 0px 3px #ccc;}';
        html += '#' + elID + ' ul li:last-child {border:none;}';
        html += '#' + elID + ' ul li a {float:left;text-decoration:none;}';
        html += '#' + elID + ' ul li.noBorder {border-right:solid 1px transparent;}';
        html += '#' + elID + ' ul li a div {padding:2px;background-color:transparent;float:left;margin-bottom:5px;margin-left:5px;position:relative;}';
        html += '#' + elID + ' ul li a div img {border:none;float:left;box-shadow: 0 8px 7px -4px #888;-moz-box-shadow: 0 8px 7px -4px #888;-webkit-box-shadow: 0 8px 7px -4px #888;position:relative;z-index:1;}';
        html += '#' + elID + ' .post_here {position:relative;margin-right:10px;bottom:3px;}';
        html += '#' + elID + ' .post_here a {text-align:right; font-size:8px; color:#BBBBBB !important; font-weight:bold; text-decoration:none}';

        html += '#' + elID + ' .like_facebook {float:left;margin: 0px 0px 0px 8px;min-width:85px;height:20px;background:url("' + this.baseUrl + 'img/facebook-counter-bg.png") no-repeat left;border:none;}';
        html += '#' + elID + ' .like_facebook span {float:right;height:20px;font-size:10px;font-family:Arial;color:black;background:url("' + this.baseUrl + 'img/facebook-counter-repeat.png") repeat-x;border-right:solid 1px #c1c1c1;border-top: none;border-bottom: none;margin-top: 1px;height: 18px;margin-right: 0px;padding-right: 6px;line-height: 18px;}';


        html += '</style>';
        html += '<div id="' + elID + '">';
        html += '<h2>' + this.titleText + '</h2>';
        html += '<ul>';

        for (i = 0; i < maxElements; i++) {
            var post_title = data.recs[i].title;
            var domain = this.domainname(data.recs[i].recType, data.recs[i].url, data.recs[i].displayName,20);
            var post_link = this.addTarget(data.recs[i].partner_id) +
                ' href="' + data.recs[i].url +
                '" onclick="sprk_click(this,\'' + data.recs[i].clickUrl + '\');"';
            var post_type = data.recs[i].postType;

            var li_class = "";
            if (post_type == 1) { li_class = 'facebook '; }
            var img = this.thumbSize(data.recs[i].thumbnail_path, data.recs[i].category_id, 4);

            if (post_type == 1) {
                var extraDetails = post_title.split("@");
                var post_title = extraDetails[0];
                extraDetails = extraDetails[1].split(",");
                var countLikes = extraDetails[0].replace("L", "");
                var countComments = extraDetails[1].replace("C", "");
            }

            html += '<li class="' + li_class + '">';
            html += '<a ' + post_link + ' title="' + data.recs[i].title + '">';
            html += '<div class="git_post_image' + i + '">';
            html += '<img onerror="layoutErrorImageHandling(this,' + data.recs[i].category_id + ',4,\''+this.baseUrl+'\')"  src="'+ img +'"  alt="" />';
            if (post_type == 1) {
                html += '<img onerror="this.style.display=\'none\';"  src="' + this.baseUrl + 'img/facebook-like.png" style="position:absolute;z-index:2;left:2px;bottom:2px;"  alt="" />';
            }
            html += '</div>';

            var h3_style = "";

            if ((post_type == 1 && countLikes > 0) || domain)
                h3_style = "line-height:19px;height:41px";
            else
                h3_style = "line-height:21px;height:63px";

            html += '<h3 style="' + h3_style + '">' + this.shorten(data.recs[i].title, 60) + '</h3>';
            html += '</a>';

            if (post_type == 1 && countLikes > 0) {
                html += '<div class="like_facebook"><span>' + countLikes + '</span></div>';
            }
            else if (domain)
                html += '<div class="gslide_domain" style="' + gslide_domain_css + '"><a class="gslide_domain_a" ' + post_link + '" style="' + gslide_domain_a_css + '">(' + domain + ')</a></div>';

            html += '</li>';
        }
        html += '<div style="clear: both"></div>';
        html += '</ul>';
        html += this.getBranding(data.srcAdminNetworkId, 1);
        html += '</div>';

        return html;
    }

    git_layout.prototype.layoutWixReloaded = function (data, parentWidth) {
        // layout 24
        var elWidth = 156;
        var maxElements = Math.floor(parseInt(parentWidth) / elWidth);
        if (dbnwix) maxElements = 4;
        if (data.recs.length <= maxElements) {
            maxElements = data.recs.length;
        }
        var hoverColor, hoverColor2;
        var html;
        var elID = "git_wrapper_" + this.idx;

        if (this.bgColorType == 1) {
            hoverColor = "#dde";
            hoverColor2 = "transparent";
        } else {
            hoverColor = "#efefef";
            hoverColor2 = "white";
        }

        if (this.widget.dbndirection == "rtl") {
            var extraCss = "float:right;text-align:right;direction: rtl;width:100%;";
            var extraCss2 = "float:right;text-align:right;direction: rtl;margin-right:15px;";
        }

        var gslide_domain_css = "padding:0px;";
        var gslide_domain_a_css = "display:block;padding: 5px 0px 0px 11px; margin:0px;";
        gslide_domain_a_css += "font-size:11px; font-weight:normal; font-family:" + this.widget.dbnfont + "; color:#bbb; text-decoration:none; font-style: italic;";

        html = '<style type="text/css">';
        html += '#' + elID + ' {display:inline-block;margin:10px 0px 10px 10px;background-color:' + this.backgroundColor + '}';
        html += '#' + elID + ' h2 {margin-bottom:5px;font-size:' + this.widget.dbntitlefontsize + 'px; font-weight:bold;color:' + this.widgetTitleColor + ';' + extraCss + '}';
        html += '#' + elID + ' h3 {vertical-align:top;font-family:' + this.widget.dbnfont + ';padding:0px;display:inline-block;margin:-8px 0 0;font-size:inherit;color:' + this.linkColor
            + ';font-weight:normal;margin-left:12px;width:84%;overflow:hidden;' + extraCss2 + '}';
        html += '#' + elID + ' ul {padding:0;margin:0;list-style:none;}';
        html += '#' + elID + ' ul li {float:left;background:none;border:none;padding:0;margin:0;width:143px;padding:6px;border-right:solid 1px ' + hoverColor + ';min-height:208px;max-height:208px;overflow:hidden;margin-bottom:20px;padding-bottom:10px;padding-left:0px;}';

        html += '#' + elID + ' ul li:first-child {padding-left:0px;}';

        html += '#' + elID + ' ul li:hover {background-color:' + hoverColor2 + ';border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;box-shadow:1px 1px 4px #666;-moz-box-shadow:1px 1px 4px #666;-webkit-box-shadow:1px 1px 4px #666;}';
        html += '#' + elID + ' ul li:last-child {border:none;}';
        html += '#' + elID + ' ul li.noBorder {border-right:solid 1px transparent;}';
        html += '#' + elID + ' ul li a {float:left;text-decoration:none;}';
        html += '#' + elID + ' ul li a div {padding:2px 10px;background-color:transparent;float:left;margin-bottom:5px;background-image:url("' + this.baseUrl + 'img/shadow_bipos.png");background-position:bottom;padding-bottom:11px;background-repeat:no-repeat;margin-left:-3px;position:relative;}';
        html += '#' + elID + ' ul li a div img {border:none;float:left;position:relative;z-index:1;}';
        html += '#' + elID + ' .post_here {position:absolute;margin-right:10px;bottom:3px;}';
        html += '#' + elID + ' .post_here a {text-align:right; font-size:8px; color:#BBBBBB !important; font-weight:bold; text-decoration:none}';

        html += '#' + elID + ' .like_facebook {float:left;margin-top:4px;margin-left:12px;min-width:85px;height:20px;background:url("' + this.baseUrl + 'img/facebook-counter-bg.png") no-repeat left;border:none;}';
        html += '#' + elID + ' .like_facebook span {float:right;height:20px;font-size:10px;font-family:Arial;color:black;background:url("' + this.baseUrl + 'img/facebook-counter-repeat.png") repeat-x;border-right:solid 1px #c1c1c1;border-top: none;border-bottom: none;margin-top: 1px;height: 18px;margin-right: 0px;padding-right: 6px;line-height: 18px;}';

        html += '</style>';
        html += '<div id="' + elID + '">';
        html += '<h2>' + this.titleText + '</h2>';
        html += '<ul>';

        for (i = 0; i < maxElements; i++) {
            var post_title = data.recs[i].title;
            var domain = this.domainname(data.recs[i].recType, data.recs[i].url, data.recs[i].displayName, 20);
            var post_link = this.addTarget(data.recs[i].partner_id) +
                ' href="' + data.recs[i].url +
                '" onclick="sprk_click(this,\'' + data.recs[i].clickUrl + '\');"';
            var post_type = data.recs[i].postType;

            var li_class = "";
            if (post_type == 1) { li_class = 'facebook '; }
            if (i == 0) { li_class += "first " }
            var img = this.thumbSize(data.recs[i].thumbnail_path, data.recs[i].category_id, 4);

            if (post_type == 1) {
                var extraDetails = post_title.split("@");
                var post_title = extraDetails[0];
                extraDetails = extraDetails[1].split(",");
                var countLikes = extraDetails[0].replace("L", "");
                var countComments = extraDetails[1].replace("C", "");
            }

            html += '<li class="' + li_class + '">';
            html += '<a ' + post_link + ' title="' + data.recs[i].title + '">';
            html += '<div class="git_post_image' + i + '">';
            html += '<img onerror="layoutErrorImageHandling(this,' + data.recs[i].category_id + ',4,\''+this.baseUrl+'\')"  src="'+ img +'"  alt="" />';
            if (post_type == 1) {
                html += '<img onerror="this.style.display=\'none\';"  src="' + this.baseUrl + 'img/facebook-like.png" style="position:absolute;z-index:2;left:10px;bottom:11px;"  alt="" />';
            }
            var h3_style = "";

            if ((post_type == 1 && countLikes > 0) || domain)
                h3_style = "line-height:19px;height:54px";
            else
                h3_style = "line-height:21px;height:63px";

            html += '</div>';
            html += '<h3 style="' + h3_style + '">' + this.shorten(data.recs[i].title, 60) + '</h3>';
            html += '</a>';

            if (post_type == 1 && countLikes > 0) {
                html += '<div class="like_facebook"><span>' + countLikes + '</span></div>';
            }
            else if (domain)
                html += '<div class="gslide_domain" style="' + gslide_domain_css + '"><a class="gslide_domain_a" ' + post_link + '" style="' + gslide_domain_a_css + '">(' + domain + ')</a></div>';


            html += '</li>';
        }
        html += '</ul>';
        html += this.getBranding(data.srcAdminNetworkId, 1);
        html += '</div>';

        return html;
    }

    git_layout.prototype.rectangleHoveredWShadowLayout = function (data, parentWidth) {
        //layout 25
        var elWidth = 145;
        var maxElements = Math.floor(parseInt(parentWidth) / elWidth);
        if (dbnwix) maxElements = 4;
        if (data.recs.length <= maxElements) {
            maxElements = data.recs.length;
        }
        var hoverColor,hoverColor2;
        var html;
        var elID = "git_wrapper_" + this.idx;

        if(this.bgColorType==1)
        {
            hoverColor = "#dde";
            hoverColor2 = "transparent";
        } else
        {
            hoverColor = "#efefef";
            hoverColor2 = "white";
        }

        if(this.widget.dbndirection == "rtl")
        {
            var extraCss = "float:right;text-align:right;direction: rtl;width:100%;";
            var extraCss2 = "float:right;text-align:right;direction: rtl;margin-right:15px;";
        }
        var your_post_here_css = "font-family:"+ this.widget.dbnfont +";position:absolute; top:135px;right:0;"+
            "text-align:right; font-size:8px; color:#BBBBBB;"+
            " font-weight:bold; text-decoration:none";

        var title_bar_css = "position:relative; z-index:99999999; left:0; height:28px;";

        html = '<style type="text/css">';
        html += '#' + elID + '{';
        html += 'height:150px;width:100%;position:relative;margin-top:20px;overflow:hidden;';
        html += '}';
        html += '.engageya_case25_image{';
        html += 'width:142px; height:98px; float:left;';
        html += 'position:relative; float:left;';
        html += 'margin-left:10px;';
        html += '}';
        html += '.engageya_case25_imageHover{';
        html += 'display:none;';
        html += 'background-color: rgba(36,36,36,0.8); color: #e6e3dc;';
        html += 'bottom: 0; z-index:1;';
        html += 'position:absolute;';
        html += 'width:142px; height:auto; max-height: 98px;';
        html += '}';
        html += '.engageya_case25_imageHover_text{'
        html += 'font-style: inherit; font-family:'+ this.widget.dbnfont +';font-size: 14px; padding:8px;';
        html += '}';

        html += '</style>';
        html += '<div id="'+ elID +'">';
        html += '<div id="git_title_bar" style="font-family:'+ this.widget.dbnfont +';' + title_bar_css + '"><span style="font-size:12px;font-weight:bold;margin-left:0px;">'+this.titleText+'</span></div>' ;

        for (i = 0; i < maxElements; i++) {
            var post_link = this.addTarget(data.recs[i].partner_id) +
                ' href="' + data.recs[i].url +
                '" onclick="sprk_click(this,\'' + data.recs[i].clickUrl + '\');"';
            var post_type = data.recs[i].postType;

            var img= this.thumbSize(data.recs[i].thumbnail_path,data.recs[i].category_id,2);
            var text= this.shorten(data.recs[i].title,48);

            html += '<a ' + post_link + ' class="engageya_case25_image" onmouseover="this.childNodes[2].style.display=\'block\';" onmouseout="this.childNodes[2].style.display=\'none\';"> <img style="border:0px;background-size:100% 100%;width:100%;height:100%;padding: 0 0 0 0;" onerror="layoutErrorImageHandling(this,' + data.recs[i].category_id + ',4,\''+this.baseUrl+'\')" src="'+ img +'" />';
            html += '<div class="engageya_case25_imageHover"><div class="engageya_case25_imageHover_text">' + text + '</div></div>';
            html += '</a>';
        }

        html += '<a style="' + your_post_here_css + '" href="http://www.engageya.com/widgets/new/?ref=27839" target="_blank">ENGAGEYA</a>';
        html += '</div>';
        return html;
    }

    git_layout.prototype.rectangleHoveredWShadow28Layout = function (data, parentWidth) {
        //layout 28
        var elWidth = 130;
        var maxElements = Math.floor((parseInt(parentWidth) - 300) / elWidth) * 2;
        if (dbnwix) maxElements = 4;
       
	var tmpMaxElements = maxElements
        if (data.recs.length <= maxElements) {
	   tmpMaxElements = data.recs.length;
	   maxElements = data.recs.length;
           if (data.recs.length % 2 != 0) {              
                tmpMaxElements = tmpMaxElements + 1;
            }        
        }

	var items_container_width = tmpMaxElements / 2 * elWidth;
	
        var hoverColor, hoverColor2;
        var html;
        var elID = "git_wrapper_" + this.idx;

        var your_post_here_css = "font-family:" + this.widget.dbnfont /*+ ";position:absolute; top:135px;right:0;"*/ +
            "text-align:right; font-size:8px; color:#BBBBBB;" +
            " font-weight:bold; text-decoration:none";

        var title_bar_css = "position:relative; z-index:99999999; left:0; height:28px;";
        var gslide_domain_css = "letter-spacing: 0px !important;display:block; position: absolute; bottom:0; left:0;font-size: 11px;font-weight: normal;color: #bbb;text-decoration: none;font-family: inherit;padding: 0px 0px 4px 7px;";
        gslide_domain_css += "font-family:" + this.widget.dbnfont + ";" + 'color: ' + data.widget.fontColor;
        html = '<style type="text/css">';

        html += '.post_here_link {' + your_post_here_css + '}';
        html += '#' + elID + '{';
        html += 'height:300px;width:100%;position:relative;margin-top:20px;overflow:hidden;';
        html += '}';
        html += '.engageya_case25_image{';
        html += 'width:120px; height:120px; float:left;';
        html += 'position:relative; float:left;';
        html += 'margin-left:10px; margin-bottom: 10px;';
        html += '}';
        html += '.engageya_case25_imageHover{';
        html += 'display:none;';
        html += 'background-color: #363636;opacity: 0.8; filter:alpha(opacity=80);; color: #e6e3dc;';
        html += 'top: 0;left: 0; z-index:1;';
        html += 'position:absolute;';
        html += 'width:100%; height:100%;';
        html += '}';
        html += '.engageya_case25_imageHover_text{'
        html += 'font-style: inherit; display:block; color:#ffffff; font-family:' + this.widget.dbnfont + ';font-size: ' + data.widget.titleFontSize + 'px; padding: 8px 8px 0px 8px;max-height: 75px;overflow: hidden;';
        html += '}';

        html += "#" + elID + ' a { text-decoration: none; }';

        html += '#' + elID + ' .post_here {position:absolute;margin-right:10px;bottom:3px;}';
        html += '#' + elID + ' .post_here.her_campus{bottom:-3px !important;}';
        html += '#' + elID + ' .post_here a {text-align:right; font-size:8px; color:#BBBBBB !important; font-weight:bold; text-decoration:none}';

        html += '</style>';
        html += '<div id="' + elID + '">';
        html += '<div id="git_title_bar" style="font-family:' + this.widget.dbnfont + ';' + title_bar_css + '"><span style="font-size:12px;font-weight:bold;margin-left:0px;">' + this.titleText + '</span></div>';
        ////
        //html += '<SCRIPT TYPE="text/javascript" SRC="ads.js"></SCRIPT>';
	if (this.widget.dbnwebid == 28714 || this.widget.dbnwebid == 15383){
		html += '<iframe style="width: 310px; height: 260px; border: 0; float:left; display: block;" src="' + grazeBaseUrl + 'ads_yb_d.html"></iframe>';
	}	
	else if (data.srcAdminNetworkId == 8){
		html += '<iframe style="width: 300px; height: 250px; border: 0; float:left; display: block;" src="' + grazeBaseUrl + 'ads_httpool.html"></iframe>';
	}
	else if (data.srcAdminNetworkId == 9){
		html += '<iframe style="width: 300px; height: 250px; border: 0; float:left; display: block;" src="' + grazeBaseUrl + 'ads_yb_al.html"></iframe>';
	}
	else if (data.srcAdminNetworkId == 10){
		html += '<iframe style="width: 300px; height: 250px; border: 0; float:left; display: block;" src="' + grazeBaseUrl + 'ads_yb_genesis.html"></iframe>';
	}
	
	else if (data.srcAdminNetworkId == 11){
		html += '<iframe style="width: 300px; height: 250px; border: 0; float:left; display: block;" src="' + grazeBaseUrl + 'ads_yb_punhon.html"></iframe>';
	}
	
	else if (data.srcAdminNetworkId == 12){
		html += '<iframe style="width: 300px; height: 250px; border: 0; float:left; display: block;" src="' + grazeBaseUrl + 'ads_yb_affinity.html"></iframe>';
	}
	        
        html += '<div id="items_container" style="float:left; width: ' + items_container_width + 'px;">';

        for (i = 0; i < maxElements; i++) {
            var post_title = data.recs[i].title;
            var domain = this.domainname(data.recs[i].recType, data.recs[i].url, data.recs[i].displayName, 20);
            var post_link = this.addTarget(data.recs[i].partner_id) +
                ' href="' + data.recs[i].url +
                '" onclick="sprk_click(this,\'' + data.recs[i].clickUrl + '\');"';

            var img = this.thumbSize(data.recs[i].thumbnail_path, data.recs[i].category_id, 4);
            var text = this.shorten(data.recs[i].title, 30);

            html += '<div class="engageya_case25_image"> <img style="border:0px;background-size:100% 100%;width:100%;height:100%;padding: 0 0 0 0;" onerror="layoutErrorImageHandling(this,' + data.recs[i].category_id + ',4,\'' + this.baseUrl + '\')" src="' + img + '" />';
            html += '<span class="engageya_case25_imageHover" style="left:0;"><a ' + post_link + 'style="letter-spacing: 0px !important;line-height: 22px !important;" class="engageya_case25_imageHover_text">' + text + '</a>';

            if (domain) {
                html += '<a class="gslide_domain" target="_blank" href="http://' + domain + '" style="' + gslide_domain_css + '">' + this.shorten(domain, 16) + '</a>';
            }

            html += '</span>';
            html += '</div>';
        }
        html += '<div style="clear: both"></div><div style="clear: both"></div></div>';
        html += this.getBranding(data.srcAdminNetworkId, data.languageId);
        html += '</div>';

        return html;
    }


    git_layout.prototype.circleLayout = function (data, parentWidth) {
        // layout 26
        var elWidth = 150;
        var maxElements = Math.floor(parseInt(parentWidth) / elWidth);
        if (dbnwix) maxElements = 4;
        if (data.recs.length <= maxElements) {
            maxElements = data.recs.length;
        }
        var hoverColor,hoverColor2;
        var html;
        var elID = "git_wrapper_" + this.idx;

        if(this.bgColorType==1)
        {
            hoverColor = "#dde";
            hoverColor2 = "transparent";
        } else
        {
            hoverColor = "#efefef";
            hoverColor2 = "white";
        }

        var title_bar_css = "position:relative; z-index:99999999; left:0px; height:28px;";
        var your_post_here_css = "font-family:" + this.widget.dbnfont /*+ ";position:absolute; top:264px;right:0;"*/ +
            "text-align:right; font-size:8px; color:#BBBBBB;" +
            " font-weight:bold; margin-right: 5px; text-decoration:none";

        var gslide_domain_css = "display: block;padding-top: 0px;margin-top: -5px;font-size: 11px;font-weight: normal;color: #bbb;text-decoration: none;font-style: italic;text-align: center;";
        gslide_domain_css += "font-family:" + this.widget.dbnfont + ";";

        html = '<style type="text/css">';
        html += '.post_here_link {' + your_post_here_css + '}';

        html += '#' + elID + '{';
        html += 'font-family:'+ this.widget.dbnfont +';background-color:white;position:relative;top:20px;width:100%;clear:both;';

        html += 'border-top: 1px solid #d6d6d6; border-bottom: 1px  #d6d6d6 solid;';
        html += 'height:280px;';
        html += 'margin-bottom: 45px;';

        html += '}';
        html += '.engageya_case26_image{';
        html += 'width:130px; height:130px;';
        html += 'float:left;';
        html += 'position:relative; float:left;';
        html += 'margin-left:20px; top:10px;';
        html += '}';
        html += '.engageya_case26_image img{';
        html += 'border-style:solid; border-width:1px;';
        html += 'border-color: #eee; border-radius: 65px; -webkit-border-radius: 65px;';
        html += '-moz-border-radius: 65px;';
        html += '-webkit-transition: opacity .40s ease-in-out;-moz-transition: opactiy .40s ease-in-out;-ms-transition: opacity .40s ease-in-out;-o-transition: opacity .40s ease-in-out;transition: opacity .40s ease-in-out;';
        html += '}';
        html += '.engageya_case26_image img:hover{';
        html += 'opacity:0.8;';
        html += '}';
        html += '.engageya_case26_text{';
        html += 'text-align:center; font-family: inherit; font-style: inherit;';
        html += 'font-size: 12px; color: #000002;';
        html += 'margin-top:5px;line-height: 15px;';
        html += '}';
        html += '.like_facebook {float:left;margin-top:5px;margin-left:23px;min-width:85px;height:20px;background:url("' + this.baseUrl + 'img/facebook-counter-bg.png") no-repeat left;border:none;}';
        html += '.like_facebook span {float:right;height:20px;font-size:10px;font-family:Arial;color:black;background:url("' + this.baseUrl + 'img/facebook-counter-repeat.png") repeat-x;border-right:solid 1px #c1c1c1;border-top: none;border-bottom: none;margin-top: 1px;height: 18px;margin-right: 0px;padding-right: 6px;padding: 0px 9px;line-height: 18px;}';

        html += '#' + elID + ' .post_here {position:absolute;margin-right:0px;bottom:3px;}';
        html += '#' + elID + ' .post_here a {text-align:right; font-size:8px; color:#BBBBBB !important; font-weight:bold; text-decoration:none}';
        html += '#' + elID + ' .post_here img{padding: 0px !important;background: none !important;border: none !important;-moz-box-shadow: none !important;-webkit-box-shadow: none !important;box-shadow: none !important;}';

        html += '</style>';

        html += '<div id="'+ elID +'" style="padding-top: 15px;">';

        html += '<div id="git_title_bar" style="font-family:'+ this.widget.dbnfont +';' + title_bar_css + '"><span style="font-size:14px;font-weight:bold;margin-left:10px;">'+this.titleText+'</span></div>' ;

        for (i = 0; i < maxElements; i++) {
            var post_title = data.recs[i].title;
            var domain = this.domainname(data.recs[i].recType, data.recs[i].url, data.recs[i].displayName, 20);
            var post_link = this.addTarget(data.recs[i].partner_id) +
                ' href="' + data.recs[i].url +
                '" onclick="sprk_click(this,\'' + data.recs[i].clickUrl + '\');"';
            var post_type = data.recs[i].postType;

            var img= this.thumbSize(data.recs[i].thumbnail_path,data.recs[i].category_id,4);
            var post_title = data.recs[i].title;
            if (this.widget.dbnwebid == 34403) {
                var text= this.shorten(post_title,548);
            }
            else{
                var text= this.shorten(post_title,48);
            }

            if(post_type==1) {

                var extraDetails = post_title.split("@");
                post_title = extraDetails[0];
                extraDetails = extraDetails[1].split(",");
                var countLikes = 0;
                if (extraDetails[0])  {
                    countLikes = extraDetails[0].replace("L","");
                }
                var countComments = 0;
                if (extraDetails[1])  {
                    countComments = extraDetails[1].replace("C","");
                }
            }

            html += '<a style="text-decoration:none" ' + post_link + ' class="engageya_case26_image"> <img style="background-size:100% 100%;width:100%;height:100%" onerror="layoutErrorImageHandling(this,' + data.recs[i].category_id + ',4,\''+this.baseUrl+'\')" src="'+ img +'" />';
            html += '<div class="engageya_case26_text">' + text + '</div>';

            if(post_type==1 && countLikes>0)
            {
                html += '<div class="like_facebook"><span>'+countLikes+'</span></div>';
            }
            else if (domain)
                html += '<div style="' + gslide_domain_css + '">(' + domain + ')</div>';

            html += '</a>';
        }

		html += this.getBranding(data.srcAdminNetworkId, 1);
        html += '</div>';
        return html;
    }
    git_layout.prototype.layoutBlueLarge = function (data, parentWidth) {
        // layout 27
        var elWidth = 158;
        var maxElements = Math.floor(parseInt(parentWidth) / elWidth);
        if (dbnwix) maxElements = 4;
        if (data.recs.length <= maxElements) {
            maxElements = data.recs.length;
        }

        var html;
        var elID = "git_wrapper_" + this.idx;

        if (this.widget.dbndirection == "rtl") {
            var extraCss = "float:right;text-align:right;direction: rtl;width:100%;";
            var extraCss2 = "float:right;text-align:right;direction: rtl;margin-right:15px;";
        }

        var gslide_domain_css = "padding:0px;";
        var gslide_domain_a_css = "display:block;padding: 0px 0px 0px 7px; margin:0px;";
        gslide_domain_a_css += "font-size:11px; font-weight:normal; font-family:" + this.widget.dbnfont + "; color:#bbb; text-decoration:none; font-style: italic;";

        html = '<style type="text/css">';
        html += '#' + elID + ' {display:inline-block;width:100%;margin:10px 0px 10px 10px;position: relative;background-color:' + this.backgroundColor + '}';
        html += '#' + elID + ' h2 {margin-bottom:18px;padding-left: 10px;margin-top: 0px;padding-bottom: 5px;padding-top: 4px;background-color: #FFFFFF;font-size:' + this.widget.dbntitlefontsize + 'px; font-weight:bold;color:' + this.widgetTitleColor + ';' + extraCss + '}';
        html += '#' + elID + ' h3 {letter-spacing: 0px;vertical-align:top;text-transform: none;font-family:' + this.widget.dbnfont + ';padding:0px;display:inline-block;margin:-8px 0 0;font-size:12px;color:' + this.linkColor
            + ';font-weight:normal;margin-left:8px;width:84%;overflow:hidden;' + extraCss2 + '}';
        html += '#' + elID + ' ul {padding:0;margin:0;list-style:none;}';
        html += '#' + elID + ' ul li {float:left;background:none;border:none;padding:0;margin:0;width:141px;padding:6px;min-height:205px;max-height:205px;overflow:hidden;margin-bottom:25px;padding-bottom:10px;padding-left:0px;}';

        html += '#' + elID + ' ul li:first-child {padding-left:4px;}';
        //html += '#' + elID + ' ul li:last-child {}';

        html += '#' + elID + ' ul li{border-right: dashed 1px #ffffff;padding: 0px 14px 0px 0px;}';
        html += '#' + elID + ' ul li:last-child {border:none;}';

        //html += '#' + elID + ' ul li:hover {border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;box-shadow:1px 1px 4px #666;-moz-box-shadow:1px 1px 4px #666;-webkit-box-shadow:1px 1px 4px #666;}';
        html += '#' + elID + ' ul li.noBorder {border-right:solid 1px transparent;}';
        html += '#' + elID + ' ul li a {float:left;text-decoration:none;}';
        html += '#' + elID + ' ul li a div {padding:0px 7px;background-color:transparent;float:left;margin-bottom:3px;padding-bottom:11px;background-repeat:no-repeat;margin-left:0px;position:relative;}';
        html += '#' + elID + ' ul li a div img {border:none;float:left;position:relative;z-index:1;width: 142px !important;padding: 0px !important;max-width: 142px !important;}';

        //zxc
        html += '#' + elID + ' .post_here {position:absolute;margin-right:3px;bottom:3px;}';
        html += '#' + elID + ' .post_here a {text-align:right; font-size:8px; color:#BBBBBB !important; font-weight:bold; text-decoration:none}';

        html += '#' + elID + ' .post_here_link span {font-family: "Helvetica";}';

        html += '#' + elID + ' .like_facebook {float:left;margin-top:4px;margin-left:8px;min-width:85px;height:20px;background:url("' + this.baseUrl + 'img/facebook-counter-bg.png") no-repeat left;border:none;}';
        html += '#' + elID + ' .like_facebook span {float:right;height:20px;font-size:10px;font-family:Arial;color:black;background:url("' + this.baseUrl + 'img/facebook-counter-repeat.png") repeat-x;border-right:solid 1px #c1c1c1;border-top: none;border-bottom: none;margin-top: 1px;height: 18px;margin-right: 0px;padding-right: 6px;line-height: 18px;}';

        html += '#' + elID + ' .black_title, .blue_title, .gray_title {font-size:26px;font-weight:bold;font-style:italic;font-family:"Helvetica";word-spacing: 2px;}';

        html += '#' + elID + ' .black_title {color:#000000;text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);letter-spacing: -2px;}';
	html += '#' + elID + ' .blue_title {color:' + this.backgroundColor + ';text-shadow: 2px 1px 4px #C6C6C4;letter-spacing: -1px;}';
        html += '#' + elID + ' .gray_title {color:#676767;text-shadow: 0px 1px 6px rgba(0, 0, 0, 0.5);letter-spacing: -1px;}';


        html += '</style>';
        html += '<div id="' + elID + '">';

        //this.titleText = "Nuestros lectores tambien disfrutaron:";//FORTEST ONLY

        var textArr = this.titleText.split(" ");
        var title = '';
        var titleCss = '';
        for (var i = 0; i < textArr.length; i++) {
            if (i % 3 == 0)
                titleCss = "black_title";
            else if (i % 3 == 1)
                titleCss = "blue_title";
            else if (i % 3 == 2)
                titleCss = "gray_title";

            title += "<span class='" + titleCss + "'> " + textArr[i] + "</span>";
        }

        html += '<h2>' + title + '</h2>';
        html += '<ul>';

        for (i = 0; i < maxElements; i++) {
            var post_title = data.recs[i].title;
            var domain = this.domainname(data.recs[i].recType, data.recs[i].url, data.recs[i].displayName, 20);
            var post_link = this.addTarget(data.recs[i].partner_id) +
                ' href="' + data.recs[i].url +
                '" onclick="sprk_click(this,\'' + data.recs[i].clickUrl + '\');"';
            var post_type = data.recs[i].postType;

            var li_class = "";
            if (post_type == 1) { li_class = 'facebook '; }
            if (i == 0) { li_class += "first " }
            var img = this.thumbSize(data.recs[i].thumbnail_path, data.recs[i].category_id, 4);

            if (post_type == 1) {
                var extraDetails = post_title.split("@");
                var post_title = extraDetails[0];
                extraDetails = extraDetails[1].split(",");
                var countLikes = extraDetails[0].replace("L", "");
                var countComments = extraDetails[1].replace("C", "");
            }

            html += '<li class="' + li_class + '">';
            html += '<a ' + post_link + ' title="' + data.recs[i].title + '" class="dashed-border">';
            html += '<div class="git_post_image' + i + '">';
            html += '<img onerror="layoutErrorImageHandling(this,' + data.recs[i].category_id + ',4,\'' + this.baseUrl + '\')"  src="' + img + '"  alt="" />';
            if (post_type == 1) {
                html += '<img onerror="this.style.display=\'none\';"  src="' + this.baseUrl + 'img/facebook-like.png" style="position:absolute;z-index:2;left:7px;bottom:11px;"  alt="" />';
            }

            var h3_style = "";

            if (post_type == 1 && countLikes > 0)
                h3_style = "line-height:15px;max-height:33px";
            else if (domain)
                h3_style = "line-height:15px;max-height:33px;margin-top: -4px;";
            else
                h3_style = "line-height:15px;max-height:45px";

            html += '</div>';

            var lettersNr = 60;

            if (i == maxElements - 1)
                lettersNr = 20;
            else if (post_type == 1 && countLikes > 0)
                lettersNr = 30;
            else if (domain)
                lettersNr = 40;

            html += '<h3 style="' + h3_style + '">' + this.shorten(data.recs[i].title, lettersNr) + '</h3>';


            html += '</a>';

            if (post_type == 1 && countLikes > 0) {
                html += '<div class="like_facebook"><span>' + countLikes + '</span></div>';
            }
            else if (domain)
                html += '<div class="gslide_domain" style="' + gslide_domain_css + '"><a class="gslide_domain_a" ' + post_link + '" style="' + gslide_domain_a_css + '">(' + domain + ')</a></div>';


            html += '</li>';
        }
        html += '</ul>';
        html += this.getBranding(data.srcAdminNetworkId, data.languageId);
        html += '</div>';

        return html;
    }

    git_layout.prototype.layout1 = function (data) {
        this.cbPreLayout();
        slider_h = 202;
        var slider_div = document.getElementById('gt_widget_'+ this.idx);
        slider_div.style.height=slider_h+18+"px";
        var html = '';
        var href_link = '';

        var widget_title_text_css = "";
        var wrapper_css        = "position:relative; border:1px solid #bfbfbf; background:"+this.backgroundColor +"; height:"+ slider_h +"px;";
        var git_slides_wrap    = "position:absolute; top:27px; height:176px; display:block; width:100%; overflow:visible;";
        var widget_title_css = "position:absolute;width:175px; background-color:"+ this.widgetTitleBgColor +";";
        widget_title_css += (1 == parseInt(this.widget.dbnlayout)) ? "padding:15px 0px 5px 20px;" : "padding:5px 0px 5px 20px;";

        var title_bar_css     = "position:absolute;left:0px; height:27px; top:0px; width:100%";
        var slide_css = "position:absolute; z-index:99999999; width:200px; padding-top:19px; padding-left:22px; padding-right:10px;"
        var gslide_img_css    = "border:1px solid #bfbfbf; padding:0px 0px; height:65px; width:87px;";
        var gslide_imgtag_css    = 'padding:0px; margin:0px; border:none;height:65px';

        var gslide_title_css    = "padding:10px 0px 0px 0px; clear:both;";
        var gslide_title_a_css    = "display:block;padding:0px; margin:0px;";
        var gslide_desc_css        = "padding-top:2px;";
        var gslide_desc_inner_css    = "padding:0px; margin:0px;text-decoration:none; color:"+ this.descColor;
        var graze_link_css        = "padding:0px; margin:0px;";
        var graze_close_css        = "display:block; line-height:1; padding:0px 5px; margin:0px; font-size:14px; color:"+ this.closeColor +"; text-decoration:none; ";
        var git_widget_handle    = "display:none; position:absolute; top:0px; left:0px; background:"+ this.reminderColor +"; border:1px solid #bfbfbf; border-right:none; ";

        var git_provided_by = 'position:absolute;top:'+ (slider_h+5) +'px; right:7px; font-size:9px; font-family:Arial; color:#a0a0a0;';
        var git_provider_name = 'font-weight:bold; color:#434343';

        var graze_pager_css        = "width:65px; height:14px; background:url(\'"+  this.baseUrl +"img/page_bg.png\') center top no-repeat; ;float:left; position:absolute; z-index:99999999; padding:1px 0px; top:189px; right:20px; border-bottom:none;";
        var graze_pg_ctrl_css    = "float:left;margin-top:2px;border:0px solid #f00;";
        var graze_pg_ctrllink_css    = "font-family:Arial;font-size:9px;width:9px; height:9px;padding:0px; margin:0px; display:block;";

        //pager
        var graze_pg_prev_css = graze_pg_ctrllink_css +"background:"+ this.navPrevColor +" url(\'"+  this.baseUrl +"img/hez_l.png\') center no-repeat; display:block;";
        var graze_pg_next_css = graze_pg_ctrllink_css +"background:"+ this.navNextColor +" url(\'"+  this.baseUrl +"img/hez_r.png\') center no-repeat; display:block;";
        var graze_activepage_css = "font-family:Arial;float:left; padding:1px 0px; text-align:center; width:35px; line-height:normal; border:0px solid #f00;";
        var graze_pager_innerwrap = 'width:55px; text-align:center; margin-left:auto; margin-right:auto;';

        //var obj = this;

        //types and color
        wrapper_css         += "font-family:"+ this.widget.dbnfont +"; line-height:normal;";
        widget_title_css    += "font-size:14px; font-weight:normal;color:"+ this.widgetTitleColor +";";

        //if(dbnlayout==1) widget_title_text_css += "font-weight:bold;border-bottom:2px solid #ccc; padding:0px 0px; 2px 0px;";

        slide_css            += "font-family:"+ this.widget.dbnfont +";";
        gslide_title_a_css    += "font-size:12px; line-height:14px; font-weight:bold; font-family:"+ this.widget.dbnfont +"; color:"+ this.titleColor  +"; text-decoration:none";
        gslide_desc_css        += "font-size:11px; line-height:12px; color:"+ this.descColor +";";
        graze_link_css        += "font-size:10px; color:"+ this.linkColor +"; text-decoration:none";
        graze_activepage_css += "font-size:10px; line-height:11px; color:#535353";

        html +='<div id="git_wrapper_'+ this.idx +'" style="'+ wrapper_css +'">'+

            //title
            '<div id="git_title_bar" style="'+ title_bar_css +'">'+
            '<div id="git_title" class="git_title" style="'+ widget_title_css +'"><span style="'+ widget_title_text_css +'">'+ this.titleText +'</span></div>'+
            '<div id="git_close_'+ this.idx +'" style="position:absolute; top:4px; right:7px; padding:0px;"><a style="'+ graze_close_css +'" href="javascript:void(0);">x</a></div>'+
            '</div>'+

            //slider container
            '<div id="git_slides_wrap_'+ this.idx +'" style="'+ git_slides_wrap +'">';
        for (i = 0; i < data.recs.length; i++) {
            href_link = this.addTarget(data.recs[i].partner_id) + ' href="' + data.recs[i].url + '" onclick="sprk_click(this,\'' + data.recs[i].clickUrl + '\');"';

            var img=(data.recs[i].thumbnail_path)?'<div class="gslide_img" style="' + gslide_img_css +'"><a '+href_link+' style="padding:0px; margin:0px;"><img id="g_img_'+ this.idx +'_'+ i +'" onerror="gwImgHandler('+ this.idx +','+ i +');"  src="'+ data.recs[i].thumbnail_path +'" style="'+ gslide_imgtag_css +'"/></a></div>':'<div class="gslide_img" style="height:17px;"></div>';
            html += '<div class="gslide" style="'+ slide_css +'">';
            html += ''+img+'';
            html += '<div class="gslide_title" style="'+ gslide_title_css +'"><a class="gslide_title_a" '+href_link+' style="'+  gslide_title_a_css +'">'+ this.shorten(data.recs[i].title,60) +'</a></div>';
            html +=    '<div id="gslide_desc_'+ this.idx +'_'+ i +'" class="gslide_desc" style="'+ gslide_desc_css +'">';
            html += '<div class="text"><a '+href_link+' style="'+gslide_desc_inner_css+'">'+ this.shorten(data.recs[i].description,65) +"</a></div>";
            html += '<a  '+href_link+' class="gslide_source_link" style="'+ graze_link_css +'">'+ this.getHost(data.recs[i].url) +'</a>';
            html += '</div>';
            html += '</div>';
        }
        html += '</div>';

        //pager..
        html += '<div id="git_pager" style="'+ graze_pager_css +'">';
        html += '<div style="'+ graze_pager_innerwrap +'">';
        html += '<div id="git_pg_prev_'+ this.idx +'" style="'+ graze_pg_ctrl_css +'"><a style="'+ graze_pg_prev_css +'" href="javascript:void(0);"></a></div>';
        html += '<div id="git_pg_page_'+ this.idx +'" style="'+ graze_activepage_css +'"></div>';
        html += '<div id="git_pg_next_'+ this.idx +'" style="'+ graze_pg_ctrl_css +'"><a style="'+ graze_pg_next_css +'" href="javascript:void(0);"></a></div>';
        html += '</div>';
        html += '</div>';
        html += '<div style="' + git_provided_by + '">Provided by <span style="' + git_provider_name + '"><a href="http://www.engageya.com" target="_blank">Engageya</a></span></div>';
        html +='</div>';

        html +='<div id="git_widget_handle_'+ this.idx +'" style="'+ git_widget_handle +'"><a href="javascript:void(0);"><img border="0" style="padding:0px; margin:0px;" src="'+ this.baseUrl +'img/enjoytrans.png"/></a></div>';
        return html;
    }

    git_layout.prototype.AdSenseLayout = function (data) {
        this.cbPreLayout();
        slider_h = 352;
        var slider_div = document.getElementById('gt_widget_'+ this.idx);
        slider_div.style.height=slider_h+18+"px";
        var html = '';
        var href_link = '';

        //css
        //structure/dimensions/position
        var widget_title_text_css = "";
        var wrapper_css        = "position:relative; border:1px solid #bfbfbf; background:"+ this.backgroundColor +"; height:"+ slider_h +"px;z-index:99999999;";
        var git_slides_wrap    = "position:absolute; top:30px; height:300px; display:block; width:100%; overflow:visible";
        var widget_title_css = "position:absolute;width:180px; padding:5px 0px 5px 10px; background-color:"+ this.widgetTitleBgColor +";";
        var title_bar_css         = "position:absolute;left:0px; height:28px; top:0px; width:100%";
        var slide_css        = "position:relative;width:200px; height:95px; padding-top:10px; padding-left:21px; padding-right:10px; overflow:hidden;";

        var gslide_title_css    = "padding:0px 0px 5px 0px;";
        var gslide_title_a_css    = "display:block;padding:0px; margin:0px;";

        //if(dbnlayout==4) widget_title_text_css += "font-weight:bold;border-bottom:2px solid #ccc; padding:0px 0px; 2px 0px;";

        var gslide_desc_css        = "";
        var gslide_desc_inner_css    = "padding:0px; margin:0px;text-decoration:none; color:"+ this.descColor;
        var graze_link_css        = "padding:0px; margin:0px;";
        var graze_close_css        = "display:block; line-height:1; padding:0px 5px; margin:0px; font-size:14px; color:"+ this.closeColor +"; text-decoration:none;";
        var git_widget_handle    = "display:none; position:absolute; top:0px; left:0px; background:"+ this.reminderColor +"; border:1px solid #bfbfbf;border-right:none;";


        var git_provided_by = 'position:absolute;top:'+ (slider_h+5) +'px; right:7px; font-size:9px; font-family:Arial; color:#a0a0a0;';
        var git_provider_name = 'font-weight:bold; color:#434343';



        //types and color
        wrapper_css         += "font-family:"+ this.widget.dbnfont +"; line-height:normal;";
        widget_title_css    += "font-size:14px; font-weight:normal;color:"+ this.widgetTitleColor +";";
        slide_css            += "font-family:"+ this.widget.dbnfont +";";
        gslide_title_a_css    += "font-size:12px; font-weight:bold; font-family:"+ this.widget.dbnfont +"; color:"+ this.titleColor  +";text-decoration:none;";
        gslide_desc_css        += "font-size:11px; color:"+ this.descColor +";";
        graze_link_css        += "font-size:10px; color:"+ this.linkColor +"; text-decoration:none";

        html +='<div id="git_wrapper_'+ this.idx +'" style="'+ wrapper_css +'">'+
            //title
            '<div id="git_title_bar" style="'+ title_bar_css +'">'+
            '<div id="git_title" class="git_title" style="'+ widget_title_css +'"><span style="'+ widget_title_text_css +'">'+ this.titleText +'</span></div>'+
            '<div id="git_close_'+ this.idx +'" style="position:absolute; top:4px; right:7px; padding:0px;"><a style="'+ graze_close_css +'" href="javascript:void(0);">x</a></div>'+
            '</div>'+

            //slider container
            '<div id="git_slides_wrap_'+ this.idx +'" style="'+ git_slides_wrap +'">';
        var slide_count = (data.recs.length > 3) ? 3: data.recs.length;
        for (k = 0; k < slide_count; k++) {

            href_link = this.addTarget(data.recs[k].partner_id) + ' href="' + data.recs[k].url + '" onclick="sprk_click(this,\'' + data.recs[k].clickUrl + '\');"';

            html += '<div class="gslide" style="'+ slide_css +'">';
            html += '<div class="gslide_title"style="'+ gslide_title_css +'"><a  class="gslide_title_a" '+href_link+' style="'+  gslide_title_a_css +'">'+ this.shorten(data.recs[k].title,63) +'</a></div>';
            html +=    '<div id="gslide_desc_'+ this.idx +'_'+ k +'" class="gslide_desc" style="'+ gslide_desc_css +'"><div class="text"><a '+href_link+' style="'+gslide_desc_inner_css+'">'+ this.shorten(data.recs[k].description,100) +"</a></div>";
            html += '<a '+href_link+' class="gslide_source_link" style="'+ graze_link_css +'">'+ this.getHost(data.recs[k].url) +'</a></div>';
            html += '</div>';
            if(k<(slide_count-1))
                html += '<div style="border-bottom:1px solid #ccc; width:100%; margin-top:0px;height:0;"></div>'

            //if(k==2) break;

        }
        html += '</div>';

        html += '<div style="' + git_provided_by + '">Provided by <span style="' + git_provider_name + '"><a href="http://www.engageya.com" target="_blank">Engageya</a></span></div>';
        html +='</div>';

        html +='<div id="git_widget_handle_'+ this.idx +'" style="'+ git_widget_handle +'"><a href="javascript:void(0);"><img border="0" style="padding:0px; margin:0px;" src="'+ this.baseUrl +'img/enjoytrans.png"/></a></div>';
        return html;
    }

    git_layout.prototype.LargeImageLayout = function (data) {
        this.cbPreLayout();
        slider_h = 191;
        slider_w = 224;
        var slider_div = document.getElementById('gt_widget_'+ this.idx);

        slider_div.style.height=slider_h+18+"px";
        slider_div.style.width=slider_w+"px";
        var html = '';
        var href_link = '';

        //css
        //structure/dimensions/position
        var widget_title_text_css = "";
        var wrapper_css            = "position:relative; border:1px solid #bfbfbf; background:"+ this.backgroundColor +"; height:"+ slider_h +"px; ";
        var git_slides_wrap        = "position:absolute; top:0px; left:0px; height:191px; width:224px; display:block;  overflow:hidden";
        var widget_title_css    = "width:180px;";
        var title_bar_css         = "position:absolute; z-index:99999999; left:0px; height:28px; top:0px; width:100%";
        var slide_css            = "position:absolute; z-index:99999999; width:200px; padding-top:10px; padding-left:21px; padding-right:10px;"
        var gslide_img_css        = "position:absolute;left:0px; top:0px; padding:0px 0px; width:224px; height:191px;";
        var gslide_imgtag_css    = 'padding:0px; margin:0px; border:none;width:224px;height:191px';
        var gslide_content_bg    = 'background: transparent url(\''+ this.baseUrl +'img/trans_bg.png\') left top repeat; position:absolute; z-index:99999999; left:0px; width:224px;';
        if(this.widget.dbnlayout == 10) gslide_content_bg += 'top:127px; height:64px;';
        else if(this.widget.dbnlayout == 11) gslide_content_bg += 'top:0px; height:191px;';

        var gslide_content        = 'margin-left:18px;';

        if(this.widget.dbnlayout == 10) gslide_content +='margin-top:8px';
        if (this.widget.dbnlayout == 11) gslide_content += 'margin-top:45px';

        var gslide_title_css    = "padding:2px 5px 5px 0px;";
        var gslide_title_a_css    = "display:block;padding:0px;margin:0px;";
        var gslide_desc_css    = "padding-right:10px;";
        var graze_link_css    = "padding:0px;margin:0px;";

        if (this.widget.dbnlayout == 10) {
            var git_close_css = "position:absolute; z-index:99999999; top:0px; right:6px; padding:0px; width:17px; height:14px; background:url(\'" + this.baseUrl + "img/bg_close.png\') center top no-repeat;";
            var graze_close_css = "position:absolute; top:0px;display:block; line-height:10px; padding:0px 6px; margin:0px; font-size:12px; color:" + this.closeColor + "; text-decoration:none;";
        }
        else {
            var git_close_css        = "position:absolute; z-index:99999999; top:0px; right:6px; padding:0px; width:17px; height:14px;";
            var graze_close_css        = "position:absolute; top:0px; display:block; line-height:12px; padding:0px 6px; margin:0px; font-size:12px; color:"+ this.closeColor +"; text-decoration:none;";
        }

        var git_widget_handle    = "display:none; position:absolute; top:0px; left:0px; background:"+ this.reminderColor +"; border:1px solid #bfbfbf;border-right:none;";


        var git_provided_by = 'position:absolute; top:'+ (slider_h+5) +'px; right:7px; font-size:9px; font-family:Arial; color:#a0a0a0;';
        var git_provider_name = 'font-weight:bold; color:#434343';

        var graze_pager_css        = "border:0px solid #f00;width:68px; height:14px; background:url(\'"+  this.baseUrl +"img/page_bg_inverted.png\') left top no-repeat; float:left; position:absolute; z-index:99999999; padding:2px  0px  top:0px; right:25px; border-bottom:none";

        var graze_pg_ctrl_css    = "border:0px solid #f00;float:left; width:9px; height:9px;padding:0px; margin:0px;font-size:9px;";
        var graze_pg_ctrllink_css    = "font-family:Arial;display:block; width:9px; height:9px; padding:0px; margin:0px; text-decoration:none;line-height:10px; ";

        //pager
        var graze_pg_prev_css = graze_pg_ctrllink_css +"background:"+ this.navPrevColor +" url(\'"+  this.baseUrl +"img/hez_l.png\') left center no-repeat; display:block;";
        var graze_pg_next_css = graze_pg_ctrllink_css +"background:"+ this.navNextColor +" url(\'"+  this.baseUrl +"img/hez_r.png\') right center no-repeat; display:block;";

        var graze_activepage_css = "font-family:Arial;float:left; padding:0px 0px; text-align:center; height:9px; width:35px; line-height:normal; border:0px solid #f00;";
        var graze_pager_innerwrap = 'width:55px; text-align:center;  margin-top:2px; margin-left:auto; margin-right:auto;';

        try{
            if(Browser.ie) graze_activepage_css+= "padding-top:1px;";
        }catch(e){}

        //types and color
        wrapper_css         += "font-family:"+ this.widget.dbnfont +"; line-height:normal;z-index:99999999;";
        widget_title_css    += "font-size:12px; font-weight:bold; color:"+ this.widgetTitleColor +";";

        slide_css            += "font-family:"+ this.widget.dbnfont +";";
        gslide_title_a_css    += "font-size:14px; font-weight:bold; font-family:"+ this.widget.dbnfont +"; color:"+ this.titleColor  +"; text-decoration:none;";
        gslide_desc_css        += "font-size:11px; color:"+ this.descColor +";";
        graze_link_css        += "font-size:10px; color:"+ this.linkColor +"; text-decoration:none";
        graze_activepage_css += "font-size:9px; line-height:1; color:#535353; text-align:center;";


        html +='<div id="git_wrapper_'+ this.idx +'" style="'+ wrapper_css +'">';
        //slider container
        html +='<div id="git_slides_wrap_'+ this.idx +'" style="'+ git_slides_wrap +'">';
        for (i = 0; i < this.widget.data.recs.length; i++) {

            var thumb= this.thumbSize(data.recs[i].thumbnail_path,data.recs[i].category_id,2);

            href_link = this.addTarget(data.recs[i].partner_id)+' href="'+ data.recs[i].url +'" onclick="sprk_click(this,\''+data.recs[i].clickUrl+'\');"';

            html += '<div class="gslide gslide'+ i +'" style="'+ slide_css +'">';
            html += '<div class="gslide_img" style="' + gslide_img_css + '"><a ' + href_link + ' ><img id="g_img_' + this.idx + '_' + i + '" src="' + thumb + '" style="' + gslide_imgtag_css + '"/></a></div>';
            html += '<div style="'+ gslide_content_bg +'">';
            html += '<div style="'+ gslide_content +'">';
            html += '<div class="git_title" style="'+ widget_title_css +'"><span style="'+ widget_title_text_css +'">'+ this.titleText +'</span></div>';
            html += '<div class="gslide_title" style="'+ gslide_title_css +'"><a  class="gslide_title_a" '+href_link+' style="'+  gslide_title_a_css +'">'+ this.shorten(data.recs[i].title,45) +'</a></div>';
            if (this.widget.dbnlayout == 11) {
                html += '<div id="gslide_desc_'+ this.idx +'_' + i + '" class="gslide_desc" style="' + gslide_desc_css + '">';
                html += '<div class="text" style="margin-top:7px;">' + this.shorten(data.recs[i].description, 130) + '</div>';
                html += '<a ' + href_link + ' class="gslide_source_link" style="' + graze_link_css + '">'+ this.getHost(data.recs[i].url) +'</a></div>';
            }
            html += '</div></div>';
            html += '</div>';
        }
        html += '</div>';

        //title
        html += '<div id="git_title_bar" style="' + title_bar_css + '">' +
            '<div id="git_close_'+ this.idx +'" style="' + git_close_css + '"><a style="' + graze_close_css + '" href="javascript:void(0);">x</a></div>' +
            '</div>';

        //pager..
        html += '<div id="git_pager" style="' + graze_pager_css + '">';
        html += '<div style="' + graze_pager_innerwrap + '">';
        html += '<div id="git_pg_prev_'+ this.idx +'" style="' + graze_pg_ctrl_css + '"><a style="' + graze_pg_prev_css + '" href="javascript:void(0);"></a></div>';
        html += '<div id="git_pg_page_'+ this.idx +'" style="' + graze_activepage_css + '"></div>';
        html += '<div id="git_pg_next_'+ this.idx +'" style="' + graze_pg_ctrl_css + '"><a style="' + graze_pg_next_css + '" href="javascript:void(0);"></a></div>';
        html += '</div>';
        html += '</div>';
        html += '<div style="' + git_provided_by + '">Provided by <span style="' + git_provider_name + '"><a href="http://www.engageya.com" target="_blank">Engageya</a></span></div>';



        html += '</div>';

        html += '<div id="git_widget_handle_'+ this.idx +'" style="' + git_widget_handle + '"><a href="javascript:void(0);"><img border="0" style="padding:0px; margin:0px;" src="' + this.baseUrl + 'img/enjoytrans.png"/></a></div>';
        return html;
    }

    git_layout.prototype.staticBulletsLayout = function (data) {
        // layout 15
        var elID = "git_wrapper_" + this.idx;
        var html = '<style type="text/css">';
        html += '#' + elID + ' .post_here {position:absolute;margin-right:10px;bottom:3px;}';
        html += '#' + elID + ' .post_here a {text-align:right; font-size:8px; color:#BBBBBB !important; font-weight:bold; text-decoration:none}';

        html += '</style>';
        //css
        //structure/dimensions/position
        var widget_title_text_css = "";
        var wrapper_css        = "position:relative;background:"+this.backgroundColor +"; height:auto; border-top:1px solid #d6d6d6; border-bottom:1px solid #d6d6d6;padding-top:17px; padding-bottom:15px;";
        if (dbnwix) wrapper_css += "width: 425px;";

        var git_slides_wrap = "display:block; width:100%;float:left; overflow:visible;";
        if (dbnwix) git_slides_wrap += " margin-left:7px;";

        var widget_title_css = "background-color:"+ this.widgetTitleBgColor +";";


        var title_bar_css         = "width:100%;margin-bottom:10px;";
        if (dbnwix) title_bar_css += " margin-left:7px;";

        var slide_css            = "margin-top:0px; margin-left:0px; padding-left:0px;"

        //var gslide_title_css    = "padding:10px 0px 0px 0px; clear:both;";
        var graze_link_css        = "padding:0px; margin:0px;";

        //types and color
        wrapper_css         += "font-family:"+ this.widget.dbnfont +"; line-height:normal;";
        widget_title_css    += "font-size:18px; font-weight:normal;color:"+ this.widgetTitleColor +";";
        slide_css            += "font-family:"+ this.widget.dbnfont +";color:"+ this.bulletcolor ;
        graze_link_css        += "font-size:14px; color:"+ this.linkColor +"; text-decoration:none";

        var gslide_domain_css = "padding:0px;";
        var gslide_domain_css = "padding-left: 10px;font-size:9px; font-weight:normal; font-family:" + this.widget.dbnfont + "; color:#bbb; text-decoration:none; font-style: italic;";

        html +='<div id="git_wrapper_'+ this.idx + '" style="'+ wrapper_css +'">'+

            //title
            '<div id="git_title_bar" style="'+ title_bar_css +'">'+
            '<div id="git_title" class="git_title" style="' + widget_title_css + '"><span style="' + widget_title_text_css + '"><strong>' + this.titleText + '</strong></span></div>' +
            '<div id="git_close_'+ this.idx +'" style="display:none"><a style="display:none" href="javascript:void(0);">x</a></div>'+
            '</div>'+

            //slider container
            '<div id="git_slides_wrap_'+ this.idx +'" style="'+ git_slides_wrap +'"><ul style="'+ slide_css +'">';
        for (i = 0; i < data.recs.length; i++) {
            var domain = this.domainname(data.recs[i].recType, data.recs[i].url, data.recs[i].displayName, 20);
            var post_link = data.recs[i].url;

            html += '<li style="padding:4px 0px; list-style-position:inside;"><a class="gslide_title_a" ' + this.addTarget(data.recs[i].partner_id) + ' style="' + graze_link_css + '" href="' + data.recs[i].url + '" onclick="sprk_click(this,\'' + data.recs[i].clickUrl + '\');">' + this.getHost(data.recs[i].title);
            if (domain)
                html += '<span class="gslide_domain" ' + post_link + '" style="' + gslide_domain_css + '">(' + domain + ')</span>';
            html += '</a>';
            html += '</li>';
            if (i >= 5) {
                break;
            }
        }
        html += '</ul></div><div style="clear:both"></div>';
        html += this.getBranding(data.srcAdminNetworkId, 1);
        html += '</div>';

        return html;
    }

    git_layout.prototype.static4ImageLayout = function (data, parentWidth) {
        // layout 17
        this.cbPreLayout();
        var html = '';
        var href_link = '';
        var slideMargin=0;
        var slideWidth=120;
        var slidePadding=6;
        var totalSlideWidth=slidePadding+slideWidth+slideMargin;
        var elID = "git_wrapper_" + this.idx;
        //css
        //structure/dimensions/position
        var widget_title_text_css = "";
        var wrapper_css = "position:relative; background:" + this.backgroundColor + "; box-sizing:content-box; -moz-box-sizing:content-box  !important; -webkit-box-sizing:content-box; width: 100%;";
        if (dbnwix) wrapper_css += " width: 510px;";
        if (this.bgColorType == 1) wrapper_css += "border-top:1px solid #d6d6d6; border-bottom:1px solid #d6d6d6;"
        //if (this.direction == "rtl") wrapper_css += "direction:rtl;";
        wrapper_css += "padding-top:15px; padding-bottom:7px; margin-top: 20px; margin-bottom: 20px; ";
        var git_slides_wrap = "width:100%; display:block;  overflow:visible;margin-bottom: 10px;";
        if (dbnwix)  git_slides_wrap += "margin-left:7px;";

        if (this.widget.dbndirection == "rtl")  git_slides_wrap += "float:right;";
        else git_slides_wrap += "float:left;";

        var widget_title_css = "padding:0px 0px 0px 0px; background-color:" + this.widgetTitleBgColor + ";";
        var title_bar_css = "float:left; width:100%;margin-bottom:10px;";
        if (dbnwix)  title_bar_css += "margin-left:7px;";

        var slide_css = "position:relative; float:left; width:" + slideWidth + "px; padding-right:" + slidePadding + "px; overflow:hidden;height:165px;margin-bottom:5px;";
        if (this.widget.dbndirection == "rtl")  slide_css += "float:right;";
        else slide_css += "float:left;";

        var gslide_img_css = 'float:left; margin-bottom:5px;  text-align:center; padding:2px 2px; width:110px; height:75px; overflow:hidden;';
        var gslide_imgtag_css = 'padding:0px; margin:0px; border:none;width:110px;height:75px;';
        var gslide_title_css = "padding:0px 2px 5px 2px;";
        var gslide_title_a_css = "display:block;padding:0px; margin:0px;";
        var gslide_domain_css = "padding:0px;";
        var gslide_domain_a_css = "display:block;padding:0px; margin:0px;";
        gslide_domain_a_css    += "font-size:9px; font-weight:normal; font-family:"+ this.widget.dbnfont +"; color:#bbb; text-decoration:none; font-style: italic;";

        var graze_link_css      = "";

        //types and color
        wrapper_css         += "font-family:"+ this.widget.dbnfont +"; line-height:normal;";
        widget_title_css    += "font-size:"+this.widget.dbntitlefontsize+"px; font-weight:bold;color:"+ this.widgetTitleColor +";";
        if (this.widget.dbndirection == "rtl")  widget_title_css += "text-align: right; direction: 'rtl';";
        slide_css           += "font-family:"+ this.widget.dbnfont +";";
        gslide_title_a_css  += "font-size:12px; font-weight:normal; font-family:"+ this.widget.dbnfont +"; color:"+ this.titleColor  +";text-decoration:none;";
        if (this.widget.dbndirection == "rtl")  gslide_title_a_css += "text-align: right; direction: 'rtl';";

        graze_link_css      += "font-size:10px; color:"+ this.linkColor +"; text-decoration:none";

        html += '<style type="text/css">';
        html += '#git_slides_wrap_'+ this.idx +' .gslide_img:hover {background-color:#eaedf4 !important;}';
        html += '#git_slides_wrap_'+ this.idx +' .like_facebook {float:left;margin-top:5px;min-width:85px;height:20px;background:url("' + this.baseUrl + 'img/facebook-counter-bg.png") no-repeat left;border:none;}';
        html += '#git_slides_wrap_'+ this.idx +' .like_facebook span {float:right;height:20px;font-size:10px;font-family:Arial;color:black;background:url("' + this.baseUrl + 'img/facebook-counter-repeat.png") repeat-x;border-right:solid 1px #c1c1c1;border-top: none;border-bottom: none;margin-top: 1px;height: 18px;margin-right: 0px;padding-right: 6px;padding: 0px 9px;line-height: 18px;}';

        html += '#' + elID + ' .post_here {position:absolute;margin-right:0px;bottom:3px;}';
        html += '#' + elID + ' .post_here a {text-align:right; font-size:8px; color:#BBBBBB !important; font-weight:bold; text-decoration:none}';

        html += '#' + elID + ' .post_here img{padding: 0px !important;background: none !important;border: none !important;-moz-box-shadow: none !important;-webkit-box-shadow: none !important;box-shadow: none !important;}';

        html += '</style>';

        html +='<div id="git_wrapper_'+ this.idx +'" style="'+ wrapper_css +'">'+
            //title
            '<div id="git_title_bar" style="'+ title_bar_css +'">'+
            '<div id="git_title" class="git_title" style="'+ widget_title_css +'"><span style="'+ widget_title_text_css +'">'+ this.titleText +'</span></div>'+
            '<div id="git_close_'+ this.idx +'" style="display:none"><a style="display:none" href="javascript:void(0);">x</a></div>'+
            '</div>'+

            //slider container
            '<div id="git_slides_wrap_'+ this.idx +'" style="'+ git_slides_wrap +'">';
        var maxSlides = Math.floor(parentWidth / totalSlideWidth);
        if (dbnwix) maxSlides = 4;
        var slide_count = (data.recs.length > maxSlides) ? maxSlides: data.recs.length;
        var thumb = null;
        for (k = 0; k < slide_count; k++) {
	    if (data.recs[k].recType == "RCT_ADS_MLT" && data.recs[k].postType == 1) {
		href_link = "#";
	    } else {
		href_link = this.addTarget(data.recs[k].partner_id) + ' href="' + data.recs[k].url + '" onclick="sprk_click(this,\'' + data.recs[k].clickUrl + '\');"';
	    }
            var domain = this.domainname(data.recs[k].recType,data.recs[k].url,data.recs[k].displayName,18);
            var post_type = data.recs[k].postType;
            var post_title = data.recs[k].title;

            if(post_type == 1) {
		var fburl = data.recs[k].url;
                var extraDetails = post_title.split("@");
                post_title = extraDetails[0];
                extraDetails = extraDetails[1].split(",");
                var countLikes = 0;
                if (extraDetails[0])  {
                    countLikes = extraDetails[0].replace("L","");
                }
                var countComments = 0;
                if (extraDetails[1])  {
                    countComments = extraDetails[1].replace("C","");
                }
                if (extraDetails[2])  {
                    fburl = extraDetails[2];
                }
            }

            thumb = this.thumbSize(data.recs[k].thumbnail_path,data.recs[k].category_id,1);

            if(k>=(slide_count-1))
                slide_css += "width:123px;padding-right:0px;";

            html += '<div class="gslide ' + data.recs[k].postId + '" style="' + slide_css + '">';
            html += '<div class="gslide_img" style="position:relative;' + gslide_img_css + '">'+
                '<a ' + href_link + ' style="padding:0px; margin:0px;" title="' + post_title + '">'+
                '<img id="g_img_' + this.idx + '_' + k + '" title="' + post_title + '" alt="' + post_title + '" onerror="layoutErrorImageHandling(this,' + data.recs[k].category_id + ',1,\''+this.baseUrl+'\')" src="' + thumb + '" style="position:relative;z-index:0;' + gslide_imgtag_css + '" />';
            if(post_type==1)
            {
                html += '<img onerror="this.style.display=\'none\';"  src="' + this.baseUrl + 'img/facebook-like.png" style="position:absolute;z-index:2;left:2px;bottom:2px;"  alt="" />';
            }
            html += '</a></div>';
            html += '<div class="gslide_title"style="'+ gslide_title_css +'">'+
                '<a class="gslide_title_a" ' + href_link + '" style="' + gslide_title_a_css + '">' + this.shorten(post_title, 45) + '</a>';//63
            if (post_type == 1) {
		    if (data.recs[k].recType == "RCT_ADS_MLT") {
			html += '<div class="fb_partner_like ' + data.recs[k].partner_id + ' ' + k + '"><div class="fb-like" data-postid="' + data.recs[k].postId + '" data-href="' + fburl + '"data-layout="button_count" data-width="70" data-show-faces="false""></div></div><div class="social_net_button facebook_button"></div>';
		    } else if (countLikes > 0) {
			html += '<div class="like_facebook"><span>'+countLikes+'</span></div>';
		    }
            }
            else if (domain)
                html += '<div class="gslide_domain" style="'+ gslide_domain_css +'"><a class="gslide_domain_a" '+ href_link +'" style="'+  gslide_domain_a_css +'">('+ domain  +')</a></div>';

            html += '</div></div>';
        }
        html += '</div><div style="clear:both"></div>';
	
        html += this.getBranding(data.srcAdminNetworkId,1);
	
        html +='</div>';
        return html;

    }
    git_layout.prototype.static4ImageLayout100 = function (data, parentWidth) {
        // layout 20
        this.cbPreLayout();
        var html = '';
        var href_link = '';
        var slideMargin=0;
        var slideWidth=112;
        var slidePadding=0;
        var totalSlideWidth=slidePadding+slideWidth+slideMargin;
        var elID = "git_wrapper_" + this.idx;
        //css
        //structure/dimensions/position
        var widget_title_text_css = "";
        var wrapper_css = "position:relative; background:" + this.backgroundColor + "; box-sizing:content-box; -moz-box-sizing:content-box  !important; -webkit-box-sizing:content-box; width: 100%;";
        if (dbnwix) wrapper_css += "width: 595px;";
        if (this.bgColorType == 1) wrapper_css += "border-top:1px solid #d6d6d6; border-bottom:1px solid #d6d6d6;"
        //if (this.direction == "rtl") wrapper_css += "direction:rtl;";
        wrapper_css += "padding-top:15px; padding-bottom:7; margin-top: 20px; margin-bottom: 20px; ";
        var git_slides_wrap = "width:100%; display:block;  overflow:visible;";
        if (dbnwix)  git_slides_wrap += "margin-left:7px;";

        if (this.widget.dbndirection == "rtl")  git_slides_wrap += "float:right;";
        else git_slides_wrap += "float:left;";
        var widget_title_css = "padding:0px 0px 0px 0px; background-color:" + this.widgetTitleBgColor + ";";
        var title_bar_css = "float:left; width:100%;margin-bottom:10px;";
        if (dbnwix)  title_bar_css += "margin-left:7px;";

        var slide_css = "position:relative; float:left; width:"+slideWidth+"px; padding-right:0px; overflow:hidden;";
        if (this.widget.dbndirection == "rtl")  slide_css += "float:right;";
        else slide_css += "float:left;";

        var gslide_img_css = 'float:left; margin-bottom:5px;  text-align:center; padding:2px 2px; width:100px; height:100px; overflow:hidden;';
        var gslide_imgtag_css = 'padding:0px; margin:0px; border:none !important;width:100px;height:100px;';
        var gslide_title_css = "padding:0px 2px 5px 2px;";
        var gslide_title_a_css = "display:inline-block;padding:0px; margin:0px;";
        var gslide_domain_css = "padding:0px;";
        var gslide_domain_a_css = "display:block;padding:0px; margin:0px;";
        gslide_domain_a_css    += "font-size:9px; font-weight:normal; font-family:"+ this.widget.dbnfont +"; color:#bbb;text-decoration:none;font-style:italic;";

        var graze_link_css      = "";

        //types and color
        wrapper_css         += "font-family:"+ this.widget.dbnfont +"; line-height:normal;";
        widget_title_css    += "font-size:"+this.widget.dbntitlefontsize+"px; font-weight:bold;color:"+ this.widgetTitleColor +";";
        if (this.widget.dbndirection == "rtl")  widget_title_css += "text-align: right; direction: rtl;";
        slide_css           += "font-family:"+ this.widget.dbnfont +";";
        gslide_title_a_css  += "font-size:12px; font-weight:normal; font-family:"+ this.widget.dbnfont +"; color:"+ this.titleColor  +";text-decoration:none;";
        if (this.widget.dbndirection == "rtl")  gslide_title_a_css += "text-align: right;margin-right:10px; direction: rtl;";

        graze_link_css      += "font-size:10px; color:"+ this.linkColor +"; text-decoration:none";

        html += '<style type="text/css">';
        html += '#git_slides_wrap_'+ this.idx +' .gslide_img:hover {background-color:#eaedf4 !important;}';
        html += '#git_slides_wrap_'+ this.idx +' .like_facebook {float:left;margin-top:5px;min-width:85px;height:20px;background:url("' + this.baseUrl + 'img/facebook-counter-bg.png") no-repeat left;border:none;}';
        html += '#git_slides_wrap_'+ this.idx +' .like_facebook span {float:right;height:20px;font-size:10px;font-family:Arial;color:black;background:url("' + this.baseUrl + 'img/facebook-counter-repeat.png") repeat-x;border-right:solid 1px #c1c1c1;border-top: none;border-bottom: none;margin-top: 1px;height: 18px;margin-right: 0px;padding-right: 6px;line-height: 18px;}';

        html += '#' + elID + ' .post_here {margin-right:0px;bottom:3px;}';
        html += '#' + elID + ' .post_here a {float:right;clear:both;text-align:right; font-size:8px; color:#BBBBBB !important; font-weight:bold; text-decoration:none}';
        html += '#' + elID + ' .post_here.align_left{float:left}';
        html += '#' + elID + ' .post_here.her_campus{height: 20px;margin-top: -2px;}';
        html += '#' + elID + ' .post_here img{padding: 0px !important;background: none !important;border: none !important;-moz-box-shadow: none !important;-webkit-box-shadow: none !important;box-shadow: none !important;}';
        html += '</style>';
        html +='<div id="git_wrapper_'+ this.idx +'" style="'+ wrapper_css +'">'+
            //title
            '<div id="git_title_bar" style="'+ title_bar_css +'">'+
            '<div id="git_title" class="git_title" style="'+ widget_title_css +'">'+
            '<span style="'+ widget_title_text_css +'">'+ this.titleText +'</span>'+
            '</div>'+
            '<div id="git_close_'+ this.idx +'" style="display:none">'+
            '<a style="display:none" href="javascript:void(0);">x</a></div>'+
            '</div>'+

            //slider container
            '<div id="git_slides_wrap_'+ this.idx +'" style="'+ git_slides_wrap +'">';
        var maxSlides = Math.floor(parentWidth / totalSlideWidth );
        if (dbnwix) maxSlides = 5;
        var slide_count = (data.recs.length > maxSlides) ? maxSlides: data.recs.length;
        var thumb = null;
	var domain;
	
        for (k = 0; k < slide_count; k++) {
            if (k == 0 && this.widget.dbndirection == "rtl") {
                gslide_img_css += "float:right;margin-right:10px;";
            }
	    domain = this.domainname(data.recs[k].recType,data.recs[k].url,data.recs[k].displayName,18);
	    if (data.recs[k].recType == "RCT_ADS_MLT" && data.recs[k].postType == 1) {
		href_link = "#"
	    } else {		
		href_link = this.addTarget(data.recs[k].partner_id) + ' href="' + data.recs[k].url + '" onclick="sprk_click(this,\'' + data.recs[k].clickUrl + '\');"';
	    }

            var post_type = data.recs[k].postType;
            var post_title = data.recs[k].title;

            if(post_type==1) {
		var fburl = data.recs[k].url;
                var extraDetails = post_title.split("@");
                post_title = extraDetails[0];
                extraDetails = extraDetails[1].split(",");
                var countLikes = 0;
                if (extraDetails[0])  {
                    countLikes = extraDetails[0].replace("L","");
                }
                var countComments = 0;
                if (extraDetails[1])  {
                    countComments = extraDetails[1].replace("C","");
                }
                if (extraDetails[2])  {
                    fburl = extraDetails[2];
                }
            }

            thumb = this.thumbSize(data.recs[k].thumbnail_path,data.recs[k].category_id,3);
            // thumb =  null;

            var lettersNr = 63;
            if (k >= (slide_count - 1)) {
                slide_css += "width:123px;padding-right:0px;";
                lettersNr = 40;
            }

            html += '<div class="gslide" style="'+ slide_css +'">';
            html += '<div class="gslide_img" style="' + gslide_img_css + '">'+
                '<a ' + href_link + ' style="padding:0px; margin:0px;float:left;position:relative;" title="' + post_title + '">'+
                '<img id="g_img_' + this.idx + '_' + k + '" title="' + post_title + '" alt="' + post_title + '" onerror="layoutErrorImageHandling(this,' + data.recs[k].category_id + ',3,\''+this.baseUrl+'\')" src="' + thumb + '" style="position:relative;z-index:1;' + gslide_imgtag_css + '" />';
            if(post_type==1)
            {
                html += '<img onerror="this.style.display=\'none\';"  src="' + this.baseUrl + 'img/facebook-like.png" style="position:absolute;z-index:2;left:0px;bottom:0px;"  alt="" />';
            }
            html += '</a></div>';

            if (this.widget.dbnwebid != 30665) {
                post_title = this.shorten(post_title,63);
            }

            html += '<div class="gslide_title"style="'+ gslide_title_css +'">' + 
                '<a class="gslide_title_a" ' + href_link + '" style="' + gslide_title_a_css + '">' + this.shorten(post_title, lettersNr) + '</a>';

	    //20 facebook
	     if (post_type == 1) {
		    if (data.recs[k].recType == "RCT_ADS_MLT") {
			html += '<div class="fb_partner_like ' + data.recs[k].partner_id + ' ' + k + '"><div class="fb-like" data-postid="' + data.recs[k].postId + '" data-href="' + fburl + '"data-layout="button_count" data-width="70" data-show-faces="false""></div></div><div class="social_net_button facebook_button"></div>';
		    } else if (countLikes > 0) {
			html += '<div class="like_facebook"><span>'+countLikes+'</span></div>';
		    }
             } else if (domain)
                html += '<div class="gslide_domain" style="'+ gslide_domain_css +'"><a class="gslide_domain_a" '+ href_link +'" style="'+  gslide_domain_a_css +'">('+ domain  +')</a></div>';

            html += '</div>';
            html += '</div>';
        }
        html += '</div><div style="clear:both"></div>';
	html += this.getBranding(data.srcAdminNetworkId,1);
        html +='</div>';
        return html;

    }
    git_layout.prototype.static4ImageLayout130 = function (data, parentWidth) {
        // layout 21
        this.cbPreLayout();
        var html = '';
        var href_link = '';
        var slideMargin=0;
        var slideWidth = 148;
        var slidePadding = 0;
        //var slideWidth = 130;
        //var slidePadding = 18;
        var totalSlideWidth = slidePadding + slideWidth + slideMargin;
        var elID = "git_wrapper_" + this.idx;
        //if (this.widget.dbnwebid == 32295 || this.widget.dbnwebid == 28100){
        //    slidePadding=50;
        //}

        //css
        //structure/dimensions/position
        var widget_title_text_css = "";
        var wrapper_css = "position:relative; background:" + this.backgroundColor + "; box-sizing:content-box; -moz-box-sizing:content-box  !important; -webkit-box-sizing:content-box; width: 100%; ";
        if (dbnwix) wrapper_css += " width: 603px;";

        if (this.bgColorType == 1) wrapper_css += "border-top:1px solid #d6d6d6; border-bottom:1px solid #d6d6d6;"
        //if (this.direction == "rtl") wrapper_css += "direction:rtl;";
        wrapper_css += "padding-top:15px; padding-bottom:7px; margin-top: 20px; margin-bottom: 20px; ";
        var git_slides_wrap = "width:100%; display:block;  overflow:visible;";
        if (dbnwix)  git_slides_wrap += "margin-left:7px;";
        if (this.widget.dbndirection == "rtl")  git_slides_wrap += "float:right;";
        else git_slides_wrap += "float:left;";

        var widget_title_css = "padding:0px 0px 0px 0px; background-color:" + this.widgetTitleBgColor + ";";
        var title_bar_css = "float:left; width:100%;margin-bottom:10px;";
        if (dbnwix)  title_bar_css += "margin-left:7px;";

        var slide_css = "position:relative; float:left; width:"+slideWidth+"px; padding-right:"+slidePadding+"px; overflow:hidden;";
        if (this.widget.dbndirection == "rtl")  slide_css += "float:right;";
        else slide_css += "float:left;";

        var gslide_img_css = 'float:left; margin-bottom:5px;  text-align:center; padding:2px 2px; width:130px; height:130px; overflow:hidden;';
        var gslide_imgtag_css = 'padding:0px; margin:0px; border:none;width:130px;height:130px;';
        var gslide_title_css = "padding:0px 2px 5px 2px;";
        var gslide_title_a_css = "display:block;padding:0px; margin:0px;max-width: 135px; line-height: 15px; letter-spacing: 0px !important;";
        var gslide_domain_css = "padding:0px;";
        var gslide_domain_a_css = "display:block;padding:0px; margin:0px;line-height: 15px;letter-spacing: 0px !important;";
        gslide_domain_a_css    += "font-size:11px; font-weight:normal; font-family:"+ this.widget.dbnfont +"; color:#bbb; text-decoration:none; font-style: italic;";

        var graze_link_css      = "";

        //types and color
        wrapper_css         += "font-family:"+ this.widget.dbnfont +"; line-height:normal;";
        widget_title_css    += "font-size:"+this.widget.dbntitlefontsize+"px; font-weight:bold;color:"+ this.widgetTitleColor +";";
        if (this.widget.dbndirection == "rtl")  widget_title_css += "text-align: right; direction: 'rtl';";
        slide_css           += "font-family:"+ this.widget.dbnfont +";";
        gslide_title_a_css  += "font-size:12px; font-weight:normal; font-family:"+ this.widget.dbnfont +"; color:"+ this.titleColor  +";text-decoration:none;";
        if (this.widget.dbndirection == "rtl")  gslide_title_a_css += "text-align: right; direction: 'rtl';";

        graze_link_css      += "font-size:10px; color:"+ this.linkColor +"; text-decoration:none";
        html += '<style type="text/css">';
        html += '#git_slides_wrap_'+ this.idx +' .gslide_img:hover {background-color:#eaedf4 !important;}';
        html += '#git_slides_wrap_'+ this.idx +' .like_facebook {float:left;margin-top:5px;min-width:85px;height:20px;background:url("' + this.baseUrl + 'img/facebook-counter-bg.png") no-repeat left;border:none;}';
        html += '#git_slides_wrap_'+ this.idx +' .like_facebook span {float:right;height:20px;font-size:10px;font-family:Arial;color:black;background:url("' + this.baseUrl + 'img/facebook-counter-repeat.png") repeat-x;border-right:solid 1px #c1c1c1;border-top: none;border-bottom: none;margin-top: 1px;height: 18px;margin-right: 0px;padding-right: 6px;line-height: 18px;}';

        html += '#' + elID + ' .post_here {float:right;clear:both;margin-right:0px;bottom:3px;}';
        html += '#' + elID + ' .post_here a {text-align:right; font-size:8px; color:#BBBBBB !important; font-weight:bold; text-decoration:none}';
        html += '#' + elID + ' .post_here img{padding: 0px !important;background: none !important;border: none !important;-moz-box-shadow: none !important;-webkit-box-shadow: none !important;box-shadow: none !important;}';
        html += '#' + elID + ' .post_here.align_left{float:left}';
        html += '</style>';
        html +='<div id="git_wrapper_'+ this.idx +'" style="'+ wrapper_css +'">'+
            //title
            '<div id="git_title_bar" style="'+ title_bar_css +'">'+
            '<div id="git_title" class="git_title" style="'+ widget_title_css +'"><span style="'+ widget_title_text_css +'">'+ this.titleText +'</span></div>'+
            '<div id="git_close_'+ this.idx +'" style="display:none"><a style="display:none" href="javascript:void(0);">x</a></div>'+
            '</div>'+

            //slider container
            '<div id="git_slides_wrap_'+ this.idx +'" style="'+ git_slides_wrap +'">';

        var maxSlides = Math.floor(parentWidth / totalSlideWidth);
        if (dbnwix) maxSlides = 4;
        //if (this.widget.dbnwebid == 32295 || this.widget.dbnwebid == 28100){
        //    maxSlides = 5;
        //}
        var slide_count = (data.recs.length > maxSlides) ? maxSlides: data.recs.length;
        var thumb = null;
        for (k = 0; k < slide_count; k++) {
            var domain = this.domainname(data.recs[k].recType,data.recs[k].url,data.recs[k].displayName,20);
	    if (data.recs[k].recType == "RCT_ADS_MLT" && data.recs[k].postType == 1) {
		href_link = "#"
	    } else {		
		href_link = this.addTarget(data.recs[k].partner_id) + ' href="' + data.recs[k].url + '" onclick="sprk_click(this,\'' + data.recs[k].clickUrl + '\');"';
	    }

            if (k == 0 && this.widget.dbndirection == "rtl") {
                slide_css += "margin-right:14px;padding-right:10px;";
            }

            var post_type = data.recs[k].postType;
            var post_title = data.recs[k].title;

            if(post_type==1) {
		var fburl = data.recs[k].url;
                var extraDetails = post_title.split("@");
                post_title = extraDetails[0];
                extraDetails = extraDetails[1].split(",");
                var countLikes = extraDetails[0].replace("L","");
                var countComments = extraDetails[1].replace("C","");
		if (extraDetails[2]){
			fburl = extraDetails[2];
		}
            }

            thumb = this.thumbSize(data.recs[k].thumbnail_path,data.recs[k].category_id,4);
            // thumb = null;

            var lettersNr = 63;

            if (k >= (slide_count - 1)) {
                slide_css += "width:136px;padding-right:0px;";
                lettersNr = 40;
            }

            html += '<div class="gslide" style="'+ slide_css +'">';
            html += '<div class="gslide_img nohover" style="' + gslide_img_css + '">'+
                '<a ' + href_link + ' style="position:relative;padding:0px; margin:0px;" title="' + post_title + '">'+
                '<img id="g_img_' + this.idx + '_' + k + '" title="' + post_title + '" alt="' + post_title + '" onerror="layoutErrorImageHandling(this,' + data.recs[k].category_id + ',4,\''+this.baseUrl+'\')" src="' + thumb + '" style="position:relative;z-index:0;' + gslide_imgtag_css + '" />';
            if (post_type == 1) {
                html += '<img onerror="this.style.display=\'none\';"  src="' + this.baseUrl + 'img/facebook-like.png" style="position:absolute;z-index:2;left:0px;bottom:0px;"  alt="" />';
            }
            html += '</a></div>';
            html += '<div class="gslide_title"style="'+ gslide_title_css +'">'+
                '<a class="gslide_title_a" ' + href_link + '" style="' + gslide_title_a_css + '">' + this.shorten(post_title, lettersNr) + '</a>';
            if (post_type == 1) {
		if (data.recs[k].recType == "RCT_ADS_MLT") {
			html += '<div class="fb_partner_like ' + data.recs[k].partner_id + ' ' + k + '"><div class="fb-like" data-postid="' + data.recs[k].postId + '" data-href="' + fburl + '"data-layout="button_count" data-width="70" data-show-faces="false""></div></div><div class="social_net_button facebook_button"></div>';
		} else if (	countLikes > 0) {
			html += '<div class="like_facebook"><span>'+countLikes+'</span></div>';
		}
            }
            else if (domain)
                html += '<div class="gslide_domain" style="'+ gslide_domain_css +'"><a class="gslide_domain_a" '+ href_link +'" style="'+  gslide_domain_a_css +'">('+ this.shorten(domain, 16)  +')</a></div>';

            html += '</div>';
            html += '</div>';
        }
        html += '</div><div style="clear:both"></div>';	
	
	//if (this.widget.dbnwebid == 34949) html += this.getBranding(data.srcAdminNetworkId);        
	html += this.getBranding(data.srcAdminNetworkId,1);
	
        html +='</div>';
        return html;

    }

    // *********** LAYOUTS  - END ******

    git_layout.prototype.domainname = function(recType,url,displayName,len)
    {
        var domain = "";
        if(recType != "RCT_INNER_MLT")
        {
	    if (displayName == null)
	    {	
		    var urlParseRE = /(http|https):\/\/([^\/]+)\/?/;
		    matches = url.match(urlParseRE);
		    if(matches!=null)
		    {
			var str = matches[2].indexOf('www.') == 0 ? matches[2].substring(4) : matches[2];
			domain = this.shorten(str,len);
		    }
	    }
	    else 
	    {
		    domain = this.shorten(displayName,len);
	    }
        }
        return domain;
    }

    //<<<. git_layout end

    //>>>. git_widget begin

    sprk_slider = function(data, props){

        this.data = data;
        this.idx = props.idx;
        this.dbnwebid = (data.widget ? data.widget.websiteId : props.dbnwebid);
        this.dbnlayout = (data.widget ? data.widget.layoutTypeId : props.dbnlayout);
        this.dbnfont =    (data.widget ? ((data.widget.fontFamily == null)? 'inherit' : data.widget.fontFamily ) : props.dbnfont );
        this.dbncolor =   (data.widget ? ((data.widget.fontColor == null)? (function(){})() : data.widget.fontColor) : props.dbncolor );
        this.dbntitlefontsize = (data.widget ? ((data.widget.titleFontSize == null)? '14' : data.widget.titleFontSize) : '14');
        this.dbnbulletcolor = props.dbnbulletcolor;
        this.dbnheader = (data.widget ? ((data.widget.headerText == null)?"You might enjoy reading:":data.widget.headerText.replace(/</g,'&lt;').replace(/>/g,'&gt;') )  : "You might enjoy reading:");
        this.dbnremindercolor = (props.dbnremindercolor == 'default')?"#959595":props.dbnremindercolor;
        //this.dbnbgcolor = (data.widget ? ((data.widget.backgroundColor == null) ? (function(){})() : data.widget.backgroundColor ) : ((typeof(props.dbnbgcolor) !='undefined') ? props.dbnbgcolor : (function(){})());
        this.dbnbgcolor = (data.widget ? data.widget.backgroundColor : props.dbnbgcolor);
        if (this.dbnbgcolor == null) this.dbnbgcolor = (function(){})();
        this.dbnbgcolortype = (data.widget ? data.widget.backgroundColorType : props.dbnbgcolortype);
        this.dbnanchor = props.dbnanchor;
        this.dbndirection = (data.widget && data.widget.textDirection == 2)? 'rtl' : 'ltr';

        this.dbndisableclose = props.dbndisableclose;
        this.dbnalwaysvisible = props.dbnalwaysvisible;
        this.dbnwidgetloadedCB = props.dbnwidgetloadedCB;
        // this.slideAnimation =  props.dbnslideanimation; //(typeof(props.dbnslideanimation) == "undefined")? 'on' : props.dbnslideanimation;
        this.slider_offset = props.dbnsliderverticaloffset; //(typeof(props.dbnsliderverticaloffset) == "undefined")? 50 : ;


        this.location = this.getLocation();
        this.grazeFrame = null;
        this.slider_div = null;
        this.close_button = null;
        this.sliderTimer = 0;
        this.footer_handle_w = 200;
        this.side_handle_h = 200;
        this.layoutObj;

        if (this.location == "rightside") {
            this.slider_x = 0;    //horizontal pos
            this.slider_y = 0;    //verical pos
            this.slider_w = 236; //width
            this.slider_h = 202; //height;
        }
        else if (this.location == "footer") {
            this.slider_x = 0;    //horizontal pos
            this.slider_y = 0;    //verical pos
            this.slider_w = 932; //width
            this.slider_h = 125; //height;
        }
        this.slider_threshold = 0; // in percentage. Threshold percentage of page scrolled when the slider should appear or hide
        this.alreadySlidedOut = false;
        this.alreadySlidedIn    = false;
        this.alreadySliding = false;
        this.baseUrl = grazeBaseUrl;
        this.state = "maximized";
        this.slideShow=null;
        var obj = this;
        dbn_addEvent(window, 'resize', function(){
            obj.positionDiv();
        });
    }


    sprk_slider.prototype.doSlide = function(){
        if(this.alreadySliding) return true;
        this.setSliderThreshold();
        var documentHeight = sprk_libs.jq(document).height();
        var windowHeight = sprk_libs.jq(window).height();
        var scrollableArea = documentHeight - windowHeight;
        var vScrollPosition = sprk_libs.jq(window).scrollTop();
        var percentScrolled = Math.ceil((vScrollPosition * 100)/scrollableArea);

        if(percentScrolled >= this.slider_threshold){
            if(!this.alreadySlidedOut){
                this.maximize();
            }
        }
        else{
            if(!this.alreadySlidedIn){
                this.minimize();
            }
        }
        return true;
    }

    sprk_slider.prototype.setSliderThreshold = function() {

        if (this.dbnlayout >= 12 && this.dbnlayout <= 14)
            this.slider_threshold = 20;
    }

    sprk_slider.prototype.positionDiv = function(initial){
        if(this.slider_div==null) return;
        var size = {x:sprk_libs.jq(window).width(),y:sprk_libs.jq(window).height()};

        if (this.location == "rightside") {
            if (this.state == "maximized") {
                if (initial)
                    this.slider_x = (size.x);
                else
                    this.slider_x = (size.x-this.slider_w);
            }
            else
                this.slider_x = (size.x-16);
            this.slider_y = ((size.y - sprk_libs.jq(this.slider_div).height())- this.slider_offset);
        }
        else if (this.location == "footer") {
            if (this.state == "maximized") {
                if(initial)
                    this.slider_y = (size.y);
                else
                    this.slider_y = (size.y-this.slider_h);
            }
            else
                this.slider_y = (size.y-16);

            this.slider_x = ((size.x - parseInt(this.slider_div.style.width))/2);    //center of window width.
        }

        this.slider_div.style.left=this.slider_x+"px";
        this.slider_div.style.top=this.slider_y+"px";
    }

    sprk_slider.prototype.calcWidgetWidth = function () {
        var widgetWidth = 0;
        var slides = sprk_libs.jq('#git_slides_wrap_'+ this.idx +'>div.gslide').each(function(){
            widgetWidth += parseInt(sprk_libs.jq(this).outerWidth(true));
        });
        return widgetWidth;
    }
    sprk_slider.prototype.removeRecFromLast = function () {
        var slide = sprk_libs.jq('#git_slides_wrap_'+ this.idx +'>div.gslide:last');
        if(slide.length>0) slide.remove();
        slide = sprk_libs.jq('#git_slides_wrap_'+ this.idx +'>div.gslide:last');
        if(slide.length>0) slide.css('paddingRight','0'); //remove padding from last div
    }

    sprk_slider.prototype.data_reorg = function (data) {
        if (data.widget.websiteId == 23449) {
            var bFoundPaid = false;
            for (i = 0; i < data.recs.length; i++) {
                if (data.recs[i].recType == "RCT_OUTER_PAID_MLT") {
                    if (!bFoundPaid) {
                        bFoundPaid = true;
                    }
                    else {
                        data.recs.splice(i, 1);
                        i--;
                    }
                }
            }
        }
        return data;
    }

    sprk_slider.prototype.init = function () {
        if(this.data.recs.length == 0) {
            return;
        }
        var widget_type = (this.isstaticWidget())?"static":"sliding";

        this.slider_div=document.createElement('div');
        this.slider_div.id='gt_widget_'+ this.idx;
        if (typeof(this.slider_w) != 'undefined')
            this.slider_div.style.width=this.slider_w+"px";
        if (typeof(this.slider_h) != 'undefined')
            this.slider_div.style.height=this.slider_h+"px";

        this.slider_div.style.textAlign='left';

        this.data = this.data_reorg(this.data);

        if (widget_type == 'sliding') {
            document.body.appendChild(this.slider_div);
            this.slider_div.style.position = 'fixed';
            this.positionDiv(true);
        }
        else if (widget_type == 'static') {
            //ReStyling
            var style=document.createElement("style");
            style.type="text/css";
            if(this.dbnbgcolortype==undefined) this.dbnbgcolortype = 1;

            if(this.dbnbgcolortype ==1)    // light
                var borderColor= ".gslide:hover .gslide_img{border:1px solid #444444;}";
            else
                var borderColor = ".gslide:hover .gslide_img{border:1px solid #fff;}";

            style.innerHTML= borderColor +" .gslide_img{border:1px solid #bfbfbf;}";
            document.body.appendChild(style);
            //add anchor here..
            if (this.dbnanchor == false) {
                this.dbnanchor = 'spark_static_widget_'+ this.idx;
                var widget_anchor=document.createElement('div');
                widget_anchor.id=this.dbnanchor;
                sprk_libs.jq("#grazit_data_"+ this.idx).before(widget_anchor);
                document.getElementById(this.dbnanchor).appendChild(this.slider_div);
            }
            else {
                if(this.dbnanchor && document.getElementById(this.dbnanchor))
                    document.getElementById(this.dbnanchor).appendChild(this.slider_div);
            }
        }
        var parentWidth = sprk_libs.jq('#gt_widget_'+ this.idx).width();
        var slidesContent = this.getSlides(parentWidth);
        if (sprk_libs.jq(this.slider_div).html() != "") {
            return;
        }
        sprk_libs.jq(this.slider_div).html(slidesContent);
        this.bindActions();

        //add sliding effect
        if (widget_type == 'sliding') {
            var obj = this;

            //var url = window.location;

            if (typeof (this.dbndisableclose) == 'undefined' || this.dbndisableclose == false) {

                sprk_libs.jq("div#git_close_"+ this.idx +" a").click(function(){
                    obj.minimize();
                });
            }

            sprk_libs.jq("div#git_widget_handle_"+ this.idx +" a").click(function(){
                obj.maximize();
            });
        }
        else if (widget_type == 'static') {
            sprk_libs.jq("div#git_close_" + this.idx + " a").remove();

            if (this.dbnlayout == 17 || this.dbnlayout == 16) {
                var parentWidth = parseInt(sprk_libs.jq("#"+ this.dbnanchor).outerWidth());

                var widgetWidth = this.calcWidgetWidth();
                var recCount = 0;
                while (widgetWidth > parentWidth) {
                    this.removeRecFromLast();
                    widgetWidth = this.calcWidgetWidth();
                    recCount++;
                    if(recCount>20) break;   // prevent the loop from running
                    // infinitely
                }
            }
        }


        //widget loaded callback
        if (typeof (this.dbnwidgetloadedCB) == 'function') {
            this.dbnwidgetloadedCB();
        }

        /* start once the slides are in place */
        if (this.slideShowEnabled()) {
            this.slideShow = new git_slideshow(this.idx);
            this.slideShow.init();
        }

        if (widget_type == 'sliding') {
            if (typeof (this.dbnalwaysvisible) != 'undefined' && this.dbnalwaysvisible == true) {
                this.maximize();
            }
            else {
                this.sliderTimer = window.setInterval(function () {
                    obj.doSlide();
                }, 300);
            }
        }

    };

    sprk_slider.prototype.showWidget = function () {
        if (this.location == "rightside") {
            this.slider_x = sprk_libs.jq(window).width();
            this.slider_div.style.left = this.slider_x + "px";
        }
        else if (this.location == "footer") {
            this.slider_y = sprk_libs.jq(window).height();
            this.slider_div.style.top=this.slider_y +"px";
            document.getElementById('gt_widget_'+ this.idx).style.width=this.slider_w +'px';
        }

        this.positionDiv(true);
        document.getElementById("git_wrapper_"+ this.idx).style.display='block';
        document.getElementById("git_widget_handle_"+ this.idx).style.display='none';

    }

    sprk_slider.prototype.hideWidget = function () {
        if(this.location == "rightside")
            this.slider_div.style.left=this.slider_x-17+"px";
        else if(this.location == "footer")
            this.slider_div.style.top=this.slider_y-17+"px";
        this.positionDiv();
        document.getElementById("git_wrapper_"+ this.idx).style.display='none';
        document.getElementById("git_widget_handle_"+ this.idx).style.display='block';
    }

    sprk_slider.prototype.minimize = function () {
        var obj = this;
        var slideMode={};
        if(this.location=="rightside")
            slideMode={left:'+='+this.slider_w};
        else if(this.location="footer")
            slideMode={top:'+='+this.slider_h};
        obj.alreadySliding=true;
        sprk_libs.jq(this.slider_div).animate(slideMode,500,function(){
            sprk_libs.jq(this.slider_div).stop();
            obj.alreadySliding=false;
            obj.alreadySlidedIn=true;
            obj.state= "minimized";
            obj.hideWidget();
            if(obj.slideShow) obj.slideShow.stop();
            //#obj.afterMinimize();
            delete obj;
        });
    }

    sprk_slider.prototype.afterMinimize = function (callBack) {
        if (typeof (callBack) == 'function') {
            callBack();
        }
    }

    sprk_slider.prototype.maximize = function () {
        this.state = "maximized";
        this.showWidget();
        var obj = this;
        var slideMode={};
        if(this.location=="rightside")
            slideMode={left:'-='+this.slider_w};
        else if(this.location="footer")
            slideMode={top:'-='+this.slider_h};
        obj.alreadySliding=true;
        sprk_libs.jq(this.slider_div).animate(slideMode,500,function(){
            sprk_libs.jq(this.slider_div).stop();
            obj.alreadySliding=false;
            if(obj.sliderTimer) window.clearInterval(obj.sliderTimer);
            if(obj.slideShow) obj.slideShow.start();
            delete obj;
            //#obj.afterMaximize();
        });
    }

    sprk_slider.prototype.afterMaximize = function (callBack) {
        if (typeof (callBack) == 'function') {
            callBack();
        }
    }

    sprk_slider.prototype.bindActions = function () {
        if (this.dbnlayout == 23 || this.dbnlayout == 24 || this.dbnlayout == 19) {
            sprk_libs.jq("#git_wrapper_"+this.idx+" ul li").hover(function(){
                sprk_libs.jq(this).prev().addClass("noBorder");
            },function(){
                sprk_libs.jq(this).prev().removeClass("noBorder");
            });
        }
	
	if (this.dbnlayout == 25 || this.dbnlayout == 28) {
		
		if(this.dbnlayout == 28){
			
		    sprk_libs.jq("#git_wrapper_" + this.idx + " .engageya_case25_image").hover(function () {
			var t = sprk_libs.jq(this);
			t.find('.engageya_case25_imageHover').css("display", "block");
		    },
		    function () {
			var t = sprk_libs.jq(this);
			t.find('.engageya_case25_imageHover').css("display", "none");
		    });
	    }

            sprk_libs.jq("#git_wrapper_"+this.idx+" ul li").hover(function(){
                var t = sprk_libs.jq(this);
                t.find(".text").animate({
                    "marginTop":"0px"
                },{
                    queue: false,
                    duration:200,
                    complete: function() {
                        t.find("p,span").fadeIn("fast");
                    }
                });
                t.find(".h3").animate({
                    "marginTop":"50px"
                },{
                    queue: false,
                    duration:200
                });
            },function(){
                var t = sprk_libs.jq(this);
                t.find("p,span").fadeOut("fast");
                t.find(".text").animate({
                    "marginTop":"130px"
                },{
                    queue: false,
                    duration: 100,
                    complete: function() {
                        t.find("p").hide();;
                    }
                });
                t.find(".h3").animate({
                    "marginTop":"20px"
                },{
                    queue: false,
                    duration: 100
                });
            });
        }
    }

    sprk_slider.prototype.getSlides = function(parentWidth){
        if (this.data.recs.length > 0) {
            this.layoutObj = new git_layout(this);
            return this.layoutObj.getHtml(parentWidth);
        }

    }

    sprk_slider.prototype.getLocation = function () {
        if(
            this.dbnlayout == 12 ||
                this.dbnlayout == 13 ||
                this.dbnlayout == 14
            )
            return "footer";
        else if(
            this.dbnlayout == 15 ||
                this.dbnlayout == 16 ||
                this.dbnlayout == 17 ||
                this.dbnlayout == 18 ||
                this.dbnlayout == 19 ||
                this.dbnlayout == 20 ||
                this.dbnlayout == 21 ||
                this.dbnlayout == 22 ||
                this.dbnlayout == 23 ||
                this.dbnlayout == 24 ||
                this.dbnlayout == 25 ||
                this.dbnlayout == 26 ||
                this.dbnlayout == 27 ||
                this.dbnlayout == 28

            )
            return "anchored";
        else
            return "rightside";

    }

    sprk_slider.prototype.slideShowEnabled = function () {
        if(
            this.dbnlayout ==4 ||
                this.dbnlayout ==5 ||
                this.dbnlayout ==6 ||
                this.dbnlayout ==7 ||
                this.dbnlayout ==8 ||
                this.dbnlayout ==9 ||
                this.dbnlayout == 12 ||
                this.dbnlayout == 13 ||
                this.dbnlayout == 14 ||
                this.dbnlayout == 15 ||
                this.dbnlayout == 16 ||
                this.dbnlayout == 17 ||
                this.dbnlayout == 18 ||
                this.dbnlayout == 19 ||
                this.dbnlayout == 20 ||
                this.dbnlayout == 21 ||
                this.dbnlayout == 22 ||
                this.dbnlayout == 23 ||
                this.dbnlayout == 24 ||
                this.dbnlayout == 25 ||
                this.dbnlayout == 26 ||
                this.dbnlayout == 27 ||
                this.dbnlayout == 28

            )
            return false;
        else
            return true;

    }

    sprk_slider.prototype.isstaticWidget = function () {
        if(
            (this.dbnlayout == 10 && dbnwix) ||
                this.dbnlayout == 15 ||
                this.dbnlayout == 16 ||
                this.dbnlayout == 17 ||
                this.dbnlayout == 18 ||
                this.dbnlayout == 22 ||
                this.dbnlayout == 19 ||
                this.dbnlayout == 20 ||
                this.dbnlayout == 21 ||
                this.dbnlayout == 22 ||
                this.dbnlayout == 23 ||
                this.dbnlayout == 24 ||
                this.dbnlayout == 25 ||
                this.dbnlayout == 26 ||
                this.dbnlayout == 27 ||
                this.dbnlayout == 28
            )
            return true;
        else
            return false;
    }



    //<<<. git_widget end

    return function(){
        return 1;
    }
})();


if(typeof(dbn_fetchData) == 'undefined')
    var dbn_fetchData = function(idx,data_url){
        var script = document.getElementById("grazit_script");
        if( script ){
            var newScript = document.createElement("script");
            newScript.id="grazit_data_"+ idx;
            newScript.type="text/javascript"
            newScript.src = data_url;
            script.parentNode.appendChild(newScript);
        }
    }

if(typeof(dbn_loadWhenReady) == 'undefined')
    var dbn_loadWhenReady = function(idx,data_url){
        if (dbnwix && data_url.indexOf("&url=wix_editor_nourl") != -1) {
            sprk_reg[0]({"srcPostId":0,"srcWebsiteId":0,"srcWidgetId":0,"status":"S_OK","createTime":1,"responseTime":1,"requestId":"","recs":[{"postId":1,"title":"Spread your wings and fly","url":"http://www.somewebsite1.com/","clickUrl":"#","category_id":1,"partner_id":1,"thumbnail_path":"http://www.grazeit.com/thumbs/webid694/1.bp.blogspot.com.fly_1.jpg","description":"One of the greatest joys of this season is the opportunity to say THANK YOU... "},{"postId":1,"title":"Contextual whereabouts","url":"http://www.somewebsite2.com/","clickUrl":"#","category_id":1,"partner_id":1,"thumbnail_path":"http://www.grazeit.com/thumbs/webid694/3.bp.blogspot.com.ee_163720_1.jpg","description":"Digital content can be just about anywhere, and yet nowhere. What turns the collection of bytes into..."},{"postId":1,"title":"Special Agents of Pollination","url":"http://www.somewebsite3.com/","clickUrl":"#","category_id":1,"partner_id":1,"thumbnail_path":"http://www.grazeit.com/thumbs/webid694/2.bp.blogspot.com.z23_128625_1.jpg","description":"Various plants often reproduce through a gathering between two different plants from the same... "},{"postId":1,"title":"Don't be afraid to try new exciting things in life!","url":"http://www.somewebsite4.com/","clickUrl":"#","category_id":1,"partner_id":1,"thumbnail_path":"http://widget.engageya.com/img/default/LifeStyle4_1.jpg","description":"I never really understood who finds real interest in those fancy magazines lying next to the TV cabinet..."}],"widget":{"id":0,"publisherId":0,"layoutTypeId":dbnwixlayout,"fontColor":dbnwixcolor,"backgroundColorType":1,"headerText":dbnwixheader,"slideAnimationColorReminder":1,"websiteId":0,"websiteLanguageId":1,"fontFamily":dbnwixfont,"backgroundColor":dbnwixbgcolor,"platform":3,"titleFontSize":14,"textDirection":1},"date":"2012-06-27","hour":16});
        } else {

            dbn_fetchData(idx,data_url);
        }
    }


if(typeof(dbn_init) == 'undefined')
    var dbn_init = function(idx,data_url){

        if(typeof dbnwix=='undefined'){
            dbnwix=false;
        }

        if (dbnwix && dbnloaded)  {
            window.setTimeout(function(){
                if (sprk_reg.length) {
                    if (data_url.indexOf("&url=wix_editor_nourl") != -1) {
                        sprk_reg[0]({"srcPostId":0,"srcWebsiteId":0,"srcWidgetId":0,"status":"S_OK","createTime":1,"responseTime":1,"requestId":"","recs":[{"postId":1,"title":"Spread your wings and fly","url":"http://www.somewebsite1.com/","clickUrl":"#","category_id":1,"partner_id":1,"thumbnail_path":"http://www.grazeit.com/thumbs/webid694/1.bp.blogspot.com.fly_1.jpg","description":"One of the greatest joys of this season is the opportunity to say THANK YOU... "},{"postId":1,"title":"Contextual whereabouts","url":"http://www.somewebsite2.com/","clickUrl":"#","category_id":1,"partner_id":1,"thumbnail_path":"http://www.grazeit.com/thumbs/webid694/3.bp.blogspot.com.ee_163720_1.jpg","description":"Digital content can be just about anywhere, and yet nowhere. What turns the collection of bytes into..."},{"postId":1,"title":"Special Agents of Pollination","url":"http://www.somewebsite3.com/","clickUrl":"#","category_id":1,"partner_id":1,"thumbnail_path":"http://www.grazeit.com/thumbs/webid694/2.bp.blogspot.com.z23_128625_1.jpg","description":"Various plants often reproduce through a gathering between two different plants from the same... "},{"postId":1,"title":"@ the right place","url":"http://www.somewebsite4.com/","clickUrl":"#","category_id":1,"partner_id":1,"thumbnail_path":"http://www.grazeit.com/thumbs/webid599/4.bp.blogspot.com.nh_125148_1.jpg","description":"I never really understood who finds real interest in those fancy magazines lying next to the TV cabinet..."},{"postId":1,"title":"Don't be afraid to try new exciting things in life!","url":"http://www.somewebsite5.com/","clickUrl":"#","category_id":1,"partner_id":1,"thumbnail_path":"http://widget.engageya.com/img/default/LifeStyle4_1.jpg","description":"I never really understood who finds real interest in those fancy magazines lying next to the TV cabinet..."},{"postId":1,"title":"I can fly higher than an eagle...","url":"http://www.somewebsite6.com/","clickUrl":"#","category_id":1,"partner_id":1,"thumbnail_path":"http://widget.engageya.com/img/default/LifeStyle9_1.jpg","description":"I never really understood who finds real interest in those fancy magazines lying next to the TV cabinet..."}],"widget":{"id":0,"publisherId":0,"layoutTypeId":dbnwixlayout,"fontColor":dbnwixcolor,"backgroundColorType":1,"headerText":dbnwixheader,"slideAnimationColorReminder":1,"websiteId":0,"websiteLanguageId":1,"fontFamily":dbnwixfont,"backgroundColor":dbnwixbgcolor,"platform":3,"titleFontSize":14,"textDirection":1},"date":"2012-06-27","hour":16});
                    }
                    else {
                        dbn_fetchData(idx,data_url);
                    }
                }
                else {
                    dbn_loadWhenReady(idx,data_url);
                }
            },500);
            return;
        }


        var cbar_readyBound = false;
        var cbar_isReady= false;

        bindReady(function() {
            dbn_loadWhenReady(idx,data_url);
        });
        function bindReady(handler){

            var called = false

            function ready() {
                if (called) return
                called = true
                handler()
            }

            if ( document.addEventListener ) { // native event
                document.addEventListener( "DOMContentLoaded", ready, false )
            } else if ( document.attachEvent ) {  // IE

                try {
                    var isFrame = window.frameElement != null
                } catch(e) {}

                // IE, the document is not inside a frame
                if ( document.documentElement.doScroll && !isFrame ) {
                    function tryScroll(){
                        if (called) return
                        try {
                            document.documentElement.doScroll("left")
                            ready()
                        } catch(e) {
                            setTimeout(tryScroll, 10)
                        }
                    }
                    tryScroll()
                }

                // IE, the document is inside a frame
                document.attachEvent("onreadystatechange", function(){
                    if ( document.readyState === "complete" ) {
                        ready()
                    }
                })
            }

            // Old browsers
            if (window.addEventListener)
                window.addEventListener('load', ready, false)
            else if (window.attachEvent)
                window.attachEvent('onload', ready)
            else {
                var fn = window.onload // very old browser, copy old onload
                window.onload = function() { // replace by new onload and call the old one
                    fn && fn()
                    ready()
                }
            }
        }


    }

if(typeof(sprk_is_continue) == 'undefined') var sprk_is_continue = function(){
    if (dbnpid == 7955 || (dbnpid == 8637 && dbnwebid != 4705) || dbnwebid == 28337)
        return false;
    if ((dbnpid == 8716 || dbnpid == 8851) && typeof(dbnanchors) !='undefined' && dbnanchors.length > 1) {
        return false;
    }
    if ((dbnpid == 7039 || dbnpid == 2506 || dbnpid == 2705 || dbnpid == 9090) && typeof(dbnanchors) !='undefined' && dbnanchors.length == 0) {
        return false;
    }
    if (dbnwebid == 3 && dbnurls[0].indexOf('img') != (-1) ) {
        return false;
    }
    return true;
}

if(typeof(sprk_reg) == 'undefined') var sprk_reg = [];  //init function registry
if(typeof(sprk_widgets) == 'undefined') var sprk_widgets = [];  //widgets registry
if(typeof(sprk_f) == 'undefined') var sprk_f = function(url){
    sprk_reg.push((function(){
        var idx = sprk_reg.length;
        var widgetObj;
        var props = {
            'idx': idx,
            'dbnpid': (typeof(dbnpid) !='undefined')?dbnpid:1,
            'dbnwebid': (typeof(dbnwebid) !='undefined')?dbnwebid:1,
            'dbnwid': (typeof(dbnwid) !='undefined')?dbnwid:1,
            'dbnlayout': (typeof(dbnlayout) !='undefined')?dbnlayout:1,
            'dbnfont': (typeof(dbnfont) !='undefined')?"'"+ dbnfont +"'":'inherit',
            'dbncolor': (typeof(dbncolor) !='undefined')?dbncolor:(function(){})(),
            'dbntitlefontsize': (typeof(dbntitlefontsize) !='undefined')?dbntitlefontsize :14,
            'dbnbulletcolor': (typeof(dbnbulletcolor) !='undefined')?dbnbulletcolor:'inherit',
            'dbnsliderverticaloffset': (typeof(dbnsliderverticaloffset) !='undefined')?dbnsliderverticaloffset:50,
            'dbndisableclose': (typeof(dbndisableclose) !='undefined')?dbndisableclose:false,
            'dbnalwaysvisible': (typeof(dbnalwaysvisible) !='undefined')?dbnalwaysvisible:false,
            'dbnwidgetloadedCB': (typeof(dbnwidgetloadedCB) !='undefined')?dbnwidgetloadedCB:false,
            'dbnheader': (typeof(dbnheader) =='undefined')?'default':dbnheader,
            'dbnbgcolor':(typeof(dbnbgcolor) !='undefined')?dbnbgcolor:(function(){})(),
            'dbnbgcolortype':(typeof(dbnbgcolortype) == 'undefined')?1:dbnbgcolortype, //1= light, 2= dark
            'dbnremindercolor':(typeof(dbnremindercolor) =='undefined')?'default':dbnremindercolor,
            'dbndirection':(typeof(dbndirection) =='undefined')?'ltr':dbndirection,
            'dbnanchor': (typeof(dbnanchor) !='undefined')?dbnanchor:false
        }

        var widgetUrl = (typeof(url) != 'undefined')?url:document.location.href;
        widgetUrl = sprk_ut_canonize_url(widgetUrl);

        var callbackName = "dbn_dataCallback" + idx;
        window[callbackName] = function(data) {
            if(data.recs) {
                var index = idx;
                if (dbnwix && data.recs.length == 0) {
                    sprk_reg[0]({"srcPostId":0,"srcWebsiteId":0,"srcWidgetId":0,"status":"S_OK","createTime":1,"responseTime":1,"requestId":"","recs":[{"postId":2503226,"title":"Sports clubs, athletes and ball games","url":"http://frohlingerbarak.wix.com/sports-photography","clickUrl":"http://api.grazeit.com:8080/rec-api/click.json?spid=0&swebid=0&dpid=2503226&dwebid=5445&wid=0&ll=1&target=http%3A%2F%2Ffrohlingerbarak.wix.com%2Fsports-photography","category_id":39,"partner_id":5445,"thumbnail_path":"http://www.grazeit.com/thumbs/webid5445/static.wix.com.84770f_2b8f4126bf6a78d119a6a9e76486fed4_1.jpg","description":"18, NY\nSports photography refers to the genre of photography that covers all types of sports","recType":"RCT_OUTER_MLT"},{"postId":2500377,"title":"Fine art philosophy & photography ","url":"http://frohlingerbarak.wix.com/fine-art-photography","clickUrl":"http://api.grazeit.com:8080/rec-api/click.json?spid=0&swebid=0&dpid=2500377&dwebid=5426&wid=0&ll=2&target=http%3A%2F%2Ffrohlingerbarak.wix.com%2Ffine-art-photography","category_id":29,"partner_id":5426,"thumbnail_path":"http://www.grazeit.com/thumbs/webid5426/static.wix.com.41d000_4890a4c4cacf9be535fffc9e6d8f8040_154391_1.jpg","description":"Fine-art photography","recType":"RCT_OUTER_MLT"},{"postId":2503002,"title":"Beautiful Brides & Weddings Photography","url":"http://frohlingerbarak.wix.com/wedding-photography","clickUrl":"http://api.grazeit.com:8080/rec-api/click.json?spid=0&swebid=0&dpid=2503002&dwebid=5441&wid=0&ll=3&target=http%3A%2F%2Ffrohlingerbarak.wix.com%2Fwedding-photography","category_id":16,"partner_id":5441,"thumbnail_path":"http://www.grazeit.com/thumbs/webid5441/static.wix.com.41d000_4b0cc3093fe0e6963fab71b9f51a6166_1.jpg","description":"Wedding photography in Colorado and surrounding areas","recType":"RCT_OUTER_MLT"},{"postId":2511510,"title":"Organic Garden Fresh Foods","url":"http://frohlingerbarak.wix.com/food-photography","clickUrl":"http://api.grazeit.com:8080/rec-api/click.json?spid=0&swebid=0&dpid=2511510&dwebid=5523&wid=0&ll=4&target=http%3A%2F%2Ffrohlingerbarak.wix.com%2Ffood-photography","category_id":21,"partner_id":5523,"thumbnail_path":"http://www.grazeit.com/thumbs/webid5523/static.wix.com.84770f_c132ece16c981dee9efcf464405c1d7e_1.jpg","description":"I'm a description.","recType":"RCT_OUTER_MLT"},{"postId":2505194,"title":"Pets Photographer - photograph you dog, cat or any pet","url":"http://frohlingerbarak.wix.com/dog-photographer","clickUrl":"http://api.grazeit.com:8080/rec-api/click.json?spid=0&swebid=0&dpid=2505194&dwebid=5466&wid=0&ll=5&target=http%3A%2F%2Ffrohlingerbarak.wix.com%2Fdog-photographer","category_id":38,"partner_id":5466,"thumbnail_path":"http://www.grazeit.com/thumbs/webid5466/grazeit.com.insect_1.png","description":"Print\nSay Hi!\nMy favorite photographer is Sally Mann.","recType":"RCT_OUTER_MLT"}],"widget":{"id":0,"publisherId":0,"layoutTypeId":dbnwixlayout,"fontColor":dbnwixcolor,"backgroundColorType":1,"headerText":dbnwixheader,"slideAnimationColorReminder":1,"websiteId":0,"websiteLanguageId":1,"fontFamily":dbnwixfont,"backgroundColor":dbnwixbgcolor,"platform":3,"titleFontSize":14,"textDirection":1},"date":"2012-06-27","hour":16});
                }
                else    if (data.recs.length > 0) {
                    sprk_reg[index](data);
                }
            }
        }

        var widgetDataUrl = 'http://api.grazeit.com:8080/rec-api/getrecs.json?cb=' + callbackName + '&pubid='+props.dbnpid+'&webid='+props.dbnwebid+'&wid='+ props.dbnwid+'&recsnum=10&url='+widgetUrl;

        if (typeof(dbnanchors) !='undefined' && dbnanchors.length > 1) {
            widgetDataUrl += "&ismultiple=true";
        }
        var f = function(data){
            widgetObj = new sprk_slider(data, props)
            if(idx == widgetObj.idx){
                sprk_widgets[idx] = widgetObj;
            }
            var checkjQLib = (function(){
                if (typeof (sprk_libs.jq) == 'undefined') {
                    window.setTimeout(arguments.callee,100);
                    return;
                }
                else widgetObj.init();
            })();
        };

        dbn_init(idx,widgetDataUrl);
        return f;
    })());
}

if(typeof(sprk_ut_canonize_url) == 'undefined') var sprk_ut_canonize_url = function(widgetUrl,cutchar){

    widgetUrl = sprk_ut_url_cut(widgetUrl,"",0)
	
    if( (typeof(dbnplatform) != 'undefined' && dbnplatform == 1) || (dbnpid == 31918 )){
        widgetUrl = sprk_ut_url_cut(widgetUrl,"/search",0)
        widgetUrl = sprk_ut_url_cut(widgetUrl,"?",0)
    }

    if (dbnwebid == 23451 || dbnwebid == 28559) {
        widgetUrl = sprk_ut_url_cut(widgetUrl,"/attachment/",0)
    }
    
    if (dbnwebid == 31260 || dbnwebid == 37393) {
        widgetUrl = sprk_ut_url_cut(widgetUrl,"/?attachment_id=",0)
    }

    if (dbnwebid == 25905 || dbnwebid == 36395 || dbnwebid == 37393) {
        widgetUrl = sprk_ut_url_cut(widgetUrl,"",3)
    }
    
    if (dbnwebid == 32650) {
        widgetUrl = sprk_ut_url_cut(widgetUrl,"",1)
    }    

    if (dbnwebid == 23449) {
        widgetUrl = sprk_ut_url_cut(widgetUrl,"",4)
    }    

    if (dbnwebid == 19450 || dbnwebid == 28100 || dbnwebid == 29000 || dbnwebid == 29001 || dbnwebid == 29290 || dbnwebid == 30548 || dbnwebid == 31240 || dbnwebid == 31793 || dbnwebid == 32477 || dbnwebid == 34025 || dbnwebid == 34050 || dbnwebid == 36066 || dbnwebid == 36384 || dbnwebid == 39611 || dbnwebid == 39559 || dbnwebid == 39620 || dbnwebid == 39550 || dbnwebid == 39561 || dbnwebid == 39631 || dbnwebid == 39615 || dbnwebid == 39608 || dbnwebid == 39547 || dbnwebid == 39622 || dbnwebid == 39627 || dbnwebid == 39606 || dbnwebid == 39652 || dbnwebid == 39610 || dbnwebid == 39630 || dbnwebid == 34803 || dbnwebid == 34804 || dbnwebid == 34805 || dbnwebid == 40318 || dbnwebid == 41021 || dbnwebid == 37393){
        widgetUrl = sprk_ut_url_cut(widgetUrl,"?",0)
    }

    widgetUrl = encodeURIComponent(widgetUrl);

    return widgetUrl;
}

if(typeof(sprk_ut_url_cut) == 'undefined') var sprk_ut_url_cut = function(widgetUrl,cutchar,urlpartslen){		
	
	try{
		if (typeof(widgetUrl.href) != 'undefined')  {
			
			if (widgetUrl.href.indexOf('https://') == 0) {
				widgetUrl = widgetUrl.href.substr(0,4) + widgetUrl.href.substr(5);
			}
			
			if (cutchar && widgetUrl.href.indexOf(cutchar) != -1) {
				widgetUrl = widgetUrl.href.substring(0, widgetUrl.href.indexOf(cutchar));
			}
			
			if (urlpartslen > 0) {
				var regex = new RegExp('^(http|https):\/\/([^\/]+)\/?([^/]+\/?){' + urlpartslen + '}?', 'i');
				matches = widgetUrl.href.match(regex);
				widgetUrl = matches[0];			
			}
		    
		}
		else {
			if (widgetUrl.indexOf('https://') == 0) {
				widgetUrl = widgetUrl.substr(0,4) + widgetUrl.substr(5);
			}
			
			if (cutchar && widgetUrl.indexOf(cutchar) != -1) {
				widgetUrl = widgetUrl.substring(0, widgetUrl.indexOf(cutchar));
			}
			
			if (urlpartslen > 0) {
				var regex = new RegExp('^(http|https):\/\/([^\/]+)\/?([^/]+\/?){' + urlpartslen + '}?', 'i');
				matches = widgetUrl.match(regex);
				widgetUrl = matches[0];			
			}
			
		}
	} catch(e){}

    return widgetUrl;
}

function layoutErrorImageHandling(obj, category_id, size, baseUrl) {
    var img;
    var random = Math.floor((Math.random()*9)+1);

    var technology = new Array(3,98,94,96,112,116,129,130,119,121,122);
    var entertainment = new Array(101,103,105,107,111,17,19,20,21);
    var lifestyle = new Array(30,31,124,153,154,0);
    var business = new Array(150,151,15,12,13,117,97,89,91,92,93);
    var finance = new Array(12,999);
    var soccer = new Array(24,999);
    var fitness = new Array(125,999);
    var sports =  new Array(2,23,25,48,60,61,66,70,72,80,82,84,125,128,149,155,156);
    var society = new Array(29,32,33,14,10,53,57,131,132,133);
    var shopping = new Array(134,135,136,137,138,140,141,145,146,147);
    var weddings = new Array(157,999);
    var travel = new Array(22,148);
    var automobiles = new Array(11,999);
    var beauty = new Array(152,999);
    var art = new Array(7,999);
    var fashion = new Array(153,999);
    var photography = new Array(26,999);
    var food = new Array(118,139);
    var poetry = new Array ();
    var games = new Array(5,999);
    var health= new Array(16,143);
    var homeandfamily = new Array(28,142);
    var kidsandteens = new Array();
    var parenting = new Array();
    var humor = new Array(123,999);
    var internetmarketing = new Array(8,90);
    var music = new Array(18,144);
    var news = new Array(54,999);

    //var random = Math.floor((Math.random()*10)+1); //1-11 images
    //img = baseUrl + "img/default/LifeStyle"+random+"_"+size+".jpg";

    var random = Math.floor((Math.random()*38)+1); //1-39 images
    img = baseUrl + "img/default/News"+random+"_"+size+".jpg";

    if (in_array(category_id, technology)) {
        random = Math.floor((Math.random() * 10) + 1); //1-11 images
        img = baseUrl + "img/default/Technology" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, entertainment)) {
        random = Math.floor((Math.random() * 26) + 1); //1-27 images
        img = baseUrl + "img/default/Entertainment" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, lifestyle)) {
        random = Math.floor((Math.random() * 26) + 1); //1-27 images
        img = baseUrl + "img/default/LifeStyle" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, business)) {
        random = Math.floor((Math.random() * 19) + 1); //1-20 images
        img = baseUrl + "img/default/Business" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, fitness)) {
        random = Math.floor((Math.random() * 21) + 1); //1-22 images
        img = baseUrl + "img/default/Fitness" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, sports)) {
        random = Math.floor((Math.random() * 11) + 1); //1-12 images
        img = baseUrl + "img/default/Sports" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, soccer)) {
        random = Math.floor((Math.random() * 5) + 1); //1-6 images
        img = baseUrl + "img/default/Soccer" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, society)) {
        random = Math.floor((Math.random() * 21) + 1); //1-22 images
        img = baseUrl + "img/default/Society" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, shopping)) {
        random = Math.floor((Math.random() * 9) + 1); //1-10 images
        img = baseUrl + "img/default/Shopping" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, weddings)) {
        random = Math.floor((Math.random() * 11) + 1); //1-12 images
        img = baseUrl + "img/default/Weddings" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, travel)) {
        random = Math.floor((Math.random() * 11) + 1); //1-12 images
        img = baseUrl + "img/default/Travel" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, automobiles)) {
        random = Math.floor((Math.random() * 10) + 1); //1-11 images
        img = baseUrl + "img/default/Automobiles" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, beauty)) {
        random = Math.floor((Math.random() * 12) + 1); //1-13 images
        img = baseUrl + "img/default/Beauty" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, fashion)) {
        random = Math.floor((Math.random() * 13) + 1); //1-14 images
        img = baseUrl + "img/default/Fashion" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, finance)) {
        random = Math.floor((Math.random() * 9) + 1); //1-10 images
        img = baseUrl + "img/default/Finance" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, food)) {
        random = Math.floor((Math.random() * 13) + 1); //1-14 images
        img = baseUrl + "img/default/Food" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, games)) {
        random = Math.floor((Math.random() * 9) + 1); //1-10 images
        img = baseUrl + "img/default/Games" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, health)) {
        random = Math.floor((Math.random() * 10) + 1); //1-11 images
        img = baseUrl + "img/default/Health" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, homeandfamily)) {
        random = Math.floor((Math.random() * 26) + 1); //1-27 images
        img = baseUrl + "img/default/HomeANDFamily" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, humor)) {
        random = Math.floor((Math.random() * 12) + 1); //1-13 images
        img = baseUrl + "img/default/Humor" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, internetmarketing)) {
        random = Math.floor((Math.random() * 9) + 1); //1-10 images
        img = baseUrl + "img/default/InternetMarketing" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, kidsandteens)) {
        random = Math.floor((Math.random() * 12) + 1); //1-13 images
        img = baseUrl + "img/default/KindsANDTeens" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, music)) {
        random = Math.floor((Math.random() * 13) + 1); //1-14 images
        img = baseUrl + "img/default/Music" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, news)) {
        random = Math.floor((Math.random() * 38) + 1); //1-39 images
        img = baseUrl + "img/default/News" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, parenting)) {
        random = Math.floor((Math.random() * 9) + 1); //1-10 images
        img = baseUrl + "img/default/Parenting" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, art)) {
        random = Math.floor((Math.random() * 9) + 1); //1-10 images
        img = baseUrl + "img/default/art" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, photography)) {
        random = Math.floor((Math.random() * 9) + 1); //1-10 images
        img = baseUrl + "img/default/Photography" + random + "_" + size + ".jpg";
    }
    if (in_array(category_id, poetry)) {
        random = Math.floor((Math.random()*12)+1); //1-13 images
        img = baseUrl + "img/default/PoetryANDLiterature"+random+"_"+size+".jpg";
    }

    if(obj)
        obj.src = img;

    return img;
}

function in_array(needle, haystack) {
    for(var i in haystack) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

var sprk_init = (function() {
    if (!sprk_is_continue())
        return;
    var urls = (typeof (dbnurls) == 'object') ? dbnurls : [];
    if(typeof dbnwix=='undefined') dbnwix=false;

    //in static widgets - check there are  dbnanchors
    if (typeof (dbnanchors) == 'object' && dbnanchors.length && (dbnlayout >= 15 || (dbnwix && dbnlayout == 10))) {
        var anchors = dbnanchors;

        for (ax = 0; ax < anchors.length; ax++) {
            if (document.getElementById(anchors[ax])) {
                dbnanchor = anchors[ax];    //global variable
                if(ax < urls.length)
                    sprk_f(urls[ax]);
                else
                    sprk_f();
            }
        }
    }
    else {
        if (urls.length) {
            sprk_f(urls[0]);
        }
        else if (dbnwebid == 36097) {
            var urlParam;
            var keyValuePairs = location.search.slice(1).split('&');

            for (var i = 0; i < keyValuePairs.length; i++) {
                var keyValuePair = keyValuePairs[i];
                keyValuePair = keyValuePair.split('=');
                if (keyValuePair[0] == "url") {
                    urlParam = decodeURIComponent(keyValuePair[1]);
                }
            }

            if(typeof urlParam=='undefined' || urlParam == "")
                sprk_f();
            else
                sprk_f(urlParam);
        }
        else {
            sprk_f();
        }
    }
    //reset variables for next tag.
    dbndirection = dbnpid = dbnlayout = dbnfont = dbncolor = dbntitlefontsize = dbnbulletcolor = dbnsliderverticaloffset = dbndisableclose = dbnalwaysvisible = dbnwidgetloadedCB = dbnheader = dbnbgcolor = dbnbgcolortype = dbnremindercolor = dbnanchors = dbnanchor = dbnurls = dbnwebid = dbnwid = (function(){})();

})();