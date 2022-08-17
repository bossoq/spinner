<script lang="ts">
  const segments = [...Array(6).keys()]
  const colors = ['bg-red-300', 'bg-sky-300', 'bg-teal-300', 'bg-amber-300']
  $: coordinateX = (Math.sin((2 / segments.length) * Math.PI) / 2 + 0.5) * 100 // sin(deg) / 2 + 0.5
  $: coordinateY = (0.5 - Math.cos((2 / segments.length) * Math.PI) / 2) * 100 // 0.5 - cos(deg) / 2
  $: clipPath =
    segments.length > 3
      ? `polygon(50% 50%, 50% 0%, 100% 0%, ${coordinateX}% ${coordinateY}%, 50% 50%)`
      : `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, ${coordinateX}% ${coordinateY}%, 50% 50%)`
  $: transX = ((Math.sin((1 / segments.length) * Math.PI) / 2) * 0.9 + 0.5) * 100 - 2 // scale text to 90% of the wheel - offset 2%
  $: transY = (0.5 - (Math.cos((1 / segments.length) * Math.PI) / 2) * 0.9) * 100 // scale text to 90% of the wheel
  $: textRotate = 90 - 180 / segments.length
</script>

<div class="w-[36rem] aspect-square flex flex-row my-8 justify-center">
  {#each segments as segment, idx}
    <div
      class="w-[36rem] aspect-square {colors[idx % 4]} rounded-full absolute"
      style="clip-path: {clipPath}; transform: rotate({(360 / segments.length) * idx}deg)"
    >
      <span
        class="text-white text-4xl absolute"
        style="transform: rotate(-{textRotate}deg); left: {transX}%; top: {transY}%;"
      >
        <span class="w-full h-full flex justify-end items-center">{segment}</span>
      </span>
    </div>
  {/each}
</div>
