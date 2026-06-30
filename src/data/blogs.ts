// Shared blog post data - extracted from src/pages/SingleBlog.jsx
// Same content, exported as a typed module so server pages can import it.
export type BlogPost = {
  id: number;
  title: string;
  date?: string;
  description: string;
  image: string;
  content: string;
};

/**
 * Convert a string into a URL-safe slug.
 * "Surf Ethics-5 rules..." → "surf-ethics-5-rules-..."
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[‘’“”'"`]/g, '')
    .replace(/[—–]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

/** Stable, URL-safe slug for a blog post (derived from its title). */
export function getPostSlug(post: BlogPost): string {
  return slugify(post.title);
}

/** Find a post by its title-derived slug. */
export function findPostBySlug(slug: string): BlogPost | undefined {
  return blogsData.find((p) => slugify(p.title) === slug);
}

export const blogsData: BlogPost[] = [
  {
    "id": 100,
    "title": "Best Time to Surf in Sri Lanka - A Month-by-Month Guide for Europeans",
    "date": "2026-05-21",
    "description": "Sri Lanka's south coast (Weligama) and east coast (Arugam Bay) have opposite seasons. Here's a month-by-month breakdown of swell, wind, water temperature and crowds - so you book the right side of the island at the right time.",
    "image": "/blogs/blog1.jpg",
    "content": `If you're planning a surf trip to Sri Lanka, the single most important decision is WHEN you go - because Sri Lanka has two surf coasts with opposite seasons, and getting it wrong means flying 10 hours to find flat water.

This guide breaks down month by month: where to surf, what to expect, and why Europeans love Sri Lanka's south coast from November to April.

The two-season rule

Sri Lanka's south and west coast (Weligama, Mirissa, Hikkaduwa) is best from November through April. This is the dry season here - offshore winds in the morning, glassy clean waves, water temperature around 27–28 °C. This is when our Weligama surf camps run at full capacity with European guests.

The east coast (Arugam Bay) is the opposite: best from May to September, when monsoon winds shift offshore on that side of the island.

So if you're flying from Europe in your winter (November–April), the south coast - and specifically Weligama Bay - is exactly where you want to be.

Month-by-month south coast surf forecast

November: Season opens. Wave size builds through the month from knee-high to chest-high. Light morning offshores. Smaller crowds - best month for advanced beginners and intermediates wanting to upgrade before peak. Water 28 °C.

December: Consistent waist-to-chest waves. Light winds. School holidays bring more European travellers - book accommodation early, especially Christmas / New Year week. Excellent learn-to-surf conditions.

January: Peak season. Waves are clean and consistent - chest to head-high on the better days. Mornings are reliably offshore. Busiest month for surf camp bookings. Plan ahead.

February: Same conditions as January. Slightly fewer crowds after the holiday rush. Many returning European guests pick February for the best balance of crowds vs. wave quality.

March: Still excellent. Water slightly warmer, slightly fewer big swells but very consistent waist-to-chest playful waves. Great for skill progression.

April: Season winds down. Conditions are still surfable, but afternoon onshore winds get more frequent. End of April is when we wrap up the European peak.

May–October: South coast is unpredictable - monsoon brings onshore winds, choppy water. We close most south coast packages and either redirect guests to Arugam Bay or to our Morocco partner camp at Tamraght.

What you should book

If you're a beginner: December–March is the sweet spot. Soft rolling waves at Weligama Bay, sandy bottom, no reef, no currents. Beginner heaven.

If you're an intermediate looking to progress: November and February. Fewer crowds, real wave shape.

If you want guaranteed waves and don't mind crowds: January.

Why Weligama specifically?

Weligama Bay is widely regarded as Sri Lanka's best beginner and intermediate surf bay. The bay is over 2 km of sandy beach, the waves break gently and consistently, and there are no rocks or strong currents. It's also where The Surfer runs three of our surf camps - Beach Camp, TS2 and Soul Surfer - all within minutes of the bay.

Ready to book your Sri Lanka surf trip? See our packages and prices, or get in touch and we'll help you pick the right month for your level.`
  },

  {
    "id": 101,
    "title": "Surf Camp Sri Lanka for Beginners - Everything You Need to Know",
    "date": "2026-05-21",
    "description": "Never surfed before? Here's exactly what to expect at a beginner-friendly surf camp in Sri Lanka - from your first lesson to how soft-tops work, what to pack, and why Weligama is the world's best place to learn.",
    "image": "/blogs/blog2.jpg",
    "content": `If you've never stood on a surfboard but you've been dreaming about it, Sri Lanka is one of the best places on earth to take that first step. Here's exactly what to expect at a beginner-friendly surf camp Sri Lanka, and why it's the perfect starting point.

Why Sri Lanka is the easiest place to learn to surf

Three things make Sri Lanka - and specifically Weligama Bay - beginner-friendly:

Warm water (27–28 °C year-round) - no wetsuit needed, no shock when you fall in, longer time in the water without getting cold.

Sandy beach bottom - Weligama Bay is sand all the way out. No rocks, no reef. If you fall, you fall on sand or in water deep enough to be safe.

Gentle, consistent waves - the bay's geography breaks the swell down into soft rolling whitewater, perfect for learning to pop up.

By contrast, learning in places like Portugal or Indonesia means cold water, board-shop reefs, or waves that are too punchy for a beginner's first lessons.

Your first day at a Sri Lanka surf camp

At The Surfer Beach Camp Weligama, your first day looks like this:

7:00 - Sunrise wake-up, light breakfast at the camp restaurant.

8:00 - Theory session on the beach. Your ISA-certified instructor walks you through wave anatomy, paddle technique, the "pop up", surf safety and ocean etiquette.

8:30 - Practice on the sand - pop-ups, paddle position, foot placement. This builds muscle memory before you ever touch water.

9:00 - In the water. The first hour is whitewater (the soft foam after a wave has broken). Your instructor pushes you into waves so you can focus on standing up.

10:30 - Cool down, video analysis if booked. Instructors film and review your sessions.

11:30 - Brunch. Big meal - you'll be hungry.

Afternoon - Free time, optional yoga at 4 pm, second surf session for some packages.

Evening - Sunset on the rooftop, dinner together, get to know fellow guests.

The boards you'll learn on

Beginners ride soft-top boards - 8 to 9 feet long, super buoyant, very forgiving. Wide, stable, easy to paddle. We provide these and rash guards in every package.

As you progress (usually after 3–5 days), instructors graduate you to shorter and harder boards.

What to pack

A swimsuit you can move in (board shorts for men, a one-piece or surf-specific bikini for women).

Reef-safe sunscreen (SPF 50+).

A hat for non-surfing time.

That's about it - boards, rash guards, towels, and yoga mats are all provided.

How long should you stay?

We recommend at least 7 nights for a meaningful learning curve. In one week of daily lessons most beginners go from "never stood on a board" to "catching unbroken waves on their own". Two weeks and you're surfing the green wave with style.

Group sizes and instructor ratios

We cap lessons at 4 students per instructor. That means you actually get personal attention, not just a wave-pusher in a crowd of 12.

What if I can't swim?

You need to be a confident swimmer. Surfing happens in chest-deep water near shore, but you must be comfortable handling yourself if you fall.

What if I'm scared?

Everyone is. That's normal. Our ISA-certified instructors are trained to read your comfort level and start you exactly where you're ready. Most guests catch their first wave on day one.

Ready to start?

Browse our surf camp Sri Lanka packages or contact us with questions. We answer in English and German.`
  },

  {
    "id": 102,
    "title": "Weligama vs Arugam Bay - Which Sri Lanka Surf Spot is Right for You?",
    "date": "2026-05-21",
    "description": "Sri Lanka has two famous surf coasts - Weligama on the south and Arugam Bay on the east. They have opposite seasons, different wave shapes, and very different vibes. Here's how to pick.",
    "image": "/blogs/blog3.jpg",
    "content": `If you're researching surf trips to Sri Lanka, two place names come up over and over: Weligama and Arugam Bay. Both are world-famous surf spots. Both are on the same island. But they could not be more different - opposite coasts, opposite seasons, opposite levels.

Here's the honest comparison so you book the right one for you.

Season

Weligama (south coast): Best November–April. Offshore winds, glassy mornings, consistent waves. This overlaps perfectly with European winter - which is why Weligama is Europe's #1 winter-sun surf destination.

Arugam Bay (east coast): Best May–September. Same months Weligama is unsurfable. Arugam works in our summer when monsoon winds turn offshore on that side.

Verdict: If you're flying from Europe in your winter, you want Weligama. Period.

Wave type

Weligama: A long sandy bay with multiple peaks. The waves break gently and rebroke close to shore. Forgiving, beginner-friendly, but also enough power for intermediate progression. Walk-in surfing.

Arugam Bay: World-famous right-hand point break. Long, fast, powerful rides - but it's reef and rock at the bottom. Not a beginner spot.

Verdict: Weligama is unbeatable for beginners and progressing intermediates. Arugam is for confident intermediates and advanced surfers.

Atmosphere

Weligama: Bustling small town with restaurants, cafes, yoga studios, juice bars. Lots of European travellers. Social, lively, easy to make friends. The Surfer Beach Camp, TS2 and Soul Surfer are all here.

Arugam Bay: More remote, sleepier vibe. Smaller town, less infrastructure, more about the surf and less about the social scene. Beautiful, but quieter.

Verdict: Want a social surf-trip experience? Weligama. Want a quieter, focused surf-trip? Arugam.

Access from Europe

Weligama: Fly into Colombo (CMB), then ~2.5h by car or 3.5h by train along the south coast. Total transit time from most European hubs: ~13–15 hours.

Arugam Bay: Same Colombo arrival, then 6–8 hours of driving across the island. Tougher journey, especially after a long flight.

Verdict: Weligama wins for ease and time-efficiency.

Beginner vs advanced

Beginner: Weligama. No contest.

Intermediate progressing: Weligama (you'll get tons of waves) or Arugam (if you want a proper right-hander to learn line drawing).

Advanced: Arugam in summer (point breaks). Weligama in winter (less hollow but still very fun, especially the outer reefs on bigger swells).

Cost

Both are affordable by global standards. Weligama has more accommodation tiers and more competition, so you can find anything from budget hostels to upscale boutique stays. Arugam tends to be more uniform mid-range.

Our recommendation

If you're a European traveller planning a winter surf trip, book Weligama. It's the right side of the island for your season, the easier journey, the more forgiving waves, the better social scene.

If you're an advanced surfer planning a summer trip, Arugam is one of the best right-hand point breaks in Asia.

The Surfer's three surf camps - Beach Camp, TS2 and Soul Surfer - are all in Weligama Bay. See our packages and prices for the winter season, or contact us with questions.`
  },

  {
    "id": 103,
    "title": "How Much Does a Surf Camp in Sri Lanka Cost? (2026 Pricing Guide)",
    "date": "2026-05-21",
    "description": "Honest pricing for a 7-night surf camp Sri Lanka trip - accommodation, lessons, food, flights, extras. Real numbers in EUR so you can plan your budget properly.",
    "image": "/blogs/blog4.jpg",
    "content": `One of the most common questions we get from European travellers is: "What's the realistic total cost of a surf camp in Sri Lanka?" Here's an honest 2026 pricing breakdown - accommodation, lessons, food, flights, and the extras most other guides forget.

The big picture

For a 7-night surf trip to Sri Lanka from Europe, expect to spend €900–€1,800 all-in per person, depending on your accommodation tier and how you book flights.

That breaks down roughly as:

- Surf camp package (room + lessons + breakfast): €300–€700
- Flights: €450–€800
- Extra meals + drinks: €70–€140
- Airport transfers: €50–€80
- Activities (yoga extras, boat trips, whale watching): €30–€100

Let's walk through each.

Surf camp package pricing

This is where you have real choices. At The Surfer in Weligama, our three Sri Lanka camps cover three budget tiers for the same surf experience:

TS2 Camp (budget): Private AC room, ensuite, breakfast, 2 surf lessons per day Mon–Sat, board hire, video analysis. From around €40 per night for a dorm bed, ~€55 per night for a private room. 7 nights ≈ €280–€385.

Beach Camp (mid-range, beachfront): Same lesson package, but you sleep right at the beach with pool access. From around €70 per night standard private room. 7 nights ≈ €490.

Soul Surfer Camp (premium retreat): Rooftop infinity pool, rooftop restaurant, independent surf schedule. From around €100 per night. 7 nights ≈ €700.

All three camps share the same ISA-certified instructors and the same Weligama Bay surf. The price difference is purely accommodation tier and amenities.

See our /rates page for exact current pricing.

Flights from Europe

Direct or 1-stop options to Colombo (CMB) usually run:

- Frankfurt: €500–€800
- Munich: €500–€800
- Vienna: €550–€850
- Zurich: €600–€900
- London: €450–€750
- Amsterdam: €500–€800

Book 8–12 weeks in advance for the best prices. Avoid the December 22 – January 6 window if you want cheaper fares.

Tip: 1-stop via Doha, Abu Dhabi or Dubai is often cheaper and not much longer than direct.

Airport transfers

Colombo airport (CMB) to Weligama is about 2.5 hours by car. Options:

- Private taxi (we arrange): €50–€80 one-way per car (up to 4 people)
- Train to Matara then tuk-tuk: ~€10 per person but adds 2 hours
- Bus: €5 per person but ~5 hours total

We recommend the private transfer for first-time visitors - you arrive at the camp tired, just sleep.

Food and drinks

Sri Lanka is cheap. Outside the camp breakfast we include, you'll spend roughly:

- Lunch at a local restaurant: €3–€6
- Dinner: €5–€10 (Western), €3–€7 (Sri Lankan)
- Beer: €1.50–€3
- Fresh juice or coconut: €1

For 7 days of extra meals + drinks, budget €70–€140 per person.

Optional extras

- Whale watching in Mirissa: €30–€50 per person
- Boat surf trip to outer reefs: €25–€40 per person
- Cultural day trip (Galle / tea plantations): €40–€70 per person
- Extra private surf lesson: €25–€35 per session

Visa

Sri Lanka requires a visa for most European travellers. The current ETA system is ~€38, applied online, fast turnaround.

What you DON'T need to pay for

- Surfboard rental - included in our packages
- Rash guards - included
- Yoga (group sessions) - included in most packages
- Wifi - included
- Breakfast - included (extra meals optional add-on)

Realistic 7-night total examples

Solo traveller, budget (TS2 + budget flight): €1,000–€1,200
Couple, mid-range (Beach Camp + average flight): ~€2,000–€2,400 for two
Solo traveller, premium (Soul Surfer + business class flight): €2,500+

Compared to surf trips in Portugal, Indonesia or Costa Rica, Sri Lanka is excellent value for the wave quality, water temperature, and overall experience.

Ready to plan? See our packages or get a personalised quote.`
  },

  {
    "id": 104,
    "title": "Sri Lanka Surf Forecast - How to Read Swell, Wind & Conditions in Weligama",
    "date": "2026-05-21",
    "description": "A practical guide to reading the Sri Lanka surf forecast - swell direction, wind direction, tide effects, and which forecasting sites to trust. Plan your perfect surf day at Weligama Bay.",
    "image": "/blogs/blog5.jpg",
    "content": `If you want to surf the best waves of your Sri Lanka trip, you need to understand the forecast - not just read a wave-height number. Here's how the south coast works, and which forecasting sites we actually use at The Surfer.

The basics of Sri Lanka surf forecasting

Wave-height number alone is misleading. A 1-metre swell with offshore wind and a long period can be beautifully shaped chest-high waves. A 1-metre swell with onshore wind and a short period can be a choppy mess. You have to read four things together: swell size, swell period, swell direction, and wind direction.

Swell size (Weligama south coast)

Best beginner range: 0.6–1.2 m. Soft, rolling, easy to catch. This is most days in November to April.

Best intermediate range: 1.2–1.8 m. Real wave shape, faster rides, room for progression.

Advanced: 1.8 m+ swells make the outer reefs and points come alive. You'll want a boat to access some of them.

Anything above 2.5 m on the bay starts to get washy - better to head to outer reefs.

Swell period

This is the seconds between waves. Short period (8–10 sec) means weaker, wind-generated swell. Long period (12–16+ sec) means powerful ocean-generated swell - better shape, more push.

In Sri Lanka's south-west season (Nov–Apr) the typical period is 10–14 seconds - clean, organised waves.

Swell direction

Weligama Bay faces south. Swells from south-west to south-south-west wrap into the bay beautifully. South-east swells don't reach the south coast at all.

Wind direction

Mornings in the Weligama dry season (Nov–Apr) are reliably offshore - winds coming from the north or north-east blow against the wave face, holding it up clean.

By afternoon (usually after 11 am or noon), winds often turn onshore from the south-west. Waves get choppier. This is why every surf camp here runs morning lessons.

Surf forecasting sites we use

Surfline: Most popular globally. Has Sri Lanka coverage but can be slow to update.

Magicseaweed (MSW): Was the standard for years. Now folded into Surfline.

Windy.com: Excellent for wind direction - overlay swell on top.

WindFinder: Quick wind check for the next few hours.

Stormrider Asia: Good general info on the region.

Honestly: ignore the long-range (10-day) forecasts. They're guesses. Trust the 48-hour forecast and check it the night before.

Tides in Weligama

Weligama Bay is largely tide-agnostic for beginners - the bay works at most tide stages. For intermediates, mid-tide pushing high is generally best. Outer reefs care more about tide.

Tide range in Sri Lanka is small (around 0.5 m), so it's never as critical as it is in places like Indonesia or Portugal.

What we tell beginner guests

Don't worry about the forecast. Show up for your morning lesson, your instructor reads the conditions and adapts. That's literally their job.

What we tell intermediate guests

Check Windy.com the night before. If you see:
- Wind under 10 knots from the N or NE,
- Swell 1.0–1.8 m from the SW,
- Period 11+ seconds,
…you've got a beautiful morning ahead. Get to the beach by 7 am.

What if forecast says "no waves"?

There's almost always SOMETHING at Weligama Bay in season. Even on smaller days, beginner whitewater is still rideable. We've never had to cancel a lesson due to flat conditions in peak season.

Where to surf when the bay is too small

Plantations (10 min east) - picks up smaller south swells.
Madiha Beach (10 min east) - works on tiny days.
Outer reefs (boat access) - bigger swells.

Where to surf when the bay is too big

Inner reefs and the inside of the bay still work. Or go to a more sheltered beach like Mirissa.

The takeaway

Sri Lanka's south coast in winter is one of the most consistent surf destinations in the world. The forecast is rarely a problem - November to April you'll get plenty of surf days. Just pay attention to morning vs afternoon (always surf mornings if you can) and trust your instructor's call on the day.

Ready to come surf with us? See our /rates or contact us in English or German.`
  },

  {
    "id": 1,
    "title": "Surf Ethics-5 rules that every beginner needs to know about",
    "description": "Surfing is a challenging sport, it requires patience, commitment, and a lot of practice. However, there are some rules that every beginner surfer needs to know about before they hit the waves. Getting to know these rules will help you become...",
    "image": "/blogs/blog1.jpg",
    "content": `Surfing is a challenging sport, it requires patience, commitment, and above all skill to become an ultimate surfer. There are some unwritten rules, codes of conduct for surfing if you will that every beginner must comply with. This is not only important for their own safety but the safety of other surfers levitating on mighty ocean waves. 

Sri Lanka surf camps enforce surf ethics

Almost all surf camps in Sri Lanka not only comply with these rules but try to enforce them from time to time. As a beginner you also must have complete knowledge of these significant surfing rules, following are the 5 most important for you;

    Choosing The Right Spot

The first rule of surfing that you need to oblige with is to find a suitable spot for you to surf in. Remember surfing is not a joke and once you are doing it you are completely at the mercy of the ocean and your skill. Choose a spot that you think is safe for you and clearly demonstrates your skillset. Take into account the wind conditions, depth of the spot that you have chosen, wave intensity, and such. Be safe yourself first before you can help others.

    Avoid The Drop-In

After practicing a bit on the calm waters, a surfer will try to catch the green waves that are consistent and small to be able to surf freely in the ocean. What beginners don’t understand is that others around their spot are trying to do the same. What happens is that people start dropping into the wave which was meant for the surfer closest to the peak which is the first breaking part of the wave. Wait for your turn, avoid making haste, and respect others’ turns.

    Avoid Other Surfer’s Lines

Take a wider angle when you are trying to paddle yourself into a crashing wave because other surfers are trying to do the same. Go long and wide where the waves aren’t breaking or try to cling with the area where they are few surfers. This is to avoid drop-ins and not to ruin the enjoyment of other surfers ahead of you.

    Communicate With Other Surfers 

Communication is the key not only in surfing but in almost every part of life. Surfing Sri Lanka camps not only promote communication with other surfers but prioritize it too. Communicating with others can help you figure out there direction or which waves they are headed towards so you should cling with some other. Let others know your intentions, the turns that you want to take, and such. 

    Keep Tight Onto Your Board

Usually when the white waves appear (the mighty gigantic waves for pro surfing) most of the beginners would simply throw their board to dive underneath the wave. Don’t do this as it can seriously harm other surfers in your close proximity. The key thing to do here is to hold onto your board firmly because if you do then eventually you will be able to break out of the wave in front of you.

Final thoughts

These are some of the surf ethics that everyone whether a beginner or an experienced surfer should know and comply with. The ocean is not a joke and the only thing that will help you to become better and gain experience is to respect other surfers and cling fast with surfing ethics. Start your surfing journey today with TheSurferWeligama Sri Lanka, to have an impeccable experience.`
  },
  {
    "id": 2,
    "title": "5 health benefits of surfing that are just out of this world",
    "description": "When talking about the health benefits of an outdoor activity surfing seldom comes to mind. However, surfing is one of the most beneficial sports you can do for your body and mind. It offers a full-body workout, improves cardiovascular health...",
    "image": "/blogs/blog2.jpg",
    "content": `When talking about the health benefits of an outdoor activity surfing seldom comes to mind. But it offers a variety of physical and mental benefits as well. Not only is it healthy but it offers peace of mind to the person while allowing people to be able to get together with friends and family. You don’t have to be a professional for surfing just a little know-how of the activity will suffice. Sri Lanka surf camp arranges regular events and exercises regarding surfing so you can check them out for details. Anyway following are some of the extreme surfing benefits;

    Boosts your cardiovascular health

The direct benefit of surfing Sri Lanka is that you get a massive boost to your cardiovascular health. Surfing on waves is no easy feat, it requires immense stamina and exertion of energy. Your cardiovascular activity increases during surfing as the heart have to supply blood to the body in a fast fashion, this, in turn, strengthens your cardiovascular system. Your breathing also gets regulated during this exercise which prepares you to take on any strenuous activity in the future. 

    Relives stress

Surfing is a game-changer for those surfing with chronic anxiety and stress. It allows you to be able to connect with nature, the ocean, and more importantly yourself. You don’t have to struggle with surfing if you don’t want to, simply relax, lay back on the board, and enjoy the scenery.      

    Improved body flexibility

As waves toss you around during surfing you will be able to see a lot of flexibility, twists, and turns with your body which will evidently increase your stretching capacity. This helps in improving the overall mobility of your body, so not only do you get immense health benefits with surfing, gets to tone down your stress levels but at the same time improve the mobility of your body. 

    Leg and core strength

Hour-long surfing is equivalent to an hour-long session of squats, jumps, and burpees and anyone would know that staying a whole hour with the leg workout is not an easy task to pull. When you are surfing you are constantly mounted to your board which in turn is getting immense tension from the water, your chest remains pressed to the floor and this contributes to your overall leg strengthening and shaping the lower body. Not only legs but your abdomen is also exerted in this whole exercise as the muscles in the abdomen keep you properly balanced on the surfboard which develops them in the long run.

    Vitamin D intake

This is kind of obvious with surfing that you are getting enough sunshine which means that your Vitamin D requirement gets fulfilled. Vitamin D is an extremely significant vitamin that is not produced within the body and is responsible for regulating the calcium and phosphorous content of the blood thus strengthening your bones. All the fresh air that you breathe and the sunlight that your body is soaking up is making you more active and healthy every passing second. 

Final Thoughts

It might look a little odd at first, choosing surfing over every other sport out there but when you get into it you will not want to try anything else. You get a full-body workout in a single surfing session, have the most joyous time of your life with the waves, and most importantly you get to be free and with nature. So, in a way you are nailing this; having your fun and getting healthy, all at the same time.      `
  },
  {
    "id": 3,
    "title": "The Surfer-Brace Yourself for an Ultimate Surfing and Yoga Experience",
    "description": "Does the idea of riding humongous waves with utmost precision amaze you? Do you love the idea of being one with the ocean? If yes, then you are in for a treat. The Surfer is here to provide you with the ultimate surfing and yoga experience...",
    "image": "/blogs/blog3.jpg",
    "content": `Does the idea of riding humongous waves with utmost precision amaze you? Do you love spending quality time on beaches? or do you simply enjoy the serene vibe of the ocean? If yes, then The Surfer surf camp Sri Lanka can become your ultimate heaven in Weligama. With the best-equipped surf camps located at the pristine Weligama surfing beach, The Surfer is providing an uncanny surf and yoga experience to beach lovers. Learn more about our Sri Lanka surf camps located in Weligama and discover how we offer the best surfing experience in town. 
Why should you choose The Surfer for a power-packed surfing holiday? 

Surfing shouldn’t just be about grabbing the board and hopping into the water. You can turn your surfing holidays into much more! See it as a way of learning new techniques, interacting with new people, relaxing on the beach, and your holiday will turn out to be much more fun and exciting. If you are thinking about exploring the Weligama surf spot, the best way to do it is with us-The Surfer surfcamps in Sri Lanka

The Surfer is a surf camp located in Weligama, Sri Lanka, where you can have an unforgettable surf and yoga experience. The SURFER BEACH surf camp Sri Lanka is our main spot, which provides you convenient access to Weligama surfing beach and various other surfing spots. TS2 WELIGAMA surf camp is our second accommodation where you can enjoy social events, yoga lessons, amazing food, and much more. 

So, why you should choose us as your surfing and yoga partner? Well, these few reasons will be enough to make you fall in love with our Sri Lanka surf camps:

    Customized packages suiting your level of ambition and surfing standards
    Walkable distance to Weligama Surf spot and various other breaks
    Professional lessons with ISA-certified surf instructors
    Yoga lessons with certified professionals
    Amenities like pool and restaurants
    Social gatherings and events where you can meet other surfers and explore more about Sri Lanka 
    At least ten surfing breaks within a 10-minute radius 

Our Packages 

The Surfer offers very reasonable yoga and surfing packages. No matter if you are a beginner or an expert, we have ready-made packages customized to the needs of every surfer. You can go through our website and discover a variety of packages we offer to our customers. We offer beginner to advance level surf courses, so you can get the most out of your yoga and surfing journey at our surf camp. 

Visit our website now and book yourself an unforgettable surfing vacation! 

Book us now your unforgettable surf experience `
  },
  {
    "id": 4,
    "title": "5 BASIC SURFING TIPS FOR BEGINNERS",
    "description": "Are you a beginner surfer learning how to masterfully surf the shores? Here are 5 basic surfing tips for beginners that will help you become a pro in no time. Whether you are a beginner or an experienced surfer, these tips...",
    "image": "/blogs/blog4.jpg",
    "content": `Are you a beginner surfer learning how to masterfully surf the shores? Here are 5 tips from us to get you started! 
At Surf Camps Sri Lanka, we are all about ripping the waves with surfboards. But you must understand that surfing is an art that you pick up over time with practice and progress. It takes time but once you learn how to bounce those playful waves, your mind will stay in the ocean forever. 
For those who want a confidence boost before jumping into the ocean, here are five tips to ease your worries. Enjoy! 
Involve an Expert

No matter how fun and game you think it looks, surfing isn’t something you can just learn by yourself. You need to take help from either an expert friend or a surfing professional in order to learn the right techniques and reduce any chances of mishaps in the ocean. You can seek out a surfing teacher from surf camp Waligama, but make sure they are experienced and have a good reputation.
Buy a Big Surfboard

This is one of the most useful tips for beginner surfers. No matter how tempted you are to surf on those lean, sleek, and smaller boards, we advise you to stick to a bigger board as long as you are still in your learning phase. A bigger surfboard can help you pick up more waves at the start and apply fundamental mechanics more effectively.
Start with Beginner Waves

One thing that is extremely crucial to your surfing success is that you choose a beach that is ideal for surfers who are just starting out. Beaches that are known for calmer and steadier waves often provide a nice surfing spot for beginning surfers. Surfing smaller, calmer waves at the start will help you develop good mechanics and ease out your learning process. So, before you try to tackle harsh waves in the ocean, search out a good surfing spot for beginners and practice your moves until they are perfect.
Dry Land First

This tip will certainly help in the long run. When you go out on the beach to surf, don’t jump directly into the water. Instead, take some time on the dry land first to warm up and stretch your body. Observe your surrounding and see what other surfers are doing. Check on the waves, are they short, small, or steady? Also, before heading into the ocean, make sure your leash is perfectly tied and your surfboard is in perfect condition. Make this a habit and you will have a smooth surfing experience for life!
Pace Yourself

Before you begin surfing, take some time to pace yourself. Pacing is extremely crucial to a smoother surf and significantly reduces the prospect of injuries. Remember, once you are in the ocean, you have all the time in the world to surf. So, relax for a moment and pace yourself for a while. 

Last advice, you will become an excellent surfer only when you practice, practice, and practice. Before you hop on your surfboard, remember these tips, and enjoy your time in the ocean! `
  },
  {
    "id": 5,
    "title": "WHAT ARE SURFBOARD FINS?-HOW MANY TYPES ARE THERE?",
    "description": "It doesn’t matter if you are a professional or a beginner level surfer because you need to understand the different types of surfboard fins available. There are several types of fins, each with its own unique...",
    "image": "/blogs/blog5.jpg",
    "content": `It doesn’t matter if you are a professional or a beginner level surfer because you require good fins to surf especially if you want to tackle the high waves. You don’t want to be choosing the wrong surfing fin especially if you are opting for a surfing camp in Sri Lanka. But there are literally so many types, sizes, and shapes of these fins, how can one choose? That is the question that you should be asking all along. But before that let’s get one thing squared right away and that is what are surf fins to make the whole endeavor easier for beginners;
    
    What are the surfboard fins?

Have you ever seen the bottom of your surfboard? The small protruding elements that you see at the far end of your surfboard are the surfboard fins. These might look like shark fins or have a similar alignment. The very purpose of these fins is to help you steer your surfboard in whatever direction you want based on the current breaking situation of the waves or where you want to steer next. There are multiple sizes and shapes of these fins but the main types are the glass-on fins and the removable fins.

Types of the surf fins

In surf camp in Sri Lanka, you will find many surfers opting for the glass-on fins because they don’t want to deal with the mess of removing and reattaching a preferred type of fin every time they are facing crashing waves. More details about these can be found below;



 Glass-on fins

These glass-on fins are plastered directly onto the surfboard with the help of fiberglass. It means that these can’t be removed even if you wish to do so. You would get a much more pleasant ride with the help of the Glass-on fins and these are of sound construction too. If you are content with one type of fin and don’t want to experiment too much with these then you are better off with these types of fins. Otherwise, you might want to give the removable fins some kind of seeing.

 Removable fins

Most of the people when they come to visit The Surfer Weligama, Sri Lanka surf camp, are mainly rooting for the Glass-on fins without giving much credit to the removable fins. But only when they come around to the possibilities and the diverse use cases of the removable fins do they begin to lose support for the glass-on fins to support their removable counterpart. 
You get more ease of use and diversity with the removable fins because in case you don’t like them or are not satisfied with one specific type of fin, you can just be rid of it and try out a new one, the same can’t be said for the glass-on fin system. You can allocate many of these removable fins into your fin box with the tightening key. Whenever you want you can use the key to unscrew the previous one to slap a new one onto your surfboard. It takes a bit of time and getting know to the procedure but after that, it is like a piece of cake. `
  },
  {
    "id": 6,
    "title": "CURRENT SITUATION IN SRI LANKA",
    "description": "All you need to know for hassle free and easy surf trip! THE LATEST UPDATE ON SRI LANKA. Despite the current economic crisis, Sri Lanka remains a safe and welcoming destination for travelers...",
    "image": "/blogs/blog6.jpg",
    "content": `Probably you heard about it or seen on TV. Sri Lanka is going through political and as result economic crisis.

You might be wondering if you have to postpone your so awaited surf trip.
We can assure you – No, you don’t have to!

Despite the unrest in capital city, surf destination for this season – Down South – is completely safe and calm with paradisiacal beaches waiting for you.
Even though it has been calm and peaceful last 2 months till now all islandwide 

To assist you with all the questions you might have and further calcifications we made this update on the latest situation in the country.

People are asking for a fundamental reset of the country through progressive policies and overall change of the system.

The first step that we’ve now seen happen is the election of President Ranil Wickremesinghe, which is part of a solution that Sri Lanka will have to necessarily embrace – difficult reforms to reset the economy.

Obviously it doesn’t mean quick changes and immediately good life, but its a good start for a brighter future people deserve on this beautiful island. And we fully support it!
IS THE SURFER OPEN FOR THE SEASON?

Yes, we are open and ready to rock the world best waves with you 🤙🏻
HOW’S THE SITUATION IN WELIGAMA?

Weligama as always – is tranquil and beautiful village on the shore, full of pristine beaches, surf points, restaurants and other touristic spots. 
The peaceful protests took place in Colombo. We’re far away from all of that, so here you wouldn’t even notice the country is at unrest. Life just goes here it’s usual way.
There are some daily power cuts (few hours) but we got you covered since we have a generator.
IS IT SAFE TO TRAVEL?

Absolutely YES.

We can provide you with the transfer from and to the airport, as well as take care of all the necessities here at the camp
IS THERE ENOUGH FOOD?

Absolutely. You don’t have to worry about it.
Leave it for us. At our rooftop restaurant and lounge you’ll have plenty of choices from our new menu of both – Sri Lankan and European cousins.
IS THERE ENOUGH FUEL?

The question of how you can get around is one of the most important in given circumstances.
Trains and most of buses are running. Taxis are available, as well as organized transfer from and to the airport.
There has been a shortage of fuel around the country indeed. But the government introduced new procedure recently: Tourists and Authorized Tourist Drivers have priority at the fuel stations now. Upon request we can also organize a tour around Sri Lanka.
ARE THE TOURIST ATTRACTIONS OPEN?

Yes. All cultural sites, national parks and other main tourist attractions are open.
WHAT ARE THE LATEST GUIDELINES ON ENTERING SRI LANKA DUE TO COVID-19?

Fully Vaccinated travelers: are exempted from pre-departure & on-arrival COVID-19 PCR/ Rapid Antigen tests.

Not-Vaccinated & Not-fully vaccinated tourists just need to show a negative PCR test report within 72 hours or Rapid Antigen Test report within 48 hours prior to embarkation of your flight to Sri Lanka.

Covid 19 Insurance is not mandatory, However Sri Lanka Tourism recommends that visitors travel with their own Insurance which have a covid cover.

We are looking forward to welcome you at The Surfer Sri Lanka`
  },
  {
    "id": 7,
    "title": "EVERYTHING YOU NEED TO KNOW ABOUT DIFFERENT SURFING STYLES",
    "description": "Surfing is a complete sport as it engages every muscle in your body. You are using your arms, legs, and core to paddle out, balance on the board, and ride the waves with style. However, there are different surfing styles...",
    "image": "/blogs/blog7.jpg",
    "content": `Surfing is a complete sport as it engages every muscle in your body. You are immersed into it from neck-up i.e. with your mind focusing on the ever changing wave patterns and the waist down i.e. your legs and feet hoisted firmly over the surfboard. Every surfer learns the art of surfing slowly and in a consistent manner and in doing so they might develop certain styles of surfing. 
These styles of surfing are a personal preference of the surfer and might be different in principle and in execution from surfer to the surfer. Without further ado following are some of the most popular surfing styles even in Sri Lanka surf camp;
Down the line

It is a specific style of surfing that involves the surfer putting their back into gaining momentum with the approaching wave and then kind of surfing along with its outlines. This style of surfing involves rapid movement of the body, taking quite a few turns and twists as the pattern of the wave changes. With that being said you need to take on the wave as it is breaking or is about to break to nail this surfing style.
Tube riding

It is associated with surfing well within the curve or barrel of a finely shaped wave that is breaking around the seams. The surfer doing this specific style of surfing seems to be almost engulfed by the wave encompassing the back of the surfer while he seems to be coming out of its mouth. The waveforms a moving tube or cylinder and continues to remain intact around that configuration ranging from a few seconds to even a minute.
Nose riding

It is the art of maneuvering your surfboard from the front side. When you catch a wave you simply angle your nose into the direction you plan on riding, you would also have to paddle a little into the wave to be able to promote this turn. This style is better performed over surfboards that are more than 9ft in length.
Front foot

This is a type of surfing style where most of the weight is on the front foot which means that the surfer’s chest and toes are going to be facing the wave. These surfers prefer to ride a relatively smaller and wide fish-type board. You typically stand with your back foot one-palm length away from the board’s tail and the front foot might be slightly ahead of the surf board’s midsection. Hold onto this pattern when approaching a wave to ride on it.
Back foot

This is yet another surfing style taken on by many professional surfers where most of the weight is on the back foot. The front foot only works to maintain balance on the board and has no role in the turning process while it is the back foot that you use to accelerate or decelerate your speed onto the surfboard. Many surfing camps in Sri Lanka are already educating the surfers with back foot surfing style as it is more in demand in highly aggressive wave encountering areas.`
  },
  {
    "id": 8,
    "title": "TEN TERMS FROM THE SURFING WORLD YOU MUST KNOW!",
    "description": "Every sport out there has its own specific lingo and to be able to understand the sport you need to know the terms used in it. Surfing is no different, it has its own set of terms that you need to know to be able...",
    "image": "/blogs/blog8.jpg",
    "content": `Every sport out there has its own specific lingo and to be able to understand many terms that are thrown out there by the people who play it you must be inside the circle. As for surfing, there are plenty of terms that are most commonly used among experienced professionals and a beginner would have a hard time drawing any sense of meaning from these. 
Surfing terms are easier than you think

You can easily learn the meaning of this slang, all it requires is a keen sense of attention and that is about it, you don’t need to be a pro to be able to understand these. Most Sri Lanka surf camps already use this slang so if you are planning to go there for surfing then you must know the following terms;
1. Wipeout

This means falling from your board into the water especially when you are out there riding a wave. As in getting wipeout by the wave into the water.
2. Leggie

Leggie is referred to as the leg rope or the lease that keeps you anchored to the tail of the surfboard so that you don’t wash away into the ocean especially when you wipe out.
3. Pocket

It isn’t your own pocket as it refers to the wave that is closer to the whitewash. This is where you should be surfing if you are after speed and consistent momentum throughout the surfing. The steepest part of the wave is also known as the energy zone and is only meant for professionals to leap into.
4. Thruster

It is a three-finned surfboard that has become quite popular among modern surfers as it offers more anchoring and balances out your weight equally on the water. Also, it is acquainted with better handling and movement within the water.
5. Kook

If you are a beginner then you might have heard the term frequently and often a pro also calling you a kook. A kook is basically a beginner with little to no knowledge of the surfing etiquette and that is why is endangering other surfers.
6. Offshore/Onshore

It refers to the direction in which the wind is blowing and if it is favorable for a specific type of break or not. The onshore wind is that blows from the ocean towards the land and the offshore wind blow from the shore towards the sea. Professional surfers would often be calling out to each other to determine the offshore/onshore scenario.
7. Going over the falls

It is the act of being sucked over with a breaking wave when you pull back on the take-off which results in a failed duck dive. It is quite a view but not so much when you are on the receiving end of it.
8. Duck dive

Duck dive is taken from the way ducks dive inside the water only to appear on another end of it. It is when you plan to dive under the water to catch or dive underneath an approaching wave. It is quite cool if you can pull it off but generally, beginners care more about their training than pulling a stunt like this.
9. Shorey

These are the waves that break right there on the shore are known as the shorey and are quite impactful kind of impossible to get past.
10. Lineup

Now, this is among the most exciting space on the beach, as this is the place where waves are breaking and forming again. Surfing in Sri Lanka will help you to prepare for some of the great lineups so you can catch waves easily there as a beginner. You would see a lot of surfers waiting to get into position for when a set of waves arrives, it is also known as the takeoff zone.`
  },
  {
    "id": 9,
    "title": "5 EXCEPTIONAL WAYS TO IMPROVE YOUR SURFING 2022",
    "description": "There is always a price to pay, a compromise that needs to be done when it comes to improving your surfing skills. No matter how good you get, there is always room for improvement and here are 5 exceptional ways...",
    "image": "/blogs/blog9.jpg",
    "content": `There is always a price to pay, a compromise that needs to be done when you want something and want to achieve it with your whole heart. The same is true for surfing or any other sport out there, you want to get better at it. 
You would have to practice the hardest and of course, there is a timeframe following which you will be able to see a clear distinction in terms of your performance boosted and your skills developed. But as a beginner or intermediate surfer you can get better instantly at surfing if you would just following the following exceptional ways that are also preached time and again by the Sri Lanka surf camp;
Employ better equipment

If you are using a surfboard that wobbles around as soon as it catches an active current in the ocean then you have to change it with a broader and better alternative. You simply can’t get better at something without the use of proper equipment and the same is the case with surfing. Don’t try to skimp money on this aspect because it can prove to be a life-saving element for you especially if you are way away from the shore and the wave suddenly choose to die down, a broader and better board will be able to carry you through.
Be a bit flexible

You don’t need to stand tall on your surfboard trying to surf through mighty waves. Some people do just that because they are either inexperienced or are suffering from severe stiffness in the legs, hips, and lower body. Whatever the reason might be try your best to lean a bit and remain flexible because this is the only way you will be able to have some sense of control and focus while riding that surfboard.
Work on your fitness

You need to be in tip-top condition fitness-wise if you wish to surf like a pro. It goes without saying that surfing is a charged sport which means that you would have to move around quickly, perform certain actions in the blink of an eye, and be extremely energetic in all takes of the sport, or otherwise you won’t be able to get better. Try slapping together a fitness regime, a few squats, lumberjacks, sit-ups, pushups, and a keen focus on your diet will help you to better prepare for the hard and dry routine of surfing.
Warm yourself up before engaging in an active session

Surf camps Sri Lanka will advise you time and again that you must warm yourself up before engaging yourself in an active session. It will allow you to catch a proper break with your body, vitals and just gets you in the momentum. Don’t fret even if you have missed a few waves while you were warming up as this way you will be able to engage at a better note with those that you manage to catch. Squatting, jumping, twisting and pushups are all great ways, to begin with, a pre-surfing fitness challenge.
Develop a proper rhythm

Now that you have done everything that was required of you to get on with the surfing and are finally getting ready to catch an eccentric wave, try your best to follow a proper rhythm or you are going to mess it all up. Sometimes you would approach the breaking wave all too excited and will lose balance causing you to thrash into the water and resulting in excessive anxiety that you are doing something wrong. 
You are not doing anything wrong surfing Sri Lanka is a bit harder especially if you are not in your element and relaxed and most importantly lack a proper rhythm, have all of that and more inline to make sure that you rock eccentrically on the waves that welcome you in the bright blue ocean. `
  },
  {
    "id": 10,
    "title": "SIX COMMON SURFING BLUNDERS BEGINNERS MAKE",
    "date": "25. October 2022 / Surfing",
    "description": "Most beginners that come around surfing think that it would be an easy job, they quickly realize that it requires a lot of practice and dedication. However, there are some rules that every beginner surfer needs to know...",
    "image": "/blogs/blog10.jpg",
    "content": `Most beginners that come around surfing think that it would be an easy job, they will get a few lessons, catch the first wave on their own and it will be a job well done. But that is seldom the case. Surfing is as peculiar as it gets, there are a lot of uncertainties that begin to surround you as soon as you set your foot into the open ocean. But the most terrifying aspect of it all as many beginners come to witness it later are the mistakes that they make. 
Join a surfing camp

To make sure that you don’t end up making these mistakes you should join a surfing camp such as the Sri Lanka surf camp, The Surfer Weligama, where you come to learn all there is to about surfing, including the common mistakes that beginners do and how to avoid them. Following are the six most annoying surfing blunders and ways you could ensure your safety;
1. Selecting the wrong surfboard

The first mistake many beginners make as they imitate the pros is to use a smaller surfboard. These catch smaller waves, are extremely fast at turns and twists, and therefore very hard to control. On the contrary, they should be choosing wide and longboards as these can surf easily, catch more waves, and are easier to control. These are also very easy to paddle your way out of a gigantic wave as compared to a small board that requires an immaculate skillset.
2. Positioning yourself incorrectly on the board

The very method of catching the wave while on the board is to lean forward towards its nose so it can have more gravity to catch the wave. But on the other hand, if you lean too much then the chances of the surfboard tipping itself over also increase. To avoid this you must imagine the center of the board and position yourself on this imaginary line to catch the wave and avoid tilting it sideways.
3. Failing to contemplate the surf conditions

As a surfer, you must be able to read the surfing condition such as the intensity of the wave, wind speed, and beach conditions. If you fail to read these conditions correctly then it could result in the surfer being mashed up with strong currents of waves. 
Get timely information on wave currents, wind speed, and other such conditions before you charter a journey into the thrusting waters. Joining a surf camp as there are many competitive surf camps in Sri Lanka can help you become a pro not only in surfing but also in reading the surf conditions.
4. Missing a foot leash

Be smart in making your safety decisions based on the fact that you are a beginner and not a professional. Many beaches advise you to wear a foot leash by law tethered to your surfboard. This will help you find floatation especially when your surfboard tips over and you are met with mighty rippling waves.
5. Wrong paddle speed and timing

Catching a wave is all about timing and the paddle speed. Many beginners would either start to paddle too soon or too late and the same goes for misinterpreting the paddle speed. Make sure that your power stroke is strong enough to match the speed of the wave and calculating the flow of the wave is also an important factor to consider.
6. Adding too much weight on the back of the surfboard

It might be tempting to lean a little back on your surfboard for the sake of slowing down and maintaining ground longer with a wave carrying you. But if you are not a pro or don’t know how to do this right then it almost always results in the board tipping backward and you falling off of it. Always place your weight forward especially if you are leaning to maintain the equilibrium of weight to ensure the board doesn’t tip over and you fall into the ocean. `
  },
  {
    "id": 11,
    "title": "WHAT SIZE OF SURFBOARD IS BEST FOR YOU?",
    "description": "Regardless of the fact if you are a beginner, a professional, or just in between the two, choosing the right surfboard size is crucial for your surfing experience. A surfboard that is too big or too small can hinder your...",
    "image": "/blogs/blog11.jpg",
    "content": `Regardless of the fact if you are a beginner, a professional, or just in between choosing the right surfboard is extremely important to your success as a surfer. The building of knowledge such as choosing a surfboard on the basis of the wave intensity and different surfing situations is going to take some time but that shouldn’t stop you from choosing the right surfboard right now. 
CHOOSING THE RIGHT SURFBOARD FOR YOU

Multiple Sri Lanka surf camps offer surfers a choice of choosing their own surfboard based on their personal interests, surfing level, and other such factors. But if you want to do it right as choosing a surfboard is the most elementary thing for a surfer starting on its own surfing journey then the following are a few factors for you to consider;
Skill level

If you are just starting out you would do just fine with a beginner’s surfing board on the other hand if you are a professional then you need more diverse options. The specs of a beginner’s surfing board are that it should be7-8 feet in length, 22-23 inches wide and 3 inches thick. This configuration provides you with a surfing board that is broad enough to offer the stability and floating that you require. You can then begin to refine your surfboard as time goes and as you continue to learn new skills.
Fitness level

The choice of a surfing board is also extremely influenced by the overall fitness level of the surfer. If you can maintain good stamina then you need a less broad board because you can manage yourself well out there on the waves as compared to someone who used to surf previously but has not done so in many years. This person has definitely lost his stamina along with the core skill set to be facilitated with the pro board lineup.
Height and weight of the surfer

The height and wave of the rider also play an important role in determining which surfboard will work best for you. If you have a long height but a manageable weight then you will do just fine with a slightly less board and periodically long surfboard. On the other hand, if weight is more and height is only fine then get yourself a broad board to have all the floatation and stability on the waves. Surf camps in Sri Lanka offer specific guidelines in this regard.
Your preferred wave type

This is the most intense factor that will help you determine what kind of surfboard you actually want. Your favorite wave types can be more than one and depending on the beach that you are surfing in and the weather conditions you might need a whole set of surfing boards, to begin with. If the waves are catching height such as at 3-6 feet then you are going to need a high-performing shortboard that can fit itself well into the wave pocket. On the other hand, if the waves are calm but consistent then a broad board will help you to gain more stability and consistent gliding at the surface of the wave.
Best surfing camp in Sri Lanka

Surfing in Sri Lanka proposes its own specific challenges and things that will require time for you to get a grip on but with our surf camp in Sri Lanka on your side you can come on top of these challenges pretty easily. The Surfer Sri Lanka is one of the more reputed surf camps in Sri Lanka that allows you to get proper direction into the world of surfing, doesn’t matter if you are a beginner or already have an understanding of the art our surf camp in Weligama will help you become a better surfer. `
  },
  {
    "id": 12,
    "title": "THREE SURF SAFETY ESSENTIALS FOR THE BEGINNERS",
    "description": "If you ever wanted to be free like truly liberated in every sense of the word, then surfing is the sport for you. However, before you hit the waves, there are a few safety essentials you need to keep in mind as a beginner...",
    "image": "/blogs/blog12.jpg",
    "content": `If you ever wanted to be free like truly liberated in every sense of the world then there is nothing more auspicious than taking up surfing. When you are up there, glistening on the mighty ocean’s tide and coming down strong towards the shore it feels like every happy moment of your life has accumulated at this one event, at surfing.
Surfing is rewarding but when you practice safety

If done right surfing can be rewarding both in terms of physical exercise and practicing the internal calm that you will feel stepping off of the ocean. But at the same time, there are things that you must do to ensure not only the safety of others but yours too. A small miscalculated fluke in the ocean could lead to catastrophic events that is why it is better to be on guard and practice the safety parameters provided to you during training in surfing camp Sri Lanka. To give you a revision on the whole thing following are the three most important safety essentials that you as a beginner must hold onto;
1. Protect others and self

The first thing that you need to learn is to protect yourself and then the others because without personal safety you can’t do anything about the others. As a beginner you are going to fall repeatedly off of your board, get used to the feeling. When you are falling into the water take your arms up and cover your head because you can never know what is under the water and what you might hit. 
It could be a pointy rock, your own board, or some other floating thing passing by. That is why always try to cover your head when you are about to take a fall. Another thing to remember is to never let go of your board, stick to it as you mean it. Try using a foot leash or strap and strapping it onto the surfboard because if the board gets away from you then it could hit other surfers causing a wave of panic in the open water. Try to remain intact with your board at all times.
2. You should be fit enough

You don’t need to be a husk or a weightlifting champion to be able to surf, the only thing that is asked of you here is that your general fitness level allows you to be on water fighting the waves. Surfing is an extremely demanding aerobic exercise that is going to take a lot away from you in terms of stamina so make sure you have plenty. Other than that your chest and arms should be strong enough for the sake of pedaling and of course, you must know about swimming, these are the things that you might come across during your lessons at the Surf camp Sri Lanka.
3. Plan your entry and exit in the ocean

It is essential to narrow down beforehand your entry and exit from the water and this must be done while you are still on the beach. This is important for two reasons, first, you have to ensure that the path that you are choosing to enter and exit doesn’t disturb other surfers or bring out the possibility of you running into them and causing hurt. Secondly, it is important to have a lay of the land to ditch the spaces where the chances of a strong current are imminent or where there are a lot of rocks and you fear stumbling over there. So, it is best to grab a clear itinerary of how you plan to enter and exit the water to ensure the safety of everyone around you including yourself too.  

If you want to have the ultimate surfing experience, choose our Sri Lanka surf camps The Surfer, Weligama Surfing Camp or TS2 Weligama surfcamp, and leave your worries behind!`
  },
  {
    "id": 13,
    "title": "A QUICK GUIDE TO SURFING FOR BEGINNERS",
    "description": "People are taking up surfing as a hobby right and left and unlike other sports, surfing has a unique culture and set of skills that can be challenging to master. However, with the right guidance and practice, anyone can learn to surf...",
    "image": "/blogs/blog13.jpg",
    "content": `People are taking up surfing as a hobby right and left and unlike other sports where practice makes you perfect surfing requires a dedicated mindset and technique above practice to become competitive. This might be the only sport out there where professionals don’t take kindly to the beginners and are not as helpful and supportive as other sports pros out there. But that doesn’t mean that you shouldn’t learn about it properly, joining a surfing camp Sri Lanka might be the right step in that direction. 
You will learn about different sports gear, factors to bring into account when choosing a surfing location, how to ride and not be a danger to other surfers. In short, you will learn all there is to learn about surfing through joining an accredited surf camp. Here is a brief guide that will help you to set yourself on the right path;
1. Where to surf

The first thing that you need to get right from the get-go is that you should be able to find yourself a soothing spot where you are to surf. The intensity of waves and being far away from the beach plays an important role in this. Given the fact that you are a beginner, you don’t want to choose something that is too far ahead with strong wave currents. Find a spot where waves are not that gradual and they break slowly. Bury your ego and go to the section of the beach near the ocean where kids are learning if you don’t have any gripping experience of surfing.
2. Watching the surf

Now that you have found yourself a perfect spot for you to surf the next thing is surfing of course. Before jumping onto your board and joining the ocean gives a long 30-minute observatory session to what is going around. Examine where other surfers are paddling out, the point where the waves are breaking and the skill level of the people in the water. It will give you a nice overall idea of things that you need to be on guard for, water-breaking patterns, and more.
3. Be polite with others

Remember that ocean is not a place for anyone to pick a feud with others, it is pretty dangerous as it is you don’t want to be arguing or bottom line rude to others. Be polite especially with the locals because they have been around this space for far too long and know about the ocean and surfing more than you do. Heed their advice with gratitude and make surfing safe for all.
4. Respect the rules

There are general rules out there, ethical points if you may that every beginner and professional should not only understand but practice too. It doesn’t matter if you are from one of the surf camps Sri Lanka or in any other country try to learn these rules to the best of your understanding. The most important of them is the one-person surfs per wave rule.
5. One person surfs per wave

The surfer who is closest to where the wave is going to break has the first priority and should catch it, intervening from behind or center is not only dangerous but unethical too. Indicate your direction to the other surfers too by shouting ‘going left’ or ‘going right’ so they know where you are headed and can change their direction beforehand. These are some of the essentials of surfing that you need to comply with especially if you are a beginner. Start your surfing journey with The Sufer/ Surfer Weligma and leave the rest on us. `
  }
];

export default blogsData;
