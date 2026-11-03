# Advanced Algorithms (COMPSCI 224), Lecture 20

*Harvard University · 1:23:37 · https://www.youtube.com/watch?v=TdTFYVjzs1I*

[`0:19`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=19) Okay, so today we're going to finish multiplicative weights. I just want to show you how you would apply it to linear programming to solve linear programs or approximately solve them. Um and then after that we're going to switch into a new topic, namely flows. We're

[`0:36`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=36) So Um so right now I'm going to talk about Oh, and someone Yeah, so Eric just asked me uh when you're going to get Are you going to get feedback for uh your project proposals? Yes, you will. So I I think I should be done maybe by the end of Sunday. Like Like end of the weekend, let's say.

[`0:57`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=57) Okay, so I'll I'm looking through those to give people feedback. Okay. Um Good. So applying multiplicative weights uh to let's say LPs. Okay, so let's just remember the the theorem from last time. So theorem We said that if you

[`1:22`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=82) um use multiplicative weights to come up with the probability vectors in each iteration, you get the guarantee that your sum of expected costs over all the days uh so this is M T dot PT So PT is the probability vector you output over the experts in day T. MT is the cost vector on day T. Remember MT, the ith coordinate of MT is the cost of the ith expert um on day T. Okay?

[`1:55`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=115) Uh this quantity is at most the min over all I from 1 to N. So, there are N experts of the sum over T of the cost of that expert on day T. Plus uh, epsilon. So, this is for all for any for any epsilon between 0 and 1/2.

[`2:31`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=151) Epsilon times uh, the sum of MIT absolute value plus uh, yes, log N over epsilon. Okay. That was the theorem from last time. Okay. And remember we assumed that all our costs these these entries of these cost vectors, we assume they're all between -1 and 1. Okay.

[`3:02`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=182) So, in particular, this sum is is over all the days. So, this sum is at most T. So, you could also say this is at most the min over I of sum over T MIT plus epsilon T plus log N over epsilon. Okay.

[`3:22`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=202) And Right, so this is true for all epsilon. So, you can choose you can choose epsilon however you want. As long as T is like say bigger than two log N, for example, you can pick um, you can pick for example, uh, T to be you know, set these two things equal by choosing epsilon appropriately.

[`3:44`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=224) And this thing will be at most the min over I sum over T MIT plus uh, root of log n over T. Okay. So, if you choose epsilon to be root uh log n over T. Is that right? I seem to be off somewhere.

[`4:35`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=275) Sorry? In the definition of epsilon? No, in the square root. Uh here? No, I mean I want to say that if I play for a lot of days, my error goes down, right? I don't think you Well, that's what you get when you change that. Right. Oh, I see. Okay.

[`4:58`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=298) Um All right, then yeah. So, I guess normally people people talk about maybe the average regret, and then that decays like 1 over T, so for example, if you look at the average the average thing here uh the average will go down like uh then I think this is okay.

[`5:25`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=325) So, you'll often hear people talking about talking about like um So, this this quantity here, that the the stuff beyond kind of the optimal bound you want, is called the regret in some literature. So, people talk about trying to minimize regret. So, you'll often hear people talking about the kind of the square root T in loss and regret.

[`5:43`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=343) Okay, so that's where this comes from. It's by a particular choice of epsilon running multiplicative weights. So, okay, good. Um So, now let's uh Let's apply this to LPs. So, LPs I want to have uh So, I want to check feasibility feasibility of X in P and AX is at least B where P is some convex set.

[`6:29`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=389) And uh A is an M by N matrix. Okay. And I want to give a definition. Okay. So, we will be considering uh subproblems of the form um Does there exist an X such that P transpose AX is at least P transpose B for P a probability vector.

[`7:25`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=445) Okay. Uh row-bounded oracle Okay. is an algorithm which when given you know, when given this problem star either Okay. If such an X exists output an X such that um for all I AI.X - BI should be at most row. If no such X exists you know, it outputs infeasible.

[`8:47`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=527) Okay? So, notice that if the actual feasibility problem if this problem is actually feasible then because the entries of P are non-negative um this problem will also always be feasible. Oh, and also P transpose of X should equal should be greater than or equal to P transpose of B and uh X is also in P.

[`9:12`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=552) So, this feasibility problem is what the oracle should decide. Okay? And I just said if that's if that's feasible then certainly this is because take an X which is feasible for this and then just put P transpose on both sides and by non-negativity of P um this inequality will hold.

[`9:35`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=575) Questions? And that first part do you want to Yeah, we assume that the Oracle when given So, the Oracle is given P. The Oracle knows uh well, so it knows capital P, the convex set. It knows A, it knows B, and it knows little P.

[`9:57`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=597) And then it wants to know it want The Oracle will tell you whether or not there exists an X such that this thing is to make this feasible. Ah. Um Oh, I see. Um No, no, no, no. But, this is an absolute value, right? It could be the case that AI.X is less than BI.

