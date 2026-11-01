/**
 * Meet Your Captain. Swap the photo by changing `photo.src` to any file in
 * /public/photos. Write the bio in your own words; each string is a
 * paragraph.
 */
export const captain = {
  /** e.g. "Capt. Jake Smith". Leave null to show "Your captain". */
  name: null as string | null,
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
    "A young, local Southwest Florida fisherman who has spent years learning the waters around Sanibel Island: the beaches, the passes, the sound and the backcountry.",
  /** Your story. Replace these placeholder lines. */
  bio: [] as string[],
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
