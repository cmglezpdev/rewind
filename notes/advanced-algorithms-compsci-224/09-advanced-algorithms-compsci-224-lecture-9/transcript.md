# Advanced Algorithms (COMPSCI 224), Lecture 9

*Harvard University · 1:24:56 · https://www.youtube.com/watch?v=KBVkri8k3Ao*

[`0:05`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=5) okay let's get started um so today I want to actually show you the uh details of the analysis of the mark algorithm um that's the randomized algorithm for paging which gets log K competitive ratio where K is the size of the Cache can people hear me yeah I do I have a scribe for today okay good um and then I want to show you you um kind of a generic framework for analyzing uh online analyzing and coming up with online

[`0:40`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=40) algorithms um based on this this Primal dual framework as it's called this is something that was developed by uh bookbinder and naor I guess in 2005 okay so today we're going to see uh 2 HK competitiveness for randomized

[`1:11`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=71) paging this is the mark algorithm we'll also see uh online Primal duel and as an example of of how you use this to develop good online algorithms I will show you again the ski rental problem so remember last time we saw for the SK rental problem you can get a to competitive algorithm okay um I'll I'll reshow you that same algorithm but in this Primal dual language which I haven't defined yet okay that's just an exercise to get you comfortable with the language and then I'll show you that you can actually beat the ratio two okay if you allow yourself to be randomized so you can actually get a Rand competitive ratio of e over e minus one if you use a randomized algorithm okay and that's um

[`2:09`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=129) that that result is not due to Big binder and no it was already known before by Carlin and others but um it falls out more naturally from the Primal dual framework and then we'll also see so we'll see here e over e minus one competitive

[`2:26`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=146) ratio and we'll also see um online set cover so there there are these M sets but in the beginning you don't know what items are in the sets you just know their names they're set one set two up to set M and online you see an item you see the items one by one and when you see an item

[`2:52`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=172) um you have to make sure it's covered okay so if it's not already covered by one of the sets that you chose then you need to pick a set and cover it okay and at the end of the day you want to compare yourself to opt

[`3:05`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=185) so um I'll maybe say a few words about set cover before I give that analysis but I hope who here has seen set cover I covered it in cs124 who has not seen set cover okay so I I will Define uh I will Define the problem okay who here has another thing so this is also something in 124 which I'll do a very brief recap but who has seen linear programming

[`3:30`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=210) okay who has who has not seen linear programming who doesn't know what a linear program is okay so um I'll give a very brief introduction you know so this whole online Primal dual thing uh is built around linear programming

[`3:51`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=231) okay so linear programming formulations of problems so I will say a few words about LPS before I get into that but uh it you need to so it's it's all about LPS okay so the mark algorithm uh this algorithm is due to Fiat and

[`4:18`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=258) others Journal of algorithms uh I think 91 okay okay so remember how this works this is a particular implementation of the one bit lru from last time but where when we when we evict an unmarked page we choose an unmarked page uniformly at random from the set of all unmarked pages okay

[`4:47`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=287) so initially all pages are marked okay when uh we when we bring page P into cache we're going to evict a uniformly random unmark page then um mark p now it may happen that eventually all the pages are

[`5:33`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=333) marked if all the pages are marked so there's no unmarked page to evict unmark all of them and we'd like to say that the expected comp the the competitive ratio of this randomized algorithm is two times the Ki harmonic number remember this number here is 1 + 1 12 plus 1/3

[`6:02`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=362) plus dot dot plus 1 over K which is natural log of K up to a constant okay so you can see this by comparing the sum to integrals in both directions yeah say that again very yeah unmarked thank

[`6:23`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=383) you although to be honest it doesn't really matter in the beginning yeah because you just unmark them all so um okay and if all the pages are marked during a request request then outside of cash okay so the way that we are going to analyze this algorithm and I I think I I started saying this at the end of last lecture but I didn't get to actually prove anything is we're going to divide time into phases okay

[`7:00`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=420) a phase starts when we unmark all pages and a phase ends when all the pages are marked and someone is just about to make a request to a page outside the cache so we're about to unmark all the pages and start a new phase again okay

[`7:16`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=436) so analysis will divide time into phases a phase starts when we unmark our new phase starts when we unmark all pages okay and I think I defined two terms that are going to be used in the proof at the end of last lecture but I'll remind you so

[`7:56`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=476) definitions Okay so a page is clean and let me call the you know I don't want to write Mark all the time so for for me m is the mark algorithm algorithm m is Mark so a page let's say a page p is

[`8:23`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=503) clean if P wasn't requested so being clean is a is also uh time sensitive you're clean at a particular time so a page p is clean at a particular time if P wasn't requested in the previous phase and not yet

