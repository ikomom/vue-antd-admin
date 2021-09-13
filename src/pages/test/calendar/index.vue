<template>
  <div style="padding: 30px" class="calendar-container">
<!--    <img class="shape" src="https://s3.us-east-2.amazonaws.com/ui.glass/shape.svg" alt="">-->
<!--    <div class="card">-->
<!--      <h3 class="card-title">Glassmorphism is awesome</h3>-->
<!--      <p>A modern CSS UI library based on the glassmorphism design principles that will help you quickly design and build beautiful websites and applications.</p>-->
<!--      <a href="https://ui.glass">Read more</a>-->
<!--    </div>-->
    <a-space>
      <span ref="dragBox" class="drag-box">拖动</span>
      <a-button @click="addEvents">添加事件</a-button>
    </a-space>
    <br />
    <a-space>
      <a-select style="width: 180px">
        <a-select-option :value="2021">2021</a-select-option>
        <a-select-option :value="2020">2020</a-select-option>
      </a-select>
    </a-space>
    <FullCalendar :style="calendarStyle" :options="calendarOptions" ref="calendar">
      <!--            <template v-slot:moreLinkContent="{num, text}">-->
      <!--              more {{text}}-->
      <!--            </template>-->
      <!--      <template v-slot:dayHeaderContent="{text}">-->
      <!--        header{{text}}-->
      <!--      </template>-->
      <!--      <template v-slot:dayCellContent="{dayNumberText, isPast, isToday}">-->
      <!--        <a-popover>-->
      <!--          <div slot="content">-->
      <!--            11111-->
      <!--          </div>-->
      <!--          <div style="height: 100%">{{ dayNumberText }} {{ isToday }} {{ isPast }}</div>-->
      <!--        </a-popover>-->
      <!--      </template>-->
      <!--      <template v-slot:eventContent="arg">-->
      <!--        <a-popover style="background: red;">-->
      <!--          <div slot="content" >{{arg.event.title}}</div>-->
      <!--          <b>{{ arg.timeText }}</b>-->
      <!--          <i>{{ arg.event.title }}</i>-->
      <!--        </a-popover>-->
      <!--      </template>-->
                  <!--   time-grid   -->
      <!--            <template v-slot:slotLabelContent="{text}">-->
      <!--              label {{text}}-->
      <!--            </template>-->
      <!--            <template v-slot:slotLaneContent="{text}">-->
      <!--              slotLaneContent-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; {{text}}-->
      <!--            </template>-->
    </FullCalendar>
    <!-- 遮罩   -->
    <div ref="block" class="day-cell-mask" @click.prevent="$event.stopPropagation()">
      <p v-if="currentHoverDay.icon"><a-icon :type="currentHoverDay.icon" />{{ currentHoverDay.date }}</p>
      <a-button type="primary" @click="onOrder">预约</a-button>
    </div>
  </div>
</template>

<script>
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, {Draggable} from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import momentPlugin from '@fullcalendar/moment';
import zhLocale from '@fullcalendar/core/locales/zh-cn'
import moment from 'moment'

