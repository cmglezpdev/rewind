# Advanced Algorithms (COMPSCI 224), Lecture 8

*Harvard University · 1:24:06 · https://www.youtube.com/watch?v=aHW6HKVC-SY*

[`0:27`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=27) All right, we'll get started. Uh, yeah, thanks. I think, uh, it's good that this problem for four. Yes. State how much time you spent on the pet. It's good I put that in there because I think uh, next piece that I have to make not as long.

[`0:51`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=51) I was skimming some of those answers and yeah, sorry about that. Oh, 1B. Is that Yeah, I see. Okay. Um, no, actually there's a there's a way to get there's there's a way to get a really short answer to 1B, which I guess we'll put in the solution section. Um, okay.

[`1:28`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=88) So today I want to talk about uh online algorithms. Is this the right word to be writing? Yes. Okay. And this is all about making decisions, you know, in the face of uh uncertainty. So I'm going to imagine there's an input which is a sequence of requests. You're going to see some examples. And I don't know the future. I just know the requests I've seen so far. and based on um and let's say there are many ways to satisfy this request and I have to make a decision about how I'm going to satisfy it. Okay.

[`2:19`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=139) And I want to make these decisions in such a way that um I don't regret the decision like in the future when I look back at what I decided I want to regret things too much. Okay. So we'll see uh we'll try to formalize this.

[`2:38`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=158) Um okay. So there is some uh cost to making a decision. cost uh paid for making uh say a certain decision and at the uh end of the day of the sequence of requests. Oh, do we have a scribe by the way?

[`3:21`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=201) Okay, we want to make sure want to say we didn't spend much more than some omnisient being who knew the future at the beginning or spend much more than the best in hindsight. Right? So, let's say you're uh you know, you're

[`3:53`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=233) working you're working um on Wall Street or something or you're managing the investment portfolio of Harvard or somewhere else and uh you know you the amount of money you made this year is uh much less than the amount of money that the person who had your job last year made. So now they want to fire you, right? uh and you want to say look it's true I made less money but this year is a different year than last year you know this year the best anyone could have made even if they knew the future is much less than what you could have made last year and I was competitive with the best I could have possibly done so you know you could use this kind of thing

[`4:33`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=273) to save your job okay so well okay you can use it for also more real applications you'll see that you'll see that later in class So let me give so let me I like let's formalize this a little more.

[`4:54`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=294) Um so we run some algorithm A to make decisions and opt is an algorithm making the best decisions while knowing the future. Okay. And then the definition we say that we say a is we'll say r competitive if uh for all uh request sequences sequences uh you know sigma which is Sigma 1, sigma 2, sigma m.

[`5:55`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=355) Let's say the cost using a to serve sigma is at most r times the cost of opt to serve sigma maybe plus some additive term. Okay. And uh this this is called competitive analysis. Okay. And it was introduced by none other than Slater and Targen.

[`6:34`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=394) Totally different paper than display trees but the same year. At least the journal versions are the same year. Can't remember about the conference versions. Okay. So um before I uh look at well so today we're going to look primarily at the paging problem. I'll define that later in lecture. But before I define that problem, I want to give you I guess two uh toy examples. Okay.

[`7:03`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=423) I think if people if people were in CS124 with me last semester, I mentioned one of them. I'll just refresh your memory. I don't it's okay if you weren't in in there last semester. You'll see it again. So one is one classic toy example. So toy examples.

[`7:23`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=443) So one is what's called the ski rental problem. People always start off online algorithms with this thing uh because it's simple enough to demonstrate what's going on. So uh the only thing that's unknown in the ski rental problem is m the length of the sequence. So, what's going on? So, you imagine that you and your friends are at a ski resort and they didn't tell you how long they want to spend on this vacation, but and you're willing to spend as long as they tell you. Okay?

[`7:59`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=479) And each day they'll wake up and they'll either say, "Okay, we're done with this vacation. We're going home now."Or they'll say, "We want to stay one more day, okay, and ski."And if they stay one more day and ski, you have to have skis to go out skiing with them. Okay? So, uh you can either rent the skis for the day that costs a dollar or you can choose to buy skis which costs B dollars. Okay?

[`8:28`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=508) So each day must either rent skis $1 or buy skis. That's B dollars. And of course once you buy skis you never need to rent them in the future. you can use them on all future days uh for free. Okay, so the question is what do you do right so if you want if you want to look at

[`9:05`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=545) um opt opt knows the future what does that mean here means op knows when your friends are going to say let's go home okay so what would opt do number of days yeah otherwise run every day right so opt

[`9:25`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=565) So opt says if number of days greater than b buy skis else rent every day right but we don't know the future and we want to be competitive with this so what do we do for days. Yeah. So, us rent for Bdays uh buy skis on uh B+ first day if there is a B+ first day. Okay.