[`8:51`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=531) requested this phase okay and another kind of pages that we're going to look at is a stale page a page is stale if it was requested last phase but not yet this phase okay so you know except for maybe the last phase how many distinct pages are requested in a

[`9:33`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=573) phase okay okay so let's let's give us let's uh let's introduce some variables so let L be number of clean or let's say Li the number of clean Pages requested in Phase I and let I can call it si be number of stale

[`10:06`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=606) Pages requested in Phase I and we know that SI is just equal to K minus Li I okay as you just said so we're going to introduce some more notation okay um so we need to compare opt against M against the mark algorithm

[`10:30`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=630) and we're going to do it phase by phase okay so we're going to say that phase by phase the gap between them is a factor of 2 * h subk plus some stuff that telescopes okay across phases so more

[`10:48`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=648) notation uh let D be the number of pages let me make sure I don't mislead you in opt memory let's say di di is a number of pages in opt memory at beginning of phase I which aren't in mark oh marks memory Mark cache I've been saying cache let me be

[`11:35`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=695) consistent okay so this is some non- negative number and let uh di Prime be the number of pages uh at the end of phase I right so in particular di Prime is just d sub I + 1 okay interrupt me if you have any

[`12:13`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=733) questions so what we will show opt pays at least uh I think I want to say2 L uh plus plus di Prime minus di in Phase I that's the number of Misses cache misses that opt has and two expected

[`13:00`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=780) cost of Mark in Phase I will be at most uh HK * L okay and it will follow from this y so one implies over whole sequence opt pays uh let's say the sum over I well l/2 plus this is just di + 1 minus

[`13:53`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=833) di so this is just the sum over I of L well let's say Li I Li over two plus D final minus D initial so what you know what's D initial I didn't say it but zero right so I'm

[`14:17`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=857) assuming I'm assuming that op that everyone starts with the same contents of cach in the beginning otherwise there's no hope to be competitive because optim might start with all the things you're about to ask for and you start with none of the things that you're about to ask for right so we're assuming that they start with the same things in memory which means that initially there are there is no difference so opay is at least this this is positive so this is certainly at least the sum over i l i over

[`14:49`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=889) two sorry say it again yeah yeah thank you whereas this is paying HK times the sum of Li so the fact you know the Gap is a factor of two times HK okay and uh in that paper by Fiat at all there's a lower bound which says that no randomized algorithm can do better than

[`15:23`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=923) HK okay um so you could ask well is HK achievable and in fact it is um there's a paper by I'll write it at the end of this by Mok and Slater two names we've already seen that gave an HK competitive algorithm which they called the partitioning algorithm I'm not going to cover it and afterward there was a simp a another simpler algorithm given by ocopus at all that also achieved HK competitive ratio okay so I'm not going to uh go into either of those um but

[`15:55`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=955) I'll insert that into the references of the elector notes okay so one okay so proof will show that op pays actually the max of Li minus Di and Di Prime okay and the max is certainly at least the

[`16:32`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=992) average that's where we lose the factor of two okay so why does it pay at least Li minus di well I mean it's almost uh immediate from the definitions right so remember the mark algorithm doesn't have any of these clean pages in its cache at the beginning of the phase right so for each of these clean requests the mark algorithm has to bring it in to service the request whereas how many of these clean Pages can opt possibly have in its cach at the beginning well di because it only differs on

[`17:21`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1041) di right so opt only has at most di clean Pages at the beginning of phase and why do you why does OP to pay at least di Prime that's also something simple okay so so tell me at the end of a phase

[`17:59`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1079) describe to me you know what are the pages that Mark has in its cache at the end of a phase yeah the set of pages that were requested in that phase right and you're telling me that opt doesn't have exactly that set of pages in its cache it has some uh there's some difference it has some di Prime pages besides the pages that requested in that phase okay so it's essentially operating on a cache

[`18:36`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1116) um well that means that for Di Prime of those requested Pages there had to have been an eviction okay so at the end of phase Mark has the set of pages requested in that phase in its cache right so and opt also had to bring those pages in right so if there are any differences from that it's because there was an

[`19:22`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1162) eviction okay so any of opts uh D Prime differing D Prime I differing Pages uh corresponds to eviction okay good how about two okay so there are two types of requests that I'm going to look at which are clean ones and stale

[`20:08`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1208) ones okay in fact those are the only kinds of requests which can cause an eviction for the mark algorithm right only clean and stale requests cause eviction for Mark right because if you've if you have if you've already what does it mean to not be cleaner stale it means you've already been requested in that phase which means Mark already has you in its cach and you won't be a cash

