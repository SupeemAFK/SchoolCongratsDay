<script>
    import Dashboard from "../components/Dashboard.svelte";
    import { goto } from '$app/navigation';
    import { name } from "../state/name";
    import { db } from '../firebase/firebase';
    import { getDocs, query, collection, where } from 'firebase/firestore';
    let showErr = false;

    async function GoToRandomPage() {
        const q = query(collection(db, "Gachas"), where("name", "==", $name));
        const snapshot = await getDocs(q)
        if (snapshot.docs.length > 0) {
            showErr = true;
            return
        }        
        goto('/random')
    }
</script>

<div class="w-full h-screen flex flex-col justify-center items-center">
    <div>
        <Dashboard/>
    </div>
    <div class="w-96 p-3 mt-3 rounded-md border-[0.1rem] border-[#e6e6e6] flex flex-col">
        <input bind:value={$name} class="py-2 px-3 outline-none border-2 border-slate-400 focus:border-pink-400 rounded-md transition-all" placeholder="มึงใคร?" />
        {#if showErr}
            <p class="text-red-500">ชื่อนี้มีคนใช้ไปแล้ว โปรดใส่ชื่อใหม่ ถ้านึกไม่ออกให้ใส่ชื่อพ่อมึง</p>
        {/if}
        <button on:click={() => GoToRandomPage()} class="w-full mt-5 border-2 border-pink-400 text-pink-400 rounded-md hover:bg-pink-400 hover:text-white transition-all duration-500 p-3 font-bold">สุ่มกาชา no เกลือ 100%</button>
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