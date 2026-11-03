# Advanced Algorithms (COMPSCI 224), Lecture 15

*Harvard University · 1:26:13 · https://www.youtube.com/watch?v=U7158Q-2rJc*

[`0:00`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=0) oh okay I guess I'll just get started uh so a couple things one is I think I sent an email about project proposals which are due next week Thursday I don't think the website has a time uh if it does have a time you should stick to that I think it doesn't so that means anytime Thursday which means I guess 11:59 p.m. Thursday

[`0:26`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=26) evening um yeah and you know the primary purpose of this product proposal is to just make sure that you're looking into potential projects right so the project is due sometime in December during I guess the last day of reading period whenever that is and I just wanted to make sure that

[`0:47`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=47) you know you don't uh start you know you don't start thinking about project ideas the week before or something right so this is this date is here to force you to think about project ideas um and yeah so you shouldn't you know even if you think you might want to change your project later you still have to do this uh and if you do want to change you can but you would have to like submit a new proposal and these things aren't that long anyway but uh I just want to make sure you have some project idea by next

[`1:21`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=81) week a question questions about anything related to the project okay um good so yeah so I guess last week you had a couple guest lectures and before that I think I ended with um FP tasses fasses and uh sdps integrality gaps and sdps right so okay so good so for a while now we've just been talking about linear programming and saying there is some magic machine that can solve linear programs and we never really got into how you would actually do it okay so it's about time that we actually give algorithms to solve linear programs so today I'm going to start off with the

[`2:07`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=127) Simplex I'm also going to prove strong Duality um and you'll see that kind of the proof that Simplex Works implies like it it just gives you strong Duality for free okay so like at the end of Simplex running you'll like you'll be able to read off a dual feasible

[`2:26`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=146) solution which achieves uh opt okay so that that implies strong Duality um and then if I have time I'll say a little bit about um so the one issue with Simplex is that it works well in practice I'll cite something during lecture that gives some evidence for

[`2:45`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=165) why but uh in the worst case all known implementations of Simplex in the worst case take exponential time um so then I want to tell you a little bit about how to get polinomial time linear programming algorithms okay so

[`3:04`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=184) today so one so is going to be so I say solving LPS so one is going to be the Simplex algorithm and two is going to be uh we'll see for example certain things like strong Duality and complimentary slackness

[`3:33`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=213) and three we'll see a little bit about ellipsoid just like what it is or what it's roughly about okay so um first of all so LPS linear programming so far I've been saying that we want to do minimize cpose X such that and then um you know so many linear

[`4:11`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=251) inequalities okay so for example it could be that um a dox is equal to b or is at most b or is at least B there are many different types of inequalities you could have here okay so I want to put everything in what's called standard form

[`4:36`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=276) okay which is min cpose X such that ax is equal to B and X is at least zero okay um where when I this is a vector so what I mean here is that coordinate Wise It's At least zero okay and here um

[`5:02`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=302) uh X is an N dimensional Vector a is M by n and um n is C is at least M okay so I claim that any um any LP of this form can be written as as in this form and I'll say why and you know if you have a maximization problem like Max C transpose X that's the same thing as uh like so this could be Max or Min right

[`5:34`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=334) but you could without loss of generality say it's Min because if it's Max that's just minimizing the negative so you can put a negative sign on all the entries of C okay so so how can I write anything in this

[`5:47`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=347) form so first of all so getting to standard form how do I do that because as I'm going to describe the Simplex algorithm it assumes that your LP is written in standard form so that's why I want to put it like that okay so how do we do that well if I have a

[`6:11`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=371) constraint imagine this is like a row of a if I have a constraint that says AI dox is equal to bi okay this is the same thing as having the two constraints uh AI dox is at least bi as well well as uh AI dox negative a.x is at least B negative

[`6:37`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=397) bi uh is that what I wanted to say so I wanted to say yes I believe so okay and similarly uh AI dox is at most bi is the same thing as negative AI dox is at least minus bi

[`6:59`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=419) so this already says that the only constraints we have to deal with are greater than or equal to constraints okay and then we can Define slack variables for each constraint I we Define a slack variable SI which we and we write a constraint that SI I has to be at least

[`7:31`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=451) zero and the point is Si needs SI is going to represent the difference so if this is greater than equal to bi then this means that we can write AI dox as bi plus SI so SI is just the gap between these two between the left and the right hand side okay so so uh

[`7:56`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=476) replace AI dox is at least bi with AI dox plus uh minus SI equals bi okay very good and then so that already that already says we can turn everything into this form that ax equals B but there's one more thing which is this x greater than equal to zero business and actually let me just let me just write that here

[`8:37`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=517) actually so we can write for example x x i to be x i+ minus x i minus where XI plus is at least zero and XI minus is at least zero right any number whether positive or negative can be written as the difference of two non- negative numbers