[`20:49`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1249) Miss so Mark pays how much how many evictions are there for clean pages in The the mark algorithm Li Mark pays Li misses for clean requests right I mean clean means it's it wasn't asked in the previous phase which means that market doesn't have it in its cache so it has to evict something to make room for

[`21:18`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1278) it so now you know we haven't said anything about Randomness yet now we're going to talk about um what happens with with uh stale requests okay so uh there are okay so let's say let's say we have had s stale

[`21:56`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1316) requests and C clean requests so far so we're to point in time we've had this many requests so far in the current phase and we're about to make the next stale request okay so what is cash look like

[`22:42`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1362) so so let's let me draw M's cache says size K so how many of those clean pages are in the cache all of them right so nothing that's been requested in this phase is kicked out so this is all

[`23:12`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1392) taken C clean ones are taking up spots in cash also the same things uh is true for the sale requests that have happened already right those S guys are also in cash now EST still so what can you tell me about what kinds of pages are

[`23:51`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1431) these the pages that are left here they're stale exactly they've been requested in the previous phase but not yet in this phase they're stale okay and what can you tell me about right so remember when these things are brought in random things are evicted so this is a random

[`24:14`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1454) set of stale pages that still exist right okay so this is a random set random subset of the remaining stale pages and what's its size well its size is just whatever's left K minus s minus C okay so probability that uh so the expected cost

[`24:59`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1499) of this new stale request is just the probability that this page hasn't been kept which is equal to one minus the probability that has been kept and and what's this well initially at the very beginning of the phase there were K stale

[`25:34`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1534) pages right all the pages from the last phase so what's the chance that our one page is one of the K minus s minus C pages that are left this is just K minus s um I feel like

[`25:50`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1550) I am not saying the right thing so I want to say the page that has been kept the problem that it's been kept is um Okay s- C over K but that doesn't sound right to me so I seem to have said to myself that this sh this thing should be uh C over K minus s

[`27:25`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1645) okay sorry say it again yeah yeah it's exact okay good yeah so okay good so there there have been s stale requests which means there are K minus s stale pages that still remain okay and so the question is what's the probability that one of these C clean requests clobbered me and that's C over K minus s okay good I'm not going completely crazy

[`27:57`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1677) okay which is certainly at most uh let's call it l * 1 Kus s okay okay good and remember now s the number of stale requests we said was K minus Li so s is ranging from zero up to K minus lius one

[`28:30`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1710) right let me just write that here before I start a new thing so expected cost of all stale request is equal to or is at most L times the sum going from s from 0 to K minus Li

[`28:54`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1734) -1 of 1 / K minus SI which is exactly uh the sum L times the sum from uh J going from so it starts at Li minus one Li I + one right up to K of one over J

[`29:28`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1768) right so when s is zero this is one over K this is s when s is zero this is one over K when it's this it's Li + one and this is exactly equal to the L times the K harmonic

[`29:43`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1783) number minus the uh Li plus first harmonic number or the LI harmonic number okay which is certainly at most this is Li Li which is certainly at most uh Li HK minus Li so that cancels that and the total cost in a phase is exactly Li *

[`30:25`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1825) HK okay questions okay so I'll say something about you know um maybe an open problem there are final projects in this class so I'll say something about that and also you know things that I've been done since then and then I want to move into this Primal duel

[`31:19`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1879) stuff oh and maybe I also want to show you why you can't do better than I won't get the right constant but why can't you do better than log K okay why can't you do better than a log K competitive

[`31:33`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1893) ratio let me say something about that it was also in the Fiat at all paper so theorem any Al has competitive ratio Omega log K okay proof let the number of P es in the universe be k+ one okay

[`32:11`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1931) and our request sequence is uniformly at random length M Okay so what's the expected cost of any algorithm sorry for the to serve the entire sequence so we have the sequence of length M at every step the request is a totally random page from one up to k+ one

[`32:59`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=1979) sorry M what uh I like what you said except for the Times K so the I claim right the expected cost of any algorithm is exactly M over k + one right when a new page comes I have to pay any EV vition if that's not one of the pages I'm holding but it's a uniformly random page out of K plus one Pages I'm only holding K of them so the problem that I don't have this page is exactly one over k+

[`33:31`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2011) one meanwhile opt right opt even though it's a random sequence opt gets to see the entire random sequence from the beginning okay opt gets to see the entire random sequence from the beginning or may okay maybe maybe the right way to think about this is what I really showed is that um for any algorithm no matter what your algorithm is there exists a sequence a request sequence of length