[`10:17`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=617) So if the number of days we spend at this resort is at most B opt paid B opt paid the number of days because it rented every day and we also paid the number of days because we also rented every day.

[`10:30`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=630) If we stayed for more than B days then opt would pay B. We pay at most 2B. Okay. So this implies that uh we are too competitive. We never spend more than twice the amount of money that opts spend.

[`10:52`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=652) Uh I think maybe you might even do slightly better if you you think if you rent for B minus one days and buy on the bth day. I think you get very slightly under 2B. But if B is large, it starts looking like two. Anyway, so that's one example.

[`11:08`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=668) Let me give you one more toy example before I get into uh the main uh parts of the lecture. So, toy example two. Uh, I'll just call this uh free pizza. Okay. I don't know what's a building in Harvard that has a really long hallway. Are there any such buildings? Oh, that's not okay. So, I I don't know.

[`11:44`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=704) So, let's say that there's a building that has a really long hallway and there are rooms on one side of it evenly spaced. There's room one, two, three up to n. And you're standing you're standing here. This is right in front of room, you know, n over two.

[`12:19`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=739) Okay. And you heard from one of your friends that there was free pizza. You know, there's some uh recruiting event. One of these rooms has free pizza, but you know, you're you don't have signal right now and you can't text your friend and uh there's no Wi-Fi for some reason. So, you just need to like find this pizza. Okay. So, so I mean you could you you know it's one in one of these end rooms.

[`12:42`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=762) So what do you do, right? Um opt knows where the pizza is, right? So opt would just go straight there. You don't know. It could be to your left or to your right. Okay. But you want to make sure that you don't spend that much more time walking than OP would spend. Okay.

[`13:03`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=783) Is the is the situation clear? Okay. So, what would you do? Zigzag. Yeah. Exactly. So, what when you say zigzag, what do you mean? So, check this room, then go back, check that room. Okay. And then and then now go to go to this room and then go to that room like this. Like this. After checking the pressing, you can check Oh, wait. Say say it again.

[`13:42`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=822) After checking. Yeah, after checking. So, okay. Let's let's go back. So, I'll first check this room. That's my first thing to check. And then where do I go? Go left one. And then Okay. And then I go forward. Yeah. So, check this next. This is the fourth room I check.

[`14:05`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=845) So I guess is there a way to describe uh you know let me just to make this picture clearer let me just call this zero and let me call this room minus n /2 and let me call this room n /2. Okay, so you're zigzagging. You're going back and forth. And what's kind of what's the property you want from your zigzagging? Like in the uh kith zigzag, roughly how how far to the left or right are you going in the cave zigzag? I don't know if I said that.

[`14:35`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=875) Uh so so you're going to go left some number of steps. Then you're going to zigzag and go right some number of steps. Then you're going to go left some number of steps, right number of steps. So let's say you're in the k phase of this.

[`14:50`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=890) So how how how far do you want to go as a function of K twice the amount before roughly two to the K. Yeah. So yeah. So let's look at that. So uh visit rooms one then minus2 then four then minus 8 then 16 etc. Okay, so in reality, you know, let's just say that uh let's say that the room we actually want to go to is T. It could be minus T.

[`15:32`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=932) This the analysis would basically be the same. Let's say pizza is in room T. Then you know how much how much walking do we do before we find room t first of all opt will spend tea time walking

[`15:53`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=953) there whereas we'll spend so opt spends tea time we spend time which looks something like one say we we pay one to go to one then one to go back. Then we pay two to go to minus two and then two to go back etc. until finally we pay 2 to the m plus 2 to the m.

[`16:30`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=990) Uh and then finally we get there in our t-steps. Okay. And the worst case is that uh this 2 to the m here I guess will be something like at most 2t. Okay. Uh maybe even t because this we could be going in the wrong direction here. Um and I guess it would be so before we didn't we didn't hit t before which means we were going less than t before.

[`17:04`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1024) Uh yeah, so this this thing this 2 to the m here is certainly at most 2t. Okay. Uh and then we have this geometric series which sums to something. So let's say this is at most t + 2 * 1 + 2 + 4 plus dot dot plus 2 t or you know some power of two. That's at least t. This thing here is at most 40 t 4 t * 2 is 8 t plus t is at most nine t. Okay.

[`17:42`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1062) So opt sp spent t time we spent nine t time. So this is also this is a constant competitive algorithm a non-competitive algorithm. Okay. Okay. Great. So those are just two toy examples to uh make you feel comfortable with. Yes. So when you say visit rooms, does that include all the ones? Yeah.

[`18:06`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1086) So as you're walking there, you're gonna peek into every room that's along the way. So it's oneus oneus. Yeah. So you uh but yeah, so you walk toward one, then you walk toward minus two, but then you you peak in every room along the way, then you walk to four, you peek in every room along the way, etc. Let's pretend peeking at a room uh once you're in front of it, you can just look into it without paying anything.