[`10:41`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=641) But, the Oracle just guarantees that the the difference in magnitude is small. Yeah. Yeah, so I mean, you're right. So, if I had said that um so, really if I had said, you know, this where row is positive then this would this would have been feasible.

[`11:01`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=661) But, I put absolute values here, so I'm not telling you anything about which one is bigger between these two. Does that make sense? Yeah, so this this X doesn't have to necessarily be feasible for the original problem. More questions? Okay.

[`11:28`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=688) So, Okay, so now I want to tell you that if we had such an oracle then we could we could get an approximate LP solver using multiplicative weights. And uh I'm going to describe that now and then I'll I'll go back to I'll say just a few more sentences afterward about uh the the example I gave last time with set cover to tell you how you could get such an oracle for set cover, for example. Okay. Um good.

[`11:54`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=714) So um Yeah. Okay. But you're saying Okay, so you said add a constraint which what? Which is far away from the feasible region? Okay. Yeah. So wait, so when I say if such X exists if an X exists which is feasible for this for star Yeah. Okay.

[`13:02`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=782) Yeah. Yeah. Yeah. Right. Yeah. Then your row might be terrible. Yeah. So you just get a bad row. Yeah. I mean, so you know, like we're going to end up thinking of this T as being the number of iterations of um the number of iterations of multiplicative weights to get, you know, some good error.

[`13:39`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=819) So, as T gets bigger and bigger, our error in in violating feasibility will shrink. And the number of iterations we need will depend on row. So, in your example, if you know, if you're if you're coming up with a polytope such that the, you know, row has to be very large, means that multiplicative weights will run for more steps. Does that Does that answer your question? Okay, good.

[`14:01`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=841) And any more questions? Yeah. Yeah, so sorry, this This capital P is the convex set. This little P is the probability vector, probability distribution over experts. Yeah, yeah, yeah. So, exactly. It should It should both be in capital P and this inequality should hold. Does that make sense?

[`14:30`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=870) Okay. And notice you know, intuitively this seems Well, this seems like an easier problem than that because this has M constraints and this has one constraint. I mean, aside from the capital P business, right? This is Right, these are These are just These are just numbers. Okay.

[`14:52`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=892) So, good. So, what are we going to do? Uh so, in each So, now let's uh analyze multiplicative weights for um for LP and the theorem is that if we have a row bounded oracle for row bigger than epsilon over two

[`15:41`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=941) then we can uh use multiplicative weights to find X and P such that uh AX is greater than or equal to B minus epsilon times the all ones vector in O of row squared uh row squared D uh row squared, let me think, log N log M over epsilon squared iterations.

[`16:32`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=992) or days T, okay. So, let's see how to do that. So, I'm going to tell you what the actual uh algorithm will be. So, proof. Okay, so what are we doing multiplicative weights on? What are the costs? What are the experts? So, the experts are are the constraints.

[`17:09`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1029) So, there M of them. Okay. The next thing is what are the costs? So, on day t, we have some pt. Right? Remember how multiplicative weights works? So, we've gone some number of days. Initially, on the first day, the first day pt is just uh the uniform distribution on all the experts, right?

[`17:38`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1058) And then gradually, as we've been running multiplicative weights, uh we change this pt vector. And now we're at some day t and we have some pt. I want to tell you what how I'm going to define the cost vector. So, remember the theorem for multiplicative weights, um mt can be chosen arbitrarily or adversarially.

[`17:59`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1079) After you choose, just like before when we're talking about learning from experts, after you make your decision, the costs are revealed to you. Like who's wrong and who's right was revealed to you, right? So, same thing here. After you choose your your p vector, your pt vector, m is revealed to you.

[`18:16`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1096) So, I want to tell you how we're going to define m uh to ensure uh to to to to to make it do what we want to prove our theorem. Okay? We define the cost vector to be mt is 1 over d or 1 over rho, sorry, times a ax minus b.

[`18:52`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1132) Okay. Or xt. Where xt is the output of the oracle. Right? so we give the oracle PT and we tell the oracle to give us back XT. Now, the oracle might say that there is no XT. Right, the oracle might say it's infeasible. But if it's infeasible, then if this is infeasible, then as I said, the original is infeasible.

[`19:30`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1170) Right, that's the contrapositive of what I said earlier. Right, so if the oracle says there is no XT, we just halt and we say, "Sorry, this uh this LP gave me is infeasible."But if it gives us an XT, then we're going to define the cost vector in terms of that XT. Okay.

[`19:46`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1186) And now what do I want to say? Uh Sorry. What do I want to say? I wanted to get confusing myself slightly. All good. So, now what I want to say, I want to say that uh MT dot product with PT what is that equal to?

