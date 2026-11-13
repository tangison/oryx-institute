import { site } from "@/lib/site";

/**
 * The blog: longer notes from the practice. One post is published;
 * the copy is the approved text, carried as written, with the spa's
 * photographs served from this repo (public/corner-spa/) so no Oryx
 * page depends on another host. Nothing here is claimed beyond the
 * post's own text: the prices are the spa's published prices, the
 * Corner Spa line is the spa's own number, and the roles are stated
 * exactly as agreed.
 */

export type BlogImageMeta = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  titleAf: string;
  description: string;
  descriptionAf: string;
  dateISO: string;
  dateHuman: string;
  dateHumanAf: string;
  ogImage: string;
  ogImageAlt: string;
  /** Rendered images, with the dimensions measured from the files. */
  images: Record<string, BlogImageMeta>;
  bodyEn: string;
  bodyAf: string;
};

const imageDims = {
  "/corner-spa/hero-wide.webp": { width: 1510, height: 1041 },
  "/corner-spa/hot-stones-back.webp": { width: 1919, height: 2400 },
  "/corner-spa/people-back-hands.webp": { width: 1500, height: 1000 },
  "/corner-spa/people-oil-pour.webp": { width: 1067, height: 1600 },
  "/corner-spa/people-stones-rest.webp": { width: 1600, height: 1064 },
  "/corner-spa/people-facial-cheek.webp": { width: 1200, height: 800 },
} as const;

export const cornerSpaImages: Record<string, BlogImageMeta> = {
  "/corner-spa/hero-wide.webp": {
    src: "/corner-spa/hero-wide.webp",
    ...imageDims["/corner-spa/hero-wide.webp"],
    alt: "Smooth wet stones and soft light at Corner Spa",
  },
  "/corner-spa/hot-stones-back.webp": {
    src: "/corner-spa/hot-stones-back.webp",
    ...imageDims["/corner-spa/hot-stones-back.webp"],
    alt: "Warm hands placing smooth dark stones along a back",
  },
  "/corner-spa/people-back-hands.webp": {
    src: "/corner-spa/people-back-hands.webp",
    ...imageDims["/corner-spa/people-back-hands.webp"],
    alt: "A therapist's hands resting on an oiled back during a massage",
  },
  "/corner-spa/people-oil-pour.webp": {
    src: "/corner-spa/people-oil-pour.webp",
    ...imageDims["/corner-spa/people-oil-pour.webp"],
    alt: "Oil being poured into a therapist's hand beside warm stones",
  },
  "/corner-spa/people-stones-rest.webp": {
    src: "/corner-spa/people-stones-rest.webp",
    ...imageDims["/corner-spa/people-stones-rest.webp"],
    alt: "A woman resting beside smooth dark stones on a textured towel",
  },
  "/corner-spa/people-facial-cheek.webp": {
    src: "/corner-spa/people-facial-cheek.webp",
    ...imageDims["/corner-spa/people-facial-cheek.webp"],
    alt: "A person receiving a facial treatment, a hand resting on a cheek",
  },
};

