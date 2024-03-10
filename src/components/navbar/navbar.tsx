import { MobileNavbar } from './mobile/mobile';
import { DesctopNavbar } from './desctop/desctop';

export const Navbar = (props: { getCalendar?: () => void }) => {
  return (
    <>
      <MobileNavbar getCalendar={props.getCalendar} />
      <DesctopNavbar getCalendar={props.getCalendar} />
    </>
  )
}