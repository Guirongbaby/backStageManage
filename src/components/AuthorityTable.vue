<template>
  <div class="AuthorityTable">
    <Table
      border
      ref="selection"
      :columns="columns4"
      :data="authoritydata"
    ></Table>
  </div>
</template>

<script>
// import api from "../api";
export default {
  name: "AuthorityTable",
  data() {
    return {
      columns4: [
        {
          type: "selection",
          width: 55,
          align: "center"
        },
        {
          title: "权限",
          key: "des"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "状态码",
          key: "status"
        },
        {
          title: "提交时间",
          key: "subon"
        }
      ]
    };
  },
  props: ["authoritydata"],
  created() {},
  methods: {}
};
</script>