[`9:07`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=547) okay good so once we do all these Transformations then all the variables that appear in our LP the slacks as well as these plus minus variables are all non- negative okay so all the variables in the lp are non- negative and all the constraints are equality

[`9:26`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=566) constraints okay and the reason that n is at least m is because for each of the constraints we have a slack variable right plus we have all the variables we had before so the number of variables in this LP is at least the number of

[`9:43`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=583) constraints questions about that yeah uh I mean I I haven't I haven't told you why any of this is important right like why why did I put it in this form as opposed to some other form I'm just putting in this form because Simplex is going to operate on LPS in this form or at least the way this the way I'm going to present

[`10:11`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=611) Simplex okay okay so Simplex is going to be a greedy algorithm well first of all let's you know let's look at what an LP is geometrically okay so let me draw one in 2D we have um so okay so let's say we have these X greater than equal to z y greater than equal zero

[`10:54`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=654) constraints then we have some other constraints as well so one constraint might say you're on this side of the space another might say you're on you're on this side of this you're in this half space Etc so at the end of the day your feasible region

[`11:16`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=676) is is this polygon okay and and the basic way that Simplex starts the the basic way that it proceedes is it starts at some oh and then there's going to be the C Vector right so C let's say

[`11:41`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=701) C this is C right here okay um let me also okay good so that's fine so the basic way Simplex starts is or that it goes it starts at some vertex okay and then it it like greedily walks to neighboring vertices that do strictly

[`12:06`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=726) better okay um so you know first it might walk here and then it walk here and then it's done so there's an issue of like how do you get an initial vertex how do you prove that there's always a better vertex that's adjacent to you um and if there are many adjacent vertices that are better you know how do you choose how do you choose one or does that matter and also how do you even know that the optimal solution is obain obtained at a Vertex okay maybe maybe uh vertices aren't always

[`12:40`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=760) optimal okay so so Simplex it's by Danzig oh do I have a scribe for today okay great D in 40 seven um start at some vertex um greedily move to vertices to adjacent vertices uh to adjacent vertices which do

[`13:31`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=811) better improve improve the objective stop when at the optimal vertex and you know how do you know that you're at the optimal vertex well uh as I say more about how Simplex works we'll see exactly what the stopping condition

[`13:57`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=837) is okay so first of all me um so that's all nice in pictures but let me be a little more precise about stuff okay so definition um so uh let's say before I give the definition let me Define p is the set of all

[`14:20`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=860) points X such that ax is equal to B and X is greater than equal to zero so it's the polytope over which we're trying to minimize this subjective function and then definition okay we say x and P is a

[`14:48`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=888) vertex what do I mean by something being a Vertex if there exists a y a vector Y which is not zero such that xus Y is in p and also X Plus Y is in P okay okay so that's what I mean by a vertex

[`15:29`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=929) okay so first of all I want to say um what question oh yeah yeah we say is a vertex if there does not exist a y uh if okay okay there sorry good one if there does not exist a y such that yeah if there exists such a y then it's not a Vertex okay yeah

[`16:03`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=963) sorry okay um okay good so now I want to I want to just immediately tackle the first one so start at some vertex now how do we get the initial vertex okay so that seems a little uh so it's easy to maybe confuse yourself on this one because of the following so I claim that feasibility meaning meaning checking checking that there is a solution to these constraints forget about the objective function just suppose you want to check some that some X satisfies those constraints I claim that that's equivalent to actually solving the minimization

[`16:41`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1001) problem right why is that because I can sort of guess the optimal value and then do a binary search so suppose that I guess the optimal value is R okay then I can have another constraint which says that c transpose X is at most

[`16:59`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1019) r i can move the objective into the constraint and then I can just ask is there an X which achieves atmost R and if not I'll move on in my binary search okay so even finding a point so we can reduce we can reduce the minimization problem to finding a point in this

[`17:17`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1037) p in yeah why would the binary search necessarily right so okay so I didn't really um that's a very good point so why would it terminate so you would get more and more Precision more and more bits of precision as you go through these iterations of binary search

[`17:40`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1060) and we're going to see this soon I'm skipping ahead a little but okay so they're n variables and M constraints right so what does it mean what is a vertex exactly we're going to see that a Vertex is basically a point where M of the constraints

[`17:59`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1079) matter are tight and then the others it's like the intersection of M constraints okay and all the other variables that don't CL correspond to those constraints uh don't matter okay um so like how many vertices are there they're going to be at most n choose M of them okay and given the M constraints that Define the vertex figuring out what that vertex is is solving a linear system

[`18:30`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1110) okay so if you assume that all the entries in A and B and C are bounded Precision integers let's say they all take some number of bits B well then you can you can bound the number of bits that's that are necessary