[`20:51`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1251) That's equal to PT transpose uh times this thing here, one over row. Um AXT minus B. Sorry, this row sort of looks sort of like a P, doesn't it? Okay. Yeah, so I really don't like that. I should have noticed that this might happen. Let me just call this alpha, or let me call this gamma.

[`21:32`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1292) Okay. Okay. Um, which is equal to Oh, and notice, right, so this this thing is in -1 1 to the M. Which the theorem needs. I mean, the reason we normalize by this gamma was to ensure that. Okay. So, this thing is equal to 1 over gamma PT transpose axt minus uh PT transpose B.

[`22:29`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1349) And what can you tell me about this quantity? The thing inside of the brackets. Yeah, it's non-negative. Right? I mean, that's that's what the oracle does. It solves this feasibility problem. So, we know that this thing is bigger than equal to that. Okay, good.

[`23:05`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1385) So, now So, this is one direction. We know that um this thing We know that this quantity is bigger than equal to zero. But, we also know that this quantity is smaller than equal to something because of our multiplicative weights theorem. Right?

[`23:23`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1403) So, we know that now zero is at most one over gamma um p t Oh. Zero is at most, let's say, m t dot p t. So, we can sum over all t. And that's still true cuz each one individually is non-negative. And then now um let me now apply the MW theorem.

[`23:57`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1437) This is at most So, let's say for all So, for all i this thing is at most the sum t from one to capital T of m i of t plus And I don't need the stronger version. I'll just say that this is at most epsilon t plus epsilon t plus log m over t.

[`24:23`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1463) Remember, m is our number of experts, the number of constraints. And now let's expand this out. This is equal to one over uh gamma times uh the sum over t of a i dot x t minus b i plus epsilon t plus log m over t.

[`24:58`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1498) Uh yeah, thanks. And actually Uh I'm actually going to apply this so I'm going to apply this with some uh a different epsilon than the final epsilon I want. So the final epsilon I want is this one. I'm going to apply multiplicative weights with some with some other error, let's call it eta.

[`25:24`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1524) Right, I can choose I can choose this error parameter however I want as long as it's less than a half. We'll see what eta is going to end up being. Okay. And then now what I'm going to do is multiply by uh So now uh multiply by gamma over T.

[`25:59`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1559) And what we get is and set also and set X tilde to be uh 1/T times the sum over little t of Xt. Right? Notice that by the feasibility conduction condition from the oracle, each one of these is in capital P. So this itself, this average is also in capital P by convexity. We assume that capital P is convex. Okay.

[`26:33`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1593) So then if you multiply both sides of the inequality by gamma over T, what you get is that uh zero is at most um Ai dot X tilde uh bi + gamma eta + Uh that should have been eta. ln m over uh gamma ln m over eta t.

[`27:32`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1652) Okay. Now what I'm going to do is I'm just going to I can set eta to be whatever I want. So I'm going to set eta to make this at most epsilon over two, and then I'm going to set t to make this at most epsilon over two. So now set eta to be um I guess epsilon over two gamma.

[`28:00`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1680) And now set t to make this at most epsilon over two, which means um gamma ln m two gamma ln m over eta. Right. Which if you plug in what eta was, this should be four gamma squared ln m. Oh, and and let me put also an epsilon here cuz I want this to be epsilon over two.

[`28:35`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1715) over epsilon squared. So all I did you can verify this, you know, offline if you want. All I did was I I chose eta and t such that Let me call this a and let me call this b. Such that a and b were at most epsilon over two.

[`29:00`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1740) That's all That's all this was. So now this implies that zero is at most a i dot x tilde minus b i my uh plus epsilon which implies that a i dot x tilde is at least b i minus epsilon. Okay, so that's And this is true for all i.

[`29:29`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1769) So that's that's it. Okay, so what do you do So how do you use multiplicative weights to get an almost feasible solution to the original problem? Uh you keep running this oracle at every step to give you an x t and at the end of the day your almost feasible x is the average of all the x t's that you've encountered so far.

[`29:49`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1789) Okay. So this is this is your final output. Okay. So any any questions about about what I just said? Was you okay? Yeah, I I I just I didn't I know you explained this like several times. Yeah. Um is the oracle returning something that's feasible for star That's right.

[`30:29`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1829) All right. Star Star has two constraints. The first constraint is that x should be in p and the second constraint is that little p transpose a x should be greater than equal to little p transpose b. But so what is this uh inequality this closeness to the constraint? What closeness to constraint row I?

[`30:52`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1852) Oh yeah, so you're saying So if so if if it's feasible it'll return an X and furthermore the X that it returns Furthermore the X that it returns will satisfy this property. You have that promise that the oracle behaves in this way. Yeah, it doesn't just find any feasible X it finds a feasible X that satisfies this property.

[`31:19`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1879) Okay. So you know just going back to set cover, I mentioned this last time but we hadn't actually proved this theorem yet so I I didn't give you the details but let me just finish that off and then we can start on flow. Okay, so let's finish off set cover.

