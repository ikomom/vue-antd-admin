<template>
  <a-card title="需求岗位">
    <a-form v-has="'work:add'" :form="form" layout="inline" style="height: 65px">
      <a-form-item label="任务">
        <a-input placeholder="输入任务发布吧" v-decorator="['taskName', {rules: [{required: true}]}]" />
      </a-form-item>
      <a-form-item label="需要人数">
        <a-input-number
            style="width: 100%"
            :precision="0"
            :min="0"
            placeholder="输入需要人数吧"
            v-decorator="['need', {rules: [{required: true}]}]"
        />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button @click="confirm" icon="plus">添加</a-button>
          <a-button @click="reset" icon="redo">重置</a-button>
          自动加载保存数据
          <a-switch v-model="loadLastData" />
          自动保存数据
          <a-switch v-model="autoSaveData" />
        </a-space>
      </a-form-item>
    </a-form>
    <ul class="list-container">
      <li class="list-item">
        <span>雇佣者</span>
        <span>任务</span>
        <span> 申请人数 +  已聘用人数 = 本次需要人数</span>
        <span>
          操作
          <a-space style="float: right;clear: right">
            <a-button @click="loadDataBeforeCheck" icon="sync">加载数据</a-button>
            <a-button @click="saveData" icon="save" :disabled="!requireList.length">保存数据</a-button>
            <a-button @click="clearAll" icon="rest" type="danger" :disabled="!requireList.length">清空</a-button>
          </a-space>
        </span>
      </li>
      <li v-for="item in requireList" :key="item.id" class="list-item">
        <span>[{{ item.createTime }}]{{ item.createBy }}</span>
        <span>{{ item.taskName }}</span>
        <span>
          申请学生: {{ item.applyStudent }} <br/>
          已经聘用: {{ item.employStudent }} <br/>
          总共需要: {{ item.need }}
        </span>
        <a-space>
          <a v-has="'reback'" v-if="item.applyStudent.includes(user.name)" @click="reBackApply(item)">撤回</a>
          <a v-has="'apply'" v-else @click="applyWork(item)">申请</a>
          <span v-has="'employ'">
<!--            <a @click="employStu(item)">雇佣</a>-->
<!--            <a @click="dismissStu(item)">解雇</a>-->
          </span>
          <a-popconfirm v-has="'work:delete'" title="是否删除？" @confirm="deleteItem(item.id)">
            <a>删除</a>
          </a-popconfirm>
        </a-space>
      </li>
      <div class="ant-list-empty" v-show="!requireList.length">
        暂无数据
      </div>
    </ul>
  </a-card>
</template>

<script>
import moment from "moment";
import {TEST_PRO_KEY} from "@/pages/test/employTest/user";
import {mapGetters} from "vuex";

export default {
  name: "RequrieList",
  data() {
    return {
      form: this.$form.createForm(this),
      requireList: [],// 岗位列表
    }
  },
  computed: {
    loadLastData: {
      set(value) {
        this.$store.commit('test/setLoadLastData', value)
      },
      get() {
        return this.$store.state.test.loadLastData
      }
    },
    autoSaveData: {
      set(value) {
        this.$store.commit('test/setAutoSaveData', value)
      },
      get() {
        return this.$store.state.test.autoSaveData
      }
    },
    ...mapGetters('test', ['user'])
  },
  created() {
    if (this.loadLastData) {
      this.loadData()
    }
  },
  methods: {
    confirm() {
      console.log('确认', this.form)
      this.form.validateFieldsAndScroll((err, values) => {
        console.log(err, values)
        if (!err) {
          const current = moment()
          this.requireList.push({
            ...values,
            status: 0,
            applyStudent: [],// 申请人
            employStudent: [],// 雇佣人
            relativeStudent: [],// 关联学生
            id: +current,
            createTime: current.format('MM-DD HH:mm:ss'),
            createBy: this.user.name,// 岗位创建者(用工方）
          })
        }
      })
    },
    // (学生)/(教师帮学生)-申请职位 todo
    applyWork(item) {
      if (this.judgeIsEnough(item)) {
        item.applyStudent.push(this.user.name)
      } else {
        this.$message.success('岗位申请人数满了')
      }
    },
    // 撤回
    reBackApply(item) {
      item.applyStudent = item.applyStudent.filter(stu => stu !== this.user.name)
    },
    // 用工方 ---- end
    deleteItem(id) {
      this.requireList = this.requireList.filter(l => l.id !== id)
    },
    judgeIsEnough(item) {
      return item.applyStudent.length + item.employStudent < item.need;
    },
    reset() {
      this.form.resetFields()
    },
    loadDataBeforeCheck() {
      if (this.requireList.length) {
        this.$confirm({
          title: '是否覆盖当前数据?',
          onOk: () => {
            this.loadData()
          }
        })
      } else {
        this.loadData()
      }
    },
    loadData() {
      try {
        this.requireList = JSON.parse(localStorage.getItem(TEST_PRO_KEY)) || []
        this.$message.success('加载数据成功', 0.5)
      } catch (e) {
        console.error(e)
        this.$message.error('加载数据失败, 请重新保存', 0.5)
      }
    },
    saveData(tip = true) {
      localStorage.setItem(TEST_PRO_KEY, JSON.stringify(this.requireList))
      this.$store.commit('test/setRequireListStore', this.requireList)
      tip && this.$message.success('保存成功', 0.5)
    },
    clearAll() {
      this.$confirm({
        title: '确定清空？',
        onOk: () => {
          this.requireList = []
        }
      })
    }
  },
  watch: {
    'requireList': {
      deep: true,
      handler() {
        if (this.autoSaveData) {
          this.saveData(false)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.list-container {
  border: 1px solid lavender;
  padding: 0;

  .list-item {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 1px solid lavender;
    padding: 20px;
    line-height: 2.0;
    align-items: center;
  }

  &:first-child {
    border-top: 0;
    border-left: 0;
    border-right: 0;
  }


}
</style>
