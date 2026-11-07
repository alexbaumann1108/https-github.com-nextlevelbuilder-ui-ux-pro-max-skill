/**
 * Meet Your Captain. Swap the photo by changing `photo.src` to any file in
 * /public/photos. Write the bio in your own words; each string is a
 * paragraph.
 */
export const captain = {
  /** Shown as the heading. Set to null to show "A captain who knows these waters". */
  name: "Capt. Alex" as string | null,
  photo: {
    src: "/photos/snook-wading-big-fish-1.jpg",
    alt: "The captain wading in clear water, holding a big snook",
    position: "55% 30%",
  },
  /** Secondary photo on the Captain page. */
  photo2: {
    src: "/photos/redfish-in-the-mangroves.jpg",
    alt: "The captain holding a golden redfish beside the mangroves",
    position: "50% 40%",
  },
  intro:
    "A young fly fisherman who has spent the last six years spending more time on the water than in his own bed.",
  /** Your story, one string per paragraph. Edit freely. */
  bio: [
    "I'm from Charlotte, North Carolina and got my start fly fishing for trout in the North Carolina mountains. That's where I fell for the fly rod and learned how much a good cast matters.",
    "Then I found the salt and I've enjoyed it a lot more ever since. For the last six years I've fished the beaches and passes around Sanibel along with Pine Island Sound and the backcountry.",
    "Fly fishing is my specialty and sight fishing is what I really love. You see the fish, make the cast and watch it eat. Whether it's a snook cruising the beach or a redfish pushing along the mangroves, that moment is why I do this.",
    "Every season here brings something different. From April through August the snook move onto the beaches and the big tarpon show up in late April or early May. Juvenile tarpon are around all year. In the fall and winter the lower tides give us our best shot at tailing reds in the backcountry.",
    "I fish out of a 1720 Action Craft Fly Fisher SE. It floats in skinny water and poles quietly so we can get close to the fish without spooking them.",
    "Every trip is just you and your crew on one boat with me. I build the day around the tides and the weather and what you want to catch. If you're new to fly fishing I'll help you with the cast. If you've been at it for years we'll go looking for your next great fish. Light tackle is always an option too and your fishing license is covered through me.",
    "I handle every fish with care and get it back in the water quickly. These waters are why I'm here and I want them to stay healthy for the next angler.",
    "When I'm not on the water with clients I work part-time at Sanibel Fly Outfitters. I also serve on the board of the Sanibel Fly Fishers Club. Both keep me close to the local fly fishing community and up to date on what the fish are doing.",
  ] as string[],
  specialties: [
    "Fly fishing for beach snook",
    "Juvenile and migrating tarpon",
    "Backcountry sight fishing",
    "Light tackle inshore fishing",
  ],
  values: [
    {
      title: "Local knowledge",
      body: "Years on these waters and a feel for where the fish will be with each tide and season.",
    },
    {
      title: "Conservation",
      body: "Careful handling and quick releases so these fish are here for the next trip and the next generation.",
    },
    {
      title: "Personal trips",
      body: "One boat and one captain with a day built around you and the conditions.",
    },
  ],
};
