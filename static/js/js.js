$(window).load(function () {
  $(".loading").fadeOut();
});

/****/
/****/
$(document).ready(function () {
  var whei = $(window).width();
  $("html").css({ fontSize: whei / 20 });
  $(window).resize(function () {
    var whei = $(window).width();
    $("html").css({ fontSize: whei / 20 });
  });
});

$(function () {
  get_count_num();
  get_info();
  get_area_count()
    .then(function (data) {
      echarts_2(data);
    })
    .catch(function (error) {
      console.error(error);
    });
  echarts_1();
  // echarts_2(data);
  echarts_3();

  // $("#total_num").html(10000);
  // $("#year_num").html(111);

  // 获取总数和今年的数量
  function get_count_num() {
    $.ajax({
      url: "/api/v1/get_count",
      type: "get",
      data: {
        year: "2023",
      },
      success: function (res) {
        if (res.code == 200) {
          console.log(res);

          console.log($("#total_num").text());
          $("#total_num").html(res.total);
          console.log($("#total_num").text());
          $("#year_num").html(res.year_num);
        } else {
          $("#total_num").text("加载失败");
          $("#year_num").text("加载失败");
        }
      },
    });
  }

  //显示当前热门的产品
  function get_info() {
    $.ajax({
      url: "/api/v1/get_info",
      type: "get",
      dataType: "json",
      success: function (data) {
        // 假设我们有一个数据数组
        var data = data.data;
        console.log(data);
        // 使用 jQuery 遍历数据数组
        $.each(data, function (index, item) {
          // 创建一个新的 li 标签
          var li = $("<li>");

          // 创建并添加日期 span
          var transaction_timeSpan = $("<span>").text(item.transaction_time);
          li.append(transaction_timeSpan);

          // 创建并添加值 span
          var areaSpan = $("<span>").text(item.area);
          li.append(areaSpan);

          // 创建并添加房屋户型 span
          var house_typeSpan = $("<span>").text(item.house_type);
          li.append(house_typeSpan);

          // 创建并添加建筑面积 span
          var structure_areaSpan = $("<span>").text(item.structure_area + "㎡");
          li.append(structure_areaSpan);

          // 创建并添加成交单价 span
          var transaction_priceSpan = $("<span>").text(
            item.transaction_price + "万元/㎡"
          );
          li.append(transaction_priceSpan);

          // 创建并添加成交价 span
          var priceSpan = $("<span>").text(item.price + "万元");
          li.append(priceSpan);

          // 将新的 li 标签添加到 ul 中
          $("#house_info ul").append(li);
        });
      },
    });
  }

  // 获取各地区成交量
  function get_area_count() {
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: "/api/v1/get_area_count",
        type: "get",
        dataType: "json",
        success: function (res) {
          resolve(res.data);
        },
        error: function (error) {
          reject(error);
        },
      });
    });
  }

  function echarts_1() {
    var myChart = echarts.init(document.getElementById("echart1"));
    option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          lineStyle: {
            color: "#57617B",
          },
        },
        formatter: "{b}日	:<br/> 生产情况{c}",
      },

      grid: {
        left: "0",
        right: "20",
        top: "10",
        bottom: "0",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,.6)",
            },
          },
          data: ["7", "8", "9", "10", "11", "12"],
        },
      ],
      yAxis: [
        {
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(255,255,255,.6)",
            },
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: "dotted",
              color: "rgba(255,255,255,.1)",
            },
          },
        },
      ],
      series: [
        {
          name: "生产情况",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 2,
            },
          },

          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(98, 201, 141, 0.5)",
                  },
                  {
                    offset: 1,
                    color: "rgba(98, 201, 141, 0.1)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10,
            },
          },
          itemStyle: {
            normal: {
              color: "#4cb9cf",
              borderColor: "rgba(98, 201, 141,0.27)",
              borderWidth: 12,
            },
          },
          data: [91, 60, 70, 54, 80, 40],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function echarts_2(data) {
    console.log(data);
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("echart2"));
    option = {
      tooltip: {
        trigger: "axis",
      },

      radar: {
        indicator: data,

        splitNumber: 4,
        nameGap: 0,
        axisLine: {
          //指向外圈文本的分隔线样式
          lineStyle: {
            color: "#2c353d",
          },
        },
        splitLine: {
          lineStyle: {
            color: ["#2c353d"],
            width: 1,
          },
        },
        splitArea: {
          areaStyle: {
            color: ["transparent"],
          },
        },
        name: {
          color: "rgba(255,255,255,.8)",
        },
      },
      series: [
        {
          type: "radar",
          tooltip: {
            trigger: "item",
          },
          symbol: "none",
          itemStyle: {
            normal: {
              color: "#096e32",
              borderColor: "#46ff91",
            },
          },
          areaStyle: {
            color: ["#096e32"],
            opacity: 0.4,
          },
          data: [
            {
              value: [60, 33, 10, 50, 80, 100],
            },
          ],
        },
      ],
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function echarts_3() {
    var myChart = echarts.init(document.getElementById("echart3"));
    option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          lineStyle: {
            color: "#57617B",
          },
        },
        formatter: "{b}:<br/> 产量统计{c}",
      },

      grid: {
        left: "0",
        right: "20",
        top: "10",
        bottom: "0",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,.6)",
            },
          },
          data: ["1月", "2月", "3月", "4月", "5月", "6月"],
        },
      ],
      yAxis: [
        {
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(255,255,255,.6)",
            },
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: "dotted",
              color: "rgba(255,255,255,.1)",
            },
          },
        },
      ],
      series: [
        {
          name: "产量统计",
          type: "line",
          //smooth: true,
          symbol: "circle",
          symbolSize: 5,
          //showSymbol: false,
          lineStyle: {
            normal: {
              width: 2,
            },
          },

          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(98, 201, 141, 0.5)",
                  },
                  {
                    offset: 1,
                    color: "rgba(98, 201, 141, 0.1)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10,
            },
          },
          itemStyle: {
            normal: {
              color: "#4cb9cf",
              borderColor: "rgba(98, 201, 141,0.27)",
              borderWidth: 12,
            },
          },
          data: [33, 80, 20, 60, 10, 91],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
});

$(function () {
  setTimeout(function () {
    $(".counter").countUp();
  }, 200);

  setTimeout(function () {
    $(".scrollDiv").liMarquee({
      direction: "up", //身上滚动
      runshort: false, //内容不足时不滚动
      scrollamount: 30, //速度
    });
  }, 200);
});
