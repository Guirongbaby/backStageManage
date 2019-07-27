<template>
  <div class="roletable">
    <Table
      border
      ref="selection"
      :columns="columns4"
      :data="roledata"
      @on-selection-change="selectedData"
    ></Table>
  </div>
</template>
<script>
// import eventbus from "../../eventbus";
// import api from "../api";

export default {
  name: "roletable",
  data() {
    return {
      columns4: [
        {
          type: "selection",
          width: 55,
          align: "center"
        },
        {
          title: "角色",
          key: "name"
        },
        {
          title: "状态",
          key: "del"
        },
        {
          title: "提交时间",
          key: "subon"
        }
      ]
    };
  },
  // roledata: [], //用户角色,绑定表格的数据
  props: ["roledata"],
  created() {
    // eventbus.$on("tabel-empty-all", () => {
    //   this.$refs.selcetion.selecAll(false);
    // });
    // 获取用户角色
    // api.getRole().then(res => {
    //   this.roledata = res.data;
    // });
  },
  methods: {
    selectedData(rowdata) {
      this.editRow = rowdata;
    }
  }
};
</script>
