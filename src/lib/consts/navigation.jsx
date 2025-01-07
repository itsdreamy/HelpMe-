import {
	HiOutlineViewGrid,
	HiOutlineUsers,
	HiOutlineLogout
} from 'react-icons/hi';
import { AiOutlineShop } from "react-icons/ai";
import { RiUserLocationLine } from "react-icons/ri";
import { IoListSharp } from "react-icons/io5";
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
		label: 'Kelola Usaha Mitra',
		path: '/usahamitra',
		icon: <AiOutlineShop />
	}
];

export const DASHBOARD_USERS = [
	{
		key: 'mitra',
		label: 'Kelola Mitra',
		path: '/usermitra',
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
		label: 'Kelola Kategori',
		path: '/kelolakategori',
		icon: <IoListSharp />
	},
];

