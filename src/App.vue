<template>
    <div id="app" class="views">
        <router-view class="view" keep-alive></router-view>
    </div>
</template>

<script>
export default {
  name: "views"
};
</script>

<style>
a {
  text-decoration: none;
}

a,
input,
button {
  outline: none;
}

li {
  list-style: none;
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
  position: relative;
  background-color: #f4f6f9;
  font-family: "microsoft yahei", Helvetica, Tahoma, Arial, "Microsoft jhengHei",
    sans-serif;
}

input,
button,
select,
textarea {
  outline: none;
}

html {
  height: 100%;
  margin: 0;
  min-width: 1024px;
  padding: 0;
  background-color: #f4f6f9;
}

.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #fe5371 !important;
  border: 1px solid #fe5371 !important;
}

input[type="file"] {
  opacity: 0;
}

h1 {
  font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6,
h7,
ul,
li,
p {
  margin: 0;
  padding: 0;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  /*padding: 0 !important;
    margin: 0;*/
}
</style>