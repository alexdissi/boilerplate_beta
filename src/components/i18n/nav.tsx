import {createSharedPathnamesNavigation} from "next-intl/navigation"
export const locales = ["en", "fr"] as const
export const {Link,usePathname} = createSharedPathnamesNavigation({locales})