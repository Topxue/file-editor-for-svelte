<script>
  import {createEventDispatcher} from 'svelte';
  import {getMonthLength, getCalendarDays} from './date-utils';
  import {getInnerLocale} from './locale';

  /** Date value */
  export let value = new Date();

  // on selected
  const dispatch = createEventDispatcher();

  function handleSelectDate(date) {
    dispatch('select', date)
    dispatch('hidden', false)
  }


  function setValue(d) {
    if (d.getTime() !== value.getTime())
      value = d;
  }

  function updateValue(updater) {
    let d = updater(new Date(value.getTime()));
    setValue(d);
  }

  /** The earliest year the user can select */
  export let min = new Date(new Date().getFullYear() - 20, 0, 1);
  /** The latest year the user can select */
  export let max = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999);
  let years = getYears(min, max);
  $: years = getYears(min, max);

  function getYears(min, max) {
    let years = [];
    for (let i = min.getFullYear(); i <= max.getFullYear(); i++) {
      years.push(i);
    }
    return years;
  }

  $: if (value > max) {
    setValue(max);
  } else if (value < min) {
    setValue(min);
  }
  /** Locale object for internationalization */
  export let locale = {};
  $: iLocale = getInnerLocale(locale);
  let year = value.getFullYear();
  const getYear = (value) => (year = value.getFullYear());

  function setYear(year) {
    updateValue((value) => {
      value.setFullYear(year);
      return value;
    });
  }

  $: getYear(value);
  $: setYear(year);
  let month = value.getMonth();
  const getMonth = (value) => (month = value.getMonth());

  function setMonth(month) {
    let newYear = year;
    let newMonth = month;
    if (month === 12) {
      newMonth = 0;
      newYear++;
    } else if (month === -1) {
      newMonth = 11;
      newYear--;
    }
    const maxDate = getMonthLength(newYear, newMonth);
    const newDate = Math.min(value.getDate(), maxDate);
    setValue(new Date(newYear, newMonth, newDate, value.getHours(), value.getMinutes(), value.getSeconds(), value.getMilliseconds()));
  }

  $: getMonth(value);
  $: setMonth(month);
  let dayOfMonth = value.getDate();
  $: dayOfMonth = value.getDate();
  $: calendarDays = getCalendarDays(value, iLocale.weekStartsOn);

  function setDay(calendarDay) {
    handleSelectDate(calendarDay);
    if (dayIsInRange(calendarDay)) {
      updateValue((value) => {
        value.setFullYear(0);
        value.setMonth(0);
        value.setDate(1);
        value.setFullYear(calendarDay.year);
        value.setMonth(calendarDay.month);
        value.setDate(calendarDay.number);
        return value;
      });
    }
  }

  function dayIsInRange(calendarDay) {
    const date = new Date(calendarDay.year, calendarDay.month, calendarDay.number);
    const minDate = new Date(min.getFullYear(), min.getMonth(), min.getDate());
    const maxDate = new Date(max.getFullYear(), max.getMonth(), max.getDate());
    return date >= minDate && date <= maxDate;
  }

  function yearKeydown(e) {
    if (e.key === 'ArrowUp') {
      setYear(year - 1);
    } else if (e.key === 'ArrowDown') {
      setYear(year + 1);
    } else if (e.key === 'ArrowLeft') {
      setMonth(month - 1);
    } else if (e.key === 'ArrowRight') {
      setMonth(month + 1);
    } else {
      return;
    }
    e.preventDefault();
  }

  function monthKeydown(e) {
    if (e.key === 'ArrowUp') {
      setMonth(month - 1);
    } else if (e.key === 'ArrowDown') {
      setMonth(month + 1);
    } else if (e.key === 'ArrowLeft') {
      setMonth(month - 1);
    } else if (e.key === 'ArrowRight') {
      setMonth(month + 1);
    } else {
      return;
    }
    e.preventDefault();
  }

  function keydown(e) {
    if (e.key === 'ArrowUp') {
      updateValue((value) => {
        value.setDate(value.getDate() - 7);
        return value;
      });
    } else if (e.key === 'ArrowDown') {
      updateValue((value) => {
        value.setDate(value.getDate() + 7);
        return value;
      });
    } else if (e.key === 'ArrowLeft') {
      updateValue((value) => {
        value.setDate(value.getDate() - 1);
        return value;
      });
    } else if (e.key === 'ArrowRight') {
      updateValue((value) => {
        value.setDate(value.getDate() + 1);
        return value;
      });
    } else {
      return;
    }
    e.preventDefault();
  }
</script>

