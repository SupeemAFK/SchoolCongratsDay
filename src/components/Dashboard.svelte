<script lang="ts">
    import type { DashBoardPerson } from "../interfaces/dashBoardPerson";
    import { Rank } from "../uitls/RandomCard";

    let dashBoardPeople: DashBoardPerson[] = [{ id: "1", name: "John", gacha: Rank.SSR }, { id: "2", name: "GAy", gacha: Rank.Common }]
</script>

<div class="border-[0.1rem] border-[#e6e6e6] p-3 rounded-md">
    <h1 class="text-center text-2xl font-semibold">บอร์ดประจานพวกเกลือ 🧂🧂🧂</h1>
    <div class="mt-2 py-2 px-10">
        {#each dashBoardPeople as dashBoardPerson}
        <div class="flex justify-center">
            <p>{dashBoardPerson.name}</p>
            {#if  dashBoardPerson.gacha == Rank.Common}
                <p class="ml-auto text-slate-500">Common</p>
            {:else if dashBoardPerson.gacha == Rank.Rare}
                <p class="ml-auto text-yellow-500">Rare</p>
            {:else if dashBoardPerson.gacha == Rank.SSR}
                <p class="ml-auto bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">SSR</p>
            {/if}
        </div>
        {/each}
    </div>
</div>