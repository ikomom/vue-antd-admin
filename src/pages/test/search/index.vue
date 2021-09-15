<template>
  <a-card>
    <a-input-search v-model="search" @search="searchValue"/>
    <a-collapse>
      <a-collapse-panel v-for="item in searchData" :key="item.searchText" :header="item.searchText">
        <a-table rowKey="zjlid" :columns="columns" :dataSource="item.match"/>
      </a-collapse-panel>
    </a-collapse>
  </a-card>
</template>

<script>

import axios from "axios";

export default {
  name: "Search",
  data () {
    return {
      search: '融水县S204省道和睦镇交警中队大门旁卡口（由西向东），GD融水县S204省道和睦卡口，融水县S204省道永乐乡古豆屯附件卡口，柳州融水县涨江执法站（市际）-检查区球机1，柳州融水县涨江执法站（市际）-检查区球机2，柳州市融水县同练乡英洞村平顶屯卡口（由西向东），融水县同练乡政府门口-人员卡口，融水县汪洞乡政府门口-人员卡口，柳州市融水县杆洞乡杆洞村仔牙屯卡口（由西向东），柳州市融水县洞头乡洞头村解放屯卡口（由西向东），融水县S644县道甲乙屯附近卡口（由西向东），柳城县虎山独立甲大桥，柳城县六塘查岩屯三岔路口，G78汕昆高速（柳州往宜州）K992，柳城县六塘三界街口，柳城县六塘三界街尾，柳城县冲脉茶村屯路口，柳城县冲脉大奋屯路口，柳城县869县道河池往柳城方向冲脉石天卡口，柳城县869县道柳城往河池方向冲脉石天卡口，柳城县冲脉镇869县道卡口，柳城县古砦中梁桥路口，柳城县古砦龙美村委屋底屯路段卡口，G6317梧柳高速（柳州往梧州）K190+700，G6317梧柳高速（梧州往柳州）K190，里雍往白沙（出城方向卡口），里雍龙江往付龙（方向卡口），G7212柳北高速（柳州往武宣）K16+100，G7212柳北高速（柳州往武宣）K15+800，柳江区穿山（往象州方向卡口），六庙村路口，龙平村路口，龙平村老路路口，国道209线3365KM加750穿山往柳州，国道209线3365KM加800穿山往武宣，柳江区307县道115KM加900（往凤凰方向卡口），朝南村三岔路口，仁安村委三岔路口，柳江新兴高速服务区，柳江区新兴收费站（出城卡口），百朋王丘屯路口，柳江区百朋往白诺（方向卡口），柳江区百朋（往来宾方向卡口），百朋往来宾方向卡口球机，百朋往拉堡方向卡口，百朋往来宾方向卡口，百朋往白诺方向卡口，百朋白诺村路口，里高保仁三岔路口，里高保仁卡口往里高方向，里高保仁卡口往大塘方向，柳江区里高保仁（往大塘方向卡口），柳江区国道598KM（往里高方向卡口），柳江区土博中学（往三都方向卡口），柳江区土博镇（往屏南方向卡口），土博镇去屏南方向，流山镇石位屯（卡口），鹿寨县平山镇077县道屯秋村秋屯1，鹿寨县平山镇077县道屯秋村秋2，鹿寨县中渡镇黄四屯卡口（由南向北），鹿寨县中渡镇605县道寨上小学路口1，鹿寨县中渡镇605县道寨上小学路口2，鹿寨县中渡镇605县道黄腊村老圩屯路口，黄冕镇波寨卡口，鹿寨县拉沟乡木龙乡木龙屯，鹿寨县拉沟乡拉沟村古盘屯路口，鹿寨县拉沟乡032乡道背塘村T字路口1，鹿寨县拉沟乡032乡道背塘村T字路口2，鹿寨县寨沙镇长田村长田小学路口，鹿寨县四排镇323国道三排村斑鸠屯路口1，鹿寨县四排镇323国道三排村斑鸠屯路口2，鹿寨县323国道汶水屯路口进城卡口（由北向南），鹿寨县四排镇022乡道那么屯路口，鹿寨县四排镇010乡道吉云小学门口，鹿寨县四排镇那当路口卡口（由北向南），鹿寨县四排镇015乡道江南小学门口1，鹿寨县四排镇015乡道江南小学门口2，鹿寨县导江乡石排村浪村屯1，鹿寨县导江乡石排村浪村屯2，鹿寨县导江乡温村村寨头屯，鹿寨县导江乡龙团林站三岔路口进城卡口（由东向西），鹿寨县导江乡龙团林站三岔路口卡口，鹿寨县导江乡相思屯出城卡口（由东向西），雅瑶乡中心小学对面D，融安县泗顶加油站往融安方向卡口（由东向西），泗顶桂林路口加油站旁边D，泗顶加油站往桂林方向卡口Y，泗顶加油站往融安方向卡口Y，融安县泗顶镇泗顶进城卡口人城方向Y，融安县泗顶镇泗顶进城卡口出城方向Y，融安县桥板乡泗浪桥三岔路口卡口往泗顶方向（由东向西），桥板乡泗浪桥三岔路口卡口往桥板方向Y，桥板乡泗浪桥三岔路口卡口往泗顶方向Y，融安县桥板乡出城卡口方向入城Y，融安县桥板乡出城卡口方向出城Y，融安县桥板乡阳山路口往阳山出城方向Y，融安县桥板乡阳山路口阳山往板桥街方向Y，三江县石碑（梅林去从江）南向北，三江县石碑（从江去梅林）北向南，三江县石碑（从江去梅林）由北向南卡口，梅林乡上渡口路口，富禄乡福禄纯德路口，富禄乡321国道岑洞村路口，富禄乡321国道塘华庆云路口，三江九良往富禄进城方向，富禄乡高岩村九井屯，三江水文站往地坪出城方向，波里桥头，洋溪乡良培归利路口，良口乡滚良往晒江村路口，三江独洞收费站北向南，三江县独峒旧具路口（往独峒方向）由西向东，独峒镇林略村往高定村路口，三江浪泡大桥进城方向，独峒镇玉马村高宇村岔路口，汾水岑牛路口，八己牙己路口，三江县高秀路口（高秀往林溪）由东往西，林溪镇高友村，林溪镇506省道高友村路口，柳州市三江县林溪乡高友村卡口（由东往西），林溪镇506省道蒋王路口，林溪镇506省道冠洞村路口，程阳景区寨门岔口，柳州市三江县沙宜村界脚吞卡口（由西向东），柳州沙宜执法站（市际）-检测区1，斗江镇廖村桥头，独峒里盘里朝岔路口，高基乡八界甘岭岔路口，高基乡弓江村岔路口，G76高速三江北环桂检查站休息区方向，G76高速三江北环桂检查站办公室方向',
      columns: [
        // {
        //   "title": "zjlid",
        //   "dataIndex": "zjlid",
        //   "ellipsis": true
        // },
        // {
        //   "title": "sbbm",
        //   "dataIndex": "sbbm",
        //   "ellipsis": true
        // },
        {
          "title": "sbmc",
          "dataIndex": "sbmc",
          "ellipsis": true,
          width: 430
        },
        {
          title: '匹配度',
          dataIndex: '$score',
          width: 80
        },
        {
          "title": "sblx",
          "dataIndex": "sblx",
          "ellipsis": true
        },
        // {
        //   "title": "mac",
        //   "dataIndex": "mac",
        //   "ellipsis": true
        // },
        // {
        //   "title": "ip",
        //   "dataIndex": "ip",
        //   "ellipsis": true
        // },
        // {
        //   "title": "dzmc",
        //   "dataIndex": "dzmc",
        //   "ellipsis": true
        // },
        {
          "title": "dqjd",
          "dataIndex": "dqjd",
          "ellipsis": true
        },
        {
          "title": "dqwd",
          "dataIndex": "dqwd",
          "ellipsis": true
        },
        {
          "title": "zbx",
          "dataIndex": "zbx",
          "ellipsis": true
        },
        // {
        //   "title": "ssqhdm",
        //   "dataIndex": "ssqhdm",
        //   "ellipsis": true
        // },
        // {
        //   "title": "ssqh",
        //   "dataIndex": "ssqh",
        //   "ellipsis": true
        // },
        // {
        //   "title": "gxdwdm",
        //   "dataIndex": "gxdwdm",
        //   "ellipsis": true
        // },
        // {
        //   "title": "gxdw",
        //   "dataIndex": "gxdw",
        //   "ellipsis": true
        // },
        {
          "title": "cjmc",
          "dataIndex": "cjmc",
          "ellipsis": true
        },
        {
          "title": "sbzt",
          "dataIndex": "sbzt",
          "ellipsis": true
        },
        // {
        //   "title": "djsj",
        //   "dataIndex": "djsj",
        //   "ellipsis": true
        // },
        // {
        //   "title": "gxsj",
        //   "dataIndex": "gxsj",
        //   "ellipsis": true
        // },
        // {
        //   "title": "bz",
        //   "dataIndex": "bz",
        //   "ellipsis": true
        // }
      ],
      data: [],
      searchData: {}
    }
  },
  created () {
    this.searchValue()
  },
  methods: {
    searchValue() {
      axios.post('/api/search', {
        text: this.search,
      }).then(res => {
        console.log('res', res)
        this.searchData = res.data
      })
    }
  },
  watch: {
  }
}
</script>

<style scoped>

</style>
