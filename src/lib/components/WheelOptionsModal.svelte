<script lang="ts">
  import { fade } from 'svelte/transition'
  import { wheelModalViewed, entries } from '$lib/store'
  import { clickOutside } from '$lib/clickOutside'
  import { handleWheelModalClass } from '$lib/handleModal'

  let rawEntries = $entries.join('\n')
  const baseMenuClass = 'cursor-pointer inline-block p-2 rounded-t-lg '
  const activeMenuClass =
    baseMenuClass + 'active text-white bg-teal-800 dark:bg-teal-200 dark:text-black'
  const inactiveMenuClass =
    baseMenuClass + 'hover:text-white hover:bg-gray-900 dark:hover:bg-gray-50 dark:hover:text-black'

  const handleEntries = () => {
    entries.set(rawEntries.split('\n').filter((e) => e.length > 0))
  }
</script>

<div
  class="fixed z-20 inset-0 overflow-y-auto"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
  transition:fade
>
  <div
    class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
  >
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true">
      <span class="hidden sm:inline-block sm:align-middle h-1/2 sm:h-screen" aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        use:clickOutside
        on:click_outside={(e) => handleWheelModalClass(e, $wheelModalViewed, true)}
      >
        <p
          class="absolute my-2 mx-3 sm:my-3 sm:mx-4 right-0 top-0 cursor-pointer text-black dark:text-white"
          on:click={(e) => handleWheelModalClass(e, $wheelModalViewed)}
        >
          x
        </p>
        <div class="bg-white px-4 pt-2 pb-4 sm:pt-5 sm:p-6 sm:pb-4 dark:bg-slate-800">
          <div class="mt-3 sm:mt-0 sm:mx-4">
            <ul
              class="flex flex-wrap text-base font-medium text-center text-gray-900 dark:text-white"
            >
              <li class="mr-1">
                <p aria-current="page" class={activeMenuClass}>Entries</p>
              </li>
              <li class="mr-1">
                <p aria-current="page" class={inactiveMenuClass}>Results</p>
              </li>
            </ul>
            <hr />
            <div class="mt-2">
              <textarea
                cols="30"
                rows="10"
                class="w-full"
                placeholder="Enter your entries here"
                bind:value={rawEntries}
                on:input={handleEntries}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