<div class="date-time-picker" on:focusout tabindex="-1" on:keydown|self={keydown}>
  <div class="top">
    <div class="page-button previous" tabindex="-1" on:click={() => setMonth(month - 1)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      >
        <path
          d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"
          transform="rotate(180, 12, 12)"
        />
      </svg
      >
    </div>
    <div class="dropdown month">
      <select bind:value={month} on:keydown={monthKeydown}>
        {#each iLocale.months as monthName, i}
          <option
            disabled={new Date(year, i, getMonthLength(year, i), 23, 59, 59, 999) < min ||
              new Date(year, i) > max}
            value={i}>{monthName}</option
          >
        {/each}
      </select>
      <!--
        Here we have use `select.dummy-select` for showing just the <select> button. This
        is to style the <select> button without affecting the menu popup
        - `option { color: initial }` causes invisible menu in dark mode on Firefox
        - `option { color: initial; background-color: initial }` causes invisible menu in Chrome
        - `select { background-color: $bg; color: $text }` causes white scrollbar in dark mode on Firefox
      -->
      <select class="dummy-select" tabindex="-1">
        {#each iLocale.months as monthName, i}
          <option value={i} selected={i === month}>{monthName}</option>
        {/each}
      </select>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      >
        <path d="M6 0l12 12-12 12z" transform="rotate(90, 12, 12)"/>
      </svg
      >
    </div>
    <div class="dropdown year">
      <select bind:value={year} on:keydown={yearKeydown}>
        {#each years as v}
          <option value={v}>{v}</option>
        {/each}
      </select>
      <!-- style <select> button without affecting menu popup -->
      <select class="dummy-select" tabindex="-1">
        {#each years as v}
          <option value={v} selected={v === year}>{v}</option>
        {/each}
      </select>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      >
        <path d="M6 0l12 12-12 12z" transform="rotate(90, 12, 12)"/>
      </svg
      >
    </div>
    <div class="page-button" tabindex="-1" on:click={() => setMonth(month + 1)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      >
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/>
      </svg
      >
    </div>
  </div>
  <div class="header">
    {#each Array(7) as _, i}
      {#if i + iLocale.weekStartsOn < 7}
        <div class="header-cell">{iLocale.weekdays[iLocale.weekStartsOn + i]}</div>
      {:else}
        <div class="header-cell">{iLocale.weekdays[iLocale.weekStartsOn + i - 7]}</div>
      {/if}
    {/each}
  </div>
  {#each Array(6) as _, weekIndex}
    <div class="week">
      {#each calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7) as calendarDay}
        <div
          class="cell"
          on:click={() => setDay(calendarDay)}
          class:disabled={!dayIsInRange(calendarDay)}
          class:selected={calendarDay.month === month && calendarDay.number === dayOfMonth}
          class:other-month={calendarDay.month !== month}
        >
          <span>{calendarDay.number}</span>
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>.date-time-picker {
    display: inline-block;
    outline: none;
    color: var(--date-picker-foreground, #000000);
    background: var(--date-picker-background, #ffffff);
    user-select: none;
    -webkit-user-select: none;
    padding: 8px;
    cursor: default;
    font-size: 12px;
    border: 1px solid rgba(103, 113, 137, 0.3);
    border-radius: 3px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08), 0px 2px 6px rgba(0, 0, 0, 0.11);
}

.top {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 8px;
}

.dropdown, .previous {
    margin-right: 8px;
}

.dropdown {
    position: relative;
    display: flex;
}

.dropdown svg {
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    width: 8px;
    padding: 0px 8px;
    pointer-events: none;
}

.month {
    flex-grow: 1;
}

.year {
    flex-grow: 1;
}

svg {
    display: block;
    fill: var(--date-picker-foreground, #000000);
    opacity: 0.75;
    outline: none;
}

.page-button {
    padding: 5px;
    flex-shrink: 0;
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid transparent;
}

.page-button:hover {
    background-color: rgba(128, 128, 128, 0.08);
    border: 1px solid rgba(128, 128, 128, 0.08);
}

.page-button svg {
    width: 10px;
    height: 10px;
}

select.dummy-select {
    position: absolute;
    pointer-events: none;
    outline: none;
    color: var(--date-picker-foreground, #000000);
    background-color: var(--date-picker-background, #ffffff);
    border-radius: 3px;
}

select:focus + select.dummy-select {
    border-color: var(--date-picker-highlight-border, #0269f7);
    box-shadow: 0px 0px 0px 2px var(--date-picker-highlight-shadow, rgba(2, 105, 247, 0.4));
}

select:not(.dummy-select) {
    border-radius: 100px;
}

select {
    font-size: inherit;
    font-family: inherit;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    flex-grow: 1;
    padding: 2px 5px;
    height: 22px;
    padding-right: 22px;
    margin: 0px;
    border: 1px solid rgba(108, 120, 147, 0.3);
    outline: none;
    transition: all 80ms cubic-bezier(0.4, 0, 0.2, 1);
}

.header {
    display: flex;
    font-weight: 600;
    padding-bottom: 2px;
}

.header-cell {
    width: 30px;
    text-align: center;
    flex-grow: 1;
}

.week {
    display: flex;
}

.cell {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    flex-grow: 1;
    border-radius: 5px;
    box-sizing: border-box;
    border: 2px solid transparent;
}

.cell:hover {
    border: 1px solid rgba(128, 128, 128, 0.08);
    background-color: rgba(128, 128, 128, 0.08);
}

.cell.disabled:hover {
    border: none;
    background-color: transparent;
}

.cell.other-month span {
    opacity: 0.4;
}

.cell.selected {
    color: var(--date-picker-selected-color, inherit);
    background: var(--date-picker-selected-background, rgba(2, 105, 247, 0.2));
    border: 2px solid var(--date-picker-highlight-border, #0269f7);
}
</style>
