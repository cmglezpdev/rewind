# Advanced Algorithms (COMPSCI 224), Lecture 16

*Harvard University · 1:24:57 · https://www.youtube.com/watch?v=4A5LiJpPDRw*

## 1. Introduction

[`0:10`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=10) Oh, okay. I'm going to get started. Uh Let me wait so that the camera's not Okay, good. So, last time So, okay. So, today Let me say today we're going to finish simplex. And then and then I'm going to say things about uh strong duality. And uh complementary slackness.

[`0:44`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=44) You'll see what I mean what that means. Uh I'm going to sort of tell So, the simplex algorithm, unfortunately, there are no known polynomial time implementations of it. They all take exponential time. Um So, the first polynomial time algorithm for linear programming is the ellipsoid algorithm.

[`1:11`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=71) Um but I don't want to get into I think to properly cover all details of ellipsoid would take me maybe a lecture and I I don't really want to spend too much time on ellipsoid. I think it's not used that much in practice anyway cuz it's not it's kind of slow. Okay, but um I'll just, you know, say some words, I guess, about it.

[`1:31`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=91) Roughly what it does. And then in the notes I'll add a link to if you to something that says more if you really want to know about it. And then either at the end of this lecture or next lecture uh we'll start uh interior point.

[`1:46`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=106) So, path following interior point methods. Okay, so um this is a linear this is also a polynomial time algorithm for solving linear programs. Uh and it's more it's faster in practice than ellipsoid. Okay. I mean it's already fast and in practice it's even faster than what people prove about it.

[`2:19`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=139) Um even with path following interior point I won't cover every single detail because there are many details to make it cover all cases, but I think I'll tell you enough that you'll understand what's going on. Um yeah. So my understanding is they use both simplex and interior point are used in real life and I think ellipsoid is not used in real life.

[`2:48`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=168) I'll Well, I I think it's not just about ease of implementation. I mean it is it is easy to implement, but I think also it's just these pathological cases that these cases that make you take a lot of time are pathological. So in practice you you know, you run it for some number of iterations and it finds often.

[`3:10`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=190) Yeah. But yeah, don't take my word for practical things. But that's at least what I hear. All right.

## 2. Simplex

[`3:25`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=205) Okay, so let's let's finish up with simplex. So simplex Remember the basic idea was uh vertices, okay? So we saw that Well, we gave one definition of vertex and we saw it was equivalent to another one. So um we want to minimize C transpose X such that AX is equal to B and X is at least zero coordinate-wise.

[`3:57`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=237) Okay? And we can define this polytope P, which is the set of all points X that are feasible. So, X such that AX is equal to B and X is greater than or equal to zero. Right? And we said that uh a vertex X and P Okay?

[`4:28`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=268) is a point such that AX the submatrix AX, I'll say what this means, AX uh has full column rank. So, it has linearly independent columns. And we said that AX is A is submatrix of A specified by the indices J such that uh XJ is not zero. It's strictly positive.

[`5:13`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=313) Okay. And remember that we're in the situation where uh A is M by N and C B are N-dimensional vectors. Okay? So, this already tells us that and let me call this thing here, let me define this to be B sub X, the basis for X, that's what we called it last time. This implies that uh B sub X has size at most M.

[`5:47`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=347) Right? Because column rank equals row rank, and the row rank is definitely at most M. Okay. So, the basic idea of simplex was then um So, for each vertex X, assign a basis B of X, which is a subset of 1 to N, such that the size of BX is exactly M.

[`6:24`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=384) Okay, so uh maybe I I call this Let me call this B' of X to distinguish. So, this is the set of indices that are strictly positive, and then I'm going to extend it possibly extend it to a set that has size exactly M, because it might be the case that the set has size at most M. Okay?

[`6:43`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=403) Uh such that let me call it A sub BX. This is the columns are indexed by B of X. Uh has rank exactly M. So, the point is that if B' X had size less than M, that means I can augment it by adding more columns to make it have full rank. Okay?

[`7:07`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=427) I'm assuming that A has full row rank, because there's no point in having redundant rows in in A. This would be redundant constraints. And you can filter that out in pre-processing. Okay? Either redundant constraints or obvious infeasibility. Okay, so good.

[`7:28`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=448) Um are there questions at this point? So, AB is a square M by M matrix, it's invertible. Okay? And what we said last time was So, now we'll always We start at some vertex. Let's call it X0 as the initial point. I mentioned how to get an initial point to start with Simplex last lecture by basically running Simplex on another LP. Okay?

[`8:00`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=480) So, we start at some initial vertex X0 and greedily move to subsequent vertices until some halting condition, which I said last time and I'll write it again. So, at any time we uh represent our current vertex by some basis. And we also defined N to be the set 1 to N without B, the the complement. All right?

[`9:08`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=548) So, with Simplex, at every step we write our LP We say, "Look, so C transpose is the same thing So, this is our LP here, right? This is our LP. I'm going to rewrite it as minimize C tran CB transpose

[`9:31`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=571) um XB plus CN transpose XN subject to the constraints that ab xb is equal to uh plus an xn is equal to b and xb xn are bigger than equal to zero. When I put a subscript when I put a set of a subscript I just mean projected to those coordinates.

[`10:00`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=600) And what we did last time was we multiplied both sides of this equality by ab inverse. And that let us write xb in terms of xn. And then we substituted xb in in this expression here. Right? And Right? So uh this implies that xb is equal to something.