[`31:53`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1913) Remember there we had some collection of sets and we wanted to choose fractionally sets to cover our universe of elements. So we wanted to minimize the sum over S of X of S such that for all elements E the sum over S's containing E of X of S should be at least one and also X should be non-negative.

[`32:18`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1938) And RP was going to be the set of all X's such that first of all X should be non-negative. And second of all the sum over X of S's should be at most L. All right, I that's Did I say alpha last time? Uh whatever. Uh uh Should be at most beta. Okay?

[`32:44`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1964) And the point is we know that if there are M sets, we know that opt is somewhere between 1 and M. Right? So, we could just binary search. So, remember multiplicative weights, the multiplicative weights theorem for LPs, it lets us get something that's almost feasible. Right? There's no uh minimization here. It's just a feasibility question. So, the feasib- feasibility question we're going to answer is whether or not it's possible to get cost at most beta.

[`33:13`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=1993) And then if you can do that, you could binary search on beta. Okay. So, how would we implement So, the question How do we get an oracle? Right? We need an oracle to be able to apply this multiplicative weights idea for set cover. Okay.

[`33:41`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2021) So, we're given some P, and we want to check uh feasibility of P transpose AX is greater than or equal to P uh P transpose B, and X has to be in the set capital P. Cuz how are we going to do that? Well, first of all, what's P transpose B?

[`34:28`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2068) Yeah, P transpose B is what? Right? B is just the right hand side here. And so P transpose of this is just the sum of all the P PEs, which is one. P is a probability distribution. So, we want P transpose AX to be greater than or equal to one.

[`34:53`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2093) Now, what's P transpose AX? Well, let me let's just write this out. This is equal to the sum over all E PE times the sum over all S's containing E of XS. And we can write this as the sum over all S's

[`35:14`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2114) of XS times what I'll call P of S, where this is just the sum over E's uh the sum over E's in S of PE. Okay. So, forget about you know, forget about the condition that the X you want has to be in uh So, okay.

[`35:51`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2151) So, ignore this condition for a second and just pretend this condition just says that the sum of the X's has to be beta. How would you maximize How would you choose X to maximize this sum? Actually, maybe it's maybe it'll be more uh inspiring if I say pretend this beta was just one. Right?

[`36:16`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2176) So, X X is uh X is giving specifying some convex combination. Right? X is specifying some convex combination of these PS's. Right? So, then what would you do to maximize that convex combination? Yeah, you would you would place all the mass on the S that has the biggest PS value.

[`36:43`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2203) Right? So, you know, you can assume that and and since X is non-negative, I mean, if you normalize it to to have um if you normalize it to have norm like uh to have sum equal to one, then that argument is a real proof. Okay? So, if you want to maximize

[`37:03`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2223) you know, for X um for X and P to maximize the sum of XS P of S, choose S such that P of S is maximum. And set XS to be what? What would you set XS to be? Yeah, you set it to be beta.

[`37:41`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2261) You place all the possible mass you could there. Okay, so So, that's how the or that's what the oracle will do. Okay? So, when the oracle is given this P, it's going to write down this expression. It's going to observe which PS is the biggest, and it's going to set XS to be beta.

[`38:09`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2289) So, the oracle picks X to be um you know, beta times the Sth standard basis vector, let's say. Yeah, sorry. This is the uh the S-th standard basis vector. Okay, and then that'll give you some value. It'll give you beta times P of S. And if that's less than one, it's just going to say it's infeasible.

[`38:40`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2320) I maximized it and I couldn't get one, so it's infeasible. Otherwise, it'll give you the point. Okay? So, if P of S um is less than beta and less than one, we output infeasible. Otherwise, what can I say about about the row?

[`39:10`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2350) Remember, I want to have a row-bounded oracle. What can I say about the row that this thing satisfies? Otherwise, for all constraints E, I want to look at AI dot X minus BI, and I want to bound this, right? Or let's uh for all constraints I, maybe. But the constraints are indexed by elements of the universe. What can I say about this quantity, right?

[`39:41`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2381) I need to understand this to know how many iterations I need in my multiplicative weights algorithm. Well, this is one. So, what can you tell me about this value? Right? So, what is X? X is just beta times the S-th standard basis vector. So, I claim there are two cases.

[`40:22`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2422) So, let's say for all constraints E, I want to uh E is an element of the universe. It's in the universe. So, there are two cases. Either E is in S or it's not in S. If E is not in S, what's this dot product given the X that we are outputting? It's zero. Good.

[`40:42`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2442) In which case this difference is one. What if E is in S? What's this dot product? It's beta. So, this thing is at most the max of one and beta minus one. Actually, yeah, okay, good. Which let's just call this what you know, beta we're binary searching to get beta anyway, right? And we know the answer, we know opt is between one and M. So, we're going to be binary searching between one and M. So, beta is certainly at least one.

