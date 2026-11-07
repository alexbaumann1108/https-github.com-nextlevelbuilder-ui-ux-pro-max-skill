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
    "A young fly fisherman from Charlotte, North Carolina who has spent the last six years fishing the waters around Sanibel Island.",
  /** Your story, one string per paragraph. Edit freely. */
  bio: [
    "I'm from Charlotte, North Carolina and got my start fly fishing for trout in the North Carolina mountains. That's where I fell for the fly rod.",
    "Then I found the salt and I've enjoyed it a lot more ever since. For the last six years I've fished the beaches and passes around Sanibel along with Pine Island Sound and the backcountry.",
    "Fly fishing is my specialty and sight fishing is what I really love. You see the fish, make the cast and watch it eat. Whether it's a snook cruising the beach or a redfish pushing along the mangroves, that moment is why I do this.",
    "When I'm not on the water with clients I work part-time at Sanibel Fly Outfitters. I also serve on the board of the Sanibel Fly Fishers Club.",
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
