<script lang="ts">
  import { fade } from 'svelte/transition'
  import { wheelModalViewed, entries, lastSelected, names, winnerEntries } from '$lib/store'
  import { clickOutside } from '$lib/clickOutside'
  import { handleWheelModalClass } from '$lib/handleModal'

  let rawEntries = $entries.join('\n')
  let currentMenu = 'entries'
  const baseMenuClass = 'cursor-pointer inline-block p-2 rounded-t-lg '
  const activeMenuClass =
    baseMenuClass + 'active text-white bg-teal-800 dark:bg-teal-200 dark:text-black'
  const inactiveMenuClass =
    baseMenuClass + 'hover:text-white hover:bg-gray-900 dark:hover:bg-gray-50 dark:hover:text-black'

  const handleEntries = () => {
    entries.set(rawEntries.split('\n').filter((e) => e.length > 0))
  }
  const handleMenuChange = (
    e: MouseEvent & {
      currentTarget: EventTarget & HTMLParagraphElement
    }
  ) => {
    currentMenu = e.currentTarget.id
  }
  const handleClearWinner = () => {
    winnerEntries.set([])
  }
  const handleListChange = () => {
    rawEntries = $entries.join('\n')
  }
  const handleAddList = () => {
    const newListName = `Set ${$names.length + 1}`
    names.set([...$names, newListName])
    lastSelected.set(newListName)
  }
</script>

<div
  class="fixed z-50 inset-0 overflow-y-auto"
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
                <p
                  id="entries"
                  aria-current="page"
                  class={currentMenu === 'entries' ? activeMenuClass : inactiveMenuClass}
                  on:click={handleMenuChange}
                >
                  Entries
                </p>
              </li>
              <li class="mr-1">
                <p
                  id="results"
                  aria-current="page"
                  class={currentMenu === 'results' ? activeMenuClass : inactiveMenuClass}
                  on:click={handleMenuChange}
                >
                  Results
                </p>
              </li>
            </ul>
            <hr />
            <div class="mt-2">
              {#if currentMenu === 'entries'}
                <div class="flex flex-row gap-3 justify-center">
                  <select
                    class="flex-grow rounded-2xl text-center"
                    bind:value={$lastSelected}
                    on:change={handleListChange}
                  >
                    {#each $names as datasetName}
                      <option value={datasetName}>{datasetName}</option>
                    {/each}
                  </select>
                  <button
                    class="w-fit bg-emerald-500 hover:bg-emerald-700 text-sm sm:text-base text-white font-medium py-2 px-4 mb-2 rounded-full"
                    on:click={handleAddList}>Add</button
                  >
                  <button
                    class="w-fit bg-blue-500 hover:bg-blue-700 text-sm sm:text-base text-white font-medium py-2 px-4 mb-2 rounded-full"
                    >Edit</button
                  >
                  <button
                    class="w-fit bg-red-500 hover:bg-red-700 text-sm sm:text-base text-white font-medium py-2 px-4 mb-2 rounded-full"
                    >Delete</button
                  >
                </div>
                <textarea
                  cols="30"
                  rows="10"
                  class="w-full border-2 border-gray-200 dark:border-gray-800 dark:bg-black dark:text-white rounded-lg p-2"
                  placeholder="Enter your entries here"
                  bind:value={rawEntries}
                  on:input={handleEntries}
                />
              {/if}
              {#if currentMenu === 'results'}
                <button
                  class="w-fit bg-red-500 hover:bg-red-700 text-sm sm:text-base text-white font-medium py-2 px-4 mb-2 rounded-full"
                  on:click={handleClearWinner}>Clear the list</button
                >
                <textarea
                  cols="30"
                  rows="10"
                  class="w-full border-2 disabled:bg-white disabled:dark:bg-black disabled:dark:text-white border-gray-200 dark:border-gray-800 rounded-lg p-2"
                  placeholder="Winner history shows here"
                  value={$winnerEntries.join('\n')}
                  on:input={handleEntries}
                  disabled
                />
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