[`34:11`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2051) M such that your algorithm will pay this on that sequence right so this is there's actually one sequence which will trip up your algorithm in particular a random sequence is expected to so there exists a sequence which will okay so that's what this means there is a there for any algorithm there is a sequence which will trip up your algorithm and make it pay this a length them sequence meanwhile I claim that no matter I I claim

[`34:38`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2078) that for this random sequence op doesn't pay that much why so let's say that opt now has an eviction right so what what is what is op going to evict I mean uh I claim that the Min algorithm was was optimal you don't even need to know that it's optimal but consider the algorithm which evicts the thing farthest in the future okay so it has something that it needs to evict it's going to evict the thing farthest in the future what has to happen for me to see that that page in the

[`35:16`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2116) future every other page had to have been requested before that page so the question is if I'm picking random numbers between 1 and k+ one how long does it take me to see every single number which is known as the balls and bins problem I'm not going to analyze it but you need K log K basically K log K numbers in order to see everything that's called the coupon collector problem okay

[`35:43`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2143) so when op evicts when op evicts a page op evicts a page P it doesn't fault again until p is seen again if we evict the farthest in the future that implies that all other pages were seen before

[`36:33`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2193) P okay and the expected time to see all numbers in the set one up to k + one is Theta K log k okay so you can view this as saying any algorithm will fault at least a one k fraction of the

[`37:07`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2227) time opt only fults a one over K log K fraction of the time right so opt is better than you by a factor of log K okay if you if you're uncomfortable with the fact that the sequence is random look you can say

[`37:32`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2252) um the expected cost is at most this so in fact 2third of random sequences will make you cost um at most 3M over uh or let me say like this uh expected cost of any algorithm is that well let me okay let

[`37:53`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2273) me you need to be a little more careful but basically the point is you could try give a concentration argument and say that there actually a good fraction of pages that make you cost around this and they a good fraction of pages for which sequences for which this is true a good a good fraction of sequences make you pay around this a good fraction of sequences make you do this so there's something in the

[`38:15`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2295) intersection anyway that's all I wanted to say about analysis for randomized paging and I did mention that in what you know what's what's after this um there's M Mok and Slater in algorithmica 91 achieved competitive ratio exactly HK as opposed to 2 HK and there was a simplification later in ocopus at

[`39:14`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2354) all both a different algorithm and a simpler analysis uh that was theoretical computer science in 2000 one other thing which as far as I could tell seems to be open that I can't um yeah papers didn't mention it as being an open problem but I couldn't find any any reference which actually solved it uh which is

[`39:53`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2393) suppose suppose opt has cach of size H whereas you have a size of cach K so remember with lru I said lru is K competitive but I didn't prove it if you have a cache of size K and opt has a size of cache H then lru is actually K Over K minus H plus1

[`40:16`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2416) competitive okay which means if the cash if the opt has half the cash to work with then you're only too then you're too competitive okay so you could ask the same thing for for you know the randomized setting so if opt has a cach of size H

[`40:35`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2435) then Neil Young in soda of soda of uh 91 I believe showed you can get uh 2hk over actually what's the exact bound two laon car yeah two lawn 2 * lwn of K Over Kus H + 1

[`41:13`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2473) competitive and he also showed that uh getting competitive ratio better than lawn of K Over K minus H +1 is impossible right so when when H equals K that's what we just covered when H equals K that gap of two has been closed by m Mok and Slater but when you introduce this resource augmentation point of view resource augmentation is the phrase or the jargon that's used uh for you have a cach of size K and opt as a cach of size H okay under resource

[`41:48`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2508) augmentation uh it seemed like that gap of two has not been closed because in fact Young's paper CES this paper so it came after it he knew that the gap of two was closed there he even mentions it but he has the gap of two in his own paper so um it seems like an open problem as far as I'm

[`42:10`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2530) aware okay [Music] um I'm not really going to get into it but paging is actually a special case of a more General problem called the case over problem so paging is a special case of What's called the case server

[`42:38`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2558) problem which itself has um quite a long history and uh some big open problems so the idea is the the idea here is your algorithm controls K servers and also there are endpoints there is an endpoint uh metric

[`43:14`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2594) space okay just think they're end points in a distance function okay a so request sequence is a sequence called the symmetric Space X is a sequence of points in X and when someone requests a point p in this

[`43:48`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2628) space must move you must move a server to lie on P okay so your K servers are always living on some K points okay and then when someone requests a point if if a server is already on that point you don't have to do anything if a server is not on that point you have to choose which server to move there and move it and what do you pay you pay the distance right if it's already at some point q and you're moving it to P you pay the distance from Q to

