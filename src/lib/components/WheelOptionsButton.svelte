<script lang="ts">
  import { wheelModalViewed } from '$lib/store'
  import { handleWheelModalClass } from '$lib/handleModal'
</script>

<div class="text-xs sm:text-base fixed top-0 right-0 p-2 z-10 text-white dark:text-black">
  <p
    class="cursor-pointer select-none p-2 bg-sky-800 dark:bg-sky-200 rounded"
    on:click={(e) => handleWheelModalClass(e, $wheelModalViewed)}
  >
    ⚙️ Options
  </p>
</div>
