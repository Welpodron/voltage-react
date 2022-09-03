import { Tooltip } from "./components/Tooltip";
import { CollapseBox } from "./components/CollapseBox";
import { Accordion } from "./components/Accordion";
import { Modal } from "./components/Modal.js";

import { useState } from "react";

export const App = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  return (
    <>
      <div className="grid gap-8 p-8">
        <div className="grid">
          <p>CollapseBox</p>
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
        <div className="grid">
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
          <Tooltip text="Tooltip text">
            <p className="bg-red-300">Tooltip</p>
          </Tooltip>
        </div>
        <div className="grid">
          <button type="button" onClick={() => setIsModalOpened(true)}>
            Open Modal
          </button>
          <Modal setIsOpened={setIsModalOpened} isOpened={isModalOpened}>
            <p>1</p>
          </Modal>
        </div>
      </div>
    </>
  );
};
