(function(){
	
//选项卡
   //选项
   var inform_nav_list=getClass("inform_nav")[0];
   var inform_nav_li=getTagName("li",inform_nav_list);
   //文章
   var inform_list=getClass("inform_list");
 
   inform_list[0].style.display="block";
   inform_nav_li[0].style.background="#004A9D";
   inform_nav_li[0].style.color="#fff";

   for(var t=0;t<inform_nav_li.length;t++){
   	
   		addEvent(inform_nav_li[t],"click",function(){
   			for(var i=0;i<inform_nav_li.length;i++){
   				inform_nav_li[i].style.background="#fff";
   				inform_nav_li[i].style.color="#004A9D";

   				inform_nav_li[index(this)].style.background="#004A9D";
   				inform_nav_li[index(this)].style.color="#fff";
   			}

   			for(var j=0;j<inform_list.length;j++){
   				inform_list[j].style.display="none";

   				inform_list[index(this)].style.display="block";
   			}
   			
   		})
   }
   
})()