export default {
  name: 'calendar',
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        // allowContextMenu: true,
        // contentHeight: 300,
        themeSystem: 'Solar',
        handleWindowResize: true,// 浏览器调整时，自动调整大小
        aspectRatio: 1.8,// 长宽比
        resourceAreaHeaderContent: '教学楼',
        resources: [
          {
            eventColor: "green",
            id: "a",
            title: "逸夫楼"
          }
        ],
        initialDate: new Date(), // 自定义设置背景颜色时一定要初始化日期时间
        rerenderDelay: 100,// 延迟渲染，等布局加载
        // timeZone: 'local',
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, resourceTimelinePlugin, momentPlugin],
        locale: zhLocale,
        initialView: 'dayGridMonth',
        // titleFormat: 'YYYY-MM-DD',// title按钮格式化
        // dayHeaderFormat: 'MM-DD',// 日历头格式化
        // dayHeaderDidMount(event) {
        //   console.log('dayHeaderDidMount', event)
        // },
        weekends: true,// 显示周末
        navLinks: true,//从日历天的网格天链接中点进去，可以查看当天的所有内容详情
        droppable: true, // 外部日程可拖动(虽然去掉了，也能拖动)
        selectable: true, // 是否可以选中日历格
        dayMaxEvents: true,// 时间中网格内容高度超出单元格高度时，是否折叠
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',// 试用
        slotDuration: '01:00:00',// 时间线时间间隔
        // editable: true, // 全局，事件是否可以进行（拖动、缩放）修改
        headerToolbar: {
          start: 'today prev,next,setting',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay,timelineDay'
        },
        buttonText: {
          dayGridMonth: '本月',
          timeGridDay: '竖日',
          resourceTimelineDay: '横日'
        },
        customButtons: {
          setting: {
            theme: "true",
            text: "22",
            click() {
              alert("自定义按钮");
            },
          }
        },
        // 日程事件
        drop: this.onDrop,
        dayCellDidMount: this.onDayCellDidMount,
        // eventDidMount: this.onEventDidMount,// 每个日程事件加载完成会触发
        eventDragStart: this.onEventDragStart, // 日程开始拖拽时触发
        eventDragStop: this.onEventDragStop, // 日程拖拽结束时触发
        eventResizeStart: this.onEventResizeStart, // 日程大小调整开始时触发
        eventResizeStop: this.onEventResizeStop, // 日程大小调整结束时触发
        eventDrop: this.onEventDrop,// 日程事件拖动放下触发
        eventClick: this.onEventClick, // 点击日历日程事件
        eventReceive: this.onEventReceive,
        select: this.onSelect, // 选中日历格事件
        events: [
          {
            id: new Date().getTime(),
            title: '学习fullCalendar',
            start: '2021-08-15 08:00',
            resourceId: 'a',
            extendedProps: {
              from: 'ikonon'
            }
          },
          {
            id: 'new',
            title: '自定义',
            start: '2021-08-15 09:00',
            resourceId: 'a',
            editable: true,
            // overlap: false,// 禁止重叠
          },
          // 添加约束（日程只能在设置了 groupId: 'availableForMonthStart' 中进行拖动以及缩放功能）
          {
            id: '添加约束11',
            title: '空调坏了',
            start: '2021-08-11 00:00',
            end: '2021-08-11 24:00',
            classNames: ['continuousClass'],
            color: '#75a7c8',
            // editable: true,
            overlap: false,
            constraint: 'availableForMonthStart'
          },
          {
            id: 'constraintDom',
            groupId: 'availableForMonthStart',
            start: '2021-08-11 00:00',
            end: '2021-08-11 23:59',
            display: 'background',
            color: '#ff9f89'
          }
        ],
        // 视图
        views: {
          dayGridMonth: {
            displayEventTime: false,// 日程事件是否显示时间
          },
          timeGrid: {
            slotMinTime: "06:00",//周视图开始时间
            slotMaxTime: "20:00",//周视图结束时间
            eventMinHeight: 30,// 事件最小高度, 配合表格高度使用
            // eventShortHeight: 30,// 事件最短高度（时间与标题什么时候切换成flex-column的临界高度）
            displayEventTime: true,//是否显示时间
            slotEventOverlap: true,// 相同时间段视线是否重叠
            allDaySlot: false,// 相同时间段视线是否重叠
            slotLabelFormat: 'HH:mm',
            eventMaxStack: 1,
            moreLinkClick(info) {
              console.log('moreLinkClick', info)
              return false
            }
          }
        }
      },
      currentHoverDay: {},
      calendarStyle: {
        '--fc-border-color': '#F3F4F5'
      }
    }
  },
  mounted() {
    const result = new Draggable(this.$refs.dragBox, {
      eventData: {
        title: '测试1',// 事件标题
        editable: true,
        durationEditable: false,
        // resourceId: 'a',

      }
    });
    // console.log(result, this.$refs.calendar)
    this.calendar = this.$refs.calendar.getApi()
    window.calendar = this.calendar
    // calendar.prev()
    console.log(this.$refs.calendar.getApi())
  },
  methods: {
    onOrder(e) {
      const name = prompt("输入预约","")
      if (name!=null && name!=="")
      {
        this.calendar.addEvent({
          id: new Date().getTime(),
          editable: true,
          overlay: false,
          title: name,
          start: this.currentHoverDay.date
        })
        this.$refs.block.style.display = 'none'
      }
    },
    addEvents() {
      const events = [
        {
          title: '测试1',
          start: '2021-08-01 12:30',
          end: '2021-08-01 13:30',
          editable: true
        },//可以拖动但不能缩放，但在周、日视图中是可以进行缩放的
        {
          title: '可以拖动、缩放',
          start: '2021-08-02 00:00',
          end: '2021-08-02 23:59',
          color: 'red',
          editable: true
        }, //可以拖动、缩放
        {
          title: 'event 2',
          start: '2021-08-02',
          end: '2021-08-02',
          color: 'red',
          editable: true
        },
        {//背景色 (添加相同时间的背景色时颜色会重叠) 一点要初始化日期时间 initialDate: '2021-08-10',
          start: '2021-08-24',
          end: '2021-08-28',
          overlap: false,
          display: 'background',
          color: '#ff9f89'
        },
        {
          start: '2021-08-23',
          end: '2021-08-26',
          // overlap: false,
          display: 'background',
          color: '#0ee162'
        }]
      this.calendarOptions.events.push(...events)
      this.$message.success('添加成功')
    },
    onEventDidMount(event) {
      console.log('eventDidMount', event)
    },
    onDrop(event) {
      console.log('onDrop', event)

    },
    onEventDrop(event) {
      console.log('onEventDrop', event)
    },
    onEventClick(event) {
      console.log('onEventClick', event)
    },
    onEventReceive(event) {
      console.log('onEventReceive', event)
    },
    onSelect(selectInfo) {
      console.log('onSelect', selectInfo)
    },
    onEventDragStart(event) {
      console.log('onEventDragStart', event)
    },
    onEventDragStop(event) {
      console.log('onEventDragStop', event)
    },
    onEventResizeStart(event) {
      console.log('onEventResizeStart', event)
    },
    onEventResizeStop(event) {
      console.log('onEventResizeStop', event)
    },
    onDayCellDidMount(event) {
      // console.log('onDayCellDidMount', event, this.$refs.block)
      // if(this.calendar && this.calendar.view.type !== 'dayGridMonth') return false
      // // const td = event.el.children[0].innerHTML
      // let has = false
      // const currentDay = moment(event.date).format('YYYY-MM-DD')
      //
      // event.el.onmouseenter = (e) => {
      //   // console.log('onMouseEnter', event.el.children, this.$refs.block)
      //   has = this.calendar.getEvents().some(e => {
      //     const isCur = currentDay === moment(e.start).format('YYYY-MM-DD')
      //     if (e.end) {
      //       return isCur || moment(event.date).isBetween(e.start, e.end)
      //     }
      //     return isCur
      //   })
      //   if (!has) {
      //     this.currentHoverDay = {
      //       icon: 'check',
      //       date: currentDay,
      //     }
      //     Object.assign(this.$refs.block.style, {
      //       height: '100%',
      //       width: '100%',
      //       display: 'block',
      //     })
      //     event.el.children[0].appendChild(this.$refs.block)
      //   }
      // }
      // event.el.onmouseleave = (e) => {
      //   // console.log('onmouseleave',  event.el.children)
      //   this.currentHoverDay = {}
      //   if(!has) {
      //     event.el.children[0].removeChild(this.$refs.block)
      //   } else {
      //     has = false
      //   }
      //   // this.calendar.render()
      //   // this.calendar.updateSize()
      // }
    },
    changeView() {

    }
  },
  watch: {
  }
}
</script>

