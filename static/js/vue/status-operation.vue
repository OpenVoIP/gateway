<template>
  <div style="background-color: grey; padding: 10px;">
    <div class="row">
      <div class="col-1" v-if="currentSelect.status === 'Idle'">
        <button
          size="mini"
          type="button"
          class="btn btn-danger"
          @click="clickCall"
        >
          拨打
        </button>
      </div>

      <div class="col-4" v-if="currentSelect.status === 'InUse'">
        <button size="mini" type="button" class="btn btn-info" @click="spy">
          监听
        </button>
        <button size="mini" type="button" class="btn btn-info" @click="bargeIn">
          强插
        </button>
        <button
          size="mini"
          type="button"
          class="btn btn-info"
          @click="transfer"
        >
          强拆
        </button>
        <button size="mini" type="button" class="btn btn-info" @click="whisper">
          密语
        </button>
      </div>

      <div
        class="col-3"
        v-if="
          currentSelect.status === 'Ringing' || currentSelect.status === 'InUse'
        "
      >
        <button
          size="mini"
          type="button"
          class="btn btn-danger"
          @click="transfer"
        >
          转接
        </button>

        <button
          size="mini"
          type="button"
          class="btn btn-danger"
          @click="hangup"
        >
          挂断
        </button>
      </div>

      <div
        class="col-3"
        v-if="currentSelect.status === 'Idle'"
      >
        <button
          size="mini"
          type="button"
          class="btn btn-danger"
          @click="backgroundMusic"
        >
          背景音乐
        </button>

        <button
          size="mini"
          type="button"
          class="btn btn-danger"
          @click="alarm"
        >
          一键告警
        </button>

        <button
          size="mini"
          type="button"
          class="btn btn-danger"
          @click="clock"
        >
          铃声提醒
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div
          class="grid-content"
          style="color: white;"
          v-if="currentSelect.username"
        >
          <h3>{{ currentSelect.username }}</h3>
          <h4>
            分机号{{ currentSelect.extension }}&nbsp; 状态:{{
              currentSelect.status
            }}
          </h4>
        </div>
        <div
          class="grid-content"
          style="color: white;"
          v-if="!currentSelect.username"
        >
          <h4>选中需要操作的联系人, 分机不同状态对应不同操作功能</h4>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  clickCall,
  hangup,
  spy,
  transfer,
  bargeIn,
  whisper
} from "./dashboard";

import api from '../api'

export default {
  name: "operation",
  props: ["currentSelect"],
  data() {
    return {
      serverAddress: localStorage.getItem("serverAddress") || "localhost:8000"
    };
  },
  mounted() {},

  methods: {
    // 点击拨号
    clickCall() {
      // if (isWebRTC()) {
      //   return this.$EventBus.$emit("callNumber", {
      //     exten: this.currentSelect.extensionNumber
      //   });
      // }

      clickCall({
        src: `${localStorage.getItem("exten_extension")}`,
        dst: this.currentSelect.extensionNumber
      });
    },

    // hangup
    hangup() {
      hangup({
        extension: this.currentSelect.extensionNumber
      });
    },

    // 监听
    spy() {
      spy({
        src: `${localStorage.getItem("exten_extension")}`,
        dst: this.currentSelect.extensionNumber
      });
    },

    // 转接
    transfer() {
      transfer({
        src: `${localStorage.getItem("exten_extension")}`,
        dst: this.currentSelect.extensionNumber
      });
    },

    // 强插
    bargeIn() {
      bargeIn({
        psrc: `${localStorage.getItem("exten_extension")}`,
        dst: this.currentSelect.extensionNumber
      });
    },

    // 密语
    whisper() {
      whisper({
        src: `${localStorage.getItem("exten_extension")}`,
        dst: this.currentSelect.extensionNumber
      });
    },

    // alarm
    alarm(){
      fetch(`${this.currentSelect.id}/properties/alarm`, {
        method: 'PUT',
        headers: api.headers(),
        body: JSON.stringify({'alarm': true})
      }).then(res => res.json()).then(() =>{
        alert("调用成功");
      });
    },

    clock(){
      fetch(`${this.currentSelect.id}/properties/clock`, {
        method: 'PUT',
        headers: api.headers(),
        body: JSON.stringify({'clock': true})
      }).then(res => res.json()).then(() =>{
        alert("调用成功");
      });
    },

    backgroundMusic(){
      fetch(`${this.currentSelect.id}/properties/backgroundMusic`, {
        method: 'PUT',
        headers: api.headers(),
        body: JSON.stringify({'backgroundMusic': true})
      }).then(res => res.json()).then(() =>{
        alert("调用成功");
      });
    }
  },
  beforeDestroy() {}
};
</script>

<style >
</style>
