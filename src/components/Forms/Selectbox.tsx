import { Popover } from "../Popover";

export const Selectbox = () => {
  return (
    <div>
      <label className="grid max-w-xs">
        <span>Selectbox</span>
        <input className="bg-red-200" readOnly type="text" />
        <Popover isMenu={true}>
          <Popover.Control>Поповер как меню</Popover.Control>
          <Popover.Body>
            Данный поповер закроется при клике на любой элемент кроме
            открывающего его контрола
          </Popover.Body>
        </Popover>
      </label>
    </div>
  );
};
