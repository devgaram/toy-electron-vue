<template>
  <!--레이아웃 최상단-->
  <v-app> 
    <v-app-bar app>
      <!--툴바-->
      <v-toolbar-title class="headline text-uppercase">
        <span>TODAY</span>
        <span class="font-weight-light"> {{ formatToday }}</span>
      </v-toolbar-title>
      <!--가능한 공간을 채우거나 두 컴포넌트 사이에 공간을 만들고 싶을 때 유용-->
      <v-spacer></v-spacer>      
    </v-app-bar>
    <!--v-content를 통해 구성 요소를 동적으로 조정한다.-->
    <v-content>
      <Timer :hour="hour" :minute="minute" :second="second" :millisecond="millisecond"/>     
      <Record/>
    </v-content>
    <v-footer fixed>
      <Button/>
    </v-footer>
     
  </v-app>
</template>

<script>
// 바벨이나 웹팩을 이용해서 ES2015를 적용하고 있다면
// 싱글파일 컴포넌트를 이용하여 아래와 같이 지역 등록된 컴포넌트를
// 하위 컴포넌트에서 사용할 수 있도록 설정할 수 있다.
/*
var ComponentA = { }

var ComponentB = {
  components: {
    'component-a': ComponentA
  },
  // ...
}
*/
import Timer from '@/components/Timer'
import Record from '@/components/Record'
import Button from '@/components/Button'

export default {
  name: 'Main',
  components: { // 컴포넌트 등록 HelloWorld 컴포넌트를 App.vue 에서 사용하기 위해 등록함
    Timer,
    Record,
    Button
  },
  data () {
    return {
      today: '',
      day: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    }
  },
  computed: {
    formatToday () {
      if (this.today !== '') {
        return this.today.getFullYear() + '년' +
        this.today.getMonth() + '월' +
        this.today.getDate() + '일' +
        this.day[this.today.getDay()]
      } else return this.today
    }
  },
  // 화살표 함수 지양하기, 화살표 함수는 부모 컨텍스트에 바인딩되기 때문에 this 컨텍스트가 호출하는 Vue
  // 인스턴스에서 사용할 경우 Uncaught TypeError: 에러가 뜬다.
  mounted () {
    // 전체가 렌더링되었을 때 DOM 변경
    this.$nextTick(() => {
      this.setToday()
    })
  },
  methods: {
    setToday () {
      this.today = new Date()
      this.hour = this.today.getHours()
      this.minute = this.today.getMinutes()
      this.second = this.today.getSeconds()
      this.millisecond = this.today.getMilliseconds()
      setTimeout(() => {
        this.setToday()
      }, 1)
    }
  }
}
</script>
<!--
https://github.com/FEDevelopers/tech.description/wiki/Vue%EC%97%90%EC%84%9C-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%ED%85%9C%ED%94%8C%EB%A6%BF%EC%9D%84-%EC%A0%95%EC%9D%98%ED%95%98%EB%8A%94-7%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95
Vue에서 컴포넌트 템플릿 정의하는 방법
지금 이방법은 single file component 방법
컴포넌트 정의와 마크업을 한 파일 내에서 작성할 수 있다는 장점이 있다
이 방법은 트랜스 파일 과정을 거쳐야 하며 몇몇 IDE에서는 이 파일 타입에 
대해서 구문 강조를 지원하지 않는다는 단점이 있지만 짱이다.

https://kr.vuejs.org/v2/guide/single-file-components.html

전역 컴포넌트는 Vue.component를 사용해 정의되고,
다음에 모든 페이지의 container 엘리먼트를 대상으로 하는
new Vue({el: '#container'})가 정의된다..
특정 뷰를 향상시키는 용도로 사용되는 프로젝트에는 유용하나
더 복잡한 경우 또는 프론트엔드가 자바스크립트 기반인 경우 단점이 분명해짐
.vue 확장자를 가진 싱글 파일 컴포넌트를 쓰자
pug 및 바벨과 같은 전처리기로 빌드를 할 수 있으
.vue는 웹팩 또는 브라우저파이라는 빌드 도구를 이용해 vue 싱글파일 컴포넌트 이용
컴포넌트 내부에서 템플릿, 로직 및 스타일이 본질적으로 결합되어 배치되면 컴포넌트의 
응집력과 유지 보수성이 향상된다~
-->