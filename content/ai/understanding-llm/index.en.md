---
source_hash: 50267a3673c4d6b1bfcd06aa9682060efa476e5b76bdc91deeab4a55206e878a
title: "Understanding Large Models: The Story of AI, Past and Present"
author: JasperZ
date: 2026-06-03T12:00:00+08:00
weight: 10
tags:
  - ai
  - llm
draft: false
---

You've probably had moments like these: your phone's photo app suddenly gathers every picture with a cat in it from the past few years into one album; late at night, the instant you type "I'm heading to," your keyboard helpfully fills in "bed, night"; or you casually ask your smart speaker "do I need an umbrella tomorrow?" and it actually checks the weather and answers you.

All of these are AI. It doesn't have a metal head, and it isn't plotting to take over the world—it has simply moved quietly into the things you use every single day.

But the moment you open the news, the whole picture changes: some say AI is about to take everyone's job, some say it's already become conscious, others say it talks nonsense and can't be trusted at all. These claims sound contradictory, yet each is delivered with total conviction—the more you read, the more confused you get.

Rather than being yanked around by all this hot-and-cold noise, it's better to understand the thing for yourself. What makes people anxious is never AI itself, but "not getting it"—not getting why it's so capable, and not getting when it's going to let you down. Once you have a feel for it, once you know when you can rely on it and when to keep your guard up, those alarming headlines lose their power over you.

And the best place to start understanding it is the most basic question of all: this "AI" we all talk about every day—what exactly is it?

## 1. What AI Actually Is

Let's begin with a fact that might surprise you: **AI is not something that only appeared in the last couple of years.**

The face unlock on your phone, the automatic spam-text filtering, the "fastest route" your maps app plans for you, the "recommended for you" picks in shopping apps—all of these are powered by AI, and many have been quietly at work for over a decade. We've long been living in a world surrounded by AI; it's just so useful and so unremarkable that we forget it's even there.

So why is it that the moment someone mentions AI, what pops into our heads is a sci-fi-movie robot that thinks, feels, and maybe even wants to wipe out humanity?

That's the first misconception we need to clear up. It helps to split the term "artificial intelligence" into two kinds.

**One kind is the AI of science fiction**, which experts call "artificial general intelligence"—an intelligence that, like a human, can do anything, reason by analogy, and possess self-awareness. This kind of AI **does not currently exist**. It's still confined to movies and novels; no one knows what year it might be built, and no one can even guarantee it ever will be.

**The other kind is the AI of the real world**, whose talent is **doing one specific thing extremely well**. Spotting a cat in a photo, translating English into Chinese, recommending videos based on your habits—each of these AIs is a "specialist" in one domain, and switches to another domain leave it helpless. Ask your robot vacuum to write a poem and it's utterly stumped.

Every AI we're going to talk about, every AI you encounter day to day, belongs to this second, real-world camp—including the chat AIs that have stolen the spotlight these past couple of years, like ChatGPT, Gemini, and Claude.

But chat AI is a special case worth pausing on. Remember what it was like the first time you used one? Just a plain chat box: you type a line, it replies a line, like messaging a friend who happens to know everything. Yet before long you noticed it does far more than chat—it can draft copy, translate, tell jokes, polish your résumé; whatever you throw at it, it pretty much catches. How is that still a "specialist that only does one thing"?

You're right. Chat AI really has shattered the old impression that "one AI can only do one thing," and the range of what it can do is still expanding fast. There are two reasons behind this. First, **the technology changed**—the new technology underneath it, the thing called a "large model" (more on that shortly), is inherently far more general-purpose than older AI. Second, **the product positioning changed**—companies deliberately built it into an all-purpose assistant you can "ask anything," rather than a single-function tool.

But "being able to do lots of things" and the sci-fi notion of "general intelligence" are still two very different things. Chat AI has no self-awareness, and what it says isn't always correct—it's more like a **well-read generalist who also frequently jumps to conclusions** than the all-knowing, never-wrong "it" of the movies. Why it's so "well-read," and why it "jumps to conclusions," is exactly what we'll unpack piece by piece.

So how does this real-world kind of AI actually "learn" its skills? Here lies the most fundamental difference between it and ordinary software.

