<template>
  <div
    style="
      background:#eee; 
      display:flex; 
      justify-content: space-between; 
      height: 100%; 
      flex-direction: column;"
  >
    <div class="container">
      <statusDesc></statusDesc>
      <div class="row" style="margin-top:80px;">
        <div
          v-for="speaker in filterData"
          v-bind:key="speaker.id"
          class="col-3"
        >
          <speaker v-bind="speaker" v-on:select_speaker="setSelect"> </speaker>
        </div>
      </div>
    </div>
    <operation v-bind:currentSelect="currentSelect"></operation>
  </div>
</template>
<script>

import speaker from "./speaker";
import statusDesc from "./status-desc";
import operation from "./status-operation";

const API = require("../../js/api");

export default {
  name: "speaker-page",
  components: {
    speaker,
    statusDesc,
    operation
  },
  data() {
    return {
      groups: [{ name: "分组名", id: "id" }],
      activeTab: "all",
      items: [],
      speakers: "",
      currentSelect: {},
      filterData: [],
    };
  },
  mounted() {
    // 获取数据
    fetch("/speakers", {
      headers: API.headers()
    })
      .then(res => {
        return res.json();
      })
      .then(things => {
        this.speakers = things;
        this.filterData = this.speakers.map(item => {
        return {
          selected: item.id === this.currentSelect.id,
          extension: item['@type'][0],
          username: item["@type"][1],
          status: 'Idle', // 需要 redis 初始化
          id: item.id,
          title: item.title
        };
      });
      });
  },

  sockets: {
    // 获取分机状态
    asteriskAmiEvent(data) {
      switch (data.event) {
        case "ExtensionStatus": {
          // 排除中继
          if (data.exten.startsWith("trunk")) {
            return;
          }
          this.filterData = this.filterData
            .map(item => {
              if (item.extension === data.exten) {
                item.status = data.statustext;
              }
              return item;
            });
          break;
        }
        default:
          break;
      }
    },
    
    // 获取通话时长
    // asteriskChannels(data) {
    //   const durationInfo = {};
    //   data.forEach(item => {
    //     durationInfo[item.callerIdNum] = item.duration;
    //     durationInfo[item.connectedLineNum] = item.duration;
    //   });
    //   this.filterData = this.employees
    //     .filter(item => {
    //       if (this.activeTab === "all") {
    //         return true;
    //       }
    //       return item.group_id == this.activeTab;
    //     })
    //     .map(employee => {
    //       if (durationInfo[employee.extensionNumber]) {
    //         employee.duration = durationInfo[employee.extensionNumber];
    //       } else {
    //         employee.duration = "";
    //       }
    //       return employee;
    //     });
    // }
  },
  methods: {
    // 设置当前选中
    setSelect(data) {
      // 切换选中状态
      let results = this.filterData.filter(item => {
        return item.id == data.id;
      });

      if (results.length > 0) {
        this.currentSelect = results[0];
      } else {
        this.currentSelect = {};
      }

      this.updateDisplay();
    },
    updateDisplay() {
      this.filterData = this.filterData.map(item => {
        item.selected = item.id === this.currentSelect.id;
        return item;
      });
    }
  }
};
</script>

<style >
#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

.Unavailable {
  background: white;
}

.Idle {
  background: #19be6b;
}

.InUse {
  background: #ed4014;
}

.Busy {
  background: #ed4014;
}

.Ringing {
  background: #f90;
}
</style>