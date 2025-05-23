---
title: How to Win Hackathons
layout: "../../../layouts/BlogPost.astro" #Constant
pubDate: "April 6, 2025"
description: A practical guide for winning hackathons, from an average programmer who's pitched and been pitched dozens of winning projects.

---
For two years I've been involved in hackathons as both an organizer and a participant. I've pitched and been pitched dozens of winning projects and they all have one thing in common - they're *never* the most technical. Instead, they all have something that makes them memorable - An entertaining demo, a unique idea, or a clever technical solution. 

---
Before I give any advice, why should I get an opinion?

- I've [Won 4/4 hackathons](https://devpost.com/joemmalatesta)
- 2 first place finishes, wins at 2 of the largest hackathons in the US
- Won with 4 completely different ideas
- Won with 0, 1, 2, and 3 teammates
- Directed and judged [my own schools hackathon](https://six.grizzhacks.org)

Over time, I created a list of rules that I've personally used to win 100% of my hackathons, and things that hold true for every winning project I have seen. I want to start this with some common things I hear people say about why they **Can't** win a hackathon.

***

### Misconceptions
> “You have to be **Cracked**”

First, stop using that word, it has no meaning. Second, you don't. I had randoms clowning me on TikTok about how simple my first hackathon project was (which won 1st place). A strong demo/idea can carry a boring codebase. Btw, hackathon wins != technical ability.

> “I need a strong team to help build x, y, and z features”

Before looking for people who will probably slow you down (more on that later), first think - Do I really need x, y, and z?

> “There's so many people here, I could never win”

I had this thought at CalHacks (2000+ people) and still won with a half baked project. Realistically, 50% of people will be demoing just an idea, a broken project, or some boring fintech app that has judges spacing out.

> “I can't finish a whole project in 24 hours”

Unless it's your first time opening a text editor, you can likely glue enough code together to get something pretty and functional for a handful of use cases (and that's really all you need). You can absolutely win as a beginner and lots of hackathons even have specific beginner prizes.

*** 

## Rules for a winning project
### 1. Start with the demo
To host a good hackathon, you're told "every decision should have the hacker in mind". Similarly, to make a good project, every decision should have the judges in mind. As harsh as it may sound, the 5 minute pitches determine what your last 23 hours of work were worth. Focus solely on making it concise, cohesive, and memorable. Personally, I love having the judges interact with my demo live. For [Cheddarboxd](https://devpost.com/software/cheddarboxd), I knew I was going to have judges try cheeses before I even touched down in Dallas, and built the app around that vision.

### 2. Build 10% of what you planned
"Wouldn't it be cool if it _______?" Yeah, but it'd be way cooler if it actually worked. Remember when I said 50% of projects are half baked? Here's the main culprit. Your project should have only a handful of **well built** features (remember your demo is 3-5 mins).
Anecdotally, two of my best projects had a *single* feature. 

### 3. Be Unique in idea, implementation, or demo
You're not going to beat 100+ teams without being memorable to the judges. Luckily, there are a few ways to stand out. 
- Unique idea
  - Enough of the stock analyzers and the mental health chatbots, it's all been seen before. Winning ideas are often simple under the hood, but offer a new angle to solving a problem. When GPT's vision API first came out, a team built a wrapper around it and sold a future of helping the visually impaired interact more seamlessly with the world. [It won 1st place](https://devpost.com/software/adasdasdasdasss).
- Unique implementation
  - A group won [2nd place at GrizzHacks](https://devpost.com/software/finite-automata-minecraft-mod) with a simple DFA (deterministic finite automaton) creator. They took a topic that made me fall asleep in class (canonically), and made it actually tolerable, visualizing the DFAs in Minecraft by building a mod.
- Unique demo
  - This goes hand in hand with a unique idea, but involving the judges and being enthusiastic about what you built is a cheat code. Also, regardless of their technical prowess, it never hurts to have a charismatic teammate. The [1st overall winners at CalHacks](https://devpost.com/software/duet-0tbkxe) had a demo that blew judges away, using brain waves to compose music. A largely useless idea and somewhat straightforward implementation, but a demo that could simply not be forgotten. 

### 4. Prefer no team over a stubborn team
As much as it's sold as such, hackathons have never been a place that thrives on collaboration. With a team of randoms, more often than not you'll have a group that doesn't mesh well. Whether it's difference in opinion, skill set, or personality, it's hard to align a project across four people in just 24 hours. Unless you're working with friends, people you've worked with before, or a team formed before the hackathon, it's best to keep your team slim or just go solo.

### Quick Do's and Don'ts
- **DON'T** train/fine tune your own LLM. Zero shot does the trick for 99% of use cases.
- **DON'T** actually implement auth if it's not a core feature.
- **DON'T** put static content in your project. No better way to bore the judge than saying “Here's a tips page with extra info on ____”.
- **DO** make a [PWA](https://www.joemmalatesta.com/writing/sveltekit-pwa), they are insanely high ROI. Easy to implement, not well known, and will impress the judges consistently. 
- **DO** use outside tools/props. There is a conversation to be had about the unfair, inherent benefits that come with this, but if it's allowed, use it. [First place at CalHacks](https://devpost.com/software/duet-0tbkxe) made good use of an [EEG](https://www.hopkinsmedicine.org/health/treatment-tests-and-therapies/electroencephalogram-eeg).
- **DO** include a video, github, and decent Devpost submission. Judges use it to help make final decisions, and if your demo goes bad, it's a good backup.
- **DON'T** cheat. It's really not that deep.


## What does a win mean, anyway?
I say all of this just to say that winning prizes doesn't actually matter. At a hackathon, there are dozens of ways to "win". For some people, winning could be meeting new people, learning a new skill, or even just doing the midnight karaoke. I have a friend who won in a completely different way than me. He spent all of his time at hackathons meeting people and before he had ever won a prize, he secured an internship from a connection he made at a hackathon. In order to compete for prizes, I always had to give up some of the other, more fun things hackathons have to offer.