Software of the past was built by humans hard-coding rules one by one. Take a calculator: an engineer explicitly tells it "when you see a plus sign, add the two numbers together"—it never makes an arithmetic mistake, but it also only ever does exactly what it's told, and freezes the moment it meets a situation no one wrote a rule for.

The way AI learns its skills is more like **how a small child learns to recognize things**. You don't explain to a three-year-old that "a cat has triangular ears, vertical pupils, and a body 40 to 50 centimeters long"—you just point at one cat after another and repeat "this is a cat, this is a cat." After seeing enough, the child *gets* what a cat looks like on their own, and can recognize even a breed they've never seen before. AI works the same way: you feed it tens of thousands of photos labeled "cat," and it **figures out the pattern on its own**, instead of being taught each rule by hand.

This process of "figuring out patterns from a large pile of examples on your own" has a dedicated name: **machine learning**—the one and only term you need to remember in this section. It is the heart of modern AI. **Grasp this one point and you hold the key to understanding everything that follows**: AI's ability comes from "having seen a lot," not from "being taught every single rule."

This also explains, in passing, that love-hate quirk of AI: it learns fast and applies broadly, but it is **not 100% reliable**. Because it works by "spotting patterns from examples" rather than following rigid rules—just as a well-traveled, knowledgeable person can still misjudge, so can AI. The answer it gives is the one it "feels is most plausible," not one that's been rigorously verified and guaranteed correct.

Remember this "feels most plausible" quirk; it matters—we'll keep coming back to it.

## 2. A Short History of AI: Why Now?

In late 2022, ChatGPT seemed to take over the internet overnight—social feeds, the news, dinner-table conversations, suddenly all about it. This gave many people the illusion that AI had appeared out of thin air in the last couple of years.

It hadn't. Counting from the idea of "building a machine that can think," AI has been on the road for nearly seventy years now, rising and falling along the way and getting cast into the cold twice. Looking back at these ups and downs isn't an archaeology exercise—it's to see clearly something more important: why "now," of all moments, is when it suddenly started to work.

**Wave One: Teaching the machine the rules by hand (1950s–60s)**

The story opened in high optimism. In 1956, a group of scientists formally gave the field its name, "artificial intelligence," for the first time, and declared that within a generation, machines would be able to do everything a human can.

Their idea was intuitive: humans are smart because we reason and follow logic; so if you write out the rules of reasoning one by one and teach them to a computer, won't it be smart too? This approach really did shine in well-defined little worlds like playing chess or proving math theorems. But the moment you dropped it into the real world, it fell apart—just the common sense we blurt out without thinking, like "birds can fly, but penguins can't, and a bird with an injured wing can't either…," is impossible to finish writing as rules. The machine was choked by countless exceptions.

The hot money quickly pulled out, research sank into a slump, and later generations called it AI's first "winter."

**Wave Two: Packing experts' experience into a computer (1980s)**

People switched tack: don't expect the machine to know everything, just let it be an expert within one narrow domain. For instance, take an experienced doctor's diagnostic know-how and organize it into thousands of rules like "if there's a fever plus a cough, consider such-and-such illness," then stuff them into a computer—this was the once-wildly-popular **expert system** (basically, a super-manual that looks things up in a table for you automatically).

You've actually met this approach before. Those customer-service chat widgets tucked into the corner of websites a few years back—you type a question, and it picks the closest match from a pile of preset Q&As to reply with; but the moment you phrase things a little differently, beyond the rules it was written with, it gives an off-target answer and finally throws you a line like "Connecting you to a human agent." At its core, it's a distant descendant of the expert system—all human-hardcoded rules, not a single sentence that it "thought up" itself.

Expert systems did make companies money. But the flaws were fatal too: the rules were all written and maintained by hand, one by one, so any small change in the domain meant tearing it all down and starting over; and it couldn't learn on its own at all, so it stalled on the spot whenever it hit a situation the rules didn't cover (that moment you were driven to yell "human agent!" at the bot was exactly it stalling). Once the novelty wore off, investment shrank again, and AI entered its second winter.

**Wave Three: Letting the machine learn from examples on its own (the 2000s onward)**

Notice something? The first two waves stumbled in the same spot: both tried to have humans **feed the rules to the machine**, but the real world has far more rules than humans could ever finish writing.

This time, the approach flipped completely—instead of humans writing rules, you throw a massive pile of examples at the machine and let it **figure out the patterns itself**. Yes, this is exactly the "machine learning" from the last section: show it a few million cat photos and it works out what a cat looks like on its own, with no one needing to define "a cat's ears are triangular."

