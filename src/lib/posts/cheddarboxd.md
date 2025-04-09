---
title: Making a social media with no database   
description: A social cheese rating app built with SvelteKit, Tailwind, and Pinata.
pubDate: "Dec 05, 2024"
---
I just finished what is likely my last hackathon. It feels a bit melancholic, but having only joined this community a little over year ago, I can happily say that I made the absolute most out of my experiences. This hackathon, HackUTD, was special to me and summed up what the past year was all about. It was a time to build for fun, meet new people, and catch up with friends.

I usually go into a hackathon with an idea that aims to solve a real world problem, and one that I think has a chance of winning. In the past that’s been an app to fix dieting, a site to reduce paper waste, or a dev tool to help teams automate their docs. For this project, however, that couldn’t be further from the truth. For HackUTD, I built an app called Cheddarboxd: a social cheese rating app created solely from a play on words of the movie rating app, Letterboxd.

## Implementation

Cheddarboxd was built with only three tools - SvelteKit, Tailwind and Pinata. Pinata is a file storage company (think S3, but simple) and was a sponsor of HackUTD. As a sponsor, they gave the hackers a problem statement along the lines of “make an amazing project using only Pinata as the storage method - no databases allowed.” Given their main purpose is file storage, it actually made a lot of sense to build a social platform - but what about the essentials like accounts or post data? Not having a traditional database meant I had to get creative.

With only 24 hours to hack, I shrunk the scope to just having accounts and posts, leaving things like likes and follows out of the equation. This led to me having 4 main backend operations - sign up, login, view posts (total or by account), and create a new post.

In order to work around not having a database, I needed to have some structure for my files. Luckily, Pinata allows grouping by folders. This enabled me to make “accounts” in Pinata where I could store user credentials and associate posts with accounts. 

Once I mentally worked out the backend implementation, I spent a majority of my time on the frontend, doing things like ensuring loading states were displayed, creating a responsive design for the PWA, and removing copyright watermarks from my stolen cheese SVG's.

I had honestly planned on finishing Cheddarboxd in a few hours and saving time for exploring campus and doing homework, but it wouldn't be in true hackathon spirit if some random bugs didn't keep me awake till 7am.

## Challenges I ran into
### Pinata’s Docs

Pinata’s docs are painfully to the point. This is great for general reference if you know what you’re doing, but for learning what each part of their service should be used for, it falls a bit short. That said, there were 3 things I was able to lean on to make my learning curve a bit shorter. 

- Pinata has a pretty rich blog, with content directly covering common use cases for things like [KV Stores](https://pinata.cloud/blog/pinatas-kv-store-a-file-centric-database/), [CID’s](https://pinata.cloud/blog/the-power-of-content-identifiers-cids/), and even newly released [Vector Storage](https://pinata.cloud/blog/we-built-vector-storage-on-upload-want-in/). Additionally, some posts went in depth in example projects that stretched the capabilities of Pinata, which is exactly what we were tasked to do. This gave insight on how to do things like user auth with just Pinata.
- I was also pleasantly surprised to find Pinata had docs made specifically for LLM's. Pinata, being a startup and constantly undergoing changes, means a lot of code generation is either incorrect or irrelevant. To remedy this, Pinata created a set of docs specifically to help provide context to language models about their most up to date information. Anecdotally, Cursors ability to debug and generate code when passed the docs as context was stark and increased my efficiency a ton.
- It would be wrong to not mention that the creators of Pinata were there, in the flesh, eager to answer any questions that cropped up. For me, this was useful during the initial ideation of partitioning user data into groups, and when I came across an `is_duplicate` parameter in the object Pinata was returning, pretty much telling me I couldn’t upload the same file twice.

### PWA Troubles

I’ve turned SvelteKit projects into PWA’s before, and even [wrote a guide](https://www.joemmalatesta.com/writing/sveltekit-pwa) about it. Even so, I ran into two, retrospectively dumb complications that took away 3 hours of precious sleep. When I first opened the PWA on my phone, the keyboard refused to open when I clicked any of the inputs. After spending 40 minutes worrying iOS 16 bricked all PWA's (I just needed to soft reset my phone), I ran into a slightly more real issue.

Once I finally could, I tried logging into an account I had made and got redirected in a loop back to the login page, meaning my credentials couldn’t be validated. It didn’t make sense that a set of API calls would work on my desktop but not my phone, so I quickly narrowed it down to a cookies issue, which I was using to persist user information. After some super sleuth work and a couple `console.log's` I found that my cookies were not being persisted on page reloads. Again, why would this be an issue on network and not localhost? Apparently, even though localhost is technically also http, when you expose the site to the network using http, it requires the cookies to have `secure: false` parameter set. Another simple fix but one that is not well documented.

### Everything is slow

A big problem that comes with every hackathon I’ve been to is slow wifi. Couple that with the 3 API calls that I needed to make, *in series*, to authenticate a user, and we end up with multiple seconds of loading time after clicking any button.

Here's the general logic for logging in a user, I had to make each request in series on what felt like `slow 3g` toggled in the network tab.
```ts
// Find user group
const group = await pinata.groups.list().name(username);
// Get CID for user
const userDataFile = await pinata.files.list().group(group).name('userData');
// Get user data
const userData = await pinata.gateways.get(userDataFile.files[0].cid);
// Compare password stored with password provided
const isPasswordValid = await bcrypt.compare(password, userData.password);
```
With loading times often exceeding 2-3 seconds, I often found myself double clicking buttons or checking the network tab for feedback (which is horrible UX). While it's usually outside of the scope of a hackathon, loading states were absolutely necessary here. Luckily, SvelteKit makes it easy with progressive enhancement, leveraging the callback passed into our forms `use:enhance` to handle the loading state.

```svelte
<script>
    // Form Callback
	async function handleSubmit() {
        loading = true;
		return async (result) => {
			if (result.status == 200) {
                loading = false;
                goto('/profile');
            }
        };
    }
</script>

<form method="POST" use:enhance={handleSubmit}>
	<button>{loading ? "Logging in..." : "Login"}</button>
</form>
```

## Winning
When I began, I didn't expect Cheddarboxd to take 22 hours. I also didn't expect to win, but here we are. Placing 3rd out of 55 teams for Pinata's problem statement in addition to winning the best solo hack was an incredible achievement and validated a lot of my thoughts regarding winning hackathons (which I hope to write about soon).

While Cheddarboxd might seem stupid at first glance (it might be), [the community it created](https://www.linkedin.com/feed/update/urn:li:activity:7265066166404947970/) as well as the clever use of the tools I was confined to led to it being novel in it's own right. Cheddarboxd, for me, serves as a reminder that building good software is only partly technical. The ability to evoke emotion, build community, and think of creative solutions continues to hold immense value.