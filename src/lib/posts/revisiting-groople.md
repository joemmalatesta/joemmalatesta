---
layout: "../../../layouts/BlogPost.astro" #Constant
title: "Revisiting Groople"
description: "Five years later I rebuilt Groople from a single jsonb table into something I can actually see people play. They mostly wanted the rebuttal back."
pubDate: "November 16, 2026"
---

Back in 2021, I built, with my bare hands, a daily word game based on a game I grew up playing, Scattergories. It was my first complete full stack project and it took me months to develop, learning everything while I built. I plastered it all over Reddit and over the last 5 years it’s been played daily by ~100 devout wordsmiths. You can play it at [Groople.xyz](https://groople.xyz).

## Why the rebuild?

After I graduated and joined my first full time job, I hosted a lunch and learn with my small team to revisit the game’s database design. When I built it, I had only used NoSQL DBs and shamefully replicated that in a relational database. A single table held the whole game, with the scores, categories, and the daily letter all tossed into some jsonb columns, and all of the players’ answers and stats shoved into their browser storage. The lunch and learn consisted of us rebuilding the schema to be more practical and make use of the thing relational databases were made for (I didn’t know what an index or a join table were for way too long…). Anyway, 2 years pass and I don’t do anything since the one table design still technically works (outside of a somewhat uncommon race condition from reading, updating, and writing the whole score row for each play), but I have a growing desire to see how people actually play my game.

Then, sometime in mid September, Jev released. It’s a fast, cheap classification model that surely couldn’t have a more apt use case than judging the validity of 12 words against their respective categories. Building with Jev sparked something in me that I hadn’t felt since I first found Svelte, and I rushed this project to completion over a weekend, using AI and remnants of the old codebase to churn out a brand new version, with a sleek new DB, interface, and decision model.

## Upgrades

Previously, I was at a point where I couldn’t update npm, touch the schema, or commit any new code because I was on 5 years dated technology and had not kept up with the times as well. Given how much I wanted to tear down anyway, I just made a brand new repo and database and started from scratch. Everything a player cared about was stored in their local storage either way…

1. Svelte 5, Tailwind 4, dark mode, and a full new UI. All cool new tech although it doesn’t matter since I didn’t write a single line of this by hand. The new frontend uses the AI SDK to stream answers as they’re judged.
2. A new DB schema, with 9 practical tables, indexes, migrations, foreign keys, join tables, answers, metadata, and a world of new analytics and insights. Storing answers doesn’t just clean the data up. It makes the game function better, because I can use past answers and whether they were right to help evaluate new ones. Migrations run locally now too. Before, it was send it in prod and pray. The only thing we still use local storage for is a user ID, since I don’t want people to have to make accounts.
3. A brand new decision model with a golden set and some real evals, on a new prompt and a new model. Accuracy by the eye test has gone up significantly. Although it may be short lived (keep reading)…
4. Game history, enabled by our new database. Look back at any previous day’s answers. Fun feature!
5. A new rebuttal system that more closely represents playing Scattergories in real life.

After making all of the upgrades, I played a few times, thought the judging was fine, maybe a little more stringent, but more in line with how I’d vote if I was playing with friends IRL. Whatever, right? People who have been playing for 5 years will be okay with a little change in the grading since the new UI is neat and fun and boy could I have been more wrong.

## Tough Crowd

> “How dare you do this, how dare you take away the rebuttal on Groople. My life depended on a rebuttal. AI sucks, how does Infinity Nikki not count as a game? IT'S A GAME. I PAID MONEY TO IT. Get your shit together.
>
> Thank you”

To my *personal email* (which is not listed on the Groople website).

> “I liked the rebuttal function. I will check back. If the rebuttal function doesn't come back, I'm finished with this game. If jelly donuts are not a bakery item, I can't play this game any longer.”

On a feedback form I added after receiving the email.

First, I’m glad my user base has overlap with a game like Infinity Nikki. I had never heard of it but it looks tastefully weebish. Second, I’m sorryyyyyyyyy. It was a grave oversight in true developer fashion of caring more about the new tech than the user experience. I apologize. Let me make it right.

For background, I added a rebuttal feature soon after launching Groople, because GPT 3 was too bad at judging, and GPT 4 was too expensive for my $10 quarterly spend limit. It allowed people to ask a better AI for a second opinion if their first answer was marked wrong. In retrospect, I think the rebuttal was a bit too lenient and since I wasn’t a daily player myself, I wasn’t used to getting this positive feedback each time I played. When I rolled out the new game I, mistakenly, shipped a more strict main judge and *completely removed the rebuttal feature.* I honestly thought the new model was good enough without it.

Anyway, after 2 weeks of constant feedback telling me I’d killed the game and rug-pulled 1000 well-meaning players, I added the rebuttal feature back. It is not the same, and it may ruffle some feathers, but it is no longer AI based at all. You submit your answers for others to vote on after they played their daily game. I like that it also gives you a taste of what others are answering. Still not a perfect solution but a much more fun form-factor in my eyes.

Groople is still far from perfect, and some people may still prefer the old version, but my favorite thing about building this game is the small but passionate community that came with it.

I could allow logging in to save answers from the past. Lotta work, probably.
