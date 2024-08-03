// import Link from "next/link";

// export default function Navigation() {
//   return (
//     <nav className="z-10 text-xl">
//       <ul className="flex gap-16 items-center">
//         <li>
//           <Link
//             href="/capsules"
//             className="hover:text-accent-400 transition-colors"
//           >
//             Capsules
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/about"
//             className="hover:text-accent-400 transition-colors"
//           >
//             About
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/account"
//             className="hover:text-accent-400 transition-colors"
//           >
//             Account
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/capsules"
            className="hover:text-accent-400 transition-colors"
          >
            Capsules
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Account</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Account
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
