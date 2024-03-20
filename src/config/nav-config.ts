import {
  HeartFilled,
  IdcardOutlined,
  TrophyFilled,
} from '@ant-design/icons';
import CalenderSVG from "@assets/icons/icon-calendar.svg"
import { Image } from 'antd';
import React from 'react';

const items = [
  {
    icon: CalenderSVG,
    label: 'Календарь',
    href: '',
    key: "calendar"
  },
  {
    icon: HeartFilled,
    label: 'Тренировки',
    href: '',
    key: "heart"
  },
  {
    icon: TrophyFilled,
    label: 'Достижения',
    href: '',
    key: "achive"
  },
  {
    icon: IdcardOutlined,
    label: 'Профиль',
    href: '',
    key: "profile"
  },
]

export const navItems = items.map(
  (item) => ({
    ...item,
    icon: (item?.icon !== CalenderSVG) ? React.createElement(item.icon) : React.createElement(Image, {
      src: item.icon,
      preview: false,
      alt: item.key,
    }),
  }),
);