---
title: Making a social media with no database   
description: A social cheese rating app built with SvelteKit, Tailwind, and Pinata.
pubDate: "Nov 29, 2024"
---

I just finished what is likely my last hackathon. It feels a bit melancholic, but having only joined this community a little over year ago, I can happily say that I made the absolute most out of my experiences. This hackathon, HackUTD, was special to me and really summed up what the past year was all about. It was a time to build for fun, meet new people, and catch up with friends.

I usually go into a hackathon with an idea that aims to solve a real world problem, and one that I think has a chance of winning. In the past that’s been an app to fix dieting, a site to reduce paper waste, or a dev tool to help teams automate their docs. For this project, however, that couldn’t be further from the truth. For HackUTD, I built an app called Cheddarboxd. It’s social cheese rating app created solely from a play on words of the popular social movie rating app, Letterboxd.

# The Tech

This is a technical blog after all. Let’s talk tools, implementation, and challenges. Cheddarboxd was built with 3 things - SvelteKit, Tailwind, and Pinata. Given this is a social media app, you might immediately notice a lack of database or user authentication, but that was actually by design.

Pinata is a _____ company and was a sponsor of HackUTD. As a sponsor, they gave the hackers a problem statement along the lines of “make an amazing project with only Pinata as the storage method - no databases allowed.” Given their main purpose is to store files, it actually made a lot of sense to use that with Cheddarboxd. But what about things like post data or accounts? This restriction forced me to get creative 

## Implementation

In order to work around not having a database, I needed to have some structure for my files. Luckily, Pinata allows grouping by folders. This enabled me to make “accounts” in the backend where I could store user credentials and associate posts with accounts. 

## Challenges I ran into

Pinata’s API and quick start docs are incredibly straightforward. Within 10 minutes of starting my project I already had general file uploading figured out. Given that, I thought the whole of Cheddarboxd would take 2-3 hours but I was sorely mistaken. Here’s everything that went wrong.

### Pinata’s Docs

Pinata’s docs are painfully to the point. This is great for general reference if you know what you’re doing, but for learning what each part of their service should be used for, it falls a bit short. That said, there were 3 things I was able to lean on to make my learning curve a bit shorter. 

- Pinata has a pretty rich blog, with content directly covering common use cases for things like [KV Stores](https://pinata.cloud/blog/pinatas-kv-store-a-file-centric-database/), [CID’s](https://pinata.cloud/blog/the-power-of-content-identifiers-cids/), or even newly released [Vector Storage](https://pinata.cloud/blog/we-built-vector-storage-on-upload-want-in/). Additionally, some posts went in depth in example projects that stretched the capabilities of Pinata, which is exactly what we were tasked to do. This gave insight on how to do things like user authentication with Pinata.
- When reading through Pinata’s blog, I came across something I see very rarely: [docs made specifically for LLM’s](https://pinata.cloud/blog/how-to-use-pinata-with-cursor-zed-and-other-llms/). Pinata, being a startup, is constantly undergoing changes, meaning a lot of code generation is either incorrect or irrelevant. To remedy this, Pinata created a set of docs specifically to help provide context to language models about their most up to date information. Anecdotally, Cursors ability to debug and generate code when passed the docs as context was stark and increased my efficiency a ton.
- It would be wrong to not mention that the creators of Pinata were there, in the flesh, eager to answer any question that I couldn’t answer with the two previous methods. For me, this mainly came up during the initial ideation of partitioning user data in groups, and when I came across an `is_duplicate` parameter in the object Pinata was returning, pretty much telling me I couldn’t upload the same file twice.

### PWA Troubles

I’ve turned SvelteKit projects into PWA’s before, and even [wrote a blog](https://www.joemmalatesta.com/writing/sveltekit-pwa) about doing so. Even so, I ran into 2 complications which, in retrospect, were dumb, but took away 3 hours of precious sleep.

- Cookies not being Persisted across pages
    - It took me 30 minutes to even realize this was my issue. When authenticating a user, I made requests to make sure it was them in which case, I would add their username and user group cookies to be used throughout the app. After logging in, when I navigated to the profile page it redirected me back to login which would happen if no user would be found. Weird… This wasn’t the case on my [localhost](http://localhost).
    - An actual iOS bug. Sometimes, when loading a PWA on iOS 18 and clicking an input, the keyboard would just… not open. After 30 minutes of research and trying to revert my iOS update, a soft reset on my phone did the trick.

### Everything is slow

A big problem that has come with every hackathon I’ve done is slow wifi. It’s usually fine 

- The wifi was bad and I had to make multiple requests in series to authenticate a user. Because of this, providing a loading state to a user was paramount in cleaning up the UX.
    - SvelteKit’s progressive enhancement with `use:enhance` made this super simple, allowing
- I really wanted to make a popover of cheese rolling or something, but that would have taken away from my much needed 2 hours of sleep.
    
    ```js
    // Find user group
    const group = await pinata.groups.list().name(username);
    // Get CID for user
    const userDataFile = await pinata.files.list().group(group).name('userData');
    // Get user data
    const userData = await pinata.gateways.get(userDataFile.files[0].cid);
    // Compare password stored with password provided
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    ```
    

## Future

- Talk about adding likes, follows, and the implications it might have

# Winning

Although Cheddarboxd, at a first glance, is not a winning project, the technical decisions that went into building it, the refreshingly unique idea for judges, and the community it created at the hackathon made it stand out among others. In the end, I ended up winning 3rd place (out of 55 submissions) for Pinata’s problem statement, as well as the best Solo Hack.