<script lang="ts">
	import { onMount } from 'svelte';
    import { RandomPerson, RandomRank, RandomRareType, RandomSSRType, Rank, Person } from '../../uitls/RandomCard';
    import { storage } from '../../firebase/firebase';
    import { getDownloadURL, ref, getBlob } from "firebase/storage";
    let videoURL = "";
    let videoElem: HTMLVideoElement;
    let videoEnd = false;

	onMount(async () => {
        const rank = RandomRank();

        if (rank == Rank.Common) {
            const person = RandomPerson();
            if (person == Person.Peem) {
                videoURL = await getDownloadURL(ref(storage, 'common Peem.mp4'));
            }
            else if (person == Person.Kittiphotot) {
                videoURL = await getDownloadURL(ref(storage, 'common Kittiphot.mp4'));
            }
        }
        else if (rank == Rank.Rare) {
            const person = RandomPerson();
            const type = RandomRareType();
            if (person == Person.Peem) {
                if (type == 1) {
                    videoURL = await getDownloadURL(ref(storage, 'Rare Peem 1.mp4'));

                }
                else if (type == 2) {
                    videoURL = await getDownloadURL(ref(storage, 'Rare Peem 2.mp4'));

                }
            }
            else if (person == Person.Kittiphotot) {
                if (type == 1) {
                    videoURL = await getDownloadURL(ref(storage, 'Rare Kittiphot 1.mp4'));
                }
                else if (type == 2) {
                    videoURL = await getDownloadURL(ref(storage, 'Rare Kittiphot 2.mp4'));
                }
            }
        }   
        else if (rank == Rank.SSR) {
            const type = RandomSSRType();
            if (type == 1) {
                videoURL = await getDownloadURL(ref(storage, 'SR 1.mp4'));
            }
            else if (type == 2) {
                videoURL = await getDownloadURL(ref(storage, 'SR 2.mp4'));
            }
            else if (type == 3) {
                videoURL = await getDownloadURL(ref(storage, 'SR 3.mp4'));
            }
            else if (type == 4) {
                videoURL = await getDownloadURL(ref(storage, 'SR 4.mp4'));
            }
        }

        setTimeout(() => {
            pauseVideo()
        }, 1900)

        videoElem.onended = () => {
            videoEnd = true;
        }
	});

    function playVideo() {
        videoElem.play();
    }

    function pauseVideo() {
        videoElem.pause();
    }
</script>

<div class="w-full h-screen flex justify-center items-center bg-[#F8A1FF]">
    <button class="block h-full relative" on:click={() => !videoEnd && playVideo()}>
        <video class="w-full h-full" src={videoURL} muted autoplay bind:this={videoElem} />
        {#if videoEnd}
            <button class="absolute bottom-0 left-0 mb-28 w-full p-2 rounded-md bg-white text-pink-500">
                Save กาชา
            </button>
        {/if}   
    </button>                 
</div>