<script lang="ts">
  import '../app.css'
  import Head from '$lib/components/Head.svelte'
  import Kofi from '$lib/components/Kofi.svelte'
  import Menu from '$lib/components/Menu.svelte'
  import Social from '$lib/components/Social.svelte'
  import ThemeSelector from '$lib/components/ThemeSelector.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { darkTheme, modalViewed, wheelModalViewed } from '$lib/store'
  import WheelOptionsButton from '$lib/components/WheelOptionsButton.svelte'
  import WheelOptionsModal from '$lib/components/WheelOptionsModal.svelte'

  const url = 'https://spinner.bossoq.live'
  const title = 'Spinner using Sveltekit'
  const description = 'Free Spinner using Sveltekit'

  const menuItems = [{ name: 'Made by bossoq', url: 'https://github.com/bossoq/spinner' }]
  const imageUrl = `${url}/screenshot.jpg`
  const gtagId = 'G-78YE5B8PTT'
  const themeIcons = ['🌞 Toggle Light mode', '🌙 Toggle Dark mode']
</script>

<Head {title} {description} {url} {imageUrl} {gtagId} />
<Kofi name="bossoq" label="Buy me Coffee" />
<Social {url} {title} />
<main class={$darkTheme && 'dark'}>
  <ThemeSelector {themeIcons} />
  <WheelOptionsButton />
  <Menu items={menuItems} />
  {#if $modalViewed}
    <Modal />
  {/if}
  {#if $wheelModalViewed}
    <WheelOptionsModal />
  {/if}
  <slot />
</main>
