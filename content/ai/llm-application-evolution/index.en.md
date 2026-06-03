---
source_hash: 8ddb2cd4333f6029c619eb69d14a13acbb324c73a186f18a712517a19b09228a
title: "From Autocomplete to Agents: How We Learned to Use Large Models"
author: JasperZ
date: 2026-06-03T18:00:00+08:00
weight: 20
tags:
  - ai
  - llm
draft: false
---

You probably remember that little trick your phone's keyboard does: you type "I'm heading to," and it helpfully tacks on "bed, night." A few years ago, that was about as far as AI with words could go—you start something, it finishes it, and that's that.

But today's AI is a different creature. You can hand it a half-baked, vaguely worded task, and somehow it figures out the steps and gets the whole thing done for you.

The leap from "finishing half a sentence for you" to "running an entire errand for you" didn't actually take many years. And here's the interesting part: the underlying method—look at the text in front of you, guess what the next word should be—never changed. Remember from last time? At its core, a large model does exactly this one thing. What stayed constant is only *how* it works; what changed is that it got better and better at it, more and more capable.

So how did it grow from a thing that could only finish your sentences into the assistant we have now—one that listens, sees, looks things up, and even gets work done on its own? Here we have to clear up the thing that's easiest to misread: this whole journey was driven by **two forces** at once. One is that the model itself genuinely got smarter—make this word-guessing machine bigger, feed it more, train it more cleverly, and it sprouts new abilities it simply didn't have before. The other is that people equipped it with handy gear—letting it look things up, call tools, run several steps on its own. The first is like building up inner strength; the second is like strapping on add-ons. Keep these two forces apart, and you won't mistake every advance for "just a new way of using the same thing." The path it wandered down was fast and a little wild, so let's walk it from the start.

## The starting point: a machine that could only "keep going"

Rewind to around 2019. OpenAI released a model called GPT-2 whose whole talent boiled down to a super-charged version of keyboard autocomplete: give it an opening, and it could continue into a whole paragraph, eerily smooth.

But continuing was all it could do—you couldn't actually *tell* it to do anything else. Write "please translate the following into English," and it most likely wouldn't comply; instead it might just keep churning out more text in the same vein. Because in its eyes, your sentence was simply another opening to be continued—it had no idea there was a *request* buried in there. In its world there were no instructions, only text waiting to be carried forward.

So back then it was more of a dazzling writing toy: you could admire it, but you couldn't really put it to work.

## Learning to follow examples

A couple of years later, its successor GPT-3 appeared—a hundred times larger—and it came with an eye-opening discovery: you didn't have to rebuild it at all—you just had to slip it a few examples inside your prompt, and it would follow the pattern.

Say you want it to translate Chinese into English. You don't need to explain any rules. You just lay out two or three "Chinese — English" pairs first, then write the line you want translated, and it sizes up what you're after and serves up the matching English. This "show it a few examples and it gets it" approach has a name: **few-shot prompting**—plainly put, "do it the way these samples do."

Under the hood it's still just continuing the text: the example pairs you laid out happen to be the handiest reference for what comes next. But here's an oddity worth pausing on—this knack for "watch a few examples and copy them" was never taught to it by anyone; it *grew* on its own once the model was made big enough. This was the first time people witnessed it: just keep piling on the scale, and the machine spontaneously sprouts brand-new abilities nobody designed in. That's not "a new way of using it"—that's it genuinely becoming more capable.

And precisely because it felt, for the first time, like it could be *directed*, around the same time this version also opened up a doorway that let programmers plug it into their own products (the jargon is "API"—think of it as a cable that lets you wire it into other software), and all sorts of little apps built on top of it started popping up, one after another.

## Finally willing to listen

But "laying out examples" is a clunky method—ordinary people have no idea how to do that. The real turning point was when researchers gave it another round of deliberate training: they took a huge pile of examples of *how people phrase instructions and what a good answer should look like*, trained it on those, and taught it to understand plain requests directly.

After that, you no longer had to bother with examples. You just say, in everyday words, "translate this into English" or "write me a time-off request," and it does it. This step has a name—**instruction tuning**—meaning it was specifically trained to "do what you tell it to." Unlike the previous step of "making the model bigger," this is a different way of making it stronger: not by piling on scale, but by **coaching**—still building inner strength, just by a different route.

Then wrap it in a chat box where you say one thing and it replies, and the barrier to entry drops to floor level: no tech background, no learned tricks, if you can type, you can use it. The version that came out of this tuning was called InstructGPT, and what truly set the internet ablaze was packaging it into a chat box as **ChatGPT** (late 2022).

This is a good spot to pause and sort out a distinction that's especially easy to muddle: a **model** and a **product** are not the same thing. The model is the "word-guessing machine" itself, the "brain" tucked inside—GPT and Claude are names of models. A product is that brain packaged into something an ordinary person can just open and use—a chat app, a search box. By way of analogy, the model is like an engine and the product is like the whole car: one engine can go into several different cars, and one car might get a stronger engine swapped in partway through. So strictly speaking, InstructGPT is a model, and ChatGPT is a product built out of it.