[`10:26`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=626) Right? Which implies that what we're really doing is minimizing some other uh cost function. Let me write it down again. You can write this thing as cb transpose ab inverse b um plus cn minus I believe an transpose or an an transpose ab inverse transpose cb transpose uh c uh xn.

[`11:13`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=673) This is This is what you get after you substitute x this expression for xb in here. And then subject to those same constraints. Okay? And this thing here is some new cost vector. So this is a constant, right? This doesn't depend on the variables at all. So, the only thing that depends on the variables is this thing, which I'm going to call c n tilde is the reduced cost.

[`11:50`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=710) Okay? And now at first, you know, at first first pass assume that x b uh So, let's say the current vertex, let's say is v. Assume that v b is uh strictly positive. Okay? Meaning that b prime and b were the same, right? We didn't have to actually add more columns to make it full rank. So, in this case what can we do?

[`12:37`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=757) Well if any of these if any of the entries in So, if there exists a j in capital n such that c tilde j is strictly negative Questions? Any questions? No one? I know I've been writing a lot of symbols. Okay.

[`13:09`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=789) So, the point is that if any of the reduced cost entries are strictly negative in capital n then what I can do is I can take this vertex and start incrementing the j-th coordinate. Okay? Notice though that right? If if I actually wrote this out Well, let me let me actually write it.

[`13:31`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=811) So, XB XB is equal to AB inverse applied to B minus ANXN. Right? So, the point is the variables in B actually depend on the variables in in N in capital N. Okay? So, if I take this vertex

[`13:53`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=833) and I start incrementing the Jth coordinate and J is in capital N what that means is I'm implicitly adjusting some of the variables that are also in in B. Okay? And so, some of them are going to start maybe decreasing. Right?

[`14:09`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=849) And I can only I can only increment this Jth coordinate a certain amount before one of them becomes zero. And then I can't increase the Jth coordinate anymore. Right? To maintain feasibility. And then what I have is a new vertex. Right?

[`14:25`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=865) I've incremented one guy to be He used to be zero, right? This was This is capital N. This is a set of zero coordinates. So, the Jth coordinate of V used to be zero, now it's positive, but then I've made something else zero. So, I've moved to another vertex. So, simplex basically moves from vertex to vertex by doing this. Okay? And the point is if if VB is strictly positive, that means I can move I can move some amount.

[`14:49`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=889) So, if there exists a J so, then increment increment uh VJ until some I in B has XI equal zero. And the point is the amount of increment I can do before this happens is positive. Right? Because they all started strictly positive. Right?

[`15:21`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=921) And they move they move when I increment this coordinate. But When you say V V V, do you mean X Uh So, V is my current vertex. So, yeah. So, I just wanted to differentiate between this is like the LP. So, Um and and then V is the point that I'm currently working with.

[`15:43`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=943) Okay. So, okay, good. Otherwise, if CJ tilde is greater than equal to zero for all uh for all J, then halt and declare optimality. Okay? And why can I do that? I can do that because look at my objective. There's a constant term plus there's the reduced cost transpose XN.

[`16:21`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=981) Now, XN, remember there's this constraint. XN is a non-negative vector. So, if XN is non-negative, right? This is true in the in the entire polytope P. So, if XN is non-negative and this reduced cost is also non-negative, then this can only go up.

[`16:41`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1001) Right? At the current vertex, this is zero. This whole thing is zero at the current vertex. But, this can only go up for any other point. Which means that this current vertex is better than everyone else. Okay. But, there's a Okay, so, this is this is the first pass, right? Assuming that V is Assuming that VB is strictly positive. In reality, because of this augmentation, some entry in in VB can actually be zero.

[`17:10`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1030) In which case, there's a problem here. Right? Which is that even if there is a c-tilda-j which is negative, we might not be able to increment it the j-th coordinate at all because it might instantly saturate uh a non-negativity constraint.

## 3. Blands Rule

[`17:34`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1054) Okay, so I don't I'm not going to give the details on that, but I will tell you basically how it's fixed. So, if VB zero doesn't hold, well, if that doesn't hold, this case is still fine, right? If the reduced cost is not negative, we know we're still done. The problem is what do we do if the reduced cost has a negative entry?

[`18:08`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1088) If it doesn't hold and there exists a J such a J and N such that um c-tilda-j is negative, then we need to or we will add J to B and kick out K from B. Right? But the question is which J do you add to B and which which K do you kick out? Okay?

[`18:53`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1133) Um and if you're not careful about this, you might get into as I mentioned before, you might get into an an infinite loop where you keep replacing the same variables with each other and never actually make any progress. Okay?

[`19:05`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1145) But it turns out that um there is a way to to to decide which J to put in cuz there might be multiple J's which have a negative cost reduced cost. And there might be multiple K's which are already zero. Where XK's are or VK's already zero, right?

[`19:20`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1160) So, it turns out that there is a way to do this which probably never has an infinite loop. I'll tell you what the rule is uh and then I'll put a link in the notes to a proof. I don't want to get into the proof. Uh but So, this thing is called Bland's rule.

[`19:44`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1184) So, multiple pivoting rules rules for choosing J and K exist uh some don't terminate if you're not careful. But Bland's rule terminates. So, what is Bland's rule? Okay. Pick J to minimize C tilde J less than zero. If multiple such J exists then you take the the first one.

