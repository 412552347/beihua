(function(){

	//二级导航,控制文本换行，改变行间距
	var sed_ul=getClass("sed_ul");
	var sed_li;

	for(var j=0;j<sed_ul.length;j++){
		sed_li=sed_ul[j].children;

		for(var i=0;i<sed_li.length;i++){
			var a=getTagName("a",sed_li[i])[0];

			if(a.innerHTML.length>6){
				a.style.lineHeight="20px";
				a.style.paddingTop="5px";
				a.style.paddingBottom="5px";
			}
		}
	}

	//二级导航
	var first_nav=getClass("first_ul")[0];
	var first_li=first_nav.children;

	for(var i=0;i<first_li.length;i++){

		addEvent(first_li[i],"mouseover",nav_over);
		addEvent(first_li[i],"mouseout",nav_out);
		
	}

	function nav_over(){
			var _this=this;
			var sed_ul=getClass("sed_ul",_this)[0];
			if(sed_ul){
				sed_ul.style.display="block"
			}
	}
	function nav_out(){
			var _this=this;
			var sed_ul=getClass("sed_ul",_this)[0];
			if(sed_ul){
				sed_ul.style.display="none"
			}
	}

   
})()