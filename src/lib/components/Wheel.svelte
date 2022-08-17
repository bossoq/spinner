<script lang="ts">
  export let onFinished: (winner: string) => void
  let timerHandle: NodeJS.Timer | null = null
  let spinStart = 0
  let angleCurrent = 0
  let angleDelta = 0
  $: isFinished = false
  $: maxSpeed = 45 / segments.length
  $: timerDelay = segments.length
  $: upTime = segments.length * 100
  $: downTime = segments.length * 1000
  $: currentSegment = ''

  $: segments = ['David', 'John', 'Paul', 'George', 'Ringo', 'Mick']

  const colors = ['bg-red-300', 'bg-sky-300', 'bg-teal-300', 'bg-amber-300']

  $: coordinateX = (Math.sin((2 / segments.length) * Math.PI) / 2 + 0.5) * 100 // sin(deg) / 2 + 0.5
  $: coordinateY = (0.5 - Math.cos((2 / segments.length) * Math.PI) / 2) * 100 // 0.5 - cos(deg) / 2
  $: clipPath =
    segments.length > 3
      ? `polygon(50% 50%, 50% 0%, 100% 0%, ${coordinateX}% ${coordinateY}%, 50% 50%)`
      : segments.length > 1
      ? `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, ${coordinateX}% ${coordinateY}%, 50% 50%)`
      : `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, ${coordinateX}% ${coordinateY}%, 50% 50%)`
  $: textRotate = 90 - 180 / segments.length

  const spin = () => {
    if (timerHandle) return
    isFinished = false
    spinStart = new Date().getTime()
    maxSpeed = 45 / segments.length
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
      currentSegment = segments[Math.floor(((450 - angleCurrent) % 360) / (360 / segments.length))]
      onFinished(currentSegment)
      clearInterval(timerHandle)
      timerHandle = null
      angleDelta = 0
    }
  }
</script>

<div class="w-[36rem] aspect-square flex flex-col my-8 justify-center items-center">
  <div
    class="w-[8rem] aspect-square bg-white rounded-full z-10 absolute cursor-pointer"
    on:click={spin}
  >
    <div class="text-center text-4xl font-bold relative top-1/3">SPIN</div>
  </div>
  <div
    class="w-0 h-0 border-t-[2rem] border-t-transparent border-r-[4rem] border-r-slate-300 border-b-[2rem] border-b-transparent z-10 ml-auto self-end absolute translate-x-8"
  />
  <div class="w-[36rem] aspect-square absolute">
    {#each segments as segment, idx}
      <div
        class="w-[36rem] aspect-square {colors[idx % 4]} rounded-full absolute"
        style="clip-path: {clipPath}; transform: rotate({(360 / segments.length) * idx +
          angleCurrent}deg)"
      >
        <span
          class="w-[36rem] pr-6 aspect-square text-white text-4xl absolute overflow-hidden"
          style="transform: rotate(-{textRotate}deg);"
        >
          <span class="w-full h-full flex justify-end items-center">{segment}</span>
        </span>
      </div>
    {/each}
  </div>
</div>
<div class="text-6xl text-white font-medium p-4">
  The winner is {isFinished ? currentSegment : '...'}
</div>
