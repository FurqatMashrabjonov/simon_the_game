<template>
  <div id="app">
    <div class="container">
      <h2>SIMON THE GAME</h2>
      <select v-model="difficult_time">
        <option value="1400">Easy</option>
        <option value="1000">Normal</option>
        <option value="400">Hard</option>
      </select>
      <div class="simon">
        <div class="pad red" @click="clicked(1)" :class="{ active: isActive === 1 }"></div>
        <div class="pad green" @click="clicked(2)" :class="{ active: isActive === 2 }"></div>
        <div class="pad blue" @click="clicked(3)" :class="{ active: isActive === 3 }"></div>
        <div class="pad yellow" @click="clicked(4)" :class="{ active: isActive === 4 }"></div>
        <div class="display" id="display">{{ level_str }}</div>
      </div>
      <button v-if="is_reply" @click="generate">Reply</button>
      <h2>{{message}}</h2>
    </div>
  </div>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      arr: [],
      btn: 'Start',
      level: 0,
      level_str: "Lvl:0",
      isActive: 0,
      next: 0,
      message: "",
      is_reply: false,
      difficult_time:null
    }
  },
  created() {
    if (this.difficult_time != null)
    this.generate()
  },
  watch: {
    difficult_time(){
      this.generate()
    }
  },
  methods: {
    generate() {
      this.is_reply = false
      this.level += 1
      this.arr.push(Math.floor(Math.random() * 4 + 1))

      this.level_str = this.level_str.split(':')[0] + ':' + this.level
      this.show()
    },
    show() {
      let i = 0
      let interval1 = setInterval(() => {
        this.isActive = 0
        if (i !== this.level) {
          this.isActive = this.arr[i]
          let interval2 = setInterval(() => {
            this.isActive = 0
            clearInterval(interval2)
          }, 500)
          i += 1
        } else {
          clearInterval(interval1)
          this.isActive = 0
        }
      }, this.difficult_time)
    },

    clicked(number) {
      this.isActive = number
        let interval1 = setInterval(()=> {
            this.isActive=0
          clearInterval(interval1)
        }, 400)
      if (number === this.arr[this.next]) {
        if (this.next !== this.level-1) {
          this.next += 1
        }
        else {
          this.next = 0
          this.generate()
        }
      }else {
        this.level = 0
        this.message = "Game over"
        this.arr = []
        this.is_reply = true
      }
    }

  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Press+Start+2P|Righteous);

body {
  font-family: 'Righteous', cursive;
  padding: 0;
  margin: 0;
  background-color: #666;
}

.container {
  width: 400px;
  margin: 0 auto;
}

.pad {
  cursor: pointer;
}

.container h1 {
  text-align: center;
  font-size: 78px;
  padding: .2em 0 0 0;
  margin: 0;
}

.pad.red {
  left: 15px;
  top: 15px;
  background: rgb(255, 0, 0);
  -webkit-border-radius: 320px 20px 20px;
  -moz-border-radius: 320px 20px 20px;
  -o-border-radius: 320px 20px 20px;
  border-radius: 320px 20px 20px;

}

.pad.green {
  right: 15px;
  top: 15px;
  background: rgb(0, 255, 0);
  -webkit-border-radius: 20px 320px 20px 20px;
  -moz-border-radius: 20px 320px 20px 20px;
  -o-border-radius: 20px 320px 20px 20px;
  border-radius: 20px 320px 20px 20px;
}

.pad.yellow {
  bottom: 15px;
  right: 15px;
  background: rgb(255, 255, 0);
  -webkit-border-radius: 20px 20px 320px 20px;
  -moz-border-radius: 20px 20px 320px 20px;
  -o-border-radius: 20px 20px 320px 20px;
  border-radius: 20px 20px 320px 20px;
}

