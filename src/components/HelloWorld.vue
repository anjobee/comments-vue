<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div id="commentableArea">
          <div id="ca01">
            HELLO
          </div>
          <div id="ca02" class="mt-5">
            SECOND DIV
          </div>
          <div class="popup" :style="{top: offsetTop, right: offsetRight}" ref="popup" id="popup">
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
      offsetRight: "-999em",
      commentableAreaHeight: 0,
      rect: '',
      popupRect: ''
    }),
    mounted () {
      const commentableArea = document.getElementById('commentableArea')
      const range = new Range()
      range.selectNode(commentableArea)
      var rect = range.getBoundingClientRect()
      this.commentableAreaHeight = rect.height
      this.rect = rect
      const popup = document.getElementById('popup')
      const popupRange = new Range()
      popupRange.selectNode(popup)
      this.popupRect = popupRange.getBoundingClientRect()
      console.log(this.popupRect)
      window.addEventListener("mouseover", this.listenToHover);
    },
    destroyed() {
      window.removeEventListener("mouseover", this.listenToHover);
    },
    methods: {
      listenToHover (e) {
        if (e.target.parentElement && e.target.parentElement.id === "commentableArea" && e.target.id !== 'popup') {
          setTimeout(() => {
            const newRange = new Range()
            newRange.selectNode(e.target)
            const divRect = newRange.getBoundingClientRect()
            // this.offsetTop = `${divRect.bottom - (divRect.height / 2)}px`
            this.offsetTop = `${divRect.top - this.rect.top - (this.popupRect.height / 2)}px`
            console.log(this.offsetTop)
            // const right = this.rect.right - this.rect.left
            // this.offsetRight = `${right}px`
            this.offsetRight = `10%`
          }, 0)
        }
        // else {
        //   this.offsetRight = '-999em'
        // }
      }
    }
  }
</script>

<style scoped>
#commentableArea {
  position: relative;
}

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