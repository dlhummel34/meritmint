
//window.onscroll = function () { window.scrollTo(0, 0); };

$(document).ready(function(){

    base = "https://www.sakarigin.com";

    $("#overflowwo-inside,#overflowwo").click(function(e){
        e.stopImmediatePropagation();
    });
    
    $("#privacy").click(function(){
        $("#privacy").removeClass("open");
        $("body").removeClass("privacy");
    });

    $("#link-privacy").click(function(e){
        e.preventDefault();
        $("#privacy").addClass("open");
        $("body").addClass("privacy");
    });
    
    $("#closePrivacy").click(function(e){
        e.preventDefault();
        $("#privacy").removeClass("open");
        $("body").removeClass("privacy");
    });    
    
    $("#nope-button").click(function(e){
        $("#questions").addClass("up");
    });
    
    

    Splitting({ target: $(".splitted"),by:'chars' });


    $(window).scrollTop(0);
    
    //$("#site-preloader-image").velocity("stop");
    $("#site-preloader-image").velocity({rotateZ: "+=360"},1000);    
    
    // preloader
    var tempo = setInterval(function(){
        $("#site-preloader-image").velocity("stop");
        $("#site-preloader-image").velocity({rotateZ: "+=360"},1000);   


    },1500);

    
$('section.sese,#botanics-img').waypoint(function() {
    try{
    	//console.log( $(this) );
        id = $(this)[0].element.id;
        //if(id=="botanics_img") id  ="botanicals";
        //console.log( id );
        if ( $("#r_" + id).length ){
            $("#menuLinks .yop").removeClass("active");
            $("#r_" + id).addClass("active");
        }
    } catch(error) {
        
    }
        
    
}, { offset: 0 });  


var waypoint = new Waypoint({
  element: document.getElementById('contacts'),
  handler: function(direction) {
            $("#menuLinks .yop").removeClass("active");
            $("#r_contacts").addClass("active");
  },
  offset: 'bottom-in-view'
});
  
    
$('body').waitForImages(function() {
    $("#body").removeClass("fixed");

	//Foundation.reInit('equalizer');
	clearInterval(tempo);


    //$("#site-preloader-image").velocity("stop");
		
	$("#site-preloader-bar").velocity("stop");
	$("#site-preloader-bar").velocity({
		width	:	"100%"
	
	},{
		easing	:	"easeInExpo",
		duration : 1000,
		complete : function(){
		
        gsap.from("#section-intro .d1", {duration: 2, yPercent:50,opacity:0,ease: Expo.easeOut});            
        gsap.from("#section-intro .d3", {duration: 2, delay:.3,yPercent:50,opacity:0,ease: Expo.easeOut});
        gsap.from("#section-intro #sakeImg", {duration: 2, delay:.5,opacity:0,ease: Expo.easeOut});       
        gsap.from("#section-intro #leafIntro", {duration: 2, delay:.5,yPercent:30,xPercent:-30,opacity:0,ease: Expo.easeOut});                   
		gsap.from("#section-intro #leafIntro2", {duration: 2, delay:.3,yPercent:30,xPercent:-30,opacity:0,ease: Expo.easeOut});        

		//tl = new gsap.timeline({delay:.3});
		//tl.to("#section-intro #petaloIntro", {duration: 2,yPercent:30,rotation:-30,opacity:1,ease: Expo.easeOut,transformOrigin:"cente center"},0);
		//tl.to("#section-intro #petaloIntro", {duration: 2,yPercent:50,rotation:0,ease: Expo.easeOut,transformOrigin:"cente center"},"-=1");
		//tl.play();
		        
		gsap.set("#section-intro #petaloIntro",{rotation:30});
		gsap.to("#section-intro #petaloIntro", {duration: 5,delay:.5,yPercent:50,x:10,opacity:1,ease: Expo.easeOut,transformOrigin:"cente center"});            
		gsap.to("#section-intro #petaloIntro", {duration: 2,rotation:0,ease: Back.easeOut,transformOrigin:"cente center"});            
//		gsap.to("#section-intro #petaloIntro", {duration: 1.5,delay:2,rotation:0,ease: Expo.easeOut,transformOrigin:"cente center"});            				
            
            
		$("#site-preloader-image").velocity({
	    		translateY 		: "100px"
			},{
				complete: function(){
					$("#site-preloader").velocity({
							opacity	: "0"
						},{complete: function(){
							$("#site-preloader").css("display","none");
							$("#theWrappo").css("opacity",1);
						}}
					);
				}
			});
		
		} 
	});
	
	$("#body").removeClass("fixed");
		
}, function(loaded, count, success) {


	
	//if(!$("#site-preloader-bar").is('.velocity-animating')) {
		$("#site-preloader-bar").velocity("stop");
		$("#site-preloader-bar").velocity({
			width:	((loaded/count)*50)+"%"
		},3000);
    
	//}
	

});

// fine preloader
    
    
    /*
    function setCookie(name, value, days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }    
    
    alert(getCookie("news"));
    */
    $("#closeNews").click(function(e){
        e.preventDefault();
        //$("#news").css("transform","translateY(-100px)");
        $("body").removeClass("canViewBo");
        //setCookie("news",$(this).attr("rel"),60);
    });
    
    function menuzza(){
        $(".yop").each(function() {
            h = $(this).outerHeight();
            $(this).css("transform","translateY("+h+"px)");
            d=0;
            de = $(this).data("delay");
            if(de) d=de;
            gsap.to(this,.4,{
                delay:d,opacity:1,y: 0,ease: Cubic.easeOut});

        });         
    }
    
    
    $("#openMenuA").click(function(e){
        e.preventDefault();
        $("body").addClass("open");
        
        menuzza();
        
    });
    
    $("#menuLinks a").click(function(e){
        
        $(".yop").each(function() {
            d=0;
            h = $(this).outerHeight();
            de = $(this).data("delay");
            if(de) d=de;
            gsap.to(this,.2,{
                delay:d,opacity:1,y: h,ease: Cubic.easeOut});

        });                 
        
        
        e.preventDefault();
        linko = $(this).attr("href");
		pos = 0;
        
        if(linko=="#botanicals"){
            pos = $("#botanics-img").offset().top - 100
        }

        if(linko=="#contacts"){
            pos = $(document).height() - $(window).height();
        }

		if(pos==0) {
        	pos = $($(linko).find(".grid-x")[0]).offset().top - 100; //($(window).height()/2)
        }
        
        gsap.to(window, {duration: 2.5, scrollTo:{y:pos,autoKill: false },ease: Expo.easeInOut});
        $("body").removeClass("open");
        history.pushState({}, '', linko);
    });
    
    $(".a-button").click(function(e){
        e.preventDefault();
        linko = $(this).attr("href");
        if(linko=="#where-to-buy"){
            pos = $(document).height() - $(window).height();
        }
        
        gsap.to(window, {duration: 2, scrollTo:{y:pos,autoKill: false },ease: Expo.easeInOut});
        history.pushState({}, '', linko);
        
    });
    
    $("#sakari-logo-min,#menuLogoDaje").click(function(e){
        e.preventDefault();
        gsap.to(window, {duration: 2, scrollTo:{y:0,autoKill: false },ease: Expo.easeInOut});
        history.pushState({}, '','');
    });
    
    
    $("#closeMenuA").click(function(e){
        e.preventDefault();
        $(".yop").each(function() {
            d=0;
            h = $(this).outerHeight();
            de = $(this).data("delay");
            if(de) d=de;
            gsap.to(this,.2,{
                delay:d,opacity:1,y: h,ease: Cubic.easeOut});

        }); 
        $("body").removeClass("open");
    });    
    
    $("#scrollUp").click(function(){
        //gsap.to(window, {duration: 2, scrollTo: 0});
        gsap.to(window, {duration: 2, scrollTo:{y:"#wrap",autoKill: false },ease: Expo.easeInOut});
    });
    
    gsap.registerPlugin(ScrollToPlugin);
    gsap.registerPlugin(ScrollTrigger);
    
    initAll();
    
    $("#button").click(function(){
        //initAll();
        $("body").addClass("canView");
        $("body").addClass("canViewBo");
        //gsap.to(window, {duration: 2, scrollTo:{y:"#wrap",autoKill: true, onComplete:yourFunction},ease: Expo.easeInOut});
        
        //gsap.to("#section-intro", 2, {height: 0, ease: Cubic.easeOut});
        
        //gsap.to("#wrap", 2, {transform: 'translateY(-100vh)', ease: Cubic.easeOut});
        gsap.to("#section-intro", 1, {transform: 'translateY(-100vh)',opacity:1, ease: Cubic.easeInOut});
        
        //gsap.from("#s1 *", 2, {yPercent:20,opacity:0, ease: Cubic.easeOut});
        //gsap.from("#s2 *", 2, {yPercent:20,opacity:0, ease: Cubic.easeOut});
        
        spark("#s1");
        //spark("#s2");
        //spark("#s1 *");
        //spark("#s2 *");
        
        
        setTimeout(function(){ 
            $("#section-intro").css("display","none");
            
            //initAll();
            //#wrap {opacity:0;}
            $("#wrap").addClass("wrappo");
        }, 2000);
        
        
        
    });
    
    function spark(nome){
        
        $("#s1 .inside").each(function(){
            d = $(this).data("delay");
            t = $(this).height()/60;
            gsap.from($(this),t, {yPercent: 150,opacity:0,ease: Cubic.easeOut,delay:d });    
        });
        
        $chars = $("#s1").find(".word");
        gsap.fromTo($chars,{opacity:0,yPercent:100},{opacity:1,yPercent:0,delay:1,stagger:0.01,ease: Power2.easeOut});
        
        gsap.from("#leaf3",6.5, {rotate:10,yPercent: -100,opacity:0,ease: Expo.easeOut,delay:.6 });
        gsap.from("#leaf2",4.5, {rotate:-15,yPercent: -65,opacity:0,ease: Cubic.easeOut,delay:.4 });
        
        gsap.from("#leaf1",3, {rotate:10,yPercent: -60,opacity:0,ease: Cubic.easeOut,delay:.0 });
        gsap.from("#bottle",2, {rotate:0,yPercent: 40,opacity:1,ease: Cubic.easeOut,delay:.0 });
        gsap.from("#JDG",2, {yPercent: 20,rotation:-20, opacity:1,ease: Cubic.easeOut,delay:.0 });


        gsap.from(".petallo.p0",3.5, {rotate:10,yPercent: 200,opacity:1,ease: Expo.easeOut,delay:.1 });
        gsap.from(".petallo.p1",3.5, {rotate:10,yPercent: 200,opacity:1,ease: Expo.easeOut,delay:.1 });
        gsap.from(".petallo.p2",2.5, {yPercent: 180,opacity:1,ease: Expo.easeOut,delay:.2 });
        gsap.from(".petallo.p3",3.5, {rotate:5,yPercent: 200,opacity:1,ease: Expo.easeOut,delay:.3 });
        gsap.from(".petallo.p4",5.5, {rotate:12,yPercent: 150,opacity:1,ease: Expo.easeOut,delay:.4 });                        
        gsap.from(".petallo.p5",5.5, {rotate:-50,yPercent: 150,opacity:1,ease: Expo.easeOut,delay:.4 });        
        
        gsap.from(".petallo.p6",5.5, {rotate:"-=12",yPercent: 150,opacity:1,ease: Expo.easeOut,delay:.5 });
        gsap.from(".petallo.p7",5, {rotate:12,yPercent: 250,opacity:1,ease: Expo.easeOut,delay:.6 });                
		gsap.from(".petallo.p8",5, {yPercent: 250,opacity:1,ease: Expo.easeOut,delay:.6 });                        
        
        return;
        gsap.utils.toArray(nome).forEach(layer => {
            r1 = Math.random()/2;
            r2 = Math.random() * 10;
            gsap.from(
                layer,2, {yPercent: r2,opacity:0,ease: Cubic.easeOut,delay:r1 }
            );
        });
    }
    
    function yourFunction(){
        //gsap.to("#section-intro", 2, {transform: 'translateY(-100vh)',height:0,onComplete:yourFunction2, ease: Cubic.easeOut});
        //$("#section-intro").css("display","none");
        //alert("scrollato");
    }
    
    function yourFunction2(){
        //alert("fine 2");
    }
    
    
    function initAll(){
/*
ScrollTrigger.create({
  trigger: "#menu",
  start: "top top",
  // pin for the difference in heights between the content and the sidebar
  
  pin: "#menu",
  // before version 3.4.1, the "float" property wasn't copied to the pin-spacer, so we manually do it here. Could do it in a style sheet instead if you prefer. 
  onRefresh: self => self.pin.parentNode.style.float = "left",
  pinSpacing: false
});        
        
*/
        /*
        ScrollTrigger.create({
            trigger: "#cucuNews",
            start: 'top top',
            endTrigger: '#history',
            toggleClass: {targets: "body", className: "news"},
            markers: false,
            onUpdate: self => function(){
                alert("porco dio");
                if(self.direction==-1){
                    gsap.to(window, {duration: .5, scrollTo:{y:"#wrap",autoKill: true, onComplete:yourFunction},ease: Expo.easeInOut});
                }
            }
        });        
        */
        
        ScrollTrigger.create({
            trigger: "#wrap",
            start: 'top top',
            toggleActions: 'play reverse none reverse',
            toggleClass: {targets: "body", className: "fixed"},

        });
        /*
        ScrollTrigger.create({
            trigger: "#wrap",
            start: 'top top',
            toggleClass: {targets: "body", className: "_start"},
        });        
        */
        
        
    gsap.from("#sakari-logo-min",1.2,{
        scrollTrigger: {
            trigger:"#sakari-logo-min",
            //toggleActions: "restart none none none"
        },
        rotation:360,
        ease: Cubic.easeOut
    });        

    $(".rotate").each(function() {
        gsap.from(this,1.2,{
            scrollTrigger: {
                trigger:this,
            },
            rotation:360,
            ease: Cubic.easeOut
        });
    });    
        
        
        
    $(".l").each(function() {
        gsap.from(this,1.2,{           
            scrollTrigger: {
                trigger:this,
                //toggleActions: "restart none none none"
            },opacity:0,xPercent: -20,ease: Cubic.easeOut});
    });    
  
    $(".r").each(function() {
        gsap.from(this,1.2,{
            scrollTrigger: {
                trigger:this,
                //toggleActions: "restart none none none"
            },
            opacity:0,xPercent: 20,
            ease: Cubic.easeOut
        });
        
    });    
    $(".t").each(function() {
        gsap.from(this,1.2,{
            scrollTrigger: {
                trigger:this,
                //toggleActions: "restart none none none"
            },opacity:0,yPercent: -20,ease: Cubic.easeOut});
        
    });    
    $(".b").each(function() {
        gsap.from(this,1.2,{
            scrollTrigger: {
                trigger:this,
                //toggleActions: "restart none none none"
            },opacity:0,yPercent: 20,ease: Cubic.easeOut});
        
    });     
        
    $(".toto").each(function() {
        gsap.from(this,1.2,{
            scrollTrigger: {
                trigger:this,
                //toggleActions: "restart none none none"
            },opacity:0,yPercent: -60,ease: Cubic.easeOut});
        
    });    
    $(".bobo").each(function() {
        gsap.from(this,1.2,{
            scrollTrigger: {
                trigger:this,
                //toggleActions: "restart none none none"
            },opacity:0,yPercent: 60,ease: Cubic.easeOut});
        
    });         
        
        
    $(".to").each(function() {
        d=0;
        de = $(this).data("delay");
        if(de) d=de;
        
        trigger=this;        
        t = $(this).data("trigger");
        if(t) trigger=t;

        
        gsap.from(this,1.2,{
            scrollTrigger: {
                trigger:trigger,
                //toggleActions: "restart none none none"
            },delay:d,yPercent: -150,ease: Cubic.easeOut});
        
    });    
    $(".bo").each(function() {
        d=0;
        de = $(this).data("delay");
        if(de) d=de;        
        
        trigger=this;        
        t = $(this).data("trigger");
        if(t) trigger=t;
        
        
        gsap.from(this,1.2,{
            scrollTrigger: {
                trigger:trigger,
                //toggleActions: "restart none none none"
            },delay:d,yPercent: 150,ease: Cubic.easeOut});
        
    });          
        
    $(".bu").each(function() {
        d=0;
        de = $(this).data("delay");
        if(de) d=de;
        gsap.from(this,1,{
            scrollTrigger: {
                trigger:this,
                
                //toggleActions: "restart none none none"
            },delay:d,opacity:1,yPercent: 100,ease: Cubic.easeOut});
        
    });  
    
    $(".op").each(function() {
        gsap.from(this,1,{
            scrollTrigger: {
                trigger:this,
                //toggleActions: "restart none none none"
            },opacity:0,ease: Cubic.easeOut});
        
    });  
    
    shadow = document.getElementById("shadow");
    gsap.to(shadow, {
      scaleX: 1.8,
      transformOrigin:"center center",
      opacity:.2,
      ease: "none",
      scrollTrigger: {
        trigger: shadow,
        scrub: true
      }
    });   
    



/*
tl = gsap.timeline({
	scrollTrigger: {
		trigger: "#s1",
		start: "top top",
		end: "bottom top",
		scrub: true
	}
});

*/



gsap.utils.toArray(".parallax").forEach(layer => {
	depth = layer.dataset.depth;
    trigger = layer.dataset.trigger;
    rotaus = layer.dataset.rotaus;    
	movement = (layer.offsetHeight * depth)
    if(trigger=="" || trigger=="undefined" || trigger==undefined) {
        //trigger = "#wrap";
        trigger = "#" + $(layer).parent().closest('section').attr("id");
        //alert(trigger);
    }
    //alert(trigger);
    
	//tl.to(layer, {y: movement, ease: "none"}, 0)
    
    scrub = Math.random() * (2 - 1) + 1;
    rotate = Math.random() * (50 - 1) + 1;

    if(rotaus) {

	    gsap.from(
    	    layer, {
        	    scrollTrigger: {
            	    trigger: trigger,
                	start:"top bottom",
	                end:"bottom top",
    	            scrub: 1,
        	      },    
			y: movement,
	        rotation:"-=" + rotaus,	        
			transformOrigin:"center center"
	        }
    	);
    
    	return;
    }

    if($(layer).hasClass("rotallo")) {

	    gsap.from(
    	    layer, {
        	    scrollTrigger: {
            	    trigger: trigger,
                	start:"top bottom",
	                end:"bottom top",
    	            scrub: scrub,
        	      },        
	        y: movement,
	        rotation:"+=50",	        
			transformOrigin:"center center"
	        }
    	);
    
    	return;
    }
    
    if($(layer).hasClass("leaf")) {

	    gsap.from(
    	    layer, {
        	    scrollTrigger: {
            	    trigger: trigger,
                	start:"top bottom",
	                end:"bottom top",
    	            scrub: scrub,
        	      },        
	        y: movement,
	        rotation:"+=" + Math.floor(Math.random() * (7 - 3 + 1) ) + 3,	        
			transformOrigin:"center center"
	        }
    	);
    
    	return;
    }    
    
    if($(layer).hasClass("petallo")) {
	    gsap.from(
    	    layer, {
        	    scrollTrigger: {
            	    trigger: trigger,
                	start:"top bottom",
	                end:"bottom top",
    	            scrub: scrub,
        	      },        
	        y: movement,
	        rotation:"+=" + Math.floor(Math.random() * (7 - 3 + 1) ) + 3,	        
			transformOrigin:"center center"
	        }
    	);
		return;
    } 

	    gsap.from(
    	    layer, {
        	    scrollTrigger: {
            	    trigger: trigger,
                	start:"top bottom",
	                end:"bottom top",
    	            scrub: scrub,
        	      },        
	        y: movement,
			transformOrigin:"center center"
	        }
    	);     
    
    
    
});


    
/*
    bg = document.getElementById("history"); 
    bg.style.backgroundPosition = `50% ${-innerHeight / 2}px`;

    gsap.to(bg, {
      backgroundPosition: `50% ${innerHeight / 2}px`,
      ease: "none",
      scrollTrigger: {
        trigger: bg,
        scrub: true
      }
    });
    */
    
    bg = document.getElementById("sake"); 
    bg.style.backgroundPosition = `50% ${-innerHeight / 2}px`;

    gsap.to(bg, {
      backgroundPosition: `50% ${innerHeight / 2}px`,
      ease: "none",
      scrollTrigger: {
        trigger: bg,
        scrub: true
      }
    });  
      
    /*
    bg = document.getElementById("s9"); 
    bg.style.backgroundPosition = `50% -1000px`;

    gsap.to(bg, {
      backgroundPosition: `50% ${innerHeight / 100}px`,
      ease: "none",
      scrollTrigger: {
        trigger: bg,
        scrub: true
      }
    });         
*/
  
    }
    
    
// Iterate over each select element
$('select').each(function () {

    // Cache the number of options
    var $this = $(this),
        numberOfOptions = $(this).children('option').length;

    // Hides the select element
    $this.addClass('s-hidden');

    // Wrap the select element in a div
    $this.wrap('<div class="select"></div>');

    // Insert a styled div to sit over the top of the hidden select element
    $this.after('<div class="styledSelect"></div>');

    // Cache the styled div
    var $styledSelect = $this.next('div.styledSelect');

    // Show the first select option in the styled div
    //$styledSelect.text($this.children('option').eq(0).text());
    $styledSelect.text($this.attr("rel"));

    // Insert an unordered list after the styled div and also cache the list
    var $list = $('<ul />', {
        'class': 'options'
    }).insertAfter($styledSelect);

    // Insert a list item into the unordered list for each select option
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    // Cache the list items
    var $listItems = $list.children('li');

    // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
    $styledSelect.click(function (e) {
        e.stopPropagation();
        $('div.styledSelect.active').each(function () {
            $(this).removeClass('active').next('ul.options').hide();
        });
        $(this).toggleClass('active').next('ul.options').toggle();
    });

    // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
    // Updates the select element to have the value of the equivalent option
    $listItems.click(function (e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();

        location.href= base + "/" + $this.val();
    });

    // Hides the unordered list when clicking outside of it
    $(document).click(function () {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});    
    
    
    
    
    

    
    $(document).on("click",".options li",function(){
        alert("aa");
    });    
    
});