But this idea had been around for decades—so why did it only really start working recently? Because it had to wait for three things to come together at the same time:

- **A huge pile of examples**: once the internet and smartphones spread, humanity put an astronomical amount of text, images, and video online—exactly the "study material" to feed the machine.
- **Enough computing power**: training AI requires an enormous amount of calculation, and only now have chips (especially the graphics cards originally built for gaming) become fast enough to chew through it in a reasonable time.
- **A smarter method**: researchers found a new approach called **deep learning** (think of it for now as "a souped-up version of machine learning that's especially good at mining patterns from massive data"), which finally unleashed the power of the first two ingredients.

All three are indispensable—which is why AI wasn't suddenly invented by someone on a particular day, but arrived when several forces had built up enough, as a natural result.

Here we need to draw one more distinction, because "deep learning" is not something that only appeared in the last couple of years. Its first dazzling debut was already over a decade ago: in 2012, its knack for "recognizing objects in images" suddenly left every old method in the dust. Ever since, it has come to recognize faces more accurately than people do—your phone's face unlock, the security cameras at malls and intersections, even those news stories about "facial recognition catching a wanted fugitive on the spot in a packed concert crowd," are all powered by it. In 2016, a program called AlphaGo used it to learn the game of Go and beat the human world champion; and the short-video feed you can't put down is likewise it, guessing what you love to watch. But note—these are still the "specialists" from the last section: the one that recognizes faces can't play Go, and the one that plays Go has no idea what you like.

But have you noticed that all these talents are AI working quietly behind the scenes? You scan your face, you scroll videos, you enjoy the convenience—yet you almost never feel you're "dealing with an AI."

The real watershed happened in just the last few years. This time, AI stepped from behind the scenes onto the stage for the first time, becoming something you can simply open your mouth and chat with, ask anything of—and most people, in that very moment, **truly "ran into" AI for the first time**. Before that it had always been around you, you just couldn't feel it; after that, it became something that trended every day, that everyone was talking about. For all the rises and falls of the previous decades, in terms of how it *feels*, none hit as hard as this one.

