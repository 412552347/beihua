(function(){

	var weixin=getClass("weixin_pics")[0];
	if(weixin != undefined){
		var weixin_pics=getTagName("img",weixin);
		var weixin_content=getClass("weixin_content")[0];

		var weixin_name=getClass("name")[0];
		var weixin_num=getClass("weixin_num")[0];

		var span_width=Math.floor(parseInt(getStyle(weixin_num,"width"))/(weixin_pics.length));

		var weixin_index=1;

		var weixin_arry=[];

		for(var i=0;i<weixin_pics.length;i++){

			var span=document.createElement("span");
			span.className="weixin_num_";
			span.style.width=span_width+"px";
			weixin_num.appendChild(span);
		}
		var weixin_num_=getClass("weixin_num_");

		if(weixin_pics[0] != undefined){
			opacity(weixin_pics[0],100);
			weixin_num_[0].style.background="#658BF7";
		} 


		if(weixin_pics.length != 0){
			var weixin_timer=setInterval(weixin_fn,4000);
		}

		addEvent(weixin_content,"mouseover",function(){
			if(weixin_pics.length != 0){
				clearInterval(weixin_timer);
			}
				
		})

		addEvent(weixin_content,"mouseout",function(){
			if(weixin_pics.length != 0){
				weixin_timer=setInterval(weixin_fn,4000);
			}
		})

		//手动微信轮播

		for(var k=0;k<weixin_num_.length;k++){
			addEvent(weixin_num_[k],"click",function(){
				 
				weixin_index=index(this);

				weixin_fn();
			})
		}

		
	} 
	
	function weixin_fn(){

		weixin_index = weixin_index > weixin_pics.length ? weixin_index=1 : weixin_index;

		var obj=(weixin_index == 0 ? weixin_pics.length-1 : weixin_index-1);
		var prev=(weixin_index >= weixin_pics.length ? 0 : weixin_index);


		weixin_num_[obj].style.background="#004A9D";
		weixin_num_[prev].style.background="#658BF7";

		animate({
	   		ele:eq(weixin_arry,weixin_pics,obj),
	   		attr:'o',
			target:0,
			t:60,
			step:10
	    })

	    animate({
	   		ele:eq(weixin_arry,weixin_pics,prev), 
	   		attr:'o',
			target:100,
			t:60,
			step:10
	    })
 	
	   weixin_name.innerHTML=weixin_pics[prev].alt;

	   weixin_index++;
	}

	
})()