[`18:31`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1111) What's the cost of police arresting? Uh yeah, that could slow you down, I guess. But uh let's say there's no police to simplify the analysis. Okay. So, okay, good. So um but so later in Targen I said introduced this competitive analysis and they were not concerned with ski resorts or free pizza. So what what were uh what are the two what are the things that Slater and Taran looked at. So they looked at two problems.

[`19:11`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1151) The first problem they looked at was um the list update problem. I'll define it. And two is paging. And I'll I'll formally define these. But the basic idea behind them, I'll just say right now with this problem, you imagine that you have a link list. Okay? And um you have repeated requests to access items that are in this link list. Okay? So, if the item that you're you're um you're told to access is the i position in this link list, it costs you i steps to walk there.

[`19:49`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1189) But once you access it, I'm allowing you for free to move it anywhere earlier in the list, anywhere that you already walked past. Okay? So, you're allowed to change your uh you're allowed to reshuffle things in your link list. There's also insertions into the link list which just puts it at the end but then also after you put it in the end you can move it anywhere forward if you want to and there's also deletion and paging.

[`20:13`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1213) Paging is uh well it's it's going to be about basically two levels of memory. So you have some fast memory and then you have something slow like disk. Okay. Or you have say cache versus RAM and uh cache let's say has some bounded size and when someone asks for some location if it's in cache you just fetch it.

[`20:41`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1241) If it's not in cache you have to bring it in from memory and you have to pay to do that. Okay. But if cash is full you have to evict someone from cash and send it to memory. So you'd like to minimize the number of evictions. Okay. Well, we'll see.

[`20:54`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1254) Um, you know, I'll I'll more carefully go through both of these. I'll start let me start now with list update. So, uh, list update. Um, there are n items in a link list. three operations. There's access X, insert X, and delete X.

[`21:37`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1297) Access X just means you have to touch item X. Okay? And your pointer starts at the beginning of the link list. Insert means put it at the end. Delete means remove that node after Accessing an item allowed to move it anywhere closer to the front to the front of the list.

[`22:23`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1343) Okay. And let me say here accessing the E item costs I so I'm not going to mention all the things that came about before Slater and Targen but I will say for a while there were many papers analyzing various heristics for this problem.

[`22:56`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1376) So let me let me list some of the heristics that people looked at. There is the move to front heristic. I'll call that MF, which says always move the accessed item to the front of the list. There's also a transpose

[`23:38`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1418) heristic which says move well transpose access item with the previous item with the item before it immediately before it in list. Okay, so it's a less extreme version of move to front, right? Move to front jumps it all the way to the beginning. Transpose just gradually moves it toward the beginning, right? So if you keep accessing it, it gradually walks forward to the front until when you access it enough times, it it's at the front. And then there is frequency count, which says uh keep items in sorted order um by by frequency of accesses most to least frequent.

[`24:55`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1495) Okay, so for each item you keep track of how many times so far have I requested this has someone requested this item. Okay, those are the frequencies of the items and you make sure that the most frequent items are toward the front.

[`25:08`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1508) makes sense and kind of pre so right before Slater and Tarjon there was a paper by Bentley and I don't know how to pronounce it McGok I think but before that paper um there were lots of papers analyzing these heruristics

[`25:29`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1529) um trying to explain why they might behave well in practice and those papers were all like probabilistic they try to create probabistic models for what sequences might look like and then they showed that under this probabistic model uh such and such heristic does well. Okay, they proved theorems like that.

[`25:46`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1546) Uh the first worst case analysis that tried to understand these heristics was by uh the paper I mentioned. So worst case there was a paper by uh Bentley and McGok I think uh this was an 85 and they proved a theorem.

[`26:25`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1585) Okay, they said first of all they said no there are no insertions if there are no insertions and I think the items need to start off um sorted by order of first access if no insertions and the items are initially sorted by time of first access.

[`27:04`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1624) Then the cost say the cost of move to front I believe is at most twice the cost uh then for all sequences for all access sequences S the cost of move to front on S is at most twice the cost of frequency count on S. Okay.

[`27:29`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1649) So that okay so this says that move to front is not that much worse than frequency count and they also did some experiments and they found that uh frequency count did well on their experiments. Move to move to front did usually just as well sometimes better and transpose sucked. Okay. Um now I want to say that I want to compare this inequality to the static optimality bound we proved about spllay trees.

[`28:01`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1681) Right? So what was the static optimality bound saying for spllay trees? It said that spllay trees do on any sequence of uh accesses spllay trees does as well as any fixed tree where that tree is not allowed to do rotations and adjust itself. Okay.

[`28:18`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1698) Now, this is this is basically the same thing for this list update problem. So, if you're not allowed to do any moves of items, right? So, I said after accessing an item, you're allowed to do some rebalancing like in display trees, you're allowed to do some movements in the link list. If you're not allowed to do any movements, then the best thing to do is frequency count. Okay, frequency count will minimize the total number of the total time to serve the whole access sequence. So this is like a static optimality theorem for move to front.

