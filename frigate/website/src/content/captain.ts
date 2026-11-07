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
    "A young, local Southwest Florida fisherman who has spent years learning the waters around Sanibel Island: the beaches, the passes, the sound and the backcountry.",
  /** Your story, one string per paragraph. Edit freely. */
  bio: [
    "I grew up on the water in Southwest Florida, and the fishing here got hold of me early. What started as tossing a line wherever I could reach turned into years spent learning the beaches, the passes, Pine Island Sound and the backcountry around Sanibel.",
    "The fly rod is what changed everything. There's nothing like wading the beach at first light, watching a snook slide along the trough, and putting a fly in front of it. That's sight fishing at its best: you see the fish, you make the cast, and you find out right away if you got it right.",
    "From there it was tarpon, rolling off the beaches and in the passes during the migration, and the juvenile tarpon that stay through the year. Then the backcountry: tailing redfish over the flats and along the mangroves, where a quiet approach matters more than anything. I run a 1720 Action Craft Fly Fisher SE because it floats skinny and poles quietly, which is exactly what these fish demand.",
    "Frigate is how I share it. Every trip is just you, me and one boat, built around the tides, the weather and what you want out of the day. Whether you've never cast a fly or you've been chasing tarpon for years, I'll put you on the best shots the day has to offer.",
    "I handle every fish carefully and release them quickly. These waters gave me everything I know, and I want them to be just as good for the next angler and the next generation.",
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