[`44:22`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2662) P okay so and you want to compare yourself to opt okay um so 2K minus one competitive deterministically is known this is due to um Papa demitro and did I not write it down this called the work function

[`44:56`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2696) algorithm maybe I didn't write the reference this is kupas and Papa demitro and this was in uh jcm 95 and it's known that you cannot beat K competitive with a deterministic algorithm so the there's a factor of two there which has been open since you know back in the day this is the journal version the conference version was even earlier so getting rid of that factor of two has been open for more than 20 years so you could ask again can we do better than K or Theta K with a randomized algorithm

[`45:58`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2758) so an open question is to get a randomized algorithm with competitive ratio uh poly log K in fact I think people believe that the right answer should be log K just like for paging okay and there was quite a big breakthrough in this area very recently recently um where they didn't get polylog K but they got polylog K poly log n

[`46:34`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2794) so bonsol book bender majy and na or this was just in 2011 they achieved ratio which is uh log k s log n cubed log log n okay so it has a dependence on N but people believe that there should not be any dependence on N you should be able to just get poly log K of course you can get a dependence on K independent of

[`47:16`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2836) n but you know it's there's that K I think I think randomized you might be able to beat that um but still it's not anywhere near poly log and I don't know all the details of this but I I'm I'm I'm fairly sure that it uses the Primal dual framework of bookbinder not where I'm about to tell

[`47:44`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2864) you oh and um people see why this is a generalization of paging so the end points are your pages what's the what's the metric what's the distance between two points it's one all the distances are one okay um another General another thing more General than simply paging but uh less General than kerver is weighted paging so the idea is not all pages are created equal okay so some pages live on the network at some other machine and you have to pay a lot to like bring them over the network whereas some as are some are in your local memory and bringing them into caches faster so p have weights and you can look at weighted paging okay where to bring a page into cash costs its weight

[`48:33`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2913) and that's also a generalization of I mean that's also a special case of K server so what are what's the distance between two points p and Q in weighted paging the difference in weights so at the end of the day I'm going to pay the sum of all distances

[`48:58`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2938) so it's actually the average of the weights you can set it up to be WP plus WQ over two right so when you sum all the moves the over twoos add together and you get WP I guess except for the very last uh thing but you can sort of augment the problem so that you always move somewhere that's uh you always start somewhere with weight zero and end somewhere with weight zero let's say

[`49:23`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2963) okay okay good and that that also definitely uses um the Primal dual framework that was done by uh bonsol bookbinder and now in Fox 2007 they get a log K competitive ratio for weighted paging okay okay good so let me now go to Primal

[`49:48`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=2988) duel so the online Primal dual framework so Primal duel you know in the context of just algorithm design especially you know approximation algorithms is much older than bookbinder now or but the application of it to the online setting to get good bounds on competitive ratios I believe is due to bookbinder n or this is bookbinder n

[`50:20`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3020) or in um and well the journal version is an 09 I I think it's math something rather uh some operations research Journal well definitely the conference version is isa5 I'm forgetting the journal version okay and before I talk to you about the Primal dual framework I need to explain you know remind you about linear

[`50:45`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3045) programming okay so first off we need a linear programming recap I'm going to call LP for me stands for linear programming or or linear program depending on context so we want to an LP looks like minimize a linear function of

[`51:18`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3078) X so c dox c is a vector X is a vector subject to some linear constraints subject to ax is less than or equal to B A is a matrix X and B are vectors and X is non-

[`51:45`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3105) negative coordinate wise component wise that's right so in fact I'm not going to do it but in fact uh you know could say you could imagine different kinds of constraints here like some some of the components you want it to be less than or equal some you want greater than or equal some you want

[`52:05`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3125) equality um you could imagine also not having this non- negativity constraint that would be a more General class of LPS okay but in fact any any uh program with linear constraints can be converted to this form by introducing possibly some number of new variables so okay so

[`52:24`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3144) um maybe I'll put that in the homework I I don't know but uh so for me this is an LP okay and their framework works for what's called covering and packing LPS so we say an LP is a

[`52:54`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3174) covering LP if all entries of a B and C are non- negative okay and how many people have seen LP Duality or know what what a dual means in LPS okay how many people have not seen LP duality

[`53:27`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3207) okay so some people have not seen it okay so let me let me now uh give you a little uh I don't want to just Define The Duel I want to motivate it so corresponding to any LP there's another LP called the Dual

[`53:46`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3226) LP okay and how you know what is Duality all about so basically so here I'm solving for x I want to minimize overx this is overx not cover X now suppose I want I want to say that I want a I want a lower bound on the minimum I want to say that no matter how you choose X I promise you that you cannot minimize you cannot make C transpose X smaller than something I want to get the best lower bound I can on cpose X where X has to satisfy these

