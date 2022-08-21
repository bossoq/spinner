<script lang="ts">
  import { fade } from 'svelte/transition'
  import { entries, winnerEntries } from '$lib/store'
  let timerHandle: NodeJS.Timer | null = null
  let spinStart = 0
  let angleCurrent = 0
  let angleDelta = 0
  $: isStart = false
  $: isFinished = false
  $: maxSpeed = 45 / $entries.length
  $: timerDelay = $entries.length
  $: upTime = $entries.length * 100
  $: downTime = $entries.length * 1000
  $: currentSegment = ''

  const colors = ['bg-red-300', 'bg-sky-300', 'bg-teal-300', 'bg-amber-300']

  $: coordinateX = (Math.sin((2 / $entries.length) * Math.PI) / 2 + 0.5) * 100 // sin(deg) / 2 + 0.5
  $: coordinateY = (0.5 - Math.cos((2 / $entries.length) * Math.PI) / 2) * 100 // 0.5 - cos(deg) / 2
  $: clipPath =
    $entries.length > 3
      ? `polygon(50% 50%, 50% 0%, 100% 0%, ${coordinateX}% ${coordinateY}%, 50% 50%)`
      : $entries.length > 1
      ? `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, ${coordinateX}% ${coordinateY}%, 50% 50%)`
      : `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, ${coordinateX}% ${coordinateY}%, 50% 50%)`
  $: textRotate = 90 - 180 / $entries.length

  const spin = () => {
    if (timerHandle) return
    isStart = true
    isFinished = false
    spinStart = new Date().getTime()
    maxSpeed = 45 / $entries.length
    timerHandle = setInterval(onTimerTick, timerDelay)
  }
  const onTimerTick = () => {
    const duration = new Date().getTime() - spinStart
    let progress = 0
    let finished = false
    if (duration < upTime) {
      progress = duration / upTime
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2)
    } else {
      progress = duration / downTime
      angleDelta = maxSpeed * Math.sin(((progress + 1) * Math.PI) / 2)
      if (progress >= 1) finished = true
    }

    angleCurrent += angleDelta
    while (angleCurrent >= 360) angleCurrent -= 360
    if (finished) {
      isFinished = true
      currentSegment = $entries[Math.floor(((450 - angleCurrent) % 360) / (360 / $entries.length))]
      winnerEntries.set([currentSegment, ...$winnerEntries])
      clearInterval(timerHandle)
      timerHandle = null
      angleDelta = 0
    }
  }
  const handleClose = () => {
    isStart = false
    isFinished = false
    if (timerHandle) {
      clearInterval(timerHandle)
      timerHandle = null
    }
  }
  const handleRemove = () => {
    entries.set($entries.filter((_, index) => index !== $entries.indexOf(currentSegment)))
    handleClose()
  }
</script>

<div class="w-[36rem] aspect-square flex flex-col my-8 pb-10 justify-center items-center">
  <div
    class="w-[8rem] aspect-square bg-white hover:bg-gray-100 rounded-full z-10 absolute cursor-pointer select-none"
    on:click={spin}
  >
    <div class="text-center text-4xl font-bold relative top-1/3">SPIN</div>
  </div>
  <div
    class="w-0 h-0 border-t-[2rem] border-t-transparent border-r-[4rem] border-r-white border-b-[2rem] border-b-transparent z-10 ml-auto self-end absolute translate-x-8"
  />
  <div class="{!isStart && 'animate-spin-slow'} w-[36rem] aspect-square absolute overflow-hidden">
    {#each $entries as segment, idx}
      <div
        class="w-[36rem] aspect-square {colors[idx % 4]} rounded-full absolute"
        style="clip-path: {clipPath}; transform: rotate({(360 / $entries.length) * idx +
          angleCurrent}deg)"
      >
        <span
          class="w-[36rem] pr-6 aspect-square text-white text-4xl absolute overflow-hidden"
          style="transform: rotate(-{textRotate}deg);"
        >
          <span class="w-full h-full flex justify-end items-center select-none">{segment}</span>
        </span>
      </div>
    {/each}
  </div>
  {#if isFinished}
    <div class="w-1/3 min-w-fit p-4 z-20 bg-slate-800 absolute rounded-2xl" transition:fade>
      <p class="text-4xl text-white font-bold py-4 text-center">
        The winner is {currentSegment}
      </p>
      <p class="flex flex-row gap-4 justify-center py-4">
        <button
          class="w-fit p-4 mt-4 bg-cyan-500 hover:bg-cyan-700 text-xl text-white font-bold py-2 px-4 rounded-full"
          on:click={handleClose}>Close</button
        >
        <button
          class="w-fit p-4 mt-4 bg-red-500 hover:bg-red-700 text-xl text-white font-bold py-2 px-4 rounded-full"
          on:click={handleRemove}>Remove</button
        >
      </p>
    </div>
  {/if}
</div>
