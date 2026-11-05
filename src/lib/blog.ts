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
  titleZh: string;
  description: string;
  descriptionZh: string;
  dateISO: string;
  dateHuman: string;
  dateHumanZh: string;
  ogImage: string;
  ogImageAlt: string;
  /** Rendered images, with the dimensions measured from the files. */
  images: Record<string, BlogImageMeta>;
  bodyEn: string;
  bodyZh: string;
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
    title: "Corner Spa, the first project of Oryx Institute",
    titleZh: "Corner Spa：Oryx Institute 的第一个项目",
    description:
      "Corner Spa in Windhoek is the first project of Oryx Institute, with Mendozer Investments as financing partner. See treatments, prices and how to book.",
    descriptionZh:
      "Corner Spa 位于温得和克，是 Oryx Institute 的第一个项目，Mendozer Investments 为融资伙伴。查看项目、价格与预约方式。",
    dateISO: "2026-11-05",
    dateHuman: "5 November 2026",
    dateHumanZh: "2026年11月5日",
    ogImage: "/corner-spa/hero-wide.jpg",
    ogImageAlt: "Smooth wet stones and soft light at Corner Spa",
    images: cornerSpaImages,
    bodyEn: `
# Corner Spa, the first project of Oryx Institute

![Smooth wet stones and soft light at Corner Spa](/corner-spa/hero-wide.webp)

Corner Spa is a quiet place in Windhoek for massage, hot stone treatments, nails and waxing. It is the first project of Oryx Institute, and it is a concept by Mendozer Investments. This post explains what it offers, how to book, and where to find it online.

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

Oryx Institute is the operations lead. Mendozer Investments is the financing partner. Corner Spa is the first project to come out of this work, and it is meant to be a small, well run business that others can learn from.

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
    bodyZh: `
# Corner Spa：Oryx Institute 的第一个项目

![Corner Spa 的湿滑暖石与柔和光线](/corner-spa/hero-wide.webp)

Corner Spa 是温得和克一处安静的按摩、热石护理、美甲与脱毛小店。它是 Oryx Institute 的第一个项目，也是 Mendozer Investments 的概念作品。这篇文章介绍它的服务、预约方式，以及在哪里可以找到它。

## 可以预约什么

![治疗师把光滑的深色热石沿背部摆放](/corner-spa/hot-stones-back.webp)

菜单刻意保持简短：四种按摩、两种美甲护理和六项脱毛服务，每一项都有明确的价格。面部护理同样提供，价格请直接询问。

按摩项目从 30 分钟的热石肩颈头皮护理，到放松的柠檬草全身按摩。美甲包括凝胶加固和带指托的全覆盖凝胶。脱毛覆盖面部、腿部和腋下。

## 价格

所有价格以纳米比亚元计。

| 项目 | 价格 |
|---|---|
| 全身按摩，含背部与颈部（60 分钟） | N$ 500 |
| 全身按摩，背部加热石（60 分钟） | N$ 450 |
| 柠檬草放松全身按摩 | N$ 700 |
| 肩颈头皮按摩加热石（30 分钟） | N$ 250 |
| 凝胶加固（手部与足部） | N$ 400 |
| 带指托全覆盖凝胶（素色） | N$ 350 |
| 脱毛组合（Hollywood 与腋下） | N$ 400 |
| 上唇 | N$ 70 |
| 下巴 | N$ 70 |
| 半腿 | N$ 250 |
| 全腿 | N$ 400 |
| 腋下 | N$ 100 |
| 面部护理 | 请询问价格 |

## 如何预约

![一位女士在铺有纹理毛巾的暖石旁休息](/corner-spa/people-stones-rest.webp)

预约通过 WhatsApp 进行：在价目表上点按任意项目，会打开一条已填好该项目的消息，你只需按下发送。也可以使用预约页面，它通过一个简短的表单生成同样的消息。你输入的内容不会储存在网站上。

也可以致电或发送消息到 **+264 81 623 4788**。

## 背后的团队

Oryx Institute 是运营主导方，Mendozer Investments 是融资伙伴。Corner Spa 是这项工作产出的第一个项目，它要做的，是一门可以让别人借鉴的小而扎实的好生意。

## 一个网站，两个地址

![治疗师的双手放在涂抹了按摩油的背部](/corner-spa/people-back-hands.webp)

Corner Spa 的网站在 **spa.mendozer.com**。你也可以从 **oryxinstitute.org/corner-spa** 访问它：在 Oryx 网站里，同一个网站会全屏展示。这是一个网站，不是两个副本，所以无论从哪里打开，价格与预约信息始终一致。按一次返回键，就回到 Oryx 网站。

## 联系 Oryx Institute

关于 Oryx Institute 本身的问题，请致电或发送消息到 **083\u00A0676\u00A04338**（+264\u00A083\u00A0676\u00A04338）。Corner Spa 的预约，请使用上面的 Corner Spa 号码。

## 链接

- Corner Spa：[spa.mendozer.com](https://spa.mendozer.com)
- Oryx 站内页面：[oryxinstitute.org/corner-spa](https://oryxinstitute.org/corner-spa)
- Mendozer Investments：[mendozer.com](https://mendozer.com)
- WhatsApp 预约：[wa.me/264816234788](https://wa.me/264816234788)
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
