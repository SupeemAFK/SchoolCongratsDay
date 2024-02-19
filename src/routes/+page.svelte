<script>
  import Dashboard from "../components/Dashboard.svelte";
  import { name } from "../state/name";
</script>

<div class="w-full h-screen flex flex-col justify-center items-center">
    <div>
        <Dashboard/>
    </div>
    <div class="w-96 p-3 mt-3 rounded-md border-[0.1rem] border-[#e6e6e6] flex flex-col">
        <input bind:value={$name} class="py-2 px-3 outline-none border-2 border-slate-400 focus:border-pink-400 rounded-md transition-all" placeholder="มึงใคร?" />
        <a href='/random'>
            <button class="w-full mt-5 border-2 border-pink-400 text-pink-400 rounded-md hover:bg-pink-400 hover:text-white transition-all duration-500 p-3 font-bold">สุ่มกาชา no เกลือ 100%</button>
        </a>
        <div class="mt-3 flex justify-center">
            <div class="flex text-xl font-semibold">
                <div>
                    <p class="text-slate-500">Common </p>
                    <p class="text-yellow-500">Rare</p>
                    <p class="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">SSR</p>
                </div>
                <div class="ml-3">
                    <p class="text-slate-500">89%</p>
                    <p class="text-yellow-500">10%</p>
                    <p class="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">1%</p>
                </div>
            </div>
        </div>
    </div>
</div>