[`20:53`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1253) Okay, now what do you do about what do you do about choosing K? Well, So, define this vector R. where um RB is zero and RN is basically this reduced cost. And define define A prime to be A AB inverse of A and B prime to be AB inverse of B.

[`21:43`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1303) And define Q to be the min over all I of B prime I over A prime IJ such that A prime IJ is positive. And then what you do is you pick Well, let me write this as I said K before. Let me write this as K. You pick K to minimize Q.

[`22:35`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1355) If there's a tie you pick the first Q the first K minimizing Q. Okay, and it's possible to prove that this thing actually doesn't terminate. I'm not going to do it. Um uh sorry, that it does terminate. Did I say it doesn't? Yeah, that it terminates. Um and when it terminates, you will be in this case where the reduced cost will be uh uh non-negative.

[`23:06`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1386) Okay? So, okay, good.

## 4. Other Questions

[`23:17`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1397) Yeah, so there are these there's this, you know, annoying case you have to handle where bases don't have size exactly M. And unfortunately, with other algorithms like uh ellipsoid and interior point, there are also these degeneracies you have to handle which Yeah, so basically, I'm I don't want to handle any of these in this class. So, yeah, so uh otherwise, it'll just be too pedantic, okay?

[`23:44`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1424) Uh so, good. So, now, what do I want to say? Well, I guess if I just assume that Bland's rule works, then there's nothing more to say. That's That's the end of simplex, okay? So, other questions about simplex algorithm before I before I prove strong duality?

[`24:07`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1447) Yeah. Oh, um uh right. So, what would you do? I guess you would do um you could add the constraints one by one, right? And if the rank doesn't increase, then you know that the thing you just added was already in the span of the previous things, and then you just drop it.

[`24:44`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1484) How do you compute the rank? Um I mean, you could do um uh one thing is you could just do uh I This is probably not the most efficient. You could do the determinant of A transpose A and make sure that it's not zero. But, um actually there is a there is a paper that talks about how to compute rank in input sparsity time.

[`25:05`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1505) So, like the number of non-zero entries in the matrix times some log factor. Yeah, you can compute rank in that time. Um and that's due to one of the authors was Lap Chi Lau. I don't remember all of them, but that was I think in 2010 maybe or something. Yeah, maybe I'll I don't remember off the top of my head. Yeah.

[`25:29`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1529) Uh but you asked me how do they do it in practice, like in real life? So, that I'm not so sure about. I'm This is just me saying things off the top of my head. But yeah, it's definitely in P. All right, so All right.

[`25:45`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1545) Okay. Um good. So, strong duality. So, yes. So, um there are a couple ways of proving strong duality. One is non-algorithmic, and the other is to sort of get it out of the simplex algorithm. Okay. So, to get it out of the simplex algorithm, I want to define what's called uh the shadow price vector. Uh let me call it that's Y, which is uh Yeah, AB inverse transpose CB.

[`26:39`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1599) Okay. So, as I iterate in simplex, B changes and the shadow price vector changes. And first of all the claim is that Oh, first of all, let's What is the dual? Forget before we before I say this, what is the dual? So,

[`26:57`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1617) dual of of LP, you know, min c transpose x such that Ax = b, x greater than equal to zero, is uh Are people any any takers? Are people becoming fluent in duals? Okay, so first I'm not going to min, I'm going to max. What am I going to max? Yeah, yeah, so y transpose b, right?

[`27:38`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1658) So, the right-hand side becomes the objective, and such that uh a transpose y is at most c. Okay, so that's the dual. So, say it again. Uh you don't because this is because you have equality constraints. Yeah, so when you have equality constraints, the dual variable corresponding dual variable is unrestricted. Um Are you good?

[`28:15`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1695) So, the first claim is that uh c transpose So, currently we have some iterate c b and we have some uh some vertex v b I said is that c transpose v b is equal to b transpose y. Okay, so v b is the vertex we're currently at.

[`28:48`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1728) So, this already looks like strong duality except for one thing, right? What's What would we need to do to prove strong duality? Why is this alone not sufficient? Yeah. Well, VB is definitely feasible. It's a vertex in the primal but yeah, why? Why might not be feasible, right? In fact, it's not going to be feasible until the very end. All right, so um So, proof of this.

[`29:22`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1762) So, remember we have We have that AB VB equals B, which implies that VB is equal to AB inverse B. So, this implies that C transpose VB equals um C transpose AB inverse B. Uh What's V and Y's AB transpose CB? Oh, well Well, first of all, this Let me write C transpose VB is equal to CB transpose VB.

[`30:11`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1811) Um And this is the same thing as B transpose uh AB inverse transpose CB, which is B transpose Y. Okay? So, what does it mean to be feasible? We want Y to be dual feasible. So, define the dual slack vector, which is R equals um C minus A transpose Y.

[`31:09`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1869) Right? I just subtracted A transpose Y from both sides. And so, we want R to be non-negative. Okay? And the definition of Y implies that RB is equal to zero. And RN is equal to um something very convenient. Okay? If you do the calculation, it's equal to C tilde N. Okay?

[`31:55`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1915) And uh we halt when C tilde N is greater than equal to zero, which implies uh dual feasibility. Okay? So, yeah, I mean, I guess I swept under the rug some of the complication of proving strong duality because I didn't actually prove Bland's rule. Okay?

