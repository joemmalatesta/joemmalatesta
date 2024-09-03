export type TimelineItem = {
    title: string;
    date: string;
    content: string;
    upcoming?: boolean;
};

export let updates: TimelineItem[] = [
    {
        title: "GrizzHacks 7",
        date: "Feb 2025",
        content: "Upcoming... apply today at grizzhacks.org",
        upcoming: true
    },
    {
        title: "Graduated Oakland University",
        date: "Dec 2024",
        content: "with a B.S. in Computer Science, average grades, and lots of ambition :D",
        upcoming: true
    },
    {
        title: "Interned at Sentry.io",
        date: "May 2024",
        content: "Moved to San Francisco. Educated developers for the summer as a DevRel intern",
    },
    {
        title: "Rebooted GrizzHacks",
        date: "March 2024",
        content: "Rebooted my school's hackathon. Led a team of 12, raised $25k, and hosted over 150 students",
    },
    {
        title: "Won first place at Hack Dearborn",
        date: "Oct 2023",
        content: "Built and demoed ScanBite, an app to give a nutritional breakdown of your food from an image"
    },
    {
        title: "Launched Groople.xyz",
        date: "Jan 2024",
        content: "Launched a daily word game using AI. Learned a lot about ownership and iterating on feedback"
    },
    {
        title: "Interned at Mercedes-Benz Financial",
        date: "May 2023",
        content: "Interned as a Software Engineer. Sped up daily processes and built UI for an internal chatbot"
    },
    {
        title: "Interned at Alps Alpine",
        date: "August 2022",
        content: "Built iOS testing environments for IoT applications. Swift is the reason I appreciate statically typed languages"
    },
    {
        title: "Taught programming at OU's summer camp",
        date: "May 2022",
        content: "Teaching k-12 kids to code at my schools summer camp. Also my introduction to web development"
    },
    {
        title: "Started at Oakland University",
        date: "Sept 2020",
        content: "Shoulda been ME major took AP Physics too soon and transitioned to CS"
    },
    {
        title: "Graduated High School",
        date: "April 2020",
        content: "Rochester High classic underachiever. Spent my time botting shoe releases and chilling with my psych teacher"
    },
    {
        title: "Chronically Outside",
        date: "2002 - 2016",
        content: "Just playing soccer and swimming tbh. My life on computers didn't exist until high school"
    },
    {
        title: "Born",
        date: "July 2002",
        content: "At 1:11pm. No wonder my mother says I'm an angel"
    }
];