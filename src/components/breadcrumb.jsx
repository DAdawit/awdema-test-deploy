import Link from "next/link";
import { useRouter } from "next/router";

function Breadcrumbs() {
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const name = decodeURIComponent(segment.replace(/\+/g, " "));
    return { path, name };
  });

  return (
    <nav>
      <ul className="flex">
        <li>
          <Link href="/">Home </Link>{" "}
        </li>
        {breadcrumbs.map(({ path, name }, index) => (
          <li key={path}>
            <Link href={path}>{name}</Link>
            {index !== breadcrumbs.length - 1 && " / "}
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default Breadcrumbs;