[`32:34`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1954) Uh but, that takes some some amount of effort. Um, often what you'll see, you know, in other uh, graduate algorithms courses is that people won't they won't prove it through simplex. They'll give like a non-algorithmic uh, proof of strong duality using more convex geometry. Okay, but

[`32:54`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1974) um, I think it's on the one hand, I didn't give all the details of the proof because I didn't prove Bland's rule, but I think uh, it's a nice thing to know that it's basically a corollary of the fact that simplex works.

## 5. Complimentary Slackness

[`33:19`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=1999) Okay. Questions? Okay. So, I wanted to say something about this complementary slackness. So, we can define the uh, complementarity gap as basically X transpose R, where this is the dual slack. And notice that's just um, X transpose C minus A transpose Y. Where did I put the dual slack as C minus A transpose Y?

[`34:28`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2068) Which is uh, C transpose x minus uh ax transpose y And ax is equal to b if x is uh feasible for the primal. And this is just uh c transpose x minus b transpose y. Right? So, at optimality, we know that this is zero.

[`35:17`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2117) So, we have uh a theorem. This is called complementary slackness. And if you remember earlier in the course when we were doing online algorithms, I called something approximate complementary slackness. Which basically said that if you're not quite at opt, but you have some bounds on

[`35:39`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2139) how like how you almost satisfy complementary slackness, which I'm going to say in a second, then um you can say something about the the goodness of your primal solution. Okay, so complementary slackness says uh if x star and y star

[`36:00`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2160) are optimal for the primal and dual respectively then uh the sum over i from one then uh for all i either x i is equal to zero or um CI minus H or C minus H transpose Y C minus H transpose Y I is equal to zero.

[`36:39`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2199) So, either the dual slack is zero or the primal variable is zero. And the proof of that is basically already written down. Right? At optimality by strong duality, there is no gap between the primal and the dual. So, we have that um C transpose X minus B transpose Y is zero at optimality.

[`37:08`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2228) But, we know that C transpose X minus B transpose Y is just equal to the sum of XI RI. Okay. And I mean, that's basically it. All these terms here are non-negative. So, for them to sum to zero, each sum end has to have either XI being zero or RI being zero. Okay.

[`37:33`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2253) So, that's pretty much everything I wanted to say about these two things, which means now I'm going to move into the second pair of things. So, before I switch topics, do people have questions? No. Okay. Let me So, let me make sure I write down this reference properly.

## 6. More on Simplex

[`38:07`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2287) Oh, actually, I did I did want to say a few more things about simplex. So, uh so, what's the run time? Well, in each iteration to move from vertex to vertex, it's polynomial time. And how many vertices are there? So, each iteration is polytime.

[`38:38`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2318) Number of iterations is at most number of vertices. Is at most what? What's the most naive the crudest bound you can think of? Yeah, it's the most n choose m. Right? Cuz vertices are represented by these bases, which are subsets of size m. Okay, so this is exponential.

[`39:02`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2342) Um in fact, it's possible to prove that the number of vertices is at most n minus m over two choose m over two. Okay, and um the reason you could hope for any better bound at all is that not all choice not all choices of bases like when you So, what's Let me write Let me go back for a second. Where did I put that thing?

[`39:37`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2377) Uh well, I hear. So, once you have a basis, how do you actually get the the vertex corresponding to that basis? You do AB inverse times B. Right? And the point is AB inverse times B might not actually be a non-negative vector. Right?

[`39:58`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2398) And if it's not a non-negative vector, then it's not in your polytope. It's not feasible. So, um if you're careful with that, it turns out that uh it's actually possible to get a better bound. And I think more than careful, I think this is actually my understanding is that this is actually kind of hard to prove.

[`40:13`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2413) So, this this follows So I asked the I asked someone Michel Goemans who's an expert in this about it and he said this follows from the something called the upper bound theorem. Uh by that that's an interesting name for an upper bound. I mean people prove upper bounds all the time.

[`40:39`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2439) I don't know why this is the upper bound theorem but this follows by by a McMullen. And when I Google to find out more uh it seemed like it was a major open problem for a long time and then he solved it. So I I I'm not sure that this is actually something very easy to prove, okay. In any case that that's still a big number, okay.

[`41:05`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2465) So another thing I want to say about simplex is you know, you could ask yourself well okay, sure. The number of vertices could be very large but um maybe we still can prove that there is some way of navigating this graph quickly, right? So at the end of the day

[`41:31`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2491) there's a graph here where the vertices of the polytope are the vertices in the graph and the edges are neighboring vertices in the polytope. Right? And you could say well maybe there's hope that uh any polytope given by M constraints by M hyperplanes in N dimensions doesn't have that big of a diameter. Like the graph of the graph that this polytope represents doesn't have large diameter. Okay, that would be a necessary step to show that simplex could hope to take less than exponential time.

[`42:02`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2522) Okay, it's not a sufficient step because simplex doesn't necessarily find the shortest path but um right, so so uh uh one necessary step And when I say an implementation of Simplex, it all comes down to the pivoting rule.

[`42:21`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2541) Okay, so there might be many choices of J uh with a with a negative reduced cost, which one do you actually start incrementing? So, that that's a pivoting rule. And then if there's some zero coordinate in B, which one do you kick out? Okay? So, one necessary uh

[`42:38`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2558) one necessary uh condition to allow the existence of polytime Simplex is to show that uh any polytope polytope in let's say D dimensions defined by M hyperplanes uh has diameter When I say when I say when I say diameter, I mean of the graph. has graph diameter you know, say poly of MD.

