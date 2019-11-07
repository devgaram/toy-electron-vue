<template>
    <v-container>
        <transition name="button-custom" enter-active-class="animated fadeInUp faster" leave-active-class="animated fadeOutDown faster" mode="out-in">      
            <div class="text-center" v-if="status === 'prepare'" key="prepare">
                <v-btn width="150" rounded x-large class="blue darken-1 white--text" v-on:click="timerClick('start')" transition="fade-transition">시작</v-btn>
            </div>
            <div class="text-center" v-if="status === 'start'" key="start">
                <v-btn width="150" rounded x-large class="red darken-1 white--text" v-on:click="timerClick('stop')">중지</v-btn>
                <v-btn width="150" rounded x-large class="mx-4 blue-grey darken-1 white--text" v-on:click="record()">구간기록</v-btn>
            </div>
            <div class="text-center" v-if="status === 'stop'" key="stop"> 
                <v-btn width="150" rounded x-large class="blue darken-1 white--text" v-on:click="timerClick('restart')">계속</v-btn>
                <v-btn width="150" rounded x-large class="mx-4 red darken-1 white--text" v-on:click="timerClick('prepare')">초기화</v-btn>
                <v-btn width="150" rounded x-large class="blue-grey darken-1 white--text" v-on:click="record()">기록</v-btn>
            </div>
        </transition>
    </v-container>
</template>
<script>
export default {
  name: 'Button',
  data () {
    return {
      status: 'prepare'
    }
  },
  methods: {
    timerClick: function (changeStatus) {
      this.status = changeStatus.replace('restart', 'start')
      this.$EventBus.$emit('change-status', String(changeStatus))
    },
    record: function () {
      this.$EventBus.$emit('change-status', String('record'))
    }
  }
}
</script>
<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"; 
</style>