[`18:45`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1125) to write down a Vertex right it so to write down a Vertex you have to take some submatrix of a and then solve a linear system right and in terms of the Precision of the input bits you can write down how many bits are needed to to solve the system right so so you know that the optimal X is a rational number of bounded precision and you can write you can write a Bound for that Precision

[`19:12`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1152) so you know that you know that this optimal value is a rational number of a certain Precision so your binary search doesn't need to go beyond that Precision um yeah so I skipped ahead so but we'll see basically I mean you know you no a priori like an upper bound on the number of bits of precision you need to actually represent opt or to represent the X which achieves opt so you only need a binary search that number of times to get that level of precision does that make sense so that was based on future Pro that vertices

[`19:48`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1188) one of the vertices will be optim yeah yeah so assuming that vertices are optimal and also assuming that vertices are obtained by solving linear systems on submatrices of a then yeah you can bound Precision the amount of precision you need to write down a Vertex to write down opt and you only need a binary search that number of

[`20:09`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1209) iterations yeah that was a good question any any other uh any other questions okay so what I was trying to say I guess is that like it seems maybe a little weird that we're able to get a starting

[`20:22`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1222) vertex because even finding a point if in general you could find a point in a polytope given the given the polytope given the hyperplanes that Define it the half spaces that Define it if you could solve that problem in general you would be able to solve arbitrary linear programming because you could you could binary search on the objective and put that as a constraint

[`20:45`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1245) but uh that's only if you could solve General LPS uh feasibility but we're going to write down a particular LP okay so we're going to reduce finding a starting vertex to to uh another LP okay but that LP will have a very clear starting vertex so we could run we're going to run Simplex twice basically we're going to run Simplex on another LP to find a starting vertex and then we're going to take that as our starting vertex for the original

[`21:16`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1276) LP okay so what's this new LP that I'm talking about so to get starting vertex we're going to minimize t such that ax is equal to uh 1 minus t * V and also X is greater than equal to zero uh 0 is less than or equal to T is less than equal to one

[`22:04`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1324) okay so this is not in this is not in standard form because we have this constraint that t is at most one this this right here so you could write T is at least zero and then T is at most one so this constraint here is not the kind of constraint we

[`22:23`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1343) like okay well we could fix this by just saying that some slack St S Sub t plus T is equal to one and the slack is also not negative okay so now we're in standard form great so what's a what's some vertex what's a give me just any point or vertex in this uh that's feasible for this for this for these constraints

[`23:06`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1386) yes X is zero and what T is one St is zero okay great so this point does satisfy those constraints and why is it a Vertex right so simp we I didn't Simplex yet but you know it's it starts at a Vertex so we're going to run Simplex on this so we need to make sure that we have a starting vertex not just a feasible point but a Vertex for this I claim that this is a

[`23:40`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1420) vertex okay do people believe that under that definition of vertex right so the point is suppose you have a y so say it's not a Vertex so that means there is a y so that xus Y and X Plus y are both in p and by the way when when we say x we mean all the variables so X here means this concatenated with that variable concatenated with that variable so if you look at why it can't have it's not allowed to have any non-zero Mass on these variables on the X variables right because if you add Y and subtract y one of these is going to go negative if you have non-zero Mass there and we have a constraint that that uh the variables are non- negative okay so it can't have any Mass

[`24:31`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1471) here it also um can't have any Mass on the slack right because simar the same reason and also it can't have mass on T because uh one of them is going to be positive and when you add to T um you're going to violate this

[`24:53`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1493) constraint yeah T's yeah but that doesn't mean but you're allowed to um that's okay T is greater than equal to zero but t or t is one um okay right and the point is you're trying to minimize T so what you hope is that the optimal T will be zero and when T is zero what do you have you have ax is equal to B

[`25:29`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1529) so so you have a feasible point now okay and actually the point you get will be a Vertex for the original thing okay good okay so we know how to get a starting vertex but um I want to say more about vert like for example why are they optimal

[`26:06`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1566) so okay so uh first let me give some more definitions so I guess I've been using this word but I never really defined it so X is feasible if x is in p and an LP is feasible if there exists a feasible

[`26:37`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1597) X okay and also an LP is infeasible if there doesn't exist one and an LP is bounded if uh this Min of cpose X such that X is in P is not minus infinity okay if you can't make it arbitrarily small

[`27:38`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1658) right so claim is that if an LP is bounded then for all feasible X there exists a vertex a Vertex X Prime such that cpose X Prime is at most cpose X okay so I just want to say that any

[`28:14`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1694) vertices do as well as any other thing so proof okay so if x Prime is equal to x if x is already a Vertex then we're done so if x Prime if x is a vertex then we set X Prime equal