[`43:47`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2627) And there was a conjecture. Uh who's heard of this by the way? I'm just out of curiosity. Has anyone heard of the Hirsch conjecture? Okay. So, is that the diameter is at most m minus d. And I forgot exactly when this conjecture was made. Did I Oh, yes, good. So, this conjecture was made in 1957.

[`44:31`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2671) Okay. And in 2010, um let's see. Santos O. Say Santos in the Annals of Math in 2011 disproved the Hirsch conjecture. And he came up with an explicit polytope where d was uh 43, m was 86, and the diameter was at least 44. So, off by one.

[`45:12`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2712) Okay, so Huh? What? What? A new conjecture? Uh uh but then he also also showed He also showed uh um for fixed d, d as well as an epsilon bigger than zero, there exists an infinite family of polytopes with um m going to infinity that have diameter at least 1 + epsilon uh m.

[`46:12`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2772) Okay. This is still pretty far from poly m d, right? I mean, these are like nearly linear lower bounds in m. Right? I mean, uh to get polynomial time for simplex, if you can prove a diameter upper bound of m to the 10th d to the fifth, that's perfectly fine, right? Again, this is only a necessary condition for hope for simplex.

[`46:34`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2794) It's not a sufficient condition, but for all we know, there is an implementation of simplex which is fast. We just don't know one. I think we don't know any that Yeah, I think Yeah, we don't know one. That's right. Okay.

[`46:51`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2811) Um the last thing I want to say about simplex is So, simplex works well in practice, right? So, we were asking about this. So, you know, as a theoretician, you want to give some theoretical justification. Why is simplex faster than this exponential bound that we can prove? Um and there was some nice work on that by Spielman and Teng.

## 7. Smooth Analysis

[`47:17`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2837) So, I mean, this I'm not going to claim that this is exactly what's happening in practice, but at least it uh it it shows why simplex isn't as hard as it may as we as it seems. So, why is simplex not so slow in practice?

[`47:41`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2861) So, um Spielman and Teng in uh Well, this is the journal version, but the actual the paper came out earlier. So, Spielman and Teng, they define something called smooth analysis, which is which has been applied to other areas as well.

[`48:03`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2883) And when I go off on these tangents, you know, without actually proving anything and just telling you history, you know, feel free to pick these up for your project ideas. Okay, so smooth analysis, the basic idea is Okay, so there's worst-case analysis. That's what we're all familiar with in you know, this class and CS 124, right? Want to say that no matter what the input is, your algorithm will be fast.

[`48:35`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2915) There is average-case analysis, which assumes an input distribution, and you want to say that your algorithm has an expected running time, which is fast if the input is drawn from this distribution. Okay, but then you have to make an assumption on what the distribution on inputs is, right?

[`48:51`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2931) Which might not be realistic. You might have no idea. So, smooth analysis is something in the middle. The basic idea between behind smooth analysis is Okay, so my algorithm has to be fast, you know, the expected running time has to be fast on the following kind of input.

[`49:07`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2947) You give me a worst-case input, like a worst-case LP, for example, and what I'll do is for every input variable, for every entry in that constraint matrix A and for every entry in the right-hand side vector B and in the cost function, I'm just going to add epsilon random noise, like Gaussian noise, with very small with mean zero and very small variance.

[`49:29`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2969) Okay? So, it's like a randomly perturbed worst-case instance. And then you ask, what's the expected running time on the worst-case in this setup? And what Spielman and Teng showed was that for simplex with a particular pivot rule that they analyzed, it's polynomial time. Okay?

[`49:51`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=2991) So, basic idea is to take a worst-case instance instance and add a small random noise to all entries, independent noise. Then analyze expected running time. So, just to make sure we're all squared away on the quantifiers, it says that so we have an algorithm A such that for all inputs X the expected run time uh let's say A on input X tilde is something small.

[`50:57`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3057) Where the expectation is over X tilde is a randomly perturbed version of X. Okay? So, that's smooth analysis. Bounding this thing is what's called smooth analysis. Right? So, yeah. So, does that result in a polynomial time algorithm independent of the variance of the No, so it's polynomial in whatever the variance is well. Yeah.

[`51:36`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3096) Yeah. Okay, now that really is all I wanted to say about Simplex. Okay. Uh I got questions before I do ellipsoid stuff. Yeah. Exactly. Right, just to be make sure everyone heard it. So, in the graph there two two vertices have an edge between them if their bases differ by a single constraint. Okay, good.

[`52:28`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3148) So, uh so I mentioned Simplex came out in 1947. Bland's rule was in the '70s. Okay, so uh I think before then things just people didn't care about termination. I don't know. Uh But, the first time we had a polynomial time algorithm, probably polynomial time algorithm for linear programming, was also in the '70s, uh due to Khachiyan.

## 8. Ellipsoid

[`52:55`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3175) Okay, so first poly time algorithm for LP is ellipsoid. And that's due to Khachiyan. And the journal was uh some a Russian journal. It was called the uh I can't pronounce Russian, so I won't try. Okay. And I'm not going to prove basically anything about some about ellipsoid, but I will say a lot more about interior point, but I just want to tell you what the ellipsoid algorithm is, and I want to tell you some properties of it

[`53:58`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3238) that um actually make it more useful than that make it more useful than interior point and other algorithms in certain situations. Okay, so we'll see this in a second. One nice thing about the ellipsoid algorithm is that in some cases you can even solve exponentially sized linear programs in polynomial time.

