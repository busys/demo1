
//向上滑的时候，其实每一列做的操作的都一样，就拿出一列来做例子，
//向上滑的时候，这一列里的每一行都需要遍历，但是需要从上到下去遍历
//每一次遍历的时候，都要去找到离这一列最近的一个非0的位置
//如果能找到，在判断，如果当前位置和最近非零位置的值相等，当前位置值*2，非零位置的值改成0
//如果当前位置为0的话，就把值互换，并且下一次循环依然从当前位置循环，也就是说要阻止r++,所以先执行一次r--；

mui.plusReady(function(){
function Game(){
	this.level=4;//4*4
	this.score=0;//这一局的分数
	this.numArr=[];//虚拟数据的数组
	this.boxs=$(".gameCon div[class^=gr]");//页面中要操作的盒子
	
}
Game.prototype={
	init:function(){
		
		this.score=0;
		this.numArr=[];
		
		this.makeNumArr();
		this.makeRandom();
		this.makeRandom();
		this.showNum();
		
		this.showScore();
		
		this.showBest();
	},
	makeNumArr:function(){//创建2维数组
		for (var r=0;r<this.level;r++) {
			var arr=[];
			for (var c=0;c<this.level;c++) {
				arr.push(0);
			}
			this.numArr.push(arr);		
		}
	},
	makeRandom:function(){//给数组中的为0的位置随机的放一个2或者4
		//1.获取都有哪些位置是0，只有为0的位置才能放2或者4
		var addresArr=[];//存放为0‘位置’的数组
		for (var r=0;r<this.level;r++) {			
			for (var c=0;c<this.level;c++) {
				if(this.numArr[r][c]==0){
					addresArr.push({r:r,c:c})
				}
			}	
		}
		
//		如果数组里有为0的位置，就随机的从里面找一个位置赋值成2或者4
		if(addresArr.length){
			var ran=Math.floor(Math.random()*addresArr.length);
			var addres=addresArr[ran];
			var num=Math.random()>0.5?2:4
			this.numArr[addres.r][addres.c]=num;
		}
			
	},
	showNum:function(){//把虚拟数据显示在页面中
		for (var r=0;r<this.level;r++) {			
			for (var c=0;c<this.level;c++) {
				var box=this.boxs[r*this.level+c];
				switch(this.numArr[r][c]){
					case 0: $(box).attr("data-num",this.numArr[r][c]).html('') ;break;
					case 2: $(box).attr("data-num",this.numArr[r][c]).html('HTML') ;break;
					case 4: $(box).attr("data-num",this.numArr[r][c]).html('CSS') ;break;
					case 8: $(box).attr("data-num",this.numArr[r][c]).html('JS') ;break;
					case 16: $(box).attr("data-num",this.numArr[r][c]).html('JQ') ;break;
					case 32: $(box).attr("data-num",this.numArr[r][c]).html('H5') ;break;
					case 64: $(box).attr("data-num",this.numArr[r][c]).html('CSS3'); break;
					case 128: $(box).attr("data-num",this.numArr[r][c]).html('Flex') ;break;
					case 256: $(box).attr("data-num",this.numArr[r][c]).html('Media') ;break;
					case 512: $(box).attr("data-num",this.numArr[r][c]).html('WP') ;break;
					case 1024: $(box).attr("data-num",this.numArr[r][c]).html('NG') ;break;
					case 2048: $(box).attr("data-num",this.numArr[r][c]).html('Vue') ;break;
				}
			}	
		}
	},
	moveUp:function(){		
		for (var c=0;c<this.level;c++) {
			for (var r=0;r<this.level;r++) {
				var _r=this.getUpInRow(r,c);//找见离当前位置最近的非零的位置的行数			
				if(_r==-1){//如果找不见，这次就啥也不干了
					break;
				}else{//如果找到了的话
					if(this.numArr[r][c]==0){//如果当前位置为0
						//互换位置
						this.numArr[r][c]=this.numArr[_r][c];
						this.numArr[_r][c]=0;
						
						//保留当前的r
						r--;
						//如果当前位置的值和离最近的非零位置相等的话
					}else if(this.numArr[r][c]==this.numArr[_r][c]){
						//当前乘以2，非零变成0，并且计分
						this.numArr[r][c]*=2;
						this.numArr[_r][c]=0;
						this.score+=2;
					}
				}
				
			}
		}		
		//每滑动一次，新增一个2或者4
		this.makeRandom();
		//滑动完成后显示新的数据
		this.showNum();
		//显示新的分数
		this.showScore();
		
		this.check();
	},
	getUpInRow:function(r,c){//在向上滑的时候，找见离他最近的非零的行数
		for (var _r=r+1;_r<this.level;_r++) {
			if(this.numArr[_r][c]!=0){
				return _r;
			}
		}
		return -1;
	},
	moveDown:function(){
		for (var c=0;c<this.level;c++) {
			for (var r=this.level-1;r>=0;r--) {
				var _r=this.getDownInRow(r,c);
				if(_r==-1){
					break;
				}else{
					if(this.numArr[r][c]==0){//如果当前位置为0
						//互换位置
						this.numArr[r][c]=this.numArr[_r][c];
						this.numArr[_r][c]=0;
						
						//保留当前的r
						r++;
						//如果当前位置的值和离最近的非零位置相等的话
					}else if(this.numArr[r][c]==this.numArr[_r][c]){
						//当前乘以2，非零变成0，并且计分
						this.numArr[r][c]*=2;
						this.numArr[_r][c]=0;
						this.score+=2;
					}
				}
				
			}
		}
		
		//每滑动一次，新增一个2或者4
		this.makeRandom();
		//滑动完成后显示新的数据
		this.showNum();
		//显示新的分数
		this.showScore();
		
		this.check();
	},
	getDownInRow:function(r,c){
		for (var _r=r-1;_r>=0;_r--) {
			if(this.numArr[_r][c]!=0){
				return _r;
			}
		}
		return -1;
	},
	moveLeft:function(){
		for (var r=0;r<this.level;r++) {
			for (var c=0;c<this.level;c++) {
				var _c=this.getLeftInCol(r,c);
				if(_c==-1){
					break;
				}else{
					if(this.numArr[r][c]==0){//如果当前位置为0
						//互换位置
						this.numArr[r][c]=this.numArr[r][_c];
						this.numArr[r][_c]=0;
						
						//保留当前的c
						c--;
						//如果当前位置的值和离最近的非零位置相等的话
					}else if(this.numArr[r][c]==this.numArr[r][_c]){
						//当前乘以2，非零变成0，并且计分
						this.numArr[r][c]*=2;
						this.numArr[r][_c]=0;
						this.score+=2;
					}
				}
				
			}
		}
		
		//每滑动一次，新增一个2或者4
		this.makeRandom();
		//滑动完成后显示新的数据
		this.showNum();
		//显示新的分数
		this.showScore();
		
		this.check();
	},
	getLeftInCol:function(r,c){
		for (var _c=c+1;_c<this.level;_c++) {
			if(this.numArr[r][_c]!=0){
				return _c;
			}
		}
		return -1;
	},
	moveRight:function(){
		for (var r=0;r<this.level;r++) {
			for (var c=this.level-1;c>=0;c--) {
				var _c=this.getRightInCol(r,c);
				if(_c==-1){
					break;
				}else{
					if(this.numArr[r][c]==0){//如果当前位置为0
						//互换位置
						this.numArr[r][c]=this.numArr[r][_c];
						this.numArr[r][_c]=0;
						
						//保留当前的c
						c++;
						//如果当前位置的值和离最近的非零位置相等的话
					}else if(this.numArr[r][c]==this.numArr[r][_c]){
						//当前乘以2，非零变成0，并且计分
						this.numArr[r][c]*=2;
						this.numArr[r][_c]=0;
						this.score+=2;
					}
				}
				
			}
		}
		
		//每滑动一次，新增一个2或者4
		this.makeRandom();
		//滑动完成后显示新的数据
		this.showNum();
		//显示新的分数
		this.showScore();
		
		this.check();
	},
	getRightInCol:function(r,c){
		for (var _c=c-1;_c>=0;_c--) {
			if(this.numArr[r][_c]!=0){
				return _c;
			}
		}
		return -1;
	},
	showScore:function(){//显示分数的方法
		$("#nows").html(this.score);
	},
	isWin:function(){//判断有没有赢的方法
//		只要出现2048就赢了
		for (var r =0;r<this.level;r++) {
			for (var c =0;c<this.level;c++) {
				if(this.numArr[r][c]==2048){
					return true;
				}
			}
		}
		return false;
	},
	isLose:function(){//判断有没有输的方法
		
		for (var r =0;r<this.level;r++) {
			for (var c =0;c<this.level;c++) {
				if(this.numArr[r][c]==0){//只要数组里还有0就输不了
					return false;
				}
				
				//只要前三行前三列的这9个的右侧或者下册有和他相同的，就输不了
				if(r<this.level-1&&this.numArr[r][c]==this.numArr[r+1][c]){
					return false;
				}
				if(c<this.level-1&&this.numArr[r][c]==this.numArr[r][c+1]){
					return false;
				}
			}
		}
		return true;		
	},
	check:function(){//每一次滑动执行之后就去检测有没有输或者有没有赢
		if(this.isWin()){
			$(".alertBox h3").html("you win!")
			$(".alertBox").removeClass("mui-hidden");
			this.saveScore();
		}
		if(this.isLose()){
			$(".alertBox h3").html("you lose!")
			$(".alertBox").removeClass("mui-hidden");
			this.saveScore();
		}
	},
	showBest:function(){//显示最高分的方法
		var scores=localStorage.scores?JSON.parse(localStorage.scores):[];
		var best=0;
		if(scores.length){
			for (var i=0;i<scores.length;i++) {
				var now=scores[i].score;
				if(now>best){
					best=now;
				}
			}
		}	
		$("#bests").html(best)
		
		
		
	},
	saveScore:function(){//每一次输或者赢之后都会记录分数
		var that=this;
		var obj={
			score:this.score,
			time:that.makeTime()
		}
		
		var scores=localStorage.scores?JSON.parse(localStorage.scores):[];
		scores.push(obj);
		localStorage.scores=JSON.stringify(scores);
		
		
		//记录分数之后，应该让排行页面去重新计算   
		var sortWeb=plus.webview.getWebviewById('sort.html');
		mui.fire(sortWeb,"makesort")
		
		
		
	},
	makeTime:function(){//获取当前时刻的一个时间值，并且转成成‘2016-12-12’的格式
		var date=new Date();
		var y=date.getFullYear();
		var m=date.getMonth()+1;
		var d=date.getDate();
		if(m<10){
			m='0'+m;
		}
		if(d<10){
			d='0'+d;
		}
		return y+'-'+m+'-'+d;
	}

}

var game=new Game();

game.init()




//添加滑动之后执行的操作，记得要判断，只有在弹出框没有出来的时候才能操作，因为弹出框出来之后就代表这局已经结束了
window.addEventListener("swipeup",function(){
	if($(".alertBox").hasClass("mui-hidden")){
		game.moveUp()
	}
	
})
window.addEventListener("swipedown",function(){
	if($(".alertBox").hasClass("mui-hidden")){
		game.moveDown()
	}
})
window.addEventListener("swipeleft",function(){
	if($(".alertBox").hasClass("mui-hidden")){
		game.moveLeft()
	}
})

window.addEventListener("swiperight",function(){
	if($(".alertBox").hasClass("mui-hidden")){
		game.moveRight()
	}
})



//重新开始
$("#playAgain").click(function(){
	$(this).parent().addClass('mui-hidden')
	game.init();
})






})