[`41:18`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2478) So, let's just say this is at most beta. Which is at most M, for example. The number of sets in our input. Okay? So, this tells us if we combine this with our theorem, which I think we erased, well, um that's the gamma here, right?

[`41:38`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2498) So, the number of iterations we need of the multiplicative weights algorithm is going to be something like M squared log M over epsilon squared. So, this implies O of M squared log M over epsilon squared iterations of multiplicative weights. Okay?

[`42:06`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2526) To to get a um a good solution to fractional set cover. And remember we said that for fractional set cover if you're violating the constraints by epsilon, you can rescale and get an actual feasible point. But your cost will increase by a factor of roughly 1 + epsilon. So, you can get a 1 + epsilon approximate solution to multiplicative weights to to fractional set cover by just doing this number of iterations of multiplicative weights. Okay?

[`42:36`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2556) So, that's all I want to say about multiplicative weights besides P-set problems. Uh but do you have any questions before I change topics? Yeah. You said that the theorem is only true for when A when the constraints are getting negative. Sorry, can you say it again? You said that the theorem is only true when A has non-negative entries or you don't need that.

[`43:02`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2582) Uh I don't like in the proof of the theorem I did so before we went move to set cover in the proof of that general theorem, I don't think I ever used that the entries of A were non-negative. I mean, sometimes that can help you to implement oracles, right?

[`43:16`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2596) So, at the end of the day, you have this general theorem, but to actually make it work for your problem, you have to be able to come up with a P and you have to be able to implement an oracle with a good row, right? So, um just because you have the theorem doesn't mean you can always use it effectively.

[`43:38`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2618) But yeah, I guess to answer So, um to answer your question, I did mention last time that kind of this idea was developed by uh in a paper by Plotkin, Shmoys, and Tardos, and they were considering packing and covering LPs.

[`43:54`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2634) But if you look in the Arora, Hazari, Kala uh manus- mo- monograph on on multiplicative weights, yeah, I mean, there's no it doesn't there's no requirement for that theorem that that it be a packing or covering LP. Okay. So new topic So flows Okay.

[`44:28`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2668) So So you know since CS 124 is a pre-wreck I will assume I'm not going to so you will be able to follow what I'm going to say without knowing the details but there are certain details I'm not going to prove. I'm just going to assert they're true. And if you know the proof great if you don't you can go read about the proof.

[`44:51`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2691) Okay. So so flows. So we're given a directed graph uh G equals VE and we're also given capacities. And then the capacities are all non-negative. Okay. And we're also given a start vertex S and end vertex T goal is to output uh a flow vector.

[`45:59`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2759) A flow I'm going to define what this means. A flow from S to T uh a feasible flow from S to T obeying the capacity constraints. Okay, so let me start defining some of these terms and also drawing pictures. Okay.

[`46:42`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2802) So, definition a flow F Okay, it's uh So, for me always so M N is the size of V and M is the size of E. And I'm always just going to assume that the graph is connected. Um if not, then you can do a DFS in the beginning and only work with the connected component that contains both S and T.

[`47:18`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2838) Um so, in particular, since the graph is connected, M is at least N minus 1. So, I'm always going to think of M as being at least N whenever I write bounds. Okay, so a flow is a vector I'll say an ST flow So, one um F should be non-negative.

[`47:56`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2876) Two for all V that are neither S nor T, the sum over edges UV in E of the flow of E should equal the sum of all the edges VE. So, this is I'll say this is flow in equals flow out.

[`48:37`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2917) So, it's also called, you know, conservation of flow. Okay. We also want So, S and T are special. We want that So, I'll draw a picture soon, but imagine that um we're trying to ship water from S to T, okay? So, water is flowing out of S and then it's landing in T. So, what we want is to say that the amount of water that leaves S is equal to the amount that enters T.

[`49:22`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2962) Okay, so um that means that the sum over all edges E being SU of FE is equal to the sum over all edges E equals UT in in the edge set E of FE. Okay, so flow out of S equals flow into T.

[`49:49`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=2989) Okay, and we say F is feasible if uh for all edges E and E FE is at most the capacity of that edge. Okay, and uh the value let me let me write the value of F which we'll write val of F is equal is equal to the amount of water we ship.

[`50:54`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3054) So, you can imagine for example we have a graph. So, here's an example. This is S. This is T. These are two other vertices. And let's say all the edges Let's say there's also there's like this. They're all directed in that in this way. And let me also write down the capacities of these edges.

[`51:34`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3094) 1 1 1. Let's say they all have unit capacities here. So, one flow is uh one feasible flow is the zero flow. I won't ship any water. Okay. Another flow, for example, is I'll ship one unit of water here, this way, and then I'll go down here, then and it'll go this way.

[`52:04`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3124) And let's say I'll ship one like that. That gets me one unit of flow. Another thing I could do is I could just uh go this way, send one that way, and send one that way. Is that Is that purple visible? I feel like it's very dark. Right?

