<script lang="ts">
  import { onMount, onDestroy } from 'svelte'

  let head = ['S', 'P', 'I', 'N', 'N', 'E', 'R']
  let titleInterval = null
  const headClassBase = 'w-12 h-12 sm:w-20 sm:h-20 px-4 py-2 rounded-xl sm:rounded-2xl text-center'
  const headClassMod = headClassBase + ' bg-white dark:bg-black text-teal-800 dark:text-teal-200'
  let headClass = [headClassMod, headClassBase]

  const handleTitleChange = () => {
    titleInterval = setInterval(() => {
      if (head[4] === 'N') {
        head[4] = 'เ'
        head[5] = 'น้'
        head[6] = 'อ'
      } else {
        head[4] = 'N'
        head[5] = 'E'
        head[6] = 'R'
      }
      const tmpClass = headClass.shift()
      headClass = [...headClass, tmpClass]
    }, 1000)
  }
  const stopTitleChange = () => {
    if (titleInterval) clearInterval(titleInterval)
  }

  onMount(() => {
    handleTitleChange()
  })
  onDestroy(() => {
    stopTitleChange()
  })
</script>

<div class="w-full h-screen flex flex-col justify-center items-center bg-white dark:bg-black">
  <h1
    class="text-2xl sm:text-6xl text-white bg-teal-800 dark:text-black dark:bg-teal-200 p-2 sm:p-4 rounded-2xl font-bold select-none flex flex-row gap-1 sm:gap-3 lg:gap-8"
  >
    {#each head as h, i}
      <span class={headClass[i % 2]}>{h}</span>
    {/each}
  </h1>
</div>