[`54:21`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3261) All right, you might say, "What are you talking about?"Uh you know, how can you even look at the input? So really what ellipsoid needs to work is an oracle which if you give it a point that that's infeasible it will tell you a violated constraint.

[`54:39`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3279) Right? So for some problems you can implement that oracle without ever explicitly writing down the linear program. Right? Um and then actually ellipsoid makes a polynomial number of oracle calls. Okay. Is it clear what I what I mean?

[`54:57`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3297) I mean I didn't tell you what the algorithm is, but uh the point is if you can if you can implement this oracle, you don't actually need to write down the LP explicitly. Of course, if you write down the LP explicitly, one way to implement the oracle is to loop through all the constraints and see which one you violate. But if you have some more efficient way of doing that then you could plug that into ellipsoid.

[`55:17`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3317) Okay. Um so um so given uh some A in Rn and all as well as a positive definite matrix. The ellipsoid E of A A is defined to be the set of all X such that X minus A transpose A inverse X minus A is less than equal to 1.

[`56:15`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3375) Okay. So, for example, a sphere of radius 1 A would just be I the identity matrix and uh A would be the center of the sphere. Okay. And in general, you can always view ellipsoids as unit transformations of the sphere, linear linear transformations of the sphere, sorry. Okay.

[`56:34`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3394) So, so the ellipsoid algorithm is used to uh test feasibility of some polytope uh which is the set of all X such that, let's say, AX is at least B. I'll assume that we can solve linear inequalities. Okay. So, I mean, I'll show you in a second.

[`57:16`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3436) Once you can solve feasibility, it implies that you can do linear programming and optimize over over this polytope. But, ellipsoid just lets you do this. Okay. And the basic idea is So one start with some ellipsoid E naught which is guaranteed to contain uh to contain P.

[`58:09`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3489) Okay. If P is bounded, that is. Okay. So if P is a bounded polytope, then remember we I think we I mentioned this very briefly last time, right? We know how to get vertices of the polytope. You do it by taking subsets of the columns and then solving a linear system, right? So if you know if and if you So if you know that all the um input numbers to your LP are rational, right?

[`58:43`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3523) You can clear denominators and assume they're all integral, then there's some number of bits that are used to specify the input. And when you estimate bit complexity, right? So how many bits do I need to represent the inverse matrix of an of an of an integer matrix and then multiply times the right-hand side, I get an I get a bound on the number of bits I would need to represent any vertex, right?

[`59:07`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3547) So by that kind of bit complexity analysis, you can show that just by the bit complexity, you automatically know that um P has to be contained in a ball of a certain size. Okay, if it's if it's bounded. Okay, so um getting this initial E0 is not that hard.

[`59:30`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3570) It's just a sphere of the appropriate radius. Okay, so two check So, let's say uh check if uh So, let's say uh Let A be center of the current ellipsoid. And then while Uh I guess I'll put that here. While A is not in P Okay, so if the center of the current ellipsoid is in P, we're done.

[`1:00:36`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3636) Right? We have our feasible point. Ellipsoid is trying to find a feasible point. However, the center of the current ellipsoid is not in P, what do we know? So, we have this ellipsoid E, right? Uh I can't draw 3D. And it's not in P, which means there's a violated constraint.

[`1:00:55`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3655) What's a constraint? A constraint is a hyperplane. I'm really bad at drawing this uh 3D stuff. So, we know that A A is the center of the ellipsoid, and you're telling me that Oh, uh A You're telling me that A is not feasible, which means that our desired polytope completely lies on the others on the other uh side of the hyperplane.

[`1:01:29`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3689) Right? So, so A lies on opposite side of hyperplane H from P. So, you create a new ellipsoid and there's a closed form formula for how you get the new So, if you're given H and you're given the old ellipsoid, now what do you want?

[`1:01:58`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3718) You want a new ellipsoid which is smaller, which is which is guaranteed to contain just the other side of that hyperplane. Create a new ellipsoid E prime which uh still contains P and has smaller volume. Right? And this is this is the place where um right, ellipsoid doesn't really need to have the LP explicitly.

[`1:02:38`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3758) It just needs an oracle which can tell it this hyperplane. Okay? In fact, because of this um you can use ellipsoid the ellipsoid algorithm for an even more general class of problems uh convex programming. Okay? So, where the feasible region is not necessarily a polytope, but say a convex set. Okay?

[`1:03:02`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3782) And there's a theorem um I think it's Sometimes it's called the separating hyperplane theorem and sometimes it's called the Hahn-Banach theorem. Okay? I think depends on who you ask. Uh which says that for any convex set and any point that's not in the convex set, a closed convex set and any point that's not in it, there's always a separating hyperplane. All right.

[`1:03:26`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3806) So, if you're able to implement the separating hyperplane oracle, then you could run ellipsoid. And also, depending on what your initial convex set is, you need to be able to easily say what E0 should be. Um and it's possible to do this

[`1:03:49`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3829) such that the volume of the volume of E prime over the volume of E is at most, I think something like E to the 1 over 2N or something. E to minus 1 over 2N. All right. And finally, um if found an A and P, return A.

[`1:04:53`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3893) Else, if if um the volume of E has become too small, I'll say what that means in a second, uh declare P is empty. Basically declare that your LP is infeasible. Okay, so there's already one thing which should alarm you about this.

