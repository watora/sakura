var width = 1920, height = 1080;
var nodeList = [];
(function(){
    //素材来自yuyuyu.tv/washio
    //c 使用的素材数, ready 已加载的素材数, sakuraCount 屏幕上显示的数量
    var c = 5, ready = 0, sakuraCount = 100, speed = 0.25;
    var canvas = document.querySelector('#sakura');
    canvas.width = width;
    canvas.height = height;
    var sakuraIMG = [];
    for(var i = 1 ; i < c + 1; i++){
        var img = new Image();
        img.src = './sakura/sakura_' + i + '.png';
        img.onload = function(){
            ready++;
            if(ready == c)
                start();
        }
        sakuraIMG.push(img);
    }
    //粒子对象
    var sakura = function(){
        this.x = Math.random() * width;    //横向坐标
        this.y = Math.random() * height;   //纵向坐标
        this.rotate = 0;    //当前旋转角度 单位度
        this.speedR = 0;    //旋转速度
        this.speedX = 0;    //横向速度
        this.speedY = 0;    //纵向速度
        this.type = 0;      //花瓣类型
        this.width = 0;     //图宽
        this.height = 0;    //图高
        this.scale = 0;     //缩放
        this.count = 0;     //计数
    };
    var init = function(node){
        if(!node)
            node = new sakura();
        else{
            node.x = Math.random() * (width + 500) - 600; //初始x坐标范围 -600 ~ width-100
            node.y = -50;
        }
        node.speedX = Math.max(1, (Math.random() * 3)) * speed;
        node.speedY = Math.max(2, (Math.random() * 4)) * speed;
        node.rotate = Math.random() * 360;
        node.speedR = Math.random() - 0.5;
        node.type = randomNum() % 5; 
        node.width = sakuraIMG[node.type].width;
        node.height = sakuraIMG[node.type].height;
        node.scale = Math.max(.4, Math.min(.8, Math.random()));
        node.count = 300;
        return node;
    }
    //计算位置
    var calc = function(){
        if(nodeList.length == 0){
            //初始化
            for(var i = 0; i < sakuraCount; i++)
                nodeList.push(init());
        }
        else{
            for(var i in nodeList){
                var node = nodeList[i];
                if(node.x > width || node.y > height + 10)
                    node = init(node);
                node.x += node.speedX;
                node.y += node.speedY;
                node.rotate += node.speedR;
                if(node.count == 0){
                    node.speedX += Math.abs(Math.random() - 0.5) * 0.2;
                    node.count = 300;
                }
                node.count--;
            }
        }
    }

    //1-10之间的随机数
    var randomNum = function(){
        return Math.ceil(Math.random()*10);
    }

    var ctx = canvas.getContext('2d');
    var draw = function(){
        ctx.clearRect(0, 0, width, height);
        for(var i in nodeList){
            var node = nodeList[i];
            ctx.save();
            var r = node.rotate * Math.PI / 180;
            ctx.translate(node.x + node.width / 2, node.y + node.height / 2); //平移坐标轴到图像中心
            ctx.rotate(r); //旋转坐标轴
            ctx.scale(node.scale, node.scale); //缩放
            ctx.drawImage(sakuraIMG[node.type], 0 , 0);
            ctx.restore();
        }
    };

    var start = function(){
        var req = function(){
            requestAnimationFrame(function(){
                calc();
                draw();
                req();
            });
        }
        req();
    }
})();