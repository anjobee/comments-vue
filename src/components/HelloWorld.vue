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
          <CommentPlugin></CommentPlugin>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import CommentPlugin from './CommentPlugin'

  export default {
    name: 'HelloWorld',
    components: {
      CommentPlugin
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