[`52:27`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3147) So, this purple flow has a a value of two, whereas the yellow flow has a value of one. Right? So, if we're trying to maximize the flow, the purple flow would be better. Okay? So, um Also, I should say in this goal, we want F has maximum value.

[`53:21`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3201) Okay. So, we want to find a max flow. Uh now, pretend you've never heard of flow before. Okay? Given all the things we've been studying so far, how would you think to find a max flow? Linear programming. right? So, this is exactly a linear programming problem. So, LP formulation we want to maximize the sum of all flow leaving S.

[`54:06`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3246) We have certain constraints. F has to be at least zero. For all E, FE has to be at most CE. And then we also have the conservation constraints, right? Uh constraints three and two. Uh but those are all those are all linear constraints anyway.

[`54:25`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3265) All right, so plus constraints for two and three, I guess. Yeah. Three? Oh. Yeah, yeah, yeah, yeah. That's Yeah, you're right. That's right. That no flow is entering S. Um I see. Uh Oh, I see. Okay. I see. I see. Okay. Okay.

[`55:54`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3354) Okay. So, Yeah. So, uh we could solve using simplex or ellipsoid or, you know, interior point. So, all right, let's So, the simplex we know we don't we don't know any polynomial time implementations of simplex, right? We don't know any pivot rules that are guaranteed to run in polynomial time. Ellipsoid um ellipsoid will run in polynomial time.

[`56:32`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3392) It will also depend on So, I didn't I don't I don't think I gave the uh I didn't write explicitly what you get at the end of the day, but remember that you start with some ellipsoid containing it, and then you keep shrinking it um shrinking the volume of this ellipsoid over over various iterations. The number of iterations you need will depend on precision issues.

[`56:50`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3410) I think I did say that in class. So, it will depend on like the the log of the biggest capacity you have. Okay, so you'll have like poly n times um some poly log in the largest capacity. Let's look at interior point cuz I think that's that's one that we actually have some fast algorithm that we actually did go through in class.

[`57:24`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3444) So, the number of iterations is like root m up to this uh log factor. Uh let's let let's let L the precision absorb log factor. So root ML iterations. In each iteration of one Newton steps. So what is a Newton step? I mean do people remember in general interior point?

[`58:03`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3483) So remember in general interior point we want to minimize f of x and we said that the the change x1 is going to be x0 minus some quantity. This is the current iterate. This is you should think of these as flows. Right so I know let's just call them x's.

[`58:39`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3519) Okay so next iterate. Right? Do you remember what you have to what the step is in a in Newton's method? Yeah what so the one over L is from gradient descent. Yeah so you you take the Hessian inverse apply it to the gradient.

[`59:10`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3550) Okay that's Newton's method. So remember in linear programming we said that in linear programming this Hessian inverse was equal to something like I believe A transpose slack X minus 2A. So, and you can also think of this as like um Hessian apply the Hessian applied to X1 minus X0 should equal some particular vector.

[`59:52`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3592) So, like in each step of in each iteration of Newton's method when you apply to linear programming, you're solving you're solving a linear you're solving a linear system. Okay. So, iterations of Newton's method for LPs in our interior point method are are linear system solves.

[`1:00:31`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3631) Okay. So, that implies total time Well, root M iterations, each one is a linear system solve. That's like M cubed time or M to the omega using fast matrix multiplication times L. So, let's call that O of M to the 7/2 L.

[`1:00:55`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3655) And this L you can show for flow problems, it's it's possible to to for such flow problems always make this thing poly log uh of the maximum capacity U. This is the maximum capacity. Um one thing I will say is kind of the dominant term here if you notice, is these linear system solves.

[`1:01:25`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3685) This is for an arbitrary LP. It turns out that if you write the linear system solves you have to do for the particular case of the flow problem, the linear systems you get are a special subclass of linear systems. They're not arbitrary linear systems that you have to solve. Okay?

[`1:01:44`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3704) And that was exploited by in a paper in 2008. So, by Diikstra and Spielman and Stock 2008, showed O tilde of M. O tilde is hiding polylog factors, polylog M factors. O tilde of M linear system uh time when A comes from a flow problem.

[`1:02:28`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3748) All right. So, it's not an arbitrary A. It's not coming from this uh Basically, it's related to if you've ever heard of um Laplacian system solvers. So, I'm not going to If you've heard of that, great. If you haven't, you can go look at their paper. But, yeah.

[`1:02:43`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3763) Wait. So, is this uh They showed O tilde of M time for the overall thing or for This M cubed. So, this uh this M cubed basically turns into turns into that. Which at the end of the day means they get an M to the 3/2 algorithm times log capacity or polylog I think they get log squared capacity. M to the 3/2 times log squared capacity for all linear programming uh max flow. Actually, they they look at more than just max flow.

