import { Tooltip } from "./components/Tooltip";
import { CollapseBox } from "./components/CollapseBox";
import { Accordion } from "./components/Accordion";

import { Popover, PopoverTree } from "./components/Popover";

import { useState } from "react";

export const App = () => {
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
                <Tooltip text="Tooltip text">
                  <button>Hello from popover</button>
                </Tooltip>
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
                открывающего его контрола и самого поповера
                <button className="bg-blue-100" type="button">
                  При клике сюда поповер будет закрыт
                </button>
              </Popover.Body>
            </Popover>
          </div>
          <div>
            <PopoverTree>
              <Popover>
                <Popover.Control>
                  Поповер содержащий поповер внутри
                </Popover.Control>
                <Popover.Body>
                  <p>
                    cessitatibus expedita magnam delectus rem architecto! Minima
                    quaerat facilis vel, voluptates ab libero. Architecto
                    dolorem unde, quas animi ea ipsum non ad
                  </p>
                  <Popover>
                    <Popover.Control>
                      Контрол отправляющий на следующий поповер
                    </Popover.Control>
                    <Popover.Body>
                      <p>
                        cessitatibus expedita magnam delectus rem architecto!
                        Minima quaerat facilis vel, voluptates ab libero.
                        Architecto dolorem unde, quas animi ea ipsum non ad
                        cessitatibus expedita magnam delectus rem architecto!
                        Minima quaerat facilis vel, voluptates ab libero.
                        Architecto dolorem unde, quas animi ea ipsum non ad
                        cessitatibus expedita magnam delectus rem architecto!
                        Minima quaerat facilis vel, voluptates ab libero.
                        Architecto dolorem unde, quas animi ea ipsum non ad
                        cessitatibus expedita magnam delectus rem architecto!
                        Minima quaerat facilis vel, voluptates ab libero.
                        Architecto dolorem unde, quas animi ea ipsum non ad
                        cessitatibus expedita magnam delectus rem architecto!
                        Minima quaerat facilis vel, voluptates ab libero.
                        Architecto dolorem unde, quas animi ea ipsum non ad
                        cessitatibus expedita magnam delectus rem architecto!
                        Minima quaerat facilis vel, voluptates ab libero.
                        Architecto dolorem unde, quas animi ea ipsum non ad
                        cessitatibus expedita magnam delectus rem architecto!
                        Minima quaerat facilis vel, voluptates ab libero.
                        Architecto dolorem unde, quas animi ea ipsum non ad
                        cessitatibus expedita magnam delectus rem architecto!
                        Minima quaerat facilis vel, voluptates ab libero.
                        Architecto dolorem unde, quas animi ea ipsum non ad
                      </p>
                    </Popover.Body>
                  </Popover>
                </Popover.Body>
              </Popover>
            </PopoverTree>
          </div>
        </div>
      </div>
    </>
  );
};
