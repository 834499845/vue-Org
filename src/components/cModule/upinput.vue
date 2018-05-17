<template>
    <div id="app">
        <input id="inp" :class="{redShowLow:expression.length != 0 ? false : true,garyShowLow:expression.length == 0 ? false :true }"
            type="text" :style="{width:width + 'px'}" :placeholder="aces" v-model="expression" @change="expresChange(code)">
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["heig", "low", "width", "code", "nameVal", "codeId"],
  data() {
    return {
      aces: "",
      expression: "",
      testStr: ""
    };
  },
  created: function() {
    if (this.low == "") {
      this.expression = "";
    } else {
      this.expression = this.low + "/" + this.heig;
    }
  },
  mounted: function() {},
  watch: {
    expression: function(val, oldVal) {
      if (val.length > 0) {
        console.log(val.indexOf("/"));
        if (val.indexOf("/") != -1) {
          var sss = val.split("/");
          if (sss.length == 2) {
            var h = sss[0];
            var l = sss[1];
            var s = sss[1] == "";
            var r = sss[0] == "";
            if (s == false && r == false) {
              if (isNaN(h) == false && isNaN(l) == false) {
                if (sss[0].length > 0 && sss[1].length > 0) {
                  var obj = {
                    code: this.code,
                    id: this.codeId,
                    start: sss[0] * 1,
                    end: sss[1] * 1
                  };
                  this.$emit("modelc", obj);
                  this.testStr = this.nameVal + ",true";
                }
              } else {
                this.testStr = this.nameVal + ",false";
              }
            } else {
              this.testStr = this.nameVal + ",false";
            }
          } else {
          }
        } else {
          if (val.length > 0) {
            this.testStr = this.nameVal + ",false";
          } else {
            this.testStr = this.nameVal + ",true";
          }
        }
      } else {
        this.testStr = this.nameVal + ",true";
        var obj = {
          code: this.code,
          id: this.codeId
        };
        this.$emit("delmodelc", obj);
      }
    }
  },
  methods: {
    expresChange(val) {
      this.$emit("nomodelc", this.testStr);
      this.$emit("modelchaad", val);
    },
    ...mapActions([""])
  }
};
</script>
<style scoped>
.garyShowLow {
  border: 1px solid #aeaeae;
}

.redShowLow {
  border: 1px solid #fe5371;
}

input {
  width: 80px;
  height: 32px;
  border-radius: 3px;
  padding-left: 5px;
}
</style>