"use client";
import { ArrowUUpLeft, Bell, BellRinging, Broadcast, CaretRight, ChartBar, Cube, Gear, PencilSimpleLine, UserCircle} from '@phosphor-icons/react/dist/ssr';
import { Navbar, NavbarContent, NavbarBrand, NavbarItem, NavbarMenuToggle, NavbarMenu } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NavMenuItem from '../sidebar/NavMenuItem';

export default function Header() {
  const router = useRouter();
  return (
    <Navbar>
      <NavbarContent>
      {/* TODO: Make sure back button is hidden on index */}
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
      <NavbarMenu className='bg-tiki-torch-grey text-petal-white-bright'>
        <div>
          <h2>BeeWary</h2>
          <h3>John Doe</h3>
          <p>Premium Account</p>
        </div>
        <div>
          <h3>Personal</h3>
          <NavMenuItem text="Account Info" icon={<UserCircle size={32} weight='fill'/>} href="#" />
          <NavMenuItem text="Settings" icon={<Gear size={32} weight='fill'/>} href="#" />
          <NavMenuItem text="Notification" icon={<Bell size={32} weight='fill'/>} href="/notifications" />
        </div>
        <div>
          <h3>Technical</h3>
          <NavMenuItem text="My beehives" icon={<Cube size={32} weight="fill" />} href="#" />
          <NavMenuItem text="My sensors" icon={<Broadcast size={32} weight="fill" />} href="/Sensors" />
          <NavMenuItem text="My inspections" icon={<PencilSimpleLine size={32} weight="fill" />} href="/inspections" />
          <NavMenuItem text="Statistics" icon={<ChartBar size={32} weight="fill" />} href="/statistics" />
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
