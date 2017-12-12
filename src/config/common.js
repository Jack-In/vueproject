/*
* @Author: allen100309
* @Date:   2017-12-12 00:48:21
* @Last Modified by:   allen100309
* @Last Modified time: 2017-12-12 01:07:23
*/
//构建通信模块，当我们需要将非父子组件的组件，进行传值时，这个时候，我们同规格搭建一个公用的通信模块，也就是实例化一个vue对象，把子组件要向父组件传递的值，通过自定义事件，绑定在这个对象上，那么父组件当父组件触发这个事件的时候，就可以通过相同的实例化对象的这个事件获取到从子组件传递过来的值
//
//有时候，非父子关系的两个组件之间也需要通信。在简单的场景下，可以使用一个空的 Vue 实例作为事件总线：

// var bus = new Vue()
// // 触发组件 A 中的事件
// bus.$emit('id-selected', 1)
// // 在组件 B 创建的钩子中监听事件
// bus.$on('id-selected', function (id) {
//   // ...
// })
import Vue from 'vue';
let vmObj = new Vue();
export default vmObj;//把这个实例化的对象导出去