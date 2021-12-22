import Link from "next/link";

export default function SomePage() {
  return (
    <div>
      <Link href={{ pathname: "/about" }}>xxx</Link>
    </div>
  );
}