[`54:28`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3268) constraints what's a systematic way of proving to me that you cannot do better than than this so let's let's write this out so we have our LP which says we want to minimize the sum over I of cixi such

[`54:45`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3285) that let me write it as CJ XJ such that for I going from one up to m so remember so think of a as being an an M byn Matrix so here we have a being the Matrix a i j where I goes from one to M

[`55:08`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3308) and J goes from one up to n we have that for all I the sum sorry I meant to say this is at least B at least for the way I want to uh phrase it okay I mean I I mentioned in LPS it's equivalent you could always just you could always just uh multiply both sides by minus

[`55:38`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3338) one but um I'm putting all LPS in this form and then I say that it's a covering LP if this is true okay so for all for all rows of a I want to make sure that the dotproduct of the I throw of a with X is at least bi so the sum over J from 1 to n of a i j

[`56:02`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3362) XJ has to be at least bi and also for all I XI is at least or for all J XJ is at least zero okay now I want to prove to you that um you cannot minimize this Beyond a certain threshold so what's one way to do it one way to do

[`56:30`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3390) it is to multiply both sides of inquality I by some value Yi right as long as Yi as long as Yi is non- negative this the direction of this inequality doesn't change right now furthermore there's going to be one such Yi for every inequality and then I want to add up all these inequalities over all

[`57:12`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3432) I okay when I add up these inequalities over all I I have on the left hand side I have some linear combination of the X's right okay so so suppose I introduced this y so I'm saying now that is basically so if I sum them up overall eyes that means y

[`57:58`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3478) transpose ax is at least Y transpose B where I have as before X is bigger than equal to Z coordinate y's and also Y is bigger than equal to zero as long as Y is bigger than equal to Zer I don't change the sign of the

[`58:21`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3501) inequality now this what is this this is some dot product with the X Vector this is equal to um a transpose y transpose X right so what I've just shown is that this implies that a transpose y transpose X is at least Y transpose

[`59:06`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3546) B wouldn't it be great if this Vector in here if a transpose y wouldn't it be great if that were equal to C then I would have just proven to you that no matter what you do with your x no matter how you choose x c transpose X will be at least Y transpose B I've Pro I've proven a lower bound on how well you can minimize

[`59:34`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3574) this right so in fact it doesn't even need to be equal to C but suppose that I show you that a transpose y is at most C coordinate wise that would also prove a lower bound because X is non- negative so if a transpose if a transpose Y dox is is is Big then c.x definitely is also

[`1:00:00`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3600) big so that gives rise to what I'll call the Dual linear program which is try to find the best lower bound you possibly can this is the lower bound so the duel looks like you want to maximize your lower bound over y maximize B transpose y sub

[`1:00:22`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3622) to a transpose Y is is at most C and Y is at least zero okay and by the way if a b and uh C are all bigger than to zero this is called in the literature this is called a packing LP

[`1:01:00`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3660) okay so the Dual of a covering LP is a packing LP so theorem this is called the weak Duality theorem it says says that if opt p is the Min value possible in this is called the Primal so this is called the Primal that's called The Duel if op p is the Min value possible in the

[`1:01:48`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3708) Primal and opt duel is the Min value possible in the duel what's the inequality that we've just proven how can you relate op P to OPD upd is a lower bound of up P that's exactly how we Define The Duel The Duel is a way of getting lower bounds on the

[`1:02:21`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3741) Primal then up B is at least opt D this is called weak Duality yeah Max I got a little carried away with h carries okay so good so the way the on the uh Primal dual framework is going to work for us is we're going to write down an LP to capture whatever we're trying to minimize so for ski rental minimize the number of dollars you spend okay and as I'm going to show you every day when uh you decide to either rent or buy a new constraint is going to be introduced into the lp and you have to make sure kind of online that these constraints are

[`1:03:27`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3807) satisfied okay and you're going to do it in such a way that you kind of work with the Primal and The Duel at the same time and you compare your Primal solution with the duel okay so uh if that sounds vague it will be less vague very

[`1:03:44`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3824) soon there's also something called strong Duality um which says that in fact as long as these things are finite they're bounded then um the Primal actually equals opt P actually equals OPD we're not going to need that today okay but uh we might see it again

[`1:04:19`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3859) later so ski rental and let's say that it lasts for K days okay and let's say renting costs $1 buying costs B so what do we want to do so X is going to be in 01 did we and it's going to tell us did we buy the skis and Z is going to be in

