<div
  id="date-picker-container"
  class="date-picker-container"
  uk-dropdown="toggle: {target}; mode: click; animation: uk-animation-slide-top-small; duration: 200; offset: 10;"
>
  <div class="date-picker-header">
    <div class="check-date-left" on:click={() => handleCheckYear('minus')}>
      <i class="fa fa-angle-double-left" aria-hidden="true"></i></div>
    <div class="check-date-left" on:click={() => handleCheckMouth('minus')}>
      <i class="fa fa-angle-left" aria-hidden="true"></i></div>
    <div class="check-date-year" on:click={handleChangeYears}>{datePicker.year}年</div>
    <div class="check-date-month" on:click={handleChangeMouths}>{datePicker.month}月</div>
    <div class="check-date-right" on:click={handleCheckMouth}>
      <i class="fa fa-angle-right" aria-hidden="true"></i>
    </div>
    <div class="check-date-right" on:click={handleCheckYear}>
      <i class="fa fa-angle-double-right" aria-hidden="true"></i></div>
  </div>

  <div class="date-picker-table">
    {#if yearVisible}
      <ul class="date-checker-year-container">
        {#each yearsList as year}
          <li
            class:active={datePicker.year === year}
            on:click={() => handleCheckedYear(year)}
          >
            {year}年
          </li>
        {/each}
      </ul>
    {/if}

    {#if mouthVisible}
      <ul class="date-checker-mouth-container">
        {#each mouths as mouth, index}
          <li
            class:active={index + 1 === datePicker.month}
            on:click={() => handleCheckedMouth(index + 1)}
          >
            {mouth}月
          </li>
        {/each}
      </ul>
    {/if}

    {#if !yearVisible && !mouthVisible}
      <table>
        <thead>
        <tr>
          {#each weeks as week}
            <th>{week}</th>
          {/each}
        </tr>
        </thead>
        <tbody>
        {#each datePicker.days as dayItem}
          <tr>
            {#each dayItem as day}
              <td
                class="uk-dropdown-close"
                class:more-date={day.date < 0 || day.date > 31}
                class:active={day.showDate == toDay}
                on:click={() => handleCheckDate(day.showDate)}>
                {day.showDate}
              </td>
            {/each}
          </tr>
        {/each}
        </tbody>
      </table>
    {/if}
  </div>

</div>


<script>
  import {onMount, createEventDispatcher} from 'svelte';
  import {weeks, mouths, dateFormat, getYears} from './config';

  const dispatch = createEventDispatcher();

  // 触发目标选择器
  export let target = '';
  export let value = '';
  export let format = 'yyyy-MM-dd';

  let toDay = null;
  let datePicker = {
    year: null,
    month: null,
    days: []
  };

  // 是否显示选择年 面板
  let yearVisible = false;
  $:yearsList = getYears(datePicker.year);

  // 是否显示月份选择面板
  let mouthVisible = false;

  onMount(() => {
    initDate();
    dropdownLifeCycleEvent();
  })

  /**
   * 注册dropdown事件
   */
  const dropdownLifeCycleEvent = () => {
    const dateWrapper = document.querySelector('#date-picker-container');

    // 显示完成后
    dateWrapper.addEventListener('shown', setDefaultValue);
  }

  /**
   * 初始化日期
   * @param year
   * @param month
   */
  const initDate = (year, month) => {
    let days = [];
    if (!year || !month) {
      const toDay = new Date();
      year = toDay.getFullYear();
      month = toDay.getMonth() + 1;
    }

    const firstDay = new Date(year, month - 1, 1);
    let firstDayWeekDay = firstDay.getDay();
    if (firstDayWeekDay === 0) { //周日
      firstDayWeekDay = 7;
    }
    year = firstDay.getFullYear();
    month = firstDay.getMonth() + 1;

    let lastDayOfLastMonth = new Date(year, month - 1, 0);//获取最后一天
    let lastDateOfLastMonth = lastDayOfLastMonth.getDate();

    let preMonthDayCount = firstDayWeekDay - 1;
    let lastDay = new Date(year, month, 0);
    let lastDate = lastDay.getDate();

    for (let i = 0; i < 7 * 6; i++) {
      let date = i + 1 - preMonthDayCount;
      let showDate = date;
      let thisMonth = month;
      //上一月
      if (date <= 0) {
        thisMonth = month - 1;
        showDate = lastDateOfLastMonth + date;
      } else if (date > lastDate) {
        //下一月
        thisMonth = month + 1;
        showDate = showDate - lastDate;
      }
      if (thisMonth === 0) {
        thisMonth = 12;
      }
      if (thisMonth === 13) {
        thisMonth = 1;
      }

      days.push({
        month: thisMonth,
        date: date,
        showDate: showDate
      })
    }

    datePicker.year = year;
    datePicker.month = month;

    let newDays = [];

    while (days.length) {
      const residue = days.length % 7;
      if (residue === 0) {
        newDays.push(days.splice(0, 7))
      } else {
        newDays.push(days.splice(0, residue))
      }

      datePicker.days = newDays;
    }

    if (!value) getToDay();
  }

  /**
   * 切换年
   */
  const handleCheckYear = (type) => {
    if (type === 'minus') {
      datePicker.year--;
    } else {
      datePicker.year++;
    }

    initDate(datePicker.year, datePicker.month);
  }

  /**
   * 切换月份
   */
  const handleCheckMouth = (type) => {
    if (type === 'minus') {
      datePicker.month--;
    } else {
      datePicker.month++;
    }

    initDate(datePicker.year, datePicker.month);
  }

  /**
   * 选择年
   */
  const handleChangeYears = () => {
    mouthVisible = false;
    yearVisible = true;
  }
  const handleCheckedYear = (year) => {
    datePicker.year = year;
    yearVisible = false;
  }

  /**
   * 选择月
   */
  const handleChangeMouths = () => {
    yearVisible = false;
    mouthVisible = true;
  }
  const handleCheckedMouth = (month) => {
    datePicker.month = month;
    mouthVisible = false;
  }

  /**
   * 获取今天
   */
  const getToDay = () => {
    const date = new Date();
    date.setTime(date.getTime())

    toDay = date.getDate();
  }

  /**
   * 确定选择日期
   * @param day
   */
  const handleCheckDate = (day) => {
    const {year, month} = datePicker;

    let valueEnum = {
      'yyyy/MM/dd': `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`,
      'yyyy-MM-dd': `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      'yyyy年MM月dd日': `${year}年${String(month).padStart(2, '0')}月${String(day).padStart(2, '0')}日`
    }

    dispatch('done', valueEnum[format]);
  }

  /**
   * 日期回显
   */
  const setDefaultValue = () => {
    if (!value) {
      getToDay();
      return;
    }

    let dateUTC = new Date(value);

    if (format === 'yyyy年MM月dd日') {
      const replaceDateVal = value.replace(/[\u4e00-\u9fa5]/g, (reg) => reg === '日' ? '' : '-');
      dateUTC = new Date(replaceDateVal);
    }

    datePicker.year = dateUTC.getFullYear();
    datePicker.month = dateUTC.getMonth() + 1;
    toDay = dateUTC.getDate();
  }

</script>