[`28:52`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1732) So this is like static optimality for move to front. Okay. But as we saw with spllay trees there is this dynamic optim. Oh yeah. So if the items are initially sorted by time of first access. Yeah. Then how can you keep them sorted by frequency without moving them around? Um, right.

[`29:24`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1764) So actually that's a good point. So this is even this is even better than uh a static optimality theorem. Right. So um I think because certainly then I think we're better um does does frequency mean like by the overall frequency across the entire sequence if you know the full sequence or does it just mean by frequency thus far? Um so yeah that's a good point.

[`29:53`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1793) So here frequency count frequency count means um we might move items if their if their frequency changes. Yeah. So here we are changing. So I have to think the question is uh do we do only better by updating the frequency count as things go along? Right. So, is this only better? So, yeah, maybe um I understand your question. The question is if you do frequency count where you're allowed to move around items versus frequency count where you're not allowed to move items, is the first always strictly better than the second?

[`30:27`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1827) I'd have to think for for a moment about that. I don't know. Um if so, then yes, you would have the static optimality theorem. Okay. But we're going to prove something even better than static optimality anyway. Okay. So with trees, there was the dynamic optimality conjecture which says not only are we better than any fixed tree, but we're also competitive in this uh well, I erased it, but in this competitive analysis notion of competitive ratios, the conjecture

[`30:59`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1859) display trees are competitive even against trees that are allowed to rotate, trees that know the future accesses and rotate themselves to be, you know, just as fast as possible to serve everything. So the question is does move to front or anything else satisfy dynamic optimality and the answer is yes.

[`31:15`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1875) So theorem due to um Slater and Taran now is that move to front is dynamically optimal. And by that I mean that the competitive ratio is a is a constant independent of uh n let's say. Okay. So let me one more let me uh so what do we need to prove? we will prove the following.

[`32:04`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1924) So the claim I'll write and then I'll define some notation. So first of all actually they they they um Slater and Targen in their proof allowed even more things to happen. So move to front doesn't take advantage of this but they said look even a so after accessing an item you can move it anywhere forward for free. They also looked at a model where not only can you do that, but you can always pay one to just move to to transpose items.

[`32:36`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1956) Okay, so if I have an item and I want to transpose it with a person right before it, I can pay one to do that. Okay, move to front doesn't take advantage of this, but you could ask yourself, well, maybe if I could take advantage of this, I could do even better.

[`32:51`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=1971) But no, they say uh let a be any uh algorithm then for all access sequences S the cost of move to front on S is at most twice the cost and let's say that uh S has uh M operations the cost of a on s plus the number of uh they call this paid exchanges that a makes.

[`33:36`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2016) So paid exchanges means you pay one to do the transpose with your the predecessor minus the number of free exchanges minus m. So free exchanges look like this. paid exchanges are um re swapped with your predecessor. Oh, and I should say I mean if I don't say the next thing then this is going to be trivially false.

[`34:08`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2048) We assume that at the beginning of S A and MF have all items in the same order. Right? Right? If you want to prove a theorem like this then there the link lists that A has and the link list that MF has better had you know start in the same order questions about so questions about the statement of the theorem before I prove it like what anything means?

[`35:13`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2113) Okay, so we'll prove this using a potential function argument. V equals the number of inversions in MF's list using the ordering specified by a list. What I mean by that is if you have an item, so here's MF. Whenever you have a pair of items such that I appears before J and MF, but I appears after J in A, I call that an inversion.

[`36:06`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2166) Okay. Okay. So now let's look at the cost of an access, the amortized cost of an access. And let's also remember that let's also remember that um the total cost is equal to the amortized cost plus the uh initial potential minus the final potential. Okay.

[`36:42`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2202) Well, potentials here as I've defined them are always non- negative. So this is this is certainly at most the advertised cost plus the initial potential and the initial potential is zero. There are no inversions in the beginning because they started with the same ordering.

[`36:58`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2218) So really we just need to bound the amortized cost. Okay. So what's the amortized cost of of an access say access X. So remember an advertised cost is actual cost minus the potential difference. Okay. So let's bound this thing.

[`37:42`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2262) Suppose X is E item for A and it's the kith item for uh for move to front I mean in their respective linked lists. So the actual cost is then K right to search for it and move to front.

[`38:07`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2287) Now how about the difference in potential suppose um there are let me make sure I don't confuse myself suppose there are t items that are before I in before X in MF's list but after X in A's Okay. And now what does MF do? MF takes X and it moves it to the front of the list.

[`39:16`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2356) So it changes the status of inversions. It creates some new inversions and it kills some of the old inversions. Right? So, how many just to make sure we're on the same page, how many inversions does it undo? Yeah, it undoes T inversions and how many new inversions does it create? Right.

