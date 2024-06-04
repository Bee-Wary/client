"use client";
import { ArrowUUpLeft, BellRinging} from '@phosphor-icons/react/dist/ssr';
import { Navbar, NavbarContent, NavbarBrand, NavbarItem, NavbarMenuToggle, NavbarMenu } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();
  return (
    <Navbar>
      <NavbarContent>
      <ArrowUUpLeft weight='fill' size={32} onClick={() => router.back()} />
        <NavbarBrand>
          <Image src="/mascotte.png" alt="BeeWary" width={50} height={50} />
          <p className="font-bold text-inherit">BeeWary</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <Link href='/notifications'>
          <BellRinging size={32} weight='fill'/>
        </Link>
        {/* TODO: Find a way to replace the default icon*/}
        <NavbarMenuToggle className="sm:hidden" />
      </NavbarContent>
      <NavbarMenu>

      </NavbarMenu>
    </Navbar>
  );
}
