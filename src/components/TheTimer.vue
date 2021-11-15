<template>
  <div class="timer">
    <div class="timer__title">Left until the draw</div>
    <div class="timer__counter">{{ counterText }}</div>
  </div>
</template>

<script>
export default {
  name: "TheTimer",

  props: {
    finishDate: {
      type: Date,
      default: () => {
        let currentDate = new Date();
        let day = currentDate.getDate();
        let year = currentDate.getFullYear();
        let moth = currentDate.getMonth();

        return new Date(year, moth, ++day);
      },
    },
    shouldRestart: {
      type: Boolean,
      default: true,
    },
  },

  data: function() {
    return {
      hours: this.getLeftHours(),
      minutes: this.getLeftMinutes(),
      seconds: this.getLeftSeconds(),
      intervalId: null,
    }
  },

  computed: {
    counterText: (vm) => `${vm.hours}H ${vm.minutes}M ${vm.seconds}S`,
  },

  created: function() {
    this.intervalId = setInterval(function () {
      this.hours = this.getLeftHours();
      this.minutes = this.getLeftMinutes();
      this.seconds = this.getLeftSeconds();

      if (!this.hours && !this.minutes && !this.seconds) {
        this.shouldRestart ? this.restart() : clearInterval(this.intervalId);
      }
    }.bind(this),1000);
  },

  methods: {
    restart() {
      const newDay = this.finishDate.getDate() + 1;
      this.finishDate.setDate(newDay);
    },
    getLeftHours() {
      const hoursLeft = Math.floor((this.getDelta() % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      return hoursLeft >= 0 ? hoursLeft : 0;
    },
    getLeftMinutes() {
      const minutesLeft = Math.floor((this.getDelta() % (1000 * 60 * 60)) / (1000 * 60));
      return minutesLeft >= 0 ? minutesLeft : 0;
    },
    getLeftSeconds() {
      const secondsLeft = Math.floor((this.getDelta() % (1000 * 60)) / 1000);
      return secondsLeft >= 0 ? secondsLeft : 0;
    },
    getDelta() {
      return this.finishDate.getTime() - Date.now();
    },
  },
}
</script>

<style lang="scss" scoped>
.timer {
  padding: 28px 68px;
  background-color: $gray-light;
  border-radius: 24px;

  &__title {
    font-size: 0.6rem;
    font-weight: bold;
    margin-bottom: 8px;
  }

  &__counter {
    font-size: 2.8rem;
    font-weight: bold;
  }
}
</style>
