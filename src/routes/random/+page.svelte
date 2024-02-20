<script lang="ts">
    import { name } from '../../state/name';
	import { onMount } from 'svelte';
    import { RandomPerson, RandomRank, RandomRareType, RandomSSRType, Rank, Person } from '../../uitls/RandomCard';
    import { storage, db } from '../../firebase/firebase';
    import { addDoc, collection } from 'firebase/firestore';
    import { getDownloadURL, ref, getBlob } from "firebase/storage";
    let videoURL = "";
    let videoBlob = new Blob();
    let videoElem: HTMLVideoElement;
    let videoEnd = false;
    let tapHere = false;

	onMount(async () => {
        if ($name == "") {
            window.location.href = '/'      
        }
        else {
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
            await addDoc(collection(db, "Gachas"), {
                name: $name,
                gacha: rank,
                created: new Date() 
            });

            const blob = await getBlob(ref(storage, videoURL));
            videoBlob = blob;
        }
    });

    $: if (videoURL != "") {
        setTimeout(() => {
            pauseVideo()
            tapHere = true;
        }, 1900)
    }

    $: if (videoElem) {
        videoElem.onended = () => {
            videoEnd = true;
        }
    }

    function playVideo() {
        videoElem.play();
    }

    function pauseVideo() {
        videoElem.pause();
    }

    function saveBlob(blob: Blob, fileName: string) {
        const a = document.createElement("a");
        document.body.appendChild(a);

        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
</script>

<div class="w-full h-screen flex justify-center items-center bg-[#F8A1FF]">
    {#if videoURL != ""}
        <button class="block h-full relative" 
            on:click={() => {
                !videoEnd && playVideo();
                tapHere = false;
            }}
        >
            <video class="w-full h-full" src={videoURL} muted autoplay playsinline bind:this={videoElem} />
            {#if videoEnd}
                <button on:click={() => saveBlob(videoBlob, "GachaCongratsGift")} class="absolute bottom-0 left-0 mb-28 w-full p-2 rounded-md font-semibold text-3xl bg-white text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-200">
                    แตะเพื่อ Save กาชา 🎉🎉🎉
                </button>
            {/if}  
            {#if tapHere}
                <p class="absolute bottom-0 left-0 mb-40 w-full text-white font-semibold text-3xl">แตะเพื่อเปิด</p>
            {/if}   
        </button>
    {:else}
        <div role="status">
            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    {/if}         
</div>