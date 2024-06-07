import { CaretRight, UserCircle } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import { UrlObject } from "url";

interface Props {
    text: string;
    icon: JSX.Element;
    href: string | UrlObject;
    onClick?: () => void;
}

export default function NavMenuItem({ text, icon, href, onClick }: Props) {
    return (
    <Link href={href} onClick={onClick} className="flex flex-row items-center gap-1">
        {icon}
        <p className="grow">{text}</p>
        <CaretRight size={32} weight="fill" />
    </Link>)
}