[`1:05:27`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3927) Right? Does anyone see why this might be a problem? Yeah. Right. So exactly So P I mean if you have let's say an equality constraint Well, here I here I said that they're all inequality constraints, but you could you could use inequality constraints to implement equality constraints, right? You could say X is at least five and it's at most minus five or something.

[`1:05:57`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3957) Right? So you could you could have an equality constraint which reduces the dimension of the polytope. So it's actually a smaller dimensional It's a polytope in like a subspace. So in the higher space it has zero volume. Right? Uh so that's that's a problem.

[`1:06:17`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=3977) So but you actually would do in a pre-processing step is so theorem let L be the bit complexity of P. So L is proportional to like log of So where did I write this polytope? AX is at most B, I think. Um max over IJ of AIJ plus uh let's say the the largest entry in B.

[`1:06:59`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4019) Let's plus uh let's say M plus N. Okay. Define some P prime to be a new polytope. Um where you say P prime is a set of all X such that AX is at most B plus uh 2 to the minus L times the all ones vector.

[`1:07:35`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4055) So, this is a vector that just has one in every entry. And you also add a constraint that uh for all J, minus 2 to the L is at most XJ is at most 2 to the L. So, now this polytope has some very small volume.

[`1:07:52`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4072) I mean, it's at least it's exponentially small in L, but it's bounded from below. It's not zero. Then P is empty meaning infeasible. P is infeasible. If and only if P prime is infeasible. So, I'm not going to prove it. I'll put a link in the notes to where if you want to read the details. I mean, this is really fudging with, you know, precision issues and bit complexity. I don't want to spend time on on that on the board. But, it's not too hard of a proof.

[`1:08:37`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4117) It It comes down again to the fact that vertices are specified by certain number of bits due to inverting linear systems, blah blah blah. Okay? So, now now you know when the volume has become too small, right? If it's smaller than this inflated polytope, then you're done.

[`1:08:55`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4135) There's also an issue that if you run ellipsoid on this polytope then the thing you get might not actually in P. Right? It might be it's P prime is a little bit bigger than P. But there's also a way to round it so that you get back to P. Okay? So, I'm not going to get into that either. Okay, good.

[`1:09:15`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4155) But with LP as I've talked about it before, um we don't just want it to do feasibility, we want to do we want to do actual optimization. So, suppose we want to solve min of C transpose X such that AX is at least B and or X equals B and X is at least zero.

[`1:09:52`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4192) Okay? How would we do that with the ellipsoid algorithm? So, step one, check if P equals X such that AX equals B X is greater than zero. Uh check if it's uh feasible. If not, output not feasible. Okay?

[`1:10:34`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4234) Step two, you write the dual, which is max B transpose Y such that AX or A what A transpose Y is at most uh C. Check that uh let's say P dual is the set of all Y such that A transpose Y is at most C. Check that this thing is feasible.

[`1:11:17`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4277) If not, if not, then what do you output? Huh? Yeah, unbounded. Then the primal's unbounded. Then output unbounded. Okay. So, now we know that after steps 1 and 2, we know that P is feasible and bounded. Which means by strong duality, the dual is feasible and bounded, and it achieves the same thing. So, step 3 is now just compute something inside of this polytope.

[`1:12:00`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4320) Find X Y that's feasible for this polytope, which is AX = B, X is at least zero, A transpose Y is at most C, and C transpose X equals B transpose Y. So, for this set of constraints. Right. And once you find something feasible for that set of constraints, you've found the optimal primal and dual solutions.

[`1:12:36`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4356) Okay. So, that's the ellipsoid algorithm. Or that's everything I'm going to tell you about the ellipsoid algorithm. Um but I will actually tell you stuff about interior point. Right. And yeah, so I guess maybe I should have said this. So, this implies that

[`1:13:04`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4384) this volume comparison here, this implies that if you look at the volume of the Kth ellipsoid it's at most uh the volume of the original ellipsoid times e to the minus K over 2n. Right? And you know what the original ellipsoid is. It's some sphere. You can compute its volume.

[`1:13:31`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4411) Um so, as soon as this expression on the right hand side becomes too small like smaller than smaller than the volume of this P prime here then you can just say it's infeasible. Okay? Questions about the ellipsoid? I mean, I didn't give you, I guess I didn't tell you how to update the ellipsoid and all these things.

[`1:13:58`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4438) But uh I'm not going to cover that. But aside from that, is are the ideas clear of roughly what ellipsoid is? Okay. Okay. So, that's ellipsoid. Why did I erase that? Okay. So, now I just got to follow the interior point. So, I mean, I only have about six seven minutes.

[`1:14:25`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4465) Um so, what I'm going to do is I'm just going to give you a flavor of what interior point is all about. Uh and then next time I'll actually tell you details of interior point. And really um it's going to look, I think pretty different from the kinds of things you have seen so far in algorithms classes because it's really something that comes out of optimization.

[`1:14:52`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4492) You're going to see a lot of You're going to see gradient descent, Newton's method, and um You're going to see multivariate calculus, okay? So, um but I mean, the basic idea of of the algorithm is something that um there's a there's a clean understanding of what's the basic idea of the algorithm is, okay?

[`1:15:14`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4514) Okay, so let me set things up. So, interior point method uh it also gives polytime linear programming. It was introduced by Kar- Karmarkar. I think in STOC 1984. The journal version was the same year. Earlier, right? The journal version, which was Combinatorica. Combinatorica '84.