[`28:48`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1728) x else okay what does it mean so now I mean we don't have anything other than than than the definition right so if X is not a vertex else there exists a y which is not equal to zero such that x + y is in p and xus Y is in

[`29:11`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1751) P okay so in particular this implies so what does it mean to be in P well one thing it means is that a * x + y is equal to B so a * X+ yal a * x - Y is equal to B

[`29:30`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1770) and then if you take this constraint if you take this expression and subtract this this implies that uh a y is equal to zero right I just took these two equalities this is equal to B that's equal to B and then I subtracted those two equalities it implies that Y is in the kernel of

[`29:54`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1794) a okay okay so okay so now without loss of generality uh cpose Y is less than or equal to zero okay so Y is why is that the case I just want to make sure people are with me right so we we had this y such that a y is zero and also X Plus Y and xus Y are in p and I claim that we can assume that cpose Y is non-positive why is

[`30:50`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1850) that yeah so if y if y doesn't give it to you then minus y will right so um if not replace y with minus y okay also if C if C transpose y actually equals zero can assume that there is an index J such that

[`31:28`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1888) such that YJ is strictly negative for the same reason right so Y is a nonzero Vector so if C transpose Y is zero then one of Y and minus y will have a negative entry somewhere okay and it will still satisfy C transpose Y is

[`31:54`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1914) zero Okay so so case one case one is that there exists A J such that YJ is less than zero Okay so okay um remember what I want to do is I want to I'm gonna I'm going to give you a procedure that's going to gradually change X until we finally have a Vertex okay so what am I going to do in this case

[`32:49`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=1969) well um I'm going to I guess gradually increase that variable I mean YJ is is negative not CJ YJ but just YJ okay so what I'm going to do is I'll look at X Plus Ty y okay for T bigger than

[`33:46`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2026) zero okay and I claim so first of all uh let's let me let me say one thing if Yi is equal if x i okay if x i is zero I claim that then Yi has to be zero okay that's just true because I know that X Plus Y and xus Y are both in p and if x I had been zero then um if x I were zero and Yi were not zero one of these would make that coordinate uh

[`34:25`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2065) negative which would violate my non- negativity constraint in the lp wherever that is right I have this constraint that everything in the lp is non right this this constraint okay so that implies this so so what's going on

[`34:45`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2085) here as I increment T so imagine T starts at zero right as I increment T um the jth coordinate of of this of this Vector here the jth coordinate is decreasing right and as I make t as I make t bigger and bigger eventually the jth coordinate of this Vector will be

[`35:10`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2110) zero right and um if I pick J so that um such that YJ is the most negative out of all of them well not the most negative out of all of them but uh let's say so as I in as I

[`35:34`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2134) increased as I increase T um X+ Ty subj goes down toward zero for all for all J such that YJ is less than zero right and there is some I am going to do this for some uh positive T not not a zero T I'm going to do this for some positive T before um one of the constraints becomes tight before I get a new zero component right

[`36:40`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2200) so there is some T star let's say bigger than zero strictly bigger than zero such that um X Plus tar y uh is still in P it's still feasible right and I'll pick uh tar as large as possible so

[`37:14`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2234) that X Plus t y is in P okay okay good um and notice that this case one can happen at most nend times because each time it happens our new X has at least one more zero coordinate ah good so here's the problem

[`38:29`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2309) so let's write X um let's say x is 1 five 0 3 2 whatever something okay and let's say Y is 0 1 minus 2 0 1 or something okay so this is a problem because I want to be able to add T * y for some positive amount

[`38:59`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2339) T but notice that I can't add T * y for any positive T here because for immediately this coordinate would become negative right right so I mean in particular so you know why does this T so you can ask why why is Okay so maybe I should have said this a little clearer why does tar

[`39:28`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2368) you know why is T star strictly positive okay so the point is just so proof If YJ is less than zero then well then it means it's not zero so that means XJ is not zero either but X is XJ X is a is a feasible point right where did it go X is a feasible point so it means it's positive then XJ is strictly

[`40:05`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2405) positive right so that means that um there we can adjust we can add T * Y and still keep this thing positive right so for example this implies that t * YJ uh plus XJ is still strictly positive if now you just write an inequality if T is at least minus XJ over

[`40:40`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2440) YJ okay uh right it seems a little TJ T * XJ is good ah but YJ is a negative number so when I divided YJ and this inequality I flipped the I flip this direction of the inequality that that seems a little weird T should not be bigger than something it should have been less than something so as long as T is less than minus XJ over YJ I'm guaranteed to keep this non non-

[`41:10`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2470) negative or say like that then I'm guaranteed to keep it non- negative so for each J there's an upper bound on T that works so I'll choose the smallest of all those upper bounds that's my that's T star so okay so maybe I should have just said this to begin with so

