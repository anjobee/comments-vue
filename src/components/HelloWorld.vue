<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div id="commentableArea">
          <div id="ca01">
            HELLO
          </div>
          <div id="ca02">
            SECOND DIV
          </div>
          <div class="popup" :style="{top: offsetTop, right: offsetRight}" ref="popup">
            <span class="mx-5">+</span>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      offsetTop: 0,
      offsetRight: 0
    }),
    mounted () {
      const commentableArea = document.getElementById('commentableArea')
      console.log(commentableArea)
      const range = new Range()
      range.selectNode(commentableArea)
      // range.setStart(welcome, 1)
      // range.setEnd(welcome, 2)
      console.log(range)
      var rect = range.getBoundingClientRect();
      console.log(rect)
      this.offsetTop = rect.height
      const right = rect.left - rect.right
      console.log(right)
      console.log(rect.right)
      this.offsetRight = right
    },
    methods: {

    }
  }
</script>

<style scoped>
.popup {
  position: absolute;
  color: #FFF;
  background-color: #000;
  padding: 10px;
  border-radius: 5px;
  transform-origin: center center;
  cursor: pointer;
}
.popup:after {
  content: "";
  border-bottom: 5px solid #000;
  border-right: 5px solid #000;
  border-top: 5px solid transparent;
  border-left: 5px solid transparent;
  position: absolute;
  top: calc(50% - 5px);
  transform: rotate(135deg);
  right: calc(100% - 5px);
}
</style>