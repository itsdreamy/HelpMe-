import {
	HiOutlineViewGrid,
	HiOutlineUsers,
	HiOutlineLogout
} from 'react-icons/hi';
import { AiOutlineShop } from "react-icons/ai";
import { RiUserLocationLine } from "react-icons/ri";
import { TbHelpOctagon } from "react-icons/tb";
import { useState } from 'react';

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/dashboard',
		icon: <HiOutlineViewGrid />
	}
];

export const DASHBOARD_USAHA = [
	{
		key: 'usaha',
		label: 'Usaha Mitra',
		path: '/usaha',
		icon: <AiOutlineShop />
	}
];

export const DASHBOARD_USERS = [
	{
		key: 'mitra',
		label: 'Kelola Mitra',
		path: '/kelolamitra',
		icon: <RiUserLocationLine />
	},
	{
		key: 'client',
		label: 'Kelola Clients',
		path: '/kelolaclient',
		icon: <HiOutlineUsers />
	}
];

export const DASHBOARD_BANTUAN = [
	{
		key: 'bantuan',
		label: 'Kelola Bantuan',
		path: '/kelolabantuan',
		icon: <TbHelpOctagon />
	},
];

