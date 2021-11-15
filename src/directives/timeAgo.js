import DateHelper from "@/helpers/dateHelper";

export default {
  bind: function (el, binding) {
    let intervalId;
    const dateHelper = new DateHelper(new Date(), binding.value);
    let intervalTime = 0;

    intervalId = setInterval(() => {
      dateHelper.currentDate = new Date();
      let text;

      if (!dateHelper.isMinuteLeft()) {
        text = 'just now';
        intervalTime = 60 * 1000; // Проверяем раз в 60 секунд

      } else if (!dateHelper.isHourLeft()) {
        text = `${dateHelper.leftMinutes}m ago`;
        intervalTime = 60 * 1000; // Проверяем раз в 60 секунд

      } else if (dateHelper.isSameDay()) {
        text = `${dateHelper.leftHours}h ago`;
        intervalTime = 10 * 60 * 1000; // Проверяем раз в 10 минут

      } else if (dateHelper.isDaysLeft(1)) {
        text = 'yesterday';
        intervalTime = 10 * 60 * 1000; // Проверяем раз в 60 минут

      } else if (dateHelper.isSameYear()) {
        text = binding.value.toDateString().replace(/^(\w+.)(.*)(\W\w+)$/, '$2');
        clearInterval(intervalId);

      } else {
        text = binding.value.toDateString().replace(/^\w+./, '');
        clearInterval(intervalId);
      }

      el.innerText !== text && (el.innerText = text);
    }, intervalTime)
  }
}
