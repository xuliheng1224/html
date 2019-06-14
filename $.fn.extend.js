$.fn.extend({
  //插件名称 - paddingList
  paddingList: function (name, options) {

    //参数和默认值
    var defaults = {
      animatePadding: 10,
      hoverColor: "Black"
    };

    // 用一个或多个其他对象来扩展一个对象，返回被扩展的对象
    // Query.extend(target, object1, [objectN])
    var options = $.extend(defaults, options);
    // var options = defaults;
    return this.each(function () { // 这个this是jq，遍历返回的是dom对象，以便链接式操作
      var o = options;

      //将元素集合赋给变量 本例中是 ul对象 
      // var obj = $(this);

      //得到ul中的a对象
      var items = $(name);

      //添加hover()事件到a
      items.hover(function () {
        $(this).css("color", o.hoverColor);
        //queue false表示不添加到动画队列中
        $(this).animate({ paddingLeft: o.animatePadding }, { queue: false, duration: 300 });

      }, function () {
        $(this).css("color", "");
        $(this).animate({ paddingLeft: "0" }, { queue: true, duration: 300 });
      });

    });

  }
});

