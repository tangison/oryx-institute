import { ComingSoon } from "@/components/site/coming-soon";

/**
 * Every stale link lands on the same fact as the home page: the site
 * is being rebuilt, and the office still answers. Served with a 404
 * status; the content is the coming-soon screen itself.
 */
export default function NotFound() {
  return <ComingSoon />;
}