[`39:45`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2385) K minus T. Um, is it K minus K minus T minus one? I think K - T minus one new inversions, right? Because there were K minus one items before it. And yeah, so and T of those were inverted and the other K minus T minus one aren't. So that implies

[`40:15`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2415) that the change in potential is equal to um k minus let's see so we k minus t minus 1 minus t is equal to uh k - 2t - 1. So that's k minus 2 t - 1. So this implies that the amortized cost is 2 k minus t minus one.

[`41:09`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2469) So what do we really want the advertised cost to be if we want to be competitive with opt? How much does opt pay? So like I mean a to be competitive with a. So we're imagining a is opt, right? We're saying this is true for all a. So in particular, it's true against the optimal A. So how much would would would A pay um in terms of variables we've already set up there? How much would A pay to serve this request?

[`41:42`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2502) Or does A pay to serve this request? I I it pays I. Right? So for us to say we're competitive, one way to do that is to say look the cost the advertised cost of every operation is roughly I.

[`42:02`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2522) All right? So why is this thing at most roughly I Yeah. Yeah. Yes. There I minus one of them. That's right. that are not that are not inverted. Yeah. Exact That's exactly right. Right. So what do we know? We know that these kus tus one items. Okay. Are before I I mean are before X in both the MF list and A's list, right? But how many spots are there in A's list before X? There are only I minus one spots.

[`43:10`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2590) So then this definitely needs to be at most I minus one. which means this is at most I. So this is at most 2 I minus one. Okay. So when you sum up amortized costs across all operations you're paying proportional to well I mean you're basically proving the theorem, right? So that's that's this factor of two and this minus one is that minus m. Um now what about when you do a free exchange? So at some point what is a free exchange?

[`43:42`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2622) That means after you in after you uh touched an item, you move it forward one. Okay. Well, move to front moved it forward all the way. If you move it forward one, you're decreasing the potential by exactly one. Okay. What if you do a paid exchange? Well, you're at most uh create you're at most increasing the number of inversions by one. Okay, so that's it.

[`44:08`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2648) So that's the proof of the theorem. Okay. So that's moved to front. Now I mentioned they also looked at paging. So, paging is going to be an example of this list update problem with a little uh with a twist I guess you can say. So uh what if accessing e item in the list costs f of i and not you know not just i.

[`45:12`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2712) So you know f of i equals i is is this problem we just looked at but in general there could be some other function of i. Okay. And the paging problem f of i is equal to zero if i is less than or equal to k and it's one otherwise.

[`45:38`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2738) What does that correspond to for us? And why why why would I want to look at this f function? Well, let me show you what it's trying to capture. Oh, and paging also. Um, in the paging model, we

[`46:10`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2770) require that when we access um item I, if I is bigger than K, then we must transpose it down to some position which is which is at most k. So let me I'll come back to this but uh let me tell you where this is coming from. So the setup is as follows.

[`47:00`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2820) We have as I mentioned earlier we have this memory. So we have say k uh k cache lines and this is memory. And then we have some disk infinite disk divided up also into some blocks which are the size of a cach line. And we have repeated a we have repeated uh access requests for various pages.

[`47:43`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2863) If the page lives in memory, I'll just give it to you. If the page doesn't live in memory, then it's on disk. I have to go fetch it and bring it into memory and then I give it to you. And then if you ask for it later and it's still in memory, I can give it to you for free from then on. So fetching from disk costs us one. Okay.

[`48:04`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2884) But sometimes when I fetch from disk memory is full in which case I have to choose one of these K pages to evict and I'll evict it and then put my page in. But I have a choice right? So this is uh where my decision- making comes into play and there were lots of heruristics out there for what to evict.

[`48:27`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2907) So your your you know cash replacement policy heristics. So there was for example least recently used. Oh right. So just so now that I've said the setup, right? So right these first K spots are exactly memory. Everything else is disk. Right. So accessing memory cost zero. Okay.

[`49:06`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2946) So there's least recently used. Okay. So I have a choice of what to evict and I guess the name tells you what I'll evict. The page that was least recently accessed. What does that correspond to when you think about uh you voiced it I guess or lipped it did you

[`49:35`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=2975) move to front right least recently used is exactly move to front there's also least frequently used what does that correspond to well I didn't tell you what it is, but it's what the name says. So, you look at the page that's been less least frequently accessed and that's what you evict. All of history. Yeah.

[`50:05`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3005) Up until this point. Up until this point in history. Yeah. Okay. I guess maybe I'm asking questions that are boring you. Frequency count. This is frequency count. Yeah. Isn't it not quite frequency count because you could be like have lots of pages like lots of hot pages and if you access one cold page but you still have to one of the hot pages. So you'll have like a bump in your distribution. Oh because I have to bring it in because you have to bring it in.

[`50:37`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3037) So the Oh, I see that's true. It's not quite frequency. It's not frequency count. That's good. I think I confused myself. Okay. Yeah, that's because because you have to bring pages into memory. Yeah, I think you're right. It's not frequency count. Um there's also FIFO.

