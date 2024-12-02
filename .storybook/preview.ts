import type { Preview } from "@storybook/react";
import { StoryFn } from "@storybook/react";
import React from "react";
import "../src/app/globals.css";
import "../src/app/fonts/pretendard.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story: StoryFn) =>
      React.createElement(
        "div",
        {
          className: "font-pretendard",
          style: { fontFamily: "Pretendard" },
        },
        React.createElement(Story)
      ),
  ],
};

export default preview;