.pad.blue {
  bottom: 15px;
  left: 15px;
  background: rgb(0, 0, 255);
  -webkit-border-radius: 20px 20px 20px 320px;
  -moz-border-radius: 20px 20px 20px 320px;
  -o-border-radius: 20px 20px 20px 320px;
  border-radius: 20px 20px 20px 320px;
}

.simon {
  position: relative;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -o-border-radius: 50%;
  border-radius: 50%;
  width: 400px;
  height: 400px;
  background: #000;
  margin: 20px;
  background: rgb(0, 0, 0);
  background: -moz-linear-gradient(45deg, rgba(0, 0, 0, 1) 0%, rgba(28, 36, 45, 1) 100%);
  background: -webkit-gradient(linear, left bottom, right top, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(100%, rgba(28, 36, 45, 1)));
  background: -webkit-linear-gradient(45deg, rgba(0, 0, 0, 1) 0%, rgba(28, 36, 45, 1) 100%);
  background: -o-linear-gradient(45deg, rgba(0, 0, 0, 1) 0%, rgba(28, 36, 45, 1) 100%);
  background: -ms-linear-gradient(45deg, rgba(0, 0, 0, 1) 0%, rgba(28, 36, 45, 1) 100%);
  background: linear-gradient(45deg, rgba(0, 0, 0, 1) 0%, rgba(28, 36, 45, 1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#000000', endColorstr='#1c242d', GradientType=1);
}

.simon::before {
  content: ' ';
  left: 50%;
  top: 50%;
  -webkit-border-radius: 85px;
  -moz-border-radius: 85px;
  -o-border-radius: 85px;
  border-radius: 85px;
  position: absolute;
  display: block;
  width: 170px;
  height: 170px;
  background: #000;
  z-index: 99;
  margin: -85px;
}

.simon .display {
  font-family: 'Press Start 2P', cursive;
  font-size: 17px;
  line-height: 160%;
  position: absolute;
  cursor: pointer;
  display: block;
  background: rgb(255, 255, 255);
  background: -moz-radial-gradient(center, ellipse cover, rgba(255, 255, 255, 1) 0%, rgba(246, 246, 246, 1) 47%, rgba(237, 237, 237, 1) 100%);
  background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, rgba(255, 255, 255, 1)), color-stop(47%, rgba(246, 246, 246, 1)), color-stop(100%, rgba(237, 237, 237, 1)));
  background: -webkit-radial-gradient(center, ellipse cover, rgba(255, 255, 255, 1) 0%, rgba(246, 246, 246, 1) 47%, rgba(237, 237, 237, 1) 100%);
  background: -o-radial-gradient(center, ellipse cover, rgba(255, 255, 255, 1) 0%, rgba(246, 246, 246, 1) 47%, rgba(237, 237, 237, 1) 100%);
  background: -ms-radial-gradient(center, ellipse cover, rgba(255, 255, 255, 1) 0%, rgba(246, 246, 246, 1) 47%, rgba(237, 237, 237, 1) 100%);
  background: radial-gradient(center, ellipse cover, rgba(255, 255, 255, 1) 0%, rgba(246, 246, 246, 1) 47%, rgba(237, 237, 237, 1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#ededed', GradientType=1);
  width: 120px;
  padding-top: 40px; /* dont remove */
  height: 80px;
  -webkit-border-radius: 60px;
  -moz-border-radius: 60px;
  -o-border-radius: 60px;
  border-radius: 60px;
  left: 50%;
  top: 50%;
  text-align: center;
  z-index: 100;
  margin: -60px;
}

.pad {
  position: absolute; /* why ? */
  width: 180px;
  height: 180px;
  background: rgba(20, 20, 20, 1);
  opacity: 0.5;
  -webkit-transition: all 300ms ease;
  -moz-transition: all 300ms ease;
  -o-transition: all 300ms ease;
  transition: all 300ms ease;
}

.pad.hover {
  opacity: 0.7;
}

.pad.active {
  opacity: 1;
}
</style>
