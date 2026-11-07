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
    "A young fly fisherman from Charlotte, North Carolina, who has spent the last six years fishing the beaches, the passes, Pine Island Sound and the backcountry around Sanibel Island.",
  /** Your story, one string per paragraph. Edit freely. */
  bio: [
    "I'm from Charlotte, North Carolina, and I got my start fly fishing for trout in the North Carolina mountains. That's where I fell for the fly rod.",
    "Then I found the salt, and I've enjoyed it a lot more ever since. For the last six years I've fished the waters around Sanibel: the beaches, the passes, Pine Island Sound and the backcountry.",
    "Fly fishing is my specialty, and sight fishing is what I really love: seeing the fish, making the cast and watching it eat. A snook cruising the beach, a tarpon rolling off the sand, a redfish pushing along the mangroves. That moment is why I do this.",
    "When I'm not on the water with clients, I work part-time at Sanibel Fly Outfitters, and I serve on the board of the Sanibel Fly Fishers Club.",
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
      body: "Years of time on these waters, and a feel for where the fish will be with each tide and season.",
    },
    {
      title: "Conservation",
      body: "Careful handling and quick releases, so these fish are here for the next trip and the next generation.",
    },
    {
      title: "Personal trips",
      body: "One boat, one captain, and a day built around you and the conditions.",
    },
  ],
};