<style scoped lang="less">
.drag-box {
  display: inline-block;
  width: 80px;
  height: 30px;
  background-color: blue;
  color: #fff;
  text-align: center;
  user-select: none;
  cursor: pointer;
}
.day-cell-mask {
  top: 0;
  left: 0;
  //width: 100%;
  //height: 100%;
  display: none;
  z-index: 999;
  background: #fff;
  position:absolute;
  text-align: center;
}

.calendar-container {
  margin: 0;
  background: #fff;
  //background: linear-gradient(90deg, #edc0bf 0,#c4caef 58%);
  font-family: 'Inter', sans-serif;
  //backdrop-filter: blur(3px);
  .shape {
    position: absolute;
    width: 150px;
    top: .5rem;
    left: .5rem;
  }
  .card {
    width: 400px;
    height: auto;
    padding: 2rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, .7);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);

    .card-title {
      margin-top: 0;
      margin-bottom: .5rem;
      font-size: 1.2rem;
    }

    p, a {
      font-size: 1rem;
    }

    a {
      color: #4d4ae8;
      text-decoration: none;
    }
  }
}

::v-deep {
  --fc-small-font-size: 0.89em;

  .fc .fc-timegrid-slot {
    height: 3.5em;
  }
  .fc-daygrid-day-frame {
    &:hover {
      background-color: #E6F7FF;

      //&::after {
      //  content: '<div></div>';
      //
      //  top: 0;
      //  left: 0;
      //  z-index: 999;
      //  width: 100%;
      //  height: 100%;
      //  background: #fff;
      //  position: absolute;
      //}
    }

  }
}
</style>