[`41:28`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2488) so T star is just the Min over over all J such that YJ is negative of minus XJ over YJ okay if you choose T to be if you choose T star like that then you'll still be feasible and you'll have at least one more zero

[`41:49`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2509) component in your vector does that make sense okay so that can happen at most nend times okay why because they're only n coordinates so we can't we can't uh increase the number of zero coordinates indefinitely so that's case one case one was that there exists A J such that YJ is less than zero so case

[`42:15`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2535) two is that for all J YJ is bigger than equal to zero the opposite of case one and in particular one of these in qualities has to be strict right but now what can I do now notice now we have that

[`42:45`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2565) um a of X Plus Ty Y is well it's that's still equal to ax + T * a y which is equal to B and also we also have that X Plus Ty Y is bigger than equal to zero for all T bigger than zero so X Plus Ty Y is always

[`43:09`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2589) feasible okay but uh C transpose X Plus Ty Y is equal to uh C transpose X Plus T * cpose y this is a this is a positive number and what did I say I said that I said that this is

[`43:51`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2631) true right but case one handles all the case is when we have equality when cpos Y is zero so if if we're in case two it means that this inequality is strict so it means that this thing here is strictly

[`44:11`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2651) negative which means that we can send T to infinity and this thing goes to minus infinity which means that this LP is unbounded right but in our claim we said if the lp is bounded so this violates this is a contradiction so this case two can't happen if if the lp is bounded

[`44:30`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2670) okay and then when we're done so if if so when we're done uh you know case one can only happen a certain number of times case two can never happen when when we're NE when we're not in any of these cases we're finally at a vertex and we're

[`44:45`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2685) done okay other questions about this proof how do you get how do I get that this inequality has to be strict so what do we know we know that cpose Y is less than or equal to zero and we also know that if it were actually equal to zero then there would be a j such that YJ is strictly

[`45:14`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2714) negative right I didn't see how that was related so what does it so what does this mean it means it's either equal to zero or it's strictly less than zero and what I'm saying is if it's equal to

[`45:31`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2731) zero then there is a j such that YJ is strictly negative in other words if it's equal to zero we're in case one when you show that is such J so if there is such a j if there so if there is such a j then um there are two cases right either this thing is strictly negative plus there's such a j

[`46:02`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2762) or this thing is equal to zero and there's such a j but when it's equal to zero there's always such a j so like this this case one here covers a superet of the cases when cpose y equals

[`46:19`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2779) zero like if if we're in case two that means there is no such J right but if there is no such J then that's the contrapositive of this if there's no such J that means it's not true that cpose y equals z but if if it's not true that c transpose y equals 0o well the only other possibility left is that it's strictly less than

[`46:39`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2799) zero does that make sense yeah okay so yeah so um good so for us to be in case two this thing has to be strictly less than zero if it were equal to zero we would there would be a j and then we would be in case one

[`46:59`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2819) yeah any any other questions okay okay so so the cwy here is that if the lp is finite there exists a vertex in P achieving opt um and here's another cwy if p is not empty then it has at least one

[`48:15`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2895) vertex okay why is why is this true there's there's no objective function here anymore right so achieving op means that c transpose X is minimized at some vertex if p is not empty then why does it have at least one

[`48:39`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2919) vertex better for what there's no objective function here I'm just saying if I give you constraints of the form ax equals b x is at least zero there's no objective function I'm saying that this set has at least one vertex right vertices are defined in terms of P they're not defined in terms of objective functions

[`48:59`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2939) yeah but I mean uh yeah okay I mean yeah geometrically it makes sense but I mean you have to be careful right like if I if I allowed you other types of um if I allowed you other types of constraints you could imagine you could imagine a picture in an LP where one constraint is that you're below this line and the other constraint is that you're below this

[`49:22`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2962) line right um so now your feasible region is like everything in this range right this does not have a Vertex right but the problem with this is to to create this this is not in standard form so I claim that any LP in standard form has a Vertex why well we know that we know that for any objective function there is a vertex achieving opt for that objective function so just make up one okay consider the objective function minimize zero transpose X

[`49:55`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=2995) subject to X and P that has a Vertex achieving opt so that's a Vertex that's in P okay so yeah okay so before I finally write Simplex in some precise form I want to say one more thing about

[`50:23`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3023) vertices okay so definition given uh some X in RN Define a subx as the submatrix of a corresponding to the indices J such that XJ is strictly well that's say x is in P is strictly bigger than zero

[`51:04`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3064) okay so X can have some zero coordinates I just want to look at the non-zero coordinates and claim the claim is that X is a vertex if and only if The Columns of a are linearly independent okay yes thank you

[`52:11`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3131) so let me let me just write the let me just call this set B subx okay so first of all if this claim is true what does it tell you about the size of B subx X potentially B subx could be n

