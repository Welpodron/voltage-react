import { Tooltip } from "./components/Tooltip";
import { CollapseBox } from "./components/CollapseBox";
import { Accordion } from "./components/Accordion";
import { Modal } from "./components/Modal.js";

import { useState } from "react";
import { Popover } from "./components/Popover";
import { Selectbox } from "./components/Forms/Selectbox";

import { Button } from "@mantine/core";

export const App = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  return (
    <>
      <div className="grid gap-8 p-8">
        <div className="grid">
          <p>CollapseBox</p>
          <Button></Button>
          <CollapseBox>
            <CollapseBox.Control>Toggle collapse</CollapseBox.Control>
            <CollapseBox.Collapse>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Asperiores minus eos illum quaerat nulla! At facere aspernatur
                necessitatibus expedita magnam delectus rem architecto! Minima
                quaerat facilis vel, voluptates ab libero. Architecto dolorem
                unde, quas animi ea ipsum non ad quae a esse consequatur laborum
                tenetur possimus consequuntur fugit, distinctio mollitia est
                quia adipisci harum deserunt. Doloribus optio pariatur labore
                ullam. Beatae dolores tempore delectus est ex, aperiam ipsum
                labore nobis! Laborum saepe molestias eius magni quis odio ullam
                neque, obcaecati facere, rerum excepturi libero in distinctio?
                Libero in blanditiis ullam.
              </p>
            </CollapseBox.Collapse>
          </CollapseBox>
        </div>
        {/* <div className="grid">
          <p>Accordion</p>
          <Accordion>
            <Accordion.Item value="item_01">
              <Accordion.Item.Control>Item 01 control</Accordion.Item.Control>
              <Accordion.Item.Collapse>Item 01 Content</Accordion.Item.Collapse>
            </Accordion.Item>
            <Accordion.Item value="item_02">
              <Accordion.Item.Control>Item 02 control</Accordion.Item.Control>
              <Accordion.Item.Collapse>Item 02 Content</Accordion.Item.Collapse>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="grid">
          <div className="max-w-xs">
            <Tooltip text="For long tooltip text, use popover instead">
              <p className="bg-red-300">
                For long tooltip text, use popover instead
              </p>
            </Tooltip>
          </div>
          <div className="justify-self-end max-w-xs">
            <Tooltip text="Tooltip text">
              <p className="bg-red-300 max-w-xs">Tooltip</p>
            </Tooltip>
          </div>
        </div>
        <div className="grid">
          <button
            className="bg-red-300"
            type="button"
            onClick={() => setIsModalOpened(true)}
          >
            Open Modal
          </button>
          <Modal setIsOpened={setIsModalOpened} isOpened={isModalOpened}>
            <p>1</p>
          </Modal>
        </div>
        <div className="grid">
          <div>
            <Popover>
              <Popover.Control>Обычный поповер</Popover.Control>
              <Popover.Body>
                cessitatibus expedita magnam delectus rem architecto! Minima
                quaerat facilis vel, voluptates ab libero. Architecto dolorem
                unde, quas animi ea ipsum non ad
              </Popover.Body>
            </Popover>
          </div>
          <div className="justify-self-end max-w-xs">
            <Popover>
              <Popover.Control>Много текста и справа</Popover.Control>
              <Popover.Body>
                <button>Hello from popover</button>
                <p>
                  cessitatibus expedita magnam delectus rem architecto! Minima
                  quaerat facilis vel, voluptates ab libero. Architecto dolorem
                  unde, quas animi ea ipsum non ad cessitatibus expedita magnam
                  delectus rem architecto! Minima quaerat facilis vel,
                  voluptates ab libero. Architecto dolorem unde, quas animi ea
                  ipsum non ad cessitatibus expedita magnam delectus rem
                  architecto! Minima quaerat facilis vel, voluptates ab libero.
                  Architecto dolorem unde, quas animi ea ipsum non ad
                  cessitatibus expedita magnam delectus rem architecto! Minima
                  quaerat facilis vel, voluptates ab libero. Architecto dolorem
                  unde, quas animi ea ipsum non ad cessitatibus expedita magnam
                  delectus rem architecto! Minima quaerat facilis vel,
                  voluptates ab libero. Architecto dolorem unde, quas animi ea
                  ipsum non ad cessitatibus expedita magnam delectus rem
                  architecto! Minima quaerat facilis vel, voluptates ab libero.
                  Architecto dolorem unde, quas animi ea ipsum non ad
                  cessitatibus expedita magnam delectus rem architecto! Minima
                  quaerat facilis vel, voluptates ab libero. Architecto dolorem
                  unde, quas animi ea ipsum non ad cessitatibus expedita magnam
                  delectus rem architecto! Minima quaerat facilis vel,
                  voluptates ab libero. Architecto dolorem unde, quas animi ea
                  ipsum non ad
                </p>
              </Popover.Body>
            </Popover>
          </div>
          <div className="max-w-xs">
            <Popover isMenu={true}>
              <Popover.Control>Поповер как меню</Popover.Control>
              <Popover.Body>
                Данный поповер закроется при клике на любой элемент кроме
                открывающего его контрола
              </Popover.Body>
            </Popover>
          </div>
        </div>
        <div className="grid">
          <p>Selectbox</p>
          <Selectbox />
        </div> */}
      </div>
    </>
  );
};
