<template>
  <div style="padding: 4px;" @click="select()"  
    v-bind:style="{'background-color': selected ? 'black' : 'grey'}">
    <div style="padding: 5px;">
      <div>
        <div
          slot="header"
          style="display: flex; justify-content: space-between; color: white;">
          <a style="
          color: white;
          width: 100px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: x-large;" v-bind:href="''+id+''">{{title}}</a>
        </div>
        <div style="padding: 5px;" v-bind:class="status">{{status || 离线 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "speaker",
  props: ["id", "status", "title", "selected"],
  data() {
    return {
      data: {
      },
    };
  },
  mounted() {},

  methods: {
    select() {
      this.$emit("select_speaker", { id: this.selected ? null: this.id });
    },

    //获取详情
    detail() {
      this.$alert(`用户名${this.username}, 分机号${this.extensionNumber}`, "用户详情");
    }
  },
  beforeDestroy() {}
};
</script>

<style >
.ivu-menu-item a {
  color: white;
}
</style>