[`50:54`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3054) So first in first out. So this is usually called FIFO. Um so this one you kick out the page that was brought into memory the farthest back in the future. I guess it's also as the name suggests. Okay. And in the slider in charge paper, there's one other one that that they put in there which I'm not sure I don't know why people would use this heristic, but it's it was something like evict the page that I most recently brought into memory. Why would I why would I do that?

[`51:42`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3102) I don't I don't understand. But that was listed there. But anyway, okay. What do I want to say? So I want to say that so the theorem that Slater charge proved okay is that LRU and FIFO are both K competitive. Okay, it sounds pretty horrible if your memory is, you know, 8 gigabytes or something.

[`52:47`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3167) Uh, I mean, it's a huge number. Okay, unfortunately, they also proved the lower bound any online algorithm is at least is a cannot so let me say no online algorithm this can have competitive ratio less than k okay so proof why is that the case so if I give you an algorithm Right?

[`53:35`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3215) And uh you're trying to construct a sequence, right? So what does it mean to have good competitive ratio? It means that for all sequences you behave well. So I'm saying that for any for any algorithm there's a sequence that messes it up. So what's that sequence? So I have some I have some stuff k things in memory. Okay.

[`53:53`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3233) And let's say let's say that uh total number of pages in the universe is k + one. Okay. So I have k of those pages in memory. What should the next thing in the access sequence access sequence be?

[`54:19`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3259) The one I don't have. then my policy will evict someone and then the person I evicted oh it happens to be the next person in the sequence. Okay. So I'm gonna have page faults non-stop. Okay. Meanwhile meanwhile what's a way so let's look at what opt does opt knows the future. Okay. So what is opt gonna do for that sequence?

[`54:45`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3285) I claim there's always a way to guarantee that you never have a page fault more than every k steps, every k pages. Okay, why is that? Like I there's a way to guarantee that if I have a page fault now, my next page fault will not be until at least keps in the future. You evict the one that's going to be access farthest in the future. Right? If I if I if I evict the person who's farthest in the future, then that means there had to be at least k things before him, right?

[`55:25`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3325) So meanwhile uh so uh always request so let's call this algorithm a always request what a just evicted meanwhile for this in the future only faults at most one in K steps, one in K uh accesses. So we're paying K times more than not.

[`56:10`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3370) Now you might think that this is trivial. Can doesn't every algorithm achieve a competitive ratio of K the memory in size K? In fact though, no. You can show that some algorithms uh like for example uh least frequently used you can come up with sequence where it has an unbounded ratio.

[`56:34`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3394) Okay, for example um you can come up with sequences where opt is something like one and this thing makes an unbounded number of faults. That's basically the length of the sequence. Okay. So, you can see the paper for that example or I don't know, maybe I'll give some of these things as homeworks at some point. We'll see. Um, okay.

[`57:09`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3429) So, it's not that great, but let's prove it. And then I'll talk a little bit about how to circumvent this lower bound, right? But I mean, we don't want to have a an 8 billion competitive algorithm. What's the point? But, uh, it's not as bad as it sounds, it turns out.

[`57:29`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3449) So, what we'll actually show is that what something I'll call one bit LRU is K competitive. Okay. What's one bit LRU? Well, let me describe what one bit LRU is. Okay. uh all so initially so let's let me say one bit

[`58:22`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3502) LRU initially all pages are unmarked okay when an access comes Then when a when a request comes, if we must evict then evict then evict uh an unmarked an unmarked page. always mark accessed items. Okay, so whenever we access an item, we mark it. Whenever we access a page, we mark that page. And if we need to evict someone to make room, we'll make sure we evict an unmarked page. Okay.

[`59:32`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3572) Now, eventually everybody's going to be marked if we keep doing this, right? And and the way that you evict an unmarked page is um just arbitrarily. It doesn't matter which one you do. Just evict any unmarked page. Okay? Eventually, everybody will be marked. There's no unmarked page to evict. So, what do you do if all pages are marked?

[`1:00:01`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3601) when need to evict clear all mark bits. Okay. And then now evict one of them and bring in the new page and mark it. So once in a while we we forget about who's marked. So one bit LRU is K

[`1:00:38`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3638) competitive implies oh and one thing I should say um I'm not going to prove it in class but there was a paper [Music] um so let me write this here so I think it's belotti maybe there was a paper. So farthest in future could be another one. I mean you can't actually implement it because you need another future but you can show that this is optim this is always opt.

[`1:01:09`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3669) So this was due to Botti and uh some IBM journal of systems I think in '66. We're not we don't I don't think we need to use that fact here but uh just so we we know what opt looks like. So I claim that one bit LU being K competitive implies that LRU is K competitive.