The assistants you know now—Doubao, Ernie Bot, Tongyi Qianwen, DeepSeek—all walk this same "model + chat box" road. (A side note: these names often wear two hats—they're both the app you open and use, and, behind the name, each company's own model. Next time you hear a new name, give it a quick once-over: is this the "brain," or the whole "car"?) That viral, everyone's-talking-about-it moment traces right back here: less because it suddenly got smarter, and more because for the first time *anyone* could put it to work.

By now you've seen three ways of "handing it a job"—continuation, giving examples, plain instruction. But don't be fooled by the variety; underneath, it's one and the same "continuation engine" turning:

![New forms wrapped around completion](fig-1-en.png)

## After ChatGPT: the rivals all showed up at once

The fire ChatGPT lit left the whole industry unable to keep pretending not to notice. Nearly everything that happened over the next year or two makes sense if you read it through the lens of "who couldn't sit still."

The one who could sit still least was Google. Remember that Transformer structure, the one so good at reading text? It was Google's own researchers who came up with it in the first place—and watching its signature technology get turned into someone else's smash hit, it scrambled to respond, first rolling out Bard, later folding it into today's Gemini. Microsoft went the other way, betting heavily on OpenAI and wiring ChatGPT straight into its own search and office software to grab an early lead. OpenAI itself split up, too: a group left over differences in philosophy and struck out on their own to build Claude, pitched as "steadier and safer"—today it stands alongside OpenAI and Google in the front rank.

Things were just as lively in China, where dozens of large models sprang up within a year, in what people dubbed the "war of a hundred models": Baidu's Ernie Bot led off, followed by Alibaba's Tongyi Qianwen, ByteDance's Doubao, Moonshot's Kimi, and more. By early 2025, a company called DeepSeek had built a model that held its own against the top tier at a far lower cost, making the whole world take a fresh look at the Chinese contenders.

Behind that long string of names lies a single logic: one smash hit tears open a gap, the giants are forced to fight back, ex-employees break away and split off, and latecomers stir things up with a leaner playbook. Don't worry about memorizing the names—it's enough to remember the shape of it, this "everyone piling in" all at once. And once there's a crowd of players, nobody dares stop—the leaps in ability that follow were, more or less, raced into existence by everyone trying to out-push everyone else.

## Growing eyes and ears

Up to this point, it still dealt only in text. But the things you have to handle in real life go well beyond text: a photo, a forty-page PDF, a voice message.

So next, people taught it to "see" and "hear." Snap a photo of a menu and ask what's worth eating; drop in a long report and have it sum the whole thing up in three sentences; or just speak and have it listen—it could now take all of that. This ability to handle text, images, and sound all at once is called being **multimodal** (just meaning "more than one form").

The standout examples that can take one look at the photo you send and understand the words you speak are OpenAI's GPT-4o and Google's Gemini, with domestic models like Doubao and Tongyi Qianwen adding the same knack. Its "seeing," it turns out, runs down the same old road: the image, too, gets broken into signals it can carry forward, and folded into the calculation. But to you, it leapt in one step from a "text assistant" into a helper that could pitch in on the real-world stuff sitting right in front of you.

## Learning to look things up and use tools

Remember that old flaw of its—the knowledge in its head stops at the day it was trained, so ask it about anything recent and it draws a blank, and when it can't squeeze out an answer it loves to make one up with a straight face?

To patch that hole, people bolted on an "add-on": let it search the web first, read in what it finds, and only *then* answer. This move is called **retrieval-augmented generation**—plainly put, switching it from "closed-book, running on memory" to "open-book, looking things up first." Microsoft's revamped Bing, which wired ChatGPT into search; Perplexity, built purely for AI search; the domestic Metaso; and the "go online" toggle on every assistant—all are products of this step: answers could now keep up with current events, and it could even attach sources for you to check.

![Retrieval puts material into context first](fig-2-en.png)

Follow that thread one step further: if you can have it look things up, why not let it use other tools too? First, let's pin down what "tool" means here—it's an outside helper the model reaches for while working, like a calculator, a search engine, a database; it is *not* the same thing as the AI product you open and use, so don't conflate the two. So it learned to call a calculator to do the math, query a database, flip through a calendar—any job it's bad at, it hands off to a purpose-built external tool. And just like that, it went from a brain that "only answers from memory" to a helper that "looks it up or grabs a tool when it doesn't know."

This step deserves a callout, because it differs from the previous ones in a fundamental way: **the model's brain didn't get any smarter**—people strapped "gear" onto it from the outside. This is exactly that "add-on" force from the opening: it leans not on the model's own inner strength, but on the handy equipment bolted onto it.

