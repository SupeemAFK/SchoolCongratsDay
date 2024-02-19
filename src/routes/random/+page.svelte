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

            videoElem.onended = () => {
                videoEnd = true;
            }

            const blob = await getBlob(ref(storage, videoURL));
            videoBlob = blob;

            await addDoc(collection(db, "Gachas"), {
                name: $name,
                gacha: rank
            });
        }
    });

    $: if (videoURL != "") {
        setTimeout(() => {
            pauseVideo()
            tapHere = true;
        }, 1800)
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
    <button class="block h-full relative" 
        on:click={() => {
            !videoEnd && playVideo();
            tapHere = false;
        }}
    >
        <video class="w-full h-full" src={videoURL} muted autoplay bind:this={videoElem} />
        {#if videoEnd}
            <button on:click={() => saveBlob(videoBlob, "GachaCongratsGift")} class="absolute bottom-0 left-0 mb-28 w-full p-2 rounded-md font-semibold text-3xl bg-white text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-200">
                แตะเพื่อ Save กาชา 🎉🎉🎉
            </button>
        {/if}  
        {#if tapHere}
            <p class="absolute bottom-0 left-0 mb-40 w-full text-white font-semibold text-3xl">แตะเพื่อเปิด</p>
        {/if}   
    </button>                 
</div>