[`1:01:38`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3698) Why is that? What's a oneline proof of that? Yeah. The least recently used bit will always be. Yeah. Right. So in particular, so here in the one bit LU scheme, all I say is evict an unmarked page. I don't specify to you which one to evict. I leave that up to the implementer. LRU is a particular way of implementing this. Okay.

[`1:02:29`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3749) So, right because when do I unmark a page? Um, basically there had to have been I had to have brought in K new people and then a K plus first person came, right? to make me clear all the mark bits.

[`1:02:49`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3769) So the least recently used person is always at least K in the in the past, right? Which means he's always going to be unmarked. He's from the previous fa previous phase of clearing since LRU implements a particular approach a particular uh way of choosing an unmarked page.

[`1:03:39`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3819) Okay. So, let me call a phase the point in time between clearing all the bits and the next time I have to clear all the bits. So, we break sequence into phases uh let's say is delineated the right word by clear all bit operations.

[`1:04:19`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3859) So as we move from phase to phase, what's a lower bound on the number of um of page faults made by OPT? Yeah. Let's say we don't use the you don't even need to use the fact that this is OPT. Okay. How many distinct pages had to have been accessed for us to start a new phase? I guess I said it a second ago.

[`1:04:50`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3890) It's k plus one because we we brought in k marked people and then the k plus first person evicted one of them right so even opt only has k pages in memory so even opt has to have a page fault to satisfy to serve these k plus1 pages meanwhile how many page faults does lru have in a phase it has exactly Right?

[`1:05:20`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3920) Because every time it you know what every time I have a page fault I bring the the number of mark bits increases by exactly one. I bring a new person in and set his mark bit to one. Right? So within phase LRU has exactly K faults.

[`1:05:45`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3945) opt has at least one fault. That's it. That's the end of the proof. So, we're K competitive. Oh, I should have said one bit LU, but as as I said earlier, um if one bit LU works, so does LU. Okay.

[`1:06:11`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3971) Okay, so as I said, you know, this this lower bound is sort of, you know, what's the point if we can't beat K competitive and K competitive is not really that great when you have a big memory. Doesn't sound too great.

[`1:06:26`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=3986) So I mean one thing is um usually memory is not I think yeah could you just explain why it's exactly sorry why it has exactly k faults okay so how does a phase start it starts with everybody being

[`1:06:49`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4009) unmarked now what happens when I have a page fault when I have a page fault I kick out an unmarked person and replace him with a new person who's now marked. So every time I have a page fault, the number of marked bits increases by exactly one and a phase ends when I have kar bits and then the new person comes in who's not there. Right? So just by accessing the page without having Oh. Oh. Oh yeah, that's a good point.

[`1:07:20`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4040) That's a good point. That's a good point. So the point was if someone's already in memory from the previous phase and I touched them. Oh, and I guess you said that you said it. You said at most KSK was right. Oh yeah. So yeah, so if someone was already in memory just from the previous phase and you didn't have to bring them in now they're touched. Yeah, that's a good point. Okay. Um, good.

[`1:07:41`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4061) So what's a way around the lower bound? So circumventing lower bound So let's say what one three ways around it. The first thing you say is look oftentimes when people implement uh you know caches etc they're not fully associative.

[`1:08:08`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4088) Okay so there's a there's a they might only be partially associative where or or not associative at all. If they're not associative then there's really nothing for us to say. partially associative means there's only for any given page there's only like uh um a small number of places where it could live and we'll well you know we'll put it in one of those. Okay.

[`1:08:36`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4116) Um so there the the competitive ratio you get is like the associivity of your cache as opposed to the size of your cache which might be smaller. Okay. But aside from that, one way to circumvent this lower bound is to say to do what's called resource augmentation.

[`1:08:54`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4134) This was also introduced in Slater and Targin's paper. Compare. So give ourselves K memory or K uh K slots in memory and give opt k prime which is at which is at most k slots in memory. So maybe I'm not that competitive against OPT which has exactly the same resources as me. But let's say I have k slots of memory and opt only has k over two, right? And now I ask what's the best opt could have done with k over two slots of memory on this sequence versus what I can versus what lru is doing with k.

[`1:09:41`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4181) Okay. and Slater and Targen showed that LRU and FIFO are actually uh K prime over sorry K over K minus K prime + one competitive. So I'm not going to show that modified proof here. But the point is if you say look ops doesn't have k slots in memory but it has care over two then I'm I'm too competitive against that kind of adversary.

[`1:10:20`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4220) So you limit the power of against that kind of omniscient being. So if you limit the power of the omnicient being by a little bit you can get better competitive ratios. Another way to circumvent the lower bound is to consider randomization.

[`1:10:48`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4248) By that I mean that the cash replacement policy can make random decisions. Okay, if you think about you know look at the the proof that you can't beat K competitiveness. Well, it assume the adversary who's creating this hard sequence has to know what you're going to evict. But if if the thing you evict is random in some way, then he can't make that sequence in advance. So we have to talk about what can an adversary do.

