function addEvent(obj,type,fn){
	if(typeof obj.addEventListener != "undefined"){
		obj.addEventListener(type,fn,false);
	}else {
		if(!obj.events) obj.events={};
		if(!obj.events[type]){
			obj.events[type]=[];
			obj.events[type][0]=fn;
		}else{
			if(addEvent.equal(obj.events[type],fn)) return false;
			obj.events[type][addEvent.num++]=fn;
		}

		obj["on"+type]=addEvent.exec
	}
}
addEvent.num=1;
addEvent.exec=function(e){
	var e=e||window.event;
	var es=this.events[e.type];
	for(var i=0;i<es.length;i++){
		if(typeof es[i] == "function"){
			es[i].call(this,e);
		}
	}

}

addEvent.equal=function(es,fn){
	for(var i in es){
		if(es[i] == fn) return true;
	}
	return false;
}


function removeEvent(obj,type,fn){
	if(typeof obj.removeEventListener != "undefined"){
		obj.removeEventListener(type,fn,false);
	}else{
		if(obj.events){
			es=obj.events[type];
			for(var i in es){
				if(es[i] == fn){
					delete es[i];
					
				}
			}

		}	
	}
}

function getStyle(element,attr){
	if(typeof window.getComputedStyle!='undefined'){
		return window.getComputedStyle(element,null)[attr];
	}else if(typeof element.currentStyle!='undefined'){
		return element.currentStyle[attr];
	}
}

function getClass(className,parentNode){
	var childElements=[];
	var node=null;
	if(arguments.length == 2){
		node=parentNode;
	}else if(arguments.length == 1){
		node=document;
	}

	var all=node.getElementsByTagName("*");

	for(var i=0;i<all.length;i++){

		var name=all[i].className.match(new RegExp("(^|\\s)"+className+"($|\\s)"));
		
		if(!!name){
			childElements.push(all[i]);
		}
	}
	return childElements;
}

function getTagName(tagName,parentNode){
	var node=null;
	if(arguments.length == 2){
		node=parentNode;
	}else if(arguments.length == 1){
		node=document;
	}
	return node.getElementsByTagName(tagName);
}


function index(ele){
	var child=ele.parentNode.children;
	for(var i=0;i<child.length;i++){
		if(ele == child[i]){
			return i;
		}
	}
}

function opacity(ele,num){
		ele.style.opacity=num/100;
		ele.style.filter='alpaha(opacity='+num+')';
}

function eq(arry,ele,num){
	arry[0]=ele[num];
	return arry;
}


function animate(obj){
	ele=obj['ele'];

	for(i=0;i<ele.length;i++){

		var a=ele[i];
	    var attr = obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y' ? 'top' : 
				   obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height' : 
				   obj['attr']=='o' ? 'opacity' : obj['attr']!=undefined ? obj['attr'] : 'left';    //移动方向，可选，默认为left
					   
		var start= obj['start']!==undefined ? obj['start'] : attr=='opacity' ? 
		               parseFloat(getStyle(a,attr))*100 : parseInt(getStyle(a,attr));  //初始位置，可选，默认为元素最初所处的位置
					   
		var step=obj['step']!=undefined ? obj['step'] : 20;        //每次移动的像素大小，可选，默认为10
		var t=obj['t']!=undefined ? obj['t'] : 10;                   //执行事件间隔，可选，默认为50
	    var target=obj['target'];                          //最终移动的位置，必选 
		var mul=obj['mul']                        //同步动画
		var speed=obj['speed']!=undefined ? obj['speed'] : 6;        //速度，可选，默认为6
		var type=obj['type']==0 ? 'constant' : obj['type']==1 ? 'buffer' : 'buffer';

		
		if(attr=='opacity'){
			a.style.opacity=parseInt(start)/100;
			a.style.filter='alpha(opacity='+parseInt(start)+')'
		}else{
			
		}
		if(mul==undefined){
			mul={};
			mul[attr]=target;
		}

		clearInterval(a.timer);
		
		a.timer=setInterval(function(){			
           
            var flag=true;
			
		    for(var i in mul){

			   attr=i == 'x' ? 'left' : i == 'y' ? 'top' : i == 'w' ? 'width' : i == 'h' ? 'height' : i == 'o' ? 'opacity' : i != undefined ? i : 'left';
			   target=mul[i];
			   
			   if(type=='buffer'){
				
			    step= attr=='opacity' ? (target-parseFloat(getStyle(a,attr))*100)/speed :
				                        (target-parseInt(getStyle(a,attr)))/speed;
				step=step>0 ? Math.ceil(step) : Math.floor(step) ;
			    }
               if(attr=='opacity'){
				   if(step==0){
				       setOpacity();
			        }else if(step>0&&Math.floor(Math.abs(parseFloat(getStyle(a,attr))*100-target))<=step){						
				       setOpacity();			
			        }else if(step<0&&(parseFloat(getStyle(a,attr))*100-target)<=Math.abs(step)){
				       setOpacity();	
			        }else{
				       var temp=parseFloat(getStyle(a,'opacity'))*100;
				       a.style.opacity=parseInt(temp+step)/100;
				       a.style.filter='alpaha(opacity='+parseInt(temp+step)+')'	
			        }
					if(parseInt(target)!=parseInt(parseFloat(getStyle(a,attr))*100)) flag=false;
			    }else{
			        if(step==0){
				       setTarget()
			        }else if(step>0&&Math.abs(parseInt(getStyle(a,attr))-target)<=step){
				       setTarget();			
			        }else if(step<0&&(parseInt(getStyle(a,attr))-target)<=Math.abs(step)){
				       setTarget();	
			        }else{
				       a.style[attr]=parseInt(getStyle(a,attr))+step+'px';	
			        }
					if(parseInt(target)!=parseInt(getStyle(a,attr))) flag=false;
			    }		
		    }
			
            if(flag){
				clearInterval(a.timer);
				if(obj.fn!=undefined)obj.fn();  //异步动画
			}
				
			function setTarget(){
				a.style[attr]=target;	
			}
			
			function setOpacity(){
				a.style.opacity=parseInt(target)/100;
				a.style.filter='alpaha(opacity='+parseInt(target)+')';
			}
            		
		},t)
	}
	return this;
}