How did this happen? The turning point came around 2017, when researchers found a new structure especially good at handling language (its name is the Transformer—don't worry if you can't remember it, just know it's exceptionally good at "reading text"). Following this new path, people did something crude but effective: they made the models bigger and bigger, and fed them more and more text. That's where the name "large model" comes from.

This "large" is large in two specific places:

- **Large in what it reads**: during training it "read" through nearly the entire internet you could find—an ocean of books, web pages, conversations, encyclopedias. A volume of text one person couldn't finish in a lifetime, it went through in a single training run.
- **Large in brain capacity**: inside the model are anywhere from billions to hundreds of billions of tunable "little knobs" (the jargon is "parameters"), and it relies on them to remember the patterns it distilled from all that text. How many knobs? A number so large no one can picture it in their head.

It's precisely this unprecedented "largeness" that let AI cross a threshold: from a specialist that only does one thing, into the "seemingly good at everything" chat assistant from the last section. At the end of the day, the reason you can converse smoothly with it in 2022 isn't some flash of inspiration, but a decade-plus of accumulation in data, computing power, and deep learning—plus a hard stomp on the gas pedal along the language path in the last few years.

## 3. How Large Models "Think"

Let's start with a little feature you use every day without paying much attention. Halfway through typing, your keyboard often pops up the next word for you to pick: you type "the weather is really," it offers "nice," "great"; you type "I'm heading to," it offers "bed." How does it know? Simply from having seen enough sentences—whatever people most often write after "the weather is really," that's what it guesses.

Take this unremarkable little feature, scale it up, and crank it hard, and you've put your finger on the very heart of large models.

You might not believe it: today's large models—the ones that write essays, answer questions, and keep you company chatting until midnight—are, at their core, doing this one thing: **looking at the text already in front of them and guessing what the next word should be**. Guess it, append it; then take the new, longer string as the basis and guess the next word; and so, word by word, "completing the chain" onward, a fluent answer is born.

It isn't pulling ready-made sentences from some "answer bank" and handing them to you. What it does is more like **estimating**: for every possible next word, it weighs a sense of "how plausible" it is, then picks the smoothest, most plausible one to attach. Remember how we said the answer it gives is the one it "feels is most plausible"? This quirk is rooted right here.

And precisely because it's "estimating its way forward" rather than "copying from a file," ask it the same question twice and the answers are often not identical—it completes the chain afresh each time, rather than copying you the same standard answer.

So does it actually understand what it's saying? Here's the most counterintuitive and most important point: **it does not "understand" meaning the way you and I do**. It has no thoughts, no intentions, and isn't inwardly calculating "I need to answer this question well." It's merely doing an absurdly large "fill-in-the-next-word puzzle," piecing together the most likely continuation one word at a time.

Yet it completes the chain so smoothly, so plausibly—it has, after all, "read" far more text than anyone could in a lifetime—that what it produces is often slicker than what many real people write. So we can't help feeling "it's so smart, it really gets me." But in the end, that's it being good at "completing," not it being clear in "thinking."

Since all of its ability comes from "the things it has read," what exactly has it read? Where does that seemingly all-knowing "knowledge" come from? That brings us to how it was "raised."

## 4. Where AI's Knowledge Comes From

You might think: since it can chat with you about history, recipes, and movies the moment you open your mouth, does it have an all-encompassing encyclopedia in its head, available for lookup on demand?

Not quite. To understand what its "knowledge" really is, we first have to look at how it was "raised."

Training a large model is a lot like a frantic cram session before an exam. Before it goes on duty, it's "shut away" to "read" through a huge pile of text humanity has heaped up for it—an ocean of books, web pages, Q&As, encyclopedias—from beginning to end, distilling patterns as it reads (this process of "reading through once and learning the patterns" is called **training**). Once training ends, the study-room door closes: it walks into the exam hall carrying everything it learned, and from then on **can only answer from memory, with no more flipping through books**.

Chatting with it is like talking to this student who "just finished cramming and is now taking a closed-book exam." Grasp this, and two of its most commonly misunderstood traits both make sense.

**First, it has a "knowledge cutoff."**

Since all its learning comes from the material it read at the moment of training, it naturally knows nothing about what happened after training was complete. This point of "only read up to such-and-such day" is called the **knowledge cutoff**. It's like someone who, from a certain day on, moved into the remote mountains and cut off all contact with the world: everything before that day, crystal clear; everything after—who got famous, who got into trouble, whether the stock market went up yesterday—it has no idea. So if you ask it "what's the weather today" or "how much does the just-released phone cost," it will either honestly admit it doesn't know, or—and this is what you most need to watch out for—force out an answer based on an outdated impression, and deliver it as if it were gospel.

**Second, by default it does not "look things up online."**

Many people treat it as a smarter search engine, and that's a big misunderstanding. A search engine goes online on the spot and lays the web pages and sources it finds in front of you; a large model, by default, is **reciting from the memory in its head**. It hasn't actually looked anything up, and it can't give you a real source. It sounds convincingly detailed because it saw a lot during training, not because it's checking accurately right now.

One thing to add: many chat products today have indeed given AI the ability to "look things up online," letting it fill in news after the cutoff date—but that's an extra step the product bolts on, like being specially allowed to check your phone during the exam; it isn't that its "brain" itself has changed. That part of its learning still stops at the moment training ended.

By this point, a more troubling question has already surfaced. Since it's "answering from memory in a closed-book exam," and memory—as you and I both know—blurs, gets crossed, and fills itself in by assumption, then when it actually isn't sure about something, will it just "make up" an answer that looks plausible?

It will. And this is exactly the thing to guard against most when using AI.

## 5. Why AI Makes Things Up With a Straight Face

Let me tell you a true story. In 2023, an American lawyer took a shortcut and had ChatGPT help write a legal brief. The AI produced something that looked the part, even citing several precedents with a straight face, complete with neatly formatted case numbers. The lawyer took it all at face value and filed it—only for the judge to be dumbfounded on checking: those precedents were entirely fabricated by the AI and don't exist in reality. The lawyer landed in trouble and lost considerable face.

This phenomenon has a dedicated name: **hallucination**—AI stating, with a straight face, things that sound highly credible but are actually wrong, or even entirely fictional. Inventing nonexistent book titles, papers, celebrity quotes, and legal clauses, pinning one person's deeds onto someone else… these are all its "specialties." The most insidious part is that when it's making things up and when it's telling the truth, its tone is equally confident—you simply can't tell them apart from the surface.

Why does this happen? Actually, the earlier sections already laid the answer out.

Recall its day job: what it does is never "verifying the truth," but "completing the chain"—based on the preceding text, picking the smoothest, most plausible continuation to attach. In other words, what it single-mindedly pursues is **"reading like it's true," not "being guaranteed true."** These two coincide most of the time, but the moment it hits a question it's unsure about—some obscure detail, a specific number, a source that doesn't exist—a "smoothly-written false answer" and the "true answer" look equally plausible in its eyes. So it writes out the false one without hesitation, and writes it with total conviction.

So please remember a counterintuitive but crucial judgment: **hallucination is not an occasional small bug AI commits, but an innate byproduct of this "chain-completing" mechanism.** It can't be eradicated, and you shouldn't expect it to "fix itself" one day—what you can do is learn to guard against it.

So when is it most likely to "crash"? Roughly these categories—the more of them apply, the more wary you should be:

- **The more specific, the more dangerous**: precise numbers, dates, names, addresses, and requests like "give me the source / references"—these are exactly what it most loves to fabricate off the cuff.
- **The more obscure, the more dangerous**: on niche topics it saw little of during training, its impression is fuzzy, and it's more likely to fill in the gaps with imagination.
- **The newer, the more dangerous**: for matters beyond the knowledge cutoff, it either doesn't know, or makes a wild guess from an old impression.

So how should an ordinary person guard against it? Here are a few easy-to-apply rules:

1. **For facts that matter, verify them yourself.** Numbers, quotes, legal and medical advice, information you'll base a decision on—don't take them at face value just because it sounds certain; check them against an authoritative source.
2. **Check the "sources" it gives too.** Don't forget, even the sources could be fabricated.
3. **Treat it as a well-read but not-fully-trustworthy intern.** Letting it draft and brainstorm is fast and handy; but finalizing and deciding has to come from you.
4. **Its tone doesn't reflect its confidence.** The more emphatically it speaks, the more reliable it is not—confidence is its default expression, and it has nothing to do with being right.

That said, there's no need to be too pessimistic—toolmakers have long known about this old hallucination problem, and over the past couple of years have built several lines of defense, most of which you've probably already benefited from:

- **Online fact-checking**: as mentioned, many tools today will automatically search the web and answer with links attached, so the answer no longer rests on "stale memory" alone, and you can click into the sources to verify yourself.
- **Learning to say "I don't know"**: the newer generation of models has been specifically trained so that, faced with a question it isn't sure about, it's more willing to honestly admit "I'm not certain" or ask you a clarifying question, rather than fabricating one.
- **Thinking a few more steps before speaking**: some tools have the AI draft and self-check internally before handing you the answer, which has noticeably cut down on blurting out errors.
- **Hitting the brakes on high-risk topics**: on subjects like medicine, law, and finance, many products will add a reminder to "please consult a professional" rather than making the call for you.

These defenses really have made today's AI far more reliable than it was two years ago. But keep one key sentence firmly in mind: they can only **lower** hallucination, not—and never—**zero it out**. So the last line of defense is always you.

At the end of the day, what this whole journey most wants to leave you with is this: AI is an extraordinarily capable helper, but its "capable" and its "reliable" are two different things. Treat it as a well-read companion who occasionally talks nonsense with a straight face, and you can both enjoy its benefits and avoid getting burned by it.

**Try it yourself**: Pick a little corner you happen to know well but others might not—your hometown, your profession, one of your hobbies—and ask it a fairly specific question within it, like "what year was that old bridge in my hometown built, and what's its history?" or "what does this obscure term in my line of work actually mean?" There's little material online about such things, and they happen to be under the watch of your "insider's eye," so any line it delivers confidently that's actually made up, you'll see through at a glance. (A tip: today's AI tools mostly have web search on by default, so for questions it can search, it'll look them up and may not slip; to see what's originally "in its head," you can first turn off web search in the settings, or deliberately pick questions that can't be found online at all.)

By now, you hold the key to making sense of AI: what it is, where it came from, how it "thinks," where its knowledge comes from, and why it makes mistakes. With this "ready to use it, but keeping one eye open" perspective, the next time you face the flood of AI news and products, you'll likely feel far more at ease than before.