![Tool use sends tool results back into completion](fig-3-en.png)

## Learning to "think it over before speaking"

By this point, it had either grown more worldly or gotten better equipped. But on a truly brain-bending problem—a math question with several twists, a chain of reasoning that has to be worked out step by step—it still often crashed. The trouble lies in its blurt-it-out nature, that "spit out one word after another" instinct: it gives itself no time to think it through, and the answer tumbles out before it's reasoned anything.

So lately a new class of "thinking" models has appeared: before answering, it works through its reasoning step by step on a scratchpad, checks itself, scraps and redoes its own work, and only once it's thought it through hands you the final answer (OpenAI's o-series, DeepSeek's R1, and Google's "thinking" Gemini all go this route). With just that change, its powers in math, programming, and complex reasoning shot up a whole notch.

This step is especially worth your attention, because it pops a particular illusion better than anything. The *way you use it* didn't change at all—still that same chat box, you ask, it answers, looking no different from two years ago. But its brain itself is plainly working better. Which brings us back to the opening: progress in AI is never only about "new ways to use it"—much of the time, it's the thing genuinely getting smarter. This step is pure inner strength.

## Breaking a task apart and running it through

Thinking it through in its head still isn't enough; to actually get something done for you, it also has to be able to act, to walk through several steps in a row. By now you'll have noticed that, at every step so far, what it really did was still "you ask, it answers." This most recent step is the biggest leap yet: hand it a big goal, and it can break that goal into a string of small steps, work through them one by one, adjusting along the way based on what happens, until the whole thing is done.

This kind of AI—one that breaks tasks apart on its own and runs several steps in a row—is called an **agent** (from the word's plain sense: a stand-in who takes a goal and gets it done on your behalf).

For instance, you say "find me a high-speed train to Shanghai next week, pick one that arrives in the morning, and send me the details," and it splits that into "check schedules — filter by time — compile" and works through each, then sets the result in front of you. Claude, which can operate a computer on its own; OpenAI's Operator; Manus, the domestic agent that briefly took everyone's feeds by storm; and the "deep research" features rolling out across the board—all are pushing in this direction. Compared with the old one-question-one-answer assistant, it finally has a whiff of a "stand-in who gets things done."

![Agent puts the completion core inside a loop](fig-4-en.png)

Worth spelling out: an agent works only because the two forces from the opening are twisted together. It needs the model to be smart enough on its own to figure out how many steps to take (inner strength), *and* the outer shell that lets it act, call tools, and run loop after loop (add-ons). Take away either and it won't turn—which is why it was the last to mature.

Of course, it's nowhere near the point where you can fully take your hands off—it routinely botches the breakdown or runs an errand sideways, and the critical steps still need your eyes on them. But the direction is plain enough: it's drifting from "keeping you company in conversation" toward "doing the thing for you."

## Looking back: two forces, pushing it down one road

Lay this whole path out end to end, and you'll see that today's bewildering variety of AI products isn't all that mysterious: the chat assistant you shoot the breeze with, the AI search that goes online to find answers, the agent that operates software to run errands for you—at bottom, they're all that same old "word-guessing" method, pushed forward by two forces working together.

One is the model **getting smarter itself**: scaled up, it learned to generalize from a few examples; coached, it learned to grasp your intent; later still, it learned to see and hear, and to think things through before speaking. These are genuine "inner strength," real growth in the brain itself. The other is people **equipping it with ever-handier gear**: letting it go online to search, call tools, break tasks apart and run them step by step on its own. These are "add-ons"—the model is no smarter, but the range of things it can reach has widened.

While we're here, let's close the loop on those easily-muddled words: the AI **product** you open and use is, at bottom, just "one **model** (the brain) + a set of **tools** (the gear)" packaged into something you can pick up and run. Model, tool, product—keep these three straight and you won't get tangled up by the dizzying parade of names; when you hear one, first figure out which layer it belongs to.

![One road with thicker wrappers around completion](fig-5-en.png)

Once you grasp these two forces, the next time you meet a freshly launched AI product you can weigh it on two fronts: how smart is the brain behind it, really? And how handy is the gear people have given it? One that can only follow your chat versus one that can see images, go online, and run several steps in a row—the difference might be "inner strength," or "add-ons," or both. Keep the two apart, and you'll stop treating every newly coined term as some earth-shattering new species; and you also won't go the other way and wave off advances where it genuinely did get smarter as "just a new way of using it."

**Try it yourself**: open whichever AI assistant you use, and poke at its "follow-the-examples" knack with your own hands. Don't give it any rules—just lay out a few examples, like:

> happy → 😄; angry → 😡; sleepy → ?

Or give it two or three "product name → one-line slogan" samples, then write a new product name and let it carry on. You'll watch it grasp exactly what you want without your explaining a single word—that very knack that once made programmers' eyes light up, now yours to reproduce with a flick of your fingers.
