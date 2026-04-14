type GalleryVariant = "constellation" | "telescope" | "dome" | "moon" | "lecture" | "trail";

export type GalleryBaseItem = {
  title: string;
  subtitle: string;
  variant: GalleryVariant;
  palette: [string, string, string, string];
};

export type GalleryItem = GalleryBaseItem & {
  src: string;
};

export function isGalleryBaseItem(item: any): item is GalleryBaseItem {
  return item && typeof item.variant === "string";
}

function svgDataUri(svg: string) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function motifMarkup(variant: GalleryVariant, accent: string) {
  switch (variant) {
    case "constellation":
      return `
        <path d="M56 156L92 124L128 140L164 94L198 112" stroke="${accent}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="56" cy="156" r="5.5" fill="#ffffff" />
        <circle cx="92" cy="124" r="4.3" fill="#ffffff" />
        <circle cx="128" cy="140" r="4.8" fill="#ffffff" />
        <circle cx="164" cy="94" r="5.8" fill="#ffffff" />
        <circle cx="198" cy="112" r="4.5" fill="#ffffff" />
      `;
    case "telescope":
      return `
        <rect x="66" y="128" width="88" height="24" rx="12" fill="rgba(255,255,255,0.08)" stroke="${accent}" stroke-width="2.5" />
        <path d="M120 116L168 92" stroke="${accent}" stroke-width="8" stroke-linecap="round" />
        <path d="M100 150L74 202M124 150L108 204M146 150L168 204" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />
        <circle cx="172" cy="90" r="18" fill="none" stroke="#ffffff" stroke-width="3.5" />
        <circle cx="172" cy="90" r="7" fill="#ffffff" />
      `;
    case "dome":
      return `
        <path d="M52 160H188" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />
        <path d="M72 160C72 126 97 100 120 100C143 100 168 126 168 160" stroke="${accent}" stroke-width="6" stroke-linecap="round" />
        <path d="M96 160C96 144 107 132 120 132C133 132 144 144 144 160" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />
        <path d="M120 100V74" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />
        <circle cx="120" cy="66" r="5" fill="#ffffff" />
      `;
    case "moon":
      return `
        <path d="M154 58C134 58 118 74 118 94C118 114 134 130 154 130C160 130 166 128 171 125C160 120 152 109 152 96C152 83 160 72 171 67C166 61 160 58 154 58Z" fill="${accent}" fill-rule="evenodd" />
        <path d="M58 148C74 126 102 111 132 111C154 111 174 118 188 132" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />
        <path d="M76 170C92 151 115 140 142 140C159 140 175 144 190 153" stroke="${accent}" stroke-width="4" stroke-linecap="round" opacity="0.75" />
        <circle cx="90" cy="78" r="5" fill="#ffffff" />
        <circle cx="62" cy="96" r="3.8" fill="#ffffff" />
      `;
    case "lecture":
      return `
        <circle cx="84" cy="92" r="19" fill="rgba(255,255,255,0.12)" stroke="#ffffff" stroke-width="3" />
        <path d="M62 154C72 136 101 126 120 126C147 126 176 138 186 154" stroke="${accent}" stroke-width="5" stroke-linecap="round" />
        <path d="M56 112C78 102 94 102 120 112C146 122 162 122 188 108" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-dasharray="8 10" />
        <path d="M54 136C82 126 98 126 120 136C142 146 158 146 186 134" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-dasharray="6 9" opacity="0.8" />
      `;
    case "trail":
      return `
        <path d="M48 162C68 144 90 136 116 136C142 136 168 144 192 162" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />
        <path d="M60 124C82 106 102 98 122 98C145 98 166 108 180 124" stroke="${accent}" stroke-width="6" stroke-linecap="round" opacity="0.8" />
        <path d="M72 182C92 164 108 156 120 156C134 156 150 164 170 182" stroke="${accent}" stroke-width="4" stroke-linecap="round" opacity="0.55" />
        <circle cx="120" cy="98" r="6" fill="#ffffff" />
        <circle cx="180" cy="124" r="4.5" fill="#ffffff" />
      `;
    default:
      return "";
  }
}

