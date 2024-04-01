import { MobileNavbar } from './mobile/mobile';
import { DesctopNavbar } from './desctop/desctop';

export const Navbar = (props: { getTraining?: (route: string) => void }) => {
  return (
    <>
      <MobileNavbar getTraining={props.getTraining} />
      <DesctopNavbar getTraining={props.getTraining} />
    </>
  )
}