/**
 * Oryx Institute · Chinese mirror of content.ts.
 *
 * The Bulletin essays stay in English (they are the works themselves,
 * cited and dated); everything the interface says around them is
 * Chinese, and the ZH pages say so plainly.
 */

export const resourcesZh = [
  {
    name: "Oryx 公报",
    what: "学院自己的见解，见下方与本页。数字注明出处，语言平实，没有填充物。",
    action: { label: "读公报", href: "#bulletin" },
  },
  {
    name: "申请指南",
    what: "给院长办公室的一封邮件，就是一份申请的开始。指南讲清里面该写什么。",
    action: { label: "读指南", href: "/apply" },
  },
  {
    name: "课程手册",
    what: "具体课程在申请时由院长办公室确认，所以手册按需提供，而不是挂一份会过期的 PDF。",
    action: { label: "索取手册", href: "/apply" },
  },
  {
    name: "品牌登记册",
    what: "字标、徽记、色码与文风，全部公开。",
    action: { label: "打开登记册", href: "/brand" },
  },
] as const;
