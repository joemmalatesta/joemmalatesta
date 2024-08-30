<script lang="ts">
    type TimelineItem = {
        date: string;
        title: string;
        content: string;
    };

    export let items: TimelineItem[] = [
        {
            title: "GrizzHacks",
            date: "Feb 2024",
            content: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
        },
        {
            title: "GrizzHacks 6",
            date: "March 2023",
            content: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
        },
        {
            title: "I joined Sentry as a DevRel Intern",
            date: "May 2024",
            content: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
        },
        {
            title: "Mercedes-Benz Financial",
            date: "May, 2023",
            content: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
        }
    ];
</script>

<div class="-my-6">
    {#each items as item, index}
        <div class="relative pl-8 sm:pl-32 py-6 group">
            <!-- Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) -->
            <div class="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-light sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                <time class="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-medium w-20 h-6 mb-3 sm:mb-0 text-indigo-600 bg-indigo-100 rounded-full">{item.date}</time>
                <div class="text-xl font-semibold">{item.title}</div>
            </div>
            <!-- Content -->
            <div class="opacity-60">{item.content}</div>
        </div>
    {/each}
</div>