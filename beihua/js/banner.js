(function(){
 //轮播图
	var banner_nav=getClass("banner")[0];

	if(banner_nav != undefined){
	
		var banner_img=getTagName("img",banner_nav);
		var banner_title=getClass("title",banner_nav)[0];

		var btn_next=getClass("next")[0];
		var btn_prev=getClass("prev")[0];

		var banner_index=1;

		var banner_arry=[];

		opacity(banner_img[0],100);
		banner_title.innerHTML=banner_img[0].alt;


		var banner_timer=setInterval(banner_fn,4000);

		addEvent(banner_nav,"mouseover",function(){
			clearInterval(banner_timer);
			btn_next.style.display="block";
			btn_prev.style.display="block";

		})

		addEvent(banner_nav,"mouseout",function(){
			banner_timer=setInterval(banner_fn,4000);
			btn_next.style.display="none";
			btn_prev.style.display="none";
		})

		var agent=Boolean(window.navigator.userAgent.match(/Trident/g));
   
		if(typeof window.attachEvent == "undefined" && !agent){
			window.onblur=function(){
				clearInterval(banner_timer);
			}
			window.onfocus=function(){
				clearInterval(banner_timer);
				banner_timer=setInterval(banner_fn,4000);
			}
		}

		//手动轮播

		addEvent(btn_prev,"click",btn_prev_fn)
		
		addEvent(btn_next,"click",btn_next_fn)
		
	}
	

	function btn_prev_fn(){
		clearInterval(banner_timer);
		btn_next_fn.disabled=false;
		btn_prev.disabled=true;
		banner_fn();
	}

	function btn_next_fn(){
		clearInterval(banner_timer);
		btn_prev.disabled=false;
		btn_next_fn.disabled=true;
		banner_next_fn();
	}

	function banner_fn(){
		if(banner_index<0){
			banner_index=banner_img.length-1;
		}else{
			banner_index=banner_index > banner_img.length ? banner_index=1 : banner_index;
		}

		var obj=(banner_index == 0 ? banner_img.length-1 : banner_index-1);
		var prev=(banner_index >= banner_img.length ? 0 : banner_index);

		opacity(banner_img[obj],100);
		opacity(banner_img[prev],100);
		banner_img[prev].style.left=998+"px";

		animate({
	   		ele:eq(banner_arry,banner_img,obj),
	   		attr:'x',
	   		star:0,
			target:-998,
			t:50,
			step:10

	    })

	    animate({
	   		ele:eq(banner_arry,banner_img,prev),
	   		attr:'x',
	   		star:998,
			target:0,
			t:50,
			step:10,
			fn:function(){
				btn_prev.disabled=false;
			}
	    })

	    banner_title.innerHTML=banner_img[prev].alt;
	    banner_index++;

	}

	function banner_next_fn(){
		if(banner_index>banner_img.length-1){
			banner_index=0
		}else{
			banner_index = banner_index < 0 ? banner_img.length-1 : banner_index;
		}
		

		var obj=(banner_index == 0 ? banner_img.length-1 : banner_index-1);
		var next=(obj == 0 ? banner_img.length-1 : obj-1);

		opacity(banner_img[obj],100);
		opacity(banner_img[next],100);
		banner_img[next].style.left=-998+"px";

		animate({
	   		ele:eq(banner_arry,banner_img,obj),
	   		attr:'x',
	   		star:0,
			target:998,
			t:50,
			step:10
	    })

	    animate({
	   		ele:eq(banner_arry,banner_img,next),
	   		attr:'x',
	   		star:-998,
			target:0,
			t:50,
			step:10,
			fn:function(){
				btn_next.disabled=false;
			}
	    })

	    banner_title.innerHTML=banner_img[next].alt;
	    banner_index--;
		
	}


})()