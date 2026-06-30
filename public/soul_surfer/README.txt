Place Soul Surfer Camp images in this folder.

ACTIVE files referenced in the codebase:

  hero.jpg     -> /soul-surfer detail page background hero
                  (recommended: the iconic railway / surfer-board photo —
                  landscape crop with the focal point centered works best)

OPTIONAL (currently the code falls back to /booking_engine/soulcamp{1..4}.jpg):
  1.jpg .. 4.jpg  -> Home page card slider images
                     Swap by editing:
                     - messages/en.json  home.cards[2].images
                     - messages/de.json  home.cards[2].images
                     - src/components/country/SoulSurferCamp.tsx

Locations that reference hero.jpg:
  - src/components/soul_surfer/Header.tsx
  - src/app/[locale]/soul-surfer/page.tsx (metadata.image)

------------------------------------------------------------
Rooms section on the Rates page (src/components/soul_surfer/ComfortableStays.tsx)
currently reuses /beach_camp/* photos as placeholders. When you have real
Soul Surfer room photos, add them here and update the `roomImages` map in
that component. Suggested filenames:

  dormitory.jpg     -> Mixed Dormitory main photo
  single.jpg        -> Private Single Room main photo
  double.jpg        -> Private Double / Twin Room main photo
  triple.jpg        -> Private Triple Room main photo
  bathroom-1.jpg    -> Shared bathroom photo (used across all rooms)
  bathroom-2.jpg    -> Shared bathroom photo 2 (used across all rooms)
------------------------------------------------------------