export function createArtwork(item: GalleryBaseItem) {
  const [bgA, bgB, glow, accent] = item.palette;
  return svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" fill="none">
      <defs>
        <linearGradient id="bg" x1="24" y1="18" x2="220" y2="224" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="${bgA}" />
          <stop offset="52%" stop-color="${bgB}" />
          <stop offset="100%" stop-color="#050816" />
        </linearGradient>
        <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(72 66) rotate(45) scale(88)">
          <stop offset="0%" stop-color="${glow}" stop-opacity="0.95" />
          <stop offset="100%" stop-color="${glow}" stop-opacity="0" />
        </radialGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.8" />
        </filter>
      </defs>
      <rect width="240" height="240" rx="38" fill="url(#bg)" />
      <circle cx="72" cy="64" r="58" fill="url(#glow)" opacity="0.8" />
      <circle cx="178" cy="178" r="62" fill="${glow}" opacity="0.08" />
      <g filter="url(#soft)">
        ${motifMarkup(item.variant, accent)}
      </g>
      <g opacity="0.82">
        <circle cx="36" cy="190" r="2" fill="#ffffff" />
        <circle cx="50" cy="46" r="1.9" fill="#ffffff" />
        <circle cx="188" cy="50" r="1.8" fill="#ffffff" />
        <circle cx="202" cy="180" r="2" fill="#ffffff" />
        <circle cx="158" cy="38" r="1.7" fill="#ffffff" />
        <circle cx="92" cy="198" r="1.7" fill="#ffffff" />
      </g>
      <rect x="1" y="1" width="238" height="238" rx="37" stroke="#ffffff" stroke-opacity="0.14" />
    </svg>
  `);
}

export const announcements = [
  {
    date: "18 OCT",
    title: "Rooftop Stargazing Night",
    detail: "Open skies, guided constellations, and a quick walkthrough on spotting Saturn after dusk.",
    tag: "Tonight",
  },
  {
    date: "21 OCT",
    title: "Deep-Sky Imaging Workshop",
    detail: "Stacking basics, calibration frames, and color cleanup for club members and beginners alike.",
    tag: "Workshop",
  },
  {
    date: "26 OCT",
    title: "Cosmic Sketch Session",
    detail: "A relaxed observation evening with sketchbooks, filters, and a shared review of lunar details.",
    tag: "Registration open",
  },
];

export const pastEvents = [
  {
    date: "MARCH 2024",
    title: "AI/ML for Space Exploration",
    detail: "Drishti’24 featured a standout AI/ML for Space Exploration workshop by AstroCET and HT Labs India. Over 70 participants learned Python-based data analysis and ML applications in astronomy, with hands-on experience using real astronomical data.",
    image: import.meta.env.BASE_URL + "events/event-aiml.jpg"
  },
  {
    date: "FEBRUARY 2024",
    title: "Global Science Festival Kerala",
    detail: "AstroCET's outreach at the ‘Global Science Festival Kerala’ featured Dr. Sarita Vig from IIST, inspiring students to pursue astronomy, followed by a sky-gazing session with the Breakthrough Science Society.",
    image: import.meta.env.BASE_URL + "events/event-outreach.jpg"
  },
  {
    date: "NOVEMBER 2023",
    title: "Expedition Aditya",
    detail: "Expedition Aditya, held on 26 November 2023 in collaboration with Shastra Snehi, focused on solar probing and sunspot viewing, bringing together experts and participants to explore the Sun's dynamics.",
    image: import.meta.env.BASE_URL + "events/event-aditya.jpg"
  },
  {
    date: "NOVEMBER 2023",
    title: "Pictura Astra Workshop",
    detail: "On 25 November 2023, ASTRO-CET hosted an astrophotography workshop with CET SHUTTERBUGS and AASTRO KERALA, led by renowned expert Sarath Prabhavu J.",
    image: import.meta.env.BASE_URL + "events/event-strophotography.jpg"
  },
];


export interface TeamMember {
  name: string;
  role: string;
  email: string;
  linkedin: string;
  image: string;
  detail: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Naveen Varma",
    role: "Chairperson",
    email: "naveen@example.com",
    linkedin: "https://www.linkedin.com/in/naveen-varma-539193259",
    image: import.meta.env.BASE_URL + "team/naveen.jpg",
    detail: "Leading the core coordination and club administration with a focus on sustainable observatory growth."
  },
  {
    name: "Saurav S",
    role: "Vice Chairperson/Tech Lead",
    email: "melethabhinav@gmail.com",
    linkedin: "https://www.linkedin.com/in/saurav-s-39b097258",
    image: import.meta.env.BASE_URL + "team/saurav.jpg",
    detail: "Managing internal workshops and technical imaging sessions for members."
  },
  {
    name: "Fidha V",
    role: "Vice Chairperson",
    email: "fidha@example.com",
    linkedin: "https://www.linkedin.com/in/fidha-v",
    image: import.meta.env.BASE_URL + "team/fidha.jpg",
    detail: "Overseeing outreach programs and student engagement initiatives across campus."
  },
  {
    name: "Abhirami P S",
    role: "Finance Officer",
    email: "abhirami@example.com",
    linkedin: "https://www.linkedin.com/in/abhirami-p-s-525a18263",
    image: import.meta.env.BASE_URL + "team/abhirami.jpg",
    detail: "Handling club finances, resource allocation, and project budgeting."
  },
  {
    name: "Durga M",
    role: "Secretary",
    email: "durga@example.com",
    linkedin: "https://www.linkedin.com/in/durga-madhusudanan-795a002a1",
    image: import.meta.env.BASE_URL + "team/durga.jpg",
    detail: "Key coordinator for observation nights and sky mapping events."
  }
];

export type GalleryActualItem = {
  title: string;
  subtitle: string;
  src: string;
};

export const galleryItems: (GalleryBaseItem | GalleryActualItem)[] = [
  {
    title: "Observation Night",
    subtitle: "Telescope session on campus",
    src: import.meta.env.BASE_URL + "gallery/galleryimg1.JPG",
  },
  {
    title: "Guest Lecture",
    subtitle: "Dr. Sarita Vig's talk",
    src: import.meta.env.BASE_URL + "gallery/galleryimg2.JPG",
  },
  {
    title: "Club Recognition",
    subtitle: "Member appreciation session",
    src: import.meta.env.BASE_URL + "gallery/galleryimg3.JPG",
  },
  {
    title: "Outreach Program",
    subtitle: "Interactive session at CETAA Hall",
    src: import.meta.env.BASE_URL + "gallery/galleryimg4.JPG",
  },
  {
    title: "Team Pulse",
    subtitle: "Internal club workshop",
    src: import.meta.env.BASE_URL + "gallery/galleryimg5.JPG",
  },
  {
    title: "Observation",
    subtitle: "Guided Constellation Mapping",
    src: import.meta.env.BASE_URL + "gallery/galleryimg6.JPG",
  },
  {
    title: "School Visit",
    subtitle: "Astronomy for young minds",
    src: import.meta.env.BASE_URL + "gallery/galleryimg7.JPG",
  },
  {
    title: "Sky Night",
    subtitle: "Deep sky imaging prep",
    src: import.meta.env.BASE_URL + "gallery/galleyimg8.JPG",
  },
];