export const blogPosts: BlogPost[] = [
  {
    slug: "corner-spa",
    title: "Corner Spa, Oryx's first operating venture",
    titleAf: "Corner Spa, Oryx se eerste bedrywige onderneming",
    description:
      "Corner Spa is Oryx's first operating venture, run with Mendozer Investments: a live setting for practical business and service work. See treatments, prices and how to book.",
    descriptionAf:
      "Corner Spa is Oryx se eerste bedrywige onderneming, saam met Mendozer Investments bedryf: 'n lewende omgewing vir praktiese besigheids- en dienswerk. Sien behandelings, pryse en hoe om te bespreek.",
    dateISO: "2026-11-05",
    dateHuman: "5 November 2026",
    dateHumanAf: "5 November 2026",
    ogImage: "/corner-spa/hero-wide.jpg",
    ogImageAlt: "Smooth wet stones and soft light at Corner Spa",
    images: cornerSpaImages,
    bodyEn: `
# Corner Spa, Oryx's first operating venture

![Smooth wet stones and soft light at Corner Spa](/corner-spa/hero-wide.webp)

Corner Spa is Oryx's first operating venture, run with Mendozer Investments. It is a live setting for practical business and service work in Windhoek. This post explains what it offers, how to book, and where to find it online.

## What you can book

![Warm hands placing smooth dark stones along a back](/corner-spa/hot-stones-back.webp)

The menu is short on purpose. Four massages, two nail treatments and six waxing services, each with a clear price. Facials are also available, and you can ask us for prices.

The massages range from a 30 minute back, neck and scalp session with hot stones to the relaxing lemon grass full body massage. Nails cover gel overlays and full cover gel with tips. Waxing covers the face, legs and underarms.

## Prices

All prices are in Namibian dollars.

| Treatment | Price |
|---|---|
| Full body massage with back and neck (60 min) | N$ 500 |
| Full body massage with hot stones on the back (60 min) | N$ 450 |
| Relaxing lemon grass full body massage | N$ 700 |
| Back, neck and scalp massage with hot stones (30 min) | N$ 250 |
| Gel overlay (hands and feet) | N$ 400 |
| Full cover gel with tips (plain) | N$ 350 |
| Waxing combo (Hollywood and underarm) | N$ 400 |
| Upper lip | N$ 70 |
| Chin | N$ 70 |
| Half legs | N$ 250 |
| Full legs | N$ 400 |
| Underarms | N$ 100 |
| Facials | Ask us for prices |

## How to book

![A woman resting beside smooth dark stones on a textured towel](/corner-spa/people-stones-rest.webp)

Booking happens on WhatsApp. Tap any treatment on the price list and a message opens with that treatment already filled in. You only press send. You can also use the booking page, which builds the same message from a short form. Nothing you type is stored on the site.

You can also call or message on **+264 81 623 4788**.

## Who is behind it

Corner Spa is Oryx's first operating venture, run with Mendozer Investments. It is a live setting for practical business and service work.

## One site, two addresses

![A therapist's hands resting on an oiled back during a massage](/corner-spa/people-back-hands.webp)

The Corner Spa website lives at **spa.mendozer.com**. You can also visit it from **oryxinstitute.org/corner-spa**, where the same site is shown full screen inside the Oryx website. It is one website, not two copies, so prices and booking details are always the same wherever you open it. Press Back once and you return to the Oryx website.

## Contact Oryx Institute

For questions about Oryx Institute itself, call or message **083\u00A0676\u00A04338** (+264\u00A083\u00A0676\u00A04338). For bookings at Corner Spa, use the Corner Spa number above.

## Links

- Corner Spa: [spa.mendozer.com](https://spa.mendozer.com)
- On the Oryx site: [oryxinstitute.org/corner-spa](https://oryxinstitute.org/corner-spa)
- Mendozer Investments: [mendozer.com](https://mendozer.com)
- Book on WhatsApp: [wa.me/264816234788](https://wa.me/264816234788)
`,
    bodyAf: `
# Corner Spa, Oryx se eerste bedrywige onderneming

![Smooth wet stones and soft light at Corner Spa](/corner-spa/hero-wide.webp)

Corner Spa is Oryx se eerste bedrywige onderneming, saam met Mendozer Investments bedryf. Dit is 'n lewende omgewing vir praktiese besigheids- en dienswerk in Windhoek. Hierdie nota verduidelik wat dit bied, hoe om te bespreek en waar om dit aanlyn te vind.

## What you can book

![Warm hands placing smooth dark stones along a back](/corner-spa/hot-stones-back.webp)

The menu is short on purpose. Four massages, two nail treatments and six waxing services, each with a clear price. Facials are also available, and you can ask us for prices.

The massages range from a 30 minute back, neck and scalp session with hot stones to the relaxing lemon grass full body massage. Nails cover gel overlays and full cover gel with tips. Waxing covers the face, legs and underarms.

## Prices

All prices are in Namibian dollars.

| Treatment | Price |
|---|---|
| Full body massage with back and neck (60 min) | N$ 500 |
| Full body massage with hot stones on the back (60 min) | N$ 450 |
| Relaxing lemon grass full body massage | N$ 700 |
| Back, neck and scalp massage with hot stones (30 min) | N$ 250 |
| Gel overlay (hands and feet) | N$ 400 |
| Full cover gel with tips (plain) | N$ 350 |
| Waxing combo (Hollywood and underarm) | N$ 400 |
| Upper lip | N$ 70 |
| Chin | N$ 70 |
| Half legs | N$ 250 |
| Full legs | N$ 400 |
| Underarms | N$ 100 |
| Facials | Ask us for prices |

## How to book

![A woman resting beside smooth dark stones on a textured towel](/corner-spa/people-stones-rest.webp)

Booking happens on WhatsApp. Tap any treatment on the price list and a message opens with that treatment already filled in. You only press send. You can also use the booking page, which builds the same message from a short form. Nothing you type is stored on the site.

You can also call or message on **+264 81 623 4788**.

## Who is behind it

Corner Spa is Oryx se eerste bedrywige onderneming, saam met Mendozer Investments bedryf. Dit is 'n lewende omgewing vir praktiese besigheids- en dienswerk.

## One site, two addresses

![A therapist's hands resting on an oiled back during a massage](/corner-spa/people-back-hands.webp)

The Corner Spa website lives at **spa.mendozer.com**. You can also visit it from **oryxinstitute.org/corner-spa**, where the same site is shown full screen inside the Oryx website. It is one website, not two copies, so prices and booking details are always the same wherever you open it. Press Back once and you return to the Oryx website.

## Contact Oryx Institute

For questions about Oryx Institute itself, call or message **083\u00A0676\u00A04338** (+264\u00A083\u00A0676\u00A04338). For bookings at Corner Spa, use the Corner Spa number above.

## Links

- Corner Spa: [spa.mendozer.com](https://spa.mendozer.com)
- On the Oryx site: [oryxinstitute.org/corner-spa](https://oryxinstitute.org/corner-spa)
- Mendozer Investments: [mendozer.com](https://mendozer.com)
- Book on WhatsApp: [wa.me/264816234788](https://wa.me/264816234788)
`,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** The absolute URL of an image, used by Article structured data and
 * the markdown shelf. */
export function absoluteImageUrl(src: string): string {
  return `${site.url}${src}`;
}
