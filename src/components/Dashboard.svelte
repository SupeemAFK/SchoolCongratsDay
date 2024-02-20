<script lang="ts">
    import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
    import type { DashBoardPerson } from "../interfaces/dashBoardPerson";
    import { Rank } from "../uitls/RandomCard";
    import { db } from "../firebase/firebase";
    import { onMount } from "svelte";

    let dashBoardPeople: DashBoardPerson[] = []
    onMount(() => {
        const q = query(collection(db, "Gachas"), orderBy('created', "desc"))
        onSnapshot(q, (collection) => {
            const data: DashBoardPerson[] = collection.docs.map(doc => ({ id: doc.id, name: doc.data().name, gacha: doc.data().gacha }));
            const SSRPeople = data.filter(data => data.gacha == Rank.SSR);
            const RarePeople = data.filter(data => data.gacha == Rank.Rare);
            const CommonPeople = data.filter(data => data.gacha == Rank.Common);
            dashBoardPeople = [...SSRPeople, ...RarePeople, ...CommonPeople];
        })
    })
</script>

<div class="border-[0.1rem] border-[#e6e6e6] p-3 rounded-md">
    <h1 class="text-center text-2xl font-semibold">บอร์ดประจานพวกเกลือ 🧂🧂🧂</h1>
    <div class="mt-2 h-96 overflow-y-auto py-2 px-10 overflow">
        {#each dashBoardPeople as dashBoardPerson}
        <div class="flex justify-center">
            <p>{dashBoardPerson.name}</p>
            {#if  dashBoardPerson.gacha == Rank.Common}
                <p class="ml-auto text-slate-500">Common</p>
            {:else if dashBoardPerson.gacha == Rank.Rare}
                <p class="ml-auto text-yellow-500">Rare</p>
            {:else if dashBoardPerson.gacha == Rank.SSR}
                <p class="ml-auto bg-gradient-to-r from-blue-600 via-pink-500 to-indigo-400 inline-block text-transparent bg-clip-text">SSR</p>
            {/if}
        </div>
        {/each}
    </div>
</div>