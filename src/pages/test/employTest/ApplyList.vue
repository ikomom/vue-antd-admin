<template>
  <a-card title="申请列表">
    <a-form :form="form" layout="inline" style="height: 65px" v-has="'apply:apply'">
      <a-form-item label="任务">
        <a-select
            style="width: 180px"
            v-decorator="['taskName', {rules: [{required: true}]}]"
            label-in-value
        >
          <a-select-option v-for="item in requireListStore" :key="item.id" :label="item.taskName">
            {{ item.taskName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="学生" v-if="checkRole('teacher')">
        <a-select
            style="width: 180px"
            v-decorator="['createBy', {rules: [{required: true}]}]"
        >
          <a-select-option v-for="item in studentList" :key="item.name">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button @click="confirm" icon="plus">添加</a-button>
          <a-button @click="reset" icon="redo">重置</a-button>
        </a-space>
      </a-form-item>
    </a-form>
    <a-table :dataSource="dataSource">
      <a-table-column v-for="col in columns" :key="col.dataIndex" :data-index="col.dataIndex" :title="col.title">
        <div slot-scope="text" v-html="text"></div>
      </a-table-column>
      <a-table-column data-index="action" width="20%">
        <div slot="title">
          操作
          <a-button>测试</a-button>
        </div>
        <template slot-scope="text, record">
          <a-space>
            <span v-has="'apply:employ'">
              <a v-if="record.workStatus === '未录用'" @click="employStu(record)">雇佣</a>
              <a v-if="record.workStatus === '在职'" @click="dismissStu(record)">解雇</a>
            </span>
              <span v-has="'apply:apply'">
              <a v-if="['未录用', '离职'].includes(record.workStatus) && ['已撤回', '未通过'].includes(record.applyStatus)" @click="applyWork(record)">重新申请</a>
              <a v-else-if="record.workStatus === '未录用' && record.applyStatus === '用人单位审核'" @click="reBackApply(record)">撤回</a>
            </span>
            <span v-has="'apply:delete'" v-if="['未录用', '离职'].includes(record.workStatus)">
              <a-popconfirm title="是否删除" @confirm="deleteById(record.id)">
                <a>删除</a>
              </a-popconfirm>
            </span>
          </a-space>
        </template>
      </a-table-column>
    </a-table>
  </a-card>
</template>

<script>
import {mapGetters} from "vuex";
import {APPLY_STATUS, USER_LIST, WORK_STATUS} from "@/pages/test/employTest/user";
import moment from "moment";
import {checkRole} from "@/plugins/directive";

export default {
  name: "ApplyList",
  data() {
    return {
      checkRole,
      form: this.$form.createForm(this),
      columns: [
        {
          title: '申请任务',
          dataIndex: 'taskName'
        },
        {
          title: '申请人',
          dataIndex: 'createBy'
        },
        {
          title: '申请时间',
          dataIndex: 'createTime'
        },
        {
          title: '申请状态',
          dataIndex: 'applyStatus'
        },
        {
          title: '工作状态',
          dataIndex: 'workStatus'
        }
      ],
      dataSource: [],
    }
  },
  created() {
    this.dataSource = this.$store.getters["test/applyListStore"]
  },
  computed: {
    ...mapGetters('test', ['requireListStore', 'user']),
    studentList() {
      return USER_LIST.filter(list => list.role.find(l => l.key === 'student'))
    }
  },
  methods: {
    confirm() {
      this.form.validateFields((err, values) => {
        console.log('confirm', err, values, this.form)
        if (!err) {
          const current = moment()
          this.dataSource.push({
            id: +current,
            createTime: current.format('MM-DD HH:mm:ss'),
            createBy: values.createBy || this.user.name,// 申请提供者，教师选择学生时被覆盖
            taskName: values.taskName.label,
            taskId: values.taskName.key,
            applyStatus: APPLY_STATUS[0].title,
            workStatus: WORK_STATUS[0].title
          })
        }
      })
    },
    reset() {
      this.form.resetFields()
    },
    deleteById(id) {
      this.dataSource = this.dataSource.filter(data => data.id !== id)
    },
    // 用工方 ---- start todo
    employStu(item) {
      item.applyStatus = '通过'
      item.workStatus = '在职'
    },
    dismissStu(item) {
      item.applyStatus = '未通过'
      item.workStatus = '离职'
    },
    // (学生)/(教师帮学生)-申请职位 todo
    applyWork(item) {
      item.applyStatus = '用人单位审核'
      // if (this.judgeIsEnough(item)) {
      //   item.applyStudent.push(this.user.name)
      // } else {
      //   this.$message.success('岗位申请人数满了')
      // }
    },
    // 撤回
    reBackApply(record) {
      record.applyStatus = '已撤回'
      // item.applyStudent = item.applyStudent.filter(stu => stu !== this.user.name)
    },
  },
  watch: {
    dataSource: {
      deep: true,
      handler(val) {
        this.$store.commit('test/setApplyListStore', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
