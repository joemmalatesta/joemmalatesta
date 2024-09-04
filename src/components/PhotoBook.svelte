<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	let ready = false;
	let innerWidth: number;
	let smallScreen: boolean = false;
	let hover: boolean = false;
	
	onMount(async () => {
		ready = true;
		if (innerWidth < 640) {
			smallScreen = true;
		}
		await sleep(600);
		hover = smallScreen;
	});

	const locations: {
		index: number;
		location: string;
		img: string;
	}[] = [
		{
			index: 0,
			location: 'San Francisco, CA',
			img: '/me.webp'
		},
        {
			index: 1,
			location: 'Hawaii, HI',
			img: '/hawaii.webp'
		},
		{
			index: 2,
			location: 'Rochester Hills, MI',
			img: '/gh me.webp'
		},
		
		{
			index: 3,
			location: 'Sedona, AZ',
			img: '/arizona.webp'
		}
	];

    export let activePicture = 0;
	$: activePicture = locations[0].index;
	let switchAnimation: boolean = false;
    async function switchPicture(index: number) {
        activePicture = index;
        switchAnimation = true;
        await sleep(200);
        let temp = locations[0];
        locations[0] = locations[index];
        locations[index] = temp;
        await sleep(100);
        switchAnimation = false;
    }

	async function sleep(ms: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, ms));
	}


</script>



<svelte:window bind:innerWidth />



<div class="relative w-44 h-60 lg:w-72 lg:h-96">
	<!-- Main picture. stays centered -->
	<button
		class="cursor-default absolute inset-0 rounded-lg z-50 drop-shadow-lg"
		on:mouseenter={() => (hover = true)}
		on:mouseleave={() => (hover = false)}
	>
		<img src={locations[0].img} class="rounded-lg drop-shadow-lg absolute inset-0 w-full h-full object-cover" alt={locations[0].location} />
	</button>
	<!-- Pictures 1 moves out to the right -->
	<button
    class="absolute inset-0 rounded-lg {switchAnimation
    ? 'rotate-0 translate-x-0 translate-y-0'
    : hover
        ? `rotate-[40deg] ${smallScreen ? 'translate-x-24' : 'translate-x-32'} translate-y-5 hover:rotate-[42deg] scale-95  hover:scale-100`
        : ' rotate-[24deg] translate-x-16 -translate-y-3 '}  -z-10 transition-all duration-300 group"
		on:click={() => switchPicture(1)}
		on:mouseenter={() => (hover = true)}
		on:mouseleave={() => (hover = false)}
	>
		<img src={locations[1].img} class="rounded-lg absolute inset-0 w-full h-full object-cover" alt={locations[1].location} />
        <div class="absolute inset-0 bg-dark/30 group-hover:opacity-20" />

	</button>
	<!-- Picture 2 moves up -->
	<button
    class="absolute inset-0 rounded-lg {switchAnimation
    ? 'rotate-0 translate-x-0 translate-y-0'
    : hover
        ? `rotate-6 hover:rotate-[10deg] scale-95  hover:scale-100 ${smallScreen ? '-translate-y-24' : '-translate-y-32'}`
        : ' -translate-y-10 rotate-3'}  -z-10 transition-all duration-300 group"
		on:click={() => switchPicture(2)}
		on:mouseenter={() => (hover = true)}
		on:mouseleave={() => (hover = false)}
	>
		<img src={locations[2].img} class="rounded-lg absolute inset-0 w-full h-full object-cover" alt={locations[2].location} />
        <div class="absolute inset-0 bg-dark/20 group-hover:opacity-0" />

	</button>
	<!-- Picture 3 moves out to the left -->
	<button
		class="absolute inset-0 rounded-lg group {switchAnimation
			? 'rotate-0 translate-x-0 translate-y-0'
			: hover
				? `-rotate-[40deg] ${smallScreen ? '-translate-x-24' : '-translate-x-32'} -translate-y-5 hover:-rotate-[42deg] scale-95  hover:scale-100`
				: ' -rotate-[24deg] -translate-x-12 -translate-y-7 '}  -z-10 transition-all duration-300"
		on:click={() => switchPicture(3)}
		on:mouseenter={() => (hover = true)}
		on:mouseleave={() => (hover = false)}
	>
		<img src={locations[3].img} class="rounded-lg absolute inset-0 w-full h-full object-cover" alt={locations[3].location} />
        <div class="absolute inset-0 bg-dark/20 group-hover:opacity-0" />
	</button>
    <p class="sm:text-base text-sm w-full text-center opacity-75 absolute -bottom-10 left-1/2 transform -translate-x-1/2"><img src="icons/map-pin.svg" alt="location" class="w-4 h-4 inline-block"> {locations[0].location}</p>
</div>

<!-- 
<div class="relative w-2/5 group" on:mouseenter={() => hover = true} on:mouseleave={() => hover = false}>
    {#each locations as location, index}
        <button
            on:click={() => activePicture = index}
            on:mouseenter={() => hover = true}
            on:mouseleave={() => hover = false}
            class="absolute w-full h-full {index === 3 ? 'outline -top-2 -left-2' : ''}"
        >
            <img
                src={location.img}
                alt={locations[]}
                class="rounded-lg w-full h-auto transition-all duration-300
                    {index === 0 ? 'z-50' : index === 1 ? 'absolute group-hover:-translate-y-10 hover:-rotate-3 -top-5 left-0 -z-10' :
                    index === 2 ? 'absolute group-hover:translate-x-10 group-hover:-translate-y-10 rotate-6 group-hover:rotate-12 -top-4 -right-7 -z-20' :
                    `absolute ${hover ? '-rotate-[32deg] -translate-x-28 -translate-y-10' : '-rotate-6'} -z-10`}"
            >
        </button>
    {/each}
    <div class="flex items-center justify-center gap-2 opacity-60 w-full">
        <img src="icons/map-pin.svg" class="w-4 h-4" alt="location">
        <p class="text-sm">{locations[activePicture].location}</p>
    </div>
</div>
 -->
