<template>
    <!--컨텐츠를 화면 중앙에 배열한다.-->
    <v-container>
        <v-row align="center">
            <v-col>
                <v-card class="time-card" id="hour">{{ hour }}</v-card>
            </v-col>
            <span class="time-separator">:</span>
            <v-col>
                <v-card class="time-card" id="minute">{{ minute }}</v-card>
            </v-col>
            <span class="time-separator">:</span>
            <v-col>
                <v-card class="time-card" id="second">{{ second }}</v-card>
            </v-col>
            <span class="time-separator">.</span>
            <v-col>
                <v-card class="time-card" id="mili-second">{{ millisecond }}</v-card>
            </v-col>
        </v-row>
        <v-row align="center">
            <v-col>
                <v-card class="time-card blue white--text" id="duration-hour">{{ durationHour }}</v-card>
            </v-col>
            <span class="time-separator">:</span>
            <v-col>
                <v-card class="time-card blue white--text" id="duration-minute">{{ durationMinute }}</v-card>
            </v-col>
            <span class="time-separator">:</span>
            <v-col>
                <v-card class="time-card blue white--text" id="duration-second">{{ durationSecond }}</v-card>
            </v-col>
            <span class="time-separator">.</span>
            <v-col>
                <v-card class="time-card blue white--text" id="duration-mili-second">{{ durationMilliSecond }}</v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
  name: 'Timer',
  props: {
    hour: Number,
    minute: Number,
    second: Number,
    millisecond: Number
  },
  data () {
    return {
      startDate: null,
      endDate: null,
      restartDate: null,
      durationDate: null,
      durationHour: 0,
      durationMinute: 0,
      durationSecond: 0,
      durationMilliSecond: 0,
      status: '',
      makeHour: 1000 * 60 * 60,
      makeMinute: 1000 * 60,
      makeSecond: 1000
    }
  },
  created () {
    this.$EventBus.$on('change-status', (status) => {
      this.status = status
      switch (status) {
        case 'start':
          this.startDate = new Date()
          this.restartDate = this.startDate
          this.durationDate = this.startDate
          this.startTimer()
          break
        case 'stop':
          this.endDate = new Date()
          break
        case 'restart': { // let 쓰기 위해서 {} 필요..
          let restartdiff = new Date().getTime() - this.endDate.getTime() + this.restartDate.getTime()
          this.durationDate.setTime(restartdiff)
          this.restartDate = this.durationDate
          this.startTimer()
          break
        }
        case 'prepare':
          this.durationHour = 0
          this.durationMinute = 0
          this.durationSecond = 0
          this.durationMilliSecond = 0
          break
        case 'record':
          this.endDate = new Date()
          this.doRecord()
          break
        default:
          break
      }
    })
  },
  methods: {
    startTimer: function () {
      let durationTime = new Date()
      let diff = durationTime.getTime() - this.durationDate.getTime()
      this.durationHour = Math.floor(diff / this.makeHour)
      diff -= this.durationHour * this.makeHour
      this.durationMinute = Math.floor(diff / this.makeMinute)
      diff -= this.durationMinute * this.makeMinute
      this.durationSecond = Math.floor(diff / this.makeSecond)
      diff -= this.durationSecond * this.makeSecond
      this.durationMilliSecond = diff
      setTimeout(() => {
        if (this.status !== 'stop') this.startTimer()
      })
    },
    doRecord: function () {
      let record = {
        title: '',
        date: this.startDate.getFullYear() + '년' + this.startDate.getMonth() + '월' + this.startDate.getDate() + '일',
        startTime: this.startDate.getHours() + ':' + this.startDate.getMinutes() + ':' + this.startDate.getSeconds() + '.' + this.startDate.getMilliseconds(),
        endTime: this.endDate.getHours() + ':' + this.endDate.getMinutes() + ':' + this.endDate.getSeconds() + '.' + this.endDate.getMilliseconds(),
        duration: this.durationHour + ':' + this.durationMinute + ':' + this.durationSecond + '.' + this.durationMilliSecond
      }
      this.$db.insert(record, (err, newItem) => {
        if (err) console.log(err.stack)
        this.$EventBus.$emit('insert-record', String(newItem._id))
      })
    }
  }
}
</script>
<style scoped>
.time-card {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    font-size: x-large;
}
.time-separator {
    font-size: x-large;
}
</style>