[`52:32`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3152) right okay so so and I told you n is at least M if we're in standard form so can it actually be n like it can be M right so the column like this is linear algebra now column rank equals row rank

[`52:53`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3173) right we only have M rows in a so the column rank of a subx cannot possibly be more than M okay so if it has full column rank being linearly independent means that has full column rank it means that a subx has at most M columns so this Matrix is M by something which is at most

[`53:15`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3195) M okay um okay good and by the way I claim a I claim a does have full rank in standard form the column rank of is at least M so first of all why is that the case uh look at the rows of a if any of the rows are linearly dependent that means there are redundant constraints so you can just toss out toss them out okay um so these these rows that are linearly dependent they're either redundant constraints or they're constraints that obviously violate another

[`53:52`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3232) one right like if if I have a constraint that says X Plus y five and I have another linearly dependent constraint which says X plus yal 7 that's an obvious violation and I can just forget and forget it and say this is an infusible

[`54:05`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3245) LP stand yeah yeah I guess I didn't say that but yeah let's just assume let's just assume that I I take out all those redundancies okay so I I remove redundant rows so now I have linearly independent rows

[`54:24`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3264) okay and now for a given vertex I know that a subx has um linearly dependent columns and there are at most M of them if there are strictly less than m i can then pad them with more columns to make it equal

[`54:43`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3283) m okay I know that the full column rank of a is M so if this thing has rank less than M I'll just add more columns to make it equal m and now have a square Matrix add more colums

[`54:58`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3298) well no because I know that let me maybe I'm getting too far ahead of myself let me let me prove this theorem so but no I don't have to change X I'm changing which J are in yeah I am I'm adding more of them uh yeah I mean I'm changing the set okay let me

[`55:27`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3327) okay let me let me prove this theorem and then I'll get to what I want to say because I think I'm trying to say too much without writing anything and it's confusing so okay so let me let me prove this

[`55:39`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3339) claim so the way I'm going to prove this claim is I'm going to prove the Contra positive twice okay I'm going to prove that not this implies not this and also not this implies not this so so uh I want to

[`55:59`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3359) show not vertex implies not linearly independent okay so again I'll use the definition a Vertex If X is not a Vertex implies that there exists y uh not equal to zero such that again X+ y um and xus Y are both in

[`56:36`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3396) p and I I know that this implies which implies that first of all it implies that a y is zero um and it also implies well a sub y say a sub y of Y is zero right and it also implies that if XI is zero it implies that Yi is zero remember we saw this last

[`57:10`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3430) time okay so what does this mean this this means that the columns of a sub y are dependent right but a sub y is a submatrix of a subx because of this right the place where y puts mass is a subset of the places where X puts

[`57:38`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3458) Mass so this implies that a y has dependent columns and which implies that ax has dependent columns since a suby is a submatrix of a of x [Music] um I don't think so because no it's no no no fewer y can be zero

[`58:43`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3523) right if XI is zero that implies Yi is zero which means the contrapositive if Yi is not zero that implies XI is not zero yeah yeah okay okay good okay so two is we want to show the Contra positive in the other direction which is that not linear not linearly

[`59:11`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3551) independent implies X is not vert a Vertex okay so not linearly independent implies that there exists a y such that a subx y is equal to zero right now what can we do we can extend so this this Y is not an n-dimensional Vector it's Dimension is equal to the number of columns of a sub

[`59:53`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3593) X but we can extend y to n Dimensions by making all other coordinate zero oh and this Y is not zero making all other coordinates zero so implies that there exists a y which is not equal to zero such that a y

[`1:00:21`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3621) is equal to zero okay and again again I claim that so what do we need to do to show that X is not a Vertex we need to show that X Plus Y and xus Y are both in P so the claim I claim

[`1:00:50`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3650) that for some strictly positive T X Plus Ty and xus Ty are both in P okay so why is that do people believe that why oh um I mean I'm afraid I I don't want to be in the situation where this has negative right so to be in p i want to make sure that all the entries of these vectors are non-

[`1:01:41`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3701) negative right so the point is that y only has mass in places where X also has mass right so if Yi is not zero that implies that XI is also not zero which implies that we can add or subtract a very tiny amount there and still make it positive right

[`1:02:04`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3724) so yeah so Y is now Ty yeah so yeah so so this implies that X is not a vertex okay good so now I can finally tell you what the Simplex algorithm actually is okay so for each um vertex

[`1:02:56`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3776) X and P we have some what's called a basis or base actually you just call bases or base uh bases yes thank you we have some bases um B which is the set of all J such that XJ is bigger than

[`1:03:23`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3803) zero and B is at most M okay so let me just remind uh people a basic linear algebra fact which is that if you have a matrix Vector product so let's say you have um c z where C is let's say a matrix of columns C1

