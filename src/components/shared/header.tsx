"use client";
import { ArrowUUpLeft, Bell, BellRinging, Broadcast, CaretRight, ChartBar, Cube, DotsThreeOutline, Gear, PencilSimpleLine, UserCircle } from '@phosphor-icons/react/dist/ssr';
import { Navbar, NavbarContent, NavbarBrand, NavbarItem, NavbarMenuToggle, NavbarMenu } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NavMenuItem from '../sidebar/NavMenuItem';
import NavMenuContainer from '../sidebar/NavMenuContainer';

export default function Header() {
  const router = useRouter();
  return (
    <Navbar className='bg-tiki-torch-grey text-petal-white-bright'>
      <NavbarContent>
        {/* TODO: Make sure back button is hidden on index */}
        <li>
          <ArrowUUpLeft weight='fill' size={32} onClick={() => router.back()} />
        </li>
        <li>
          <Link href={'/'}>
            <NavbarBrand>
              <Image src="/mascotte.png" alt="BeeWary" width={50} height={50} />
              <p className="font-bold text-inherit">BeeWary</p>
            </NavbarBrand>
          </Link>
        </li>
      </NavbarContent>
      <NavbarContent justify="end">
        <li>
          <Link href='/notifications'>
            <BellRinging size={32} weight='fill' />
          </Link>
        </li>
        <li>
          <NavbarMenuToggle className="sm:hidden" icon={<DotsThreeOutline size={32} weight="fill" />} />
        </li>
      </NavbarContent>
      <NavbarMenu className='bg-tiki-torch-grey text-petal-white-bright'>
        <li className='flex flex-col gap-1 my-4'>
          <h2>BeeWary</h2>
          <h3>John Doe</h3>
          <p>Premium Account</p>
        </li>
        <li>
          <NavMenuContainer>
            <h3>Personal</h3>
            <NavMenuItem text="Account Info" icon={<UserCircle size={32} weight='fill' />} href="#" />
            <NavMenuItem text="Settings" icon={<Gear size={32} weight='fill' />} href="#" />
            <NavMenuItem text="Notification" icon={<Bell size={32} weight='fill' />} href="/notifications" />
          </NavMenuContainer>
        </li>
        <li>
          <NavMenuContainer>
            <h3>Technical</h3>
            <NavMenuItem text="My beehives" icon={<Cube size={32} weight="fill" />} href="#" />
            <NavMenuItem text="My sensors" icon={<Broadcast size={32} weight="fill" />} href="/Sensors" />
            <NavMenuItem text="My inspections" icon={<PencilSimpleLine size={32} weight="fill" />} href="/inspections" />
            <NavMenuItem text="Statistics" icon={<ChartBar size={32} weight="fill" />} href="/statistics" />
          </NavMenuContainer>
        </li>
      </NavbarMenu>
    </Navbar>
  );
}