[`1:03:16`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3796) They look at other flow problems as well. Okay, so that's great. But even without that, even without that um without Dykstra's algorithm, you could apply IPMs, you would just get a terrible uh polynomial you'd get. M to the 3.5.

[`1:03:46`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3826) Okay, so um without Oh, and actually I should mention um when I when we were covering interior point, I mentioned that this barrier function uh that we were using, it weighted all constraints the same, right? We had a sum of uh a sum of log of the slack of the ith constraint.

[`1:04:12`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3852) And I mentioned that this is this was kind of weird because if you repeat a constraint multiple times, your weight you're counting it more, but really that constraint only matters once. And I mentioned that there's this paper by by Lee and Sidford, which figures out weights to apply to that to make it run faster. And they showed that using their methods for interior point um you can actually turn this root M into a root N for flow for max flow.

[`1:04:39`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3879) So you get an M root N algorithm as opposed to M root M, right? And M could be as big as N squared. Okay. But so without, you know, let's let's think purely combinatorially and not uh use any of this uh linear programming technology. So without LP technology um So, Ford and Fulkerson Oh, actually Uh yeah, so Ford and Fulkerson I don't remember exactly.

[`1:05:32`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3932) I think it's the '50s. I forgot exactly uh which when and and where. gave an algorithm with time O of m times f star. Okay, so I'm going to abuse notation. If I mean uh a flow is a vector, it's not a number. If I just write it without the val, I just mean the value. So, the value of So, f star is the max flow. It's the flow that achieves the maximum value. And this is the value of that flow f star.

[`1:06:07`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3967) So, the running time was m times f star, which is not great. Right? So, for example, imagine Well, their algorithm would actually do great on this graph, but imagine I have uh you know s t According to this bound, their algorithm could take time a billion, even though the graph has two vertices. It wouldn't take I'm not going to describe their algorithm.

[`1:06:35`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=3995) It wouldn't take a billion steps uh on this graph, but for example if you just modify this graph slightly and then put one capacity here uh their algorithm could take um a billion steps if you're not careful. Okay, so Okay, good.

[`1:07:04`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4024) But, you know, if your capacities are all one, then it's not terrible. And actually, I probably will end up saying what the algorithm is just because I wanted to find certain terms. So, what does their algorithm do? So, this Ford-Fulkerson algorithm finds augmenting paths.

[`1:07:37`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4057) All right, so what's the idea there? So, so we're given G and we uh find some flow some feasible flow. Okay, so what's what's a simple way to find if there is one, what's a simple way to find a feasible flow that has strictly positive value?

[`1:08:22`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4102) I guess many people have seen flow, so I maybe people are shy to just say things that are that they everyone knows. But, you can just DFS. Okay? So, so e.g. DFS from S to T. Now, you get a path in the graph from S to T. Right?

[`1:08:46`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4126) And that path has some minimum When I say DFS, only consider the edges that have positive capacity. Okay? Do a DFS on that graph. A depth-first search. Now, you'll find some path from S to T. That path has a minimum capacity on it. So, just put that minimum capacity on the flow.

[`1:09:10`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4150) Right? So, to find some path whose let's say min capacity edge is, you know, some lambda. Now, define F to be lambda on that path and zero uh otherwise. So, like for example, Uh sorry? So, if lambda is Yeah, so I guess all I want to say is you know, so we have some graph.

[`1:10:12`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4212) This is S, this is T. Okay? There's some capacities. Uh I'm just making up numbers. Okay? There's some capacities on these edges. And I just want to DFS from S to T to find some path. So, maybe I find the path that goes here, then here, then here. So, this path has three edges.

[`1:10:44`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4244) The seven capacity, the five, and the two. I'd like to push flow along this path. But, you know, how much flow can I push on this path before I become an infeasible? Well, I can push two. Basically, the minimum, right?

[`1:10:58`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4258) So, lambda here is two. That's what I meant. Right? Okay, good. So, So, now we So, okay. So, now let's say we find some flow in G. We can So, given flow F in G, yeah. Um yeah. So, I will I'll assume that capacities are always So, there there are some rational numbers that I'm storing on my computer.

[`1:11:36`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4296) I'll clear denominators. And I'll just assume that they're integers between one and U. So, like if you clear denominators, uh does the running time go up when you multiply everything by a certain Yeah. In Ford-Fulkerson. Yeah. So, uh given a flow F and G,

[`1:12:02`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4322) we define we can define a what I call residual graph uh G of F on the same edge set where uh let's say the capacity Let's say capacity prime, this is the capacities in GF. The new capacity of an edge E uh let's say capacity of of edge UV where I say, um um, we have an edge e as UV.

[`1:13:00`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4380) It's going to be the old capacity minus the flow along that edge. Um, plus the flow in the opposite direction. Wait, so the flow in the opposite direction, is that across a different edge? A different directed edge that happens to go the opposite direction, or are we maintaining two separate flows?