[`1:03:56`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3836) up to c m this implies that CZ you can verify this yourself if you want C is just the sum over I from 1 to M of Z CI so Z are scalers right so whenever you have a matrix Vector product it's just a linear combination of

[`1:04:18`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3858) columns right so what do I know I know that I know that ax is equal to B because this x is in P so this thing here is just the sum over I of XI AI but XI is only

[`1:04:41`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3881) nonzero for I for I that are in B so this is equal to the sum I and B of XI AI which I'm going to write as uh a subb x sub B so a subb is a with restricted to the columns in

[`1:05:05`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3905) B now if B is equal to M the size of B is equal to M then a sub B is M by m and it's full rank remember the theorem we just proved said that at vertices uh The Columns are linearly independent so here we have an M bym Matrix with linearly independent columns which means it's full rank so it's invertible so this implies

[`1:05:33`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3933) that so we have we have AB XB is equal to B which implies that XB is equal to uh AB inverse B right so what this tell tells us is what this tells us is that if we're in a situ if we have a Vertex whose basis has size exactly

[`1:06:06`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3966) M then we can figure out what that vertex is just by solving this linear system right if we know which basis it is which set of uh columns it is we we'd get it now this is what I was trying to say earlier what if this thing is less than m in size then a sub B is not a square Matrix anymore it's m by something less than M okay but the point is that even if it's even it has less than M

[`1:06:36`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=3996) columns I could have extended the definition of b to add more columns to make it exactly M while maintaining linear Independence right then this would still equal that because the extra things would just have a zero here so I would still have AB being a linear being a full Matrix XB would equal B and I would still solve to get this and this would still be true okay

[`1:07:04`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4024) so so this I wanted to say is like a linear algebra fact so what we'll do is for every vertex v um extend its base to have size M while still being linearly independent so now we can rewrite we can rewrite the lp as follows Min cpose for any base for any base we can rewrite the lp as Min cpose XB plus let's say CB transpose XB plus CN transpose xn

[`1:08:18`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4098) where n is just the vertices that are not the coordinates that are not in the base such that AB XB plus a n xn is equal to B and XB xn are both non- negative okay and also notice

[`1:09:12`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4152) that um good so if I apply AB inverse to this equality here this here implies that for all X and P XB plus AB inverse a an xn is equal to AB inverse B yeah yeah so okay so here's what I'm

[`1:09:51`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4191) saying take a Vertex take its base okay and now what I'm saying is we can write so B is a base for some vertex for all yeah so every X so what I'm saying is fix a vertex and fix its base right

[`1:10:11`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4211) and now you can rewrite the original LP in this way okay so this is not AE for soorry this is a base for some vertex B is a base for some vertex fix it rewrite the lp in this way just break the coordinates into two partition the coordinates in two the ones in the base and the ones that are not in the base so you can rewrite it this way we haven't lost anything and now I can also I can just multiply this equality by AB inverse on both

[`1:10:39`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4239) sides okay AB is a full rank Matrix so I know that for any X and P I can write I can write that this holds so in particular XB is equal to AB inverse B minus AB inverse a an

[`1:11:03`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4263) xn for any X in B which implies for example that um CB transpose X or let's say C transpose X the objective is equal to CB transpose XB plus well CN transpose xn and then I can expand XB so this is equal to CB

[`1:11:56`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4316) transpose AB inverse B uh plus [Music] CN uh CN gets xn um oh there's too many variables here uh CN transpose CN transpose minus CB transpose AB inverse uh uh C XB plus C transpose xn let me write it slowly so I don't confuse myself

[`1:13:08`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4388) more this is minus CB transpose AB inverse a n xn plus CN transpose xn and then this thing here is equal to uh CN plus or minus a n transpose AB inverse transpose transpose transpose xn okay sorry okay

[`1:13:56`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4436) so I just wanted to rewrite so using the fact that I can write XB in terms of something that's a constant basically right this is a constant that doesn't depend on X at all and then something that depends on

[`1:14:09`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4449) xn and then now I want to rewrite this objective after I make the substitution for XB so here's my CN transpose xn okay huh CB here oh is there a CB there as well yeah there's a CB here I

[`1:14:34`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4474) guess right and then there's my CB transpose blah blah blah okay so okay good so this this thing here inside here I'm going to call C subn Tilda okay so here's now finally I can write Simplex Simplex maintain

[`1:15:22`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4522) current vertex X and its base B okay rewrite the lp As Above in terms of you know like XB and xn Etc if if C Tilda N is a non- negative Vector then Halt and return X if there exists J such that uh if there exists a j and

[`1:16:34`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4594) N such that c Tilda J is strictly negative then increment XJ as long as we can uh so that we maintain feasibility of X okay so this is the Simplex algorithm there's one annoying detail which I'll tell you right now

