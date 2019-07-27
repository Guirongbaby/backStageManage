<template>
  <div class="userTable">
    <Table
      border
      ref="selection"
      @on-selection-change="handleSelectionChange"
      :columns="columns4"
      :data="tabledata"
    >
    </Table>
    <Button @click="handleSelectAll(true)">全部选中</Button>
    <Button @click="handleSelectAll(false)">取消全选</Button>
  </div>
</template>

<script>
// import eventbus from "../../eventbus";
export default {
  name: "userTable",
  data() {
    return {
      columns4: [
        {
          type: "selection",
          width: 55,
          align: "center"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "大学",
          key: "school"
        },
        {
          title: "电话",
          key: "phone"
        },
        {
          title: "邮箱",
          key: "mail"
        },
        {
          title: "用户名",
          key: "username"
        }
      ]
    };
  },
  props: ["tabledata"],
  created() {
    // eventbus.$on("table-empty-all", () => {
    //   this.$refs.selection.selectAll(false);
    // });
  },
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    handleSelectionChange(selection) {
      this.$emit("select-change", selection);
    }
  }
};
</script>
<style lang="scss" scoped>
// 全选 和取消全选的按钮
button {
  margin-right: 10px;
}
</style>