[`1:13:51`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4431) Um, yeah, so our flow vector let's just imagine that every edge that is in the graph, the reverse is also there. So, if the reverse is also there, then was already there, great. If it wasn't, put it there with zero capacity. All right.

[`1:14:12`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4452) So, yeah, imagine that we have edges in both directions for every for every edge. I mean, you can imagine if you want even that, uh, uh, it's the complete graph where vertices where edges that don't actually appear have capacity zero. But, I I don't want to say it like that because I want my bound I want our running time bounds to depend on m.

[`1:14:31`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4471) But, um, yeah, so for every edge that appears, imagine it appears in both directions. Maybe one of the directions has capacity zero. Does that make sense? And So what Ford Fulkerson does Yeah. So yeah, I'm defining I'm defining a new capacity function in terms of my flow F.

[`1:15:41`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4541) And this is this is how I define it. Yeah, okay. Or is it uh Any more questions? And by the way, this flow vector F is remember it's non-negative. So I'm not imagining that FUV is minus F of VU. Like it might be the case that F of UV is five and then F of VU is zero.

[`1:16:21`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4581) In fact, you can always assume that one of them is zero. Right? So for example, if if this were five and this were one, that's the same thing as just saying that this were four and that were zero. Question?

[`1:16:40`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4600) In the sense that it would still satisfy, right? If I if any edge and its reverse both had positive flow on them, I could just make one of them zero and subtract from the other and it would still satisfy all these constraints.

[`1:16:56`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4616) And it would give you the same exact uh Yeah, it would give you Yeah. Wait, so if the reverse has positive flow, Oh. why not just see that as negative flow on Uh oh, wait, wait, wait. Let me Let me just be more careful about what I'm I'm sorry, say it again.

[`1:17:16`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4636) Uh if the reverse edge has positive flow, Yeah. why not just think of that then the ordinary edge having negative flow? If the reverse has positive flow, oh, I mean uh No, I want So, my definition of a flow is that it's a non-negative vector. Yeah, I mean, what you're saying makes sense, but I want to I want to stick to a particular definition of flow.

[`1:17:44`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4664) In my definition of flow, um it's So, yeah, you could So, for example, you know, imagine you have your pipe with water going in it and the water's going in that direction, and it's it's going at a rate of uh I don't know, 5 L per second, whatever your unit of of flow is. So, let's say it's uh 5 L per second. That's the same thing as saying there's actually, you know, uh 12 going this way and there's there's seven going backwards.

[`1:18:16`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4696) But, um I mean, these it's it's equal Both of these are equivalent. I will always just assume one of them zero. Or it's Or it's the same as saying that five are going this way and zero is going that way. Yeah, so um I hope I didn't create any confusion.

[`1:18:31`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4711) I just want I'm just trying to state my uh uh What do you call that? My standards, my not notation, but in my notation, there's always going to be all amongst an edge and its reverse, only one of them is going to have not an uh at most one of them can have a non-zero flow on it.

[`1:18:54`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4734) And um also, edges appear both forward and reverse. One of them might have zero capacity. So, um Yeah. In the beginning, anyway. What? Oh, yeah, go ahead. Is that true since we started talking about flows the whole discussion that we're using reversal edges? Or are we Is that just for the purpose of Ford-Fulkerson?

[`1:19:15`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4755) Um just assume it's not going to really Yeah, let's say that everything I said is always the case. This is my most going to double the number of edges in the graph. Right? And all our bounds are big O of M something, anyway. So, it changes things by a constant. Okay.

[`1:19:33`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4773) So, all right, are we all Is everything good? Okay. So, So, Ford-Fulkerson, what it does is initialize um F to be zero. And GF is just G. Right? By that definition. While there exists and then there's a loop, while there exists uh a path an augmenting path in GF we're going to let F prime be some flow in GF.

[`1:20:50`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4850) And we're going to set our new F to be our old F uh plus F prime. And then we're going to set GF uh uh Let me write it GF. uh to adjust the GF to the new F. Okay.

[`1:21:21`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4881) So, this is Ford-Fulkerson. And so it relies on a theorem. So, correctness relies on a theorem, which is as follows. So, F star is a max flow if and only if uh GF star uh has no augmenting path. In other meaning that there isn't S and T are disconnected.

[`1:22:16`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4936) There's no path from S to T in GF star. Okay? So, I'm not going to prove this. You know, it it was proven in 124. You can find it in you know, any algorithms textbook. Intro algorithms textbook. But, um that's This is kind of I state this theorem because we're going to use it for other fancier algorithms soon.

[`1:22:59`](https://www.youtube.com/watch?v=TdTFYVjzs1I&t=4979) Oh. Okay. And, uh I am It's exactly 4:00. So, next time next time we're going to use this theorem to to show that there are uh some faster faster flow algorithms than than uh Ford-Fulkerson.
