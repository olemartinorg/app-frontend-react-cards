import { CG } from 'src/codegen/CG';
import { CompCategory } from 'src/layout/common';

export const Config = new CG.component({
  category: CompCategory.Action,
  rendersWithLabel: false,
  capabilities: {
    renderInTable: true,
    renderInButtonGroup: true,
    renderInAccordion: false,
    renderInAccordionGroup: false,
    renderInCardGroup: false,
    renderInCards: true,
    renderInCardsMedia: false,
  },
}).addTextResource(
  new CG.trb({
    name: 'title',
    title: 'Title',
    description: 'The title/text on the button',
  }),
);