[`1:15:55`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4555) And it's really been quite influential. Um there are entire books written on interior point. You can use it to solve other convex programming problems as well. And it's sort of I don't I don't I don't know if opposite is the right word, but let me say opposite. It's sort of opposite of simplex. So, simplex is always on the exterior of the polytope jumping around from vertex to vertex going along edges. Interior point tries to stay as far from the exterior of the polytope as possible, okay?

[`1:16:23`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4583) So, it tries to stay inside and gradually move toward a vertex from the inside. All right. So, gradually tries to reach an optimal vertex while staying in the interior of P. So, you might say, "Well, wait a second. If I can You know, how do I get in the interior? That means I can test feasibility, right?"

[`1:17:08`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4628) Um and we we saw the ellipsoid with the last with right here. If you can do feasibility, you can basically solve the prob- the problem. So, the very first step of interior point is you actually modify your LP. We sort of did this with simplex, right? To get an initial vertex. You modify the LP, except we're not we're not going to do like two interior points. We're going to It's all going to be one interior point.

[`1:17:32`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4652) But, we're going to modify the LP so that it has a very obvious uh interior point. And it's also going to be the case that for this modified LP, if the orig- if the original uh polytope was feasible, then um kind of a vertex the optimal vertex to this modified LP will correspond to a vertex of the original one.

[`1:17:59`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4679) Okay. So, really we're just we're just going to add actually one like um I mean, I I don't want to get into this detail at this point cuz there are only a few minutes, but you can basically add

[`1:18:11`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4691) um one extra variable which easily allows you to satisfy constraints, but uh you're going to penalize it very heavily in the objective function. Okay? So, for example, you know that numbers never get bigger than say two to the L in your LP. So, you're going to put a weight on this variable that's like, you know, 10 to the L or something. So, that if your actual thing was feasible, you would never use this variable. Okay?

[`1:18:37`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4717) But, now that you have it, you can easily come up with an interior point, and then now you try and run the interior point method to eventually get down to a vertex. You look a little troubled. Or, no?

[`1:18:58`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4738) Yeah, so it's going to be um Right, so the number of iterations of interior point is going to be at least L. In fact, the best known implementations of interior point, well before this year, or before last year uh the best known

[`1:19:16`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4756) the best known implementations of interior point, the number of iterations was like L * √M, where M is the number of constraints. Uh now you can there was a paper just this year which showed that the √M term can be improved to square root of the rank of the constraint matrix. Um but yeah, L you need at least L iterations.

[`1:19:40`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4780) Yeah, even the running time of ellipsoid depends on L. Um in fact there are no strongly polynomial time algorithms for um for linear programming that we know of. Okay, and so we're going to look at so we're going to look at things of the form uh min of C transpose X such that AX is at least B.

[`1:20:15`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4815) Okay? And we're going to turn this into an unconstrained uh optimization problem. Uh define define the slacks define the slack vector sx to be ax - b. So, for any feasible x, this thing is non-negative. Okay? We'll try to optimize

[`1:20:55`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4855) to compute the minimum over all x in rn an unconstrained optimization problem of lambda times c transpose x plus uh the sum i going from 1 to m of some barrier function p of Well, actually, let me write it like this. of p um of s of x.

[`1:21:40`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4900) Where p is a barrier function such that p of z goes to infinity if zi goes to zero for any i. Okay? And we'll use the log barrier. Which is p of z is going to be negative sum i from 1 to m of ln of zi.

[`1:22:25`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4945) Okay? So, on the one hand, if you set lambda to be zero, and you try to minimize this function, all you care about is this barrier function, which really is trying to keep you as far So, you just don't want any of these constraints to be tight or even near tight. You You want to be well in the interior of the polytope, right?

[`1:22:46`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4966) Which is obtained by minimizing this barrier function. And the point minimizing this barrier function is usually called in literature the the analytic center. Okay, so when lambda is zero, you find the analytic center. And then what you do is you start off with lambda small.

[`1:22:59`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4979) So, you'll actually start interior point off with lambda being 1 over 2 to the L or 1 over exponential in L. Okay? And you'll approximately solve There's There'll be a way to get an initial point for the for the very small lambda.

[`1:23:16`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=4996) And then, once you have a solution or a near solution for lambda, you're going to increment lambda by a little bit to get a new lambda prime, and you're going to take your old solution for lambda and do an iterative algorithm like Newton's method to improve it for the for the lambda prime problem.

[`1:23:33`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=5013) And now you'll have a good solution for the lambda prime problem. Now you'll take lambda prime and increment it just a little bit to lambda double prime. Now you'll take the lambda prime solution, run Newton on a few steps, and get a good solution to the lambda double prime problem.

[`1:23:47`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=5027) And you keep doing this, you keep alternating incrementing lambda by a little bit, running Newton's method to make the old solution good for the new lambda, until lambda is big enough. Okay? And big enough is going to turn out to be something like Well, I mean, you'll see the details next time. Once lambda is something like m times 2 to the L, you can show that uh a good solution for that problem basically is almost optimal.

[`1:24:12`](https://www.youtube.com/watch?v=4A5LiJpPDRw&t=5052) And then you can just round it to a vertex. Okay? So, in a nutshell, at the very highest level, without giving you any details, that's how interior point works and we'll see details on that Tuesday. Questions? All right.