[`1:17:32`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4652) all so I mean I haven't proven that this works yet but is it clear what the algorithm is right okay and the initial vertex I told you in the beginning how to get that by solving another LP using Simplex

[`1:17:50`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4670) okay okay so what do I mean by incremented as long as we can so that we maintain feasibility well the point is that um XB actually depends on xn right so if you take some coordinate that's in xn if you take some J that's in n and you start changing it you'll actually change what XB

[`1:18:21`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4701) is okay and one of those things in XB might start decreasing and then eventually become zero right and then you can't change you can't change XJ anymore because then that coordinate will become negative so you change it as long as you can so that XB maintains that it's non

[`1:18:45`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4725) zero okay so by this thing here what I mean is keep incrementing if J as long as XB is non negative and remember XB depends on XJ it depends on all on the X ends over there okay so here's the annoying thing now remember we did this business of augmenting B to make sure it has size exactly M okay if it actually had size M always we're happy because what does it mean for B to have size exactly m without

[`1:19:20`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4760) augmentation it means that all of the all of XB is strictly positive postive right which means that there's some amount we can increment XJ by there's some nonzero amount we can actually increment XJ by before we violate feasibility however if we augmented it to become size M but it actually had size less than M before that means that some people in XB were already zero

[`1:19:48`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4788) which means that you might not be able to actually increment XJ at all right so what you do in that case is you just you you put X you put J into the base into the basis and you kick someone out

[`1:20:05`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4805) one of the people who's already zero but then now there's the question of which zero coordinate do I kick out to make room for J and if there are multiple J's with negative cost here which one do I put in Okay so

[`1:20:26`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4826) if uh XB is strictly positive can increment XJ a strictly positive amount to keep XB at least zero if um some J if some let's say k in B has XK equal to zero we might not we might not uh be

[`1:21:09`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4869) able to increment XJ at all at all while maintaining feasibility replace uh K and B with J when I say replace one thing and B with another thing I'm basically saying change your vertex right because vertices are in correspondence with bases with bases right same thing here when I increment J and then eventually something in XB becomes zero that thing that became zero gets Ked out of the base and then J gets put into the base I'm now adding new

[`1:21:58`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4918) vertex okay so how do you deal with this so if you're not careful if you just replace any K and B that's zero with J with any J that's negative you can actually come up with examples where you get into an infinite Loop you basically put someone in and kick someone out and then the very next iteration you'll do the opposite thing over and over again okay so

[`1:22:27`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4947) so there is a pivoting rule basically a way of choosing a way of greedily choosing who gets kicked out and who gets put in which provably has no infinite Loops this is called Bland's Rule and that's due to

[`1:22:56`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=4976) Bland in I guess the journal's math operations research in 1977 so maybe next time we're out of time next time I'll I won't prove that it has this property um but I'll just tell you what the rule is and then what I'll say is I'll you know I'll prove why this thing actually works it's it's not going to be too hard given what we've already done and then I'll show you why you can read you can basically read strong Duality off of the halting

[`1:23:26`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=5006) condition okay so when you're actually in this halting condition you can easily say a dual feasible solution which achieves the same cost as what the Primal cost is okay um yeah questions this is7 yeah so was it not realized that this was necessary origin

[`1:23:55`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=5035) I so definitely since Bland there have been other pivoting rules which also don't give you infinite Loops but I think I think even in practice today people people use sometimes use pivoting rules that they know can have infinite Loops but they just don't care because they think that that's not going to arise in practice anyway it's only like contrived cases yeah so I think it's true that before Bland um like they all had infinite Loops I think that's true

[`1:24:25`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=5065) but uh I don't yeah they might have even known that it could but they probably just didn't care I'm not sure yeah I mean anyway this algorithm is not by the way Simplex is still used a lot today even though uh all known pivoting rules so right there's

[`1:24:46`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=5086) always there's always um a choice here right so there might be many JS with negative tilled cost here so which one do you choose to actually increment XJ right or if you're in this case where you can't increment anyone which one do you choose to put to put into the base and to take out so these are called pivoting rules and there are many pro pivoting rules that people use some provably Halt and some can get into Infinite Loops but there is no known pivoting rule that takes sub that takes less than exponential time okay there's definitely there's no there's none that takes polinomial time

[`1:25:25`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=5125) so no implementation of Simplex is actually fast okay theoretically but they are fast in practice on real LPS that people want to solve so people use Simplex anyway I will tell you more about algorithms that provably take polinomial time but the first such discovered algorithm the ellipsoid algorithm uh is it's polinomial but it's not practical and I think people don't really use it for that reason

[`1:25:50`](https://www.youtube.com/watch?v=U7158Q-2rJc&t=5150) okay but there are faster polom time algorithms such as Point algorithms which I'll say something about so um any other questions okay
