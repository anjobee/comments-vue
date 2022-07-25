<template>
  <div class="popup" :style="{top: offsetTop, right: offsetRight}" ref="popup" id="popup">
    <span @click="postComment" class="mx-5" id="popupChild">Comment</span>
    <span class="mx-1" id="popupChild"> | </span>
    <span class="mx-5" id="popupChild">Delete</span>
  </div>
</template>

<script>
  /*
  this should be at the parent level try not to put in global
  such as when you highlight/select a string, a utility option will
  pop up from the top of the cursor

  upon clicking, a dialog box to, put in the comments and other things, 
  must come in from the side (ideally right|new component), with a state managed
  data for async calls and to have proper getters, and for this to be at a global level

  || ONE GETTER ON PARENT <-> ONE GETTER ON CHILD, TRY TO USE GETTERS ONLY
  */
  import comment from '../mixins/comment'

  export default {
    mixins: [ comment ]
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