[`1:05:10`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3910) 01 and uh did we rent on dayi so what we want to do is we want to so the lp looks like this we want to minimize well BX plus the sum I from 1 to K of Z subject

[`1:05:40`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3940) to for all I from 1 to K we either had to have bought or had rented that day X Plus Z I had better be at least one and you know to fully capture the problem we need these integrality constraints Z is either zero or One X is either zero or one those kinds of constraints are not allowed in an LP so we're going to relax the problem so it won't exactly capture the problem and we're just going to say look X is going to be

[`1:06:16`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=3976) um at least zero and for all i z is at least zero okay what do you know it's a covering LP okay and the Dual okay so as we saw there's a mechanical way of converting the Primal to the Dual right the right hand side becomes the the cost and the a transposed Etc um I'll just do it for you so you want to

[`1:07:01`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4021) maximize the sum I from 1 to K of Yi subject to the sum from I from 1 to K of Yi should be at most B and Y is bigger than or equal to zero I believe that's it

[`1:07:32`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4052) also why is at most one so for all I Yi is at most one and Y is at least zero so this is a this is our packing LP okay and before I give you a primal dual approach

[`1:07:56`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4076) to the ski rental problem which it's going to be Overkill just to get a two competitive ratio because uh we saw that was pretty simple but you know if you want to get e over e minus one yeah yeah yeah we that's correct so I mean uh the

[`1:08:23`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4103) lp the lp doesn't capture time right you don't know like yeah I mean it doesn't capture when did you actually buy it okay but the way that the way that you should think about this is we the algorithm see constraints we see rows of a online and whenever a row of a comes we have to make sure it's satisfied

[`1:08:51`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4131) immediately okay and then after we do that the next row of a will come not a new LP but just new rows of a so we keep seeing more and more rows of a and as a new row of a comes we have to set some variables to um to make sure the constraint satisfied so let me write that down

[`1:09:12`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4152) so we see rows of a online and have to satisfy constraints online now what does that mean if you're allowed to change things arbitrarily because I could just resolve the lp at every step right There's a constraint though which is

[`1:09:38`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4178) um our variable uh throughout the uh request sequence start at zero and are monotonically non-decreasing okay because I don't want to say that you can choose to rent you know you set Z to one on the I day and then you know way in the future you're like oh I really should have bought and then I'll just change the I back to zero and actually set X to one okay so the variables are monoton ically non decreasing so meaning that once you choose to buy once you choose to buy once you set X to one you've bought it

[`1:10:32`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4232) okay once you choose zi to be one you've rented you cannot undo what you did in the past as we're going to see though so here these don't need to be integers right these could be fractions as we're going to see to get this e over e minus one competitive algorithm it's G to you know we're going to have to abuse the fact that

[`1:10:52`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4252) um we're going to set uh these things to fractions okay and uh but going back to the original ski rental problem what does it mean to you know rent a half of a ski or a third of a ski for a day we'll show that online you can also convert your fractional solution to an integral one so that it actually makes sense for the problem but you're going to online also maintain a fractional

[`1:11:18`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4278) solution okay so if that isn't if that's not is that so is that clear I guess so you have to maintain you have to maintain a solution to the lp meaning satisfy all the constraints online as you see constraints one by one and on the side you also have to maintain an integral solution which makes sense for the problem at hand okay so you you also have to have something that says like I'm not renting a tenth of a

[`1:11:50`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4310) ski but we're gonna usually the way you do that is you figure out a way to solve the fractional problem online and then once you do that you show that actually uh if I have this fractional Solution on maintaining online then it's possible to also maintain uh an integral solution online that doesn't do that much

[`1:12:14`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4334) worse this is non decreasing so I need Lemma which is called approximate complimentary slackness which says so remember what primals and Duels look like I guess I erased the Primal so let me write the Primal here the Primal

[`1:12:53`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4373) says minimize C transpose X subject to ax is at least B and X is at least zero so approximate complimentary slackness says the following let X Y be solutions to the Primal and the Dual R Primal and the Dual

[`1:13:29`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4409) respectively okay Suppose there exists Alpha and beta such that for all I if XI is greater than zero uh then what do we know we know that we we know that a transpose we know that a transpose the iow doy is certainly at most

[`1:14:05`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4445) CI okay but suppose it's also at least CI over Alpha so be feasible so just to be clear X is a feasible solution to the Primal which means it doesn't necessarily achieve the minimum but it satisfies all the constraints Y is also feasible for the duel so it's not necessarily optimal but it satisfies all the constraints so suppose X and Y are feasible solutions to the Primal and duel such that we can say the following if XI is bigger than zero then not only is the I constraint satisfied in the duel but it's pretty well

