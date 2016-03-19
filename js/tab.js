/*购物车*/
(function () {
    var div1 = document.getElementById("tabCon");
    var shopCar = document.getElementById("shopCar"), car = document.getElementById("car");
    var box = document.getElementById("box");
    shopCar.onmouseenter = function () {
        car.style.display = "block";
        box.style.display = "none";
    };
    shopCar.onmouseleave = function () {
        car.style.display = "none";
        box.style.display = "block";
    };
})();
/*搜索框*/
(function () {
    var searchList = document.getElementById("searchList");
    var searchInp = document.getElementById("searchInp");
    var minSearch = document.getElementById("min-search");
    searchInp.onfocus = searchInp.onkeydown = function () {
        var val = this.value.replace(/(^ +| +$)/g, "");//->获取文本框中的内容，并且去除它的首尾空格
        searchList.style.display = val.length > 0 ? "none" : "block";
        searchInp.style.borderColor = "orange";
        minSearch.style.borderColor = "orange";
    };
    document.body.onclick = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement;
        //->如果点击的是searchList下的li标签:把点击li中的第一个a标签中的内容添加到文本框中，并且让列表消失
        if (tar.tagName.toLowerCase() === "li" && tar.parentNode.id === "searchList") {
            searchInp.value = tar.getElementsByTagName("a")[0].innerHTML;
            searchList.style.display = "none";
            searchInp.style.borderColor = "#ccc";
            minSearch.style.borderColor = "#ccc";
            return;
        }
        //->如果点击的是searchList下的a标签:
        if (tar.tagName.toLowerCase() === "a" && tar.parentNode.parentNode.id === "searchList") {
            searchInp.value = tar.parentNode.getElementsByTagName("a")[0].innerHTML;
            searchList.style.display = "none";
            searchInp.style.borderColor = "#ccc";
            minSearch.style.borderColor = "#ccc";
            return;
        }
        if (tar.id === "searchInp") {
            return;
        }
        searchList.style.display = "none";
        searchInp.style.borderColor = "#ccc";
        minSearch.style.borderColor = "#ccc";
    };
})();
/*轮播图部分*/
(function () {
    //->定义几个初始的变量
    var autoTimer = null, step = 0, count = bannerAry.length;
    var inner = document.getElementById("inner"), imgList = inner.getElementsByTagName("img");
    var tip = document.getElementById("tip"), tipList = tip.getElementsByTagName("li");
    var btnLeft = document.getElementById("btnLeft"), btnRight = document.getElementById("btnRight");

    //->数据绑定
    bindData();
    function bindData() {
        //->图片
        var str = "";
        for (var i = 0; i < bannerAry.length; i++) {
            str += "<div><img src='' trueImg='" + bannerAry[i] + "'/></div>";
        }
        str += "<div><img src='' trueImg='" + bannerAry[0] + "'/></div>";
        inner.innerHTML = str;
        inner.style.width = (count + 1) * 1226 + "px";

        //->焦点
        str = "";
        for (i = 0; i < bannerAry.length; i++) {
            str += "<li></li>";
        }
        tip.innerHTML = str;
        selectTip();
    }

    // ->图片延迟加载
    window.setTimeout(lazyImg, 500);
    function lazyImg() {
        for (var i = 0; i < imgList.length; i++) {
            ~function (i) {
                var curImg = imgList[i];
                var oImg = new Image;
                oImg.src = curImg.getAttribute("trueImg");
                oImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = "block";
                    animate(curImg, {opacity: 1}, 500);
                }
            }(i);
        }
    }

    //->实现焦点样式的选中
    function selectTip() {
        var tempStep = step;
        (tempStep >= tipList.length ) ? tempStep = 0 : null;
        for (var i = 0; i < tipList.length; i++) {
            tipList[i].className = i === tempStep ? "bg" : null;
        }
    }

    //->实现点击焦点切换轮播图
    tipMove();
    function tipMove() {
        for (var i = 0; i < tipList.length; i++) {
            var curTip = tipList[i];
            curTip.index = i;
            curTip.onclick = function () {
                window.clearInterval(autoTimer);
                step = this.index;
                animate(inner, {left: -step * 1226}, 500);
                selectTip();
                autoTimer = window.setInterval(autoMove, 2000);
            }
        }
    }

    //->实现左右切换
    btnRight.onclick = function () {
        window.clearInterval(autoTimer);
        autoMove();
        autoTimer = window.setInterval(autoMove, 2000);
    };

    btnLeft.onclick = function () {
        window.clearInterval(autoTimer);
        step--;
        if (step < 0) {
            step = count - 1;
            inner.style.left = -count * 1226 + "px";
        }
        animate(inner, {left: -step * 1226}, 500);
        selectTip();
        autoTimer = window.setInterval(autoMove, 2000);
    };

    //->实现自动轮播
    function autoMove() {
        step++;
        if (step > count) {
            step = 1;
            inner.style.left = 0;
        }
        animate(inner, {left: -step * 1226}, 500);
        selectTip();
    }

    autoTimer = window.setInterval(autoMove, 2000);
})();
//轮播图左侧导航
(function () {
    var lunLeft = document.getElementById('lunLeft');
    var oLis = lunLeft.getElementsByTagName('li');
    var oDivs = lunLeft.getElementsByTagName('div');
    for (var i = 0; i < oLis.length; i++) {
        ~function (i) {
            oLis[i].onmouseover = function () {
                oLis[i].className = "show";
                oDivs[i].className = "show";
            };
            oLis[i].onmouseout = function () {
                oLis[i].className = null;
                oDivs[i].className = null;
            };
        }(i);
    }
})();
//导航栏列表显示
(function () {
    var tabTitle = document.getElementById('tabTitle');
    var oLis = tabTitle.getElementsByTagName('li');
    var oUls = tabTitle.getElementsByTagName('ul');
    for (var i = 0; i < oLis.length; i++) {
        ~function (i) {
            oLis[i].onmouseover = function () {
                var a = this.getElementsByTagName("a")[0];
                a.style.color = "orange";
                oUls[i].style.display = "block";
            };
            oLis[i].onmouseout = function () {
                var a = this.getElementsByTagName("a")[0];
                a.style.color = "black";
                oUls[i].style.display = "none";
            };
        }(i);
    }
})();
//小轮播1
(function () {
    var step = 0, count = xiaolunbo1.length;
    var inn = document.getElementById("inn"), oLiList = inn.getElementsByTagName("li");
    var tip1 = document.getElementById("tip1"), tipList = tip1.getElementsByTagName("li");
    var btnLeft = document.getElementById("btnLeft"), btnRight = document.getElementById("btnRight");

    //->数据绑定
    bindData();
    function bindData() {
        var str = "";
        for (var i = 0; i < xiaolunbo1.length; i++) {
            var cur = xiaolunbo1[i];
            str += '<h2 class="title">' + cur.title + '</h2><a href="">' + cur.area + '</a><p class="desc">' + cur.desc + '</p><p class="price">' + cur.price + '</p><img src="' + cur.logo + '"/>';
            //str+="<h2 class='title' style='color:blue'>"+cur.title+"</h2>";
            //str+="<a href=''>"+cur.area+"</a>";
            //str+="<p class='desc'>"+cur.desc+"</p>";
            //str+="<p class='price'>"+cur.price+"</p>";
            //str+='<img src="'+ cur.logo+'"/>';
        }
        oLiList[i].innerHTML = str;
        oLiList[i].style.width = (count + 1) * 300 + "px";

        //->焦点
        str = "";
        for (i = 0; i < xiaolunbo1.length; i++) {
            str += "<li></li>";
        }
        tip1.innerHTML = str;
        selectTip();
    }

    //->实现焦点样式的选中
    function selectTip() {
        var tempStep = step;
        (tempStep >= tipList.length ) ? tempStep = 0 : null;
        for (var i = 0; i < tipList.length; i++) {
            tipList[i].className = i === tempStep ? "bg" : null;
        }
    }

    //->实现点击焦点切换轮播图
    tipMove();
    function tipMove() {
        for (var i = 0; i < tipList.length; i++) {
            var curTip = tipList[i];
            curTip.index = i;
            curTip.onclick = function () {
                step = this.index;
                animate(inn, {left: -step * 300}, 500);
                selectTip();
            }
        }
    }

    //->实现左右切换
    btnRight.onclick = function () {
    };

    btnLeft.onclick = function () {
        step--;
        if (step < 0) {
            step = count - 1;
            inn.style.left = -count * 300 + "px";
        }
        animate(inn, {left: -step * 300}, 500);
        selectTip();
    };

})();