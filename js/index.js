$(function(){
	$.ajax({
		type:"get",
		url:"index.json",
		async:true,
		dataType:"json",
		success:function(data){
			let arr=[]; //创建空数组接收每次下拉相对应视频的头像路径
			let arr_plun=[]; //创建空数组接收每个视频相对应的评论
			let arr_img=[];
			let sui=parseInt(Math.random()*12); //创建随机数随机播放视频
			
			//   下边是点开浏览器随机出来的视频跟相对应的头像
			let vido='<video width="100%" height="100%" controls="controls" loop="loop"></video>';
			$('.box ul').append(vido);
			
			let sour='<source src="'+data[sui].src+'" type="video/mp4"></source>';
			$('video:last').append(sour);
			
			$('.box video').eq(0).attr("autoplay","autoplay");
			
			let img='<img src="'+data[sui].image+'" />';
			$('.touxiang').append(img);
//			arr.push(data[sui].image);
			
			arr_plun.push($('.area_botm ul').html());
			let cjian=function(){
				let num=parseInt(Math.random()*12);
				console.log(num)
				let vido='<video width="100%" height="100%" controls="controls" loop="loop"></video>';
				$('.box ul').append(vido);
				let sour='<source src="'+data[num].src+'" type="video/mp4"></source>';
				$('video:last').append(sour);
				
				let img_src=data[num].image; //声明变量接收随机视频相对应头像的路径
				arr.push(img_src);   	//将随机视频相对应头像的路径添加到数组中
				
				$('.touxiang img').attr("src",arr[num1]);
				$('video').eq(num1).trigger('play');  //控制video视频的暂停与播放
				$('video').eq(num1).siblings().trigger('pause');//控制video视频的暂停与播放
				//保存评论的内容到数组
				arr_plun.push($('.area_botm ul').html());
				$('.area_botm ul').html(arr_plun[num1]);
				console.log(arr_plun)
				//保存路径到数组，
				let dz_img=$('.dianzan img').attr("src");
				arr_img.push(dz_img);
				$('.dianzan img').attr("src",arr_img[num1])

			}
			let startY = 0;
			let num1=0;
			//  手指刚接触屏幕时获取所在位置的坐标（Y轴）
			document.getElementById("huadong").addEventListener("touchstart",function(e){
			    startY = e.changedTouches[0].pageY;
			},false);
			//  手指离开屏幕时获取所在位置的坐标（Y轴）
			document.getElementById("huadong").addEventListener("touchend",function(e){
			    let endY = e.changedTouches[0].pageY;
			    let changeVal = endY - startY;
			    if(endY < startY){       //向上滑
			    	
			    	$('video').eq(num1).slideUp();
			    	num1++;
			        cjian();
			       $('.area_botm ul').html("");
			       $('.dianzan img').attr("src","img/bxin.png")
				}else if(endY > startY){      //向下滑
					num1--;
					$('.area_botm ul').html("");
					$('.dianzan img').attr("src",arr_img[num1]);
					$('.touxiang img').attr("src",arr[num1]); //下拉时找到数组中上一个视频相对应的头像
					$('.area_botm ul').html(arr_plun[num1+1]);
					$('video').eq(num1).slideDown();
					$('video').eq(num1).trigger('play');//控制video视频的暂停与播放
					$('video').eq(num1).siblings().trigger('pause');//控制video视频的暂停与播放
			    }
			},false)
			//     点赞按钮切换图片路径
			$('.dianzan img').click(function(){
				if ($('.dianzan img').attr("src") == "img/bxin.png") {
					$('.dianzan img').attr("src","img/hxin.png");
				} else if($('.dianzan img').attr("src") == "img/hxin.png"){
					$('.dianzan img').attr("src","img/bxin.png");
				}
			})
			
			//      点击评论
			$('.pinglun img').click(function(){
				$('.area').show();
			})
			
			//点击评论区上边的区域让评论区隐藏
			$('.area_top').click(function(){
				$('.area').hide();
			})
			//   点击发表评论
			$('button').click(function(){
				let li='<li></li>';
				$('.area_botm ul').append(li);
				
				let touxig='<p></p>';
				$('.area_botm ul li:last').append(touxig);
				
				let img_t='<img src="img/touxiang.jpg" />';
				$('.area_botm ul li:last p').eq(0).append(img_t);
				
				let txt='<p>'+$('input').val()+'</p>';
				$('.area_botm ul li:last').append(txt);
				$('input').val("");
			})
		},
		error:function(){
			alert("数据请求失败");
		}
	});
	
})