[`1:14:53`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4493) satisfied so Alpha and beta are bigger than equal bigger than bigger than zero and also for all I if Yi is bigger than zero then not only is ai doxi ai dox bigger than equal to bi but it's also at most beta times bi

[`1:15:32`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4532) then cpose X is at most Alpha Time beta * B transpose y okay so proving this will probably be in the homework it's just manipulation of definitions it's not really uh there's not really much there's not really much

[`1:16:06`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4566) uh craziness going on in there okay but what it tells you is that if you're able to construct feasible solutions to both both the Primal and the Dual that satisfies some properties then you're able to say something about how how good of a solution X is remember you want to minimize cpose X right so if you're able to compute X and Y satisfying this then you know that the cpose X you've got is at most Alpha Beta time B transpose Y and why is that nice that's nice because we know that opt of the

[`1:16:44`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4604) Dual is at most opt of the Primal which is at most cpose X right X is a feasible solution so op of the Primal at most he transpose X and I'm telling you that that's at most um Alpha

[`1:17:11`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4631) Beta Alpha Beta times B transpose y right so remember opt is a maxim the Dual is a maximization problem so certainly opt of the duel is at least be transpose y right so what do you know opt of the duel is bigger than or equal to

[`1:17:39`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4659) uh opt of the Primal is bigger than equal to B transpose Y which means this is at most Alpha Beta of op of the Primal right I just basically I just just multiplied Alpha Beta by both these sides of the

[`1:17:58`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4678) inequality and lo and behold cpose X is at most Alpha Beta times opt right so if you can construct what this is telling you is that if you can construct feasible solutions to the Primal and the duel that satisfy these uh complimentary slackness

[`1:18:16`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4696) conditions then you know that the x that you found is close to opt it does almost as well as opt up to this Al beta okay so it looks a little technical but the point of this is to get some control on how well you're doing when compared to

[`1:18:50`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4730) opt okay so now what's going to be our primal dual algorithm for uh to get a two competitive ratio for ski rental this look this sounds like a real Overkill but I promise you will reap some benefits uh for harder

[`1:19:06`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4746) problems okay so so Primal duel to competitive algorithm for ski rental so remember we see the constraints come at us one at a time so we see a new constraint that looks like this when constraint X Plus Z is at least one

[`1:19:46`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4786) arrives do nothing if already satisfied otherwise if it's not already satisfied otherwise notice that when you go from the Primal to the Dual every constraint in the Primal becomes a variable in the Dual okay so there are K constraints

[`1:20:19`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4819) here right for I equals 1 to K and each one of these constraints corresponds to a Yi so what we're going to do is otherwise increase Yi until some dual constraint becomes tight what dual constraint can become tight either Yi can become

[`1:20:49`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4849) one or this sum can equal B okay okay and then what do we do then set and now again constraints here correspond to Vari variables there so some constraint became tight which corresponds to some variable in the Primal we're going to set that variable to one what does that actually mean here

[`1:21:25`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4885) these constraints Yi at most one correspond to the Z eyes in the Primal so if this constraint became tight if Yi actually became one we'll set Z to one if this constraint became tight we'll set X to one so then set

[`1:21:48`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4908) corresponding variable in the primal to one okay and then definitely at the end of the day we have integral Solutions okay for the Primal which are feasible and we have a solution to the Dual which is feasible right because we don't go beyond the constraint being tight so we definitely we're set we're not violating any constraints

[`1:22:26`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4946) so at the end we have pair of feasible solutions for the Primal in the duel okay so now I want to say we satisfy certain approximate complimentary selness conditions so we have to look at what happens if we have a positive Primal variable what's how much are we off by what happens if we have a positive dual variable strictly positive how much are we off by here well let's look at the variables in the Primal what if X is bigger than

[`1:23:09`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=4989) zero If X is bigger than zero that means that at some point this constraint became tight okay so if X is bigger than zero this constraint is exactly tight there's no slack right which corresponds to Alpha being one if Z is bigger than

[`1:23:33`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=5013) zero that means also this constraint is exactly tight y equals 1 which again corresponds to Alpha being one how about in The Duel what if Yi is bigger than zero strictly bigger than zero if Yi is strictly big bigger than zero all I know is that well X Plus Z is certainly at least one we're going to set one of them to one but we might end up setting both of them to one so it's certainly at most

[`1:24:01`](https://www.youtube.com/watch?v=KBVkri8k3Ao&t=5041) two so Alpha is one and beta is two okay so next so we're out of time next time we'll get a little bit fancier and show how to get this e over e minus one with a randomized algorithm and we'll do online set cover
