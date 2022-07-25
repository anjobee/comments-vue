<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div id="commentableArea">
          <div class="mt-5 ce">
            HELLO
          </div>
          <div class="mt-5 ce">
            SECOND DIV
          </div>
          <div class="popup" :style="{top: offsetTop, right: offsetRight}" ref="popup" id="popup">
            <span class="mx-5" id="popupChild">+</span>
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
      commentableAreaBounds: '',
      popupRectangleBounds: '',
      commentableElements: []
    }),
    mounted () {
      const commentableArea = document.getElementById('commentableArea')
      const popup = document.getElementById('popup')

      this.getCommentableElements(commentableArea)

      this.commentableAreaBounds = this.getBounds(commentableArea)
      this.popupRectangleBounds = this.getBounds(popup)

      window.addEventListener("mouseover", this.listenToHover)
    },
    destroyed() {
      window.removeEventListener("mouseover", this.listenToHover)
    },
    methods: {
      listenToHover (e) {
        if (e.target.id === 'popup') return

        if (this.commentableElements.includes(e.target)) {
          setTimeout(() => {
            if (e.target.id !== 'popupChild') {
            const targetBounds = this.getBounds(e.target)
            const popupOffset = this.popupRectangleBounds.height * 0.25
            this.offsetTop = `${targetBounds.top - this.commentableAreaBounds.top - popupOffset}px`
            }
            this.offsetRight = `5%`
          }, 0)
        }
        else {
          this.offsetRight = '-999em'
        }
      },
      getBounds (node) {
        const range = new Range()
        range.selectNode(node)
        return range.getBoundingClientRect()
      },
      getCommentableElements (commentableArea) {
      for (const child of commentableArea.childNodes) {
        if (child.id === 'popup') {
          this.commentableElements.push(child.childNodes[0])
        }
        this.commentableElements.push(child)
      }
      }
    }
  }
</script>

<style scoped>
/* .ce {
  height: 3em;
} */

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