[`1:11:28`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4288) So types of adversaries. The first is omnisient. By that I mean he knows everything. He even knows the random bits you're going to flip in the future. Okay? If he even knows the random bits in the that you're going to flip in the future, then you're really just a deterministic algorithm and randomness doesn't help you knows all random bits even in future.

[`1:12:08`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4328) So randomness is not really going to help you against this kind of adversary. There's also what I'll call an adaptive adversary, which is a little more realistic. So, this is someone who maybe has some ability to measure performance or measure things on your machine and he knows the past. He knows everything that's that he's accessed so far. And based on that information, he decides what the next thing to to ask is. Okay?

[`1:12:35`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4355) So he knows the random bits you flipped in the past, but he doesn't know the random bits you'll flip in the future. So he knows past randomness, but not in the future. And then there's the oblivious adversary. So this person is not trying to destroy your cache performance. Okay, they have some set of pages that they actually just want to look at. Okay, and they're not going to change their mind based on how things are going up till this point.

[`1:13:16`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4396) Okay, so chooses access sequence s independent of no at the beginning. at the beginning before any coins are flipped. Okay. So I think this so this lower bound um this lower bound says you can't do anything against an omnisient adversary. But it also says you can't do anything against an adaptive adversary because if the adaptive adversary knows the state of everything in the past then he also knows what you don't have in your cache right now and he can adaptively choose to pick that.

[`1:14:20`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4460) But it doesn't say anything about oblivious adversaries. Right. So theorem this is due to let's say fiat and a bunch of others. Fiat, Karp, Lubie, uh, Mio, Slater, and Young. No, there's no Taran uh, in 1991. And by the way, this I think I said I mentioned Bentley and Miyak earlier. This is not the same Miyak.

[`1:15:16`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4516) So they're either maybe they're related or married. I'm not sure. I think they're both at Amherst College. So they they're probably connected to each other in some way. Um but yes, so what did they show? We can achieve there

[`1:15:40`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4540) is a randomized algorithm with competitive ratio two times the kith harmonic number against oblivious adversaries where remember this thing means 1 1 + 1 over 12 + 1/3 + 1/4 plus da da plus 1 over k which is equal to lawn k plus up up to some competitive constant and also any randomized [Music] scheme has competitive ratio which is at least omega log k.

[`1:16:43`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4603) So probably start trying to say something about this but oh how convenient I boxed that. Okay so the alg I didn't say what the algorithm is they call it the mark algorithm marking algorithm. Okay. And it's going to be a very it's going to be one bit LRU. But what do you think we're going to do to one bit LU? Randomly what?

[`1:17:17`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4637) Randomly evict. Yes. I'll just swap the two order the two words. Evict a random unmarked page. Yeah. Well, maybe they mean the same thing. I just want to make sure I'm uh Yeah. Okay. Good. So, right. So one bit LRU doesn't specify how to evict the unmarked page. LRU did it according to being least recently used. Mark the marking algorithm is going to choose a random unmarked page.

[`1:17:44`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4664) The mark marking algorithm, I'll just call it M from now on. Evict an unmarked page in one bit. LRU chosen uniformly at random. Okay. And how does this go? So the the claim is that M is 2 HK competitive.

[`1:18:36`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4716) Okay. Now first of all I guess I should probably define what I mean by competitive ratio for a randomized algorithm. Okay. Let me just define that. So definition a randomized algorithm A, let me not put A twice. Randomized algorithm A is R competitive.

[`1:19:15`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4755) If for all sequences S, the expected cost of A on S is at most R times the cost of opt on S. plus a constant. Okay, that's what I mean. So, how's the analysis go? I have some number of minutes. Um, I think it's short enough that it's possible.

[`1:19:57`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4797) So, proof of claim or all these start Okay. So maybe I'll just sketch how the proof will go. Let So we'll So again, there are these phases. A phase starts when we unmark everything and bring in the new guy and it a phase ends when it it's about to happen again. Okay.

[`1:20:38`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4838) So we'll break the access sequence into phases. Within a phase, we'll call a page clean. If so, let me not say within a phase, but at a given point. So at a given point in time at a point in time page is clean if it was not accessed in the last phase and also not yet in this phase.

[`1:21:53`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4913) Page stale. Page stale on the other hand if accessed last phase but not yet this phase. And the thing we're going to actually show we'll show that if there are I will show that if there are L clean accesses in a phase then opt pays at least L over2.

[`1:23:14`](https://www.youtube.com/watch?v=aHW6HKVC-SY&t=4994) do and uh Mark or M pays at most to LHK in expectation. And then when you sum up over phases, you get that uh Mark will be HK competitive. I slightly am lying because there's going to be something that has to be added and subtracted here, but it's going to telescope over all the phases. So, this is really the thing that's going to matter. But, um, we'll see that next time, I guess.
