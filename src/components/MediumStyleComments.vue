<template>
  <div class="popup" :style="{top: offsetTop, left: offsetLeft}" ref="popup">
    <span @click="addComment" class="mx-5">Comment</span>
    <span class="mx-1"> | </span>
    <span @click="deleteComment" class="mx-5">Delete</span>
  </div>
</template>
<script>
export default {
  /*
  this should be at the parent level try not to put in global
  such as when you highlight/select a string, a utility option will
  pop up from the top of the cursor

  upon clicking, a dialog box to, put in the comments and other things, 
  must come in from the side (ideally right|new component), with a state managed
  data for async calls and to have proper getters, and for this to be at a global level

  || ONE GETTER ON PARENT <-> ONE GETTER ON CHILD, TRY TO USE GETTERS ONLY
  */
  data() {
    return {
      popupInitialTopOffset: 0,
      popupInitialLeftOffset: 0,
      offsetTop: 0,
      offsetLeft: "-999em",
      selectedText: undefined,
      range: undefined
    };
  },
  methods: {
    ListenToDocumentSelection() {
      let sel = window.getSelection();
      setTimeout(() => {
        console.log(sel.isCollapsed)
        if (sel && !sel.isCollapsed) {
          this.selectedText = sel.toString()
          if (sel.rangeCount) {
            this.range = sel.getRangeAt(0).cloneRange();
            if (this.range.getBoundingClientRect) {
              var rect = this.range.getBoundingClientRect();
              let left = rect.left + (rect.right - rect.left) / 2;
              let top = rect.top;

              this.offsetTop = top - this.popupInitialTopOffset - 10 + "px";

              this.offsetLeft = left - this.popupInitialLeftOffset / 2 + "px";
            }
          }
        } else {
          this.offsetLeft = "-999em";
        }
      }, 0);
    },
    addComment () {
      const mark1 = document.createElement('mark')
      this.range.surroundContents(mark1)
    },
    deleteComment () {
      this.range.deleteContents()
    }
  },
  mounted() {
    this.popupInitialTopOffset = this.$refs.popup.offsetHeight;
    this.popupInitialLeftOffset = this.$refs.popup.offsetWidth;
    console.log(this.popupInitialTopOffset, this.popupInitialLeftOffset);
    window.addEventListener("mouseup", this.ListenToDocumentSelection);
  },
  destroyed() {
    window.removeEventListener("mouseup", this.ListenToDocumentSelection);
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
  top: calc(100% - 5px);
  transform: rotate(45deg);
  left: calc(50% - 3px);
}
</style>
