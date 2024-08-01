import Image from "next/image";
import Link from "next/link";
import logo from "@/app/icon.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src={logo}
        height="60"
        quality={100}
        width="60"
        alt="Capsule Hotel logo"
      />
      <span className="text-xl font-semibold text-primary-100">
        Capsule Hotel
      </span>
    </Link>
  );
}

export default Logo;
